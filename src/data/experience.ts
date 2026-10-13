export interface CareerRole {
  period: string;
  company: string;
  role: string;
  highlightNumber: string;
  description: string;
}

export interface SpeechEvent {
  event: string;
  topic: string;
  badge: string;
  description: string;
}

export const careerTimeline: CareerRole[] = [
  {
    period: "Сейчас",
    company: "Агентство АР",
    role: "Руководитель отдела промо",
    highlightNumber: "15+ проектов",
    description: "Управляю промо-кампаниями агентства, выстраиваю перформанс-воронки и связки платного трафика для B2B и B2C клиентов."
  },
  {
    period: "3 года",
    company: "СКБ Контур (Экстерн, Эльба, Конференции)",
    role: "Лид перформанс-маркетинга",
    highlightNumber: "−33% к цене лида",
    description: "Вёл рекламу на федеральные B2B-продукты для бухгалтеров и предпринимателей. Снизил цену подписчика в Telegram Ads с €3 до €2, сделал 114% плана конференции."
  },
  {
    period: "Ранее",
    company: "Teller Agency",
    role: "Трафик-стратег и таргетолог",
    highlightNumber: "40+ запусков",
    description: "Запускал таргетированную рекламу и воронки в социальных сетях, тестировал нестандартные каналы привлечения и бот-механики."
  },
  {
    period: "Старт карьеры",
    company: "Ранние проекты & EdTech",
    role: "Специалист по платному трафику",
    highlightNumber: "300% ROMI",
    description: "Коллаборации с инфлюенсерами, посевы, запуск чат-ботов для HTML Academy (2 500 лидов по 40 ₽) и локальных брендов."
  }
];

export const publicActivities: SpeechEvent[] = [
  {
    event: "TgConf 2024 / 2025",
    topic: "«Снижение стоимости подписчика в Telegram Ads: как визуал бьёт в боль»",
    badge: "Спикер",
    description: "Выступление с разбором реальных кейсов Контур.Экстерна и Эльбы перед аудиторией маркетологов."
  },
  {
    event: "Вебинары eLama",
    topic: "«Платный трафик в каналы без слива бюджета: автостратегии и тесты креативов»",
    badge: "Эксперт",
    description: "Разбор методологии тестов от 3+ креативов на аудиторию при равном бюджете."
  },
  {
    event: "Издание ppc.world",
    topic: "Экспертные колонки и аналитика рынка интернет-рекламы",
    badge: "Автор",
    description: "Статьи о тонкостях маркировки рекламы, внешнем трафике в мессенджеры и конвертящих лид-магнитах."
  },
  {
    event: "Telegram-канал «Резонёр»",
    topic: "Авторский канал Дани про трафик, маркетинг и честные цифры",
    badge: "Автор",
    description: "Короткие посты без духоты, разборы провальных и успешных гипотез, закулисье перформанса."
  }
];
