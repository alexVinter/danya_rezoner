import { renderToString } from 'react-dom/server';
import { App } from './App';
import { isAdBannerVisible } from './components/AdBanner';
import { pageMetadata, pageStructuredData, type SitePage } from './seo';

export { notFoundPage, siteOrigin, sitePages } from './seo';
export { heroPortrait } from './components/HeroSection';

export function renderPage(page: SitePage) {
  const initialAdVisible = isAdBannerVisible();
  return {
    markup: renderToString(<App initialPage={page} initialAdVisible={initialAdVisible} />),
    initialAdVisible,
    metadata: pageMetadata(page),
    structuredData: pageStructuredData(page),
  };
}
