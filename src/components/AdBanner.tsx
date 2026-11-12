import React, { useEffect, useState } from 'react';
import { adSlot } from '../data/content';

export function isAdBannerVisible() {
  return adSlot.enabled && Date.now() <= Date.parse(adSlot.showUntil);
}

export const AdBanner: React.FC<{ initialVisible?: boolean }> = ({ initialVisible }) => {
  const [visible, setVisible] = useState(() => initialVisible ?? isAdBannerVisible());
  useEffect(() => {
    setVisible(isAdBannerVisible());
  }, []);
  if (!visible) return null;

  return (
    <section className="pt-14 pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <aside
          aria-label="Реклама"
          className="relative overflow-hidden bg-lime border-[1.5px] border-slate rounded-plate px-6 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-44 md:pb-10 md:pl-[236px] min-h-[212px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8"
        >
          {/* Peeking Hand "Three" Illustration */}
          <img
            src="/assets/hand3-banner.webp"
            width={360}
            height={424}
            loading="lazy"
            decoding="async"
            {...{ fetchpriority: 'low' }}
            alt=""
            aria-hidden="true"
            className="wob absolute z-0 select-none -rotate-[8deg] md:left-11 md:bottom-[-58px] md:w-[164px] right-7 bottom-[-36px] w-[128px] h-auto"
          />

          {/* Banner Content */}
          <div className="relative z-10 max-w-[760px]">
            <span className="inline-flex items-center h-7 px-3 rounded-pill bg-paper border-[1.5px] border-slate text-[13px] font-medium text-slate">
              {adSlot.badge}
            </span>

            <h3 className="mt-4 mb-0 text-[24px] sm:text-[28px] md:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate">
              <span className="mark">{adSlot.titleMark}</span>
              {adSlot.title.replace(adSlot.titleMark, '')}
            </h3>

            <p className="mt-3 mb-0 text-[16px] sm:text-[17px] leading-[1.5] text-slate whitespace-pre-line">
              {adSlot.text}
            </p>
          </div>

          {/* Action Button */}
          <div className="relative z-10 flex-shrink-0">
            <a
              href={adSlot.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-s inline-flex items-center h-12 px-[26px] rounded-pill text-[17px] font-semibold no-underline"
            >
              {adSlot.buttonText}
            </a>
          </div>

          {/* Label "Реклама" */}
          <span className="absolute z-10 right-[22px] top-3.5 md:top-auto md:bottom-3 text-[12px] text-slate font-medium">
            {adSlot.label}
          </span>
        </aside>
      </div>
    </section>
  );
};
