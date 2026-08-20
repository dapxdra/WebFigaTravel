import type { Reservation, ReservationRequest } from '../entities/Reservation'
import type { ReservationRepository } from '../repositories/ReservationRepository'

export class CreatePendingReservation {
  private readonly repository: ReservationRepository

  constructor(repository: ReservationRepository) {
    this.repository = repository
  }

  async execute(input: ReservationRequest): Promise<Reservation> {
    if (input.fullName.trim() === '') {
      throw new Error('Full name is required.')
    }

    if (input.email.trim() === '') {
      throw new Error('Email is required.')
    }

    if (!input.packageId) {
      throw new Error('Select a package to continue.')
    }

    if (!Number.isFinite(input.travelers) || input.travelers <= 0) {
      throw new Error('Travelers must be a positive number.')
    }

    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new Error('Amount must be a positive number.')
    }

    if (input.currency.trim() === '') {
      throw new Error('Currency is required.')
    }

    return this.repository.createPending(input)
  }
}
