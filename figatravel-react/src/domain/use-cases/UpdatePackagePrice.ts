import type { TravelPackageRepository } from '../repositories/TravelPackageRepository'

export class UpdatePackagePrice {
  private readonly repository: TravelPackageRepository

  constructor(repository: TravelPackageRepository) {
    this.repository = repository
  }

  async execute(packageId: string, price: number): Promise<void> {
    if (!packageId) {
      throw new Error('Paquete invalido.')
    }

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error('El precio debe ser mayor a 0.')
    }

    await this.repository.updatePrice(packageId, price)
  }
}
