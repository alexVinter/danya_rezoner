import React from 'react';
import { casesData } from '../data/content';

export const CasesSection: React.FC = () => {
  const { featured, cards, moreCases } = casesData;

  return (
    <section id="cases" className="mt-16 md:mt-[120px] bg-forest py-16 sm:py-24 md:py-[112px]">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <h2 className="m-0 mb-8 md:mb-12 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-paper">
          Кейсы
        </h2>

        {/* Featured Case: Full-width Lime Plate with Water Pistol */}
        <article className="g2 feat bg-lime rounded-card p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
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

            {/* Giant Metric with .feat-num for phone responsive */}
            <p className="feat-num mt-6 md:mt-7 mb-0 text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] font-bold tracking-[-0.04em] text-slate tabular-nums">
              {featured.metricMain}
            </p>

            {/* Title */}
            <h3 className="h3 mt-3.5 mb-0 text-[24px] sm:text-[28px] md:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate max-w-[560px]">
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
              <a
                href={`/cases/${featured.slug}`}
                aria-label="Читать кейс Контур.Экстерна"
                className="btn-s inline-flex items-center h-12 px-[26px] rounded-pill text-[17px] font-semibold no-underline"
              >
                Читать кейс
              </a>
            </div>
          </div>

          {/* Water Pistol Illustration with .feat-ill */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src="/assets/water-pistol-840.webp"
              srcSet="/assets/water-pistol-520.webp 520w, /assets/water-pistol-840.webp 840w"
              sizes="(min-width: 768px) 420px, (min-width: 640px) 360px, 300px"
              width={840}
              height={636}
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
              className="wob feat-ill w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] h-auto object-contain select-none -rotate-[12deg]"
            />
          </div>
        </article>

        {/* 3 Secondary Cards (.cards3) */}
        <div className="cards3 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="m-0 text-[15px] text-slate-soft tabular-nums whitespace-pre-line">
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
                <a
                  href={`/cases/${card.slug}`}
                  aria-label={`Читать кейс: ${card.title}`}
                  className="lnk font-semibold text-slate inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span>Читать кейс</span>
                  <span aria-hidden="true" className="text-orange font-semibold"> →</span>
                </a>
              </p>
            </article>
          ))}
        </div>

        {/* More Cases: 2 columns of .more cards (Elba removed per TZ) */}
        <p className="mt-10 mb-3.5 text-[16px] font-semibold text-paper">
          Ещё кейсы
        </p>
        <div className="cards2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moreCases.map((c, idx) => (
            <a
              key={idx}
              href={`/cases/${c.slug}`}
              className="more group text-left no-underline bg-transparent relative !pr-14 transition-colors hover:border-paper"
            >
              <span className="block text-[14px] text-[#CACBC4]">
                {c.company}
              </span>
              <span className="block mt-1 text-[17px] leading-[1.35] font-semibold text-paper whitespace-pre-line">
                {c.title}
              </span>
              <span
                aria-hidden="true"
                className="absolute top-4 right-5 text-[18px] font-semibold text-paper/80 group-hover:text-paper group-hover:translate-x-0.5 transition-all"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
