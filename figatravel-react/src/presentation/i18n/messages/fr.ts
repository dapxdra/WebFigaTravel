import type { Messages } from './en'

export const fr: Messages = {
  common: {
    whatsappBookingText: 'Bonjour Figa Travel, je souhaite réserver un transfert',
    whatsappFleetText: "Bonjour Figa Travel, j'ai une question sur votre flotte",
    chatOnWhatsApp: 'Discuter sur WhatsApp',
    fullName: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone',
    phoneWhatsApp: 'Téléphone / WhatsApp',
    date: 'Date',
    notesOptional: 'Remarques (facultatif)',
    invalidEmail: 'Saisissez une adresse e-mail valide.',
    selectDateFirst: "Choisissez d'abord une date",
    amountToPay: 'Montant à payer :',
    creatingReservation: 'Création de la réservation...',
    continueToPayment: 'Continuer vers le paiement',
    premium: 'Premium',
    lastUpdated: 'Dernière mise à jour :',
    loading: 'Chargement...',
  },
  language: {
    label: 'Langue',
  },
  layout: {
    skipToContent: 'Aller au contenu principal',
    mainNavAria: 'Principal',
    homeAria: 'Accueil Figa Travel',
    menu: 'Menu',
    nav: {
      home: 'Accueil',
      destinations: 'Destinations',
      fleet: 'Flotte',
      bookOnline: 'Réserver',
      faq: 'FAQ',
      aboutUs: 'À propos',
      contact: 'Contact',
    },
    admin: 'Admin',
    logOut: 'Se déconnecter',
    logIn: 'Se connecter',
    footerAria: 'Pied de page',
    additionalLinks: 'Liens utiles',
    contact: 'Contact',
    social: 'Réseaux sociaux',
    followUs: 'Suivez-nous et contactez-nous directement.',
    socialLinksAria: 'Réseaux sociaux',
    privacyPolicy: 'Politique de confidentialité',
    terms: 'Conditions générales',
    copyright: '©2026 Figa Travel Costa Rica',
  },
  floatingWhatsApp: {
    aria: 'Discutez avec nous sur WhatsApp',
    label: "Besoin d'un trajet ? Écrivez-nous",
  },
  home: {
    heroAria: 'Découvrez la beauté du Costa Rica',
    heroBadge: 'Noté 4,9/5 par les voyageurs sur Google et Tripadvisor',
    heroTitle: 'Découvrez la beauté du Costa Rica avec FIGA TRAVEL',
    heroSubtitle: 'Transferts privés, conseils locaux et itinéraires choisis, des volcans aux plages.',
    heroHighlights: ['Suivi des vols', 'Chauffeurs bilingues agréés', 'Prix fixe, péages inclus'],
    seeMyPrice: 'Voir mon prix',
    trustAria: 'Indicateurs de confiance',
    trustTransfers: 'transferts réussis chaque saison',
    trustSupport: 'assistance voyage par WhatsApp et e-mail',
    trustRating: 'note moyenne de satisfaction des voyageurs',
    servicesAria: 'Points forts du service',
    services: ['WI-FI', 'Service client', 'Éco-responsable', 'Véhicules bien entretenus'],
    stepsEyebrow: 'Réservez en quelques minutes',
    stepsTitle: 'Comment fonctionne votre transfert privé',
    steps: [
      {
        title: 'Indiquez votre itinéraire',
        description:
          "Saisissez votre lieu de prise en charge et de dépose : l'aéroport, votre hôtel ou toute adresse au Costa Rica. Votre prix fixe s'affiche en quelques secondes.",
      },
      {
        title: 'Réservez et payez en toute sécurité',
        description:
          'Réservez en ligne avec un paiement par carte chiffré, ou écrivez-nous sur WhatsApp. Pas de compteur ni de frais cachés.',
      },
      {
        title: 'Retrouvez votre chauffeur',
        description:
          'Votre chauffeur bilingue suit votre vol, vous accueille au point de rendez-vous et vous conduit de porte à porte dans un véhicule climatisé.',
      },
    ],
    destinationsEyebrow: 'Où nous allons',
    destinationsTitle: 'Principales destinations au Costa Rica',
    allDestinations: 'Toutes les destinations',
    prioritiesEyebrow: 'Pourquoi les voyageurs choisissent Figa',
    prioritiesTitle: 'Ce que comprend chaque transfert',
    testimonialsEyebrow: 'Noté 4,9/5 sur Google et Tripadvisor',
    testimonialsTitle: "L'avis des voyageurs",
    fleetEyebrow: 'Notre flotte',
    fleetTitle: 'Un véhicule pour chaque taille de groupe',
    viewFullFleet: 'Voir toute la flotte',
    faqEyebrow: 'Des questions ?',
    faqTitle: 'Questions fréquentes',
    faqTextBefore:
      "Pour toute autre question, contactez-nous par WhatsApp, e-mail ou via notre formulaire de contact. Ou consultez notre",
    faqLink: 'FAQ',
    topQuestions: 'Questions principales',
    viewAll: 'Tout voir',
    finalEyebrow: 'Prêts dès votre atterrissage',
    finalTitle: 'Votre trajet privé à travers le Costa Rica commence ici',
    finalText: 'Obtenez un prix fixe de porte à porte en quelques secondes. Péages, taxes et carburant inclus, sans surprise.',
    getMyPrice: 'Obtenir mon prix',
  },
  routeSearch: {
    title: 'Où allez-vous ?',
    pickupLabel: 'Lieu de prise en charge',
    pickupPlaceholder: "D'où partez-vous ?",
    dropoffLabel: 'Lieu de dépose',
    dropoffPlaceholder: 'Où allez-vous ?',
    swap: 'Inverser départ et arrivée',
    passengersLegend: 'Passagers',
    passengersTitle: 'Combien de passagers ?',
    adults: 'Adultes',
    children: 'Enfants',
    calculating: 'Calcul du prix...',
    perksAria: 'Avantages de la réservation',
    perkInstant: 'Prix immédiat',
    perkDoor: 'Porte à porte',
    perkNoFees: 'Sans frais cachés',
    removeOne: (label: string) => `Retirer un passager : ${label.toLowerCase()}`,
    addOne: (label: string) => `Ajouter un passager : ${label.toLowerCase()}`,
    addressUnavailable: "La recherche d'adresse est indisponible.",
  },
  reviews: {
    carouselAria: 'Avis de voyageurs sur Google et Tripadvisor',
    stars: (rating: number) => `${rating} étoiles sur 5`,
    cardAria: (index: number, total: number, author: string, source: string) =>
      `Avis ${index} sur ${total} de ${author} sur ${source} — s'ouvre dans un nouvel onglet`,
    readOn: (source: string) => `Lire sur ${source}`,
    previous: 'Avis précédents',
    next: 'Avis suivants',
    dotsAria: "Choisir un groupe d'avis",
    goTo: (page: number, total: number) => `Aller aux avis ${page} sur ${total}`,
  },
  heroMedia: {
    povTag: 'POV · Un vrai trajet avec Figa',
    pause: 'Mettre la vidéo de fond en pause',
    play: 'Lire la vidéo de fond',
  },
  destinationsPage: {
    eyebrow: 'Costa Rica',
    title: 'Destinations',
    subtitle: 'Découvrez nos destinations les plus populaires au Costa Rica',
    catalogTitle: 'Catalogue des destinations',
  },
  destinationDetail: {
    notFoundTitle: 'Destination introuvable',
    notFoundText: "La destination demandée n'existe pas ou a été retirée du catalogue.",
    backToDestinations: 'Retour aux destinations',
    heroAlt: (name: string) => `${name}, Costa Rica`,
    galleryAria: 'Galerie de la destination',
    photoAlt: (name: string, index: number) => `${name}, Costa Rica, photo ${index}`,
    infoTitle: 'Informations sur la destination',
    topAttractions: 'INCONTOURNABLES',
    travelTips: 'CONSEILS DE VOYAGE',
    faqTitle: (name: string) => `FAQ sur les transferts vers ${name}`,
  },
  fleetPage: {
    eyebrow: 'NOTRE FLOTTE',
    title: 'Un véhicule pour chaque taille de groupe',
    intro:
      "Du SUV premium pour deux au minibus de 18 places, chaque véhicule est climatisé, assuré et conduit par un chauffeur local agréé.",
    listTitle: 'Choisissez le bon véhicule',
    listIntro:
      "Vous hésitez ? Indiquez-nous la taille de votre groupe et votre itinéraire, nous vous recommanderons la meilleure option.",
    bookVehicle: 'Réserver ce véhicule',
    askWhatsApp: 'Demander sur WhatsApp',
    bookTransfer: 'Réserver un transfert',
  },
  faqPage: {
    eyebrow: 'DES QUESTIONS ?',
    title: 'FAQ sur les transferts privés au Costa Rica',
    intro: 'Des réponses rapides pour préparer votre voyage en toute clarté.',
    listTitle: 'Questions fréquentes',
    listIntro: "Pour toute autre demande, contactez-nous par WhatsApp, e-mail ou via le formulaire de contact.",
    goToContact: 'Aller au contact',
  },
  about: {
    heroAlt: 'Paysage volcanique du Costa Rica',
    eyebrow: 'À PROPOS',
    title: 'Votre voyage, notre passion !',
    paragraph1:
      "Notre mission est simple : améliorer votre expérience de voyage au Costa Rica. Nous sommes là pour enrichir votre séjour avec confort, sécurité et un service mémorable.",
    paragraph2:
      "Nous sommes plus qu'une entreprise de transport. Nous sommes votre partenaire de voyage pour l'aventure, la nature, la culture et la détente dans tout le pays.",
    commitmentTitle: "Notre engagement pour l'excellence",
    commitmentText:
      "Du moment où vous réservez jusqu'à votre arrivée à destination, notre équipe se consacre à votre confort, votre sécurité et votre satisfaction.",
    closingTitle: "Merci d'envisager Figa Travel Costa Rica",
    closingText: "Nous serons ravis de faire partie de votre aventure et de vous aider à découvrir la beauté du Costa Rica.",
  },
  contact: {
    eyebrow: 'CONTACT',
    title: 'Nous sommes prêts à vous aider',
    intro: "Partagez votre projet de voyage et nous vous répondrons avec les horaires, l'itinéraire et une proposition détaillée.",
    channelsTitle: 'Contacts directs',
    channelsIntro: 'Assistance rapide par téléphone, e-mail et WhatsApp.',
    address: 'Adresse',
    formTitle: 'Formulaire de contact',
    formSubtitle: 'Envoyez-nous un message et nous vous répondrons par e-mail.',
  },
  contactForm: {
    subject: 'Objet',
    message: 'Message',
    messagePlaceholder: 'Dites-nous comment nous pouvons vous aider.',
    sending: 'Envoi...',
    send: 'Envoyer le message',
    success: 'Merci pour votre message. Nous vous répondrons bientôt par e-mail.',
  },
  notFound: {
    title: 'Page introuvable',
    text: "La page que vous cherchez n'existe pas ou a été déplacée. Reprenons la bonne route.",
    backHome: "Retour à l'accueil",
  },
  bookOnline: {
    eyebrow: 'Transferts privés',
    title: 'Réserver en ligne',
    intro: "Obtenez un prix immédiat pour n'importe quel trajet au Costa Rica, ou choisissez l'un de nos transferts à prix fixe.",
    modeTabsAria: 'Comment souhaitez-vous réserver ?',
    modeCustom: 'Tout trajet - prix immédiat',
    modePackages: 'Trajets à prix fixe',
    instantPriceAria: 'Prix immédiat du trajet',
    loadingPackages: 'Chargement des forfaits...',
    bookNow: 'Réserver',
  },
  customRouteForm: {
    title: 'Votre transfert privé',
    intro: 'Vérifiez votre prix et ajoutez les détails de votre voyage pour passer au paiement sécurisé.',
    pickup: 'Prise en charge',
    dropoff: 'Dépose',
    approxDrive: 'Trajet approx.',
    passengers: 'Passagers',
    passengerSummary: (adults: number, children: number) =>
      `${adults} ${adults === 1 ? 'adulte' : 'adultes'}` +
      (children > 0 ? `, ${children} ${children === 1 ? 'enfant' : 'enfants'}` : ''),
    totalPrice: 'Prix total',
    notesPlaceholder: 'Numéro de vol, bagages, sièges enfant, arrêts...',
    pickupTime: 'Heure de prise en charge',
    futureDateHint: 'La réservation en ligne commence demain. Choisissez une date future.',
  },
  reservationForm: {
    title: 'Détails de la réservation',
    intro: 'Renseignez vos coordonnées pour passer au paiement sécurisé.',
    loadingServices: 'Chargement des services...',
    service: 'Service',
    selectService: 'Choisissez un service',
    availableDates: 'Dates disponibles :',
    travelers: 'Voyageurs',
    pickupLocation: 'Lieu de prise en charge',
    pickupPlaceholder: "Nom de l'hôtel ou adresse à La Fortuna",
    availableTime: 'Horaire disponible',
    selectServiceFirst: "Choisissez d'abord un service",
    loadingAvailability: 'Chargement des disponibilités...',
    noAvailability: "Aucune disponibilité aujourd'hui ni aux dates passées. Choisissez une date future.",
  },
  timePicker: {
    tabsAria: 'Moment de la journée',
    night: 'Nuit',
    morning: 'Matin',
    afternoon: 'Après-midi',
    evening: 'Soir',
    timesAria: 'Horaires disponibles',
  },
  checkout: {
    title: 'Paiement sécurisé',
    order: (orderNumber: string, amount: string) => `Commande n° ${orderNumber} - ${amount}`,
    startingSession: 'Ouverture de la session sécurisée...',
    loadingForm: 'Chargement du formulaire de paiement...',
    paymentMethod: 'Moyen de paiement',
    selectMethod: 'Choisissez un moyen de paiement',
    savedCards: 'Cartes enregistrées',
    selectCard: 'Choisissez une carte',
    cardNumber: 'Numéro de carte',
    expiration: "Date d'expiration",
    cvv: 'CVV',
    phoneNumber: 'Numéro de téléphone',
    processing: 'Traitement...',
    pay: (amount: string) => `Payer ${amount}`,
    securityNote: 'Vos données de carte sont chiffrées et traitées en toute sécurité par Tilopay.',
    notReady: "Le formulaire de paiement n'est pas encore prêt.",
    rejected: 'Le paiement a été refusé. Veuillez réessayer.',
    loadError: 'Impossible de charger le formulaire de paiement.',
    noMethods: "Tilopay n'a renvoyé aucun moyen de paiement.",
  },
  paymentResponse: {
    title: 'Résultat du paiement',
    verifying: 'Vérification de votre paiement auprès de Tilopay...',
    approvedTitle: 'Paiement accepté',
    approvedText: 'Votre réservation est confirmée.',
    failedTitle: 'Paiement refusé',
    failedText: 'Le paiement a été refusé. Veuillez réessayer.',
  },
  legal: {
    eyebrow: 'MENTIONS LÉGALES',
    or: 'ou',
    translationNotice:
      "Cette traduction est fournie à titre indicatif. En cas de divergence, la version anglaise fait foi.",
  },
  privacy: {
    title: 'Politique de confidentialité',
    introTitle: '1. Introduction',
    introText:
      "Figa Travel Costa Rica (« Figa Travel », « nous ») propose des services de transport privé dans tout le Costa Rica. Cette politique de confidentialité explique quelles données personnelles nous collectons via figatravelcr.com, comment nous les utilisons et quels sont vos choix. En utilisant ce site ou en réservant un transfert avec nous, vous acceptez les pratiques décrites ici.",
    dataTitle: '2. Informations que nous collectons',
    dataItems: [
      {
        strong: 'Coordonnées et détails de réservation',
        text: " que vous transmettez via le formulaire de contact ou de réservation en ligne : nom complet, e-mail, téléphone, lieux de prise en charge et de dépose, date et heure du voyage, nombre de voyageurs et vos éventuelles remarques.",
      },
      {
        strong: 'Données de paiement',
        text: " : les paiements par carte sont traités directement par notre prestataire de paiement, Tilopay. Nous ne voyons ni ne conservons jamais votre numéro de carte complet, sa date d'expiration ou le CVV — ces informations sont saisies sur le formulaire sécurisé de Tilopay et traitées selon ses propres normes de sécurité.",
      },
      {
        strong: 'Données de compte',
        text: ", uniquement si vous créez un compte administrateur : votre e-mail et vos métadonnées d'authentification, gérés par notre fournisseur de base de données, Supabase.",
      },
      {
        strong: 'Données techniques',
        text: " telles que le type de navigateur et l'utilisation générale du site, qui nous aident à garder le service fiable et sûr.",
      },
    ],
    useTitle: '3. Comment nous utilisons vos informations',
    useItems: [
      'Pour créer et gérer votre réservation et confirmer le paiement.',
      'Pour vous contacter au sujet de votre voyage : confirmation de prise en charge, suivi des vols et changements d’horaire.',
      'Pour répondre aux messages envoyés via le formulaire de contact.',
      'Pour améliorer nos itinéraires, nos véhicules et notre service client.',
      'Pour respecter nos obligations légales, fiscales et comptables au Costa Rica.',
    ],
    sharingTitle: '4. Partage de vos informations',
    sharingIntro: 'Nous ne vendons pas vos données personnelles. Nous les partageons uniquement avec :',
    sharingItems: [
      { strong: 'Tilopay', text: ', pour traiter votre paiement en toute sécurité.' },
      {
        strong: 'Supabase',
        text: ", notre fournisseur de base de données et d'authentification, qui conserve les réservations et demandes pour notre compte.",
      },
      { strong: '', text: 'Les autorités, lorsque la loi l’exige.' },
    ],
    cookiesTitle: '5. Cookies et stockage local',
    cookiesText:
      "Nous utilisons un stockage essentiel du navigateur pour vous garder connecté au panneau d'administration et mémoriser des préférences de base, comme votre langue. Nous n'utilisons pas de traceurs publicitaires tiers.",
    retentionTitle: '6. Conservation des données',
    retentionText:
      'Nous conservons les réservations et les échanges aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations comptables et légales, puis nous supprimons ou anonymisons les données.',
    rightsTitle: '7. Vos droits',
    rightsBefore: 'Vous pouvez à tout moment demander l’accès, la rectification ou la suppression de vos données en écrivant à',
    rightsAfter: '. Nous vous répondrons dans un délai raisonnable.',
    childrenTitle: '8. Protection des mineurs',
    childrenText:
      "Nos services s'adressent aux adultes qui réservent un voyage. Nous ne collectons pas sciemment de données personnelles directement auprès d'enfants.",
    contactTitle: '9. Nous contacter',
    contactBefore: 'Vos questions sur cette politique peuvent être envoyées à',
  },
  terms: {
    title: 'Conditions générales',
    sections: [
      {
        title: '1. Acceptation des conditions',
        text: "Ces conditions générales régissent l'utilisation de figatravelcr.com et de tout service de transport privé réservé auprès de Figa Travel Costa Rica. En envoyant une réservation ou en utilisant notre formulaire de contact, vous acceptez ces conditions.",
      },
      {
        title: '2. Réservations',
        text: "Une réservation est créée lorsque vous envoyez le formulaire de réservation en ligne avec votre itinéraire, la date, l'heure de prise en charge et les informations des voyageurs. Elle est confirmée une fois le paiement traité avec succès. Vérifiez bien la date, le lieu de prise en charge et le nombre de voyageurs avant de confirmer le paiement.",
      },
      {
        title: '3. Prix et paiement',
        text: "Le prix affiché lors du paiement est le prix total de votre trajet, de porte à porte, péages et carburant inclus. Les paiements sont traités en toute sécurité par Tilopay ; Figa Travel ne conserve pas vos données de carte. Les prix sont indiqués dans la devise affichée sur le formulaire de réservation.",
      },
      {
        title: '4. Modifications et annulations',
        text: "Pour modifier ou annuler une réservation confirmée, contactez-nous au plus vite par WhatsApp, téléphone ou e-mail avec les détails de votre réservation. Nous ferons de notre mieux pour accepter les modifications selon les disponibilités, mais les changements demandés peu avant l'heure de prise en charge ne seront pas toujours possibles.",
      },
    ],
    serviceTitle: '5. Exécution du service',
    serviceItems: [
      "Les prises en charge à l'aéroport incluent le suivi du vol et un temps d'attente offert, comme indiqué sur notre site.",
      'Les chauffeurs sont agréés et autorisés à exercer le transport touristique au Costa Rica.',
      "Les durées de trajet indiquées sur le site sont des estimations ; la durée réelle peut varier selon la météo, l'état des routes ou la circulation.",
      "Vous êtes responsable d'indiquer un lieu de prise en charge exact et d'être prêt à l'heure convenue.",
    ],
    closingSections: [
      {
        title: '6. Responsabilité',
        text: "Nos véhicules disposent d'une assurance commerciale passagers. Figa Travel n'est pas responsable des retards ou changements dus à des événements indépendants de sa volonté, tels que des conditions météorologiques extrêmes, des fermetures de routes, des retards de vol ou des restrictions gouvernementales. Les passagers sont responsables de leurs effets personnels pendant le trajet.",
      },
      {
        title: '7. Comportement des passagers',
        text: "Nous pouvons refuser ou interrompre un trajet si le comportement d'un passager met en danger le chauffeur, les autres passagers ou le véhicule.",
      },
      {
        title: '8. Droit applicable',
        text: 'Ces conditions sont régies par les lois du Costa Rica. Tout litige sera soumis à la juridiction costaricienne.',
      },
    ],
    contactTitle: '9. Nous contacter',
    contactBefore: 'Vos questions sur ces conditions peuvent être envoyées à',
    seeAlso: '. Consultez aussi notre',
  },
  content: {
    destinations: {
      'la-fortuna': {
        summary: 'Volcan Arenal, sources chaudes et sentiers d’aventure.',
        transferTime: '3 h depuis San José',
        transferDuration: '3 heures',
        bestFor: 'Aventure et nature',
        intro:
          "Nichée au cœur du Costa Rica, La Fortuna est une destination époustouflante, connue pour ses paysages luxuriants et le majestueux volcan Arenal. Les visiteurs y viennent pour un parfait équilibre entre aventure et détente.",
        bookLabel: 'RÉSERVER UN TRANSPORT VERS LA FORTUNA',
        attractions: [
          "Volcan Arenal : admirez l'emblématique volcan Arenal, l'un des volcans les plus actifs au monde.",
          "Cascade de La Fortuna : randonnez jusqu'à la superbe cascade de La Fortuna et baignez-vous dans son bassin émeraude.",
          'Sources chaudes : détendez-vous dans les sources chaudes naturelles et ressourcez-vous grâce à la chaleur géothermique.',
        ],
        travelTips: [
          "Meilleure période : la saison sèche, de décembre à avril, offre la météo la plus favorable.",
          'Météo : journées chaudes et soirées plus fraîches ; prévoyez vos vêtements en conséquence.',
          'Précautions sanitaires : emportez répulsif anti-moustiques et crème solaire pour les activités en plein air.',
        ],
      },
      papagayo: {
        summary: 'Plages paisibles et hôtels haut de gamme sur la côte Pacifique.',
        transferTime: '4 h 30 depuis San José',
        transferDuration: '4 heures et 30 minutes',
        bestFor: 'Détente et luxe',
        intro:
          'Située sur la côte Pacifique du Costa Rica, Papagayo est une destination luxueuse et paisible, connue pour ses plages préservées et ses complexes hôteliers haut de gamme. Elle allie détente et aventure.',
        bookLabel: 'RÉSERVER UN TRANSPORT VERS PAPAGAYO',
        attractions: [
          'Playa Hermosa : profitez de la beauté de Playa Hermosa, une plage superbe connue pour ses eaux calmes et son cadre pittoresque.',
          'Sports nautiques : vivez des sports nautiques palpitants comme le snorkeling, la plongée et la pêche au gros.',
          'Golf : jouez au célèbre Papagayo Golf & Country Club dans un cadre tropical luxuriant.',
        ],
        travelTips: [
          'Meilleure période : prévoyez votre voyage pendant la saison sèche, de décembre à avril, pour une météo idéale.',
          'Météo : journées chaudes et ensoleillées ; emportez maillot, crème solaire et lunettes de soleil.',
        ],
      },
      'puerto-viejo': {
        summary: 'Ambiance caribéenne, culture afro-caribéenne et nature luxuriante.',
        transferTime: '4 h 45 depuis San José',
        transferDuration: '4 heures et 45 minutes',
        bestFor: 'Culture et plage',
        intro:
          "Puerto Viejo associe rythme caribéen, plages tropicales et culture locale vivante : idéal pour les voyageurs en quête d'une aventure décontractée.",
        bookLabel: 'RÉSERVER UN TRANSPORT VERS PUERTO VIEJO',
        attractions: [
          'Playa Cocles : eaux cristallines et longues plages de sable, parfaites pour se détendre.',
          'Jaguar Rescue Center : découvrez la protection de la faune et la biodiversité locale.',
          'Parc national de Cahuita : snorkeling et sentiers côtiers avec une vie marine unique.',
        ],
        travelTips: [
          'Meilleure période : septembre et octobre sont généralement plus secs dans cette région caribéenne.',
          "Météo : chaud et humide toute l'année, prévoyez des vêtements légers et une protection contre la pluie.",
          'Transport : organisez vos transferts à l’avance, car les distances depuis les aéroports sont longues.',
        ],
      },
      'manuel-antonio': {
        summary: 'Parc national, faune et plages spectaculaires.',
        transferTime: '3 h 30 depuis San José',
        transferDuration: '3 heures et 30 minutes',
        bestFor: 'Familles et nature',
        intro:
          "Située sur la côte Pacifique du Costa Rica, Manuel Antonio est un paradis tropical connu pour ses forêts luxuriantes et ses plages préservées. Un refuge pour les amoureux de la nature et d'aventure.",
        bookLabel: 'RÉSERVER UN TRANSPORT VERS MANUEL ANTONIO',
        attractions: [
          "Parc national Manuel Antonio : découvrez l'incroyable biodiversité de ce célèbre parc national, abritant une faune exotique et des plages préservées.",
          'Playa Manuel Antonio : détendez-vous sur l’idyllique Playa Manuel Antonio, où la forêt rejoint la mer.',
          'Tyroliennes : vivez le frisson de la tyrolienne au-dessus de la canopée.',
        ],
        travelTips: [
          'Meilleure période : venez pendant la saison sèche, de décembre à avril, pour une météo idéale.',
          'Météo : chaud et humide ; prévoyez vêtements légers, crème solaire et répulsif.',
          "Réservations du parc : réservez à l'avance l'entrée au parc national Manuel Antonio, le nombre d'entrées quotidiennes étant limité.",
        ],
      },
      tamarindo: {
        summary: 'Surf, restaurants et couchers de soleil inoubliables.',
        transferTime: '4 h 40 depuis San José',
        transferDuration: '4 heures et 40 minutes',
        bestFor: 'Surf et amis',
        intro:
          "Tamarindo est l'une des villes balnéaires les plus animées du Costa Rica, célèbre pour le surf, les couchers de soleil et un beau mélange de cuisine locale et internationale.",
        bookLabel: 'RÉSERVER UN TRANSPORT VERS TAMARINDO',
        attractions: [
          'Cours de surf : des vagues parfaites pour débutants et surfeurs confirmés.',
          'Sorties en catamaran : explorez la côte et profitez de croisières au coucher du soleil.',
          'Vie nocturne : restaurants et bars de plage à l’ambiance festive.',
        ],
        travelTips: [
          'Meilleure période : la saison sèche, de décembre à avril, offre les journées les plus ensoleillées.',
          'Météo : chaleur et soleil intense, hydratez-vous et utilisez de la crème solaire.',
          'Transport : réservez vos transferts tôt en haute saison.',
        ],
      },
      'san-jose-city': {
        name: 'San José',
        summary: 'Culture urbaine, musées et connexions vers tout le pays.',
        transferTime: 'Transfert local',
        transferDuration: null,
        bestFor: 'Escapade urbaine',
        intro:
          "San José est le centre culturel et économique du Costa Rica, idéal pour les voyageurs qui veulent des musées, de la cuisine locale et un accès rapide aux routes nationales.",
        bookLabel: 'RÉSERVER UN TRANSPORT VERS SAN JOSÉ',
        attractions: [
          'Théâtre national : un monument historique au cœur de la capitale.',
          'Marché central : découvrez les saveurs locales et l’artisanat.',
          "Quartier des musées : visitez musées et galeries sur l'histoire du Costa Rica.",
        ],
        travelTips: [
          'Meilleure période : les visites du matin et du soir sont idéales, avec moins de circulation.',
          'Météo : températures douces et pluies occasionnelles, prévoyez une veste légère.',
          "Transport : privilégiez les transferts privés pour l'aéroport et les trajets interurbains.",
        ],
      },
    },
    fleet: {
      'toyota-land-cruiser-prado': {
        category: 'SUV premium',
        capacity: '1–3 passagers',
        summary:
          'Notre option la plus confortable pour les couples et petites familles, et la plus sûre sur les routes de gravier et de montagne.',
        features: [
          "Jusqu'à 4 passagers plus les bagages",
          'Sièges en cuir et climatisation bizone',
          'Transmission intégrale pour les routes difficiles',
          'Idéal pour les lunes de miel et les circuits privés',
        ],
      },
      'hyundai-staria': {
        category: 'Van de passagers',
        capacity: '1–5 passagers',
        summary: 'Un van moderne aux fenêtres panoramiques, silencieux et confortable pour les petits groupes.',
        features: [
          "Jusqu'à 5 passagers plus les bagages",
          'Grandes fenêtres et espace généreux pour les jambes',
          'Recharge USB et climatisation puissante',
          "Parfait pour les transferts aéroport avec peu de bagages",
        ],
      },
      'toyota-hiace': {
        category: 'Van touristique',
        capacity: '1–6 passagers',
        summary: 'Le grand classique fiable du tourisme au Costa Rica, adapté à une famille et tout son équipement.',
        features: [
          "Jusqu'à 6 passagers plus les bagages",
          'Espace bagages arrière dédié',
          "Climatisation dans tout l'habitacle",
          "Transferts quotidiens vers l'aéroport et les hôtels",
        ],
      },
      'toyota-hiace-commuter': {
        category: 'Grand van de passagers',
        capacity: '1–9 passagers',
        summary:
          "Le Hiace à toit surélevé : on y tient debout, avec de la place pour les grandes familles ou les petits groupes.",
        features: [
          "Jusqu'à 9 passagers plus les bagages",
          'Toit surélevé pour monter facilement',
          'Compartiment à bagages agrandi',
          'Itinéraires à plusieurs arrêts et excursions à la journée',
        ],
      },
      'toyota-coaster': {
        category: 'Minibus',
        capacity: "Jusqu'à 18 passagers",
        summary: "Un véritable minibus pour les grands groupes, mariages, voyages d'affaires et événements.",
        features: [
          "Jusqu'à 18 passagers plus une soute à bagages",
          'Grande hauteur sous plafond et allée large',
          'Climatisation et sonorisation',
          'Circuits de groupe, événements et conférences',
        ],
      },
    },
    priorities: [
      {
        title: "Suivi des vols, attente gratuite",
        description:
          "Nous suivons votre vol et ajustons la prise en charge en cas d'avance ou de retard. Chaque transfert aéroport inclut 60 minutes d'attente offertes.",
      },
      {
        title: 'Chauffeurs bilingues agréés',
        description:
          "Des chauffeurs locaux agréés par l'office du tourisme (ICT), qui parlent anglais et espagnol et connaissent chaque route, de San José aux deux côtes.",
      },
      {
        title: 'Flotte assurée et climatisée',
        description:
          "SUV et vans récents avec assurance commerciale passagers, une ceinture par siège, de l'eau fraîche à bord et des sièges enfant sur demande.",
      },
      {
        title: 'Un prix fixe, de porte à porte',
        description:
          "Le prix que vous acceptez est celui que vous payez : péages, taxes et carburant inclus. Pas de compteur, pas de surprise, d'hôtel à hôtel.",
      },
    ],
    faq: [
      {
        question: "Quelle est la meilleure façon d'aller de l'aéroport de San José (SJO) à La Fortuna ou Arenal ?",
        answer:
          "Le plus confortable est un transfert privé de porte à porte. Figa Travel Costa Rica vous accueille à l'aéroport international Juan Santamaría (SJO) avec un chauffeur bilingue, suit votre vol et vous conduit directement à votre hôtel à La Fortuna / Arenal en 3 heures environ, à un prix fixe incluant péages, taxes et carburant.",
      },
      {
        question: 'Comment réserver un transfert privé ou une navette aéroport au Costa Rica avec Figa Travel ?',
        answer:
          "Vous pouvez réserver en ligne sur figatravelcr.com/book-online en choisissant votre itinéraire, la date, l'heure et le lieu de prise en charge et le nombre de voyageurs, puis en payant par carte en toute sécurité. Vous pouvez aussi réserver par WhatsApp (+506 7227 1058), téléphone (+506 7139 2747) ou e-mail (infofigatravel@gmail.com). La réservation est confirmée une fois le paiement traité.",
      },
      {
        question: 'Combien coûte un transfert privé au Costa Rica ?',
        answer:
          "Figa Travel applique un prix fixe par véhicule et par trajet, et non par passager ou au compteur. Le prix affiché lors du paiement sur la page de réservation est le total, de porte à porte, péages, taxes et carburant inclus, sans frais cachés. Les prix dépendent du trajet et de la taille du véhicule.",
      },
      {
        question: 'Quels aéroports du Costa Rica desservez-vous ?',
        answer:
          "Figa Travel assure les prises en charge et déposes à l'aéroport international Juan Santamaría (SJO) à San José et à l'aéroport de Guanacaste (LIR) à Liberia, en les reliant à La Fortuna, Arenal, Manuel Antonio, Tamarindo, Papagayo, Puerto Viejo, San José et d'autres destinations du Costa Rica.",
      },
      {
        question: 'Que se passe-t-il si mon vol est retardé ?',
        answer:
          "Rien ne change pour vous. Figa Travel suit votre vol et ajuste l'heure de prise en charge en cas d'avance ou de retard, et chaque transfert aéroport inclut 60 minutes d'attente offertes après l'atterrissage, sans frais supplémentaires.",
      },
      {
        question: 'Dans quelles régions du Costa Rica Figa Travel assure-t-il le transport ?',
        answer:
          "Figa Travel couvre tout le Costa Rica depuis sa base à La Fortuna (Arenal). Les trajets les plus demandés incluent San José, l'aéroport SJO, La Fortuna et le volcan Arenal, Manuel Antonio, Tamarindo, Papagayo et Puerto Viejo sur la côte caraïbe. Des trajets sur mesure et des itinéraires à plusieurs arrêts sont possibles sur demande.",
      },
      {
        question: 'Combien de temps durent les trajets entre les destinations populaires du Costa Rica ?',
        answer:
          "Durées approximatives des transferts privés depuis San José : La Fortuna / Arenal 3 heures, Manuel Antonio 3 heures 30, Papagayo 4 heures 30, Tamarindo 4 heures 40 et Puerto Viejo 4 heures 45. Les durées réelles varient selon la circulation, la météo et l'état des routes.",
      },
      {
        question: 'Quels véhicules utilisez-vous et combien de passagers peuvent monter ?',
        answer:
          "Figa Travel utilise des véhicules récents et climatisés adaptés à votre groupe : un SUV premium Toyota Land Cruiser Prado (1 à 3 passagers), un van Hyundai Staria (1 à 5), un Toyota Hiace (1 à 6), un Toyota Hiace Commuter (1 à 9) et un minibus Toyota Coaster (jusqu'à 18 passagers), tous avec de la place pour les bagages.",
      },
      {
        question: 'Vos chauffeurs sont-ils agréés et parlent-ils anglais ?',
        answer:
          "Oui. Tous les chauffeurs de Figa Travel sont locaux, expérimentés et autorisés par l'office du tourisme du Costa Rica (ICT) à exercer le transport touristique, et ils parlent anglais et espagnol.",
      },
      {
        question: 'Le transport privé au Costa Rica avec Figa Travel est-il sûr ?',
        answer:
          "Oui. Chaque véhicule dispose d'une assurance commerciale passagers, d'une ceinture par siège et d'un entretien régulier. Les chauffeurs sont agréés, connaissent les routes de montagne et côtières et conduisent à un rythme régulier et prudent. Des sièges enfant sont disponibles sur demande.",
      },
      {
        question: 'Proposez-vous du transport pour les grands groupes, mariages ou événements ?',
        answer:
          "Oui. Figa Travel transporte familles, groupes touristiques, mariages, voyages d'affaires et conférences, avec des vans jusqu'à 9 passagers et un minibus Toyota Coaster jusqu'à 18 passagers. Plusieurs véhicules peuvent être combinés pour les groupes plus importants.",
      },
      {
        question: 'Pouvez-vous fournir des sièges enfant ou accepter les animaux ?',
        answer:
          "Oui. Des sièges enfant et bébé sont disponibles sur demande, et Figa Travel fera de son mieux pour accepter les transferts avec animaux. Indiquez votre demande lors de la réservation afin que le bon véhicule et l'équipement soient prêts.",
      },
      {
        question: 'Puis-je faire des arrêts en chemin ?',
        answer:
          "Oui. Le transfert étant privé, vous pouvez demander à votre chauffeur de courts arrêts, comme un point de vue, une pause toilettes ou un en-cas rapide. Pour des itinéraires à plusieurs arrêts ou des excursions à la journée, indiquez les arrêts lors de la réservation.",
      },
      {
        question: 'Puis-je modifier ou annuler ma réservation une fois confirmée ?',
        answer:
          "Oui. Contactez Figa Travel au plus vite par WhatsApp, téléphone ou e-mail avec les détails de votre réservation et l'équipe la mettra à jour selon les disponibilités. Les modifications demandées peu avant l'heure de prise en charge ne sont pas toujours possibles.",
      },
      {
        question: "Combien de temps à l'avance dois-je réserver mon transfert ?",
        answer:
          "Il est recommandé de réserver au moins quelques jours à l'avance, et plus tôt pendant la haute saison de décembre à avril et les jours fériés. Figa Travel essaie aussi d'aider pour les demandes de dernière minute ; écrivez à l'équipe sur WhatsApp pour vérifier les disponibilités.",
      },
      {
        question: "Qu'est-ce qui est inclus dans un transfert privé Figa Travel ?",
        answer:
          "Chaque transfert privé comprend la prise en charge de porte à porte à votre hôtel, adresse ou aéroport, un chauffeur bilingue agréé, un véhicule assuré et climatisé, de l'eau fraîche à bord, le suivi des vols avec 60 minutes d'attente offertes pour les prises en charge à l'aéroport, ainsi que tous les péages, taxes et le carburant.",
      },
    ],
    destinationFaq: {
      localQuestion: (name) => `Proposez-vous des transferts privés à ${name} ?`,
      localAnswer: (name) =>
        `Oui. Figa Travel propose des transferts privés locaux à ${name}, notamment des prises en charge à l'aéroport international Juan Santamaría (SJO), des trajets d'hôtel à hôtel et des liaisons depuis ${name} vers toutes les grandes destinations du Costa Rica.`,
      durationQuestion: (name) => `Combien de temps dure le transfert privé de San José à ${name} ?`,
      durationAnswer: (name, duration) =>
        `Un transfert privé de San José à ${name} dure environ ${duration} avec Figa Travel Costa Rica, de porte à porte. La durée réelle varie selon la circulation, la météo et l'état des routes.`,
      bookQuestion: (name) => `Comment réserver une navette privée vers ${name} ?`,
      bookAnswer: (name) =>
        `Réservez votre navette privée vers ${name} en ligne sur figatravelcr.com/book-online ou par WhatsApp (+506 7227 1058). Figa Travel propose un prix fixe par véhicule incluant péages, taxes et carburant, et les prises en charge à l'aéroport incluent le suivi du vol et 60 minutes d'attente offertes.`,
      thingsQuestion: (name) => `Que faire à ${name} ?`,
      thingsAnswer: (name, attractions, bestFor) =>
        `Les incontournables à ${name} : ${attractions}. Idéal pour : ${bestFor}.`,
      bestTimeQuestion: (name) => `Quelle est la meilleure période pour visiter ${name} ?`,
    },
  },
}
