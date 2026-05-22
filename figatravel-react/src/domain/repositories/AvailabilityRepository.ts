import type { AvailabilitySlot } from '../entities/AvailabilitySlot'

export interface AvailabilityRepository {
  listByPackage(packageId: string): Promise<AvailabilitySlot[]>
}
