import type { TilopaySdkSession } from '../entities/Reservation'
import type { ReservationRepository } from '../repositories/ReservationRepository'

export class GetTilopaySdkToken {
  private readonly repository: ReservationRepository

  constructor(repository: ReservationRepository) {
    this.repository = repository
  }

  async execute(orderNumber: string): Promise<TilopaySdkSession> {
    if (!orderNumber) {
      throw new Error('orderNumber is required.')
    }

    return this.repository.getSdkToken(orderNumber)
  }
}
