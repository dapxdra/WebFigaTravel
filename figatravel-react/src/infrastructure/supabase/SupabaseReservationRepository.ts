import type {
  PaymentVerificationResult,
  Reservation,
  ReservationRequest,
  TilopaySdkSession,
} from '../../domain/entities/Reservation'
import type { ReservationRepository } from '../../domain/repositories/ReservationRepository'
import { supabaseClient } from './supabaseClient'

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `FIGA-${timestamp}-${random}`
}

export class SupabaseReservationRepository implements ReservationRepository {
  async createPending(request: ReservationRequest): Promise<Reservation> {
    if (!supabaseClient) {
      throw new Error(
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to create reservations.',
      )
    }

    const orderNumber = generateOrderNumber()
    const payload = {
      name: request.fullName,
      email: request.email,
      phone: request.phone ?? null,
      travel_date: request.travelDate ?? null,
      travelers: request.travelers,
      message: request.message ?? null,
      package_id: request.packageId,
      availability_slot_id: request.availabilitySlotId ?? null,
      order_number: orderNumber,
      amount: request.amount,
      currency: request.currency,
    }

    // No .select() after insert: RETURNING would also require a SELECT RLS
    // policy for this role, which we intentionally don't grant (it would let
    // anonymous clients read other people's pending reservations).
    const { error } = await supabaseClient.from('lead_requests').insert(payload)

    if (error) {
      console.error('createPending insert failed', { payload, error })
      throw new Error(`Unable to create the reservation: ${error.message}`)
    }

    return {
      id: orderNumber,
      orderNumber,
      fullName: request.fullName,
      email: request.email,
      phone: request.phone,
      travelDate: request.travelDate,
      packageId: request.packageId,
      amount: request.amount,
      currency: request.currency,
      status: 'pending',
      tilopayTransactionId: undefined,
      createdAt: new Date().toISOString(),
    }
  }

  async getSdkToken(orderNumber: string): Promise<TilopaySdkSession> {
    if (!supabaseClient) {
      throw new Error('Supabase is not configured; cannot request a Tilopay token.')
    }

    const { data, error } = await supabaseClient.functions.invoke('get-tilopay-token', {
      body: { orderNumber },
    })

    if (error) {
      throw new Error(`Unable to start the payment session: ${error.message}`)
    }

    const session = data as { accessToken?: string; apiKey?: string; expiresIn?: string | number } | null
    if (!session?.accessToken || !session.apiKey) {
      throw new Error('Tilopay did not return a valid session token.')
    }

    return {
      accessToken: session.accessToken,
      apiKey: session.apiKey,
      expiresIn: session.expiresIn ?? '',
    }
  }

  async verifyPayment(
    orderNumber: string,
    transactionId?: string,
  ): Promise<PaymentVerificationResult> {
    if (!supabaseClient) {
      throw new Error('Supabase is not configured; cannot verify the payment.')
    }

    const { data, error } = await supabaseClient.functions.invoke('verify-tilopay-payment', {
      body: { orderNumber, transactionId },
    })

    if (error) {
      throw new Error(`Unable to verify the payment: ${error.message}`)
    }

    const result = data as { status?: string; message?: string; transactionId?: string } | null
    if (!result?.status || (result.status !== 'paid' && result.status !== 'failed')) {
      throw new Error('Tilopay verification did not return a valid status.')
    }

    return {
      status: result.status,
      message: result.message ?? '',
      transactionId: result.transactionId,
    }
  }
}
