import React, { useState, useEffect } from 'react';
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
import { PrivacyModal } from './components/PrivacyModal';
import { servicesData } from './data/services';
import { casesList } from './data/cases';

type AppView = 'home' | 'service-detail' | 'case-detail';

const HOME_TITLE = 'Платный трафик для бизнеса, который продаёт через контент | Даниил Винтер';
const HOME_DESC = 'Платный трафик в контент и воронки. Подписчики в каналы, регистрации на мероприятия и системные тесты креативов.';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>('audit');
  const [activeCaseSlug, setActiveCaseSlug] = useState<string>('kontur-extern');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<'privacy' | 'consent'>('privacy');

  const handleOpenPrivacy = (tab: 'privacy' | 'consent' = 'privacy') => {
    setPrivacyModalTab(tab);
    setPrivacyModalOpen(true);
  };

  const updateSEO = (title: string, description: string) => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  };

  // Sync routing on mount, popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const fullUrl = path + hash;

      // Check 301/client-side redirects for removed cases:
      if (
        fullUrl.includes('conference') ||
        fullUrl.includes('accountants') ||
        fullUrl.includes('webinar')
      ) {
        window.history.replaceState(null, '', '/');
        setCurrentView('home');
        updateSEO(HOME_TITLE, HOME_DESC);
        window.scrollTo(0, 0);
        return;
      }

      // 0. Home Section Anchor Matcher (#cases, #services, #about, #process, #reviews, #faq, #contact, #top)
      const homeSections = ['#cases', '#services', '#about', '#process', '#reviews', '#faq', '#contact', '#top'];
      if (homeSections.includes(hash)) {
        setCurrentView('home');
        updateSEO(HOME_TITLE, HOME_DESC);
        setTimeout(() => {
          if (hash === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
        return;
      }

      // 1. Service Route Matcher (/services/*, #/services/*, #service-*, *.html)
      const isServiceRoute =
        path.startsWith('/services/') ||
        hash.startsWith('#/services/') ||
        hash.startsWith('#service-') ||
        path.endsWith('audit.html') ||
        path.endsWith('yandex-direct.html') ||
        path.endsWith('vk-ads.html') ||
        path.endsWith('telegram-ads.html') ||
        path.endsWith('direct-landing-telegram.html') ||
        path.endsWith('max.html') ||
        path.endsWith('bot-funnels.html');

      if (isServiceRoute) {
        let slug = 'audit';
        if (fullUrl.includes('yandex-direct') || (fullUrl.includes('direct') && !fullUrl.includes('landing'))) {
          slug = 'yandex-direct';
        } else if (fullUrl.includes('direct-landing-telegram') || fullUrl.includes('direct-landing') || fullUrl.includes('landing-telegram')) {
          slug = 'direct-landing-telegram';
        } else if (fullUrl.includes('vk-ads') || fullUrl.includes('vk')) {
          slug = 'vk-ads';
        } else if (fullUrl.includes('telegram-ads') || fullUrl.includes('tg-ads')) {
          slug = 'telegram-ads';
        } else if (fullUrl.includes('max')) {
          slug = 'max';
        } else if (fullUrl.includes('bot-funnels') || fullUrl.includes('bots') || fullUrl.includes('funnel')) {
          slug = 'bot-funnels';
        } else if (fullUrl.includes('audit')) {
          slug = 'audit';
        }

        const foundService = servicesData.find((s) => s.slug === slug) || servicesData[0];
        setActiveServiceSlug(foundService.slug);
        setCurrentView('service-detail');
        updateSEO(foundService.title, foundService.description);
        window.scrollTo(0, 0);
        return;
      }

      // 2. Case Route Matcher (/cases/*, #/cases/*, #case-*, case-*.html)
      const isCaseRoute =
        path.startsWith('/cases/') ||
        hash.startsWith('#/cases/') ||
        hash.startsWith('#case-') ||
        path.includes('case-');

      if (isCaseRoute) {
        let slug = 'kontur-extern';
        if (fullUrl.includes('b2b-service') || fullUrl.includes('case-b2b-service')) {
          slug = 'b2b-service';
        } else if (fullUrl.includes('online-school') || fullUrl.includes('case-online-school') || fullUrl.includes('school')) {
          slug = 'online-school';
        } else if (fullUrl.includes('expert-b2b') || fullUrl.includes('case-expert-b2b') || (fullUrl.includes('expert') && !fullUrl.includes('extern'))) {
          slug = 'expert-b2b';
        } else if (fullUrl.includes('kontur-elba') || fullUrl.includes('case-elba') || fullUrl.includes('elba')) {
          slug = 'kontur-elba';
        } else if (fullUrl.includes('lead-magnet') || fullUrl.includes('html-lead') || fullUrl.includes('case-html-lead-magnet')) {
          slug = 'html-academy-lead-magnet';
        } else if (fullUrl.includes('collab') || fullUrl.includes('html-collab') || fullUrl.includes('case-html-collab')) {
          slug = 'html-academy-collab';
        } else if (fullUrl.includes('extern') || fullUrl.includes('case-extern')) {
          slug = 'kontur-extern';
        }

        const foundCase = casesList.find((c) => c.slug === slug) || casesList[0];
        setActiveCaseSlug(foundCase.slug);
        setCurrentView('case-detail');
        updateSEO(foundCase.titleMeta, foundCase.descriptionMeta);
        window.scrollTo(0, 0);
        return;
      }

      // 3. Home Route
      setCurrentView('home');
      updateSEO(HOME_TITLE, HOME_DESC);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }
      if (href.startsWith('#')) return;
      if (
        href.startsWith('/services/') ||
        href.startsWith('/cases/') ||
        href.endsWith('.html') ||
        href === '/'
      ) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        handleLocationChange();
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const navigateToHome = (hash?: string) => {
    setCurrentView('home');
    updateSEO(HOME_TITLE, HOME_DESC);
    if (hash && hash !== '#top' && hash !== '#') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', `/${hash}`);
      } else {
        window.location.hash = hash;
      }
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
      } else {
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname);
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToService = (slug: string) => {
    const found = servicesData.find((s) => s.slug === slug) || servicesData[0];
    setActiveServiceSlug(found.slug);
    setCurrentView('service-detail');
    updateSEO(found.title, found.description);
    window.location.hash = `/services/${found.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCase = (slug: string) => {
    const found = casesList.find((c) => c.slug === slug) || casesList[0];
    setActiveCaseSlug(found.slug);
    setCurrentView('case-detail');
    updateSEO(found.titleMeta, found.descriptionMeta);
    window.location.hash = `/cases/${found.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen bg-paper text-slate flex flex-col font-sans">
      {/* 1. Sticky Navigation Header */}
      <Header
        currentView={currentView}
        onNavigateHome={navigateToHome}
      />

      {/* 2. Main View Router */}
      <main className="flex-1">
        {currentView === 'service-detail' ? (
          <ServiceDetailPage
            serviceSlug={activeServiceSlug}
            onBackToHome={navigateToHome}
            onOpenCase={navigateToCase}
            onOpenService={navigateToService}
            onOpenPrivacy={() => handleOpenPrivacy('privacy')}
          />
        ) : currentView === 'case-detail' ? (
          <CaseDetailPage
            caseSlug={activeCaseSlug}
            onBackToHome={navigateToHome}
            onSelectCase={navigateToCase}
            onOpenPrivacy={() => handleOpenPrivacy('privacy')}
          />
        ) : (
          <>
            {/* 1. Первый экран */}
            <HeroSection />

            {/* 2. Рекламная плашка */}
            <AdBanner />

            {/* 3. Обо мне */}
            <AboutSection />

            {/* 4. Услуги */}
            <ServicesSection onOpenService={navigateToService} />

            {/* 5. Кейсы (тёмная секция #263C2C) */}
            <CasesSection onOpenCase={navigateToCase} />

            {/* 6. Как работаю */}
            <ProcessSection />

            {/* 7. Отзывы */}
            <ReviewsSection />

            {/* 8. FAQ */}
            <FaqSection />

            {/* 9. Давайте работать вместе */}
            <ContactSection onOpenPrivacy={() => handleOpenPrivacy('privacy')} />
          </>
        )}
      </main>

      {/* 3. Футер (сливовый #36202C) */}
      <Footer onOpenPrivacy={handleOpenPrivacy} />

      {/* 4. Модальное окно политики конфиденциальности и согласия */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        initialTab={privacyModalTab}
      />
    </div>
  );
};

export default App;
