import type { TravelPackage } from '../entities/TravelPackage'

export interface TravelPackageRepository {
  getFeatured(): Promise<TravelPackage[]>
  getAll(): Promise<TravelPackage[]>
  updateFeatured(packageId: string, isFeatured: boolean): Promise<void>
}
