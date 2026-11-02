// Pricing rules for custom door-to-door routes, editable from /admin.
//
// Everything starts from the 5-passenger vehicle and its price per km:
//   1. Distance tiers: each km is charged at the rate of the tier it falls in
//      (e.g. first 120 km at $1.80/km, next km up to 250 at $1.03/km, ...).
//      After the last tier the price stops growing (that is the top fare).
//   2. Bigger vehicles (6-8 and 9-18 passengers) cost the 5-passenger price
//      times a multiplier. Every passenger count in a group pays the same.
//
// IMPORTANT: the real charge is computed by the `custom-route-booking` edge
// function, which has its own copy of calculateCustomRoutePrice. Keep both in
// sync; this copy only powers the admin preview and validation.

export interface CustomRoutePricingTier {
  maxKm: number // the tier covers km from the previous tier's maxKm up to this
  ratePerKm: number // USD per km for the 5-passenger vehicle
}

export interface CustomRoutePricingRules {
  tiers: CustomRoutePricingTier[] // exactly 3, ordered by maxKm
  mediumGroupMultiplier: number // 6-8 passengers = 5-passenger price x this
  largeGroupMultiplier: number // 9-18 passengers = 5-passenger price x this
  minimumFare: number // USD, 0 = no minimum
  updatedAt?: string | null
}

export const PRICING_TIER_COUNT = 3

// Vehicle groups by seat count; fixed by the fleet, not editable.
export const PASSENGER_GROUPS = [
  { key: 'small', label: '1-5 passengers', maxPassengers: 5 },
  { key: 'medium', label: '6-8 passengers', maxPassengers: 8 },
  { key: 'large', label: '9-18 passengers', maxPassengers: 18 },
] as const

export type PassengerGroupKey = (typeof PASSENGER_GROUPS)[number]['key']

// Same values seeded by the migration. Result for a full vehicle:
// 5 pax: $216 @120 km, $350 @250 km, $415 from 280 km on.
export const DEFAULT_CUSTOM_ROUTE_PRICING: CustomRoutePricingRules = {
  tiers: [
    { maxKm: 120, ratePerKm: 1.8 },
    { maxKm: 250, ratePerKm: 1.03 },
    { maxKm: 280, ratePerKm: 2.17 },
  ],
  mediumGroupMultiplier: 1.128,
  largeGroupMultiplier: 1.371,
  minimumFare: 0,
}

export function getPassengerGroup(passengers: number) {
  return PASSENGER_GROUPS.find((group) => passengers <= group.maxPassengers)
    ?? PASSENGER_GROUPS[PASSENGER_GROUPS.length - 1]
}

export function groupMultiplier(rules: CustomRoutePricingRules, key: PassengerGroupKey): number {
  if (key === 'medium') return rules.mediumGroupMultiplier
  if (key === 'large') return rules.largeGroupMultiplier
  return 1
}

// Price of the full 5-passenger vehicle: sum of (km inside each tier x rate).
function smallVehiclePrice(tiers: CustomRoutePricingTier[], distanceKm: number): number {
  let total = 0
  let tierStartKm = 0
  for (const tier of tiers) {
    if (distanceKm <= tierStartKm) break
    total += (Math.min(distanceKm, tier.maxKm) - tierStartKm) * tier.ratePerKm
    tierStartKm = tier.maxKm
  }
  return total
}

// Final customer price in whole USD.
export function calculateCustomRoutePrice(
  rules: CustomRoutePricingRules,
  distanceKm: number,
  passengers: number,
): number {
  const group = getPassengerGroup(passengers)
  const price = smallVehiclePrice(rules.tiers, distanceKm) * groupMultiplier(rules, group.key)
  return Math.round(Math.max(price, rules.minimumFare))
}

// Returns a user-facing error, or null when the rules are safe to save.
export function validateCustomRoutePricing(rules: CustomRoutePricingRules): string | null {
  const numbers = [
    ...rules.tiers.flatMap((tier) => [tier.maxKm, tier.ratePerKm]),
    rules.mediumGroupMultiplier,
    rules.largeGroupMultiplier,
    rules.minimumFare,
  ]
  if (rules.tiers.length !== PRICING_TIER_COUNT || numbers.some((value) => !Number.isFinite(value))) {
    return 'All pricing fields must be valid numbers.'
  }

  for (let i = 0; i < rules.tiers.length; i++) {
    const tier = rules.tiers[i]
    const previousMaxKm = i === 0 ? 0 : rules.tiers[i - 1].maxKm
    if (tier.maxKm <= previousMaxKm || tier.maxKm > 1000) {
      return `Tier ${i + 1}: "up to km" must be greater than ${previousMaxKm} and at most 1000.`
    }
    if (tier.ratePerKm <= 0 || tier.ratePerKm > 20) {
      return `Tier ${i + 1}: the rate per km must be between 0.01 and 20.`
    }
  }

  // Ordered multipliers guarantee a bigger group never costs less than a
  // smaller one on the same route.
  if (rules.mediumGroupMultiplier < 1 || rules.largeGroupMultiplier < rules.mediumGroupMultiplier
    || rules.largeGroupMultiplier > 5) {
    return 'Multipliers must satisfy 1 <= 6-8 multiplier <= 9-18 multiplier <= 5.'
  }

  if (rules.minimumFare < 0 || rules.minimumFare > 1000) {
    return 'Minimum fare must be between 0 and 1000.'
  }

  return null
}
