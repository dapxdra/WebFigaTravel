// Supabase Edge Function: verify-tilopay-payment
//
// Never trusts query params from the browser redirect. Authenticates with
// Tilopay's account login, calls the /consult endpoint to read the real
// transaction status, and only then updates the reservation's status using
// the service role key.
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

const TILOPAY_BASE_URL = 'https://app.tilopay.com/api/v1'

interface TilopayCredentials {
  apiUser: string
  apiPassword: string
  apiKey: string
}

function getTilopayCredentials(): TilopayCredentials {
  const apiUser = Deno.env.get('TILOPAY_API_USER')
  const apiPassword = Deno.env.get('TILOPAY_API_PASSWORD')
  const apiKey = Deno.env.get('TILOPAY_API_KEY')

  if (!apiUser || !apiPassword || !apiKey) {
    throw new Error(
      'Missing Tilopay secrets. Set TILOPAY_API_USER, TILOPAY_API_PASSWORD and TILOPAY_API_KEY with `supabase secrets set`.',
    )
  }

  return { apiUser, apiPassword, apiKey }
}

interface TilopayLoginResponse {
  access_token: string
  token_type: string
  expires_in: string | number
}

async function loginToTilopay(credentials: TilopayCredentials): Promise<TilopayLoginResponse> {
  // /login (email + password) - NOT /loginSdk (apiuser + password + key).
  // loginSdk issues a token scoped to the embeddable SDK's processSdk /
  // processPaymentFAC calls; Tilopay's /consult endpoint rejects that token
  // with 401 Unauthorized. Confirmed empirically against a real transaction:
  // /login's token is what /consult actually accepts.
  const response = await fetch(`${TILOPAY_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.apiUser,
      password: credentials.apiPassword,
    }),
  })

  if (!response.ok) {
    throw new Error(`Tilopay login failed with status ${response.status}`)
  }

  const data = (await response.json()) as TilopayLoginResponse

  if (!data.access_token) {
    throw new Error('Tilopay login response did not include an access_token.')
  }

  return data
}

interface RequestPayload {
  orderNumber?: string
  transactionId?: string
}

interface TilopayConsultEntry {
  id_tilopay: number | string
  orderNumber: string
  amount: string
  currency: string
  code: string
  response: string
  environment?: string
}

interface TilopayConsultResponse {
  type: string
  message: string
  response: TilopayConsultEntry[]
}

interface FigaSyncPackage {
  title: string
  destination: string
}

interface FigaSyncRow {
  order_number: string
  name: string
  email: string
  phone: string | null
  travel_date: string | null
  pickup_time: string | null
  pickup_location: string | null
  dropoff_location: string | null
  travelers: number
  amount: number
  currency: string
  travel_packages: FigaSyncPackage | FigaSyncPackage[] | null
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

// Pushes a confirmed-paid reservation into the FIGA operations system
// (Firestore, via app/api/integrations/reservas). Best-effort: any failure
// here is caught by the caller and never blocks the paid response to the
// customer. externalReservationId=order_number makes retries/replays safe.
async function syncReservationToFiga(row: FigaSyncRow, tilopayTransactionId: string): Promise<void> {
  const webhookUrl = Deno.env.get('FIGA_RESERVAS_WEBHOOK_URL')
  const webhookSecret = Deno.env.get('FIGA_RESERVAS_WEBHOOK_SECRET')

  if (!webhookUrl || !webhookSecret) {
    console.warn('syncReservationToFiga: FIGA_RESERVAS_WEBHOOK_URL/SECRET not configured, skipping.')
    return
  }

  const packageInfo = Array.isArray(row.travel_packages) ? row.travel_packages[0] : row.travel_packages

  const body = JSON.stringify({
    source: 'figa-web',
    externalReservationId: row.order_number,
    cliente: row.name,
    fecha: row.travel_date,
    hora: row.pickup_time || '00:00',
    pickUp: row.pickup_location || 'Por confirmar',
    dropOff: row.dropoff_location || packageInfo?.destination || 'Por confirmar',
    proveedor: 'Figa Web',
    nota: [packageInfo?.title, row.phone ? `Tel: ${row.phone}` : null].filter(Boolean).join(' | '),
    precio: row.amount,
    AD: row.travelers,
    NI: 0,
    pago: true,
    fechaPago: new Date().toISOString().slice(0, 10),
    metadata: { tilopayTransactionId, email: row.email, currency: row.currency },
  })

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${webhookSecret}`,
  }

  const hmacSecret = Deno.env.get('FIGA_RESERVAS_WEBHOOK_HMAC_SECRET')
  if (hmacSecret) {
    const timestamp = Math.floor(Date.now() / 1000).toString()
    headers['x-webhook-timestamp'] = timestamp
    headers['x-webhook-signature'] = `sha256=${await hmacSha256Hex(hmacSecret, `${timestamp}.${body}`)}`
  }

  const response = await fetch(webhookUrl, { method: 'POST', headers, body })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '<unreadable>')
    throw new Error(`FIGA webhook responded ${response.status}: ${errorBody}`)
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }

  let payload: RequestPayload
  try {
    payload = (await req.json()) as RequestPayload
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400)
  }

  const orderNumber = payload.orderNumber?.trim()
  if (!orderNumber) {
    return jsonResponse({ error: 'orderNumber is required.' }, 400)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Supabase service credentials are not configured.' }, 500)
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  const { data: reservation, error: reservationError } = await supabaseAdmin
    .from('lead_requests')
    .select('id, status, order_number')
    .eq('order_number', orderNumber)
    .maybeSingle()

  if (reservationError) {
    return jsonResponse({ error: `Unable to look up the reservation: ${reservationError.message}` }, 500)
  }

  if (!reservation) {
    return jsonResponse({ error: 'No reservation found for that orderNumber.' }, 404)
  }

  // Already resolved (paid/failed): return the stored result instead of
  // re-querying Tilopay or updating the row again.
  if (reservation.status !== 'pending') {
    return jsonResponse({
      status: reservation.status,
      message: 'This reservation was already verified.',
    })
  }

  let credentials
  try {
    credentials = getTilopayCredentials()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Tilopay credentials are not configured.'
    return jsonResponse({ error: message }, 500)
  }

  try {
    const session = await loginToTilopay(credentials)

    const consultResponse = await fetch(`${TILOPAY_BASE_URL}/consult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        key: credentials.apiKey,
        orderNumber,
        merchantId: '',
      }),
    })

    if (!consultResponse.ok) {
      const rawBody = await consultResponse.text().catch(() => '<unreadable>')
      throw new Error(`Tilopay consult failed with status ${consultResponse.status}: ${rawBody}`)
    }

    const consultData = (await consultResponse.json()) as TilopayConsultResponse
    const transaction = consultData.response?.[0]

    if (!transaction) {
      throw new Error('Tilopay did not return any transaction for this orderNumber.')
    }

    const isApproved = transaction.code === '1'
    const newStatus = isApproved ? 'paid' : 'failed'
    const tilopayTransactionId = String(transaction.id_tilopay)

    // The client-provided transactionId is never trusted for the status
    // decision; only logged if it disagrees with Tilopay's own record.
    if (payload.transactionId && payload.transactionId !== tilopayTransactionId) {
      console.warn(
        `verify-tilopay-payment: transactionId mismatch for order ${orderNumber} (client=${payload.transactionId}, tilopay=${tilopayTransactionId})`,
      )
    }

    // Guard the update with status='pending' so a reservation can't flip
    // twice even if this function is called concurrently or retried.
    // .select() returns the updated row (empty if a concurrent call already
    // won the race), which is what feeds the FIGA sync below.
    const { data: updatedRows, error: updateError } = await supabaseAdmin
      .from('lead_requests')
      .update({ status: newStatus, tilopay_transaction_id: tilopayTransactionId })
      .eq('order_number', orderNumber)
      .eq('status', 'pending')
      .select(
        'order_number, name, email, phone, travel_date, pickup_time, pickup_location, dropoff_location, travelers, amount, currency, travel_packages(title, destination)',
      )

    if (updateError) {
      throw new Error(`Unable to update the reservation: ${updateError.message}`)
    }

    const updatedReservation = (updatedRows?.[0] as unknown as FigaSyncRow | undefined) ?? undefined

    if (isApproved && updatedReservation) {
      // Never let a FIGA outage block confirming the payment to the customer.
      await syncReservationToFiga(updatedReservation, tilopayTransactionId).catch((error) => {
        console.error(`verify-tilopay-payment: failed to sync order ${orderNumber} to FIGA`, error)
      })
    }

    return jsonResponse({
      status: newStatus,
      message: transaction.response,
      transactionId: tilopayTransactionId,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error verifying the payment with Tilopay.'
    return jsonResponse({ error: message }, 502)
  }
})
