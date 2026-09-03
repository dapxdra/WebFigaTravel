import type { LeadRecord } from '../../domain/entities/LeadRecord'
import type { LeadRepository } from '../../domain/repositories/LeadRepository'
import { supabaseClient } from './supabaseClient'

interface LeadRow {
  id: string | number
  name: string
  email: string
  phone: string | null
  travel_date: string | null
  travelers: number
  message: string | null
  package_id: string
  created_at: string
}

// Read-only adapter over `lead_requests`. New submissions now go through the
// reservation/payment flow (SupabaseReservationRepository) or the contact form
// (SupabaseContactRepository); this repository only feeds the admin panel's
// recent-leads list.
export class SupabaseLeadRepository implements LeadRepository {
  async listRecent(limit: number): Promise<LeadRecord[]> {
    if (!supabaseClient) {
      return []
    }

    const { data, error } = await supabaseClient
      .from('lead_requests')
      .select(
        'id, name, email, phone, travel_date, travelers, message, package_id, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Unable to load recent leads: ${error.message}`)
    }

    return (data as LeadRow[]).map((row) => ({
      id: String(row.id),
      name: row.name,
      email: row.email,
      phone: row.phone ?? undefined,
      travelDate: row.travel_date ?? undefined,
      travelers: row.travelers,
      message: row.message ?? undefined,
      packageId: row.package_id,
      createdAt: row.created_at,
    }))
  }
}
