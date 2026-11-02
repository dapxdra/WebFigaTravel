import type {
  CustomRouteQuote,
  CustomRouteReservationRequest,
  CustomRouteSearch,
} from '../entities/CustomRoute'
import type { Reservation } from '../entities/Reservation'

export interface CustomRouteRepository {
  getQuote(search: CustomRouteSearch): Promise<CustomRouteQuote>
  createReservation(request: CustomRouteReservationRequest): Promise<Reservation>
}
