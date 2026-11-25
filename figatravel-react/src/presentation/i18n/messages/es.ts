import type { Messages } from './en'

export const es: Messages = {
  common: {
    whatsappBookingText: 'Hola Figa Travel, quiero reservar un traslado',
    whatsappFleetText: 'Hola Figa Travel, tengo una pregunta sobre su flota',
    chatOnWhatsApp: 'Escríbenos por WhatsApp',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    phoneWhatsApp: 'Teléfono / WhatsApp',
    date: 'Fecha',
    notesOptional: 'Notas (opcional)',
    invalidEmail: 'Ingresa un correo electrónico válido.',
    selectDateFirst: 'Primero selecciona una fecha',
    amountToPay: 'Monto a pagar:',
    creatingReservation: 'Creando reserva...',
    continueToPayment: 'Continuar al pago',
    premium: 'Premium',
    lastUpdated: 'Última actualización:',
    loading: 'Cargando...',
  },
  language: {
    label: 'Idioma',
  },
  layout: {
    skipToContent: 'Saltar al contenido principal',
    mainNavAria: 'Principal',
    homeAria: 'Inicio de Figa Travel',
    menu: 'Menú',
    nav: {
      home: 'Inicio',
      destinations: 'Destinos',
      fleet: 'Flota',
      bookOnline: 'Reservar',
      faq: 'Preguntas',
      aboutUs: 'Nosotros',
      contact: 'Contacto',
    },
    admin: 'Admin',
    logOut: 'Cerrar sesión',
    logIn: 'Iniciar sesión',
    footerAria: 'Pie de página',
    additionalLinks: 'Enlaces',
    contact: 'Contacto',
    social: 'Redes sociales',
    followUs: 'Síguenos y contáctanos directamente.',
    socialLinksAria: 'Redes sociales',
    privacyPolicy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    copyright: '©2026 Figa Travel Costa Rica',
  },
  floatingWhatsApp: {
    aria: 'Escríbenos por WhatsApp',
    label: '¿Necesitas transporte? Escríbenos',
  },
  home: {
    heroAria: 'Descubre la belleza de Costa Rica',
    heroBadge: 'Calificación 4.9/5 de viajeros en Google y Tripadvisor',
    heroTitle: 'Descubre la belleza de Costa Rica con FIGA TRAVEL',
    heroSubtitle: 'Traslados privados, asesoría local y rutas seleccionadas, de los volcanes a las playas.',
    heroHighlights: ['Seguimiento de vuelos', 'Choferes bilingües con licencia', 'Precio fijo, peajes incluidos'],
    seeMyPrice: 'Ver mi precio',
    trustAria: 'Indicadores de confianza',
    trustTransfers: 'traslados exitosos cada temporada',
    trustSupport: 'asistencia durante el viaje por WhatsApp y correo',
    trustRating: 'satisfacción promedio de los viajeros',
    servicesAria: 'Servicios destacados',
    services: ['WI-FI', 'Atención al cliente', 'Eco-responsables', 'Vehículos en excelente estado'],
    stepsEyebrow: 'Reserva en minutos',
    stepsTitle: 'Cómo funciona tu traslado privado',
    steps: [
      {
        title: 'Cuéntanos tu ruta',
        description:
          'Ingresa tu punto de recogida y de destino: el aeropuerto, tu hotel o cualquier dirección en Costa Rica. Tu precio fijo aparece en segundos.',
      },
      {
        title: 'Reserva y paga de forma segura',
        description:
          'Reserva en línea con pago con tarjeta cifrado o escríbenos por WhatsApp. Sin taxímetro y sin cargos ocultos.',
      },
      {
        title: 'Conoce a tu chofer',
        description:
          'Tu chofer bilingüe sigue tu vuelo, te recibe en el punto de recogida y te lleva puerta a puerta en un vehículo con aire acondicionado.',
      },
    ],
    destinationsEyebrow: 'A dónde vamos',
    destinationsTitle: 'Destinos principales en Costa Rica',
    allDestinations: 'Todos los destinos',
    prioritiesEyebrow: 'Por qué los viajeros eligen Figa',
    prioritiesTitle: 'Lo que incluye cada traslado',
    testimonialsEyebrow: 'Calificación 4.9/5 en Google y Tripadvisor',
    testimonialsTitle: 'Lo que dicen los viajeros',
    fleetEyebrow: 'Nuestra flota',
    fleetTitle: 'Un vehículo para cada tamaño de grupo',
    viewFullFleet: 'Ver toda la flota',
    faqEyebrow: '¿Tienes preguntas?',
    faqTitle: 'Preguntas frecuentes',
    faqTextBefore:
      'Si tienes otras preguntas, contáctanos por WhatsApp, correo o nuestro formulario de contacto. O revisa nuestras',
    faqLink: 'preguntas frecuentes',
    topQuestions: 'Preguntas principales',
    viewAll: 'Ver todas',
    finalEyebrow: 'Listos cuando aterrices',
    finalTitle: 'Tu traslado privado por Costa Rica empieza aquí',
    finalText: 'Obtén un precio fijo puerta a puerta en segundos. Peajes, impuestos y combustible incluidos, sin sorpresas.',
    getMyPrice: 'Obtener mi precio',
  },
  routeSearch: {
    title: '¿A dónde te diriges?',
    pickupLabel: 'Lugar de recogida',
    pickupPlaceholder: '¿Desde dónde?',
    dropoffLabel: 'Lugar de destino',
    dropoffPlaceholder: '¿Hacia dónde?',
    swap: 'Intercambiar recogida y destino',
    passengersLegend: 'Pasajeros',
    passengersTitle: '¿Cuántos pasajeros?',
    adults: 'Adultos',
    children: 'Niños',
    calculating: 'Calculando precio...',
    perksAria: 'Beneficios de la reserva',
    perkInstant: 'Precio al instante',
    perkDoor: 'Puerta a puerta',
    perkNoFees: 'Sin cargos ocultos',
    removeOne: (label: string) => `Quitar uno: ${label.toLowerCase()}`,
    addOne: (label: string) => `Agregar uno: ${label.toLowerCase()}`,
    addressUnavailable: 'La búsqueda de direcciones no está disponible.',
  },
  reviews: {
    carouselAria: 'Reseñas de viajeros en Google y Tripadvisor',
    stars: (rating: number) => `${rating} de 5 estrellas`,
    cardAria: (index: number, total: number, author: string, source: string) =>
      `Reseña ${index} de ${total} por ${author} en ${source}; se abre en una pestaña nueva`,
    readOn: (source: string) => `Leer en ${source}`,
    previous: 'Reseñas anteriores',
    next: 'Reseñas siguientes',
    dotsAria: 'Elige un grupo de reseñas',
    goTo: (page: number, total: number) => `Ir a las reseñas ${page} de ${total}`,
  },
  heroMedia: {
    povTag: 'POV · Un viaje real con Figa',
    pause: 'Pausar el video de fondo',
    play: 'Reproducir el video de fondo',
  },
  destinationsPage: {
    eyebrow: 'Costa Rica',
    title: 'Destinos',
    subtitle: 'Conoce nuestros destinos más populares en Costa Rica',
    catalogTitle: 'Catálogo de destinos',
  },
  destinationDetail: {
    notFoundTitle: 'Destino no encontrado',
    notFoundText: 'El destino solicitado no existe o fue removido del catálogo.',
    backToDestinations: 'Volver a destinos',
    heroAlt: (name: string) => `${name}, Costa Rica`,
    galleryAria: 'Galería del destino',
    photoAlt: (name: string, index: number) => `${name}, Costa Rica, foto ${index}`,
    infoTitle: 'Información del destino',
    topAttractions: 'ATRACCIONES PRINCIPALES',
    travelTips: 'CONSEJOS DE VIAJE',
    faqTitle: (name: string) => `Preguntas frecuentes sobre traslados a ${name}`,
  },
  fleetPage: {
    eyebrow: 'NUESTRA FLOTA',
    title: 'Un vehículo para cada tamaño de grupo',
    intro:
      'Desde un SUV premium para dos hasta un microbús de 18 asientos, cada vehículo tiene aire acondicionado, seguro y un chofer local con licencia.',
    listTitle: 'Elige el vehículo adecuado',
    listIntro: '¿No sabes cuál te conviene? Cuéntanos el tamaño de tu grupo y tu ruta y te recomendaremos la mejor opción.',
    bookVehicle: 'Reservar este vehículo',
    askWhatsApp: 'Pregunta por WhatsApp',
    bookTransfer: 'Reservar un traslado',
  },
  faqPage: {
    eyebrow: '¿TIENES PREGUNTAS?',
    title: 'Preguntas frecuentes sobre traslados privados en Costa Rica',
    intro: 'Respuestas rápidas para planear tu viaje con total claridad.',
    listTitle: 'Preguntas frecuentes',
    listIntro: 'Si necesitas algo más, contáctanos por WhatsApp, correo o el formulario de contacto.',
    goToContact: 'Ir a contacto',
  },
  about: {
    heroAlt: 'Paisaje volcánico de Costa Rica',
    eyebrow: 'NOSOTROS',
    title: '¡Tu viaje, nuestra pasión!',
    paragraph1:
      'Nuestra misión es simple: mejorar tu experiencia de viaje en Costa Rica. Estamos aquí para enriquecer tu recorrido con comodidad, seguridad y un servicio memorable.',
    paragraph2:
      'Somos más que una empresa de transporte. Somos tu aliado de viaje para la aventura, la naturaleza, la cultura y el descanso en todo el país.',
    commitmentTitle: 'Nuestro compromiso con la excelencia',
    commitmentText:
      'Desde el momento en que reservas con nosotros hasta que te dejamos en tu destino, nuestro equipo se dedica a tu comodidad, seguridad y satisfacción.',
    closingTitle: 'Gracias por considerar a Figa Travel Costa Rica',
    closingText: 'Esperamos ser parte de tu aventura y ayudarte a descubrir la belleza de Costa Rica.',
  },
  contact: {
    eyebrow: 'CONTACTO',
    title: 'Estamos listos para ayudarte',
    intro: 'Cuéntanos tu idea de viaje y te responderemos con horarios, ruta y detalles de la propuesta.',
    channelsTitle: 'Canales directos',
    channelsIntro: 'Atención rápida por teléfono, correo y WhatsApp.',
    address: 'Dirección',
    formTitle: 'Formulario de contacto',
    formSubtitle: 'Envíanos un mensaje y te responderemos por correo.',
  },
  contactForm: {
    subject: 'Asunto',
    message: 'Mensaje',
    messagePlaceholder: 'Cuéntanos cómo podemos ayudarte.',
    sending: 'Enviando...',
    send: 'Enviar mensaje',
    success: 'Gracias por escribirnos. Te responderemos por correo pronto.',
  },
  notFound: {
    title: 'No encontramos esa página',
    text: 'La página que buscas no existe o fue movida. Te ayudamos a retomar el camino.',
    backHome: 'Volver al inicio',
  },
  bookOnline: {
    eyebrow: 'Traslados privados',
    title: 'Reservar en línea',
    intro: 'Obtén un precio al instante para cualquier ruta en Costa Rica o elige uno de nuestros traslados de precio fijo.',
    modeTabsAria: '¿Cómo quieres reservar?',
    modeCustom: 'Cualquier ruta - precio al instante',
    modePackages: 'Rutas de precio fijo',
    instantPriceAria: 'Precio de ruta al instante',
    loadingPackages: 'Cargando paquetes...',
    bookNow: 'Reservar ahora',
  },
  customRouteForm: {
    title: 'Tu traslado privado',
    intro: 'Revisa tu precio y agrega los datos de tu viaje para continuar al pago seguro.',
    pickup: 'Recogida',
    dropoff: 'Destino',
    approxDrive: 'Duración aprox.',
    passengers: 'Pasajeros',
    passengerSummary: (adults: number, children: number) =>
      `${adults} ${adults === 1 ? 'adulto' : 'adultos'}` +
      (children > 0 ? `, ${children} ${children === 1 ? 'niño' : 'niños'}` : ''),
    totalPrice: 'Precio total',
    notesPlaceholder: 'Número de vuelo, equipaje, sillas para niños, paradas...',
    pickupTime: 'Hora de recogida',
    futureDateHint: 'Las reservas en línea empiezan a partir de mañana. Selecciona una fecha futura.',
  },
  reservationForm: {
    title: 'Datos de la reserva',
    intro: 'Completa tus datos para continuar al pago seguro.',
    loadingServices: 'Cargando servicios...',
    service: 'Servicio',
    selectService: 'Selecciona un servicio',
    availableDates: 'Fechas con disponibilidad:',
    travelers: 'Viajeros',
    pickupLocation: 'Lugar de recogida',
    pickupPlaceholder: 'Nombre del hotel o dirección en La Fortuna',
    availableTime: 'Horario disponible',
    selectServiceFirst: 'Primero selecciona un servicio',
    loadingAvailability: 'Cargando disponibilidad...',
    noAvailability: 'No hay disponibilidad para hoy ni fechas pasadas. Selecciona una fecha futura.',
  },
  timePicker: {
    tabsAria: 'Momento del día',
    night: 'Madrugada',
    morning: 'Mañana',
    afternoon: 'Tarde',
    evening: 'Noche',
    timesAria: 'Horarios disponibles',
  },
  checkout: {
    title: 'Pago seguro',
    order: (orderNumber: string, amount: string) => `Orden #${orderNumber} - ${amount}`,
    startingSession: 'Iniciando sesión segura...',
    loadingForm: 'Cargando formulario de pago...',
    paymentMethod: 'Método de pago',
    selectMethod: 'Selecciona el método de pago',
    savedCards: 'Tarjetas guardadas',
    selectCard: 'Selecciona una tarjeta',
    cardNumber: 'Número de tarjeta',
    expiration: 'Fecha de vencimiento',
    cvv: 'CVV',
    phoneNumber: 'Número de teléfono',
    processing: 'Procesando...',
    pay: (amount: string) => `Pagar ${amount}`,
    securityNote: 'Los datos de tu tarjeta se cifran y Tilopay los procesa de forma segura.',
    notReady: 'El formulario de pago aún no está listo.',
    rejected: 'El pago fue rechazado. Inténtalo de nuevo.',
    loadError: 'No se pudo cargar el formulario de pago.',
    noMethods: 'Tilopay no devolvió métodos de pago.',
  },
  paymentResponse: {
    title: 'Resultado del pago',
    verifying: 'Verificando tu pago con Tilopay...',
    approvedTitle: 'Pago aprobado',
    approvedText: 'Tu reserva ha sido confirmada.',
    failedTitle: 'Pago no aprobado',
    failedText: 'El pago fue rechazado. Inténtalo de nuevo.',
  },
  legal: {
    eyebrow: 'LEGAL',
    or: 'o',
    translationNotice:
      'Esta traducción se ofrece por conveniencia. En caso de diferencias, prevalece la versión en inglés.',
  },
  privacy: {
    title: 'Política de privacidad',
    introTitle: '1. Introducción',
    introText:
      'Figa Travel Costa Rica ("Figa Travel", "nosotros") ofrece servicios de transporte privado en todo Costa Rica. Esta Política de privacidad explica qué datos personales recopilamos a través de figatravelcr.com, cómo los usamos y qué opciones tienes. Al usar este sitio o reservar un traslado con nosotros, aceptas las prácticas descritas aquí.',
    dataTitle: '2. Información que recopilamos',
    dataItems: [
      {
        strong: 'Datos de contacto y de reserva',
        text: ' que envías mediante el formulario de contacto o el formulario de reserva en línea: nombre completo, correo, teléfono, lugares de recogida y destino, fecha y hora del viaje, número de viajeros y cualquier nota que agregues.',
      },
      {
        strong: 'Datos de pago',
        text: ': los pagos con tarjeta los procesa directamente nuestro proveedor de pagos, Tilopay. Nunca vemos ni almacenamos el número completo de tu tarjeta, la fecha de vencimiento ni el CVV; esos datos se ingresan en el formulario seguro de Tilopay y se manejan bajo sus propios estándares de seguridad.',
      },
      {
        strong: 'Datos de cuenta',
        text: ', solo si creas una cuenta de administrador: tu correo y los metadatos de autenticación, gestionados por nuestro proveedor de base de datos, Supabase.',
      },
      {
        strong: 'Datos técnicos',
        text: ' como el tipo de navegador y el uso general del sitio, que nos ayudan a mantener el servicio confiable y seguro.',
      },
    ],
    useTitle: '3. Cómo usamos tu información',
    useItems: [
      'Para crear y gestionar tu reserva y confirmar el pago.',
      'Para contactarte sobre tu viaje: confirmación de recogida, seguimiento de vuelos y cambios de horario.',
      'Para responder los mensajes enviados mediante el formulario de contacto.',
      'Para mejorar nuestras rutas, vehículos y atención al cliente.',
      'Para cumplir obligaciones legales, tributarias y contables en Costa Rica.',
    ],
    sharingTitle: '4. Cómo compartimos tu información',
    sharingIntro: 'No vendemos tus datos personales. Solo los compartimos con:',
    sharingItems: [
      { strong: 'Tilopay', text: ', para procesar tu pago de forma segura.' },
      {
        strong: 'Supabase',
        text: ', nuestro proveedor de base de datos y autenticación, que almacena los registros de reservas y solicitudes en nuestro nombre.',
      },
      { strong: '', text: 'Las autoridades, cuando la ley lo exija.' },
    ],
    cookiesTitle: '5. Cookies y almacenamiento local',
    cookiesText:
      'Usamos almacenamiento esencial del navegador para mantener tu sesión en el panel de administración y recordar preferencias básicas del sitio, como tu idioma. No usamos rastreadores publicitarios de terceros.',
    retentionTitle: '6. Conservación de datos',
    retentionText:
      'Conservamos los registros de reservas y contacto durante el tiempo necesario para prestar nuestros servicios y cumplir obligaciones contables y legales; después, eliminamos o anonimizamos los datos.',
    rightsTitle: '7. Tus derechos',
    rightsBefore: 'Puedes pedirnos acceder, corregir o eliminar tus datos personales en cualquier momento escribiendo a',
    rightsAfter: '. Responderemos en un plazo razonable.',
    childrenTitle: '8. Privacidad de menores',
    childrenText:
      'Nuestros servicios están dirigidos a adultos que reservan viajes. No recopilamos a sabiendas datos personales directamente de menores.',
    contactTitle: '9. Contáctanos',
    contactBefore: 'Las preguntas sobre esta política pueden enviarse a',
  },
  terms: {
    title: 'Términos y condiciones',
    sections: [
      {
        title: '1. Aceptación de estos términos',
        text: 'Estos Términos y condiciones rigen el uso de figatravelcr.com y de cualquier servicio de transporte privado reservado con Figa Travel Costa Rica. Al enviar una reserva o usar nuestro formulario de contacto, aceptas estos términos.',
      },
      {
        title: '2. Reservas',
        text: 'Una reserva se crea cuando envías el formulario de reserva en línea con tu ruta, fecha, hora de recogida y datos de los viajeros. La reserva queda confirmada una vez que el pago se procesa con éxito. Verifica tu fecha de viaje, lugar de recogida y número de viajeros antes de confirmar el pago.',
      },
      {
        title: '3. Precios y pago',
        text: 'El precio mostrado al pagar es el precio total de tu ruta, puerta a puerta, con peajes y combustible incluidos. Los pagos se procesan de forma segura mediante Tilopay; Figa Travel no almacena los datos de tu tarjeta. Los precios se muestran en la moneda indicada en el formulario de reserva.',
      },
      {
        title: '4. Cambios y cancelaciones',
        text: 'Para cambiar o cancelar una reserva confirmada, contáctanos lo antes posible por WhatsApp, teléfono o correo con los datos de tu reserva. Haremos lo posible por atender los cambios cuando la disponibilidad lo permita, pero los cambios solicitados con poca anticipación a la hora de recogida no siempre serán posibles.',
      },
    ],
    serviceTitle: '5. Prestación del servicio',
    serviceItems: [
      'Las recogidas en el aeropuerto incluyen seguimiento del vuelo y tiempo de espera de cortesía según lo descrito en nuestro sitio.',
      'Los choferes cuentan con licencia y autorización para operar transporte turístico en Costa Rica.',
      'Los tiempos de viaje mostrados en el sitio son estimados; la duración real puede variar por el clima, el estado de las carreteras o el tráfico.',
      'Eres responsable de indicar un lugar de recogida correcto y de estar listo a la hora acordada.',
    ],
    closingSections: [
      {
        title: '6. Responsabilidad',
        text: 'Nuestros vehículos cuentan con seguro comercial de pasajeros. Figa Travel no se hace responsable de retrasos o cambios causados por hechos fuera de nuestro control razonable, como clima extremo, cierres de carreteras, retrasos de vuelos o restricciones gubernamentales. Los pasajeros son responsables de sus pertenencias personales durante el viaje.',
      },
      {
        title: '7. Conducta de los pasajeros',
        text: 'Podemos rechazar o finalizar un viaje si la conducta de un pasajero pone en peligro al chofer, a otros pasajeros o al vehículo.',
      },
      {
        title: '8. Ley aplicable',
        text: 'Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa se resolverá bajo la jurisdicción costarricense.',
      },
    ],
    contactTitle: '9. Contáctanos',
    contactBefore: 'Las preguntas sobre estos términos pueden enviarse a',
    seeAlso: '. Consulta también nuestra',
  },
  content: {
    destinations: {
      'la-fortuna': {
        summary: 'Volcán Arenal, aguas termales y senderos de aventura.',
        transferTime: '3 h desde San José',
        transferDuration: '3 horas',
        bestFor: 'Aventura y naturaleza',
        intro:
          'La Fortuna, en el corazón de Costa Rica, es un destino impresionante conocido por sus paisajes exuberantes y el majestuoso Volcán Arenal. Los visitantes llegan para vivir la combinación perfecta de aventura y descanso.',
        bookLabel: 'RESERVA TRANSPORTE A LA FORTUNA',
        attractions: [
          'Volcán Arenal: admira el icónico Volcán Arenal, uno de los volcanes más activos del mundo.',
          'Catarata La Fortuna: camina hasta la impresionante Catarata La Fortuna y date un baño refrescante en su poza esmeralda.',
          'Aguas termales: relájate en las aguas termales naturales y revitaliza tu cuerpo con el calor geotérmico.',
        ],
        travelTips: [
          'Mejor época para visitar: la temporada seca, de diciembre a abril, ofrece el clima más favorable.',
          'Clima: espera días cálidos y noches más frescas; empaca en consecuencia.',
          'Precauciones de salud: lleva repelente de insectos y protector solar para las actividades al aire libre.',
        ],
      },
      papagayo: {
        summary: 'Playas tranquilas y resorts de lujo en la costa del Pacífico.',
        transferTime: '4 h 30 min desde San José',
        transferDuration: '4 horas y 30 minutos',
        bestFor: 'Descanso y lujo',
        intro:
          'Papagayo, en la costa pacífica de Costa Rica, es un destino lujoso y tranquilo conocido por sus playas vírgenes y resorts de alto nivel. Ofrece la combinación perfecta de descanso y aventura.',
        bookLabel: 'RESERVA TRANSPORTE A PAPAGAYO',
        attractions: [
          'Playa Hermosa: disfruta la belleza de Playa Hermosa, una playa impresionante conocida por sus aguas tranquilas y su entorno escénico.',
          'Deportes acuáticos: vive emocionantes deportes acuáticos como snorkel, buceo y pesca en alta mar.',
          'Golf: juega en el reconocido Papagayo Golf & Country Club, rodeado de vegetación tropical.',
        ],
        travelTips: [
          'Mejor época para visitar: planea tu viaje en la temporada seca, de diciembre a abril, para tener el mejor clima.',
          'Clima: espera días cálidos y soleados; lleva ropa de playa, protector solar y lentes de sol.',
        ],
      },
      'puerto-viejo': {
        summary: 'Ambiente caribeño, cultura afrocaribeña y naturaleza exuberante.',
        transferTime: '4 h 45 min desde San José',
        transferDuration: '4 horas y 45 minutos',
        bestFor: 'Cultura y playa',
        intro:
          'Puerto Viejo combina el ritmo caribeño, playas tropicales y una cultura local vibrante, ideal para viajeros que buscan una aventura relajada.',
        bookLabel: 'RESERVA TRANSPORTE A PUERTO VIEJO',
        attractions: [
          'Playa Cocles: aguas cristalinas y largas playas de arena, perfectas para días de descanso.',
          'Jaguar Rescue Center: aprende sobre conservación de la vida silvestre y la biodiversidad local.',
          'Parque Nacional Cahuita: snorkel y senderos costeros con una vida marina única.',
        ],
        travelTips: [
          'Mejor época para visitar: septiembre y octubre suelen ser los meses más secos en esta zona del Caribe.',
          'Clima: cálido y húmedo todo el año; lleva ropa ligera y protección para la lluvia.',
          'Transporte: planea tus traslados con anticipación porque las distancias desde los aeropuertos son largas.',
        ],
      },
      'manuel-antonio': {
        summary: 'Parque nacional, vida silvestre y playas espectaculares.',
        transferTime: '3 h 30 min desde San José',
        transferDuration: '3 horas y 30 minutos',
        bestFor: 'Familias y naturaleza',
        intro:
          'Manuel Antonio, en la costa pacífica de Costa Rica, es un paraíso tropical conocido por sus bosques exuberantes y playas vírgenes. Es un refugio para amantes de la naturaleza y de la aventura.',
        bookLabel: 'RESERVA TRANSPORTE A MANUEL ANTONIO',
        attractions: [
          'Parque Nacional Manuel Antonio: descubre la increíble biodiversidad de este reconocido parque nacional, hogar de fauna exótica y playas vírgenes.',
          'Playa Manuel Antonio: relájate en la idílica Playa Manuel Antonio, donde el bosque se encuentra con el mar.',
          'Tours de canopy: vive la emoción del canopy sobre las copas del bosque tropical.',
        ],
        travelTips: [
          'Mejor época para visitar: viaja en la temporada seca, de diciembre a abril, para un clima ideal.',
          'Clima: espera condiciones cálidas y húmedas; lleva ropa ligera, protector solar y repelente.',
          'Reservas del parque: reserva con anticipación la entrada al Parque Nacional Manuel Antonio, ya que el ingreso diario es limitado.',
        ],
      },
      tamarindo: {
        summary: 'Surf, restaurantes y atardeceres inolvidables.',
        transferTime: '4 h 40 min desde San José',
        transferDuration: '4 horas y 40 minutos',
        bestFor: 'Surf y amigos',
        intro:
          'Tamarindo es uno de los pueblos de playa más dinámicos de Costa Rica, famoso por el surf, los atardeceres y una gran mezcla de gastronomía local e internacional.',
        bookLabel: 'RESERVA TRANSPORTE A TAMARINDO',
        attractions: [
          'Clases de surf: olas perfectas para principiantes y surfistas con experiencia.',
          'Tours en catamarán: explora la costa y disfruta paseos al atardecer.',
          'Vida nocturna: restaurantes y bares de playa con un ambiente animado.',
        ],
        travelTips: [
          'Mejor época para visitar: la temporada seca, de diciembre a abril, tiene los días más soleados.',
          'Clima: calor y sol intenso; mantente hidratado y usa protector solar.',
          'Transporte: reserva tus traslados con anticipación durante la temporada alta.',
        ],
      },
      'san-jose-city': {
        name: 'San José',
        summary: 'Cultura urbana, museos y conexiones a todo el país.',
        transferTime: 'Traslado local',
        transferDuration: null,
        bestFor: 'Escapada urbana',
        intro:
          'San José es el centro cultural y de negocios de Costa Rica, ideal para viajeros que buscan museos, comida local y acceso rápido a las rutas nacionales.',
        bookLabel: 'RESERVA TRANSPORTE A SAN JOSÉ',
        attractions: [
          'Teatro Nacional: un monumento histórico en el corazón de la capital.',
          'Mercado Central: descubre sabores locales y productos artesanales.',
          'Distrito de museos: visita museos y galerías con la historia de Costa Rica.',
        ],
        travelTips: [
          'Mejor época para visitar: los recorridos de mañana y de noche son ideales por el menor tráfico.',
          'Clima: temperaturas templadas con lluvias ocasionales; lleva una chaqueta ligera.',
          'Transporte: usa traslados privados para rutas al aeropuerto y entre ciudades.',
        ],
      },
    },
    fleet: {
      'toyota-land-cruiser-prado': {
        category: 'SUV premium',
        capacity: '1–3 pasajeros',
        summary:
          'Nuestra opción más cómoda para parejas y familias pequeñas, y la más segura en caminos de lastre y de montaña.',
        features: [
          'Hasta 4 pasajeros más equipaje',
          'Asientos de cuero y climatización de doble zona',
          'Tracción integral para rutas difíciles',
          'Ideal para lunas de miel y tours privados',
        ],
      },
      'hyundai-staria': {
        category: 'Van de pasajeros',
        capacity: '1–5 pasajeros',
        summary: 'Una van moderna con ventanas panorámicas y un viaje silencioso y suave para grupos pequeños.',
        features: [
          'Hasta 5 pasajeros más equipaje',
          'Ventanas amplias y mucho espacio para las piernas',
          'Carga USB y aire acondicionado potente',
          'Ideal para traslados al aeropuerto con poco equipaje',
        ],
      },
      'toyota-hiace': {
        category: 'Van turística',
        capacity: '1–6 pasajeros',
        summary: 'El clásico confiable del turismo en Costa Rica, con espacio para una familia y todo su equipaje.',
        features: [
          'Hasta 6 pasajeros más equipaje',
          'Área de equipaje trasera dedicada',
          'Aire acondicionado en toda la cabina',
          'Traslados diarios al aeropuerto y hoteles',
        ],
      },
      'toyota-hiace-commuter': {
        category: 'Van de pasajeros grande',
        capacity: '1–9 pasajeros',
        summary:
          'La Hiace de techo alto: se puede estar de pie adentro y hay espacio para familias grandes o grupos pequeños.',
        features: [
          'Hasta 9 pasajeros más equipaje',
          'Techo alto para subir con facilidad',
          'Compartimento de equipaje extendido',
          'Itinerarios con varias paradas y tours de un día',
        ],
      },
      'toyota-coaster': {
        category: 'Microbús',
        capacity: 'Hasta 18 pasajeros',
        summary: 'Un microbús completo para grupos grandes, bodas, viajes corporativos y eventos.',
        features: [
          'Hasta 18 pasajeros más compartimento de equipaje',
          'Techo alto y pasillo amplio',
          'Aire acondicionado y sistema de sonido',
          'Tours de grupo, eventos y conferencias',
        ],
      },
    },
    priorities: [
      {
        title: 'Seguimiento de vuelos y espera gratis',
        description:
          'Seguimos tu vuelo y ajustamos la recogida si aterriza antes o después. Cada traslado al aeropuerto incluye 60 minutos de espera de cortesía.',
      },
      {
        title: 'Choferes bilingües con licencia',
        description:
          'Choferes locales autorizados por el ICT que hablan inglés y español y conocen cada ruta, de San José a ambas costas.',
      },
      {
        title: 'Flota asegurada y con aire acondicionado',
        description:
          'SUVs y vans recientes con seguro comercial de pasajeros, cinturón en cada asiento, agua fría a bordo y sillas para niños bajo pedido.',
      },
      {
        title: 'Un precio fijo, puerta a puerta',
        description:
          'El precio que apruebas es el que pagas: peajes, impuestos y combustible incluidos. Sin taxímetro ni sorpresas, de lobby a lobby.',
      },
    ],
    faq: [
      {
        question: '¿Cuál es la mejor forma de ir del Aeropuerto de San José (SJO) a La Fortuna o Arenal?',
        answer:
          'La forma más cómoda es un traslado privado puerta a puerta. Figa Travel Costa Rica te recoge en el Aeropuerto Internacional Juan Santamaría (SJO) con un chofer bilingüe, sigue tu vuelo y te lleva directo a tu hotel en La Fortuna / Arenal en unas 3 horas, con un precio fijo que incluye peajes, impuestos y combustible.',
      },
      {
        question: '¿Cómo reservo un traslado privado o shuttle al aeropuerto en Costa Rica con Figa Travel?',
        answer:
          'Puedes reservar en línea en figatravelcr.com/book-online eligiendo tu ruta, fecha, hora y lugar de recogida y número de viajeros, y pagando de forma segura con tarjeta. También puedes reservar por WhatsApp (+506 7227 1058), teléfono (+506 7139 2747) o correo (infofigatravel@gmail.com). La reserva se confirma una vez procesado el pago.',
      },
      {
        question: '¿Cuánto cuesta un traslado privado en Costa Rica?',
        answer:
          'Figa Travel cobra un precio fijo por vehículo y ruta, no por pasajero ni por taxímetro. El precio que ves al pagar en la página de reservas es el total, puerta a puerta, con peajes, impuestos y combustible incluidos, sin cargos ocultos. Los precios dependen de la ruta y del tamaño del vehículo.',
      },
      {
        question: '¿A qué aeropuertos de Costa Rica dan servicio?',
        answer:
          'Figa Travel ofrece recogidas y entregas en el Aeropuerto Internacional Juan Santamaría (SJO) en San José y en el Aeropuerto de Guanacaste (LIR) en Liberia, conectándolos con La Fortuna, Arenal, Manuel Antonio, Tamarindo, Papagayo, Puerto Viejo, San José y otros destinos de Costa Rica.',
      },
      {
        question: '¿Qué pasa si mi vuelo se retrasa?',
        answer:
          'Para ti no cambia nada. Figa Travel sigue tu vuelo y ajusta la hora de recogida si aterriza antes o después, y cada traslado al aeropuerto incluye 60 minutos de espera de cortesía después del aterrizaje, sin costo adicional.',
      },
      {
        question: '¿En qué partes de Costa Rica ofrece transporte Figa Travel?',
        answer:
          'Figa Travel cubre todo Costa Rica desde su base en La Fortuna (Arenal). Las rutas más populares incluyen San José, el aeropuerto SJO, La Fortuna y el Volcán Arenal, Manuel Antonio, Tamarindo, Papagayo y Puerto Viejo en el Caribe. También ofrecemos rutas personalizadas e itinerarios con varias paradas bajo pedido.',
      },
      {
        question: '¿Cuánto duran los viajes entre los destinos más populares de Costa Rica?',
        answer:
          'Tiempos aproximados de traslado privado desde San José: La Fortuna / Arenal 3 horas, Manuel Antonio 3 horas y 30 minutos, Papagayo 4 horas y 30 minutos, Tamarindo 4 horas y 40 minutos y Puerto Viejo 4 horas y 45 minutos. Los tiempos reales varían según el tráfico, el clima y el estado de las carreteras.',
      },
      {
        question: '¿Qué tipos de vehículos usan y cuántos pasajeros caben?',
        answer:
          'Figa Travel usa vehículos recientes con aire acondicionado según el tamaño de tu grupo: un SUV premium Toyota Land Cruiser Prado (1–3 pasajeros), una van Hyundai Staria (1–5), una Toyota Hiace (1–6), una Toyota Hiace Commuter (1–9) y un microbús Toyota Coaster (hasta 18 pasajeros), todos con espacio para equipaje.',
      },
      {
        question: '¿Sus choferes tienen licencia y hablan inglés?',
        answer:
          'Sí. Todos los choferes de Figa Travel son locales, con experiencia y autorizados por el Instituto Costarricense de Turismo (ICT) para operar transporte turístico, y hablan inglés y español.',
      },
      {
        question: '¿Es seguro el transporte privado en Costa Rica con Figa Travel?',
        answer:
          'Sí. Cada vehículo tiene seguro comercial de pasajeros, cinturón en cada asiento y mantenimiento regular. Los choferes tienen licencia, conocen las rutas de montaña y de costa y manejan a un ritmo constante y cuidadoso. Hay sillas para niños disponibles bajo pedido.',
      },
      {
        question: '¿Ofrecen transporte para grupos grandes, bodas o eventos?',
        answer:
          'Sí. Figa Travel transporta familias, grupos turísticos, bodas, viajes corporativos y conferencias, con vans de hasta 9 pasajeros y un microbús Toyota Coaster de hasta 18 pasajeros. Se pueden combinar varios vehículos para grupos más grandes.',
      },
      {
        question: '¿Pueden ofrecer sillas para niños o transporte con mascotas?',
        answer:
          'Sí. Hay sillas para niños y bebés disponibles bajo pedido, y Figa Travel hará lo posible por atender traslados con mascotas. Menciona tu solicitud al reservar para tener listo el vehículo y el equipo adecuados.',
      },
      {
        question: '¿Puedo hacer paradas en el camino?',
        answer:
          'Sí. Como el traslado es privado, puedes pedirle a tu chofer paradas cortas, como un mirador, una parada para ir al baño o un snack rápido. Para itinerarios con varias paradas planificadas o tours de un día, incluye las paradas al reservar.',
      },
      {
        question: '¿Puedo cambiar o cancelar mi reserva después de confirmada?',
        answer:
          'Sí. Contacta a Figa Travel lo antes posible por WhatsApp, teléfono o correo con los datos de tu reserva y el equipo actualizará tu reserva cuando la disponibilidad lo permita. Los cambios solicitados poco antes de la hora de recogida no siempre serán posibles.',
      },
      {
        question: '¿Con cuánta anticipación debo reservar mi traslado?',
        answer:
          'Se recomienda reservar al menos con unos días de anticipación, y antes durante la temporada alta de diciembre a abril y en feriados. Figa Travel también intenta ayudar con solicitudes de último minuto; escribe al equipo por WhatsApp para consultar disponibilidad.',
      },
      {
        question: '¿Qué incluye un traslado privado de Figa Travel?',
        answer:
          'Cada traslado privado incluye recogida puerta a puerta en tu hotel, dirección o aeropuerto, un chofer bilingüe con licencia, un vehículo asegurado con aire acondicionado, agua fría a bordo, seguimiento de vuelos con 60 minutos de espera gratis en recogidas en el aeropuerto, y todos los peajes, impuestos y combustible.',
      },
    ],
    destinationFaq: {
      localQuestion: (name) => `¿Ofrecen traslados privados en ${name}?`,
      localAnswer: (name) =>
        `Sí. Figa Travel ofrece traslados privados locales en ${name}, incluidas recogidas en el Aeropuerto Internacional Juan Santamaría (SJO), viajes de hotel a hotel y conexiones desde ${name} a todos los destinos principales de Costa Rica.`,
      durationQuestion: (name) => `¿Cuánto dura el traslado privado de San José a ${name}?`,
      durationAnswer: (name, duration) =>
        `Un traslado privado de San José a ${name} con Figa Travel Costa Rica dura unas ${duration}, puerta a puerta. El tiempo real varía según el tráfico, el clima y el estado de las carreteras.`,
      bookQuestion: (name) => `¿Cómo reservo un shuttle privado a ${name}?`,
      bookAnswer: (name) =>
        `Reserva tu shuttle privado a ${name} en línea en figatravelcr.com/book-online o por WhatsApp (+506 7227 1058). Figa Travel cotiza un precio fijo por vehículo con peajes, impuestos y combustible incluidos, y las recogidas en el aeropuerto incluyen seguimiento del vuelo y 60 minutos de espera gratis.`,
      thingsQuestion: (name) => `¿Qué hacer en ${name}?`,
      thingsAnswer: (name, attractions, bestFor) =>
        `Lo mejor para hacer en ${name} incluye ${attractions}. Ideal para: ${bestFor}.`,
      bestTimeQuestion: (name) => `¿Cuál es la mejor época para visitar ${name}?`,
    },
  },
}
