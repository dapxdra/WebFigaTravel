export interface LeadRequest {
  name: string
  email: string
  phone?: string
  travelDate?: string
  travelers: number
  message?: string
  packageId: string
  availabilitySlotId?: string
}
