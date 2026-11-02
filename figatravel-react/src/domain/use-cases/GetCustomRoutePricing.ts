import type { CustomRoutePricingRules } from '../entities/CustomRoutePricing'
import type { CustomRoutePricingRepository } from '../repositories/CustomRoutePricingRepository'

export class GetCustomRoutePricing {
  private readonly repository: CustomRoutePricingRepository

  constructor(repository: CustomRoutePricingRepository) {
    this.repository = repository
  }

  async execute(): Promise<CustomRoutePricingRules> {
    return this.repository.get()
  }
}
