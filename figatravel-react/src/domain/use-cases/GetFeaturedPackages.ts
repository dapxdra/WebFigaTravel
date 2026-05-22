import type { TravelPackage } from '../entities/TravelPackage'
import type { TravelPackageRepository } from '../repositories/TravelPackageRepository'

export class GetFeaturedPackages {
  private readonly repository: TravelPackageRepository

  constructor(repository: TravelPackageRepository) {
    this.repository = repository
  }

  async execute(): Promise<TravelPackage[]> {
    return this.repository.getFeatured()
  }
}
