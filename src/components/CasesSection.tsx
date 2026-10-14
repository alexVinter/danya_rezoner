import React from 'react';
import { casesData } from '../data/content';

interface CasesSectionProps {
  onOpenCase: (slug: string) => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ onOpenCase }) => {
  const { featured, cards, earlyCasesText, earlyCases } = casesData;

  return (
    <section id="cases" className="mt-16 md:mt-[120px] bg-forest py-16 sm:py-24 md:py-[112px]">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <h2 className="m-0 mb-8 md:mb-12 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-paper">
          Кейсы
        </h2>

        {/* Featured Case: Full-width Lime Plate with Water Pistol */}
        <article className="bg-lime rounded-card p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-slate text-[13px] font-medium text-slate bg-transparent"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Giant Metric */}
            <p className="mt-6 md:mt-7 mb-0 text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] font-bold tracking-[-0.04em] text-slate tabular-nums">
              {featured.metricMain}
            </p>

            {/* Title */}
            <h3 className="mt-3.5 mb-0 text-[24px] sm:text-[28px] md:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate max-w-[560px]">
              {featured.title}
            </h3>

            {/* Sub-metrics */}
            <div className="flex flex-wrap gap-7 sm:gap-10 mt-7">
              {featured.metrics.map((m, idx) => (
                <div key={idx}>
                  <p className="m-0 text-[24px] sm:text-[28px] leading-[1.1] font-bold text-slate tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-1.5 mb-0 text-[14px] text-slate">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => onOpenCase(featured.slug)}
                className="btn-s inline-flex items-center h-12 px-[26px] rounded-pill text-[17px] font-semibold cursor-pointer border-0"
              >
                Читать кейс
              </button>
            </div>
          </div>

          {/* Water Pistol Illustration */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src="/assets/water-pistol.webp?v=3"
              alt=""
              aria-hidden="true"
              className="wob w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] h-auto object-contain select-none -rotate-[12deg]"
            />
          </div>
        </article>

        {/* 3 Secondary Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-card p-6 sm:p-7 flex flex-col gap-3.5"
            >
              <p className="m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] text-orange tabular-nums">
                {card.metricMain}
              </p>

              <h3 className="m-0 text-[18px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                {card.title}
              </h3>

              {card.subtitle && (
                <p className="m-0 text-[15px] text-slate-soft tabular-nums">
                  {card.subtitle}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center h-[26px] px-2.5 rounded-pill border-[1.5px] border-slate text-[12px] font-medium text-slate"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-auto pt-2.5 mb-0 text-[16px]">
                <button
                  onClick={() => onOpenCase(card.slug)}
                  className="lnk font-semibold text-slate inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span>Читать кейс</span>
                  <span aria-hidden="true" className="text-orange font-semibold"> →</span>
                </button>
              </p>
            </article>
          ))}
        </div>

        {/* Early cases 2022 */}
        <p className="mt-8 mb-0 text-[15px] sm:text-[16px] leading-[1.6] text-[#CACBC4]">
          {earlyCasesText}{' '}
          <a
            href={earlyCases[0].href}
            onClick={(e) => { e.preventDefault(); onOpenCase(earlyCases[0].slug); }}
            className="lnk text-paper cursor-pointer"
          >
            {earlyCases[0].title}
          </a>{' '}
          и{' '}
          <a
            href={earlyCases[1].href}
            onClick={(e) => { e.preventDefault(); onOpenCase(earlyCases[1].slug); }}
            className="lnk text-paper cursor-pointer"
          >
            {earlyCases[1].title}
          </a>
        </p>
      </div>
    </section>
  );
};
