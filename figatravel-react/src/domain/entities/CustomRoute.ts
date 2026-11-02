// A door-to-door route picked by the customer (any pickup -> any drop-off),
// priced by driving distance. The price itself is computed server-side in the
// `custom-route-booking` edge function; the domain only models the request.

// Largest vehicle in the fleet (minibus) seats 18 passengers.
export const MAX_ROUTE_PASSENGERS = 18

export interface RoutePlace {
  placeId: string
  label: string
}

export interface RoutePassengers {
  adults: number
  children: number
}

export interface CustomRouteSearch {
  origin: RoutePlace
  destination: RoutePlace
  passengers: RoutePassengers
}

export interface CustomRouteQuote {
  distanceKm: number
  durationMinutes: number
  passengers: number
  ratePerKm: number
  amount: number
  currency: string
}

export interface CustomRouteReservationRequest {
  search: CustomRouteSearch
  fullName: string
  email: string
  phone?: string
  travelDate: string
  pickupTime: string
  message?: string
}
