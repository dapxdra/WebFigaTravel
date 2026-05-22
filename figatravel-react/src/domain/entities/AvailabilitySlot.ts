export interface AvailabilitySlot {
  id: string
  packageId: string
  date: string
  seatsAvailable: number
  priceOverride?: number
}
