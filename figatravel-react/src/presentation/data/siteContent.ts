export interface Destination {
  slug: string
  name: string
  image: string
  summary: string
  highlights: string[]
  transferTime: string
  bestFor: string
}

export interface Priority {
  title: string
  description: string
}

export interface Testimonial {
  author: string
  quote: string
}

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
    summary: 'Volcan Arenal, aguas termales y senderos de aventura.',
    highlights: ['Volcan Arenal', 'Aguas termales', 'Puentes colgantes'],
    transferTime: '3h desde San Jose',
    bestFor: 'Aventura y naturaleza',
  },
  {
    slug: 'papagayo',
    name: 'Papagayo',
    image:
      'https://static.wixstatic.com/media/3c2b27_8b9eafda785549aca1b4bb40e9bdddca~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_8b9eafda785549aca1b4bb40e9bdddca~mv2.jpg',
    summary: 'Playas tranquilas y hoteles premium frente al Pacifico.',
    highlights: ['Resorts premium', 'Playas serenas', 'Excursiones marinas'],
    transferTime: '4h 30m desde San Jose',
    bestFor: 'Relax y lujo',
  },
  {
    slug: 'puerto-viejo',
    name: 'Puerto Viejo',
    image:
      'https://static.wixstatic.com/media/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg/v1/fill/w_600,h_360,al_b,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2a4fde24433147dd9a427265f0089b9b~mv2.jpg',
    summary: 'Vibra caribena, cultura afro y naturaleza exuberante.',
    highlights: ['Cultura local', 'Playa Cocles', 'Gastronomia caribena'],
    transferTime: '4h 45m desde San Jose',
    bestFor: 'Cultura y playa',
  },
  {
    slug: 'manuel-antonio',
    name: 'Manuel Antonio',
    image:
      'https://static.wixstatic.com/media/3c2b27_e22958117a224b66b8f2a460869016a2~mv2.png/v1/fill/w_600,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_e22958117a224b66b8f2a460869016a2~mv2.png',
    summary: 'Parque nacional, fauna silvestre y playas espectaculares.',
    highlights: ['Parque Nacional', 'Monos y perezosos', 'Tours de catamaran'],
    transferTime: '3h 30m desde San Jose',
    bestFor: 'Familias y naturaleza',
  },
  {
    slug: 'tamarindo',
    name: 'Tamarindo',
    image:
      'https://static.wixstatic.com/media/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2b4615b6fd4740d0b218fdf716ccebcc~mv2.jpg',
    summary: 'Surf, restaurantes y atardeceres inolvidables.',
    highlights: ['Surf spots', 'Vida nocturna', 'Atardeceres'],
    transferTime: '4h 40m desde San Jose',
    bestFor: 'Surf y amigos',
  },
  {
    slug: 'san-jose-city',
    name: 'San Jose City',
    image:
      'https://static.wixstatic.com/media/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg/v1/fill/w_600,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3c2b27_2bacbeda9fd54ad4b1acd7106747e49b~mv2.jpg',
    summary: 'Cultura urbana, museos y conexiones a todo el pais.',
    highlights: ['Museos', 'Mercados locales', 'Vida urbana'],
    transferTime: 'Traslado interno',
    bestFor: 'Escapada urbana',
  },
]

export function findDestinationBySlug(slug: string) {
  return topDestinations.find((destination) => destination.slug === slug)
}

export const priorities: Priority[] = [
  {
    title: 'Experienced Drivers',
    description:
      'Conductores expertos dedicados a brindar traslados seguros y puntuales.',
  },
  {
    title: 'Vehicle Maintenance',
    description:
      'Unidades inspeccionadas para asegurar rendimiento optimo en cada ruta.',
  },
  {
    title: 'Insurance Coverage',
    description:
      'Cobertura integral para proteger cada tramo de tu experiencia.',
  },
  {
    title: 'COVID-19 Measures',
    description:
      'Sanitizacion reforzada, higiene constante y protocolos de prevencion.',
  },
]

export const testimonials: Testimonial[] = [
  {
    author: 'Sarah Davis',
    quote:
      'Andreina hizo inolvidable mi viaje. Servicio impecable y gran conocimiento local.',
  },
  {
    author: 'Natalia V',
    quote:
      'Enrique fue excelente para nuestro viaje familiar. Todo limpio, puntual y comodo.',
  },
  {
    author: 'Emily Martinez',
    quote:
      'Atencion sobresaliente de inicio a fin. Nos sentimos seguros en todo momento.',
  },
  {
    author: 'David Patel',
    quote:
      'Traslado sin estres para viaje de trabajo. Volveria a contratar sin dudar.',
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'Como reservo un traslado?',
    answer:
      'Puedes reservar desde Book Online o por WhatsApp con fecha, ruta y numero de pasajeros.',
  },
  {
    question: 'Aceptan pagos en linea?',
    answer:
      'Si, puedes confirmar tu servicio con pago digital y recibir comprobante por correo.',
  },
  {
    question: 'Incluye espera en aeropuerto?',
    answer:
      'Si, monitoreamos vuelos y ajustamos la recogida cuando hay retrasos.',
  },
  {
    question: 'Manejan rutas personalizadas?',
    answer:
      'Si, armamos rutas multi-destino segun tu plan de viaje.',
  },
]
