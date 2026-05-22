import type { AvailabilitySlot } from '../entities/AvailabilitySlot'
import type { AvailabilityRepository } from '../repositories/AvailabilityRepository'

export class GetAvailabilityByPackage {
  private readonly repository: AvailabilityRepository

  constructor(repository: AvailabilityRepository) {
    this.repository = repository
  }

  async execute(packageId: string): Promise<AvailabilitySlot[]> {
    if (!packageId) {
      return []
    }

    return this.repository.listByPackage(packageId)
  }
}
