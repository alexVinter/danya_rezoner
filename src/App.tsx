import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AdBanner } from './components/AdBanner';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CasesSection } from './components/CasesSection';
import { ProcessSection } from './components/ProcessSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { CaseDetailPage } from './components/CaseDetailPage';
import { PolicyPage } from './components/PolicyPage';
import { ConsentPage } from './components/ConsentPage';
import { applyTypographerToDOM } from './utils/typography';
import { resolvePage, type SitePage } from './seo';
import { updatePageMetadata } from './seoClient';

interface AppProps {
  initialPage: SitePage;
  initialAdVisible?: boolean;
}

export const App: React.FC<AppProps> = ({ initialPage, initialAdVisible }) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    updatePageMetadata(page);
    applyTypographerToDOM();

    let timeoutId: number | undefined;
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(applyTypographerToDOM, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [page]);

  function syncLocation(scroll = true) {
    const { page: nextPage, anchor, removed } = resolvePage(location.pathname, location.hash);
    if (removed) history.replaceState(null, '', '/');
    setPage(nextPage);

    if (anchor) {
      requestAnimationFrame(() => {
        document.getElementById(anchor.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      });
    } else if (scroll) {
      window.scrollTo(0, 0);
    }
  }

  function navigate(href: string) {
    history.pushState(null, '', href);
    syncLocation();
  }

  useEffect(() => {
    function onLocationChange() {
      syncLocation();
    }

    function onLinkClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      const href = link?.getAttribute('href');
      if (!href?.startsWith('/') || href.startsWith('//') || link?.target || link?.hasAttribute('download')) return;

      const target = new URL(href, location.origin);
      if (resolvePage(target.pathname, target.hash).page.view === 'not-found') return;
      event.preventDefault();
      navigate(href);
    }

    syncLocation(false);
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    document.addEventListener('click', onLinkClick);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
      document.removeEventListener('click', onLinkClick);
    };
  }, []);

  function navigateHome(hash = '') {
    navigate(hash === '#top' ? '/' : `/${hash}`);
  }

  let content: React.ReactNode;
  switch (page.view) {
    case 'policy':
      content = <PolicyPage onBackToHome={navigateHome} onOpenConsent={() => navigate('/soglasie')} />;
      break;
    case 'consent':
      content = <ConsentPage onBackToHome={navigateHome} onOpenPolicy={() => navigate('/policy')} />;
      break;
    case 'service-detail':
      content = <ServiceDetailPage serviceSlug={page.slug!} />;
      break;
    case 'case-detail':
      content = <CaseDetailPage caseSlug={page.slug!} />;
      break;
    case 'not-found':
      content = (
        <section className="wrap py-20">
          <h1 className="text-[40px] font-bold">Страница не найдена</h1>
          <a href="/" className="lnk">На главную</a>
        </section>
      );
      break;
    default:
      content = (
        <>
          <HeroSection />
          <AdBanner initialVisible={initialAdVisible} />
          <AboutSection />
          <ServicesSection />
          <CasesSection />
          <ProcessSection />
          <ReviewsSection />
          <FaqSection />
          <ContactSection />
        </>
      );
  }

  return (
    <div id="top" className="min-h-screen bg-paper text-slate flex flex-col font-sans">
      <Header currentView={page.view} onNavigateHome={navigateHome} />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
};

export default App;
