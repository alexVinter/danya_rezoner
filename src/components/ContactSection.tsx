import React from 'react';
import { siteConfig } from '../data/content';
import { LeadForm } from './LeadForm';

interface ContactSectionProps {
  onOpenPrivacy?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPrivacy }) => {
  return (
    <section id="contact" className="pt-36 sm:pt-48 md:pt-[210px] pb-16 md:pb-[120px]">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="relative bg-orange rounded-plate p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {/* Tiger Illustration Resting on Top */}
          <img
            src="/assets/tiger.webp?v=3"
            alt=""
            aria-hidden="true"
            className="wob absolute select-none left-5 sm:left-10 md:left-12 -top-24 sm:-top-32 md:-top-[164px] w-[220px] sm:w-[280px] md:w-[340px] z-10"
          />

          {/* Left Column: Heading, Subtitle & White Button */}
          <div className="md:col-span-6 relative z-10">
            <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              Давайте работать
              <br />
              <span className="mark inline-block mt-1">вместе</span>
            </h2>

            <p className="mt-5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-white max-w-[460px]">
              Заполните форму или напишите напрямую в Telegram. Можно сразу прислать ссылку на канал или сайт и описать задачу своими словами.
            </p>

            <a
              href={siteConfig.telegramPersonalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-w mt-8 inline-flex items-center gap-2.5 h-14 px-7 rounded-pill text-[17px] font-semibold no-underline"
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
                aria-hidden="true"
              >
                <path d="M22 2 11 13"></path>
                <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
              </svg>
              <span>Написать в Telegram</span>
            </a>
          </div>

          {/* Right Column: White Card with Form */}
          <div className="md:col-span-6 relative z-10 w-full">
            <LeadForm pageName="Главная" onOpenPrivacy={onOpenPrivacy} />
          </div>
        </div>
      </div>
    </section>
  );
};
