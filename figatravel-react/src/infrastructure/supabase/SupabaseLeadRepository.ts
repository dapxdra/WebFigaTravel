import type { LeadRequest } from '../../domain/entities/LeadRequest'
import type { LeadRecord } from '../../domain/entities/LeadRecord'
import type { LeadRepository } from '../../domain/repositories/LeadRepository'
import { supabaseClient } from './supabaseClient'

interface LeadRow {
  id: string
  name: string
  email: string
  phone: string | null
  travel_date: string | null
  travelers: number
  message: string | null
  package_id: string
  created_at: string
}

export class SupabaseLeadRepository implements LeadRepository {
  async create(lead: LeadRequest): Promise<void> {
    if (!supabaseClient) {
      throw new Error(
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to submit real requests.',
      )
    }

    const { error } = await supabaseClient.from('lead_requests').insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      travel_date: lead.travelDate ?? null,
      travelers: lead.travelers,
      message: lead.message ?? null,
      package_id: lead.packageId,
      availability_slot_id: lead.availabilitySlotId ?? null,
    })

    if (error) {
      throw new Error('Unable to submit the travel request.')
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
      throw new Error('Unable to load recent leads.')
    }

    return (data as LeadRow[]).map((row) => ({
      id: row.id,
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
