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

type AppView = 'home' | 'service-detail' | 'case-detail';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Sync hash routing on mount and on popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('service') || hash.includes('telegram-ads')) {
        setCurrentView('service-detail');
        window.scrollTo(0, 0);
      } else if (hash.includes('case-extern') || hash.includes('extern')) {
        setCurrentView('case-detail');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = (hash?: string) => {
    setCurrentView('home');
    if (hash) {
      window.location.hash = hash;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToService = (slug: string) => {
    if (slug === 'telegram-ads') {
      window.location.hash = 'service-telegram-ads';
      setCurrentView('service-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToCase = (_slug?: string) => {
    window.location.hash = 'case-extern';
    setCurrentView('case-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-slate flex flex-col font-sans">
      {/* 1. Sticky Navigation Header */}
      <Header
        currentView={currentView}
        onNavigateHome={navigateToHome}
      />

      {/* 2. Main View Router */}
      <main id="top" className="flex-1">
        {currentView === 'service-detail' ? (
          <ServiceDetailPage
            onBackToHome={() => navigateToHome('#services')}
            onOpenCase={navigateToCase}
          />
        ) : currentView === 'case-detail' ? (
          <CaseDetailPage
            onBackToHome={() => navigateToHome('#cases')}
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
            <ContactSection />
          </>
        )}
      </main>

      {/* 3. Футер (сливовый #36202C) */}
      <Footer onOpenPrivacy={() => setPrivacyModalOpen(true)} />

      {/* 4. Модальное окно политики конфиденциальности */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default App;
