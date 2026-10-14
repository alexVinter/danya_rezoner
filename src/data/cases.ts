export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseItem {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  metrics: Array<{ value: string; label: string; hint?: string }>;
  whatWorked: string[];
  whatFailedText?: string;
  pdfUrl?: string;
  [key: string]: any;
}

export interface CaseWhatWorked {
  title: string;
  desc: string;
}

export interface CaseComparisonCard {
  badge: string;
  badgeType: 'lime' | 'pink';
  image: string;
  imageAlt: string;
  metrics: Array<{ value: string; label: string; highlight?: boolean }>;
  paragraphs: string[];
}

export interface CaseCampaignCard {
  title: string;
  desc: string;
}

export interface CaseTableRow {
  segment: string;
  cpl: string;
  highlight?: boolean;
}

export interface CaseCreativeCard {
  image: string;
  alt: string;
  ctr: string;
  highlight?: boolean;
}

export interface CaseData {
  slug: string;
  titleMeta: string; // for document.title
  descriptionMeta: string; // for meta description
  breadcrumb: string;
  tags: string[];
  title: string;
  titleHighlight: string;
  lead: string;
  heroIllustration: string;
  heroIllustrationClass: string;
  keyMetrics: CaseMetric[];
  metricsLayout?: 'three' | 'two' | 'elba'; // elba is 4/4/3
  
  // Solution section
  solutionParagraphs: string[];
  solutionCards?: Array<{ title: string; desc: string }>;
  solutionCardsPlacement?: 'inside' | 'below'; // 'inside' right column (extern) or 'below' full width (conference)
  
  // Layout specific:
  layoutType: 'comparison' | 'conference' | 'funnel' | 'creatives-figure' | 'gallery';
  
  // For comparison layout (Extern & Elba)
  comparisonCards?: {
    bad: CaseComparisonCard;
    good: CaseComparisonCard;
  };
  comparisonTitle?: string;
  comparisonConclusion?: string;

  // For conference layout
  mediaPair?: {
    title: string;
    left: { image: string; alt: string; caption?: string };
    right: { image: string; alt: string; caption?: string };
  };
  tableRows?: CaseTableRow[];
  tableTitle?: string;

  // For funnel layout (Webinars)
  funnelCards?: {
    before: {
      badge: string;
      image: string;
      title: string;
      desc: string;
    };
    after: {
      badge: string;
      image: string;
      title: string;
      desc: string;
    };
  };

  // For creatives-figure layout (HTML Academy Lead Magnet)
  creatives?: CaseCreativeCard[];
  figure?: {
    title: string;
    image: string;
    alt: string;
    caption: string;
  };

  // For gallery layout (HTML Academy Collab)
  gallery?: Array<{ image: string; alt: string }>;

  // What worked
  whatWorked?: CaseWhatWorked[];
  whatWorkedColumns?: 2 | 3;
  
  // Next case loop
  nextCase: {
    slug: string;
    metricMain: string;
    title: string;
    tags: string;
  };
}

export const casesList: CaseData[] = [
  // 1. Контур.Экстерн
  {
    slug: "kontur-extern",
    titleMeta: "Кейс: −33% к цене подписчика в Telegram Ads для Контур.Экстерн | Даниил Винтер",
    descriptionMeta: "Цена подписчика €3 → €2, CTR 0,2% → 0,38%. Креативы, которые бьют в боль, и подписка через бота с лид-магнитом.",
    breadcrumb: "Контур.Экстерн",
    tags: ["Telegram Ads", "Чат-боты", "Комьюнити бухгалтеров"],
    title: "Telegram Ads для Контур.Экстерн",
    titleHighlight: "Контур.Экстерн",
    lead: "Экстерн — основное B2B-комьюнити, на котором строится контентный прогрев бухгалтеров в продукты Контура. Нужно было снизить цену подписчика, поднять CTR и удержать поток на масштабе.",
    heroIllustration: "/assets/water-pistol.webp?v=4",
    heroIllustrationClass: "w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto object-contain -rotate-[12deg]",
    keyMetrics: [
      { value: "€3 → €2", label: "цена подписчика, минус 33%" },
      { value: "0,2% → 0,38%", label: "CTR вырос в 1,9 раза" },
      { value: "€1 000", label: "экономии на каждой тысяче подписчиков в месяц" },
    ],
    metricsLayout: 'three',
    solutionParagraphs: [
      "Сформулировал методологию на трёх принципах. Все креативы и тесты дальше собирал под них.",
    ],
    solutionCardsPlacement: 'inside',
    solutionCards: [
      {
        title: "Цепляющий визуал",
        desc: "Картинка бьёт в боль, а не просто красивая.",
      },
      {
        title: "Отстройка через боли",
        desc: "Бухгалтер узнаёт себя в первой строке: поиск работы, страх перед законодательством, рутина отчётности.",
      },
      {
        title: "Единый сюжет",
        desc: "В постах канала человек получает то, что обещала реклама. Поэтому он остаётся.",
      },
    ],
    layoutType: "comparison",
    comparisonCards: {
      bad: {
        badge: "было",
        badgeType: "pink",
        image: "/assets/extern-fail.webp",
        imageAlt: "Два креатива Контур.Экстерн из первого теста",
        metrics: [
          { value: "€7", label: "цена подписчика" },
          { value: "0,1%", label: "CTR" },
        ],
        paragraphs: [
          "Визуально насыщенные креативы без фокуса на боли аудитории уронили CTR до 0,1%, а цена подписчика выросла до €7.",
          "Этот провал стал главной гипотезой: визуал должен бить в боль, а не быть красивым.",
        ],
      },
      good: {
        badge: "стало",
        badgeType: "lime",
        image: "/assets/extern-win.webp",
        imageAlt: "Два креатива Контур.Экстерн после доработки",
        metrics: [
          { value: "€2", label: "цена подписчика", highlight: true },
          { value: "0,38%", label: "CTR", highlight: true },
        ],
        paragraphs: [
          "Вернулся к рабочим текстам и добавил визуал, который попадает в конкретные боли.",
          "Подключил две механики подписки: через пост с полезным контентом и через бота с лид-магнитом, где отток около 5%.",
        ],
      },
    },
    whatWorked: [
      {
        title: "Честные боли вместо обещаний",
        desc: "Креативы со страхами («что спросят на собеседовании», «как не ошибиться в отчёте») стабильно давали CTR выше 0,35%, пока глянец сливал бюджет.",
      },
      {
        title: "Подписка через бота",
        desc: "Бот выдавал полезный шаблон только после подписки на канал. Конверсия из клика в подписчика выросла на 40%, а отток остался на уровне 5%.",
      },
      {
        title: "Единая сюжетная линия",
        desc: "Когда пост в канале продолжает мысль из объявления, человек остаётся читать, а не закрывает Telegram через секунду.",
      },
    ],
    whatWorkedColumns: 2,
    nextCase: {
      slug: "accountants-conference",
      metricMain: "114%",
      title: "плана по регистрациям на конференцию для бухгалтеров, CPL на 30% ниже плана",
      tags: "VK лид-формы и Яндекс Директ",
    },
  },

  // 2. Онлайн-конференция для бухгалтеров
  {
    slug: "accountants-conference",
    titleMeta: "Кейс: 114% плана регистраций на конференцию для бухгалтеров | Даниил Винтер",
    descriptionMeta: "VK лид-формы и Яндекс Директ: 114% плана по регистрациям, средний CPL на 30% ниже планового.",
    breadcrumb: "Онлайн-конференция",
    tags: ["VK лид-формы", "Яндекс Директ", "B2B для бухгалтеров"],
    title: "Продвижение онлайн-конференции для бухгалтеров",
    titleHighlight: "онлайн-конференции",
    lead: "Задача — привлечь регистрации главных бухгалтеров, бухгалтеров и руководителей на двухдневную онлайн-конференцию через платные каналы. Часть аудитории — не клиенты Контура: важно было набрать качественный холодный трафик для прогрева в продуктовый сплит (Экстерн, Диадок, КЭДО, НДС+ и др.).",
    heroIllustration: "/assets/star.webp?v=4",
    heroIllustrationClass: "w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto object-contain rotate-[5deg]",
    keyMetrics: [
      { value: "114%", label: "выполнение плана по регистрациям" },
      { value: "−30%", label: "средний CPL ниже планового" },
      { value: "8 → 4", label: "отобрано лучших сегментов ЦА" },
    ],
    metricsLayout: 'three',
    solutionParagraphs: [
      "Сфокусировался на двух каналах с контекстным таргетингом: VK лид-формы и Яндекс Директ. Через них можно поймать тех, кто сейчас ищет ответы про изменения в законодательстве.",
    ],
    solutionCardsPlacement: 'below',
    solutionCards: [
      {
        title: "ВК лид-формы",
        desc: "Протестировал 8 сегментов ЦА, отобрал 4 с лучшим CPL: ключевые запросы по бухгалтерской тематике, сообщества бухгалтеров + интересы, вакансии в бухгалтерии + интересы, ретаргетинг на подписчиков мероприятия ВК.",
      },
      {
        title: "Яндекс Директ",
        desc: "Запустил кампании на ключи по отчётности и налоговым изменениям, отдельно — автотаргетинг и ретаргетинг на посетителей сайта без регистрации. Поймал всплеск запросов по теме налоговой реформы.",
      },
      {
        title: "Перепридумал слабую часть воронки",
        desc: "Подписка на ВК-мероприятие давала низкую конверсию в регистрацию — собранную там аудиторию увёл в ретаргетинг лид-формы. CPL канала упал кратно, сегмент стал рабочим.",
      },
    ],
    layoutType: "conference",
    mediaPair: {
      title: "Как это выглядело ВКонтакте",
      left: {
        image: "/assets/conf-ad.webp",
        alt: "Объявление в ленте ВКонтакте: контекстный таргетинг по ключевым запросам бухгалтеров",
        caption: "Объявление в ленте: контекстный таргетинг по ключевым запросам",
      },
      right: {
        image: "/assets/conf-flow.webp",
        alt: "Лид-форма с предзаполненными данными пользователя",
        caption: "Лид-форма: имя и телефон подтягиваются из профиля автоматически",
      },
    },
    tableTitle: "CPL по сегментам",
    tableRows: [
      { segment: "Директ. Автотаргетинг по запросам про отчётность", cpl: "159 ₽", highlight: true },
      { segment: "Директ. Ретаргетинг на посетителей сайта", cpl: "213 ₽" },
      { segment: "ВК лид-форма. Вакансии бух и интересы", cpl: "410 ₽" },
      { segment: "ВК лид-форма. Ключевые запросы", cpl: "518 ₽" },
      { segment: "ВК лид-форма. Ретаргетинг на подписчиков мероприятия", cpl: "577 ₽" },
    ],
    whatWorked: [
      {
        title: "Связка ВК и Директа под инфоповод",
        desc: "Связка «ключевые запросы в ВК лид-формах + автотаргетинг в Директе» закрыла бОльшую часть плана: пользователи искали ответы по налоговой реформе — попали в нужный момент с нужным предложением.",
      },
      {
        title: "Ретаргетинг на лид-формы",
        desc: "Ретаргетинг лид-формы на подписчиков ВК-мероприятия закрыл слабую конверсию в подписной части воронки и кратно снизил CPL.",
      },
      {
        title: "Быстрый отсев 8 сегментов в ВК",
        desc: "Тестирование 8 сегментов в ВК позволило быстро отсечь неэффективные аудитории и масштабировать рабочие связки.",
      },
    ],
    whatWorkedColumns: 3,
    nextCase: {
      slug: "kontur-elba",
      metricMain: "−26%",
      title: "к цене подписчика для канала Контур.Эльба",
      tags: "Telegram Ads и ИП на УСН и патенте",
    },
  },

  // 3. Контур.Эльба (Telegram Ads)
  {
    slug: "kontur-elba",
    titleMeta: "Кейс: −26% к цене подписчика в Telegram Ads для Контур.Эльба | Даниил Винтер",
    descriptionMeta: "Цена подписчика €3,66 → €2,7, CTR 0,34% → 0,43%. Статичный креатив против видео на одинаковом бюджете.",
    breadcrumb: "Контур.Эльба",
    tags: ["Telegram Ads", "ИП на УСН и патенте", "B2B-комьюнити"],
    title: "Telegram Ads для канала Контур.Эльба",
    titleHighlight: "Контур.Эльба",
    lead: "Задача — стабильно привлекать предпринимателей на УСН и патенте в канал «Эльба, бизнес и закон». Сохранять низкую стоимость подписчика и удерживать CTR при росте объёмов трафика.",
    heroIllustration: "/assets/cactus.webp?v=4",
    heroIllustrationClass: "w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] h-auto object-contain -rotate-[4deg]",
    keyMetrics: [
      { value: "€3,66 → €2,7", label: "цена подписчика, минус 26%" },
      { value: "0,34% → 0,43%", label: "CTR вырос в 1,3 раза" },
      { value: "€960", label: "экономии на каждые 1 000 подписчиков в месяц" },
    ],
    metricsLayout: 'elba', // columns 4/4/3
    solutionParagraphs: [
      "Системные тесты форматов на одинаковом бюджете и одинаковой аудитории. Главная гипотеза в том, что точное попадание в ценность канала важнее визуальной формы.",
    ],
    layoutType: "comparison",
    comparisonTitle: "Статика против видео",
    comparisonCards: {
      good: {
        badge: "сработало",
        badgeType: "lime",
        image: "/assets/elba-static.webp",
        imageAlt: "Статичный креатив Контур.Эльба",
        metrics: [
          { value: "€2,7", label: "средний CPF", highlight: true },
          { value: "0,43%", label: "средний CTR", highlight: true },
        ],
        paragraphs: [
          "Простой статичный креатив без лишних анимаций. Чёткий оффер бьёт в главную боль предпринимателя.",
          "Показал лучший результат на всей дистанции теста.",
        ],
      },
      bad: {
        badge: "провал",
        badgeType: "pink",
        image: "/assets/elba-video.webp",
        imageAlt: "Видеокреатив Контур.Эльба",
        metrics: [
          { value: "€3,66", label: "средний CPF" },
          { value: "0,34%", label: "средний CTR" },
        ],
        paragraphs: [
          "Видеоформат требовал больше времени на просмотр, динамика рассеивала внимание.",
          "В итоге показатели ухудшились в 1,3 раза: подписчик вышел дороже, а CTR упал.",
        ],
      },
    },
    comparisonConclusion: "Вывод: в B2B простота и ясность важнее дорогого продакшна. Если ценность понятна за секунду, статика побеждает видео.",
    whatWorked: [
      {
        title: "Смысл важнее формы",
        desc: "Простой статичный макет с понятным оффером выиграл у сложного видеоформата по всем метрикам.",
      },
      {
        title: "Равные условия тестов",
        desc: "Каждый креатив тестировался на одинаковом бюджете и на одной и той же аудитории, что исключило фактор случайности.",
      },
      {
        title: "Провал стал рабочей гипотезой",
        desc: "Тест видеоформата дал ухудшение по обоим показателям в 1,3 раза. Это подтвердило: визуал должен работать на смысл, а не наоборот.",
      },
    ],
    whatWorkedColumns: 2,
    nextCase: {
      slug: "elba-webinars",
      metricMain: "+23%",
      title: "выручки с вебинаров Контур.Эльбы после пересборки воронки в ботах",
      tags: "Чат-боты и B2B-вебинары",
    },
  },

  // 4. Вебинарная воронка Контур.Эльба
  {
    slug: "elba-webinars",
    titleMeta: "Кейс: +23% выручки с вебинаров Контур.Эльба | Даниил Винтер",
    descriptionMeta: "Пересобрал вебинарную воронку в ботах: +30% к доходимости до вебинара и +23% к выручке направления.",
    breadcrumb: "Вебинарная воронка",
    tags: ["Чат-боты", "Разметка источников", "B2B-вебинары"],
    title: "Перестройка вебинарной воронки Контур.Эльба",
    titleHighlight: "вебинарной воронки",
    lead: "Задача — поднять доходимость до вебинаров и выручку с направления. Понять, какие каналы приводят целевых пользователей, чтобы масштабировать рабочие.",
    heroIllustration: "/assets/seaweed.webp?v=4",
    heroIllustrationClass: "w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto object-contain rotate-[3deg]",
    keyMetrics: [
      { value: "+30%", label: "доходимость до вебинара" },
      { value: "+23%", label: "выручка с направления" },
    ],
    metricsLayout: 'two',
    solutionParagraphs: [
      "Пересобрал две цепочки в ботах. Добавил разметку источников, догрев контентом, пост-коммуникацию и гибкую регистрацию в любой момент, даже после вебинара.",
    ],
    layoutType: "funnel",
    funnelCards: {
      before: {
        badge: "было",
        image: "/assets/webinar-before.webp",
        title: "Короткая цепочка, мало иллюстраций",
        desc: "Не виден источник и действия пользователя. Цепочку нужно перезапускать руками.",
      },
      after: {
        badge: "стало",
        image: "/assets/webinar-after.webp",
        title: "Последовательная цепочка с иллюстрациями",
        desc: "Добавил догрев, пост-коммуникацию и гибкую регистрацию в любой момент. Сквозная разметка источников.",
      },
    },
    whatWorked: [
      {
        title: "Разметка источников",
        desc: "Сквозная разметка позволила увидеть, какие каналы приводят платящих участников, а какие — пустой трафик.",
      },
      {
        title: "Контентный догрев",
        desc: "Серия полезных сообщений с иллюстрациями перед вебинаром подняла доходимость на 30%.",
      },
      {
        title: "Пост-коммуникация",
        desc: "Материалы и офферы после вебинара помогли дожать сомневающихся и подняли общую выручку на 23%.",
      },
    ],
    whatWorkedColumns: 2,
    nextCase: {
      slug: "html-academy-lead-magnet",
      metricMain: "40 ₽",
      title: "за пользователя в чат-боте ВКонтакте для HTML Academy",
      tags: "Платный трафик и EdTech, 2022",
    },
  },

  // 5. Лид-магнит для HTML Academy
  {
    slug: "html-academy-lead-magnet",
    titleMeta: "Кейс: лид-магнит и чат-бот для HTML Academy | Даниил Винтер",
    descriptionMeta: "2 500 человек в чат-боте ВКонтакте по 40 ₽ за пользователя и ROMI 300% за первый месяц. 2022 год.",
    breadcrumb: "Лид-магнит HTML Academy",
    tags: ["Платный трафик", "Чат-бот ВКонтакте", "EdTech", "2022"],
    title: "Лид-магнит для HTML Academy",
    titleHighlight: "HTML Academy",
    lead: "Задача была поднять продажи через платный трафик и контент-маркетинг в соцсетях.",
    heroIllustration: "/assets/hand3.webp?v=4",
    heroIllustrationClass: "w-full max-w-[260px] sm:max-w-[300px] h-auto object-contain -rotate-[6deg]",
    keyMetrics: [
      { value: "2 500", label: "человек пришли в чат-бота" },
      { value: "40 ₽", label: "за пользователя" },
      { value: "300%", label: "ROMI за первый месяц" },
    ],
    metricsLayout: 'three',
    solutionParagraphs: [
      "Вместе с командой разработал лид-магнит: карту компетенций для начинающего веб-разработчика. И продумали дальнейшую воронку из писем.",
      "Раздавать лид-магнит и собирать контакты решил через чат-бота ВКонтакте: так людей можно и дальше догревать контентом.",
    ],
    layoutType: "creatives-figure",
    creatives: [
      {
        image: "/assets/html-cr-map.webp",
        alt: "Креатив HTML Academy: «Карта для фронтендеров, которые хотят развиваться»",
        ctr: "1,7%",
        highlight: true,
      },
      {
        image: "/assets/html-cr-cat.webp",
        alt: "Креатив HTML Academy: кот в очках и «Карта компетенций для начинающего фронтендера»",
        ctr: "1,2%",
      },
      {
        image: "/assets/html-cr-mail.webp",
        alt: "Креатив HTML Academy: «Бесплатная рассылка для тех, кто хочет в IT»",
        ctr: "1,2%",
      },
    ],
    figure: {
      title: "Часть логики рассылки",
      image: "/assets/html-mail-flow.webp",
      alt: "Схема рассылки в чат-боте: проверка подписки на сообщество, выдача карты, напоминания и таймер",
      caption: "Потом лид-магнит и рассылку стали использовать для всех новых подписчиков сообщества. Их прогревали к покупке контентом и анонсами распродаж, и это тоже приносило прибыль.",
    },
    nextCase: {
      slug: "html-academy-collab",
      metricMain: "146%",
      title: "ROMI коллаборации с блогером для HTML Academy",
      tags: "400 000 охвата, 2022",
    },
  },

  // 6. Коллаборация с блогером для HTML Academy
  {
    slug: "html-academy-collab",
    titleMeta: "Кейс: коллаборация с блогером для HTML Academy | Даниил Винтер",
    descriptionMeta: "Охват 400 000 и ROMI 146% за счёт коллаборации с блогером. 2022 год.",
    breadcrumb: "Коллаборация для HTML Academy",
    tags: ["Коллаборация с блогером", "EdTech", "2022"],
    title: "Коллаборация с блогером для HTML Academy",
    titleHighlight: "HTML Academy",
    lead: "Задача была поднять узнаваемость бренда и привести новых людей на сайт профессии «Фронтенд-разработчик».",
    heroIllustration: "/assets/rainbow.webp?v=4",
    heroIllustrationClass: "w-full max-w-[280px] sm:max-w-[340px] md:max-w-[440px] h-auto object-contain",
    keyMetrics: [
      { value: "400 000", label: "охват за счёт коллаборации" },
      { value: "146%", label: "ROMI" },
    ],
    metricsLayout: 'two',
    solutionParagraphs: [
      "Коллаборация закрывает обе задачи. Я нашёл подходящего блогера, договорились о размещениях и вместе подготовили материалы.",
      "Получилась серия карточек «не перепутай» про IT-понятия, которые часто путают, и пост с промокодом на 10 000 ₽ на профессию «Фронтенд-разработчик».",
    ],
    layoutType: "gallery",
    gallery: [
      { image: "/assets/sticker-jun.webp", alt: "Карточка: джун и ждун" },
      { image: "/assets/sticker-bug.webp", alt: "Карточка: баг и фича" },
      { image: "/assets/sticker-java.webp", alt: "Карточка: Java и JavaScript" },
      { image: "/assets/sticker-coder.webp", alt: "Карточка: программист и айтишник" },
      { image: "/assets/sticker-front.webp", alt: "Карточка: фронтенд- и бэкенд-разработчик" },
      { image: "/assets/sticker-vpn.webp", alt: "Карточка: ВПН и прокси" },
      { image: "/assets/sticker-domain.webp", alt: "Карточка: домен и хостинг" },
      { image: "/assets/sticker-promo.webp", alt: "Карточка с промокодом: скидка 10 000 рублей на профессию «Фронтенд-разработчик»" },
    ],
    nextCase: {
      slug: "kontur-extern",
      metricMain: "−33%",
      title: "к цене подписчика для канала Контур.Экстерн",
      tags: "Telegram Ads и чат-боты",
    },
  },
];
