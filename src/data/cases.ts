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
  points?: string[];
}

export interface CaseTableRow {
  segment: string;
  cpl: string;
}

export interface CaseData {
  slug: string;
  breadcrumb: string;
  tags: string[];
  title: string;
  titleHighlight: string;
  lead: string;
  complexity?: string;
  heroIllustration: string;
  heroIllustrationClass: string;
  keyMetrics: CaseMetric[];
  
  solutionLead: string;
  solutionCards?: Array<{ title: string; desc: string }>;
  
  // Layout specific:
  layoutType: 'comparison' | 'conference' | 'funnel';
  
  // For comparison layout (Extern & Elba)
  comparisonCards?: {
    bad: CaseComparisonCard;
    good: CaseComparisonCard;
  };

  // For conference layout
  campaignCards?: CaseCampaignCard[];
  creativesImage?: string;
  creativesAlt?: string;
  resultsBanner?: {
    headline: string;
    subline: string;
  };
  tableRows?: CaseTableRow[];

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

  whatWorked: CaseWhatWorked[];
  
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
    breadcrumb: "Контур.Экстерн",
    tags: ["Telegram Ads", "Чат-боты", "Комьюнити бухгалтеров"],
    title: "Telegram Ads для Контур.Экстерн",
    titleHighlight: "Контур.Экстерн",
    lead: "Экстерн — основное B2B-комьюнити, на котором строится контентный прогрев бухгалтеров в продукты Контура. Нужно было снизить цену подписчика, поднять CTR и удержать поток на масштабе.",
    heroIllustration: "/assets/water-pistol.webp?v=3",
    heroIllustrationClass: "max-w-[280px] sm:max-w-[340px] md:max-w-[400px] -rotate-[12deg]",
    keyMetrics: [
      { value: "€3 → €2", label: "цена подписчика, минус 33%" },
      { value: "0,2% → 0,38%", label: "CTR вырос в 1,9 раза" },
      { value: "€1 000", label: "экономии на каждой тысяче подписчиков в месяц" },
    ],
    solutionLead: "Сформулировал методологию на трёх принципах. Все креативы и тесты дальше собирал под них.",
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
          "Тестировал системно: от трёх креативов на аудиторию, одинаковый бюджет, отдельно по каждому каналу.",
        ],
      },
    },
    whatWorked: [
      {
        title: "Доработка вместо переделки",
        desc: "Добавил правильный визуал к тексту, который уже подтверждал конверсию.",
      },
      {
        title: "Узнавание в первой строке",
        desc: "Визуал и заголовок попадают в конкретную боль бухгалтера (поиск работы, страх перед законодательством, рутина отчётности).",
      },
      {
        title: "Реклама, канал и контент без обмана",
        desc: "Человек получает в постах то, что обещано в оффере. Это удерживает новых подписчиков и снижает отток.",
      },
      {
        title: "Подписка через бота с лид-магнитом",
        desc: "Человек сразу получает обещанное: это даёт доверие и держит отток минимальным.",
      },
    ],
    nextCase: {
      slug: "conference",
      metricMain: "114%",
      title: "плана по регистрациям на конференцию для бухгалтеров, CPL на 30% ниже плана",
      tags: "VK лид-формы и Яндекс Директ",
    },
  },

  // 2. Онлайн-конференция
  {
    slug: "conference",
    breadcrumb: "Онлайн-конференция",
    tags: ["VK лид-формы", "Яндекс Директ", "B2B для бухгалтеров"],
    title: "Продвижение онлайн-конференции для бухгалтеров",
    titleHighlight: "онлайн-конференции",
    lead: "Задача — привлечь регистрации главных бухгалтеров, бухгалтеров и руководителей на двухдневную онлайн-конференцию через платные каналы. Часть аудитории — не клиенты Контура: важно было набрать качественный холодный трафик для прогрева в продуктовый сплит (Экстерн, Диадок, КЭДО, НДС+ и др.).",
    complexity: "Узкая B2B-ниша, конкуренция за внимание бухгалтерской аудитории и активный инфошум вокруг налоговой реформы 2026.",
    heroIllustration: "/assets/hands-keyboard.webp?v=3",
    heroIllustrationClass: "max-w-[340px] sm:max-w-[420px] md:max-w-[480px] -rotate-[3deg]",
    keyMetrics: [
      { value: "114%", label: "выполнение плана по регистрациям" },
      { value: "−30%", label: "средний CPL ниже планового" },
      { value: "8 → 4", label: "отобрано лучших сегментов ЦА" },
    ],
    solutionLead: "Сфокусировался на двух каналах с контекстным таргетингом: VK лид-формы и Яндекс Директ. Через них можно поймать тех, кто сейчас ищет ответы про изменения в законодательстве.",
    layoutType: "conference",
    campaignCards: [
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
    creativesImage: "/assets/conf-creatives.webp",
    creativesAlt: "Креативы объявлений VK лид-форм и Яндекс Директа для бухгалтерской конференции",
    resultsBanner: {
      headline: "План по регистрациям выполнен на 114%",
      subline: "Средний CPL — на 30% ниже планового",
    },
    tableRows: [
      { segment: "Директ. Автотаргетинг по запросам про отчётность", cpl: "159 ₽" },
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
    nextCase: {
      slug: "elba",
      metricMain: "−26%",
      title: "к цене подписчика для канала предпринимателей Контур.Эльба",
      tags: "Telegram Ads и ИП на УСН и патенте",
    },
  },

  // 3. Контур.Эльба (Telegram Ads)
  {
    slug: "elba",
    breadcrumb: "Контур.Эльба",
    tags: ["Telegram Ads", "ИП на УСН и патенте", "B2B-комьюнити"],
    title: "Telegram Ads для канала Контур.Эльба",
    titleHighlight: "Контур.Эльба",
    lead: "Задача — стабильно привлекать предпринимателей на УСН и патенте в канал «Эльба, бизнес и закон». Сохранять низкую стоимость подписчика и удерживать CTR при росте объёмов трафика.",
    complexity: "Узкая ниша малого бизнеса. Конкуренция с инфо-каналами про налоги и постоянно обновляющаяся повестка по изменениям для ИП.",
    heroIllustration: "/assets/rainbow.webp?v=3",
    heroIllustrationClass: "max-w-[320px] sm:max-w-[400px] md:max-w-[460px] -rotate-[4deg]",
    keyMetrics: [
      { value: "€3,66 → €2,7", label: "цена подписчика, минус 26%" },
      { value: "0,34% → 0,43%", label: "CTR вырос в 1,3 раза" },
      { value: "€960", label: "экономии на каждые 1 000 подписчиков в месяц" },
    ],
    solutionLead: "Системные тесты форматов на одинаковом бюджете и одинаковой аудитории. Главная гипотеза в том, что точное попадание в ценность канала важнее визуальной формы.",
    solutionCards: [
      {
        title: "Чёткая ценность",
        desc: "Первая строка креатива сразу отвечает на вопрос предпринимателя, зачем подписываться на канал.",
      },
      {
        title: "Равные условия тестов",
        desc: "Каждый формат и визуал проверялся на одинаковом бюджете и одной аудитории.",
      },
      {
        title: "Смысл важнее формы",
        desc: "Простой статичный макет выигрывает у сложного продакшна, если оффер понятен за секунду.",
      },
    ],
    layoutType: "comparison",
    comparisonCards: {
      good: {
        badge: "рабочий подход",
        badgeType: "lime",
        image: "/assets/elba-win.webp",
        imageAlt: "Статичный креатив Контур.Эльба",
        metrics: [
          { value: "€2,7", label: "средний CPF", highlight: true },
          { value: "0,43%", label: "средний CTR", highlight: true },
        ],
        paragraphs: [
          "Статичный визуал с понятным заголовком про новости для ИП и узнаваемый бренд Контур.Эльба.",
          "Первая строка сразу отвечала на вопрос зачем подписываться.",
          "Тестировал по правилу: 3 креатива на канал, одинаковый бюджет, одинаковая аудитория.",
        ],
      },
      bad: {
        badge: "тест видео провалился",
        badgeType: "pink",
        image: "/assets/elba-fail.webp",
        imageAlt: "Видео-креатив Контур.Эльба из теста",
        metrics: [
          { value: "€3,66", label: "средний CPF" },
          { value: "0,34%", label: "средний CTR" },
        ],
        paragraphs: [
          "Видео с экспертом было ярким и эмоциональным, но не объясняло за секунду зачем подписываться.",
          "CPF вырос на треть, CTR просел почти на четверть.",
          "Этот результат стал главной гипотезой: формат не должен мешать смыслу. Откатился к рабочему статичному подходу и усилил его.",
        ],
      },
    },
    whatWorked: [
      {
        title: "Стартовый статичный визуал",
        desc: "Чёткая ценность в первой строке и узнаваемый бренд. Пользователь сразу понимал зачем подписываться.",
      },
      {
        title: "Формат вторичен, важна суть",
        desc: "Простой статичный креатив переиграл яркое видео, когда ценность ясна с первой секунды.",
      },
      {
        title: "Быстрый откат от проигрышной гипотезы",
        desc: "Видео ухудшило обе метрики. Не стал упираться и сразу вернулся к рабочему подходу.",
      },
      {
        title: "Системные тесты на одинаковом бюджете",
        desc: "Каждый формат проверял в равных условиях. Это сразу показало правильное направление.",
      },
      {
        title: "Провал стал рабочей гипотезой",
        desc: "Тест видеоформата дал ухудшение по обоим показателям в 1,3 раза (CTR 0,43% → 0,34%, CPF €2,7 → €3,66). Это подтвердило: визуал должен работать на смысл, а не наоборот.",
      },
    ],
    nextCase: {
      slug: "webinars",
      metricMain: "+23%",
      title: "выручки с вебинаров после пересборки воронки в чат-ботах",
      tags: "Чат-боты и B2B-вебинары",
    },
  },

  // 4. Вебинарная воронка Контур.Эльба
  {
    slug: "webinars",
    breadcrumb: "Вебинарная воронка",
    tags: ["Чат-боты", "Разметка источников", "B2B-вебинары"],
    title: "Перестройка вебинарной воронки Контур.Эльба",
    titleHighlight: "вебинарной воронки",
    lead: "Задача — поднять доходимость до вебинаров и выручку с направления. Понять, какие каналы приводят целевых пользователей, чтобы масштабировать рабочие.",
    complexity: "Воронка не размечена, источники трафика не видны. Цепочки короткие, без догрева и пост-коммуникации, часть механик приходилось перезапускать руками.",
    heroIllustration: "/assets/finger-sparkles.webp?v=3",
    heroIllustrationClass: "max-w-[220px] sm:max-w-[270px] md:max-w-[310px] rotate-[6deg]",
    keyMetrics: [
      { value: "+30%", label: "доходимость до вебинара" },
      { value: "+23%", label: "выручка с направления" },
      { value: "100%", label: "прозрачность источников трафика" },
    ],
    solutionLead: "Пересобрал две цепочки в ботах. Добавил разметку источников, догрев контентом, пост-коммуникацию и гибкую регистрацию в любой момент, даже после вебинара.",
    layoutType: "funnel",
    funnelCards: {
      before: {
        badge: "было",
        image: "/assets/webinars-before.webp",
        title: "Короткая цепочка, мало иллюстраций",
        desc: "Не виден источник и действия пользователя. Цепочку нужно перезапускать руками.",
      },
      after: {
        badge: "стало",
        image: "/assets/webinars-after.webp",
        title: "Последовательная цепочка с иллюстрациями",
        desc: "Теги на пользователей, видно источник и клики. Регистрация в любой момент, поздним даём бонус и запись.",
      },
    },
    resultsBanner: {
      headline: "Стало понятно, какие каналы приводят целевых пользователей",
      subline: "Рабочие связки масштабировал, выручка выросла на 23%",
    },
    whatWorked: [
      {
        title: "Разметка источников трафика",
        desc: "Видно, откуда идут целевые пользователи и что именно нужно масштабировать.",
      },
      {
        title: "Догрев и пост-коммуникация",
        desc: "После цепочки идут офферы и полезные материалы, растёт конверсия в продукт.",
      },
      {
        title: "Гибкая регистрация",
        desc: "Не теряем тех, кто пришёл поздно, ведём их дальше по воронке.",
      },
      {
        title: "Читаемая цепочка",
        desc: "Иллюстрации и понятная структура удерживают внимание и доводят до вебинара.",
      },
    ],
    nextCase: {
      slug: "kontur-extern",
      metricMain: "−33%",
      title: "к цене подписчика в Telegram Ads для канала Контур.Экстерн",
      tags: "Telegram Ads и комьюнити бухгалтеров",
    },
  },
];

export function getCaseBySlug(slug: string): CaseData {
  const normalized = slug.toLowerCase().trim();
  const found = casesList.find((c) => {
    if (c.slug === normalized) return true;
    if (normalized.includes('extern') && c.slug === 'kontur-extern') return true;
    if ((normalized.includes('conf') || normalized.includes('conference')) && c.slug === 'conference') return true;
    if (normalized.includes('elba') && !normalized.includes('webinar') && c.slug === 'elba') return true;
    if ((normalized.includes('webinar') || normalized.includes('funnel')) && c.slug === 'webinars') return true;
    return false;
  });
  return found || casesList[0];
}
