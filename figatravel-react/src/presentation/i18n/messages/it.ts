import type { Messages } from './en'

export const it: Messages = {
  common: {
    whatsappBookingText: 'Ciao Figa Travel, vorrei prenotare un transfer',
    whatsappFleetText: 'Ciao Figa Travel, ho una domanda sulla vostra flotta',
    chatOnWhatsApp: 'Scrivici su WhatsApp',
    fullName: 'Nome e cognome',
    email: 'E-mail',
    phone: 'Telefono',
    phoneWhatsApp: 'Telefono / WhatsApp',
    date: 'Data',
    notesOptional: 'Note (facoltative)',
    invalidEmail: 'Inserisci un indirizzo e-mail valido.',
    selectDateFirst: 'Seleziona prima una data',
    amountToPay: 'Importo da pagare:',
    creatingReservation: 'Creazione della prenotazione...',
    continueToPayment: 'Procedi al pagamento',
    premium: 'Premium',
    lastUpdated: 'Ultimo aggiornamento:',
    loading: 'Caricamento...',
  },
  language: {
    label: 'Lingua',
  },
  layout: {
    skipToContent: 'Vai al contenuto principale',
    mainNavAria: 'Principale',
    homeAria: 'Home di Figa Travel',
    menu: 'Menu',
    nav: {
      home: 'Home',
      destinations: 'Destinazioni',
      fleet: 'Flotta',
      bookOnline: 'Prenota',
      faq: 'FAQ',
      aboutUs: 'Chi siamo',
      contact: 'Contatti',
    },
    admin: 'Admin',
    logOut: 'Esci',
    logIn: 'Accedi',
    footerAria: 'Piè di pagina',
    additionalLinks: 'Link utili',
    contact: 'Contatti',
    social: 'Social',
    followUs: 'Seguici e contattaci direttamente.',
    socialLinksAria: 'Link social',
    privacyPolicy: 'Informativa sulla privacy',
    terms: 'Termini e condizioni',
    copyright: '©2026 Figa Travel Costa Rica',
  },
  floatingWhatsApp: {
    aria: 'Scrivici su WhatsApp',
    label: 'Ti serve un passaggio? Scrivici',
  },
  home: {
    heroAria: 'Scopri la bellezza della Costa Rica',
    heroBadge: 'Valutato 4,9/5 dai viaggiatori su Google e Tripadvisor',
    heroTitle: 'Scopri la bellezza della Costa Rica con FIGA TRAVEL',
    heroSubtitle: 'Transfer privati, consigli locali e itinerari selezionati, dai vulcani alle spiagge.',
    heroHighlights: ['Monitoraggio dei voli', 'Autisti bilingui con licenza', 'Prezzo fisso, pedaggi inclusi'],
    seeMyPrice: 'Vedi il mio prezzo',
    trustAria: 'Indicatori di fiducia',
    trustTransfers: 'transfer riusciti ogni stagione',
    trustSupport: 'assistenza in viaggio via WhatsApp ed e-mail',
    trustRating: 'soddisfazione media dei viaggiatori',
    servicesAria: 'Punti di forza del servizio',
    services: ['WI-FI', 'Assistenza clienti', 'Eco-sostenibile', 'Veicoli ben tenuti'],
    stepsEyebrow: 'Prenota in pochi minuti',
    stepsTitle: 'Come funziona il tuo transfer privato',
    steps: [
      {
        title: 'Indica il tuo percorso',
        description:
          "Inserisci il luogo di partenza e di arrivo: l'aeroporto, il tuo hotel o qualsiasi indirizzo in Costa Rica. Il tuo prezzo fisso appare in pochi secondi.",
      },
      {
        title: 'Prenota e paga in sicurezza',
        description:
          'Prenota online con pagamento con carta crittografato oppure scrivici su WhatsApp. Niente tassametro e nessun costo nascosto.',
      },
      {
        title: 'Incontra il tuo autista',
        description:
          'Il tuo autista bilingue segue il tuo volo, ti accoglie al punto di partenza e ti porta porta a porta in un veicolo climatizzato.',
      },
    ],
    destinationsEyebrow: 'Dove andiamo',
    destinationsTitle: 'Le migliori destinazioni in Costa Rica',
    allDestinations: 'Tutte le destinazioni',
    prioritiesEyebrow: 'Perché i viaggiatori scelgono Figa',
    prioritiesTitle: 'Cosa include ogni transfer',
    testimonialsEyebrow: 'Valutato 4,9/5 su Google e Tripadvisor',
    testimonialsTitle: 'Cosa dicono i viaggiatori',
    fleetEyebrow: 'La nostra flotta',
    fleetTitle: 'Un veicolo per ogni dimensione di gruppo',
    viewFullFleet: 'Vedi tutta la flotta',
    faqEyebrow: 'Hai domande?',
    faqTitle: 'Domande frequenti',
    faqTextBefore:
      'Per qualsiasi altra domanda, contattaci via WhatsApp, e-mail o tramite il modulo di contatto. Oppure consulta le nostre',
    faqLink: 'FAQ',
    topQuestions: 'Domande principali',
    viewAll: 'Vedi tutte',
    finalEyebrow: 'Pronti al tuo atterraggio',
    finalTitle: 'Il tuo viaggio privato in Costa Rica inizia qui',
    finalText: 'Ottieni in pochi secondi un prezzo fisso porta a porta. Pedaggi, tasse e carburante inclusi, nessuna sorpresa.',
    getMyPrice: 'Ottieni il mio prezzo',
  },
  routeSearch: {
    title: 'Dove sei diretto?',
    pickupLabel: 'Luogo di partenza',
    pickupPlaceholder: 'Da dove?',
    dropoffLabel: 'Luogo di arrivo',
    dropoffPlaceholder: 'Per dove?',
    swap: 'Inverti partenza e arrivo',
    passengersLegend: 'Passeggeri',
    passengersTitle: 'Quanti passeggeri?',
    adults: 'Adulti',
    children: 'Bambini',
    calculating: 'Calcolo del prezzo...',
    perksAria: 'Vantaggi della prenotazione',
    perkInstant: 'Prezzo immediato',
    perkDoor: 'Porta a porta',
    perkNoFees: 'Nessun costo nascosto',
    removeOne: (label: string) => `Rimuovi uno: ${label.toLowerCase()}`,
    addOne: (label: string) => `Aggiungi uno: ${label.toLowerCase()}`,
    addressUnavailable: 'La ricerca degli indirizzi non è disponibile.',
  },
  reviews: {
    carouselAria: 'Recensioni dei viaggiatori su Google e Tripadvisor',
    stars: (rating: number) => `${rating} stelle su 5`,
    cardAria: (index: number, total: number, author: string, source: string) =>
      `Recensione ${index} di ${total} di ${author} su ${source} — si apre in una nuova scheda`,
    readOn: (source: string) => `Leggi su ${source}`,
    previous: 'Recensioni precedenti',
    next: 'Recensioni successive',
    dotsAria: 'Scegli un gruppo di recensioni',
    goTo: (page: number, total: number) => `Vai alle recensioni ${page} di ${total}`,
  },
  heroMedia: {
    povTag: 'POV · Un vero viaggio con Figa',
    pause: 'Metti in pausa il video di sfondo',
    play: 'Riproduci il video di sfondo',
  },
  destinationsPage: {
    eyebrow: 'Costa Rica',
    title: 'Destinazioni',
    subtitle: 'Scopri le nostre destinazioni più richieste in Costa Rica',
    catalogTitle: 'Catalogo delle destinazioni',
  },
  destinationDetail: {
    notFoundTitle: 'Destinazione non trovata',
    notFoundText: 'La destinazione richiesta non esiste o è stata rimossa dal catalogo.',
    backToDestinations: 'Torna alle destinazioni',
    heroAlt: (name: string) => `${name}, Costa Rica`,
    galleryAria: 'Galleria della destinazione',
    photoAlt: (name: string, index: number) => `${name}, Costa Rica, foto ${index}`,
    infoTitle: 'Informazioni sulla destinazione',
    topAttractions: 'ATTRAZIONI PRINCIPALI',
    travelTips: 'CONSIGLI DI VIAGGIO',
    faqTitle: (name: string) => `FAQ sui transfer per ${name}`,
  },
  fleetPage: {
    eyebrow: 'LA NOSTRA FLOTTA',
    title: 'Un veicolo per ogni dimensione di gruppo',
    intro:
      'Da un SUV premium per due a un minibus da 18 posti, ogni veicolo è climatizzato, assicurato e guidato da un autista locale con licenza.',
    listTitle: 'Scegli il veicolo giusto',
    listIntro: 'Non sai quale scegliere? Dicci quante persone siete e il percorso e ti consiglieremo la soluzione migliore.',
    bookVehicle: 'Prenota questo veicolo',
    askWhatsApp: 'Chiedi su WhatsApp',
    bookTransfer: 'Prenota un transfer',
  },
  faqPage: {
    eyebrow: 'HAI DOMANDE?',
    title: 'FAQ sui transfer privati in Costa Rica',
    intro: 'Risposte rapide per organizzare il tuo viaggio in tutta chiarezza.',
    listTitle: 'Domande frequenti',
    listIntro: 'Se ti serve altro, contattaci via WhatsApp, e-mail o tramite il modulo di contatto.',
    goToContact: 'Vai ai contatti',
  },
  about: {
    heroAlt: 'Paesaggio vulcanico della Costa Rica',
    eyebrow: 'CHI SIAMO',
    title: 'Il tuo viaggio, la nostra passione!',
    paragraph1:
      'La nostra missione è semplice: migliorare la tua esperienza di viaggio in Costa Rica. Siamo qui per arricchire il tuo percorso con comfort, sicurezza e un servizio indimenticabile.',
    paragraph2:
      "Siamo più di un'azienda di trasporti. Siamo il tuo compagno di viaggio per avventura, natura, cultura e relax in tutto il paese.",
    commitmentTitle: "Il nostro impegno per l'eccellenza",
    commitmentText:
      'Dal momento della prenotazione fino a quando ti lasciamo a destinazione, il nostro team si dedica al tuo comfort, alla tua sicurezza e alla tua soddisfazione.',
    closingTitle: 'Grazie per aver considerato Figa Travel Costa Rica',
    closingText: 'Non vediamo l’ora di far parte della tua avventura e di aiutarti a scoprire la bellezza della Costa Rica.',
  },
  contact: {
    eyebrow: 'CONTATTI',
    title: 'Siamo pronti ad aiutarti',
    intro: 'Raccontaci la tua idea di viaggio e ti risponderemo con orari, percorso e dettagli della proposta.',
    channelsTitle: 'Canali diretti',
    channelsIntro: 'Assistenza rapida per telefono, e-mail e WhatsApp.',
    address: 'Indirizzo',
    formTitle: 'Modulo di contatto',
    formSubtitle: 'Inviaci un messaggio e ti risponderemo via e-mail.',
  },
  contactForm: {
    subject: 'Oggetto',
    message: 'Messaggio',
    messagePlaceholder: 'Dicci come possiamo aiutarti.',
    sending: 'Invio...',
    send: 'Invia messaggio',
    success: 'Grazie per averci scritto. Ti risponderemo presto via e-mail.',
  },
  notFound: {
    title: 'Non abbiamo trovato questa pagina',
    text: 'La pagina che cerchi non esiste o è stata spostata. Ti aiutiamo a ritrovare la strada.',
    backHome: 'Torna alla home',
  },
  bookOnline: {
    eyebrow: 'Transfer privati',
    title: 'Prenota online',
    intro: 'Ottieni un prezzo immediato per qualsiasi percorso in Costa Rica oppure scegli uno dei nostri transfer a prezzo fisso.',
    modeTabsAria: 'Come vuoi prenotare?',
    modeCustom: 'Qualsiasi percorso - prezzo immediato',
    modePackages: 'Percorsi a prezzo fisso',
    instantPriceAria: 'Prezzo immediato del percorso',
    loadingPackages: 'Caricamento dei pacchetti...',
    bookNow: 'Prenota ora',
  },
  customRouteForm: {
    title: 'Il tuo transfer privato',
    intro: 'Controlla il prezzo e aggiungi i dettagli del viaggio per procedere al pagamento sicuro.',
    pickup: 'Partenza',
    dropoff: 'Arrivo',
    approxDrive: 'Durata approssimativa',
    passengers: 'Passeggeri',
    passengerSummary: (adults: number, children: number) =>
      `${adults} ${adults === 1 ? 'adulto' : 'adulti'}` +
      (children > 0 ? `, ${children} ${children === 1 ? 'bambino' : 'bambini'}` : ''),
    totalPrice: 'Prezzo totale',
    notesPlaceholder: 'Numero del volo, bagagli, seggiolini, soste...',
    pickupTime: 'Orario di partenza',
    futureDateHint: 'La prenotazione online parte da domani. Seleziona una data futura.',
  },
  reservationForm: {
    title: 'Dettagli della prenotazione',
    intro: 'Inserisci i tuoi dati per procedere al pagamento sicuro.',
    loadingServices: 'Caricamento dei servizi...',
    service: 'Servizio',
    selectService: 'Seleziona un servizio',
    availableDates: 'Date disponibili:',
    travelers: 'Viaggiatori',
    pickupLocation: 'Luogo di partenza',
    pickupPlaceholder: "Nome dell'hotel o indirizzo a La Fortuna",
    availableTime: 'Orario disponibile',
    selectServiceFirst: 'Seleziona prima un servizio',
    loadingAvailability: 'Caricamento della disponibilità...',
    noAvailability: 'Nessuna disponibilità per oggi o date passate. Seleziona una data futura.',
  },
  timePicker: {
    tabsAria: 'Momento della giornata',
    night: 'Notte',
    morning: 'Mattina',
    afternoon: 'Pomeriggio',
    evening: 'Sera',
    timesAria: 'Orari disponibili',
  },
  checkout: {
    title: 'Pagamento sicuro',
    order: (orderNumber: string, amount: string) => `Ordine n. ${orderNumber} - ${amount}`,
    startingSession: 'Avvio della sessione sicura...',
    loadingForm: 'Caricamento del modulo di pagamento...',
    paymentMethod: 'Metodo di pagamento',
    selectMethod: 'Seleziona il metodo di pagamento',
    savedCards: 'Carte salvate',
    selectCard: 'Seleziona una carta',
    cardNumber: 'Numero della carta',
    expiration: 'Data di scadenza',
    cvv: 'CVV',
    phoneNumber: 'Numero di telefono',
    processing: 'Elaborazione...',
    pay: (amount: string) => `Paga ${amount}`,
    securityNote: 'I dati della tua carta sono crittografati ed elaborati in modo sicuro da Tilopay.',
    notReady: 'Il modulo di pagamento non è ancora pronto.',
    rejected: 'Il pagamento è stato rifiutato. Riprova.',
    loadError: 'Impossibile caricare il modulo di pagamento.',
    noMethods: 'Tilopay non ha restituito alcun metodo di pagamento.',
  },
  paymentResponse: {
    title: 'Esito del pagamento',
    verifying: 'Verifica del pagamento con Tilopay...',
    approvedTitle: 'Pagamento approvato',
    approvedText: 'La tua prenotazione è confermata.',
    failedTitle: 'Pagamento non approvato',
    failedText: 'Il pagamento è stato rifiutato. Riprova.',
  },
  legal: {
    eyebrow: 'NOTE LEGALI',
    or: 'o',
    translationNotice:
      'Questa traduzione è fornita per comodità. In caso di differenze, prevale la versione in inglese.',
  },
  privacy: {
    title: 'Informativa sulla privacy',
    introTitle: '1. Introduzione',
    introText:
      'Figa Travel Costa Rica ("Figa Travel", "noi") offre servizi di trasporto privato in tutta la Costa Rica. Questa informativa spiega quali dati personali raccogliamo tramite figatravelcr.com, come li utilizziamo e quali scelte hai. Utilizzando questo sito o prenotando un transfer con noi, accetti le pratiche qui descritte.',
    dataTitle: '2. Informazioni che raccogliamo',
    dataItems: [
      {
        strong: 'Dati di contatto e di prenotazione',
        text: " che invii tramite il modulo di contatto o di prenotazione online: nome e cognome, e-mail, telefono, luoghi di partenza e arrivo, data e ora del viaggio, numero di viaggiatori ed eventuali note.",
      },
      {
        strong: 'Dati di pagamento',
        text: ": i pagamenti con carta sono elaborati direttamente dal nostro fornitore di pagamenti, Tilopay. Non vediamo né conserviamo mai il numero completo della carta, la scadenza o il CVV: questi dati vengono inseriti nel modulo sicuro di Tilopay e gestiti secondo i suoi standard di sicurezza.",
      },
      {
        strong: "Dati dell'account",
        text: ", solo se crei un account amministratore: la tua e-mail e i metadati di autenticazione, gestiti dal nostro fornitore di database, Supabase.",
      },
      {
        strong: 'Dati tecnici',
        text: " come il tipo di browser e l'uso generale del sito, che ci aiutano a mantenere il servizio affidabile e sicuro.",
      },
    ],
    useTitle: '3. Come utilizziamo le tue informazioni',
    useItems: [
      'Per creare e gestire la tua prenotazione e confermare il pagamento.',
      'Per contattarti riguardo al viaggio: conferma della partenza, monitoraggio del volo e cambi di orario.',
      'Per rispondere ai messaggi inviati tramite il modulo di contatto.',
      'Per migliorare i nostri percorsi, veicoli e servizio clienti.',
      'Per adempiere agli obblighi legali, fiscali e contabili in Costa Rica.',
    ],
    sharingTitle: '4. Condivisione delle tue informazioni',
    sharingIntro: 'Non vendiamo i tuoi dati personali. Li condividiamo solo con:',
    sharingItems: [
      { strong: 'Tilopay', text: ', per elaborare il pagamento in modo sicuro.' },
      {
        strong: 'Supabase',
        text: ', il nostro fornitore di database e autenticazione, che conserva per nostro conto prenotazioni e richieste.',
      },
      { strong: '', text: 'Le autorità, quando richiesto dalla legge.' },
    ],
    cookiesTitle: '5. Cookie e archiviazione locale',
    cookiesText:
      "Utilizziamo l'archiviazione essenziale del browser per mantenerti connesso al pannello di amministrazione e ricordare preferenze di base del sito, come la lingua. Non utilizziamo tracciatori pubblicitari di terze parti.",
    retentionTitle: '6. Conservazione dei dati',
    retentionText:
      'Conserviamo prenotazioni e contatti per il tempo necessario a fornire i nostri servizi e ad adempiere agli obblighi contabili e legali, dopodiché eliminiamo o anonimizziamo i dati.',
    rightsTitle: '7. I tuoi diritti',
    rightsBefore: "Puoi chiederci in qualsiasi momento di accedere, correggere o eliminare i tuoi dati personali scrivendo a",
    rightsAfter: '. Risponderemo entro un tempo ragionevole.',
    childrenTitle: '8. Privacy dei minori',
    childrenText:
      'I nostri servizi sono destinati ad adulti che prenotano viaggi. Non raccogliamo consapevolmente dati personali direttamente da minori.',
    contactTitle: '9. Contattaci',
    contactBefore: 'Le domande su questa informativa possono essere inviate a',
  },
  terms: {
    title: 'Termini e condizioni',
    sections: [
      {
        title: '1. Accettazione dei termini',
        text: "Questi Termini e condizioni regolano l'uso di figatravelcr.com e di qualsiasi servizio di trasporto privato prenotato con Figa Travel Costa Rica. Inviando una prenotazione o utilizzando il nostro modulo di contatto, accetti questi termini.",
      },
      {
        title: '2. Prenotazioni',
        text: "Una prenotazione viene creata quando invii il modulo di prenotazione online con percorso, data, orario di partenza e dati dei viaggiatori. La prenotazione è confermata una volta elaborato con successo il pagamento. Controlla data, luogo di partenza e numero di viaggiatori prima di confermare il pagamento.",
      },
      {
        title: '3. Prezzi e pagamento',
        text: "Il prezzo mostrato al pagamento è il prezzo totale del percorso, porta a porta, pedaggi e carburante inclusi. I pagamenti sono elaborati in modo sicuro tramite Tilopay; Figa Travel non conserva i dati della tua carta. I prezzi sono indicati nella valuta mostrata nel modulo di prenotazione.",
      },
      {
        title: '4. Modifiche e cancellazioni',
        text: "Per modificare o cancellare una prenotazione confermata, contattaci il prima possibile via WhatsApp, telefono o e-mail con i dati della prenotazione. Faremo il possibile per accogliere le modifiche in base alla disponibilità, ma le modifiche richieste con poco preavviso rispetto all'orario di partenza non sempre saranno possibili.",
      },
    ],
    serviceTitle: '5. Erogazione del servizio',
    serviceItems: [
      "Le partenze dall'aeroporto includono il monitoraggio del volo e un tempo di attesa gratuito come indicato sul nostro sito.",
      'Gli autisti hanno la licenza e sono autorizzati a svolgere trasporto turistico in Costa Rica.',
      'I tempi di viaggio indicati sul sito sono stime; la durata effettiva può variare in base a meteo, condizioni stradali o traffico.',
      "Sei responsabile di indicare un luogo di partenza corretto e di essere pronto all'orario concordato.",
    ],
    closingSections: [
      {
        title: '6. Responsabilità',
        text: "I nostri veicoli hanno un'assicurazione commerciale per i passeggeri. Figa Travel non è responsabile di ritardi o modifiche causati da eventi al di fuori del nostro ragionevole controllo, come condizioni meteo estreme, chiusure stradali, ritardi dei voli o restrizioni governative. I passeggeri sono responsabili dei propri effetti personali durante il viaggio.",
      },
      {
        title: '7. Comportamento dei passeggeri',
        text: "Possiamo rifiutare o interrompere un viaggio se il comportamento di un passeggero mette in pericolo l'autista, gli altri passeggeri o il veicolo.",
      },
      {
        title: '8. Legge applicabile',
        text: 'Questi termini sono regolati dalle leggi della Costa Rica. Qualsiasi controversia sarà risolta secondo la giurisdizione costaricana.',
      },
    ],
    contactTitle: '9. Contattaci',
    contactBefore: 'Le domande su questi termini possono essere inviate a',
    seeAlso: ". Consulta anche la nostra",
  },
  content: {
    destinations: {
      'la-fortuna': {
        summary: 'Vulcano Arenal, sorgenti termali e sentieri avventurosi.',
        transferTime: '3 h da San José',
        transferDuration: '3 ore',
        bestFor: 'Avventura e natura',
        intro:
          "La Fortuna, nel cuore della Costa Rica, è una destinazione mozzafiato nota per i suoi paesaggi rigogliosi e per il maestoso Vulcano Arenal. I visitatori arrivano qui per vivere il perfetto equilibrio tra avventura e relax.",
        bookLabel: 'PRENOTA IL TRASPORTO PER LA FORTUNA',
        attractions: [
          "Vulcano Arenal: ammira l'iconico Vulcano Arenal, uno dei vulcani più attivi al mondo.",
          'Cascata La Fortuna: fai un’escursione fino alla splendida Cascata La Fortuna e rinfrescati nella sua piscina color smeraldo.',
          'Sorgenti termali: rilassati nelle sorgenti termali naturali e rigenera il corpo con il calore geotermico.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: la stagione secca, da dicembre ad aprile, offre il clima più favorevole.',
          'Clima: giornate calde e serate più fresche; prepara il bagaglio di conseguenza.',
          'Precauzioni per la salute: porta repellente per insetti e crema solare per le attività all’aperto.',
        ],
      },
      papagayo: {
        summary: 'Spiagge tranquille e resort di lusso sulla costa del Pacifico.',
        transferTime: '4 h 30 min da San José',
        transferDuration: '4 ore e 30 minuti',
        bestFor: 'Relax e lusso',
        intro:
          'Papagayo, sulla costa pacifica della Costa Rica, è una destinazione lussuosa e tranquilla nota per le spiagge incontaminate e i resort esclusivi. Offre il perfetto equilibrio tra relax e avventura.',
        bookLabel: 'PRENOTA IL TRASPORTO PER PAPAGAYO',
        attractions: [
          'Playa Hermosa: goditi la bellezza di Playa Hermosa, una spiaggia splendida nota per le acque calme e il paesaggio.',
          'Sport acquatici: prova emozionanti sport acquatici come snorkeling, immersioni e pesca d’altura.',
          'Golf: gioca al rinomato Papagayo Golf & Country Club in un rigoglioso scenario tropicale.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: organizza il viaggio nella stagione secca, da dicembre ad aprile, per il clima migliore.',
          'Clima: giornate calde e soleggiate; porta costume, crema solare e occhiali da sole.',
        ],
      },
      'puerto-viejo': {
        summary: 'Atmosfera caraibica, cultura afro-caraibica e natura rigogliosa.',
        transferTime: '4 h 45 min da San José',
        transferDuration: '4 ore e 45 minuti',
        bestFor: 'Cultura e mare',
        intro:
          "Puerto Viejo unisce ritmo caraibico, spiagge tropicali e una vivace cultura locale: ideale per chi cerca un'avventura rilassata.",
        bookLabel: 'PRENOTA IL TRASPORTO PER PUERTO VIEJO',
        attractions: [
          'Playa Cocles: acque cristalline e lunghe spiagge sabbiose, perfette per giornate di relax.',
          'Jaguar Rescue Center: scopri la tutela della fauna selvatica e la biodiversità locale.',
          'Parco Nazionale di Cahuita: snorkeling e sentieri costieri con una vita marina unica.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: settembre e ottobre sono di solito i mesi più asciutti in questa zona caraibica.',
          "Clima: caldo e umido tutto l'anno; porta abiti leggeri e protezione per la pioggia.",
          'Trasporti: organizza i transfer in anticipo perché le distanze dagli aeroporti sono lunghe.',
        ],
      },
      'manuel-antonio': {
        summary: 'Parco nazionale, fauna selvatica e spiagge spettacolari.',
        transferTime: '3 h 30 min da San José',
        transferDuration: '3 ore e 30 minuti',
        bestFor: 'Famiglie e natura',
        intro:
          "Manuel Antonio, sulla costa pacifica della Costa Rica, è un paradiso tropicale noto per le foreste rigogliose e le spiagge incontaminate. È un rifugio per gli amanti della natura e dell'avventura.",
        bookLabel: 'PRENOTA IL TRASPORTO PER MANUEL ANTONIO',
        attractions: [
          "Parco Nazionale Manuel Antonio: scopri l'incredibile biodiversità di questo celebre parco nazionale, casa di fauna esotica e spiagge incontaminate.",
          'Playa Manuel Antonio: rilassati sull’idilliaca Playa Manuel Antonio, dove la foresta incontra il mare.',
          'Tour in zipline: vivi il brivido della zipline sopra la volta della foresta pluviale.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: vai nella stagione secca, da dicembre ad aprile, per un clima ideale.',
          'Clima: caldo e umido; porta abiti leggeri, crema solare e repellente.',
          "Prenotazioni del parco: prenota in anticipo l'ingresso al Parco Nazionale Manuel Antonio, perché gli accessi giornalieri sono limitati.",
        ],
      },
      tamarindo: {
        summary: 'Surf, ristoranti e tramonti indimenticabili.',
        transferTime: '4 h 40 min da San José',
        transferDuration: '4 ore e 40 minuti',
        bestFor: 'Surf e amici',
        intro:
          'Tamarindo è una delle località di mare più vivaci della Costa Rica, famosa per il surf, i tramonti e un ottimo mix di cucina locale e internazionale.',
        bookLabel: 'PRENOTA IL TRASPORTO PER TAMARINDO',
        attractions: [
          'Lezioni di surf: onde perfette per principianti e surfisti esperti.',
          'Tour in catamarano: esplora la costa e goditi le crociere al tramonto.',
          'Vita notturna: ristoranti e bar sulla spiaggia con un’atmosfera vivace.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: la stagione secca, da dicembre ad aprile, ha le giornate più soleggiate.',
          'Clima: caldo e sole intenso; bevi molto e usa la crema solare.',
          'Trasporti: prenota i transfer in anticipo durante l’alta stagione.',
        ],
      },
      'san-jose-city': {
        name: 'San José',
        summary: 'Cultura urbana, musei e collegamenti con tutto il paese.',
        transferTime: 'Transfer locale',
        transferDuration: null,
        bestFor: 'Fuga in città',
        intro:
          'San José è il centro culturale ed economico della Costa Rica, ideale per chi cerca musei, cucina locale e un accesso rapido alle strade nazionali.',
        bookLabel: 'PRENOTA IL TRASPORTO PER SAN JOSÉ',
        attractions: [
          'Teatro Nazionale: un monumento storico nel cuore della capitale.',
          'Mercato Centrale: scopri sapori locali e prodotti artigianali.',
          'Quartiere dei musei: visita musei e gallerie sulla storia della Costa Rica.',
        ],
        travelTips: [
          'Periodo migliore per visitarla: i tour del mattino e della sera sono ideali per il minor traffico.',
          'Clima: temperature miti con piogge occasionali; porta una giacca leggera.',
          "Trasporti: usa transfer privati per l'aeroporto e i percorsi tra città.",
        ],
      },
    },
    fleet: {
      'toyota-land-cruiser-prado': {
        category: 'SUV premium',
        capacity: '1–3 passeggeri',
        summary:
          'La nostra opzione più confortevole per coppie e piccole famiglie, e la più sicura su strade sterrate e di montagna.',
        features: [
          'Fino a 4 passeggeri più bagagli',
          'Sedili in pelle e climatizzatore bizona',
          'Trazione integrale per i percorsi più difficili',
          'Ideale per lune di miele e tour privati',
        ],
      },
      'hyundai-staria': {
        category: 'Van passeggeri',
        capacity: '1–5 passeggeri',
        summary: 'Un van moderno con finestrini panoramici e una guida silenziosa e fluida per piccoli gruppi.',
        features: [
          'Fino a 5 passeggeri più bagagli',
          'Ampi finestrini e molto spazio per le gambe',
          'Ricarica USB e aria condizionata potente',
          "Ottimo per i transfer da e per l'aeroporto con pochi bagagli",
        ],
      },
      'toyota-hiace': {
        category: 'Van turistico',
        capacity: '1–6 passeggeri',
        summary: 'Il classico affidabile del turismo in Costa Rica, adatto a una famiglia con tutta la sua attrezzatura.',
        features: [
          'Fino a 6 passeggeri più bagagli',
          'Vano bagagli posteriore dedicato',
          "Aria condizionata in tutto l'abitacolo",
          'Transfer quotidiani da aeroporti e hotel',
        ],
      },
      'toyota-hiace-commuter': {
        category: 'Van passeggeri grande',
        capacity: '1–9 passeggeri',
        summary:
          "L'Hiace a tetto alto: ci si sta in piedi all'interno e c'è spazio per famiglie numerose o piccoli gruppi.",
        features: [
          'Fino a 9 passeggeri più bagagli',
          'Tetto alto per salire facilmente',
          'Vano bagagli ampliato',
          'Itinerari con più tappe e tour giornalieri',
        ],
      },
      'toyota-coaster': {
        category: 'Minibus',
        capacity: 'Fino a 18 passeggeri',
        summary: 'Un vero minibus per grandi gruppi, matrimoni, viaggi aziendali ed eventi.',
        features: [
          'Fino a 18 passeggeri più vano bagagli',
          'Abitacolo alto e corridoio ampio',
          'Aria condizionata e impianto audio',
          'Tour di gruppo, eventi e conferenze',
        ],
      },
    },
    priorities: [
      {
        title: 'Monitoraggio del volo, attesa gratuita',
        description:
          "Seguiamo il tuo volo e adattiamo l'orario se atterra in anticipo o in ritardo. Ogni transfer aeroportuale include 60 minuti di attesa gratuita.",
      },
      {
        title: 'Autisti bilingui con licenza',
        description:
          "Autisti locali autorizzati dall'ente del turismo (ICT) che parlano inglese e spagnolo e conoscono ogni percorso, da San José a entrambe le coste.",
      },
      {
        title: 'Flotta assicurata e climatizzata',
        description:
          'SUV e van recenti con assicurazione commerciale per i passeggeri, cintura per ogni posto, acqua fresca a bordo e seggiolini su richiesta.',
      },
      {
        title: 'Un prezzo fisso, porta a porta',
        description:
          'Il prezzo che approvi è quello che paghi: pedaggi, tasse e carburante inclusi. Niente tassametro, nessuna sorpresa, da hotel a hotel.',
      },
    ],
    faq: [
      {
        question: "Qual è il modo migliore per andare dall'aeroporto di San José (SJO) a La Fortuna o Arenal?",
        answer:
          "Il modo più comodo è un transfer privato porta a porta. Figa Travel Costa Rica ti accoglie all'aeroporto internazionale Juan Santamaría (SJO) con un autista bilingue, segue il tuo volo e ti porta direttamente al tuo hotel a La Fortuna / Arenal in circa 3 ore, a un prezzo fisso che include pedaggi, tasse e carburante.",
      },
      {
        question: 'Come prenoto un transfer privato o una navetta aeroportuale in Costa Rica con Figa Travel?',
        answer:
          "Puoi prenotare online su figatravelcr.com/book-online scegliendo percorso, data, orario e luogo di partenza e numero di viaggiatori, quindi pagando in sicurezza con carta. Puoi anche prenotare via WhatsApp (+506 7227 1058), telefono (+506 7139 2747) o e-mail (infofigatravel@gmail.com). La prenotazione è confermata una volta elaborato il pagamento.",
      },
      {
        question: 'Quanto costa un transfer privato in Costa Rica?',
        answer:
          'Figa Travel applica un prezzo fisso per veicolo e percorso, non per passeggero né a tassametro. Il prezzo mostrato al pagamento nella pagina di prenotazione è il totale, porta a porta, con pedaggi, tasse e carburante inclusi, senza costi nascosti. I prezzi dipendono dal percorso e dalle dimensioni del veicolo.',
      },
      {
        question: 'Quali aeroporti della Costa Rica servite?',
        answer:
          "Figa Travel effettua prelievi e trasferimenti all'aeroporto internazionale Juan Santamaría (SJO) di San José e all'aeroporto di Guanacaste (LIR) a Liberia, collegandoli con La Fortuna, Arenal, Manuel Antonio, Tamarindo, Papagayo, Puerto Viejo, San José e altre destinazioni della Costa Rica.",
      },
      {
        question: 'Cosa succede se il mio volo è in ritardo?',
        answer:
          "Per te non cambia nulla. Figa Travel segue il tuo volo e adatta l'orario di partenza se atterra in anticipo o in ritardo, e ogni transfer aeroportuale include 60 minuti di attesa gratuita dopo l'atterraggio, senza costi aggiuntivi.",
      },
      {
        question: 'In quali zone della Costa Rica Figa Travel offre il trasporto?',
        answer:
          "Figa Travel copre tutta la Costa Rica dalla sua base a La Fortuna (Arenal). I percorsi più richiesti includono San José, l'aeroporto SJO, La Fortuna e il Vulcano Arenal, Manuel Antonio, Tamarindo, Papagayo e Puerto Viejo sulla costa caraibica. Percorsi personalizzati e itinerari con più tappe sono disponibili su richiesta.",
      },
      {
        question: 'Quanto durano i viaggi tra le destinazioni più popolari della Costa Rica?',
        answer:
          'Tempi approssimativi dei transfer privati da San José: La Fortuna / Arenal 3 ore, Manuel Antonio 3 ore e 30 minuti, Papagayo 4 ore e 30 minuti, Tamarindo 4 ore e 40 minuti e Puerto Viejo 4 ore e 45 minuti. I tempi effettivi variano in base a traffico, meteo e condizioni stradali.',
      },
      {
        question: 'Che tipi di veicoli usate e quanti passeggeri possono salire?',
        answer:
          'Figa Travel usa veicoli recenti e climatizzati adatti al tuo gruppo: un SUV premium Toyota Land Cruiser Prado (1–3 passeggeri), un van Hyundai Staria (1–5), un Toyota Hiace (1–6), un Toyota Hiace Commuter (1–9) e un minibus Toyota Coaster (fino a 18 passeggeri), tutti con spazio per i bagagli.',
      },
      {
        question: 'I vostri autisti hanno la licenza e parlano inglese?',
        answer:
          "Sì. Tutti gli autisti di Figa Travel sono locali, esperti e autorizzati dall'Ente del turismo della Costa Rica (ICT) a svolgere trasporto turistico, e parlano inglese e spagnolo.",
      },
      {
        question: 'Il trasporto privato in Costa Rica con Figa Travel è sicuro?',
        answer:
          "Sì. Ogni veicolo ha un'assicurazione commerciale per i passeggeri, una cintura per ogni posto e una manutenzione regolare. Gli autisti hanno la licenza, conoscono le strade di montagna e costiere e guidano a un ritmo costante e prudente. Seggiolini per bambini disponibili su richiesta.",
      },
      {
        question: 'Offrite trasporto per grandi gruppi, matrimoni o eventi?',
        answer:
          'Sì. Figa Travel trasporta famiglie, gruppi turistici, matrimoni, viaggi aziendali e conferenze, con van fino a 9 passeggeri e un minibus Toyota Coaster fino a 18 passeggeri. Per gruppi più numerosi si possono combinare più veicoli.',
      },
      {
        question: 'Potete fornire seggiolini per bambini o trasportare animali domestici?',
        answer:
          "Sì. Seggiolini per bambini e neonati sono disponibili su richiesta, e Figa Travel farà il possibile per accogliere transfer con animali domestici. Indica la tua richiesta al momento della prenotazione così da preparare il veicolo e l'attrezzatura giusti.",
      },
      {
        question: 'Posso fare soste lungo il percorso?',
        answer:
          "Sì. Dato che il transfer è privato, puoi chiedere all'autista brevi soste, come un belvedere, una pausa per il bagno o uno spuntino veloce. Per itinerari con più tappe programmate o tour giornalieri, indica le soste al momento della prenotazione.",
      },
      {
        question: 'Posso modificare o cancellare la prenotazione dopo la conferma?',
        answer:
          "Sì. Contatta Figa Travel il prima possibile via WhatsApp, telefono o e-mail con i dati della prenotazione e il team la aggiornerà in base alla disponibilità. Le modifiche richieste poco prima dell'orario di partenza non sempre sono possibili.",
      },
      {
        question: 'Con quanto anticipo devo prenotare il transfer?',
        answer:
          "Consigliamo di prenotare almeno qualche giorno prima, e con più anticipo durante l'alta stagione da dicembre ad aprile e nei giorni festivi. Figa Travel cerca di aiutare anche con le richieste dell'ultimo minuto: scrivi al team su WhatsApp per verificare la disponibilità.",
      },
      {
        question: 'Cosa include un transfer privato Figa Travel?',
        answer:
          "Ogni transfer privato include il prelievo porta a porta in hotel, all'indirizzo o in aeroporto, un autista bilingue con licenza, un veicolo assicurato e climatizzato, acqua fresca a bordo, il monitoraggio del volo con 60 minuti di attesa gratuita per i prelievi in aeroporto, e tutti i pedaggi, le tasse e il carburante.",
      },
    ],
    destinationFaq: {
      localQuestion: (name) => `Offrite transfer privati a ${name}?`,
      localAnswer: (name) =>
        `Sì. Figa Travel offre transfer privati locali a ${name}, inclusi prelievi all'aeroporto internazionale Juan Santamaría (SJO), corse da hotel a hotel e collegamenti da ${name} verso tutte le principali destinazioni della Costa Rica.`,
      durationQuestion: (name) => `Quanto dura il transfer privato da San José a ${name}?`,
      durationAnswer: (name, duration) =>
        `Un transfer privato da San José a ${name} dura circa ${duration} con Figa Travel Costa Rica, porta a porta. Il tempo effettivo varia in base a traffico, meteo e condizioni stradali.`,
      bookQuestion: (name) => `Come prenoto una navetta privata per ${name}?`,
      bookAnswer: (name) =>
        `Prenota la tua navetta privata per ${name} online su figatravelcr.com/book-online o via WhatsApp (+506 7227 1058). Figa Travel propone un prezzo fisso per veicolo con pedaggi, tasse e carburante inclusi, e i prelievi in aeroporto includono il monitoraggio del volo e 60 minuti di attesa gratuita.`,
      thingsQuestion: (name) => `Cosa fare a ${name}?`,
      thingsAnswer: (name, attractions, bestFor) =>
        `Le cose migliori da fare a ${name} includono ${attractions}. Ideale per: ${bestFor}.`,
      bestTimeQuestion: (name) => `Qual è il periodo migliore per visitare ${name}?`,
    },
  },
}
