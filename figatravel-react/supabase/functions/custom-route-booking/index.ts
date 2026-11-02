// Supabase Edge Function: custom-route-booking
//
// Prices door-to-door custom routes (any pickup -> any drop-off picked with
// Google Places autocomplete) by driving distance, and creates the pending
// reservation for them. The price is ALWAYS computed here, server-side, from
// Google's own route distance: the browser only sends place IDs and passenger
// counts, so a tampered client can't choose its own amount.
//
// Actions (POST JSON body):
//   { action: 'quote', originPlaceId, destinationPlaceId, adults, children }
//   { action: 'reserve', ...quote fields, originLabel, destinationLabel,
//     fullName, email, phone?, travelDate, pickupTime, message? }
//
// Secrets (`supabase secrets set ...`):
//   GOOGLE_MAPS_SERVER_API_KEY - server key with "Routes API" enabled. Must be
//   a different key than the browser VITE_GOOGLE_MAPS_API_KEY, because
//   referrer-restricted browser keys are rejected on server-to-server calls.
//
// Self-contained on purpose (no ../_shared import): the Supabase bundler only
// packages this function's own directory, so cross-folder relative imports
// fail at deploy time.
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function getAdminClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase service credentials are not configured.')
  }
  return createClient(supabaseUrl, serviceRoleKey)
}

// ---- Pricing rules ----------------------------------------------------------
// Rules live in the single-row table `public.custom_route_pricing`, edited from
// /admin (migration 20261016000000_add_custom_route_pricing.sql):
//   1. Distance tiers for the 5-passenger vehicle, each with a USD/km rate
//      (default: first 120 km at $1.80, up to 250 km at $1.03, up to 280 km
//      at $2.17). After the last tier the price stops growing (top fare).
//   2. 6-8 and 9-18 passenger vehicles = 5-passenger price x a multiplier.
//      Every passenger count inside a group pays the same.
// The calculation mirrors src/domain/entities/CustomRoutePricing.ts (used for
// the admin preview); keep both in sync.
interface PricingTier {
  maxKm: number
  ratePerKm: number
}

interface PricingRules {
  tiers: PricingTier[]
  groupMultipliers: [number, number, number] // 1-5, 6-8, 9-18
  minimumFare: number
}

// Vehicle groups by seat count (fixed by the fleet).
const GROUP_MAX_PASSENGERS = [5, 8, 18]
const CURRENCY = 'USD'

// Used only when the pricing row does not exist yet (migration not run).
const DEFAULT_PRICING: PricingRules = {
  tiers: [
    { maxKm: 120, ratePerKm: 1.8 },
    { maxKm: 250, ratePerKm: 1.03 },
    { maxKm: 280, ratePerKm: 2.17 },
  ],
  groupMultipliers: [1, 1.128, 1.371],
  minimumFare: 0,
}

// Short per-instance cache: admin changes apply within a minute, and quotes
// don't add a DB round trip each time.
const PRICING_CACHE_TTL_MS = 60 * 1000
let pricingCache: { value: PricingRules; expiresAt: number } | null = null

async function loadPricingRules(): Promise<PricingRules> {
  if (pricingCache && pricingCache.expiresAt > Date.now()) {
    return pricingCache.value
  }

  const { data, error } = await getAdminClient()
    .from('custom_route_pricing')
    .select('*')
    .eq('id', 1)
    .maybeSingle()

  // Fail closed on DB errors: never quote with rules we couldn't read.
  if (error) {
    console.error('custom-route-booking: unable to load pricing rules', error)
    throw new Error('Unable to calculate the price right now. Please try again.')
  }

  let value = DEFAULT_PRICING
  if (data) {
    // `numeric` columns may arrive as strings.
    value = {
      tiers: [
        { maxKm: Number(data.tier1_max_km), ratePerKm: Number(data.tier1_rate) },
        { maxKm: Number(data.tier2_max_km), ratePerKm: Number(data.tier2_rate) },
        { maxKm: Number(data.tier3_max_km), ratePerKm: Number(data.tier3_rate) },
      ],
      groupMultipliers: [1, Number(data.medium_group_multiplier), Number(data.large_group_multiplier)],
      minimumFare: Number(data.minimum_fare),
    }
  } else {
    console.warn('custom-route-booking: no custom_route_pricing row, using defaults')
  }

  pricingCache = { value, expiresAt: Date.now() + PRICING_CACHE_TTL_MS }
  return value
}

// Largest vehicle in the fleet (minibus) seats 18 passengers.
const MAX_PASSENGERS = 18
// Sanity bounds: Costa Rica's longest drives are ~500 km; anything outside
// this range is a bad pick (same spot twice, or a place outside the country).
const MIN_DISTANCE_KM = 1
const MAX_DISTANCE_KM = 700

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

// Final customer price in whole USD.
function calculatePrice(rules: PricingRules, distanceKm: number, passengers: number): number {
  // 1. Full 5-passenger vehicle: sum of (km inside each tier x tier rate).
  let smallVehiclePrice = 0
  let tierStartKm = 0
  for (const tier of rules.tiers) {
    if (distanceKm <= tierStartKm) break
    smallVehiclePrice += (Math.min(distanceKm, tier.maxKm) - tierStartKm) * tier.ratePerKm
    tierStartKm = tier.maxKm
  }

  // 2. Vehicle multiplier for the group the passengers fit in.
  const groupIndex = Math.max(0, GROUP_MAX_PASSENGERS.findIndex((max) => passengers <= max))
  const price = smallVehiclePrice * rules.groupMultipliers[groupIndex]

  return Math.round(Math.max(price, rules.minimumFare))
}

// ---- Input validation -------------------------------------------------------
const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{10,512}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
// Same 30-minute grid the booking form offers (00:00 ... 23:30).
const TIME_PATTERN = /^([01]\d|2[0-3]):(00|30)$/

class ValidationError extends Error {}

function requireText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(`${field} is required.`)
  }
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    throw new ValidationError(`${field} is too long.`)
  }
  return trimmed
}

function optionalText(value: unknown, field: string, maxLength: number): string | null {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return null
  }
  return requireText(value, field, maxLength)
}

function requireInteger(value: unknown, field: string, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) {
    throw new ValidationError(`${field} must be a whole number between ${min} and ${max}.`)
  }
  return value
}

interface RouteInput {
  originPlaceId: string
  destinationPlaceId: string
  adults: number
  children: number
}

function parseRouteInput(payload: Record<string, unknown>): RouteInput {
  const originPlaceId = requireText(payload.originPlaceId, 'Pickup place', 512)
  const destinationPlaceId = requireText(payload.destinationPlaceId, 'Drop-off place', 512)

  if (!PLACE_ID_PATTERN.test(originPlaceId) || !PLACE_ID_PATTERN.test(destinationPlaceId)) {
    throw new ValidationError('Select pickup and drop-off places from the suggestions.')
  }
  if (originPlaceId === destinationPlaceId) {
    throw new ValidationError('Pickup and drop-off must be different places.')
  }

  const adults = requireInteger(payload.adults, 'Adults', 1, MAX_PASSENGERS)
  const children = requireInteger(payload.children, 'Children', 0, MAX_PASSENGERS - 1)
  if (adults + children > MAX_PASSENGERS) {
    throw new ValidationError(`We can carry up to ${MAX_PASSENGERS} passengers per booking.`)
  }

  return { originPlaceId, destinationPlaceId, adults, children }
}

// ---- Google Routes API ------------------------------------------------------
const GOOGLE_ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes'

interface RouteDistance {
  distanceKm: number
  durationMinutes: number
}

// Small per-instance cache so repeated quotes for the same pair (typing the
// form, then reserving) don't hit the paid Routes API twice. Distances are
// stable enough that a 30-minute TTL is safe.
const ROUTE_CACHE_TTL_MS = 30 * 60 * 1000
const ROUTE_CACHE_MAX_ENTRIES = 500
const routeCache = new Map<string, { value: RouteDistance; expiresAt: number }>()

// Carries Google's status/reason (e.g. "403 PERMISSION_DENIED
// API_KEY_HTTP_REFERRER_BLOCKED") so misconfigurations show up in the
// browser's Network tab as `detail`. Google error bodies never echo the key.
class RoutesApiError extends Error {
  readonly detail: string

  constructor(httpStatus: number, body: string) {
    super('Unable to calculate the route right now. Please try again.')
    let detail = `Google Routes API ${httpStatus}`
    try {
      const parsed = JSON.parse(body) as {
        error?: { status?: string; message?: string; details?: { reason?: string }[] }
      }
      const reason = parsed.error?.details?.find((item) => item.reason)?.reason
      detail = [detail, parsed.error?.status, reason, parsed.error?.message].filter(Boolean).join(' | ')
    } catch {
      // Non-JSON body: keep just the HTTP status.
    }
    this.detail = detail.slice(0, 300)
  }
}

async function fetchRouteDistance(originPlaceId: string, destinationPlaceId: string): Promise<RouteDistance> {
  const cacheKey = `${originPlaceId}|${destinationPlaceId}`
  const cached = routeCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value
  }

  const apiKey = Deno.env.get('GOOGLE_MAPS_SERVER_API_KEY')
  if (!apiKey) {
    throw new Error('Missing GOOGLE_MAPS_SERVER_API_KEY secret. Set it with `supabase secrets set`.')
  }

  const response = await fetch(GOOGLE_ROUTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      // Only request the two fields we use: keeps the response small and the
      // call in the cheapest Routes API billing tier.
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
    },
    body: JSON.stringify({
      origin: { placeId: originPlaceId },
      destination: { placeId: destinationPlaceId },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      units: 'METRIC',
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '<unreadable>')
    console.error(`custom-route-booking: Routes API responded ${response.status}: ${errorBody}`)
    throw new RoutesApiError(response.status, errorBody)
  }

  const data = (await response.json()) as { routes?: { distanceMeters?: number; duration?: string }[] }
  const route = data.routes?.[0]

  if (!route?.distanceMeters) {
    throw new ValidationError('We could not find a driving route between those places.')
  }

  // duration comes as a protobuf Duration string, e.g. "9876s".
  const durationSeconds = Number.parseInt(route.duration ?? '0', 10) || 0
  const value = {
    distanceKm: roundTo(route.distanceMeters / 1000, 1),
    durationMinutes: Math.round(durationSeconds / 60),
  }

  if (routeCache.size >= ROUTE_CACHE_MAX_ENTRIES) {
    // Map keeps insertion order, so the first key is the oldest entry.
    const oldestKey = routeCache.keys().next().value
    if (oldestKey !== undefined) routeCache.delete(oldestKey)
  }
  routeCache.set(cacheKey, { value, expiresAt: Date.now() + ROUTE_CACHE_TTL_MS })

  return value
}

interface Quote extends RouteDistance {
  passengers: number
  ratePerKm: number
  amount: number
  currency: string
}

async function buildQuote(input: RouteInput): Promise<Quote> {
  const [route, rules] = await Promise.all([
    fetchRouteDistance(input.originPlaceId, input.destinationPlaceId),
    loadPricingRules(),
  ])

  if (route.distanceKm < MIN_DISTANCE_KM || route.distanceKm > MAX_DISTANCE_KM) {
    throw new ValidationError('That route is outside our service area. Contact us for a custom quote.')
  }

  const passengers = input.adults + input.children
  // Priced on the rounded km shown to the customer.
  const amount = calculatePrice(rules, route.distanceKm, passengers)

  return {
    ...route,
    passengers,
    // Effective (average) rate per km: with distance tiers there is no single
    // rate, so we show total / km.
    ratePerKm: roundTo(amount / route.distanceKm, 2),
    amount,
    currency: CURRENCY,
  }
}

// ---- Reservation ------------------------------------------------------------
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `FIGA-${timestamp}-${random}`
}

async function createReservation(payload: Record<string, unknown>, input: RouteInput) {
  const fullName = requireText(payload.fullName, 'Full name', 120)
  const email = requireText(payload.email, 'Email', 254)
  if (!EMAIL_PATTERN.test(email)) {
    throw new ValidationError('Enter a valid email address.')
  }
  const phone = optionalText(payload.phone, 'Phone', 40)
  const message = optionalText(payload.message, 'Notes', 1000)
  const originLabel = requireText(payload.originLabel, 'Pickup location', 300)
  const destinationLabel = requireText(payload.destinationLabel, 'Drop-off location', 300)

  const travelDate = requireText(payload.travelDate, 'Travel date', 10)
  const todayIso = new Date().toISOString().slice(0, 10)
  if (!DATE_PATTERN.test(travelDate) || Number.isNaN(Date.parse(travelDate)) || travelDate <= todayIso) {
    throw new ValidationError('Select a future travel date.')
  }

  const pickupTime = requireText(payload.pickupTime, 'Pickup time', 5)
  if (!TIME_PATTERN.test(pickupTime)) {
    throw new ValidationError('Select a valid pickup time.')
  }

  // Recompute the price here; never reuse a client-supplied amount.
  const quote = await buildQuote(input)

  const supabaseAdmin = getAdminClient()
  const orderNumber = generateOrderNumber()

  const { error } = await supabaseAdmin.from('lead_requests').insert({
    name: fullName,
    email,
    phone,
    travel_date: travelDate,
    pickup_time: pickupTime,
    pickup_location: originLabel,
    dropoff_location: destinationLabel,
    travelers: quote.passengers,
    children: input.children,
    distance_km: quote.distanceKm,
    message,
    package_id: null,
    order_number: orderNumber,
    amount: quote.amount,
    currency: quote.currency,
    status: 'pending',
  })

  if (error) {
    console.error('custom-route-booking: insert failed', error)
    throw new Error('Unable to create the reservation. Please try again.')
  }

  return {
    orderNumber,
    fullName,
    email,
    phone,
    travelDate,
    pickupTime,
    pickupLocation: originLabel,
    dropoffLocation: destinationLabel,
    amount: quote.amount,
    currency: quote.currency,
    distanceKm: quote.distanceKm,
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }

  let payload: Record<string, unknown>
  try {
    const parsed = await req.json()
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('not an object')
    }
    payload = parsed as Record<string, unknown>
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400)
  }

  try {
    const input = parseRouteInput(payload)

    if (payload.action === 'quote') {
      return jsonResponse(await buildQuote(input))
    }

    if (payload.action === 'reserve') {
      return jsonResponse(await createReservation(payload, input))
    }

    return jsonResponse({ error: 'Unknown action.' }, 400)
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonResponse({ error: error.message }, 400)
    }
    if (error instanceof RoutesApiError) {
      return jsonResponse({ error: error.message, detail: error.detail }, 502)
    }
    console.error('custom-route-booking: unexpected error', error)
    const message = error instanceof Error ? error.message : 'Unexpected error.'
    return jsonResponse({ error: message }, 502)
  }
})
