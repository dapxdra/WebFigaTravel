import type {
  PaymentVerificationResult,
  Reservation,
  ReservationRequest,
  TilopaySdkSession,
} from '../entities/Reservation'

export interface ReservationRepository {
  createPending(request: ReservationRequest): Promise<Reservation>
  getSdkToken(orderNumber: string): Promise<TilopaySdkSession>
  verifyPayment(
    orderNumber: string,
    transactionId?: string,
  ): Promise<PaymentVerificationResult>
}
