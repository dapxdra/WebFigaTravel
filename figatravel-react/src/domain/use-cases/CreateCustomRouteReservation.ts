import type { CustomRouteReservationRequest } from '../entities/CustomRoute'
import type { Reservation } from '../entities/Reservation'
import type { CustomRouteRepository } from '../repositories/CustomRouteRepository'
import { assertValidRouteSearch } from './GetCustomRouteQuote'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class CreateCustomRouteReservation {
  private readonly repository: CustomRouteRepository

  constructor(repository: CustomRouteRepository) {
    this.repository = repository
  }

  async execute(input: CustomRouteReservationRequest): Promise<Reservation> {
    assertValidRouteSearch(input.search)

    if (input.fullName.trim() === '') {
      throw new Error('Full name is required.')
    }

    if (!EMAIL_PATTERN.test(input.email.trim())) {
      throw new Error('Enter a valid email address.')
    }

    if (input.travelDate.trim() === '') {
      throw new Error('Travel date is required.')
    }

    if (input.pickupTime.trim() === '') {
      throw new Error('Pickup time is required.')
    }

    return this.repository.createReservation(input)
  }
}
