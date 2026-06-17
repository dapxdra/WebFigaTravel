import type { AvailabilitySlot } from '../../domain/entities/AvailabilitySlot'
import type { AvailabilityRepository } from '../../domain/repositories/AvailabilityRepository'
import { supabaseClient } from './supabaseClient'

interface AvailabilityRow {
  id: string
  package_id: string
  date: string
  seats_available: number
  price_override: number | null
}

function buildMock(packageId: string): AvailabilitySlot[] {
  const today = new Date()

  return Array.from({ length: 10 }).map((_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index + 1)

    return {
      id: `mock-${packageId}-${index + 1}`,
      packageId,
      date: date.toISOString().slice(0, 10),
      seatsAvailable: 2 + (index % 5),
    }
  })
}

export class SupabaseAvailabilityRepository implements AvailabilityRepository {
  async listByPackage(packageId: string): Promise<AvailabilitySlot[]> {
    if (!supabaseClient) {
      return buildMock(packageId)
    }

    const { data, error } = await supabaseClient
      .from('transfer_availability')
      .select('id, package_id, date, seats_available, price_override')
      .eq('package_id', packageId)
      .gte('date', new Date().toISOString().slice(0, 10))
      .order('date', { ascending: true })

    if (error) {
      throw new Error(`Unable to load package availability: ${error.message}`)
    }

    return (data as AvailabilityRow[]).map((row) => ({
      id: row.id,
      packageId: row.package_id,
      date: row.date,
      seatsAvailable: row.seats_available,
      priceOverride: row.price_override ?? undefined,
    }))
  }
}
