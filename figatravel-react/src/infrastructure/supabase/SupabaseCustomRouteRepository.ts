import type {
  CustomRouteQuote,
  CustomRouteReservationRequest,
  CustomRouteSearch,
} from '../../domain/entities/CustomRoute'
import type { Reservation } from '../../domain/entities/Reservation'
import type { CustomRouteRepository } from '../../domain/repositories/CustomRouteRepository'
import { supabaseClient } from './supabaseClient'

const FUNCTION_NAME = 'custom-route-booking'

function routeFields(search: CustomRouteSearch) {
  return {
    originPlaceId: search.origin.placeId,
    destinationPlaceId: search.destination.placeId,
    adults: search.passengers.adults,
    children: search.passengers.children,
  }
}

// supabase-js wraps non-2xx edge function responses in a FunctionsHttpError
// whose `context` is the raw Response; read our `{ error }` body from it so
// users see "Select a future travel date." instead of a generic status text.
async function readFunctionError(error: unknown, fallback: string): Promise<string> {
  const context = (error as { context?: unknown }).context
  if (context instanceof Response) {
    const body = (await context.json().catch(() => null)) as { error?: string } | null
    if (body?.error) {
      return body.error
    }
  }
  return error instanceof Error ? `${fallback}: ${error.message}` : fallback
}

export class SupabaseCustomRouteRepository implements CustomRouteRepository {
  async getQuote(search: CustomRouteSearch): Promise<CustomRouteQuote> {
    if (!supabaseClient) {
      throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to get route prices.')
    }

    const { data, error } = await supabaseClient.functions.invoke(FUNCTION_NAME, {
      body: { action: 'quote', ...routeFields(search) },
    })

    if (error) {
      throw new Error(await readFunctionError(error, 'Unable to price this route'))
    }

    const quote = data as Partial<CustomRouteQuote> | null
    if (!quote || typeof quote.amount !== 'number' || typeof quote.distanceKm !== 'number') {
      throw new Error('The pricing service returned an invalid quote.')
    }

    return {
      distanceKm: quote.distanceKm,
      durationMinutes: quote.durationMinutes ?? 0,
      passengers: quote.passengers ?? search.passengers.adults + search.passengers.children,
      ratePerKm: quote.ratePerKm ?? 0,
      amount: quote.amount,
      currency: quote.currency ?? 'USD',
    }
  }

  async createReservation(request: CustomRouteReservationRequest): Promise<Reservation> {
    if (!supabaseClient) {
      throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to create reservations.')
    }

    const { data, error } = await supabaseClient.functions.invoke(FUNCTION_NAME, {
      body: {
        action: 'reserve',
        ...routeFields(request.search),
        originLabel: request.search.origin.label,
        destinationLabel: request.search.destination.label,
        fullName: request.fullName,
        email: request.email,
        phone: request.phone,
        travelDate: request.travelDate,
        pickupTime: request.pickupTime,
        message: request.message,
      },
    })

    if (error) {
      throw new Error(await readFunctionError(error, 'Unable to create the reservation'))
    }

    const created = data as {
      orderNumber?: string
      amount?: number
      currency?: string
    } | null

    if (!created?.orderNumber || typeof created.amount !== 'number') {
      throw new Error('The booking service returned an invalid reservation.')
    }

    // Amount/currency come from the server response, never from the client.
    return {
      id: created.orderNumber,
      orderNumber: created.orderNumber,
      fullName: request.fullName,
      email: request.email,
      phone: request.phone,
      travelDate: request.travelDate,
      pickupTime: request.pickupTime,
      pickupLocation: request.search.origin.label,
      dropoffLocation: request.search.destination.label,
      amount: created.amount,
      currency: created.currency ?? 'USD',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }
}
