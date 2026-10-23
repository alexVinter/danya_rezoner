import React, { useState } from 'react';
import { faqData, siteConfig, FaqItem } from '../data/content';

export interface FaqSectionProps {
  id?: string;
  title?: string;
  subtitle?: React.ReactNode;
  items?: FaqItem[];
  showCactus?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  id = 'faq',
  title = 'FAQ',
  subtitle,
  items = faqData,
  showCactus = true,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const defaultSubtitle = (
    <>
      Не нашли ответ —{' '}
      <a
        href={siteConfig.telegramPersonalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="lnk font-medium"
      >
        напишите в Telegram
      </a>
    </>
  );

  return (
    <section id={id} className="pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Heading, Subtitle & Optional Cactus */}
          <div className="md:col-span-4">
            <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              {title}
            </h2>

            <p className="mt-4 mb-0 text-[16px] sm:text-[17px] leading-[1.5] text-slate">
              {subtitle || defaultSubtitle}
            </p>

            {showCactus && (
              <img
                src="/assets/cactus.webp"
                alt=""
                aria-hidden="true"
                className="wob hidden md:block mt-12 w-[190px] h-auto select-none rotate-[4deg]"
              />
            )}
          </div>

          {/* Right Column: Accordion Items */}
          <div className="md:col-span-8 flex flex-col gap-3">
            {items.map((item, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white border-[1.5px] border-slate rounded-faq overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer bg-transparent border-0"
                  >
                    <span className="text-[18px] sm:text-[20px] leading-[1.3] font-semibold text-slate">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 w-9 h-9 rounded-pill bg-orange text-white inline-flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="px-5 sm:px-6 pb-6 pt-0 text-[16px] sm:text-[17px] leading-[1.55] text-slate max-w-[700px] animate-in fade-in duration-150"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
