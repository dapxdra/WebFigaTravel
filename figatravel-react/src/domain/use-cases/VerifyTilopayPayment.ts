import type { PaymentVerificationResult } from '../entities/Reservation'
import type { ReservationRepository } from '../repositories/ReservationRepository'

export class VerifyTilopayPayment {
  private readonly repository: ReservationRepository

  constructor(repository: ReservationRepository) {
    this.repository = repository
  }

  async execute(
    orderNumber: string,
    transactionId?: string,
  ): Promise<PaymentVerificationResult> {
    if (!orderNumber) {
      throw new Error('orderNumber is required.')
    }

    return this.repository.verifyPayment(orderNumber, transactionId)
  }
}
