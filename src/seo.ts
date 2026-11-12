import { casesList } from './data/cases';
import { siteConfig } from './data/content';
import { servicesData } from './data/services';

export const siteOrigin = 'https://winterlead.ru';
export const socialImagePath = '/assets/social-daniil.jpg';

type PageView = 'home' | 'service-detail' | 'case-detail' | 'policy' | 'consent' | 'not-found';

export interface SitePage {
  path: string;
  view: PageView;
  title: string;
  description: string;
  breadcrumb: string;
  slug?: string;
  indexable: boolean;
}

const homePage: SitePage = {
  path: '/',
  view: 'home',
  title: 'Платный трафик для бизнеса | Даниил Винтер',
  description: 'Даниил Винтер настраивает и ведёт рекламу в Яндекс Директе, VK Рекламе и Telegram Ads. Аудит рекламы, чат-боты, продвижение в MAX и кейсы с результатами.',
  breadcrumb: 'Главная',
  indexable: true,
};

const policyPage: SitePage = {
  path: '/policy',
  view: 'policy',
  title: 'Политика конфиденциальности | Даниил Винтер',
  description: 'Политика в отношении обработки персональных данных ИП Винтер Даниил Денисович.',
  breadcrumb: 'Политика конфиденциальности',
  indexable: false,
};

const consentPage: SitePage = {
  path: '/soglasie',
  view: 'consent',
  title: 'Согласие на обработку персональных данных | Даниил Винтер',
  description: 'Согласие на обработку персональных данных ИП Винтер Даниил Денисович.',
  breadcrumb: 'Согласие на обработку персональных данных',
  indexable: false,
};

export const notFoundPage: SitePage = {
  path: '/404',
  view: 'not-found',
  title: 'Страница не найдена | Даниил Винтер',
  description: 'Перейдите на главную, чтобы посмотреть услуги и кейсы Даниила Винтера.',
  breadcrumb: 'Страница не найдена',
  indexable: false,
};

export const sitePages: SitePage[] = [
  homePage,
  ...servicesData.map((service): SitePage => ({
    path: `/services/${service.slug}`,
    view: 'service-detail',
    title: service.title,
    description: service.description,
    breadcrumb: service.breadcrumb,
    slug: service.slug,
    indexable: true,
  })),
  ...casesList.map((item): SitePage => ({
    path: `/cases/${item.slug}`,
    view: 'case-detail',
    title: item.titleMeta,
    description: item.descriptionMeta,
    breadcrumb: item.breadcrumb,
    slug: item.slug,
    indexable: true,
  })),
  policyPage,
  consentPage,
];

const pagesByPath = new Map(sitePages.map((page) => [page.path, page]));
const serviceAliases = new Map([
  ['direct', 'yandex-direct'],
  ['vk', 'vk-ads'],
  ['tg-ads', 'telegram-ads'],
  ['direct-landing', 'direct-landing-telegram'],
  ['landing-telegram', 'direct-landing-telegram'],
  ['bots', 'bot-funnels'],
]);
const caseAliases = new Map([
  ['extern', 'kontur-extern'],
  ['school', 'online-school'],
  ['expert', 'expert-b2b'],
  ['html-lead', 'html-academy-lead-magnet'],
  ['html-lead-magnet', 'html-academy-lead-magnet'],
  ['lead-magnet', 'html-academy-lead-magnet'],
  ['html-collab', 'html-academy-collab'],
  ['collab', 'html-academy-collab'],
]);
const homeSections = new Set(['#about', '#cases', '#contact', '#faq', '#process', '#reviews', '#services', '#top']);
const removedCases = new Set(['elba', 'kontur-elba', 'conference', 'accountants', 'webinar']);

export function resolvePage(pathname: string, hash = '') {
  const fragment = hash.toLowerCase();
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const legacyHash = /^#(?:\/(?:services|cases)\/|(?:service|case)-|\/?(?:policy|privacy|soglasie|consent)$)/.test(fragment);
  const target = legacyHash ? fragment.slice(1).replace(/\/+$/, '') : path;
  const directPage = pagesByPath.get(target);
  if (directPage) {
    return { page: directPage, anchor: legacyHash ? '' : hash };
  }

  const legacyPath = target.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/^\//, '');
  if (legacyPath === '' || legacyPath === 'index') {
    return { page: homePage, anchor: hash };
  }
  if (legacyPath === 'policy' || legacyPath === 'privacy') return { page: policyPage, anchor: '' };
  if (legacyPath === 'soglasie' || legacyPath === 'consent') return { page: consentPage, anchor: '' };

  const caseSlug = legacyPath.replace(/^(?:cases\/|case-)/, '');
  if (removedCases.has(caseSlug)) return { page: homePage, anchor: '', removed: true };
  if (/^(?:cases\/|case-)/.test(legacyPath)) {
    const page = pagesByPath.get(`/cases/${caseAliases.get(caseSlug) ?? caseSlug}`);
    return { page: page ?? notFoundPage, anchor: '' };
  }

  const serviceSlug = legacyPath.replace(/^(?:services\/|service-)/, '');
  if (/^(?:services\/|service-)/.test(legacyPath) || target.endsWith('.html')) {
    const page = pagesByPath.get(`/services/${serviceAliases.get(serviceSlug) ?? serviceSlug}`);
    return { page: page ?? notFoundPage, anchor: '' };
  }
  if (homeSections.has(fragment)) return { page: homePage, anchor: hash };
  return { page: notFoundPage, anchor: '' };
}

export function pageMetadata(page: SitePage) {
  const url = siteOrigin + page.path;
  const image = siteOrigin + socialImagePath;
  const socialTags = {
    'og:type': 'website',
    'og:locale': 'ru_RU',
    'og:site_name': siteConfig.fullName,
    'og:title': page.title,
    'og:description': page.description,
    'og:image': image,
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Даниил Винтер, специалист по платному трафику',
    ...(page.view === 'not-found' ? {} : { 'og:url': url }),
  };
  const nameTags = {
    description: page.description,
    ...(page.indexable ? {} : { robots: 'noindex, follow' }),
    'twitter:card': 'summary_large_image',
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': image,
  };
  return { canonical: page.view === 'not-found' ? null : url, socialTags, nameTags };
}

export function pageStructuredData(page: SitePage) {
  const context = 'https://schema.org';
  if (page.view === 'home') {
    return {
      '@context': context,
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteOrigin}/#daniil`,
          name: siteConfig.fullName,
          jobTitle: siteConfig.role,
          url: `${siteOrigin}/`,
          image: `${siteOrigin}/assets/danya-hero.webp`,
          sameAs: [siteConfig.telegramPersonalUrl],
        },
        {
          '@type': 'WebSite',
          name: siteConfig.fullName,
          url: `${siteOrigin}/`,
          inLanguage: 'ru',
          publisher: { '@id': `${siteOrigin}/#daniil` },
        },
      ],
    };
  }
  if (!page.indexable) return null;
  const section = page.view === 'service-detail' ? 'Услуги' : 'Кейсы';
  const sectionAnchor = page.view === 'service-detail' ? 'services' : 'cases';
  return {
    '@context': context,
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homePage.breadcrumb, item: `${siteOrigin}/` },
      { '@type': 'ListItem', position: 2, name: section, item: `${siteOrigin}/#${sectionAnchor}` },
      { '@type': 'ListItem', position: 3, name: page.breadcrumb, item: siteOrigin + page.path },
    ],
  };
}
