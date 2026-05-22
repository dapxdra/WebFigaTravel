export interface LeadRecord {
  id: string
  name: string
  email: string
  phone?: string
  travelDate?: string
  travelers: number
  message?: string
  packageId: string
  createdAt: string
}
