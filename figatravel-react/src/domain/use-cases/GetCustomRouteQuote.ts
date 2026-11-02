import type { CustomRouteQuote, CustomRouteSearch } from '../entities/CustomRoute'
import { MAX_ROUTE_PASSENGERS } from '../entities/CustomRoute'
import type { CustomRouteRepository } from '../repositories/CustomRouteRepository'

// Shared by the quote and reservation use-cases so both reject the same
// incomplete searches before calling the (paid) routing backend.
export function assertValidRouteSearch(search: CustomRouteSearch): void {
  if (!search.origin.placeId || !search.destination.placeId) {
    throw new Error('Select your pickup and drop-off from the suggestions.')
  }

  if (search.origin.placeId === search.destination.placeId) {
    throw new Error('Pickup and drop-off must be different places.')
  }

  const { adults, children } = search.passengers

  if (!Number.isInteger(adults) || adults < 1) {
    throw new Error('At least one adult is required.')
  }

  if (!Number.isInteger(children) || children < 0) {
    throw new Error('Children must be zero or more.')
  }

  if (adults + children > MAX_ROUTE_PASSENGERS) {
    throw new Error(`We can carry up to ${MAX_ROUTE_PASSENGERS} passengers per booking.`)
  }
}

export class GetCustomRouteQuote {
  private readonly repository: CustomRouteRepository

  constructor(repository: CustomRouteRepository) {
    this.repository = repository
  }

  async execute(search: CustomRouteSearch): Promise<CustomRouteQuote> {
    assertValidRouteSearch(search)
    return this.repository.getQuote(search)
  }
}
