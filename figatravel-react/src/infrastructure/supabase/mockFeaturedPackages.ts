import type { TravelPackage } from '../../domain/entities/TravelPackage'

export const mockFeaturedPackages: TravelPackage[] = [
  {
    id: 'pkg-cancun-lujo',
    title: 'Cancun All Inclusive Lux',
    destination: 'Quintana Roo, Mexico',
    durationDays: 5,
    price: 11490,
    currency: 'MXN',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description:
      '5-star hotel, transfers, Isla Mujeres tours, and destination concierge.',
    isFeatured: true,
  },
  {
    id: 'pkg-cartagena-romance',
    title: 'Cartagena Romance Escape',
    destination: 'Cartagena, Colombia',
    durationDays: 6,
    price: 12990,
    currency: 'MXN',
    imageUrl:
      'https://images.unsplash.com/photo-1531686264889-56fdcabd163f?auto=format&fit=crop&w=1200&q=80',
    description:
      'City tour, premium dinner, and boutique stay in the walled city.',
    isFeatured: true,
  },
  {
    id: 'pkg-madrid-paris',
    title: 'Madrid + Paris Signature',
    destination: 'Spain and France',
    durationDays: 9,
    price: 34990,
    currency: 'MXN',
    imageUrl:
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
    description:
      'Multicity flights, high-speed rail, and guided cultural experiences.',
    isFeatured: true,
  },
]
