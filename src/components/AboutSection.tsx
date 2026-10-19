import React from 'react';
import { aboutData } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <h2 className="m-0 mb-8 md:mb-12 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
          Обо мне
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Danya's Photo */}
          <div className="md:col-span-4">
            <div className="overflow-hidden border-[1.5px] border-slate rounded-card shadow-sm aspect-[3/4] w-full bg-paper">
              <img
                src="/assets/danya-about.webp?v=1"
                alt="Даниил Винтер"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>

          {/* Right Column: Intro, Experience Rows, Activity Tiles, Speaker Link */}
          <div className="md:col-span-8">
            <p className="m-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[640px]">
              {aboutData.intro}
            </p>

            {/* Experience Rows */}
            <div className="mt-8 border-t border-line">
              {aboutData.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)_auto] gap-2 sm:gap-4 items-baseline py-4 border-b border-line"
                >
                  <span className="text-[14px] font-medium text-slate-soft">
                    {exp.period}
                  </span>
                  <div>
                    <span className="text-[17px] font-semibold text-slate">
                      {exp.place}
                    </span>
                    <span className="block mt-0.5 text-[15px] text-slate-soft">
                      {exp.role}
                    </span>
                  </div>
                  <span className="text-[18px] sm:text-[20px] font-bold text-orange sm:whitespace-nowrap tabular-nums">
                    {exp.metric}
                  </span>
                </div>
              ))}
            </div>

            {/* 4 Activity Tiles */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {aboutData.tiles.map((tile, idx) => (
                tile.url ? (
                  <a
                    key={idx}
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border-[1.5px] border-slate rounded-[16px] p-4 text-left no-underline hover:border-orange transition-colors"
                  >
                    <span className="block text-[16px] font-semibold text-slate leading-[1.3]">
                      {tile.title}
                    </span>
                    <span className="block mt-1 text-[14px] text-slate-soft">
                      {tile.desc}
                    </span>
                  </a>
                ) : (
                  <div
                    key={idx}
                    className="bg-white border-[1.5px] border-slate rounded-[16px] p-4"
                  >
                    <p className="m-0 text-[16px] font-semibold text-slate leading-[1.3]">
                      {tile.title}
                    </p>
                    <p className="mt-1 mb-0 text-[14px] text-slate-soft">
                      {tile.desc}
                    </p>
                  </div>
                )
              ))}
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
        </div>
      </div>
    </section>
  );
};
