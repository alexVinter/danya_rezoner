import React, { useState } from 'react';
import { siteConfig } from '../data/content';

interface HeaderProps {
  currentView: 'home' | 'service-detail' | 'case-detail';
  onNavigateHome: (hash?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigateHome(hash);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-line">
      <div className="max-w-site mx-auto px-4 md:px-10 h-[72px] flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="flex items-center gap-2.5 text-slate no-underline hover:text-slate"
        >
          <img
            src="/assets/lion-mark.webp?v=2"
            alt=""
            aria-hidden="true"
            className="w-[38px] h-auto flex-shrink-0"
          />
          <span className="text-[18px] font-bold tracking-[-0.01em]">
            {siteConfig.fullName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Разделы сайта" className="hidden lg:flex items-center gap-7 text-[16px] font-medium">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-slate no-underline hover:text-orange transition-colors"
          >
            Обо мне
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, '#services')}
            className={`no-underline transition-colors ${
              currentView === 'service-detail' ? 'text-orange font-semibold' : 'text-slate hover:text-orange'
            }`}
          >
            Услуги
          </a>
          <a
            href="#cases"
            onClick={(e) => handleNavClick(e, '#cases')}
            className={`no-underline transition-colors ${
              currentView === 'case-detail' ? 'text-orange font-semibold' : 'text-slate hover:text-orange'
            }`}
          >
            Кейсы
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, '#process')}
            className="text-slate no-underline hover:text-orange transition-colors"
          >
            Как работаю
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="text-slate no-underline hover:text-orange transition-colors"
          >
            FAQ
          </a>
          <a
            href={siteConfig.telegramChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate no-underline hover:text-orange transition-colors"
          >
            Блог
          </a>
        </nav>

        {/* Action Button & Mobile Burger */}
        <div className="flex items-center gap-2.5">
          <a
            href={siteConfig.telegramPersonalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-o items-center gap-2 h-10 px-[18px] rounded-pill text-[15px] font-semibold no-underline"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 2 11 13"></path>
              <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
            </svg>
            <span>Написать в Telegram</span>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 inline-flex items-center justify-center border-[1.5px] border-slate rounded-pill bg-transparent text-slate hover:bg-white transition-colors"
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper border-b border-line px-4 py-6 animate-in fade-in duration-150">
          <nav className="flex flex-col gap-4 text-[18px] font-medium mb-6">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-slate no-underline hover:text-orange py-1"
            >
              Обо мне
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="text-slate no-underline hover:text-orange py-1"
            >
              Услуги
            </a>
            <a
              href="#cases"
              onClick={(e) => handleNavClick(e, '#cases')}
              className="text-slate no-underline hover:text-orange py-1"
            >
              Кейсы
            </a>
            <a
              href="#process"
              onClick={(e) => handleNavClick(e, '#process')}
              className="text-slate no-underline hover:text-orange py-1"
            >
              Как работаю
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="text-slate no-underline hover:text-orange py-1"
            >
              FAQ
            </a>
            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate no-underline hover:text-orange py-1"
            >
              Блог
            </a>
          </nav>
          <a
            href={siteConfig.telegramPersonalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-o flex items-center justify-center gap-2 h-12 rounded-pill text-[16px] font-semibold no-underline"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13"></path>
              <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
            </svg>
            <span>Написать в Telegram</span>
          </a>
        </div>
      )}
    </header>
  );
};
