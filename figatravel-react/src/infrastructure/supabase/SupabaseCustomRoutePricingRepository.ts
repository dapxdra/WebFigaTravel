import type { CustomRoutePricingRules } from '../../domain/entities/CustomRoutePricing'
import { DEFAULT_CUSTOM_ROUTE_PRICING } from '../../domain/entities/CustomRoutePricing'
import type { CustomRoutePricingRepository } from '../../domain/repositories/CustomRoutePricingRepository'
import { supabaseClient } from './supabaseClient'

// Single-row table (id = 1), see migration 20261016000000_add_custom_route_pricing.sql.
const PRICING_ROW_ID = 1
// Single string literal (not concatenated) so supabase-js can infer row types.
const PRICING_COLUMNS = 'tier1_max_km, tier1_rate, tier2_max_km, tier2_rate, tier3_max_km, tier3_rate, medium_group_multiplier, large_group_multiplier, minimum_fare, updated_at'

interface CustomRoutePricingRow {
  tier1_max_km: number
  tier1_rate: number
  tier2_max_km: number
  tier2_rate: number
  tier3_max_km: number
  tier3_rate: number
  medium_group_multiplier: number
  large_group_multiplier: number
  minimum_fare: number
  updated_at: string | null
}

// Postgres `numeric` can arrive as a string, so every field goes through Number().
function mapRow(row: CustomRoutePricingRow): CustomRoutePricingRules {
  return {
    tiers: [
      { maxKm: Number(row.tier1_max_km), ratePerKm: Number(row.tier1_rate) },
      { maxKm: Number(row.tier2_max_km), ratePerKm: Number(row.tier2_rate) },
      { maxKm: Number(row.tier3_max_km), ratePerKm: Number(row.tier3_rate) },
    ],
    mediumGroupMultiplier: Number(row.medium_group_multiplier),
    largeGroupMultiplier: Number(row.large_group_multiplier),
    minimumFare: Number(row.minimum_fare),
    updatedAt: row.updated_at,
  }
}

export class SupabaseCustomRoutePricingRepository implements CustomRoutePricingRepository {
  async get(): Promise<CustomRoutePricingRules> {
    if (!supabaseClient) {
      return DEFAULT_CUSTOM_ROUTE_PRICING
    }

    const { data, error } = await supabaseClient
      .from('custom_route_pricing')
      .select(PRICING_COLUMNS)
      .eq('id', PRICING_ROW_ID)
      .maybeSingle()

    if (error) {
      throw new Error(`Unable to load custom route pricing: ${error.message}`)
    }

    return data ? mapRow(data as CustomRoutePricingRow) : DEFAULT_CUSTOM_ROUTE_PRICING
  }

  async update(rules: CustomRoutePricingRules): Promise<void> {
    if (!supabaseClient) {
      return
    }

    const [tier1, tier2, tier3] = rules.tiers
    // select() makes an update blocked by RLS (0 rows) detectable.
    const { data, error } = await supabaseClient
      .from('custom_route_pricing')
      .update({
        tier1_max_km: tier1.maxKm,
        tier1_rate: tier1.ratePerKm,
        tier2_max_km: tier2.maxKm,
        tier2_rate: tier2.ratePerKm,
        tier3_max_km: tier3.maxKm,
        tier3_rate: tier3.ratePerKm,
        medium_group_multiplier: rules.mediumGroupMultiplier,
        large_group_multiplier: rules.largeGroupMultiplier,
        minimum_fare: rules.minimumFare,
      })
      .eq('id', PRICING_ROW_ID)
      .select('id')

    if (error) {
      throw new Error(`Unable to save custom route pricing: ${error.message}`)
    }
    if (!data || data.length === 0) {
      throw new Error('Pricing was not saved. Check that the custom_route_pricing migration ran and you are signed in.')
    }
  }
}
