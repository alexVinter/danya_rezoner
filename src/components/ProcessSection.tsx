import React from 'react';
import { processSteps, processBannerText } from '../data/content';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        {/* Header with Rainbow Illustration */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Как работаю
          </h2>
          <img
            src="/assets/rainbow.webp?v=2"
            alt=""
            aria-hidden="true"
            className="wob w-[150px] sm:w-[190px] md:w-[230px] h-auto select-none -mb-1"
          />
        </div>

        {/* 5 Steps Chain with Connecting SVG Arrows */}
        <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {processSteps.map((step, idx) => {
            const hasArrow = idx < processSteps.length - 1;
            return (
              <li
                key={step.number}
                className="relative bg-white border-[1.5px] border-slate rounded-card p-6 flex flex-col gap-3"
              >
                <span className="text-[36px] sm:text-[40px] leading-none font-bold text-orange tabular-nums">
                  {step.number}
                </span>

                <span className="self-start inline-flex items-center h-7 px-3 rounded-pill bg-pink text-[13px] font-medium text-slate">
                  {step.duration}
                </span>

                <h3 className="mt-1 mb-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                  {step.title}
                </h3>

                <p className="m-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                  {step.phrase}
                </p>

                {/* Arrow connecting to next step (visible on large screen) */}
                {hasArrow && (
                  <svg
                    aria-hidden="true"
                    width="28"
                    height="12"
                    viewBox="0 0 28 12"
                    className="hidden lg:block absolute right-[-29px] top-[42px] pointer-events-none z-10"
                  >
                    <path
                      d="M1 6h24M19 1l6 5-6 5"
                      fill="none"
                      stroke="#313A43"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>

        {/* Pink Banner: "Работаю один..." */}
        <div className="mt-8 bg-pink rounded-card px-7 py-5 text-[16px] sm:text-[17px] leading-[1.5] text-slate">
          {processBannerText}
        </div>
      </div>
    </section>
  );
};
