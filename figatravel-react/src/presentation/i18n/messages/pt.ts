import type { Messages } from './en'

export const pt: Messages = {
  common: {
    whatsappBookingText: 'Olá Figa Travel, quero reservar um traslado',
    whatsappFleetText: 'Olá Figa Travel, tenho uma pergunta sobre a frota',
    chatOnWhatsApp: 'Fale conosco no WhatsApp',
    fullName: 'Nome completo',
    email: 'E-mail',
    phone: 'Telefone',
    phoneWhatsApp: 'Telefone / WhatsApp',
    date: 'Data',
    notesOptional: 'Observações (opcional)',
    invalidEmail: 'Informe um e-mail válido.',
    selectDateFirst: 'Primeiro selecione uma data',
    amountToPay: 'Valor a pagar:',
    creatingReservation: 'Criando reserva...',
    continueToPayment: 'Continuar para o pagamento',
    premium: 'Premium',
    lastUpdated: 'Última atualização:',
    loading: 'Carregando...',
  },
  language: {
    label: 'Idioma',
  },
  layout: {
    skipToContent: 'Pular para o conteúdo principal',
    mainNavAria: 'Principal',
    homeAria: 'Início da Figa Travel',
    menu: 'Menu',
    nav: {
      home: 'Início',
      destinations: 'Destinos',
      fleet: 'Frota',
      bookOnline: 'Reservar',
      faq: 'Perguntas',
      aboutUs: 'Sobre nós',
      contact: 'Contato',
    },
    admin: 'Admin',
    logOut: 'Sair',
    logIn: 'Entrar',
    footerAria: 'Rodapé',
    additionalLinks: 'Links úteis',
    contact: 'Contato',
    social: 'Redes sociais',
    followUs: 'Siga-nos e fale diretamente conosco.',
    socialLinksAria: 'Redes sociais',
    privacyPolicy: 'Política de privacidade',
    terms: 'Termos e condições',
    copyright: '©2026 Figa Travel Costa Rica',
  },
  floatingWhatsApp: {
    aria: 'Fale conosco no WhatsApp',
    label: 'Precisa de transporte? Fale conosco',
  },
  home: {
    heroAria: 'Descubra a beleza da Costa Rica',
    heroBadge: 'Nota 4,9/5 dos viajantes no Google e no Tripadvisor',
    heroTitle: 'Descubra a beleza da Costa Rica com a FIGA TRAVEL',
    heroSubtitle: 'Traslados privados, orientação local e roteiros selecionados, dos vulcões às praias.',
    heroHighlights: ['Monitoramento de voos', 'Motoristas bilíngues licenciados', 'Preço fixo, pedágios incluídos'],
    seeMyPrice: 'Ver meu preço',
    trustAria: 'Indicadores de confiança',
    trustTransfers: 'traslados bem-sucedidos a cada temporada',
    trustSupport: 'suporte na viagem por WhatsApp e e-mail',
    trustRating: 'satisfação média dos viajantes',
    servicesAria: 'Destaques do serviço',
    services: ['WI-FI', 'Atendimento ao cliente', 'Consciência ecológica', 'Veículos bem conservados'],
    stepsEyebrow: 'Reserve em minutos',
    stepsTitle: 'Como funciona o seu traslado privado',
    steps: [
      {
        title: 'Informe o seu trajeto',
        description:
          'Digite o local de embarque e de destino: o aeroporto, o seu hotel ou qualquer endereço na Costa Rica. O seu preço fixo aparece em segundos.',
      },
      {
        title: 'Reserve e pague com segurança',
        description:
          'Reserve online com pagamento por cartão criptografado ou envie uma mensagem no WhatsApp. Sem taxímetro e sem taxas ocultas.',
      },
      {
        title: 'Encontre o seu motorista',
        description:
          'O seu motorista bilíngue acompanha o seu voo, encontra você no embarque e leva você de porta a porta em um veículo com ar-condicionado.',
      },
    ],
    destinationsEyebrow: 'Para onde vamos',
    destinationsTitle: 'Principais destinos na Costa Rica',
    allDestinations: 'Todos os destinos',
    prioritiesEyebrow: 'Por que os viajantes escolhem a Figa',
    prioritiesTitle: 'O que todo traslado inclui',
    testimonialsEyebrow: 'Nota 4,9/5 no Google e no Tripadvisor',
    testimonialsTitle: 'O que dizem os viajantes',
    fleetEyebrow: 'Nossa frota',
    fleetTitle: 'Um veículo para cada tamanho de grupo',
    viewFullFleet: 'Ver a frota completa',
    faqEyebrow: 'Tem alguma dúvida?',
    faqTitle: 'Perguntas frequentes',
    faqTextBefore:
      'Se tiver outras dúvidas, fale conosco pelo WhatsApp, e-mail ou formulário de contato. Ou confira as nossas',
    faqLink: 'perguntas frequentes',
    topQuestions: 'Principais perguntas',
    viewAll: 'Ver todas',
    finalEyebrow: 'Prontos quando você pousar',
    finalTitle: 'O seu transporte privado pela Costa Rica começa aqui',
    finalText: 'Receba um preço fixo de porta a porta em segundos. Pedágios, impostos e combustível incluídos, sem surpresas.',
    getMyPrice: 'Ver meu preço',
  },
  routeSearch: {
    title: 'Para onde você vai?',
    pickupLabel: 'Local de embarque',
    pickupPlaceholder: 'De onde?',
    dropoffLabel: 'Local de destino',
    dropoffPlaceholder: 'Para onde?',
    swap: 'Inverter embarque e destino',
    passengersLegend: 'Passageiros',
    passengersTitle: 'Quantos passageiros?',
    adults: 'Adultos',
    children: 'Crianças',
    calculating: 'Calculando preço...',
    perksAria: 'Vantagens da reserva',
    perkInstant: 'Preço na hora',
    perkDoor: 'Porta a porta',
    perkNoFees: 'Sem taxas ocultas',
    removeOne: (label: string) => `Remover um: ${label.toLowerCase()}`,
    addOne: (label: string) => `Adicionar um: ${label.toLowerCase()}`,
    addressUnavailable: 'A busca de endereços não está disponível.',
  },
  reviews: {
    carouselAria: 'Avaliações de viajantes no Google e no Tripadvisor',
    stars: (rating: number) => `${rating} de 5 estrelas`,
    cardAria: (index: number, total: number, author: string, source: string) =>
      `Avaliação ${index} de ${total} por ${author} no ${source} — abre em uma nova aba`,
    readOn: (source: string) => `Ler no ${source}`,
    previous: 'Avaliações anteriores',
    next: 'Próximas avaliações',
    dotsAria: 'Escolha um grupo de avaliações',
    goTo: (page: number, total: number) => `Ir para as avaliações ${page} de ${total}`,
  },
  heroMedia: {
    povTag: 'POV · Uma viagem real com a Figa',
    pause: 'Pausar o vídeo de fundo',
    play: 'Reproduzir o vídeo de fundo',
  },
  destinationsPage: {
    eyebrow: 'Costa Rica',
    title: 'Destinos',
    subtitle: 'Conheça os nossos destinos mais procurados na Costa Rica',
    catalogTitle: 'Catálogo de destinos',
  },
  destinationDetail: {
    notFoundTitle: 'Destino não encontrado',
    notFoundText: 'O destino solicitado não existe ou foi removido do catálogo.',
    backToDestinations: 'Voltar aos destinos',
    heroAlt: (name: string) => `${name}, Costa Rica`,
    galleryAria: 'Galeria do destino',
    photoAlt: (name: string, index: number) => `${name}, Costa Rica, foto ${index}`,
    infoTitle: 'Informações do destino',
    topAttractions: 'PRINCIPAIS ATRAÇÕES',
    travelTips: 'DICAS DE VIAGEM',
    faqTitle: (name: string) => `Perguntas frequentes sobre traslados para ${name}`,
  },
  fleetPage: {
    eyebrow: 'NOSSA FROTA',
    title: 'Um veículo para cada tamanho de grupo',
    intro:
      'De um SUV premium para dois a um micro-ônibus de 18 lugares, todos os veículos têm ar-condicionado, seguro e um motorista local licenciado.',
    listTitle: 'Escolha o veículo certo',
    listIntro: 'Não sabe qual escolher? Diga o tamanho do seu grupo e o trajeto e recomendaremos a melhor opção.',
    bookVehicle: 'Reservar este veículo',
    askWhatsApp: 'Pergunte no WhatsApp',
    bookTransfer: 'Reservar um traslado',
  },
  faqPage: {
    eyebrow: 'TEM ALGUMA DÚVIDA?',
    title: 'Perguntas frequentes sobre traslados privados na Costa Rica',
    intro: 'Respostas rápidas para planejar a sua viagem com total clareza.',
    listTitle: 'Perguntas frequentes',
    listIntro: 'Se precisar de algo mais, fale conosco pelo WhatsApp, e-mail ou formulário de contato.',
    goToContact: 'Ir para o contato',
  },
  about: {
    heroAlt: 'Paisagem vulcânica da Costa Rica',
    eyebrow: 'SOBRE NÓS',
    title: 'A sua viagem, a nossa paixão!',
    paragraph1:
      'A nossa missão é simples: melhorar a sua experiência de viagem na Costa Rica. Estamos aqui para enriquecer o seu percurso com conforto, segurança e um atendimento memorável.',
    paragraph2:
      'Somos mais do que uma empresa de transporte. Somos o seu parceiro de viagem para aventura, natureza, cultura e descanso em todo o país.',
    commitmentTitle: 'Nosso compromisso com a excelência',
    commitmentText:
      'Do momento em que você reserva até deixarmos você no destino, nossa equipe se dedica ao seu conforto, segurança e satisfação.',
    closingTitle: 'Obrigado por considerar a Figa Travel Costa Rica',
    closingText: 'Esperamos fazer parte da sua aventura e ajudar você a descobrir a beleza da Costa Rica.',
  },
  contact: {
    eyebrow: 'CONTATO',
    title: 'Estamos prontos para ajudar',
    intro: 'Conte-nos a sua ideia de viagem e responderemos com horários, trajeto e detalhes da proposta.',
    channelsTitle: 'Canais diretos',
    channelsIntro: 'Atendimento rápido por telefone, e-mail e WhatsApp.',
    address: 'Endereço',
    formTitle: 'Formulário de contato',
    formSubtitle: 'Envie-nos uma mensagem e responderemos por e-mail.',
  },
  contactForm: {
    subject: 'Assunto',
    message: 'Mensagem',
    messagePlaceholder: 'Conte-nos como podemos ajudar.',
    sending: 'Enviando...',
    send: 'Enviar mensagem',
    success: 'Obrigado pelo contato. Responderemos por e-mail em breve.',
  },
  notFound: {
    title: 'Não encontramos essa página',
    text: 'A página que você procura não existe ou foi movida. Vamos voltar ao caminho certo.',
    backHome: 'Voltar ao início',
  },
  bookOnline: {
    eyebrow: 'Traslados privados',
    title: 'Reservar online',
    intro: 'Receba um preço na hora para qualquer trajeto na Costa Rica ou escolha um dos nossos traslados de preço fixo.',
    modeTabsAria: 'Como você quer reservar?',
    modeCustom: 'Qualquer trajeto - preço na hora',
    modePackages: 'Trajetos de preço fixo',
    instantPriceAria: 'Preço do trajeto na hora',
    loadingPackages: 'Carregando pacotes...',
    bookNow: 'Reservar agora',
  },
  customRouteForm: {
    title: 'O seu traslado privado',
    intro: 'Confira o preço e adicione os detalhes da viagem para continuar ao pagamento seguro.',
    pickup: 'Embarque',
    dropoff: 'Destino',
    approxDrive: 'Duração aprox.',
    passengers: 'Passageiros',
    passengerSummary: (adults: number, children: number) =>
      `${adults} ${adults === 1 ? 'adulto' : 'adultos'}` +
      (children > 0 ? `, ${children} ${children === 1 ? 'criança' : 'crianças'}` : ''),
    totalPrice: 'Preço total',
    notesPlaceholder: 'Número do voo, bagagem, cadeirinhas, paradas...',
    pickupTime: 'Horário de embarque',
    futureDateHint: 'As reservas online começam amanhã. Selecione uma data futura.',
  },
  reservationForm: {
    title: 'Dados da reserva',
    intro: 'Preencha os seus dados para continuar ao pagamento seguro.',
    loadingServices: 'Carregando serviços...',
    service: 'Serviço',
    selectService: 'Selecione um serviço',
    availableDates: 'Datas disponíveis:',
    travelers: 'Viajantes',
    pickupLocation: 'Local de embarque',
    pickupPlaceholder: 'Nome do hotel ou endereço em La Fortuna',
    availableTime: 'Horário disponível',
    selectServiceFirst: 'Primeiro selecione um serviço',
    loadingAvailability: 'Carregando disponibilidade...',
    noAvailability: 'Sem disponibilidade para hoje ou datas passadas. Selecione uma data futura.',
  },
  timePicker: {
    tabsAria: 'Período do dia',
    night: 'Madrugada',
    morning: 'Manhã',
    afternoon: 'Tarde',
    evening: 'Noite',
    timesAria: 'Horários disponíveis',
  },
  checkout: {
    title: 'Pagamento seguro',
    order: (orderNumber: string, amount: string) => `Pedido nº ${orderNumber} - ${amount}`,
    startingSession: 'Iniciando sessão segura...',
    loadingForm: 'Carregando formulário de pagamento...',
    paymentMethod: 'Forma de pagamento',
    selectMethod: 'Selecione a forma de pagamento',
    savedCards: 'Cartões salvos',
    selectCard: 'Selecione um cartão',
    cardNumber: 'Número do cartão',
    expiration: 'Data de validade',
    cvv: 'CVV',
    phoneNumber: 'Número de telefone',
    processing: 'Processando...',
    pay: (amount: string) => `Pagar ${amount}`,
    securityNote: 'Os dados do seu cartão são criptografados e processados com segurança pela Tilopay.',
    notReady: 'O formulário de pagamento ainda não está pronto.',
    rejected: 'O pagamento foi recusado. Tente novamente.',
    loadError: 'Não foi possível carregar o formulário de pagamento.',
    noMethods: 'A Tilopay não retornou formas de pagamento.',
  },
  paymentResponse: {
    title: 'Resultado do pagamento',
    verifying: 'Verificando o seu pagamento com a Tilopay...',
    approvedTitle: 'Pagamento aprovado',
    approvedText: 'A sua reserva foi confirmada.',
    failedTitle: 'Pagamento não aprovado',
    failedText: 'O pagamento foi recusado. Tente novamente.',
  },
  legal: {
    eyebrow: 'JURÍDICO',
    or: 'ou',
    translationNotice:
      'Esta tradução é fornecida por conveniência. Em caso de divergência, prevalece a versão em inglês.',
  },
  privacy: {
    title: 'Política de privacidade',
    introTitle: '1. Introdução',
    introText:
      'A Figa Travel Costa Rica ("Figa Travel", "nós") presta serviços de transporte privado em toda a Costa Rica. Esta Política de privacidade explica quais dados pessoais coletamos por meio de figatravelcr.com, como os usamos e quais são as suas opções. Ao usar este site ou reservar um traslado conosco, você concorda com as práticas aqui descritas.',
    dataTitle: '2. Informações que coletamos',
    dataItems: [
      {
        strong: 'Dados de contato e de reserva',
        text: ' que você envia pelo formulário de contato ou de reserva online: nome completo, e-mail, telefone, locais de embarque e destino, data e horário da viagem, número de viajantes e quaisquer observações.',
      },
      {
        strong: 'Dados de pagamento',
        text: ': os pagamentos com cartão são processados diretamente pelo nosso provedor de pagamentos, a Tilopay. Nunca vemos nem armazenamos o número completo do seu cartão, a validade ou o CVV — esses dados são inseridos no formulário seguro da Tilopay e tratados segundo os padrões de segurança dela.',
      },
      {
        strong: 'Dados de conta',
        text: ', apenas se você criar uma conta de administrador: o seu e-mail e os metadados de autenticação, gerenciados pelo nosso provedor de banco de dados, a Supabase.',
      },
      {
        strong: 'Dados técnicos',
        text: ' como o tipo de navegador e o uso geral do site, que nos ajudam a manter o serviço confiável e seguro.',
      },
    ],
    useTitle: '3. Como usamos as suas informações',
    useItems: [
      'Para criar e gerenciar a sua reserva e confirmar o pagamento.',
      'Para entrar em contato sobre a sua viagem: confirmação do embarque, monitoramento de voos e mudanças de horário.',
      'Para responder às mensagens enviadas pelo formulário de contato.',
      'Para melhorar os nossos trajetos, veículos e atendimento.',
      'Para cumprir obrigações legais, fiscais e contábeis na Costa Rica.',
    ],
    sharingTitle: '4. Compartilhamento das suas informações',
    sharingIntro: 'Não vendemos os seus dados pessoais. Só os compartilhamos com:',
    sharingItems: [
      { strong: 'Tilopay', text: ', para processar o seu pagamento com segurança.' },
      {
        strong: 'Supabase',
        text: ', o nosso provedor de banco de dados e autenticação, que armazena os registros de reservas e solicitações em nosso nome.',
      },
      { strong: '', text: 'Autoridades, quando exigido por lei.' },
    ],
    cookiesTitle: '5. Cookies e armazenamento local',
    cookiesText:
      'Usamos armazenamento essencial do navegador para manter você conectado ao painel de administração e lembrar preferências básicas do site, como o idioma. Não usamos rastreadores de publicidade de terceiros.',
    retentionTitle: '6. Retenção de dados',
    retentionText:
      'Mantemos os registros de reservas e contato pelo tempo necessário para prestar os nossos serviços e cumprir obrigações contábeis e legais; depois, excluímos ou anonimizamos os dados.',
    rightsTitle: '7. Os seus direitos',
    rightsBefore: 'Você pode pedir acesso, correção ou exclusão dos seus dados pessoais a qualquer momento escrevendo para',
    rightsAfter: '. Responderemos em um prazo razoável.',
    childrenTitle: '8. Privacidade de crianças',
    childrenText:
      'Os nossos serviços destinam-se a adultos que reservam viagens. Não coletamos intencionalmente dados pessoais diretamente de crianças.',
    contactTitle: '9. Fale conosco',
    contactBefore: 'Dúvidas sobre esta política podem ser enviadas para',
  },
  terms: {
    title: 'Termos e condições',
    sections: [
      {
        title: '1. Aceitação destes termos',
        text: 'Estes Termos e condições regem o uso de figatravelcr.com e de qualquer serviço de transporte privado reservado com a Figa Travel Costa Rica. Ao enviar uma reserva ou usar o nosso formulário de contato, você aceita estes termos.',
      },
      {
        title: '2. Reservas',
        text: 'Uma reserva é criada quando você envia o formulário de reserva online com o trajeto, a data, o horário de embarque e os dados dos viajantes. A reserva é confirmada quando o pagamento é processado com sucesso. Confira a data da viagem, o local de embarque e o número de viajantes antes de confirmar o pagamento.',
      },
      {
        title: '3. Preços e pagamento',
        text: 'O preço exibido no pagamento é o preço total do seu trajeto, de porta a porta, com pedágios e combustível incluídos. Os pagamentos são processados com segurança pela Tilopay; a Figa Travel não armazena os dados do seu cartão. Os preços são exibidos na moeda indicada no formulário de reserva.',
      },
      {
        title: '4. Alterações e cancelamentos',
        text: 'Para alterar ou cancelar uma reserva confirmada, fale conosco o quanto antes pelo WhatsApp, telefone ou e-mail com os dados da reserva. Faremos o possível para atender às alterações conforme a disponibilidade, mas mudanças pedidas pouco antes do horário de embarque nem sempre serão possíveis.',
      },
    ],
    serviceTitle: '5. Prestação do serviço',
    serviceItems: [
      'Os embarques no aeroporto incluem monitoramento do voo e tempo de espera de cortesia, conforme descrito no site.',
      'Os motoristas são licenciados e autorizados a operar transporte turístico na Costa Rica.',
      'Os tempos de viagem exibidos no site são estimativas; a duração real pode variar com o clima, as condições das estradas ou o trânsito.',
      'Você é responsável por informar um local de embarque correto e estar pronto no horário combinado.',
    ],
    closingSections: [
      {
        title: '6. Responsabilidade',
        text: 'Os nossos veículos têm seguro comercial de passageiros. A Figa Travel não se responsabiliza por atrasos ou mudanças causados por eventos fora do nosso controle razoável, como clima extremo, bloqueios de estradas, atrasos de voos ou restrições governamentais. Os passageiros são responsáveis pelos seus pertences durante a viagem.',
      },
      {
        title: '7. Conduta dos passageiros',
        text: 'Podemos recusar ou encerrar uma viagem se a conduta de um passageiro colocar em risco o motorista, outros passageiros ou o veículo.',
      },
      {
        title: '8. Legislação aplicável',
        text: 'Estes termos são regidos pelas leis da Costa Rica. Qualquer disputa será resolvida sob a jurisdição costarriquenha.',
      },
    ],
    contactTitle: '9. Fale conosco',
    contactBefore: 'Dúvidas sobre estes termos podem ser enviadas para',
    seeAlso: '. Veja também a nossa',
  },
  content: {
    destinations: {
      'la-fortuna': {
        summary: 'Vulcão Arenal, fontes termais e trilhas de aventura.',
        transferTime: '3 h desde San José',
        transferDuration: '3 horas',
        bestFor: 'Aventura e natureza',
        intro:
          'La Fortuna, no coração da Costa Rica, é um destino deslumbrante, conhecido pelas paisagens exuberantes e pelo majestoso Vulcão Arenal. Os visitantes vêm em busca da combinação perfeita de aventura e descanso.',
        bookLabel: 'RESERVE TRANSPORTE PARA LA FORTUNA',
        attractions: [
          'Vulcão Arenal: admire o icônico Vulcão Arenal, um dos vulcões mais ativos do mundo.',
          'Cachoeira La Fortuna: faça a trilha até a impressionante Cachoeira La Fortuna e dê um mergulho refrescante na sua piscina esmeralda.',
          'Fontes termais: relaxe nas fontes termais naturais e revigore o corpo com o calor geotérmico.',
        ],
        travelTips: [
          'Melhor época para visitar: a estação seca, de dezembro a abril, oferece o clima mais favorável.',
          'Clima: dias quentes e noites mais frescas; leve roupas adequadas.',
          'Cuidados com a saúde: leve repelente e protetor solar para as atividades ao ar livre.',
        ],
      },
      papagayo: {
        summary: 'Praias tranquilas e resorts de luxo na costa do Pacífico.',
        transferTime: '4 h 30 min desde San José',
        transferDuration: '4 horas e 30 minutos',
        bestFor: 'Descanso e luxo',
        intro:
          'Papagayo, na costa pacífica da Costa Rica, é um destino luxuoso e tranquilo, conhecido pelas praias preservadas e resorts sofisticados. Oferece a combinação perfeita de descanso e aventura.',
        bookLabel: 'RESERVE TRANSPORTE PARA PAPAGAYO',
        attractions: [
          'Playa Hermosa: aproveite a beleza de Playa Hermosa, uma praia deslumbrante conhecida pelas águas calmas e pela paisagem.',
          'Esportes aquáticos: viva esportes aquáticos emocionantes como snorkel, mergulho e pesca em alto-mar.',
          'Golfe: jogue no renomado Papagayo Golf & Country Club, em um cenário tropical exuberante.',
        ],
        travelTips: [
          'Melhor época para visitar: planeje a viagem na estação seca, de dezembro a abril, para ter o melhor clima.',
          'Clima: dias quentes e ensolarados; leve roupa de praia, protetor solar e óculos de sol.',
        ],
      },
      'puerto-viejo': {
        summary: 'Clima caribenho, cultura afro-caribenha e natureza exuberante.',
        transferTime: '4 h 45 min desde San José',
        transferDuration: '4 horas e 45 minutos',
        bestFor: 'Cultura e praia',
        intro:
          'Puerto Viejo combina ritmo caribenho, praias tropicais e uma cultura local vibrante, ideal para quem busca uma aventura descontraída.',
        bookLabel: 'RESERVE TRANSPORTE PARA PUERTO VIEJO',
        attractions: [
          'Playa Cocles: águas cristalinas e longas faixas de areia, perfeitas para dias de descanso.',
          'Jaguar Rescue Center: conheça a conservação da vida selvagem e a biodiversidade local.',
          'Parque Nacional Cahuita: snorkel e trilhas costeiras com uma vida marinha única.',
        ],
        travelTips: [
          'Melhor época para visitar: setembro e outubro costumam ser mais secos nesta região do Caribe.',
          'Clima: quente e úmido o ano todo; leve roupas leves e proteção contra chuva.',
          'Transporte: planeje os traslados com antecedência, pois as distâncias desde os aeroportos são longas.',
        ],
      },
      'manuel-antonio': {
        summary: 'Parque nacional, vida selvagem e praias espetaculares.',
        transferTime: '3 h 30 min desde San José',
        transferDuration: '3 horas e 30 minutos',
        bestFor: 'Famílias e natureza',
        intro:
          'Manuel Antonio, na costa pacífica da Costa Rica, é um paraíso tropical conhecido pelas florestas exuberantes e praias preservadas. É um refúgio para amantes da natureza e da aventura.',
        bookLabel: 'RESERVE TRANSPORTE PARA MANUEL ANTONIO',
        attractions: [
          'Parque Nacional Manuel Antonio: descubra a incrível biodiversidade deste famoso parque nacional, lar de fauna exótica e praias preservadas.',
          'Playa Manuel Antonio: relaxe na idílica Playa Manuel Antonio, onde a floresta encontra o mar.',
          'Tirolesas: sinta a emoção da tirolesa sobre a copa da floresta tropical.',
        ],
        travelTips: [
          'Melhor época para visitar: vá na estação seca, de dezembro a abril, para um clima ideal.',
          'Clima: quente e úmido; leve roupas leves, protetor solar e repelente.',
          'Reservas do parque: reserve com antecedência a entrada no Parque Nacional Manuel Antonio, pois o acesso diário é limitado.',
        ],
      },
      tamarindo: {
        summary: 'Surfe, restaurantes e pores do sol inesquecíveis.',
        transferTime: '4 h 40 min desde San José',
        transferDuration: '4 horas e 40 minutos',
        bestFor: 'Surfe e amigos',
        intro:
          'Tamarindo é uma das cidades de praia mais animadas da Costa Rica, famosa pelo surfe, pelos pores do sol e pela ótima mistura de gastronomia local e internacional.',
        bookLabel: 'RESERVE TRANSPORTE PARA TAMARINDO',
        attractions: [
          'Aulas de surfe: ondas perfeitas para iniciantes e surfistas experientes.',
          'Passeios de catamarã: explore a costa e aproveite passeios ao pôr do sol.',
          'Vida noturna: restaurantes e bares de praia com clima animado.',
        ],
        travelTips: [
          'Melhor época para visitar: a estação seca, de dezembro a abril, tem os dias mais ensolarados.',
          'Clima: calor e sol forte; mantenha-se hidratado e use protetor solar.',
          'Transporte: reserve os traslados com antecedência na alta temporada.',
        ],
      },
      'san-jose-city': {
        name: 'San José',
        summary: 'Cultura urbana, museus e conexões para todo o país.',
        transferTime: 'Traslado local',
        transferDuration: null,
        bestFor: 'Passeio urbano',
        intro:
          'San José é o centro cultural e de negócios da Costa Rica, ideal para quem quer museus, comida local e acesso rápido às rotas nacionais.',
        bookLabel: 'RESERVE TRANSPORTE PARA SAN JOSÉ',
        attractions: [
          'Teatro Nacional: um marco histórico no coração da capital.',
          'Mercado Central: descubra sabores locais e produtos artesanais.',
          'Distrito dos museus: visite museus e galerias com a história da Costa Rica.',
        ],
        travelTips: [
          'Melhor época para visitar: passeios de manhã e à noite são ideais por causa do trânsito menor.',
          'Clima: temperaturas amenas com chuvas ocasionais; leve um casaco leve.',
          'Transporte: use traslados privados para o aeroporto e rotas entre cidades.',
        ],
      },
    },
    fleet: {
      'toyota-land-cruiser-prado': {
        category: 'SUV premium',
        capacity: '1–3 passageiros',
        summary:
          'A nossa opção mais confortável para casais e famílias pequenas, e a mais segura em estradas de cascalho e de montanha.',
        features: [
          'Até 4 passageiros mais bagagem',
          'Bancos de couro e climatização de duas zonas',
          'Tração integral para trajetos mais difíceis',
          'Ideal para luas de mel e passeios privados',
        ],
      },
      'hyundai-staria': {
        category: 'Van de passageiros',
        capacity: '1–5 passageiros',
        summary: 'Uma van moderna com janelas panorâmicas e uma viagem silenciosa e suave para grupos pequenos.',
        features: [
          'Até 5 passageiros mais bagagem',
          'Janelas amplas e bastante espaço para as pernas',
          'Carregador USB e ar-condicionado potente',
          'Ótima para traslados ao aeroporto com pouca bagagem',
        ],
      },
      'toyota-hiace': {
        category: 'Van de turismo',
        capacity: '1–6 passageiros',
        summary: 'A confiável e clássica van do turismo na Costa Rica, com espaço para uma família e toda a bagagem.',
        features: [
          'Até 6 passageiros mais bagagem',
          'Área de bagagem traseira exclusiva',
          'Ar-condicionado em toda a cabine',
          'Traslados diários para aeroportos e hotéis',
        ],
      },
      'toyota-hiace-commuter': {
        category: 'Van de passageiros grande',
        capacity: '1–9 passageiros',
        summary:
          'A Hiace de teto alto: dá para ficar de pé dentro e há espaço para famílias grandes ou pequenos grupos.',
        features: [
          'Até 9 passageiros mais bagagem',
          'Teto alto para embarcar com facilidade',
          'Compartimento de bagagem ampliado',
          'Roteiros com várias paradas e passeios de um dia',
        ],
      },
      'toyota-coaster': {
        category: 'Micro-ônibus',
        capacity: 'Até 18 passageiros',
        summary: 'Um micro-ônibus completo para grupos grandes, casamentos, viagens corporativas e eventos.',
        features: [
          'Até 18 passageiros mais bagageiro',
          'Teto alto e corredor amplo',
          'Ar-condicionado e sistema de som',
          'Passeios em grupo, eventos e conferências',
        ],
      },
    },
    priorities: [
      {
        title: 'Monitoramento de voos, espera grátis',
        description:
          'Acompanhamos o seu voo e ajustamos o embarque se ele pousar antes ou depois. Todo traslado de aeroporto inclui 60 minutos de espera de cortesia.',
      },
      {
        title: 'Motoristas bilíngues licenciados',
        description:
          'Motoristas locais autorizados pelo instituto de turismo (ICT), que falam inglês e espanhol e conhecem cada trajeto, de San José às duas costas.',
      },
      {
        title: 'Frota segurada e com ar-condicionado',
        description:
          'SUVs e vans recentes com seguro comercial de passageiros, cinto em cada assento, água gelada a bordo e cadeirinhas sob pedido.',
      },
      {
        title: 'Um preço fixo, de porta a porta',
        description:
          'O preço que você aprova é o que você paga: pedágios, impostos e combustível incluídos. Sem taxímetro, sem surpresas, de hotel a hotel.',
      },
    ],
    faq: [
      {
        question: 'Qual é a melhor forma de ir do Aeroporto de San José (SJO) para La Fortuna ou Arenal?',
        answer:
          'A forma mais confortável é um traslado privado de porta a porta. A Figa Travel Costa Rica busca você no Aeroporto Internacional Juan Santamaría (SJO) com um motorista bilíngue, acompanha o seu voo e leva você direto ao hotel em La Fortuna / Arenal em cerca de 3 horas, com um preço fixo que inclui pedágios, impostos e combustível.',
      },
      {
        question: 'Como reservo um traslado privado ou transfer de aeroporto na Costa Rica com a Figa Travel?',
        answer:
          'Você pode reservar online em figatravelcr.com/book-online escolhendo o trajeto, a data, o horário e o local de embarque e o número de viajantes, e pagando com segurança no cartão. Também é possível reservar pelo WhatsApp (+506 7227 1058), telefone (+506 7139 2747) ou e-mail (infofigatravel@gmail.com). A reserva é confirmada quando o pagamento é processado.',
      },
      {
        question: 'Quanto custa um traslado privado na Costa Rica?',
        answer:
          'A Figa Travel cobra um preço fixo por veículo e trajeto, não por passageiro nem por taxímetro. O preço exibido no pagamento da página de reservas é o total, de porta a porta, com pedágios, impostos e combustível incluídos, sem taxas ocultas. Os preços dependem do trajeto e do tamanho do veículo.',
      },
      {
        question: 'Quais aeroportos da Costa Rica vocês atendem?',
        answer:
          'A Figa Travel faz embarques e desembarques no Aeroporto Internacional Juan Santamaría (SJO), em San José, e no Aeroporto de Guanacaste (LIR), em Liberia, conectando-os a La Fortuna, Arenal, Manuel Antonio, Tamarindo, Papagayo, Puerto Viejo, San José e outros destinos da Costa Rica.',
      },
      {
        question: 'O que acontece se o meu voo atrasar?',
        answer:
          'Nada muda para você. A Figa Travel acompanha o seu voo e ajusta o horário de embarque se ele pousar antes ou depois, e todo traslado de aeroporto inclui 60 minutos de espera de cortesia após o pouso, sem custo extra.',
      },
      {
        question: 'Em quais regiões da Costa Rica a Figa Travel oferece transporte?',
        answer:
          'A Figa Travel atende toda a Costa Rica a partir da sua base em La Fortuna (Arenal). Os trajetos mais procurados incluem San José, o aeroporto SJO, La Fortuna e o Vulcão Arenal, Manuel Antonio, Tamarindo, Papagayo e Puerto Viejo, no Caribe. Trajetos personalizados e roteiros com várias paradas estão disponíveis sob pedido.',
      },
      {
        question: 'Quanto tempo duram as viagens entre os destinos mais procurados da Costa Rica?',
        answer:
          'Tempos aproximados de traslado privado desde San José: La Fortuna / Arenal 3 horas, Manuel Antonio 3 horas e 30 minutos, Papagayo 4 horas e 30 minutos, Tamarindo 4 horas e 40 minutos e Puerto Viejo 4 horas e 45 minutos. Os tempos reais variam com o trânsito, o clima e as condições das estradas.',
      },
      {
        question: 'Que tipos de veículos vocês usam e quantos passageiros cabem?',
        answer:
          'A Figa Travel usa veículos recentes com ar-condicionado, de acordo com o tamanho do grupo: um SUV premium Toyota Land Cruiser Prado (1–3 passageiros), uma van Hyundai Staria (1–5), uma Toyota Hiace (1–6), uma Toyota Hiace Commuter (1–9) e um micro-ônibus Toyota Coaster (até 18 passageiros), todos com espaço para bagagem.',
      },
      {
        question: 'Os motoristas são licenciados e falam inglês?',
        answer:
          'Sim. Todos os motoristas da Figa Travel são locais, experientes e autorizados pelo Instituto Costarriquenho de Turismo (ICT) a operar transporte turístico, e falam inglês e espanhol.',
      },
      {
        question: 'O transporte privado na Costa Rica com a Figa Travel é seguro?',
        answer:
          'Sim. Todos os veículos têm seguro comercial de passageiros, cinto em cada assento e manutenção regular. Os motoristas são licenciados, conhecem as estradas de montanha e do litoral e dirigem em ritmo constante e cuidadoso. Cadeirinhas infantis estão disponíveis sob pedido.',
      },
      {
        question: 'Vocês oferecem transporte para grupos grandes, casamentos ou eventos?',
        answer:
          'Sim. A Figa Travel transporta famílias, grupos de turismo, casamentos, viagens corporativas e conferências, com vans para até 9 passageiros e um micro-ônibus Toyota Coaster para até 18 passageiros. Vários veículos podem ser combinados para grupos maiores.',
      },
      {
        question: 'Vocês oferecem cadeirinhas infantis ou transporte com animais de estimação?',
        answer:
          'Sim. Cadeirinhas para crianças e bebês estão disponíveis sob pedido, e a Figa Travel fará o possível para atender traslados com animais de estimação. Informe o pedido ao reservar para que o veículo e o equipamento certos estejam prontos.',
      },
      {
        question: 'Posso fazer paradas no caminho?',
        answer:
          'Sim. Como o traslado é privado, você pode pedir ao motorista paradas curtas, como um mirante, uma pausa para o banheiro ou um lanche rápido. Para roteiros planejados com várias paradas ou passeios de um dia, inclua as paradas ao reservar.',
      },
      {
        question: 'Posso alterar ou cancelar a minha reserva depois de confirmada?',
        answer:
          'Sim. Fale com a Figa Travel o quanto antes pelo WhatsApp, telefone ou e-mail com os dados da reserva, e a equipe atualizará a sua reserva conforme a disponibilidade. Alterações pedidas pouco antes do horário de embarque nem sempre são possíveis.',
      },
      {
        question: 'Com quanta antecedência devo reservar o meu traslado?',
        answer:
          'Recomendamos reservar com pelo menos alguns dias de antecedência, e mais cedo na alta temporada, de dezembro a abril, e em feriados. A Figa Travel também tenta ajudar com pedidos de última hora; envie uma mensagem à equipe pelo WhatsApp para verificar a disponibilidade.',
      },
      {
        question: 'O que está incluído em um traslado privado da Figa Travel?',
        answer:
          'Todo traslado privado inclui embarque de porta a porta no seu hotel, endereço ou aeroporto, um motorista bilíngue licenciado, um veículo segurado com ar-condicionado, água gelada a bordo, monitoramento de voos com 60 minutos de espera grátis nos embarques no aeroporto, e todos os pedágios, impostos e combustível.',
      },
    ],
    destinationFaq: {
      localQuestion: (name) => `Vocês oferecem traslados privados em ${name}?`,
      localAnswer: (name) =>
        `Sim. A Figa Travel oferece traslados privados locais em ${name}, incluindo embarques no Aeroporto Internacional Juan Santamaría (SJO), viagens de hotel a hotel e conexões de ${name} para todos os principais destinos da Costa Rica.`,
      durationQuestion: (name) => `Quanto tempo dura o traslado privado de San José até ${name}?`,
      durationAnswer: (name, duration) =>
        `Um traslado privado de San José até ${name} leva cerca de ${duration} com a Figa Travel Costa Rica, de porta a porta. O tempo real varia com o trânsito, o clima e as condições das estradas.`,
      bookQuestion: (name) => `Como reservo um transfer privado para ${name}?`,
      bookAnswer: (name) =>
        `Reserve o seu transfer privado para ${name} online em figatravelcr.com/book-online ou pelo WhatsApp (+506 7227 1058). A Figa Travel cobra um preço fixo por veículo, com pedágios, impostos e combustível incluídos, e os embarques no aeroporto incluem monitoramento do voo e 60 minutos de espera grátis.`,
      thingsQuestion: (name) => `O que fazer em ${name}?`,
      thingsAnswer: (name, attractions, bestFor) =>
        `Os destaques de ${name} incluem ${attractions}. Ideal para: ${bestFor}.`,
      bestTimeQuestion: (name) => `Qual é a melhor época para visitar ${name}?`,
    },
  },
}
