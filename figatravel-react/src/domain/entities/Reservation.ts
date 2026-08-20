export type ReservationStatus = 'pending' | 'paid' | 'failed'

export interface Reservation {
  id: string
  orderNumber: string
  fullName: string
  email: string
  phone?: string
  travelDate?: string
  packageId: string
  amount: number
  currency: string
  status: ReservationStatus
  tilopayTransactionId?: string
  createdAt: string
}

export interface ReservationRequest {
  fullName: string
  email: string
  phone?: string
  travelDate?: string
  travelers: number
  message?: string
  packageId: string
  availabilitySlotId?: string
  amount: number
  currency: string
}

export interface TilopaySdkSession {
  accessToken: string
  apiKey: string
  expiresIn: string | number
}

export interface PaymentVerificationResult {
  status: Exclude<ReservationStatus, 'pending'>
  message: string
  transactionId?: string
}
