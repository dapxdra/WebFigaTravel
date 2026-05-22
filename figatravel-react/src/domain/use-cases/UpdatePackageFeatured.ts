import type { TravelPackageRepository } from '../repositories/TravelPackageRepository'

export class UpdatePackageFeatured {
  private readonly repository: TravelPackageRepository

  constructor(repository: TravelPackageRepository) {
    this.repository = repository
  }

  async execute(packageId: string, isFeatured: boolean): Promise<void> {
    if (!packageId) {
      throw new Error('Paquete invalido.')
    }

    await this.repository.updateFeatured(packageId, isFeatured)
  }
}
