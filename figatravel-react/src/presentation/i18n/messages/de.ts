import type { Messages } from './en'

export const de: Messages = {
  common: {
    whatsappBookingText: 'Hallo Figa Travel, ich möchte einen Transfer buchen',
    whatsappFleetText: 'Hallo Figa Travel, ich habe eine Frage zu eurer Flotte',
    chatOnWhatsApp: 'Per WhatsApp schreiben',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    phoneWhatsApp: 'Telefon / WhatsApp',
    date: 'Datum',
    notesOptional: 'Anmerkungen (optional)',
    invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    selectDateFirst: 'Wähle zuerst ein Datum',
    amountToPay: 'Zu zahlender Betrag:',
    creatingReservation: 'Buchung wird erstellt...',
    continueToPayment: 'Weiter zur Zahlung',
    premium: 'Premium',
    lastUpdated: 'Zuletzt aktualisiert:',
    loading: 'Wird geladen...',
  },
  language: {
    label: 'Sprache',
  },
  layout: {
    skipToContent: 'Zum Hauptinhalt springen',
    mainNavAria: 'Hauptnavigation',
    homeAria: 'Figa Travel Startseite',
    menu: 'Menü',
    nav: {
      home: 'Start',
      destinations: 'Reiseziele',
      fleet: 'Flotte',
      bookOnline: 'Buchen',
      faq: 'FAQ',
      aboutUs: 'Über uns',
      contact: 'Kontakt',
    },
    admin: 'Admin',
    logOut: 'Abmelden',
    logIn: 'Anmelden',
    footerAria: 'Fußzeile',
    additionalLinks: 'Weitere Links',
    contact: 'Kontakt',
    social: 'Social Media',
    followUs: 'Folge uns und kontaktiere uns direkt.',
    socialLinksAria: 'Social-Media-Links',
    privacyPolicy: 'Datenschutzerklärung',
    terms: 'AGB',
    copyright: '©2026 Figa Travel Costa Rica',
  },
  floatingWhatsApp: {
    aria: 'Schreib uns auf WhatsApp',
    label: 'Brauchst du eine Fahrt? Schreib uns',
  },
  home: {
    heroAria: 'Entdecke die Schönheit Costa Ricas',
    heroBadge: 'Von Reisenden mit 4,9/5 auf Google und Tripadvisor bewertet',
    heroTitle: 'Entdecke die Schönheit Costa Ricas mit FIGA TRAVEL',
    heroSubtitle: 'Private Transfers, lokale Beratung und ausgewählte Routen – von Vulkanen bis zu Stränden.',
    heroHighlights: ['Flugverfolgung', 'Lizenzierte, zweisprachige Fahrer', 'Festpreis inkl. Maut'],
    seeMyPrice: 'Meinen Preis sehen',
    trustAria: 'Vertrauensmerkmale',
    trustTransfers: 'erfolgreiche Transfers pro Saison',
    trustSupport: 'Reiseunterstützung per WhatsApp und E-Mail',
    trustRating: 'durchschnittliche Zufriedenheit der Reisenden',
    servicesAria: 'Service-Highlights',
    services: ['WLAN', 'Kundenservice', 'Umweltbewusst', 'Gepflegte Fahrzeuge'],
    stepsEyebrow: 'In wenigen Minuten gebucht',
    stepsTitle: 'So funktioniert dein privater Transfer',
    steps: [
      {
        title: 'Nenne uns deine Route',
        description:
          'Gib Abhol- und Zielort ein: den Flughafen, dein Hotel oder jede Adresse in Costa Rica. Dein Festpreis erscheint in Sekunden.',
      },
      {
        title: 'Sicher buchen und bezahlen',
        description:
          'Buche online mit verschlüsselter Kartenzahlung oder schreib uns auf WhatsApp. Kein Taxameter, keine versteckten Kosten.',
      },
      {
        title: 'Triff deinen Fahrer',
        description:
          'Dein zweisprachiger Fahrer verfolgt deinen Flug, empfängt dich am Abholort und bringt dich von Tür zu Tür in einem klimatisierten Fahrzeug.',
      },
    ],
    destinationsEyebrow: 'Wohin wir fahren',
    destinationsTitle: 'Top-Reiseziele in Costa Rica',
    allDestinations: 'Alle Reiseziele',
    prioritiesEyebrow: 'Warum Reisende Figa wählen',
    prioritiesTitle: 'Was jeder Transfer beinhaltet',
    testimonialsEyebrow: 'Mit 4,9/5 auf Google und Tripadvisor bewertet',
    testimonialsTitle: 'Was Reisende sagen',
    fleetEyebrow: 'Unsere Flotte',
    fleetTitle: 'Ein Fahrzeug für jede Gruppengröße',
    viewFullFleet: 'Ganze Flotte ansehen',
    faqEyebrow: 'Hast du Fragen?',
    faqTitle: 'Häufig gestellte Fragen',
    faqTextBefore:
      'Bei weiteren Fragen kontaktiere uns per WhatsApp, E-Mail oder über unser Kontaktformular. Oder sieh dir unsere',
    faqLink: 'FAQ an',
    topQuestions: 'Wichtigste Fragen',
    viewAll: 'Alle ansehen',
    finalEyebrow: 'Bereit, wenn du landest',
    finalTitle: 'Deine private Fahrt durch Costa Rica beginnt hier',
    finalText: 'Erhalte in Sekunden einen Festpreis von Tür zu Tür. Maut, Steuern und Treibstoff inklusive, ohne Überraschungen.',
    getMyPrice: 'Meinen Preis erhalten',
  },
  routeSearch: {
    title: 'Wohin geht die Reise?',
    pickupLabel: 'Abholort',
    pickupPlaceholder: 'Von wo?',
    dropoffLabel: 'Zielort',
    dropoffPlaceholder: 'Wohin?',
    swap: 'Abhol- und Zielort tauschen',
    passengersLegend: 'Fahrgäste',
    passengersTitle: 'Wie viele Fahrgäste?',
    adults: 'Erwachsene',
    children: 'Kinder',
    calculating: 'Preis wird berechnet...',
    perksAria: 'Vorteile der Buchung',
    perkInstant: 'Sofortpreis',
    perkDoor: 'Von Tür zu Tür',
    perkNoFees: 'Keine versteckten Kosten',
    removeOne: (label: string) => `Eine Person entfernen: ${label}`,
    addOne: (label: string) => `Eine Person hinzufügen: ${label}`,
    addressUnavailable: 'Die Adresssuche ist nicht verfügbar.',
  },
  reviews: {
    carouselAria: 'Bewertungen von Reisenden auf Google und Tripadvisor',
    stars: (rating: number) => `${rating} von 5 Sternen`,
    cardAria: (index: number, total: number, author: string, source: string) =>
      `Bewertung ${index} von ${total} von ${author} auf ${source} – öffnet in einem neuen Tab`,
    readOn: (source: string) => `Auf ${source} lesen`,
    previous: 'Vorherige Bewertungen',
    next: 'Nächste Bewertungen',
    dotsAria: 'Bewertungsgruppe wählen',
    goTo: (page: number, total: number) => `Zu Bewertungen ${page} von ${total}`,
  },
  heroMedia: {
    povTag: 'POV · Eine echte Fahrt mit Figa',
    pause: 'Hintergrundvideo pausieren',
    play: 'Hintergrundvideo abspielen',
  },
  destinationsPage: {
    eyebrow: 'Costa Rica',
    title: 'Reiseziele',
    subtitle: 'Entdecke unsere beliebtesten Reiseziele in Costa Rica',
    catalogTitle: 'Reiseziel-Katalog',
  },
  destinationDetail: {
    notFoundTitle: 'Reiseziel nicht gefunden',
    notFoundText: 'Das gesuchte Reiseziel existiert nicht oder wurde aus dem Katalog entfernt.',
    backToDestinations: 'Zurück zu den Reisezielen',
    heroAlt: (name: string) => `${name}, Costa Rica`,
    galleryAria: 'Galerie des Reiseziels',
    photoAlt: (name: string, index: number) => `${name}, Costa Rica, Foto ${index}`,
    infoTitle: 'Informationen zum Reiseziel',
    topAttractions: 'TOP-SEHENSWÜRDIGKEITEN',
    travelTips: 'REISETIPPS',
    faqTitle: (name: string) => `FAQ zum Transfer nach ${name}`,
  },
  fleetPage: {
    eyebrow: 'UNSERE FLOTTE',
    title: 'Ein Fahrzeug für jede Gruppengröße',
    intro:
      'Vom Premium-SUV für zwei bis zum Minibus mit 18 Sitzen: Jedes Fahrzeug ist klimatisiert, versichert und wird von einem lizenzierten, ortskundigen Fahrer gefahren.',
    listTitle: 'Wähle das passende Fahrzeug',
    listIntro: 'Unsicher, welches passt? Nenne uns Gruppengröße und Route, und wir empfehlen dir die beste Option.',
    bookVehicle: 'Dieses Fahrzeug buchen',
    askWhatsApp: 'Auf WhatsApp fragen',
    bookTransfer: 'Transfer buchen',
  },
  faqPage: {
    eyebrow: 'HAST DU FRAGEN?',
    title: 'FAQ zu privaten Transfers in Costa Rica',
    intro: 'Schnelle Antworten, damit du deine Reise mit voller Klarheit planen kannst.',
    listTitle: 'Häufig gestellte Fragen',
    listIntro: 'Brauchst du noch etwas? Kontaktiere uns per WhatsApp, E-Mail oder über das Kontaktformular.',
    goToContact: 'Zum Kontakt',
  },
  about: {
    heroAlt: 'Vulkanlandschaft in Costa Rica',
    eyebrow: 'ÜBER UNS',
    title: 'Deine Reise, unsere Leidenschaft!',
    paragraph1:
      'Unsere Mission ist einfach: dein Reiseerlebnis in Costa Rica zu verbessern. Wir bereichern deine Reise mit Komfort, Sicherheit und unvergesslichem Service.',
    paragraph2:
      'Wir sind mehr als ein Transportunternehmen. Wir sind dein Reisepartner für Abenteuer, Natur, Kultur und Erholung im ganzen Land.',
    commitmentTitle: 'Unser Anspruch an Exzellenz',
    commitmentText:
      'Von der Buchung bis zur Ankunft an deinem Ziel setzt sich unser Team für deinen Komfort, deine Sicherheit und deine Zufriedenheit ein.',
    closingTitle: 'Danke, dass du Figa Travel Costa Rica in Betracht ziehst',
    closingText: 'Wir freuen uns darauf, Teil deines Abenteuers zu sein und dir die Schönheit Costa Ricas zu zeigen.',
  },
  contact: {
    eyebrow: 'KONTAKT',
    title: 'Wir sind für dich da',
    intro: 'Erzähl uns von deiner Reiseidee, und wir antworten mit Zeitplan, Route und einem konkreten Angebot.',
    channelsTitle: 'Direkte Kanäle',
    channelsIntro: 'Schnelle Hilfe per Telefon, E-Mail und WhatsApp.',
    address: 'Adresse',
    formTitle: 'Kontaktformular',
    formSubtitle: 'Schick uns eine Nachricht, und wir antworten dir per E-Mail.',
  },
  contactForm: {
    subject: 'Betreff',
    message: 'Nachricht',
    messagePlaceholder: 'Erzähl uns, wie wir dir helfen können.',
    sending: 'Wird gesendet...',
    send: 'Nachricht senden',
    success: 'Danke für deine Nachricht. Wir antworten dir bald per E-Mail.',
  },
  notFound: {
    title: 'Diese Seite haben wir nicht gefunden',
    text: 'Die gesuchte Seite existiert nicht oder wurde verschoben. Wir bringen dich wieder auf den richtigen Weg.',
    backHome: 'Zur Startseite',
  },
  bookOnline: {
    eyebrow: 'Private Transfers',
    title: 'Online buchen',
    intro: 'Erhalte einen Sofortpreis für jede Route in Costa Rica oder wähle einen unserer Transfers zum Festpreis.',
    modeTabsAria: 'Wie möchtest du buchen?',
    modeCustom: 'Beliebige Route – Sofortpreis',
    modePackages: 'Routen zum Festpreis',
    instantPriceAria: 'Sofortpreis für die Route',
    loadingPackages: 'Pakete werden geladen...',
    bookNow: 'Jetzt buchen',
  },
  customRouteForm: {
    title: 'Dein privater Transfer',
    intro: 'Prüfe deinen Preis und ergänze deine Reisedaten, um zur sicheren Zahlung zu gelangen.',
    pickup: 'Abholung',
    dropoff: 'Ziel',
    approxDrive: 'Fahrzeit ca.',
    passengers: 'Fahrgäste',
    passengerSummary: (adults: number, children: number) =>
      `${adults} ${adults === 1 ? 'Erwachsener' : 'Erwachsene'}` +
      (children > 0 ? `, ${children} ${children === 1 ? 'Kind' : 'Kinder'}` : ''),
    totalPrice: 'Gesamtpreis',
    notesPlaceholder: 'Flugnummer, Gepäck, Kindersitze, Zwischenstopps...',
    pickupTime: 'Abholzeit',
    futureDateHint: 'Online-Buchungen sind ab morgen möglich. Wähle ein zukünftiges Datum.',
  },
  reservationForm: {
    title: 'Buchungsdetails',
    intro: 'Gib deine Daten ein, um zur sicheren Zahlung zu gelangen.',
    loadingServices: 'Leistungen werden geladen...',
    service: 'Leistung',
    selectService: 'Wähle eine Leistung',
    availableDates: 'Verfügbare Daten:',
    travelers: 'Reisende',
    pickupLocation: 'Abholort',
    pickupPlaceholder: 'Hotelname oder Adresse in La Fortuna',
    availableTime: 'Verfügbare Uhrzeit',
    selectServiceFirst: 'Wähle zuerst eine Leistung',
    loadingAvailability: 'Verfügbarkeit wird geladen...',
    noAvailability: 'Keine Verfügbarkeit für heute oder vergangene Daten. Wähle ein zukünftiges Datum.',
  },
  timePicker: {
    tabsAria: 'Tageszeit',
    night: 'Nacht',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    timesAria: 'Verfügbare Uhrzeiten',
  },
  checkout: {
    title: 'Sichere Zahlung',
    order: (orderNumber: string, amount: string) => `Bestellung Nr. ${orderNumber} - ${amount}`,
    startingSession: 'Sichere Sitzung wird gestartet...',
    loadingForm: 'Zahlungsformular wird geladen...',
    paymentMethod: 'Zahlungsmethode',
    selectMethod: 'Zahlungsmethode wählen',
    savedCards: 'Gespeicherte Karten',
    selectCard: 'Karte wählen',
    cardNumber: 'Kartennummer',
    expiration: 'Ablaufdatum',
    cvv: 'CVV',
    phoneNumber: 'Telefonnummer',
    processing: 'Wird verarbeitet...',
    pay: (amount: string) => `${amount} bezahlen`,
    securityNote: 'Deine Kartendaten werden verschlüsselt und sicher von Tilopay verarbeitet.',
    notReady: 'Das Zahlungsformular ist noch nicht bereit.',
    rejected: 'Die Zahlung wurde abgelehnt. Bitte versuche es erneut.',
    loadError: 'Das Zahlungsformular konnte nicht geladen werden.',
    noMethods: 'Tilopay hat keine Zahlungsmethoden zurückgegeben.',
  },
  paymentResponse: {
    title: 'Zahlungsergebnis',
    verifying: 'Deine Zahlung wird bei Tilopay überprüft...',
    approvedTitle: 'Zahlung bestätigt',
    approvedText: 'Deine Buchung ist bestätigt.',
    failedTitle: 'Zahlung nicht bestätigt',
    failedText: 'Die Zahlung wurde abgelehnt. Bitte versuche es erneut.',
  },
  legal: {
    eyebrow: 'RECHTLICHES',
    or: 'oder',
    translationNotice:
      'Diese Übersetzung dient nur der Information. Bei Abweichungen ist die englische Fassung maßgeblich.',
  },
  privacy: {
    title: 'Datenschutzerklärung',
    introTitle: '1. Einleitung',
    introText:
      'Figa Travel Costa Rica („Figa Travel", „wir") bietet private Transportdienste in ganz Costa Rica an. Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten wir über figatravelcr.com erheben, wie wir sie nutzen und welche Wahlmöglichkeiten du hast. Durch die Nutzung dieser Website oder die Buchung eines Transfers bei uns stimmst du den hier beschriebenen Praktiken zu.',
    dataTitle: '2. Welche Daten wir erheben',
    dataItems: [
      {
        strong: 'Kontakt- und Buchungsdaten',
        text: ', die du über das Kontaktformular oder das Online-Buchungsformular übermittelst: vollständiger Name, E-Mail, Telefonnummer, Abhol- und Zielort, Reisedatum und -uhrzeit, Anzahl der Reisenden sowie deine Anmerkungen.',
      },
      {
        strong: 'Zahlungsdaten',
        text: ': Kartenzahlungen werden direkt von unserem Zahlungsdienstleister Tilopay verarbeitet. Wir sehen oder speichern niemals deine vollständige Kartennummer, das Ablaufdatum oder die CVV – diese Daten werden im sicheren Zahlungsformular von Tilopay eingegeben und nach dessen Sicherheitsstandards verarbeitet.',
      },
      {
        strong: 'Kontodaten',
        text: ', nur wenn du ein Admin-Konto erstellst: deine E-Mail und Authentifizierungs-Metadaten, verwaltet von unserem Datenbankanbieter Supabase.',
      },
      {
        strong: 'Technische Daten',
        text: ' wie Browsertyp und allgemeine Nutzung der Website, die uns helfen, den Dienst zuverlässig und sicher zu halten.',
      },
    ],
    useTitle: '3. Wie wir deine Daten nutzen',
    useItems: [
      'Um deine Buchung zu erstellen und zu verwalten und die Zahlung zu bestätigen.',
      'Um dich zu deiner Reise zu kontaktieren: Abholbestätigung, Flugverfolgung und Zeitänderungen.',
      'Um auf Nachrichten aus dem Kontaktformular zu antworten.',
      'Um unsere Routen, Fahrzeuge und unseren Kundenservice zu verbessern.',
      'Um gesetzliche, steuerliche und buchhalterische Pflichten in Costa Rica zu erfüllen.',
    ],
    sharingTitle: '4. Weitergabe deiner Daten',
    sharingIntro: 'Wir verkaufen deine personenbezogenen Daten nicht. Wir geben sie nur weiter an:',
    sharingItems: [
      { strong: 'Tilopay', text: ', um deine Zahlung sicher zu verarbeiten.' },
      {
        strong: 'Supabase',
        text: ', unseren Datenbank- und Authentifizierungsanbieter, der Buchungen und Anfragen in unserem Auftrag speichert.',
      },
      { strong: '', text: 'Behörden, wenn das Gesetz es verlangt.' },
    ],
    cookiesTitle: '5. Cookies und lokaler Speicher',
    cookiesText:
      'Wir nutzen notwendigen Browserspeicher, um dich im Admin-Bereich angemeldet zu halten und grundlegende Einstellungen wie deine Sprache zu speichern. Wir verwenden keine Werbe-Tracker von Drittanbietern.',
    retentionTitle: '6. Speicherdauer',
    retentionText:
      'Wir bewahren Buchungs- und Kontaktdaten so lange auf, wie es für unsere Leistungen und zur Erfüllung buchhalterischer und gesetzlicher Pflichten nötig ist; danach löschen oder anonymisieren wir die Daten.',
    rightsTitle: '7. Deine Rechte',
    rightsBefore: 'Du kannst jederzeit Auskunft, Berichtigung oder Löschung deiner personenbezogenen Daten verlangen, indem du schreibst an',
    rightsAfter: '. Wir antworten innerhalb einer angemessenen Frist.',
    childrenTitle: '8. Datenschutz von Kindern',
    childrenText:
      'Unsere Leistungen richten sich an Erwachsene, die Reisen buchen. Wir erheben wissentlich keine personenbezogenen Daten direkt von Kindern.',
    contactTitle: '9. Kontakt',
    contactBefore: 'Fragen zu dieser Erklärung kannst du senden an',
  },
  terms: {
    title: 'Allgemeine Geschäftsbedingungen',
    sections: [
      {
        title: '1. Annahme dieser Bedingungen',
        text: 'Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung von figatravelcr.com und aller bei Figa Travel Costa Rica gebuchten privaten Transportdienste. Mit dem Absenden einer Buchung oder der Nutzung unseres Kontaktformulars akzeptierst du diese Bedingungen.',
      },
      {
        title: '2. Buchungen',
        text: 'Eine Buchung entsteht, wenn du das Online-Buchungsformular mit Route, Datum, Abholzeit und Reisendendaten absendest. Sie ist bestätigt, sobald die Zahlung erfolgreich verarbeitet wurde. Bitte prüfe Reisedatum, Abholort und Anzahl der Reisenden, bevor du die Zahlung bestätigst.',
      },
      {
        title: '3. Preise und Zahlung',
        text: 'Der beim Bezahlen angezeigte Preis ist der Gesamtpreis deiner Route von Tür zu Tür, inklusive Maut und Treibstoff. Zahlungen werden sicher über Tilopay abgewickelt; Figa Travel speichert deine Kartendaten nicht. Die Preise gelten in der im Buchungsformular angezeigten Währung.',
      },
      {
        title: '4. Änderungen und Stornierungen',
        text: 'Um eine bestätigte Buchung zu ändern oder zu stornieren, kontaktiere uns so früh wie möglich per WhatsApp, Telefon oder E-Mail mit deinen Buchungsdaten. Wir versuchen, Änderungen je nach Verfügbarkeit zu ermöglichen; kurzfristige Änderungen vor der Abholzeit sind jedoch nicht immer möglich.',
      },
    ],
    serviceTitle: '5. Leistungserbringung',
    serviceItems: [
      'Abholungen am Flughafen beinhalten Flugverfolgung und kostenlose Wartezeit, wie auf unserer Website beschrieben.',
      'Die Fahrer sind lizenziert und für den touristischen Personenverkehr in Costa Rica zugelassen.',
      'Die auf der Website angegebenen Fahrzeiten sind Schätzungen; die tatsächliche Dauer kann je nach Wetter, Straßenzustand oder Verkehr variieren.',
      'Du bist dafür verantwortlich, einen korrekten Abholort anzugeben und zur vereinbarten Zeit bereit zu sein.',
    ],
    closingSections: [
      {
        title: '6. Haftung',
        text: 'Unsere Fahrzeuge verfügen über eine gewerbliche Insassenversicherung. Figa Travel haftet nicht für Verspätungen oder Änderungen durch Ereignisse außerhalb unserer zumutbaren Kontrolle, etwa extremes Wetter, Straßensperrungen, Flugverspätungen oder behördliche Einschränkungen. Fahrgäste sind während der Fahrt für ihre persönlichen Gegenstände verantwortlich.',
      },
      {
        title: '7. Verhalten der Fahrgäste',
        text: 'Wir können eine Fahrt ablehnen oder beenden, wenn das Verhalten eines Fahrgasts den Fahrer, andere Fahrgäste oder das Fahrzeug gefährdet.',
      },
      {
        title: '8. Anwendbares Recht',
        text: 'Diese Bedingungen unterliegen dem Recht Costa Ricas. Streitigkeiten werden nach costa-ricanischer Gerichtsbarkeit beigelegt.',
      },
    ],
    contactTitle: '9. Kontakt',
    contactBefore: 'Fragen zu diesen Bedingungen kannst du senden an',
    seeAlso: '. Siehe auch unsere',
  },
  content: {
    destinations: {
      'la-fortuna': {
        summary: 'Vulkan Arenal, heiße Quellen und Abenteuerpfade.',
        transferTime: '3 Std. ab San José',
        transferDuration: '3 Stunden',
        bestFor: 'Abenteuer und Natur',
        intro:
          'La Fortuna im Herzen Costa Ricas ist ein atemberaubendes Reiseziel, bekannt für üppige Landschaften und den majestätischen Vulkan Arenal. Besucher kommen hierher, um die perfekte Mischung aus Abenteuer und Entspannung zu erleben.',
        bookLabel: 'TRANSPORT NACH LA FORTUNA BUCHEN',
        attractions: [
          'Vulkan Arenal: Bestaune den ikonischen Vulkan Arenal, einen der aktivsten Vulkane der Welt.',
          'Wasserfall La Fortuna: Wandere zum beeindruckenden Wasserfall La Fortuna und erfrische dich in seinem smaragdgrünen Becken.',
          'Heiße Quellen: Entspanne in natürlichen heißen Quellen und tanke Energie dank der Erdwärme.',
        ],
        travelTips: [
          'Beste Reisezeit: Die Trockenzeit von Dezember bis April bietet das angenehmste Wetter.',
          'Wetter: Rechne mit warmen Tagen und kühleren Abenden; pack entsprechend.',
          'Gesundheit: Nimm Insektenschutz und Sonnencreme für Aktivitäten im Freien mit.',
        ],
      },
      papagayo: {
        summary: 'Ruhige Strände und Luxusresorts an der Pazifikküste.',
        transferTime: '4 Std. 30 Min. ab San José',
        transferDuration: '4 Stunden und 30 Minuten',
        bestFor: 'Erholung und Luxus',
        intro:
          'Papagayo an der Pazifikküste Costa Ricas ist ein luxuriöses, ruhiges Reiseziel, bekannt für unberührte Strände und exklusive Resorts. Es verbindet Erholung und Abenteuer perfekt.',
        bookLabel: 'TRANSPORT NACH PAPAGAYO BUCHEN',
        attractions: [
          'Playa Hermosa: Genieße die Schönheit der Playa Hermosa, eines traumhaften Strandes mit ruhigem Wasser und malerischer Umgebung.',
          'Wassersport: Erlebe aufregenden Wassersport wie Schnorcheln, Tauchen und Hochseefischen.',
          'Golf: Spiel eine Runde im renommierten Papagayo Golf & Country Club inmitten tropischer Natur.',
        ],
        travelTips: [
          'Beste Reisezeit: Plane deine Reise in der Trockenzeit von Dezember bis April für das beste Wetter.',
          'Wetter: Warme, sonnige Tage; pack Badesachen, Sonnencreme und Sonnenbrille ein.',
        ],
      },
      'puerto-viejo': {
        summary: 'Karibisches Flair, afro-karibische Kultur und üppige Natur.',
        transferTime: '4 Std. 45 Min. ab San José',
        transferDuration: '4 Stunden und 45 Minuten',
        bestFor: 'Kultur und Strand',
        intro:
          'Puerto Viejo verbindet karibischen Rhythmus, tropische Strände und lebendige lokale Kultur – ideal für Reisende, die entspanntes Abenteuer suchen.',
        bookLabel: 'TRANSPORT NACH PUERTO VIEJO BUCHEN',
        attractions: [
          'Playa Cocles: Kristallklares Wasser und lange Sandstrände, perfekt für entspannte Tage.',
          'Jaguar Rescue Center: Erfahre mehr über Wildtierschutz und die lokale Artenvielfalt.',
          'Nationalpark Cahuita: Schnorcheln und Küstenpfade mit einzigartiger Meereswelt.',
        ],
        travelTips: [
          'Beste Reisezeit: September und Oktober sind in dieser Karibikregion meist trockener.',
          'Wetter: Ganzjährig warm und feucht; nimm leichte Kleidung und Regenschutz mit.',
          'Transport: Plane Transfers rechtzeitig, da die Entfernungen von den Flughäfen groß sind.',
        ],
      },
      'manuel-antonio': {
        summary: 'Nationalpark, Tierwelt und spektakuläre Strände.',
        transferTime: '3 Std. 30 Min. ab San José',
        transferDuration: '3 Stunden und 30 Minuten',
        bestFor: 'Familien und Natur',
        intro:
          'Manuel Antonio an der Pazifikküste Costa Ricas ist ein tropisches Paradies, bekannt für üppigen Regenwald und unberührte Strände. Ein Rückzugsort für Naturfreunde und Abenteuerlustige.',
        bookLabel: 'TRANSPORT NACH MANUEL ANTONIO BUCHEN',
        attractions: [
          'Nationalpark Manuel Antonio: Entdecke die unglaubliche Artenvielfalt dieses berühmten Nationalparks mit exotischer Tierwelt und unberührten Stränden.',
          'Playa Manuel Antonio: Entspanne an der idyllischen Playa Manuel Antonio, wo der Regenwald auf das Meer trifft.',
          'Canopy-Touren: Erlebe den Nervenkitzel einer Zipline über dem Blätterdach des Regenwalds.',
        ],
        travelTips: [
          'Beste Reisezeit: Reise in der Trockenzeit von Dezember bis April für ideales Wetter.',
          'Wetter: Warm und feucht; pack leichte Kleidung, Sonnencreme und Insektenschutz ein.',
          'Parkreservierung: Reserviere den Eintritt in den Nationalpark Manuel Antonio im Voraus, da der tägliche Zugang begrenzt ist.',
        ],
      },
      tamarindo: {
        summary: 'Surfen, Restaurants und unvergessliche Sonnenuntergänge.',
        transferTime: '4 Std. 40 Min. ab San José',
        transferDuration: '4 Stunden und 40 Minuten',
        bestFor: 'Surfen und Freunde',
        intro:
          'Tamarindo ist einer der lebendigsten Strandorte Costa Ricas, berühmt für Surfen, Sonnenuntergänge und eine tolle Mischung aus lokaler und internationaler Küche.',
        bookLabel: 'TRANSPORT NACH TAMARINDO BUCHEN',
        attractions: [
          'Surfkurse: Perfekte Wellen für Anfänger und erfahrene Surfer.',
          'Katamarantouren: Erkunde die Küste und genieße Fahrten in den Sonnenuntergang.',
          'Nachtleben: Restaurants und Strandbars mit lebhafter Atmosphäre.',
        ],
        travelTips: [
          'Beste Reisezeit: Die Trockenzeit von Dezember bis April bietet die sonnigsten Tage.',
          'Wetter: Heiß mit starker Sonne; trink genug und nutze Sonnencreme.',
          'Transport: Reserviere Transfers in der Hochsaison frühzeitig.',
        ],
      },
      'san-jose-city': {
        name: 'San José',
        summary: 'Stadtkultur, Museen und Verbindungen ins ganze Land.',
        transferTime: 'Lokaler Transfer',
        transferDuration: null,
        bestFor: 'Städtetrip',
        intro:
          'San José ist das kulturelle und wirtschaftliche Zentrum Costa Ricas, ideal für Reisende, die Museen, lokale Küche und schnellen Zugang zu den Fernstraßen suchen.',
        bookLabel: 'TRANSPORT NACH SAN JOSÉ BUCHEN',
        attractions: [
          'Nationaltheater: Ein historisches Wahrzeichen im Herzen der Hauptstadt.',
          'Zentralmarkt: Entdecke lokale Aromen und Kunsthandwerk.',
          'Museumsviertel: Besuche Museen und Galerien zur Geschichte Costa Ricas.',
        ],
        travelTips: [
          'Beste Reisezeit: Touren am Morgen und am Abend sind wegen des geringeren Verkehrs ideal.',
          'Wetter: Milde Temperaturen mit gelegentlichem Regen; nimm eine leichte Jacke mit.',
          'Transport: Nutze private Transfers für Flughafen- und Überlandstrecken.',
        ],
      },
    },
    fleet: {
      'toyota-land-cruiser-prado': {
        category: 'Premium-SUV',
        capacity: '1–3 Fahrgäste',
        summary:
          'Unsere komfortabelste Option für Paare und kleine Familien und die sicherste Wahl auf Schotter- und Bergstraßen.',
        features: [
          'Bis zu 4 Fahrgäste plus Gepäck',
          'Ledersitze und Zwei-Zonen-Klimaautomatik',
          'Allradantrieb für anspruchsvolle Strecken',
          'Ideal für Flitterwochen und private Touren',
        ],
      },
      'hyundai-staria': {
        category: 'Personenvan',
        capacity: '1–5 Fahrgäste',
        summary: 'Ein moderner Van mit Panoramafenstern und einer leisen, ruhigen Fahrt für kleine Gruppen.',
        features: [
          'Bis zu 5 Fahrgäste plus Gepäck',
          'Große Fenster und viel Beinfreiheit',
          'USB-Ladeanschlüsse und starke Klimaanlage',
          'Ideal für Flughafentransfers mit leichtem Gepäck',
        ],
      },
      'toyota-hiace': {
        category: 'Touristenvan',
        capacity: '1–6 Fahrgäste',
        summary: 'Das zuverlässige Arbeitstier des Tourismus in Costa Rica, passend für eine Familie samt Ausrüstung.',
        features: [
          'Bis zu 6 Fahrgäste plus Gepäck',
          'Eigener Gepäckbereich im Heck',
          'Klimaanlage im gesamten Innenraum',
          'Alltägliche Flughafen- und Hoteltransfers',
        ],
      },
      'toyota-hiace-commuter': {
        category: 'Großer Personenvan',
        capacity: '1–9 Fahrgäste',
        summary:
          'Der Hiace mit Hochdach: Stehhöhe im Innenraum und Platz für größere Familien oder kleine Reisegruppen.',
        features: [
          'Bis zu 9 Fahrgäste plus Gepäck',
          'Hochdach für bequemes Einsteigen',
          'Erweitertes Gepäckabteil',
          'Routen mit mehreren Stopps und Tagestouren',
        ],
      },
      'toyota-coaster': {
        category: 'Minibus',
        capacity: 'Bis zu 18 Fahrgäste',
        summary: 'Ein vollwertiger Minibus für große Gruppen, Hochzeiten, Geschäftsreisen und Veranstaltungen.',
        features: [
          'Bis zu 18 Fahrgäste plus Gepäckraum',
          'Hohe Kopffreiheit und breiter Gang',
          'Klimaanlage und Lautsprecheranlage',
          'Gruppenreisen, Events und Konferenzen',
        ],
      },
    },
    priorities: [
      {
        title: 'Flugverfolgung, kostenlose Wartezeit',
        description:
          'Wir verfolgen deinen Flug und passen die Abholung an, wenn er früher oder später landet. Jeder Flughafentransfer beinhaltet 60 Minuten kostenlose Wartezeit.',
      },
      {
        title: 'Lizenzierte, zweisprachige Fahrer',
        description:
          'Ortskundige Fahrer mit Zulassung der Tourismusbehörde ICT, die Englisch und Spanisch sprechen und jede Route kennen – von San José bis zu beiden Küsten.',
      },
      {
        title: 'Versicherte, klimatisierte Flotte',
        description:
          'Neuwertige SUVs und Vans mit gewerblicher Insassenversicherung, Gurt an jedem Sitz, kaltem Wasser an Bord und Kindersitzen auf Anfrage.',
      },
      {
        title: 'Ein Festpreis, von Tür zu Tür',
        description:
          'Der Preis, den du bestätigst, ist der Preis, den du zahlst: Maut, Steuern und Treibstoff inklusive. Kein Taxameter, keine Überraschungen, von Hotel zu Hotel.',
      },
    ],
    faq: [
      {
        question: 'Wie kommt man am besten vom Flughafen San José (SJO) nach La Fortuna oder Arenal?',
        answer:
          'Am bequemsten ist ein privater Tür-zu-Tür-Transfer. Figa Travel Costa Rica holt dich mit einem zweisprachigen Fahrer am internationalen Flughafen Juan Santamaría (SJO) ab, verfolgt deinen Flug und bringt dich in etwa 3 Stunden direkt zu deinem Hotel in La Fortuna / Arenal – zu einem Festpreis inklusive Maut, Steuern und Treibstoff.',
      },
      {
        question: 'Wie buche ich mit Figa Travel einen privaten Transfer oder Flughafenshuttle in Costa Rica?',
        answer:
          'Du kannst online unter figatravelcr.com/book-online buchen: Route, Datum, Abholzeit, Abholort und Anzahl der Reisenden wählen und sicher per Karte bezahlen. Du kannst auch per WhatsApp (+506 7227 1058), Telefon (+506 7139 2747) oder E-Mail (infofigatravel@gmail.com) buchen. Die Buchung ist bestätigt, sobald die Zahlung verarbeitet wurde.',
      },
      {
        question: 'Was kostet ein privater Transfer in Costa Rica?',
        answer:
          'Figa Travel berechnet einen Festpreis pro Fahrzeug und Route, nicht pro Person oder nach Taxameter. Der beim Bezahlen auf der Buchungsseite angezeigte Preis ist der Gesamtpreis von Tür zu Tür, inklusive Maut, Steuern und Treibstoff – ohne versteckte Kosten. Die Preise hängen von Route und Fahrzeuggröße ab.',
      },
      {
        question: 'Welche Flughäfen in Costa Rica bedient ihr?',
        answer:
          'Figa Travel bietet Abholungen und Fahrten zum internationalen Flughafen Juan Santamaría (SJO) in San José und zum Flughafen Guanacaste (LIR) in Liberia und verbindet sie mit La Fortuna, Arenal, Manuel Antonio, Tamarindo, Papagayo, Puerto Viejo, San José und weiteren Zielen in Costa Rica.',
      },
      {
        question: 'Was passiert, wenn mein Flug Verspätung hat?',
        answer:
          'Für dich ändert sich nichts. Figa Travel verfolgt deinen Flug und passt die Abholzeit an, wenn er früher oder später landet, und jeder Flughafentransfer beinhaltet 60 Minuten kostenlose Wartezeit nach der Landung – ohne Aufpreis.',
      },
      {
        question: 'Wo in Costa Rica bietet Figa Travel Transporte an?',
        answer:
          'Figa Travel deckt von seinem Standort in La Fortuna (Arenal) aus ganz Costa Rica ab. Beliebte Routen sind San José, der Flughafen SJO, La Fortuna und der Vulkan Arenal, Manuel Antonio, Tamarindo, Papagayo und Puerto Viejo an der Karibikküste. Individuelle Routen und Reisen mit mehreren Stopps sind auf Anfrage möglich.',
      },
      {
        question: 'Wie lange dauern die Fahrten zwischen beliebten Reisezielen in Costa Rica?',
        answer:
          'Ungefähre Fahrzeiten privater Transfers ab San José: La Fortuna / Arenal 3 Stunden, Manuel Antonio 3 Stunden 30 Minuten, Papagayo 4 Stunden 30 Minuten, Tamarindo 4 Stunden 40 Minuten und Puerto Viejo 4 Stunden 45 Minuten. Die tatsächlichen Zeiten hängen von Verkehr, Wetter und Straßenzustand ab.',
      },
      {
        question: 'Welche Fahrzeuge setzt ihr ein und wie viele Fahrgäste passen hinein?',
        answer:
          'Figa Travel nutzt neuwertige, klimatisierte Fahrzeuge passend zu deiner Gruppe: einen Premium-SUV Toyota Land Cruiser Prado (1–3 Fahrgäste), einen Hyundai Staria (1–5), einen Toyota Hiace (1–6), einen Toyota Hiace Commuter (1–9) und einen Minibus Toyota Coaster (bis zu 18 Fahrgäste), alle mit Platz für Gepäck.',
      },
      {
        question: 'Sind eure Fahrer lizenziert und sprechen sie Englisch?',
        answer:
          'Ja. Alle Fahrer von Figa Travel sind ortsansässig, erfahren und von der Tourismusbehörde Costa Ricas (ICT) für den touristischen Personenverkehr zugelassen, und sie sprechen Englisch und Spanisch.',
      },
      {
        question: 'Ist der private Transport in Costa Rica mit Figa Travel sicher?',
        answer:
          'Ja. Jedes Fahrzeug hat eine gewerbliche Insassenversicherung, einen Gurt an jedem Sitz und wird regelmäßig gewartet. Die Fahrer sind lizenziert, kennen die Berg- und Küstenstraßen und fahren ruhig und umsichtig. Kindersitze gibt es auf Anfrage.',
      },
      {
        question: 'Bietet ihr Transporte für große Gruppen, Hochzeiten oder Events an?',
        answer:
          'Ja. Figa Travel befördert Familien, Reisegruppen, Hochzeitsgäste, Geschäftsreisende und Konferenzteilnehmer, mit Vans für bis zu 9 Fahrgäste und einem Minibus Toyota Coaster für bis zu 18 Fahrgäste. Für größere Gruppen lassen sich mehrere Fahrzeuge kombinieren.',
      },
      {
        question: 'Bietet ihr Kindersitze oder haustierfreundliche Transfers an?',
        answer:
          'Ja. Kinder- und Babysitze gibt es auf Anfrage, und Figa Travel bemüht sich, auch Transfers mit Haustieren zu ermöglichen. Gib deinen Wunsch bei der Buchung an, damit das passende Fahrzeug und die Ausstattung bereitstehen.',
      },
      {
        question: 'Kann ich unterwegs anhalten?',
        answer:
          'Ja. Da der Transfer privat ist, kannst du deinen Fahrer um kurze Stopps bitten, etwa an einem Aussichtspunkt, für eine Toilettenpause oder einen schnellen Snack. Für geplante Routen mit mehreren Stopps oder Tagestouren gib die Stopps bei der Buchung an.',
      },
      {
        question: 'Kann ich meine Buchung nach der Bestätigung ändern oder stornieren?',
        answer:
          'Ja. Kontaktiere Figa Travel so früh wie möglich per WhatsApp, Telefon oder E-Mail mit deinen Buchungsdaten, und das Team passt deine Buchung je nach Verfügbarkeit an. Kurzfristige Änderungen vor der Abholzeit sind nicht immer möglich.',
      },
      {
        question: 'Wie lange im Voraus sollte ich meinen Transfer buchen?',
        answer:
          'Wir empfehlen, mindestens einige Tage im Voraus zu buchen, in der Hochsaison von Dezember bis April und an Feiertagen noch früher. Figa Travel hilft auch bei kurzfristigen Anfragen; schreib dem Team auf WhatsApp, um die Verfügbarkeit zu prüfen.',
      },
      {
        question: 'Was ist in einem privaten Transfer von Figa Travel enthalten?',
        answer:
          'Jeder private Transfer umfasst die Tür-zu-Tür-Abholung an deinem Hotel, deiner Adresse oder am Flughafen, einen lizenzierten zweisprachigen Fahrer, ein versichertes, klimatisiertes Fahrzeug, kaltes Wasser an Bord, Flugverfolgung mit 60 Minuten kostenloser Wartezeit bei Flughafenabholungen sowie alle Mautgebühren, Steuern und den Treibstoff.',
      },
    ],
    destinationFaq: {
      localQuestion: (name) => `Bietet ihr private Transfers in ${name} an?`,
      localAnswer: (name) =>
        `Ja. Figa Travel bietet lokale private Transfers in ${name} an, darunter Abholungen am internationalen Flughafen Juan Santamaría (SJO), Fahrten von Hotel zu Hotel und Verbindungen von ${name} zu allen wichtigen Reisezielen in Costa Rica.`,
      durationQuestion: (name) => `Wie lange dauert der private Transfer von San José nach ${name}?`,
      durationAnswer: (name, duration) =>
        `Ein privater Transfer von San José nach ${name} dauert mit Figa Travel Costa Rica etwa ${duration}, von Tür zu Tür. Die tatsächliche Zeit hängt von Verkehr, Wetter und Straßenzustand ab.`,
      bookQuestion: (name) => `Wie buche ich einen privaten Shuttle nach ${name}?`,
      bookAnswer: (name) =>
        `Buche deinen privaten Shuttle nach ${name} online unter figatravelcr.com/book-online oder per WhatsApp (+506 7227 1058). Figa Travel nennt einen Festpreis pro Fahrzeug inklusive Maut, Steuern und Treibstoff, und Flughafenabholungen beinhalten Flugverfolgung und 60 Minuten kostenlose Wartezeit.`,
      thingsQuestion: (name) => `Was kann man in ${name} unternehmen?`,
      thingsAnswer: (name, attractions, bestFor) =>
        `Zu den Highlights in ${name} gehören ${attractions}. Ideal für: ${bestFor}.`,
      bestTimeQuestion: (name) => `Wann ist die beste Reisezeit für ${name}?`,
    },
  },
}
