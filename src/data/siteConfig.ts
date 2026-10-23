export interface SiteConfig {
  authorName: string;
  roleTitle: string;
  telegramUsername: string;
  telegramChannelName: string;
  telegramChannelUrl: string;
  botLeadMagnetUrl: string;
  email: string;
  legalEntityInfo: string;
  offerHeading: string;
  offerSubheading: string;
  stats: {
    cpfReduction: string;
    ctrBoost: string;
    planCompletion: string;
    revenueGrowth: string;
  };
}

export const siteConfig: SiteConfig = {
  authorName: "Даниил Винтер",
  roleTitle: "Платный трафик в контент и воронки",
  telegramUsername: "@winter_daniil",
  telegramChannelName: "Резонёр",
  telegramChannelUrl: "https://t.me/rezonerw",
  botLeadMagnetUrl: "https://t.me/winter_daniil",
  email: "vinterdaniil@yandex.ru",
  legalEntityInfo: "Самозанятый (НПД). Официальный договор, безналичный расчёт, закрывающие электронные чеки через ФНС «Мой налог».",
  offerHeading: "Платный трафик для бизнеса, который продаёт через контент",
  offerSubheading: "Вы пишете посты и снимаете видео. Я привожу аудиторию, которая у вас покупает.",
  stats: {
    cpfReduction: "−33%",
    ctrBoost: "×1.9",
    planCompletion: "114%",
    revenueGrowth: "+23%",
  }
};
