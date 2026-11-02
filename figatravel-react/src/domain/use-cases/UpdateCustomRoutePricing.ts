import type { CustomRoutePricingRules } from '../entities/CustomRoutePricing'
import { validateCustomRoutePricing } from '../entities/CustomRoutePricing'
import type { CustomRoutePricingRepository } from '../repositories/CustomRoutePricingRepository'

export class UpdateCustomRoutePricing {
  private readonly repository: CustomRoutePricingRepository

  constructor(repository: CustomRoutePricingRepository) {
    this.repository = repository
  }

  async execute(rules: CustomRoutePricingRules): Promise<void> {
    const validationError = validateCustomRoutePricing(rules)
    if (validationError) {
      throw new Error(validationError)
    }

    await this.repository.update(rules)
  }
}
