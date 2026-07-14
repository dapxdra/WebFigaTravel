export interface LeadRequest {
  name: string
  email: string
  phone?: string
  userId?: string
  travelDate?: string
  travelers: number
  message?: string
  packageId: string
  availabilitySlotId?: string
}
