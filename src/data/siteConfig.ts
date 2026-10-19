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
  authorName: "Даня",
  roleTitle: "Платный трафик в контент и воронки",
  telegramUsername: "@danya_promo",
  telegramChannelName: "Резонёр",
  telegramChannelUrl: "https://t.me/rezoner_channel",
  botLeadMagnetUrl: "https://t.me/rezoner_bot?start=checklist",
  email: "danya@rezoner.ru",
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
