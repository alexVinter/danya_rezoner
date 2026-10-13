import React from 'react';
import { siteConfig } from '../data/content';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-10 sm:pt-16 pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="md:col-span-7">
            <h1 className="m-0 text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate max-w-[720px]">
              <span className="mark">Платный трафик</span> для бизнеса, который продаёт через контент
            </h1>

            <p className="mt-7 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[560px]">
              Руковожу отделом промо в агентстве АР. До этого 3 года вёл перформанс в Контуре: снизил цену подписчика в Telegram Ads на треть.
            </p>

            <div className="mt-9">
              <a
                href={siteConfig.telegramPersonalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-o inline-flex items-center gap-2.5 h-14 px-7 rounded-pill text-[17px] font-semibold no-underline"
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
          </div>

          {/* Right Column: Lion Illustration */}
          <div className="md:col-span-5 flex justify-center mt-6 md:mt-0">
            <img
              src="/assets/lion.webp?v=3"
              alt=""
              aria-hidden="true"
              className="wob w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] h-auto object-contain select-none -rotate-[4deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
