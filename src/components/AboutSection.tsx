import React from 'react';
import { aboutData } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="sec pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <h2 className="h2 m-0 mb-7 md:mb-12 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
          Обо мне
        </h2>

        <div className="about">
          {/* Left Column: Photo from TgConf */}
          <div>
            <img
              src="/assets/photo-tgconf.webp"
              alt="Даниил Винтер выступает на TgConf 2025"
              width={942}
              height={1262}
              className="w-full h-auto border-[1.5px] border-slate rounded-card object-cover select-none"
            />
          </div>

          {/* Right Column: Lead paragraph + 4 Facts (2x2 grid) */}
          <div>
            <p className="lead m-0 text-[19px] md:text-[22px] leading-[1.45] text-slate max-w-[760px]">
              {aboutData.intro}
            </p>

            <div className="facts mt-9">
              {aboutData.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="fact bg-white border-[1.5px] border-slate rounded-card p-6 md:p-[28px_32px]"
                >
                  <p className="fact-num m-0 text-[40px] md:text-[52px] leading-none font-bold tracking-[-0.03em] text-orange tabular-nums whitespace-nowrap">
                    {fact.num}
                  </p>
                  <p className="mt-3.5 mb-0 text-[17px] leading-[1.45] text-slate whitespace-pre-line">
                    {fact.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row of 4 Tiles below grid */}
        <div className="tiles mt-10">
          {aboutData.tiles.map((tile, idx) =>
            tile.url ? (
              <a
                key={idx}
                href={tile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tile block relative bg-white border-[1.5px] border-slate rounded-[16px] p-[14px_30px_14px_14px] md:p-[16px_44px_16px_18px] text-slate no-underline hover:border-orange transition-colors"
              >
                <span className="block text-[16px] font-semibold leading-[1.3]">
                  {tile.title}
                </span>
                <span className="block mt-1 text-[14px] text-slate-soft">
                  {tile.desc}
                </span>
                <svg
                  className="tile-arrow absolute top-3.5 right-3 md:top-[18px] md:right-[18px] text-slate transition-colors"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 12 12 4M6 4h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <div
                key={idx}
                className="tile block relative bg-white border-[1.5px] border-slate rounded-[16px] p-[14px_30px_14px_14px] md:p-[16px_44px_16px_18px] text-slate"
              >
                <span className="block text-[16px] font-semibold leading-[1.3]">
                  {tile.title}
                </span>
                <span className="block mt-1 text-[14px] text-slate-soft">
                  {tile.desc}
                </span>
              </div>
            )
          )}
        </div>

        {/* Link to Speaker */}
        <p className="mt-6 mb-0 text-[17px]">
          <a
            href={aboutData.speakerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lnk font-semibold text-slate"
          >
            Позвать спикером
          </a>
          <span aria-hidden="true" className="text-orange font-semibold"> →</span>
        </p>
      </div>
    </section>
  );
};
