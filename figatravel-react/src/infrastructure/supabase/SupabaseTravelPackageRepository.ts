import type { TravelPackage } from '../../domain/entities/TravelPackage'
import type { TravelPackageRepository } from '../../domain/repositories/TravelPackageRepository'
import { mockFeaturedPackages } from './mockFeaturedPackages'
import { supabaseClient } from './supabaseClient'

interface TravelPackageRow {
  id: string
  title: string
  destination: string
  duration_days: number
  price: number
  currency: string
  image_url: string
  description: string
  is_featured: boolean
}

function mapRow(row: TravelPackageRow): TravelPackage {
  return {
    id: row.id,
    title: row.title,
    destination: row.destination,
    durationDays: row.duration_days,
    price: row.price,
    currency: row.currency,
    imageUrl: row.image_url,
    description: row.description,
    isFeatured: row.is_featured,
  }
}

export class SupabaseTravelPackageRepository implements TravelPackageRepository {
  async getFeatured(): Promise<TravelPackage[]> {
    if (!supabaseClient) {
      return mockFeaturedPackages.filter((item) => item.isFeatured)
    }

    const { data, error } = await supabaseClient
      .from('travel_packages')
      .select(
        'id, title, destination, duration_days, price, currency, image_url, description, is_featured',
      )
      .eq('is_featured', true)
      .order('price', { ascending: true })

    if (error) {
      throw new Error(`Unable to load featured packages: ${error.message}`)
    }

    return (data as TravelPackageRow[]).map((row) => mapRow(row))
  }

  async getAll(): Promise<TravelPackage[]> {
    if (!supabaseClient) {
      return mockFeaturedPackages
    }

    const { data, error } = await supabaseClient
      .from('travel_packages')
      .select(
        'id, title, destination, duration_days, price, currency, image_url, description, is_featured',
      )
      .order('title', { ascending: true })

    if (error) {
      throw new Error(`Unable to load all packages: ${error.message}`)
    }

    return (data as TravelPackageRow[]).map((row) => mapRow(row))
  }

  async updateFeatured(packageId: string, isFeatured: boolean): Promise<void> {
    if (!supabaseClient) {
      return
    }

    const { error } = await supabaseClient
      .from('travel_packages')
      .update({ is_featured: isFeatured })
      .eq('id', packageId)

    if (error) {
      throw new Error(`Unable to update featured status: ${error.message}`)
    }
  }
}
