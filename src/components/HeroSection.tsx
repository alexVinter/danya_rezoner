import React from 'react';
import { siteConfig } from '../data/content';

export const heroPortrait = {
  src: '/assets/danya-hero-640.webp',
  srcSet: '/assets/danya-hero-360.webp 360w, /assets/danya-hero-480.webp 480w, /assets/danya-hero-540.webp 540w, /assets/danya-hero-640.webp 640w',
  sizes: '(min-width: 1024px) 430px, (min-width: 768px) 36vw, (min-width: 640px) 340px, 280px',
};

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-10 sm:pt-16 pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="md:col-span-7">
            <h1 className="m-0 text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate max-w-[720px]">
              Платный трафик для бизнеса,<br />
              <span className="mark">который продаёт</span>
            </h1>

            <p className="mt-7 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[560px]">
              Вы пишете посты, снимаете видео или просто делаете крутой продукт. Я привожу аудиторию, которая у вас покупает.
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

          {/* Right Column: Danya's Photo with Lion Mascot Overlay */}
          <div className="md:col-span-5 flex justify-center mt-8 md:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px]">
              {/* Photo with rounded-card border radius (matching About photo) */}
              <div className="overflow-hidden border-[1.5px] border-slate rounded-card shadow-sm aspect-square w-full bg-paper">
                <img
                  {...heroPortrait}
                  width={640}
                  height={640}
                  {...{ fetchpriority: 'high' }}
                  alt="Даниил Винтер"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Lion Mascot Overlay Top-Right */}
              <img
                src="/assets/lion-hero-440.webp"
                srcSet="/assets/lion-hero-300.webp 300w, /assets/lion-hero-440.webp 440w"
                sizes="(min-width: 1024px) 205px, (min-width: 768px) 185px, (min-width: 640px) 155px, 125px"
                width={440}
                height={398}
                {...{ fetchpriority: 'low' }}
                decoding="async"
                alt=""
                aria-hidden="true"
                className="wob absolute -top-5 -right-5 sm:-top-7 sm:-right-7 md:-top-9 md:-right-8 w-[125px] sm:w-[155px] md:w-[185px] lg:w-[205px] h-auto object-contain select-none z-10 -rotate-[4deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
