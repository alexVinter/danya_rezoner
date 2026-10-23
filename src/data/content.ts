// Centralized data file as specified in TZ-2

export interface SiteConfig {
  authorName: string;
  fullName: string;
  role: string;
  telegramPersonalUrl: string;
  telegramChannelUrl: string;
  channelName: string;
  email: string;
  legalInfo: string;
  brandSummary: string;
}

export const siteConfig: SiteConfig = {
  authorName: "Даниил Винтер",
  fullName: "Даниил Винтер",
  role: "Специалист по платному трафику",
  telegramPersonalUrl: "https://t.me/winter_daniil",
  telegramChannelUrl: "https://t.me/rezonerw",
  channelName: "«Резонёр»",
  email: "vinterdaniil@yandex.ru",
  legalInfo: "Самозанятый: договор и чеки через «Мой налог»",
  brandSummary: "Платный трафик в контент и воронки. Подписчики в каналы, системные тесты креативов и регистрации на мероприятия.\nДа и в целом любую креативную механику или посев могу реализовать.",
};

export interface AdSlot {
  enabled: boolean;
  showUntil: string;
  badge: string;
  title: string;
  titleMark: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
  label: string;
}

export const adSlot: AdSlot = {
  enabled: true,
  showUntil: "2026-12-31T23:59:59+03:00",
  badge: "До 31 декабря",
  title: "Три месяца, чтобы набрать базу в Telegram",
  titleMark: "Три месяца",
  text: "Запускаю промо в Telegram Ads и бонусом собираю воронку в боте",
  buttonText: "Обсудить",
  buttonUrl: "https://t.me/winter_daniil",
  label: "Реклама",
};

export interface ExperienceItem {
  period: string;
  place: string;
  role: string;
  metric: string;
}

export interface AboutFact {
  num: string;
  text: string;
}

export interface ActivityTile {
  title: string;
  desc: string;
  url?: string;
}

export const aboutData = {
  name: "Даниил Винтер",
  role: "Специалист по платному трафику",
  intro: "Веду трафик и контент, строю воронки, 6 лет работаю в маркетинге. Много запускаю и тестирую, поэтому знаю, как ведут себя разные площадки.",
  facts: [
    {
      num: "300 000+",
      text: "подписчиков привёл в каналы, рассылки и чат-боты на разных\nплощадках.",
    },
    {
      num: "10+",
      text: "рекламных площадок и форматов: от Telegram Ads и Директа\nдо посевов и блогеров",
    },
    {
      num: "€600 000+",
      text: "рекламного бюджета открутил\nсам в рамках всех каналов",
    },
    {
      num: "5 компаний",
      text: "где выстраивал системное продвижение",
    },
  ] as AboutFact[],
  tiles: [
    { title: "TgConf 2025", desc: "спикер" },
    { title: "Вебинары eLama", desc: "эксперт, смотреть запись", url: "https://youtu.be/GzoTAQOjH60" },
    { title: "ppc.world", desc: "автор колонок, читать статью", url: "https://ppc.world/articles/telegram-ads-v-b2b-kak-it-razrabotchik-privlekaet-professionalnuyu-auditoriyu/" },
    { title: "Канал «Резонёр»", desc: "читать в Telegram", url: "https://t.me/rezonerw" },
  ] as ActivityTile[],
  speakerUrl: "https://t.me/winter_daniil",
};

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  phrase: string;
  forWhom: string;
  whatsInside: string[];
  price: string;
  note: string;
  badge?: string;
  hasDetailsPage?: boolean;
  slug?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "audit",
    number: "01",
    title: "Разбор рекламы и воронки",
    phrase: "Аудит текущего платного трафика, поиск точек слива бюджета и готовый план действий",
    forWhom: "Бизнес, у которого CPL растёт\nили не сходятся цифры окупаемости",
    whatsInside: [
      "Сбор данных из кабинетов и Метрики",
      "Созвон 1,5–2 часа с разбором кампаний",
      "Презентация с планом доработок",
    ],
    price: "15 000₽",
    note: "сбор данных, созвон, презентация, запись",
    hasDetailsPage: true,
    slug: "audit",
  },
  {
    id: "direct",
    number: "02",
    title: "Яндекс Директ",
    phrase: "Трафик на вебинары, посадочные страницы\nи лид-магниты с аналитикой до окупаемости",
    forWhom: "B2B-сервисы, онлайн-школы,\nорганизаторы мероприятий",
    whatsInside: [
      "Горячие ключи и автотаргетинг",
      "Регулярная чистка площадок РСЯ",
      "Сплит-тесты от 3 креативов на аудиторию",
    ],
    price: "от 30 000₽ в месяц",
    note: "",
    hasDetailsPage: true,
    slug: "yandex-direct",
  },
  {
    id: "vk",
    number: "03",
    title: "VK Реклама",
    phrase: "Лид-формы, подписчики в сообщества\nи регистрации на вебинары и мероприятия",
    forWhom: "Мероприятия, вебинары и B2B-ниши\nс профессиональными сообществами",
    whatsInside: [
      "Тест 4+ сегментов аудиторий",
      "Лид-формы с пробросом в CRM",
      "Ретаргетинг на прогретые базы",
    ],
    price: "от 30 000₽ в месяц",
    note: "",
    hasDetailsPage: true,
    slug: "vk-ads",
  },
  {
    id: "tg-ads",
    number: "04",
    title: "Telegram Ads",
    phrase: "Подписчики и заявки через официальную рекламу Telegram, пока она разрешена",
    forWhom: "Бизнесу и авторам с каналом, которым нужна база до конца года",
    whatsInside: [
      "Стратегия и медиаплан",
      "Кабинет, маркировка, запуск",
      "До 10 креативов, отчёт раз в неделю",
    ],
    price: "от 30 000₽ в месяц",
    note: "бюджет на рекламу от 250 € в месяц, отдельно",
    badge: "до 31 декабря",
    hasDetailsPage: true,
    slug: "telegram-ads",
  },
  {
    id: "direct-tg",
    number: "05",
    title: "Связка «Директ → лендинг → Telegram»",
    phrase: "Привожу подписчиков в телеграм-канал\nиз Яндекса без рекламы внутри Telegram",
    forWhom: "Бизнес с телеграм-каналом, которому с 2027 года нужны стабильные подписчики",
    whatsInside: [
      "Лендинг-прокладка с высокой конверсией",
      "Чат-бот с лид-магнитом за подписку",
      "Кампании на Поиске и в РСЯ",
    ],
    price: "35 000₽ в месяц",
    note: "под ключ: лендинг, бот,\nтрафик, аналитика",
    hasDetailsPage: true,
    slug: "direct-landing-telegram",
  },
  {
    id: "max",
    number: "06",
    title: "Продвижение в MAX",
    phrase: "Промо через VK Рекламу или Яндекс Директ\nв рамках площадки",
    forWhom: "Бизнес и авторы, желающие занять позиции на молодом рынке раньше других",
    whatsInside: [
      "Подбор каналов для рекламы",
      "Тест связок на сайт или в канал",
    ],
    price: "10 000₽ в месяц",
    note: "при запуске до конца ноября",
    badge: "тестовая цена",
    hasDetailsPage: true,
    slug: "max",
  },
  {
    id: "bots",
    number: "07",
    title: "Воронки в ботах",
    phrase: "Чат-боты с лид-магнитом, прогревающие цепочки и сквозная разметка источников",
    forWhom: "Онлайн-школы, B2B-компании\nи эксперты с вебинарными воронками",
    whatsInside: [
      "Сценарий цепочки догрева с визуалом",
      "Сквозная разметка источников",
      "Регистрация в любой момент",
    ],
    price: "от 15 000₽",
    note: "бот с лид-магнитом 15 000₽, глубокая воронка прогрева от 30 000₽",
    hasDetailsPage: true,
    slug: "bot-funnels",
  },
];

export interface CaseSecondaryItem {
  id: string;
  metricMain: string;
  title: string;
  subtitle?: string;
  tags: string[];
  slug: string;
}

export interface MoreCaseItem {
  company: string;
  title: string;
  slug: string;
}

export const casesData = {
  featured: {
    slug: "kontur-extern",
    tags: ["Telegram Ads", "Чат-боты", "Комьюнити бухгалтеров"],
    metricMain: "−33%",
    title: "к цене подписчика в Telegram Ads для канала Контур.Экстерн",
    metrics: [
      { value: "€3 → €2", label: "цена подписчика" },
      { value: "0,2% → 0,38%", label: "CTR" },
    ],
  },
  cards: [
    {
      id: "b2b-service",
      metricMain: "×2",
      title: "регистраций в B2B-сервисе вслед за ростом канала",
      subtitle: "3 861 подписчик по €2,9",
      tags: ["Telegram Ads", "B2B-сервис"],
      slug: "b2b-service",
    },
    {
      id: "online-school",
      metricMain: "300%",
      title: "ROMI за 3 месяца у онлайн-школы, канал запустили с нуля",
      subtitle: "2 139 подписчиков по €1,86",
      tags: ["Telegram Ads", "Онлайн-школа"],
      slug: "online-school",
    },
    {
      id: "expert-b2b",
      metricMain: "1 670",
      title: "подписчиков в канал эксперта из узкой B2B-ниши",
      subtitle: "€3 за подписчика, пошли заявки\nна консультации",
      tags: ["Telegram Ads", "Эксперт", "B2B"],
      slug: "expert-b2b",
    },
  ] as CaseSecondaryItem[],
  moreCases: [
    {
      company: "Контур.Эльба",
      title: "−26% к цене подписчика\nв Telegram Ads",
      slug: "kontur-elba",
    },
    {
      company: "HTML Academy",
      title: "2 500 человек в чат-бот\nВКонтакте по 40₽",
      slug: "html-academy-lead-magnet",
    },
    {
      company: "HTML Academy",
      title: "400 000 охвата\nс коллаборации с блогером",
      slug: "html-academy-collab",
    },
  ] as MoreCaseItem[],
};

export interface ProcessStep {
  number: string;
  duration: string;
  title: string;
  phrase: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    duration: "30 минут",
    title: "Созвон-знакомство",
    phrase: "Разбираем задачу, экономику продукта, бюджет и решаем, смогу ли помочь",
  },
  {
    number: "02",
    duration: "2–4 рабочих дня",
    title: "Стратегия и медиаплан",
    phrase: "Считаем вилку цены подписчика или заявки и готовим площадки",
  },
  {
    number: "03",
    duration: "1–2 дня",
    title: "Запуск",
    phrase: "Собираю кабинеты, загружаю креативы, прохожу модерацию и маркировку в ОРД",
  },
  {
    number: "04",
    duration: "всё время",
    title: "Тесты креативов",
    phrase: "От трёх креативов на сегмент при равном бюджете, чтобы цифры были честными",
  },
  {
    number: "05",
    duration: "каждый понедельник",
    title: "Отчёт",
    phrase: "Сколько потрачено\nи пришло, цена единицы, что сработало, план на неделю",
  },
];

export const processBannerText = "Все работы веду самостоятельно, запуски и стратегии полностью на мне. Иногда подключаю менеджеров в чатах для оперативности.";

export interface ReviewItem {
  id: string;
  text: string;
  name: string;
  role: string;
  company: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: "1",
    text: "Я никогда не работала с рекламой и рекламными кабинетами. Сразу хочу отметить тщательную подготовку Даниила и работу под индивидуальный запрос. Очень понятное и структурированное объяснение нюансов рекламы, ничего лишнего. Я получила подробный план действий и рекомендации по продвижению и бюджету.",
    name: "[Имя Фамилия]",
    role: "[Роль, компания]",
    company: "",
  },
  {
    id: "2",
    text: "Хочу поблагодарить вас! Запустила первую кампанию по вашим рекомендациям. Результатом довольна, несмотря на то, что это был тест. Сейчас запустила ещё одну. В общем, мне понравилось работать с рекламой, теперь совсем не боюсь)",
    name: "[Имя Фамилия]",
    role: "[Роль, компания]",
    company: "",
  },
  {
    id: "3",
    text: "Даниил, ты раскрыл мне те стороны моей работы, о которых я даже не думала. Спасибо, что ты <em>настолько</em> глубоко погрузился в мой проект и разобрал сильно больше, чем я ожидала: и сам контент, и варианты, и даже форматы рекламы. Очень грамотно и с огромным вовлечением.",
    name: "[Имя Фамилия]",
    role: "[Роль, компания]",
    company: "",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "Какой минимальный бюджет на рекламу нужен для старта?",
    answer: "Рекомендуемый бюджет: Яндекс Директ от 50 000₽ в месяц, VK Реклама и MAX от 40 000₽, Telegram Ads от 250 € плюс комиссия реселлера от 15% и НДС 22%. При необходимости скорректируем бюджет в рамках проекта. Если бюджет пока меньше, лучше начать с <a class=\"lnk\" href=\"/services/audit\">«Разбора рекламы и воронки»</a> за 15 000₽.",
  },
  {
    question: "Запрещена ли реклама в Telegram и что будет с 2027 года?",
    answer: "С 1 сентября 2025 года закон запрещает размещать рекламу на ресурсах, доступ к которым ограничен в России (ч. 10.7 ст. 5 закона «О рекламе»). В марте 2026 года ФАС заявила, что это касается Telegram, но до конца 2026 года штрафовать не будет. Поэтому Telegram Ads запускаю до 31 декабря, а с 2027 года за рекламу в Telegram могут наказать и рекламодателя, и того, кто её разместил. Сами каналы продолжат существовать, аудитория не покинет Telegram, и при правильном подходе к монетизации каналы будут приносить прибыль бизнесу и авторам. Привлекать подписчиков можно будет другими способами, например через <a class=\"lnk\" href=\"/services/direct-landing-telegram\">связку Директ → лендинг → Telegram</a>.",
  },
  {
    question: "Когда появятся первые результаты?",
    answer: "Конкретного срока нет, всё сильно зависит от проекта. Но уже в первый месяц можно оценить эффективность кампаний. В первый месяц средняя цена обычно выше из-за тестов: за это время находим качественные связки, а в следующем месяце снижаем стоимость за счёт оптимизации. Через месяц после первых тестов можно выстроить ожидания по дальнейшей цене подписчика или заявки.",
  },
  {
    question: "Что выбрать: Яндекс Директ, VK Рекламу или Telegram Ads?",
    answer: "Всё зависит от задачи. Если коротко, Директ приводит тех, кто уже ищет решение, VK Реклама находит людей по интересам и сообществам, а Telegram Ads помогает растить канал до конца 2026 года. <a class=\"lnk\" href=\"https://t.me/winter_daniil\">Напишите мне</a>, и я подскажу, что подойдёт лучше.",
  },
  {
    question: "С какими нишами вы работаете, а какие не берёте?",
    answer: "Чаще всего работаю с B2B-сервисами, онлайн-школами и контентными проектами. Не беру эзотерику, гемблинг и серые ниши.",
  },
  {
    question: "Как вы отчитываетесь о результатах?",
    answer: "Каждый понедельник присылаю отчёт сообщением в Telegram: сколько потрачено, сколько пришло подписчиков или заявок, цена единицы, что сработало и план на неделю. Раз в месяц готовлю презентацию с общими итогами. Созвоны назначаем при необходимости, по договорённости с вашими менеджерами.",
  },
  {
    question: "Чей рекламный кабинет и от чьего имени идёт реклама?",
    answer: "Рекламные кабинеты завожу сам через свой аккаунт в рекламных сервисах, но реклама запускается от имени клиента. Если нужно, могу сразу завести кабинет на вашей стороне.",
  },
  {
    question: "Кто занимается маркировкой рекламы?",
    answer: "Рекламу в кабинетах маркируют сами сервисы, ручные посевы маркирую я. За маркировкой слежу очень внимательно.",
  },
  {
    question: "Как оформляется сотрудничество и оплата?",
    answer: "Работаю со всеми как самозанятый, по договору и с чеками из «Мой налог». Ведение оплачивается помесячно: первый месяц перед стартом, дальше в начале каждого месяца. Разбор и сборку бота оплачиваете целиком до старта. Минимального срока работы нет, всё зависит от задач.",
  },
];
