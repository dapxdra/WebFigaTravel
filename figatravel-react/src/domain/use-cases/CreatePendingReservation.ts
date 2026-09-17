import type { Reservation, ReservationRequest } from '../entities/Reservation'
import type { ReservationRepository } from '../repositories/ReservationRepository'

// Basic RFC-5322-ish check: enough to reject obvious typos without fighting
// every valid edge case (the real validation is the confirmation email).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class CreatePendingReservation {
  private readonly repository: ReservationRepository

  constructor(repository: ReservationRepository) {
    this.repository = repository
  }

  async execute(input: ReservationRequest): Promise<Reservation> {
    if (input.fullName.trim() === '') {
      throw new Error('Full name is required.')
    }

    if (!EMAIL_PATTERN.test(input.email.trim())) {
      throw new Error('Enter a valid email address.')
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

    if (input.pickupTime.trim() === '') {
      throw new Error('Pickup time is required.')
    }

    if (input.pickupLocation.trim() === '') {
      throw new Error('Pickup location is required.')
    }

    if (input.dropoffLocation.trim() === '') {
      throw new Error('Dropoff location is required.')
    }

    return this.repository.createPending(input)
  }
}
