export interface Destination {
  slug: string
  name: string
  image: string
  cardImage: string
  heroImage: string
  summary: string
  highlights: string[]
  transferTime: string
  bestFor: string
  intro: string
  bookLabel: string
  attractions: string[]
  travelTips: string[]
  gallery: string[]
}

export interface Priority {
  title: string
  description: string
}

export type ReviewSource = 'google' | 'tripadvisor'

export interface Review {
  author: string
  /** 1-5, whole stars */
  rating: number
  quote: string
  source: ReviewSource
  /** Route or place the traveler mentions, shown under their name. */
  trip?: string
  /** Direct permalink to this review; when absent the card links to the profile below. */
  url?: string
}

// Public Figa Travel listings. Review cards without their own `url` link here.
export const REVIEW_PROFILE_URL: Record<ReviewSource, string> = {
  google:
    'https://www.google.com/maps/place/Figa+Travel+Costa+Rica/@10.4463206,-84.5733905,17z/data=!3m1!4b1!4m6!3m5!1s0x8fa0730fb466682b:0x6adb0f3b5ca53bf!8m2!3d10.4463206!4d-84.5708156!16s%2Fg%2F11vc16jgr5',
  tripadvisor:
    'https://www.tripadvisor.es/Attraction_Review-g309226-d26727944-Reviews-Figa_Travel_Costa_Rica-La_Fortuna_de_San_Carlos_Arenal_Volcano_National_Park_Pro.html',
}

/** Only 5-star reviews are surfaced on the home page. */
export const MIN_FEATURED_RATING = 5

export interface Vehicle {
  slug: string
  name: string
  /** Short class label, e.g. "Passenger van". */
  category: string
  image: string
  /** Human-readable seat range, e.g. "1–9 passengers". */
  capacity: string
  premium?: boolean
  summary: string
  features: string[]
}

// Ordered by passenger capacity, from the premium 4-seat SUV up to the minibus.
export const fleet: Vehicle[] = [
  {
    slug: 'toyota-land-cruiser-prado',
    name: 'Toyota Land Cruiser Prado',
    category: 'Premium SUV',
    image: '/assets/fleet/tp2018b.png',
    capacity: '1–4 passengers',
    premium: true,
    summary:
      'Our top comfort option for couples and small families, and the surest ride on gravel and mountain access roads.',
    features: [
      'Up to 4 passengers plus luggage',
      'Leather seats and dual-zone climate control',
      'All-wheel drive for rougher routes',
      'Ideal for honeymoons and private tours',
    ],
  },
  {
    slug: 'hyundai-staria',
    name: 'Hyundai Staria',
    category: 'Passenger van',
    image: '/assets/fleet/Hs2024g.png',
    capacity: '1–5 passengers',
    summary:
      'A modern van with panoramic windows and a quiet, smooth ride for small groups.',
    features: [
      'Up to 5 passengers plus luggage',
      'Large windows and generous legroom',
      'USB charging and strong air conditioning',
      'Great for airport transfers with light luggage',
    ],
  },
  {
    slug: 'toyota-hiace',
    name: 'Toyota Hiace',
    category: 'Tourism van',
    image: '/assets/fleet/thtb2024b.png',
    capacity: '1–6 passengers',
    summary:
      'The dependable workhorse of Costa Rica tourism, sized for a family and all of its gear.',
    features: [
      'Up to 6 passengers plus luggage',
      'Dedicated rear luggage area',
      'Air conditioning throughout the cabin',
      'Everyday airport and hotel transfers',
    ],
  },
  {
    slug: 'toyota-hiace-commuter',
    name: 'Toyota Hiace Commuter',
    category: 'Large passenger van',
    image: '/assets/fleet/thta2024b.png',
    capacity: '1–9 passengers',
    summary:
      'The high-roof Hiace: stand-up height inside and room for larger families or small tour groups.',
    features: [
      'Up to 9 passengers plus luggage',
      'High roof for easy boarding',
      'Extended luggage compartment',
      'Multi-stop itineraries and day tours',
    ],
  },
  {
    slug: 'toyota-coaster',
    name: 'Toyota Coaster',
    category: 'Minibus',
    image: '/assets/fleet/tc2024b.png',
    capacity: 'Up to 18 passengers',
    summary:
      'A full minibus for large groups, weddings, corporate travel, and event transportation.',
    features: [
      'Up to 18 passengers plus a luggage bay',
      'High headroom and a wide aisle',
      'Air conditioning and PA system',
      'Group tours, events, and conferences',
    ],
  },
]

import { getDestinationGallery } from './destinationGalleries'

export interface FaqItem {
  question: string
  answer: string
}

export const topDestinations: Destination[] = [
  {
    slug: 'la-fortuna',
    name: 'La Fortuna',
    image:
      'https://static.wixstatic.com/media/3c2b27_a0212ef900a74c5fb1dcd5259297b883~mv2.png/v1/fill/w_600,h_360,al_b,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_a0212ef900a74c5fb1dcd5259297b883~mv2.png',
    cardImage:
      '/assets/destinations/la-fortuna.png',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_a0212ef900a74c5fb1dcd5259297b883~mv2.png/v1/fill/w_980,h_301,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HEADER%20VOLCANO%20.png',
    summary: 'Arenal Volcano, hot springs, and adventure trails.',
    highlights: ['Arenal Volcano', 'Hot springs', 'Hanging bridges'],
    transferTime: '3h from San Jose',
    bestFor: 'Adventure and nature',
    intro:
      "La Fortuna, nestled in the heart of Costa Rica, is a breathtaking destination known for its lush landscapes and the majestic Arenal Volcano. Visitors flock here to experience the perfect blend of adventure and relaxation.",
    bookLabel: 'BOOK TRANSPORTATION TO LA FORTUNA',
    attractions: [
      "Arenal Volcano: Marvel at the iconic Arenal Volcano, one of the world's most active volcanoes.",
      'La Fortuna Waterfall: Hike to the stunning La Fortuna Waterfall and take a refreshing swim in its emerald pool.',
      'Hot Springs: Relax in the natural hot springs, rejuvenating your body with the geothermal warmth.',
    ],
    travelTips: [
      'Best Time to Visit: The dry season, from December to April, offers the most favorable weather.',
      'Weather: Expect warm days and cooler evenings; pack accordingly.',
      'Health Precautions: Ensure you have insect repellent and sunscreen for outdoor activities.',
    ],
    gallery: getDestinationGallery('la-fortuna'),
  },
  {
    slug: 'papagayo',
    name: 'Papagayo',
    image:
      'https://static.wixstatic.com/media/3c2b27_8b9eafda785549aca1b4bb40e9bdddca~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_8b9eafda785549aca1b4bb40e9bdddca~mv2.jpg',
    cardImage:
      '/assets/destinations/papagayo.jpg',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_5ebc8a526e7141d48f1b72efc2e130f2~mv2.png/v1/fill/w_980,h_301,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PAPAGAYO3.png',
    summary: 'Peaceful beaches and premium resorts on the Pacific coast.',
    highlights: ['Premium resorts', 'Serene beaches', 'Ocean excursions'],
    transferTime: '4h 30m from San Jose',
    bestFor: 'Relaxation and luxury',
    intro:
      "Papagayo, located on Costa Rica's Pacific coast, is a luxurious and tranquil destination known for its pristine beaches and upscale resorts. It offers a perfect blend of relaxation and adventure.",
    bookLabel: 'BOOK TRANSPORTATION TO PAPAGAYO',
    attractions: [
      'Playa Hermosa: Enjoy the beauty of Playa Hermosa, a stunning beach known for its calm waters and scenic surroundings.',
      'Water Sports: Experience thrilling water sports such as snorkeling, scuba diving, and deep-sea fishing.',
      'Golfing: Tee off at the renowned Papagayo Golf & Country Club for a round of golf in a lush tropical setting.',
    ],
    travelTips: [
      'Best Time to Visit: Plan your trip during the dry season from December to April for the best weather conditions.',
      'Weather: Expect warm and sunny days; pack beachwear, sunscreen, and sunglasses.',
    ],
    gallery: getDestinationGallery('papagayo'),
  },
  {
    slug: 'puerto-viejo',
    name: 'Puerto Viejo',
    image:
      'https://static.wixstatic.com/media/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg/v1/fill/w_600,h_360,al_b,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg',
    cardImage:
      '/assets/destinations/puerto-viejo.jpg',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg/v1/fill/w_980,h_301,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg',
    summary: 'Caribbean vibe, Afro-Caribbean culture, and lush nature.',
    highlights: ['Local culture', 'Cocles Beach', 'Caribbean cuisine'],
    transferTime: '4h 45m from San Jose',
    bestFor: 'Culture and beach',
    intro:
      'Puerto Viejo combines Caribbean rhythm, tropical beaches and vibrant local culture, making it ideal for travelers looking for laid-back adventure.',
    bookLabel: 'BOOK TRANSPORTATION TO PUERTO VIEJO',
    attractions: [
      'Playa Cocles: Crystal-clear waters and long sandy beaches perfect for relaxing days.',
      'Jaguar Rescue Center: Learn about wildlife conservation and local biodiversity.',
      'Cahuita National Park: Snorkeling and coastal trails with unique marine life.',
    ],
    travelTips: [
      'Best Time to Visit: September and October usually offer drier conditions in this Caribbean area.',
      'Weather: Warm and humid weather year-round, bring light clothes and rain protection.',
      'Transport: Plan transfers in advance because distances from airports are long.',
    ],
    gallery: getDestinationGallery('puerto-viejo'),
  },
  {
    slug: 'manuel-antonio',
    name: 'Manuel Antonio',
    image:
      'https://static.wixstatic.com/media/3c2b27_e22958117a224b66b8f2a460869016a2~mv2.png/v1/fill/w_600,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_e22958117a224b66b8f2a460869016a2~mv2.png',
    cardImage:
      '/assets/destinations/manuel-antonio.png',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_e22958117a224b66b8f2a460869016a2~mv2.png/v1/fill/w_980,h_301,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/manuel%20antonio.png',
    summary: 'National park, wildlife, and spectacular beaches.',
    highlights: ['National Park', 'Monkeys and sloths', 'Catamaran tours'],
    transferTime: '3h 30m from San Jose',
    bestFor: 'Families and nature',
    intro:
      "Manuel Antonio, located on the Pacific coast of Costa Rica, is a tropical paradise known for its lush rainforests and pristine beaches. It's a haven for nature lovers and adventure seekers alike.",
    bookLabel: 'BOOK TRANSPORTATION TO MANUEL ANTONIO',
    attractions: [
      'Manuel Antonio National Park: Discover the incredible biodiversity of this renowned national park, home to exotic wildlife and pristine beaches.',
      'Playa Manuel Antonio: Relax on the idyllic Playa Manuel Antonio, where the rainforest meets the sea.',
      'Canopy Tours: Experience the thrill of ziplining through the rainforest canopy.',
    ],
    travelTips: [
      'Best Time to Visit: Visit during the dry season from December to April for ideal weather.',
      'Weather: Expect warm, humid conditions; pack light clothing, sunscreen, and insect repellent.',
      'Park Reservations: Make advance reservations for Manuel Antonio National Park, as daily entry is limited.',
    ],
    gallery: getDestinationGallery('manuel-antonio'),
  },
  {
    slug: 'tamarindo',
    name: 'Tamarindo',
    image:
      'https://static.wixstatic.com/media/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg',
    cardImage:
      '/assets/destinations/tamarindo.jpg',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg/v1/fill/w_980,h_301,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg',
    summary: 'Surf, restaurants, and unforgettable sunsets.',
    highlights: ['Surf spots', 'Nightlife', 'Sunsets'],
    transferTime: '4h 40m from San Jose',
    bestFor: 'Surf and friends',
    intro:
      'Tamarindo is one of the most dynamic beach towns in Costa Rica, famous for surfing, sunsets and a great mix of local and international dining.',
    bookLabel: 'BOOK TRANSPORTATION TO TAMARINDO',
    attractions: [
      'Surfing Lessons: Perfect waves for beginners and experienced surfers.',
      'Catamaran Tours: Explore the coast and enjoy sunset cruises.',
      'Nightlife: Restaurants and beach bars with lively atmosphere.',
    ],
    travelTips: [
      'Best Time to Visit: Dry season from December to April has the sunniest days.',
      'Weather: Hot weather and strong sun, stay hydrated and use sunscreen.',
      'Transport: Reserve transfers early during high season demand.',
    ],
    gallery: getDestinationGallery('tamarindo'),
  },
  {
    slug: 'san-jose-city',
    name: 'San Jose City',
    image:
      'https://static.wixstatic.com/media/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg',
    cardImage:
      '/assets/destinations/san-jose-city.jpg',
    heroImage:
      'https://static.wixstatic.com/media/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg/v1/fill/w_980,h_301,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg',
    summary: 'Urban culture, museums, and connections across the country.',
    highlights: ['Museums', 'Local markets', 'City life'],
    transferTime: 'Local transfer',
    bestFor: 'Urban getaway',
    intro:
      'San Jose City is the cultural and business center of Costa Rica, ideal for travelers who want museums, local food and fast access to national routes.',
    bookLabel: 'BOOK TRANSPORTATION TO SAN JOSE CITY',
    attractions: [
      'National Theatre: A historic landmark in the heart of the capital.',
      'Central Market: Discover local flavors and artisan products.',
      'Museums District: Visit museums and galleries with Costa Rican history.',
    ],
    travelTips: [
      'Best Time to Visit: Morning and evening tours are ideal due to lower traffic.',
      'Weather: Mild temperatures with occasional rain, carry a light jacket.',
      'Transport: Use private transfers for airport and intercity routes.',
    ],
    gallery: getDestinationGallery('san-jose-city'),
  },
]

export function findDestinationBySlug(slug: string) {
  return topDestinations.find((destination) => destination.slug === slug)
}

export const priorities: Priority[] = [
  {
    title: 'Flight tracking, free wait time',
    description:
      'We follow your flight and adjust the pickup if it lands early or late. Every airport transfer includes 60 minutes of complimentary wait time.',
  },
  {
    title: 'Licensed bilingual drivers',
    description:
      'Local drivers authorized by the ICT tourism board who speak English and Spanish and know every route, from San Jose to both coasts.',
  },
  {
    title: 'Insured, air-conditioned fleet',
    description:
      'Late-model SUVs and vans with commercial passenger insurance, a seatbelt for every seat, cold water on board, and child seats on request.',
  },
  {
    title: 'One fixed price, door to door',
    description:
      'The quote you approve is the price you pay: tolls, taxes, and fuel included. No meter, no surprises, hotel lobby to hotel lobby.',
  },
]

// Curated highlights from real review platforms. Kept in code (not a live API)
// so the section stays fast and dependency-free; refresh periodically by hand.
export const reviews: Review[] = [
  {
    author: 'Jennifer R.',
    rating: 5,
    source: 'google',
    trip: 'SJO Airport to La Fortuna',
    quote:
      'Our driver was waiting with a sign, handled every bag, and stopped at the Arenal viewpoint for photos. Spotless van, cold water, calm driving the whole way up the mountain.',
  },
  {
    author: 'marcus_h',
    rating: 5,
    source: 'tripadvisor',
    trip: 'Two weeks, four transfers',
    quote:
      'Used Figa Travel for San Jose, Monteverde and Manuel Antonio. Always on time, always answering on WhatsApp, and the fixed price never changed. Easiest part of our trip.',
  },
  {
    author: 'Familia Gomez',
    rating: 5,
    source: 'google',
    trip: 'Tamarindo with kids',
    quote:
      'We travelled with two small children and they arranged car seats with no fuss. The driver took the curves slowly and checked in with us the whole way. We will book again.',
  },
  {
    author: 'SunChaser2024',
    rating: 5,
    source: 'tripadvisor',
    trip: 'Delayed flight pickup',
    quote:
      'Our flight landed two hours late. The driver tracked it and was still there waiting, no extra charge. Comfortable Hiace, working A/C, excellent English. Rare service.',
  },
  {
    author: 'David P.',
    rating: 5,
    source: 'google',
    trip: 'Tamarindo to SJO Airport',
    quote:
      'Professional from the first message. Clear quote, no hidden fees, tolls included. Pickup was early enough that we never felt rushed getting to the airport.',
  },
  {
    author: 'Elena K.',
    rating: 4,
    source: 'tripadvisor',
    trip: 'Puerto Viejo transfer',
    quote:
      'Clean vehicle and a friendly driver who shared good tips about Puerto Viejo. Pickup ran about ten minutes late, but they messaged ahead to let us know. Would use again.',
  },
  {
    author: 'Robert & Susan',
    rating: 5,
    source: 'google',
    trip: 'Papagayo to San Jose',
    quote:
      'We felt safe the entire drive. The driver knew the roads, kept a steady pace, and the vehicle was newer than what we have had with other companies here.',
  },
  {
    author: 'trekker_cr',
    rating: 5,
    source: 'tripadvisor',
    trip: 'Hotel to Manuel Antonio',
    quote:
      'Easy booking, quick replies, and the price I was quoted was the price I paid. Straight from my hotel lobby to Manuel Antonio. Already planning to use them next trip.',
  },
]

// What the home page carousel shows: top-rated reviews only.
export const featuredReviews: Review[] = reviews.filter(
  (review) => review.rating >= MIN_FEATURED_RATING,
)

export const faqItems: FaqItem[] = [
  {
    question: 'How can I book transportation services with your company?',
    answer:
      'You can book from Book Online, by WhatsApp, or by sending us a direct message with your route, date, and number of travelers.',
  },
  {
    question: 'Where do you provide transportation services in Costa Rica?',
    answer:
      'We provide transfers across Costa Rica, including airport pickups, popular destinations, and custom routes by request.',
  },
  {
    question: 'Can I make changes to my booking after it has been confirmed?',
    answer:
      'Yes. Contact us as soon as possible and we will help update your reservation when availability allows.',
  },
  {
    question: 'What types of vehicles do you use for transportation?',
    answer:
      'We use comfortable, well-maintained vehicles selected to match the size of your group and the route you need.',
  },
  {
    question: 'Are your drivers licensed and experienced?',
    answer:
      'Yes. Our drivers are licensed, experienced, and familiar with Costa Rica routes and travel conditions.',
  },
  {
    question: 'Do you offer transportation to and from the airport?',
    answer:
      'Yes. Airport transfers are one of our main services and we track arrival times for smoother pickups.',
  },
  {
    question: 'What safety measures do you have in place?',
    answer:
      'We focus on reliable vehicles, careful driving, and clear coordination before every trip.',
  },
  {
    question: 'Do you offer transportation services for large groups or events?',
    answer:
      'Yes. We can organize service for families, groups, and event transportation needs.',
  },
  {
    question: 'Can you accommodate special requests, such as child seats or pet-friendly transportation?',
    answer:
      'Yes. Let us know your special request in advance and we will do our best to accommodate it.',
  },
  {
    question: 'How far in advance should I book my transportation services?',
    answer:
      'Booking in advance is recommended, especially for busy seasons, but we also try to help with last-minute requests.',
  },
]
