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

export interface CaseCampaignCard {
  title: string;
  desc: string;
}

export interface CaseTableRow {
  segment: string;
  cpl: string;
  highlight?: boolean;
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

export interface CaseCreativeCard {
  image: string;
  alt: string;
  ctr: string;
  highlight?: boolean;
}

export interface CaseDoneResult {
  done: {
    title: string;
    items: string[];
  };
  result: {
    title: string;
    items: string[];
  };
  conclusion: string;
}

export interface CaseStats {
  title: string;
  image: {
    file: string;
    width: number;
    height: number;
    displayWidth: number;
    mobileWidth: number;
    alt: string;
  };
  caption: string;
}

export interface CaseNext {
  slug: string;
  number: string;
  title: string;
  text: string;
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
  metricsLayout?: 'three' | 'two' | 'elba';

  // Solution section (if present)
  solutionTitle?: string;
  solutionParagraphs?: string[];
  solutionList?: string[];
  solutionCards?: Array<{ title: string; desc: string }>;
  solutionCardsPlacement?: 'inside' | 'below';

  layoutType?: 'comparison' | 'creatives-figure' | 'gallery' | 'done-result-stats';

  // For comparison layout (Extern & Elba)
  comparisonCards?: {
    bad: CaseComparisonCard;
    good: CaseComparisonCard;
  };
  comparisonTitle?: string;
  comparisonConclusion?: string;

  // For creatives-figure layout (HTML Academy Lead Magnet)
  creatives?: CaseCreativeCard[];
  figure?: {
    title: string;
    image: string;
    alt: string;
    caption: string;
    subheading?: string;
    sublist?: string[];
  };

  // For gallery layout (HTML Academy Collab)
  gallery?: Array<{ image: string; alt: string }>;

  // For 3 new cases
  doneResult?: CaseDoneResult;
  stats?: CaseStats;

  // What worked
  whatWorked?: CaseWhatWorked[];
  whatWorkedColumns?: 2 | 3;

  // Next case
  nextCase: CaseNext;
}

export const casesList: CaseData[] = [
  // 1. Контур.Экстерн
  {
    slug: 'kontur-extern',
    titleMeta: 'Кейс: −33% к цене подписчика в Telegram Ads для Контур.Экстерн | Даниил Винтер',
    descriptionMeta: 'Цена подписчика €3 → €2, CTR 0,2% → 0,38%. Креативы, которые бьют в боль, и подписка через бота с лид-магнитом.',
    breadcrumb: 'Контур.Экстерн',
    tags: ['Telegram Ads', 'Чат-боты', 'Бухгалтерия'],
    title: '−33% к цене подписчика в Telegram Ads для канала',
    titleHighlight: 'Контур.Экстерн',
    lead: 'Задача: снизить стоимость привлечения подписчиков в профессиональное комьюнити бухгалтеров и поднять конверсию из клика в подписку.',
    heroIllustration: '/assets/water-pistol.webp?v=4',
    heroIllustrationClass: 'w-full max-w-[340px] md:max-w-[420px] -rotate-[12deg]',
    keyMetrics: [
      { value: '€3 → €2', label: 'цена подписчика' },
      { value: '0,2% → 0,38%', label: 'CTR в Telegram Ads' },
      { value: 'около 5%', label: 'отток после подписки через бота с лид-магнитом' },
    ],
    metricsLayout: 'three',
    solutionTitle: 'Решение',
    solutionParagraphs: [
      'Стандартные креативы «Подпишитесь на полезный канал для бухгалтеров» давали клики по €0,6–0,8 и редкие подписки. Бухгалтеры — скептичная аудитория, им нужен сильный повод подписаться.',
      'Мы полностью пересобрали подачу: перестали продавать канал в лоб и стали бить в профессиональные боли и изменения в законах.',
    ],
    solutionCardsPlacement: 'inside',
    solutionCards: [
      {
        title: 'Боль вместо пользы',
        desc: 'Заменили общие фразы на конкретные триггеры: штрафы налоговой, ошибки в отчётности, новые правила ФНС.',
      },
      {
        title: 'Бот с лид-магнитом',
        desc: 'Вместо ссылки на канал вели в бота, который выдавал шпаргалку по отчётности только после проверки подписки.',
      },
    ],
    layoutType: 'comparison',
    comparisonTitle: 'Креативы: было и стало',
    comparisonCards: {
      bad: {
        badge: 'Было',
        badgeType: 'pink',
        image: '/assets/extern-ad-bad.webp?v=4',
        imageAlt: 'Старый креатив Контур.Экстерна',
        metrics: [
          { value: '€3', label: 'цена подписчика' },
          { value: '0,2%', label: 'CTR' },
        ],
        paragraphs: [
          'Стандартный текст про новости и статьи. Никакого крючка для читателя: канал воспринимается как очередная корпоративная лента.',
        ],
      },
      good: {
        badge: 'Стало',
        badgeType: 'lime',
        image: '/assets/extern-ad-good.webp?v=4',
        imageAlt: 'Новый креатив Контур.Экстерна',
        metrics: [
          { value: '€2', label: 'цена подписчика', highlight: true },
          { value: '0,38%', label: 'CTR', highlight: true },
        ],
        paragraphs: [
          'Заголовок бьёт в страх ошибки при сдаче отчёта. Картинка иллюстрирует конкретную боль, а в тексте — решение через полезный материал в боте.',
        ],
      },
    },
    comparisonConclusion: 'Смена фокуса с «полезного контента» на решение острой проблемы сбила цену подписчика на треть и удвоила кликабельность объявлений.',
    whatWorkedColumns: 3,
    whatWorked: [
      {
        title: 'Шпаргалки и чеклисты',
        desc: 'Лид-магнит должен экономить время здесь и сейчас. Бухгалтеры охотно подписывались ради готовых таблиц со сроками отчётности.',
      },
      {
        title: 'Проверка подписки ботом',
        desc: 'Бот не отдавал файл, пока пользователь не подписался на канал. Конверсия из клика по объявлению в подписку выросла до 45%.',
      },
      {
        title: 'Таргетинг на каналы 1С',
        desc: 'Лучшие результаты дали каналы вокруг программных продуктов, которыми бухгалтеры пользуются каждый день на работе.',
      },
    ],
    nextCase: {
      slug: 'b2b-service',
      number: '×2',
      title: 'регистраций в B2B-сервисе вслед за ростом канала',
      text: '3 861 подписчик по €2,9 в Telegram Ads',
    },
  },

  // 2. B2B-сервис
  {
    slug: 'b2b-service',
    titleMeta: 'Кейс: ×2 регистраций в B2B-сервисе через Telegram Ads | Даниил Винтер',
    descriptionMeta: '3 861 подписчик в канал по €2,9 в среднем, регистрации в сервисе выросли в 2 раза.',
    breadcrumb: 'B2B-сервис',
    tags: ['Telegram Ads', 'B2B-сервис', '2026'],
    title: 'Telegram Ads для',
    titleHighlight: 'B2B-сервиса',
    lead: 'Задача: привести целевую аудиторию в канал и поднять регистрации в сервисе.',
    heroIllustration: '/assets/star.webp',
    heroIllustrationClass: 'w-full max-w-[280px] rotate-[8deg]',
    keyMetrics: [
      { value: '3 861', label: 'подписчик в канал' },
      { value: '€2,9', label: 'средняя цена подписчика, для ниши это дёшево' },
      { value: '×2', label: 'регистраций в сервисе вслед за аудиторией' },
    ],
    metricsLayout: 'three',
    layoutType: 'done-result-stats',
    doneResult: {
      done: {
        title: 'Что делал',
        items: [
          'Вёл проект целиком и прорабатывал каждый этап по структуре',
          'Ставил ТЗ на креативы и работал с креаторами',
        ],
      },
      result: {
        title: 'Результат',
        items: [
          'Цена держалась ровно по всем кампаниям: от €2,7 до €3,5',
          'Открутил €11 344',
          'Регистрации в сервисе выросли в 2 раза',
        ],
      },
      conclusion: 'Аудитория выросла, и регистрации в сервисе удвоились. Для B2B это и есть результат: люди из канала доходят до продукта.',
    },
    stats: {
      title: 'Статистика из кабинета',
      image: {
        file: '/assets/b2b-stats.webp',
        width: 1264,
        height: 792,
        displayWidth: 720,
        mobileWidth: 640,
        alt: 'Статистика семи кампаний в Telegram Ads: 3 861 подписка, расход €11 344',
      },
      caption: 'Кампании в Telegram Ads: подписки, CTR, конверсия, CPM, цена клика, цена подписчика и расход.',
    },
    nextCase: {
      slug: 'online-school',
      number: '300%',
      title: 'ROMI за 3 месяца у онлайн-школы',
      text: 'Запуск канала с нуля, 2 139 подписчиков по €1,86',
    },
  },

  // 3. Онлайн-школа
  {
    slug: 'online-school',
    titleMeta: 'Кейс: ROMI 300% за 3 месяца на запуске канала онлайн-школы | Даниил Винтер',
    descriptionMeta: 'Запустили канал онлайн-школы с нуля: 2 139 подписчиков по €1,86, реклама окупилась за 3 месяца.',
    breadcrumb: 'Онлайн-школа',
    tags: ['Telegram Ads', 'Онлайн-школа', '2026'],
    title: 'Запуск канала',
    titleHighlight: 'онлайн-школы',
    lead: 'Задача: запустить канал онлайн-школы, у которой до этого не было продвижения, и вывести рекламу в плюс.',
    heroIllustration: '/assets/seaweed.webp',
    heroIllustrationClass: 'w-full max-w-[360px]',
    keyMetrics: [
      { value: '2 139', label: 'подписчиков привлекли с нуля' },
      { value: '€1,86', label: 'средняя цена подписчика' },
      { value: '300%', label: 'ROMI за 3 месяца' },
    ],
    metricsLayout: 'three',
    layoutType: 'done-result-stats',
    doneResult: {
      done: {
        title: 'Что делал',
        items: [
          'Запустил продвижение канала с нуля и прорабатывал каждый этап по структуре',
          'Ставил ТЗ на креативы и работал с креаторами',
        ],
      },
      result: {
        title: 'Результат',
        items: [
          'Цена держалась ровно: от €1,77 до €1,92',
          'Реклама окупилась за 3 месяца',
          'Трафик доходит до покупки курса',
        ],
      },
      conclusion: 'Канал запустили с нуля, и уже за 3 месяца реклама окупилась с запасом.',
    },
    stats: {
      title: 'Статистика из кабинета',
      image: {
        file: '/assets/school-stats.webp',
        width: 1968,
        height: 658,
        displayWidth: 1100,
        mobileWidth: 760,
        alt: 'Статистика четырёх кампаний в Telegram Ads: 2 139 подписок, цена подписчика от €1,77 до €1,92',
      },
      caption: 'Кампании в Telegram Ads: подписки, CTR, конверсия, CPM, цена клика, цена подписчика и расход.',
    },
    nextCase: {
      slug: 'expert-b2b',
      number: '1 670',
      title: 'подписчиков в канал эксперта из узкой B2B-ниши',
      text: '€3 за подписчика, выросли заявки на консультации',
    },
  },

  // 4. Эксперт B2B
  {
    slug: 'expert-b2b',
    titleMeta: 'Кейс: 1 670 подписчиков в канал эксперта из узкой B2B-ниши | Даниил Винтер',
    descriptionMeta: '€3 за подписчика в Telegram Ads и заявки на консультации у эксперта в сложной B2B-тематике.',
    breadcrumb: 'Эксперт в B2B-нише',
    tags: ['Telegram Ads', 'Эксперт', 'B2B-ниша', '2026'],
    title: 'Канал эксперта в',
    titleHighlight: 'узкой B2B-нише',
    lead: 'Задача: привести релевантную аудиторию в канал эксперта в сложной узкой B2B-тематике и превратить её в заявки на консультации и продажи.',
    heroIllustration: '/assets/flower-2.webp',
    heroIllustrationClass: 'w-full max-w-[300px] -rotate-[6deg]',
    keyMetrics: [
      { value: '1 670', label: 'подписчиков в канал' },
      { value: '€3', label: 'за подписчика, адекватно для узкой B2B-ниши' },
      { value: '€5 000', label: 'рекламного бюджета' },
    ],
    metricsLayout: 'three',
    layoutType: 'done-result-stats',
    doneResult: {
      done: {
        title: 'Что делал',
        items: [
          'Вёл проект целиком и прорабатывал каждый этап по структуре',
          'Ставил ТЗ на креативы и работал с креаторами',
        ],
      },
      result: {
        title: 'Результат',
        items: [
          'Выросли запросы на личные консультации',
          'Пошли продажи продукта для узкой аудитории в нише',
        ],
      },
      conclusion: 'В узкой нише важен релевантный подписчик, который доходит до консультации и покупки. Так и вышло: аудитория превратилась в заявки и деньги эксперту.',
    },
    stats: {
      title: 'Статистика из кабинета',
      image: {
        file: '/assets/expert-stats.webp',
        width: 1322,
        height: 314,
        displayWidth: 760,
        mobileWidth: 680,
        alt: 'Статистика кампаний в Telegram Ads для канала эксперта',
      },
      caption: 'Кампании в Telegram Ads: подписки, CTR, конверсия, CPM, цена клика, цена подписчика и расход.',
    },
    nextCase: {
      slug: 'kontur-elba',
      number: '−26%',
      title: 'к цене подписчика для канала Контур.Эльба',
      text: 'Статичный креатив против видео в Telegram Ads',
    },
  },

  // 5. Контур.Эльба
  {
    slug: 'kontur-elba',
    titleMeta: 'Кейс: −26% к цене подписчика в Telegram Ads для Контур.Эльба | Даниил Винтер',
    descriptionMeta: 'Цена подписчика €3,66 → €2,7, CTR 0,34% → 0,43%. Статичный креатив против видео на одинаковом бюджете.',
    breadcrumb: 'Контур.Эльба',
    tags: ['Telegram Ads', 'A/B-тесты', 'Бухгалтерия'],
    title: '−26% к цене подписчика в Telegram Ads для канала',
    titleHighlight: 'Контур.Эльба',
    lead: 'Задача: протестировать видеокреативы против статики в Telegram Ads и найти связку с минимальной стоимостью подписчика для онлайн-бухгалтерии.',
    heroIllustration: '/assets/cloud.webp?v=4',
    heroIllustrationClass: 'w-full max-w-[340px] md:max-w-[420px] -rotate-[4deg]',
    keyMetrics: [
      { value: '€3,66 → €2,7', label: 'цена подписчика' },
      { value: '0,34% → 0,43%', label: 'CTR' },
      { value: '42%', label: 'конверсия из клика в подписку' },
    ],
    metricsLayout: 'elba',
    solutionTitle: 'Решение',
    solutionParagraphs: [
      'В нише онлайн-бухгалтерии для ИП высокая конкуренция за внимание предпринимателей. Стандартные объявления с текстовым баннером давали результат, но мы хотели проверить, сработает ли короткое динамическое видео лучше статики.',
      'Запустили A/B-тест на одинаковых сегментах аудитории и одинаковом бюджете: статичный баннер с четким оффером против 10-секундного видеоролика с анимацией интерфейса.',
    ],
    layoutType: 'comparison',
    comparisonTitle: 'A/B-тест: статика против видео',
    comparisonCards: {
      bad: {
        badge: 'Видео',
        badgeType: 'pink',
        image: '/assets/elba-video.webp?v=4',
        imageAlt: 'Видеокреатив Контур.Эльбы',
        metrics: [
          { value: '€3,66', label: 'цена подписчика' },
          { value: '0,34%', label: 'CTR' },
        ],
        paragraphs: [
          'Видео привлекало внимание, но отвлекало от главного действия. Пользователи залипали на ролик, но реже переходили в сам канал.',
        ],
      },
      good: {
        badge: 'Статика',
        badgeType: 'lime',
        image: '/assets/elba-static.webp?v=4',
        imageAlt: 'Статичный баннер Контур.Эльбы',
        metrics: [
          { value: '€2,7', label: 'цена подписчика', highlight: true },
          { value: '0,43%', label: 'CTR', highlight: true },
        ],
        paragraphs: [
          'Простой статичный баннер с крупным текстом о налогах для ИП сразу бил в цель: человек за секунду считывал выгоду и подписывался.',
        ],
      },
    },
    comparisonConclusion: 'Статичный креатив победил с отрывом в 26% по цене подписчика: в деловых B2B-тематиках четкость и простота выигрывают у анимации.',
    whatWorkedColumns: 2,
    whatWorked: [
      {
        title: 'Короткий заголовок с цифрами',
        desc: 'Конкретные суммы налогов и сроки сдачи отчетов привлекали именно действующих предпринимателей, а не случайных людей.',
      },
      {
        title: 'Отключение широких каналов',
        desc: 'Убрали общебизнесовые каналы и сосредоточились на узких тематиках: маркетплейсы, розничная торговля и услуги.',
      },
    ],
    nextCase: {
      slug: 'html-academy-lead-magnet',
      number: '40 ₽',
      title: 'за пользователя в чат-боте ВКонтакте для HTML Academy',
      text: 'Лид-магнит и рассылка, ROMI 300% за первый месяц',
    },
  },

  // 6. Лид-магнит HTML Academy
  {
    slug: 'html-academy-lead-magnet',
    titleMeta: 'Кейс: лид-магнит и чат-бот для HTML Academy | Даниил Винтер',
    descriptionMeta: '2 500 человек в чат-боте ВКонтакте по 40₽ за пользователя и ROMI 300% за первый месяц.',
    breadcrumb: 'HTML Academy: лид-магнит',
    tags: ['Платный трафик', 'Чат-бот ВКонтакте', 'EdTech'],
    title: '2 500 человек в чат-бот ВКонтакте по 40 ₽ для',
    titleHighlight: 'HTML Academy',
    lead: 'Задача: привлечь начинающих разработчиков в воронку через полезный лид-магнит и окупить трафик продажами курсов.',
    heroIllustration: '/assets/paper-plane.webp?v=4',
    heroIllustrationClass: 'w-full max-w-[340px] md:max-w-[420px] rotate-[6deg]',
    keyMetrics: [
      { value: '2 500', label: 'человек в чат-боте ВКонтакте' },
      { value: '40 ₽', label: 'за контакт в базе' },
      { value: '300%', label: 'ROMI за первый месяц' },
    ],
    metricsLayout: 'three',
    solutionTitle: 'Что делал',
    solutionList: [
      'Вместе с командой разработал лид-магнит: карту компетенций для начинающего веб-разработчика',
      'Продумали дальнейшую воронку из писем',
      'Раздавал лид-магнит через чат-бота ВКонтакте: так собирали контакты и дальше догревали людей контентом',
    ],
    layoutType: 'creatives-figure',
    creatives: [
      {
        image: '/assets/html-ad-1.webp?v=4',
        alt: 'Объявление HTML Academy: карта компетенций',
        ctr: '3,8%',
        highlight: true,
      },
      {
        image: '/assets/html-ad-2.webp?v=4',
        alt: 'Объявление HTML Academy: с чего начать',
        ctr: '2,9%',
      },
      {
        image: '/assets/html-ad-3.webp?v=4',
        alt: 'Объявление HTML Academy: тест по фронтенду',
        ctr: '2,4%',
      },
    ],
    figure: {
      title: 'Часть логики рассылки',
      image: '/assets/html-flow.webp?v=4',
      alt: 'Схема цепочки сообщений в чат-боте HTML Academy',
      caption: 'Схема цепочки: выдача лид-магнита → тест уровня → полезный контент → спецпредложение на курс.',
      subheading: 'Что было дальше',
      sublist: [
        'Лид-магнит и рассылку стали использовать для всех новых подписчиков сообщества',
        'Их прогревали к покупке контентом и анонсами распродаж, это тоже приносило прибыль',
      ],
    },
    whatWorkedColumns: 2,
    whatWorked: [
      {
        title: 'Карта компетенций как лид-магнит',
        desc: 'Новички часто не знают, с чего начать и в каком порядке учить технологии. Наглядная карта сняла этот барьер.',
      },
      {
        title: 'Быстрый дожим первой покупкой',
        desc: 'Недорогой вводный интенсив за символические деньги переводил подписчика в статус покупателя уже в первые дни.',
      },
    ],
    nextCase: {
      slug: 'html-academy-collab',
      number: '146%',
      title: 'ROMI коллаборации с блогером для HTML Academy',
      text: 'охват 400 000',
    },
  },

  // 7. Коллаборация HTML Academy
  {
    slug: 'html-academy-collab',
    titleMeta: 'Кейс: коллаборация с блогером для HTML Academy | Даниил Винтер',
    descriptionMeta: 'Охват 400 000 и ROMI 146% за счёт коллаборации с блогером.',
    breadcrumb: 'HTML Academy: коллаборация',
    tags: ['Коллаборация с блогером', 'EdTech'],
    title: '400 000 охвата с коллаборации с блогером для',
    titleHighlight: 'HTML Academy',
    lead: 'Задача: найти профильного блогера, согласовать нативную интеграцию с пользой для аудитории и получить окупаемые заявки на профессию.',
    heroIllustration: '/assets/megaphone.webp?v=4',
    heroIllustrationClass: 'w-full max-w-[340px] md:max-w-[420px] -rotate-[6deg]',
    keyMetrics: [
      { value: '400 000', label: 'суммарный охват интеграции' },
      { value: '146%', label: 'ROMI проекта' },
      { value: '52', label: 'продажи профессии' },
    ],
    metricsLayout: 'three',
    solutionTitle: 'Что делал',
    solutionList: [
      'Нашёл подходящего блогера и договорился о размещениях',
      'Вместе с блогером продумывали идею, структуру и текст постов, сопровождал его до публикации',
      'Сделали серию карточек «не перепутай» про IT-понятия, которые часто путают',
      'Выпустили пост с промокодом на 10 000 ₽ на профессию «Фронтенд-разработчик»',
    ],
    layoutType: 'gallery',
    gallery: [
      { image: '/assets/collab-post-1.webp?v=4', alt: 'Пост-анонс коллаборации' },
      { image: '/assets/collab-post-2.webp?v=4', alt: 'Образовательные карточки от блогера' },
      { image: '/assets/collab-post-3.webp?v=4', alt: 'Пост с промокодом на обучение' },
    ],
    whatWorkedColumns: 2,
    whatWorked: [
      {
        title: 'Нативный формат карточек',
        desc: 'Вместо рекламного баннера сделали образовательный контент, который читатели сохраняли и пересылали друг другу.',
      },
      {
        title: 'Ограниченный промокод',
        desc: 'Промокод действовал только 3 дня после выхода публикации, что создало срочность и мотивировало быстро принять решение.',
      },
    ],
    nextCase: {
      slug: 'kontur-extern',
      number: '−33%',
      title: 'к цене подписчика для канала Контур.Экстерн',
      text: 'Telegram Ads и чат-боты',
    },
  },
];
