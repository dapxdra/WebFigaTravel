import type { LeadRequest } from '../../domain/entities/LeadRequest'
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

function isMissingUserIdColumn(error: { code?: string; message?: string } | null) {
  if (!error) {
    return false
  }

  const message = error.message?.toLowerCase() ?? ''
  return error.code === 'PGRST204' || message.includes('user_id')
}

export class SupabaseLeadRepository implements LeadRepository {
  async create(lead: LeadRequest): Promise<void> {
    if (!supabaseClient) {
      throw new Error(
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to submit real requests.',
      )
    }

    const payload = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      user_id: lead.userId ?? null,
      travel_date: lead.travelDate ?? null,
      travelers: lead.travelers,
      message: lead.message ?? null,
      package_id: lead.packageId,
      availability_slot_id: lead.availabilitySlotId ?? null,
    }

    const { error } = await supabaseClient.from('lead_requests').insert(payload)

    if (error && lead.userId && isMissingUserIdColumn(error)) {
      const { user_id, ...legacyPayload } = payload
      const { error: retryError } = await supabaseClient
        .from('lead_requests')
        .insert(legacyPayload)

      if (retryError) {
        throw new Error(`Unable to submit the travel request: ${retryError.message}`)
      }

      return
    }

    if (error) {
      throw new Error(`Unable to submit the travel request: ${error.message}`)
    }
  }

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
