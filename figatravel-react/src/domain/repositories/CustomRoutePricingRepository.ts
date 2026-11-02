import type { CustomRoutePricingRules } from '../entities/CustomRoutePricing'

export interface CustomRoutePricingRepository {
  get(): Promise<CustomRoutePricingRules>
  update(rules: CustomRoutePricingRules): Promise<void>
}
