import React from 'react';
import { servicesData, siteConfig } from '../data/content';

interface ServicesSectionProps {
  onOpenService: (slug: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenService }) => {
  return (
    <section id="services" className="pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        {/* Header with Hands-on-keyboard Illustration */}
        <div className="flex items-end justify-between gap-6 mb-9">
          <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Услуги
          </h2>
          <img
            src="/assets/hands-keyboard.webp?v=2"
            alt=""
            aria-hidden="true"
            className="wob w-[160px] sm:w-[220px] md:w-[260px] h-auto select-none -mb-1.5"
          />
        </div>

        {/* 7 Horizontal Rows */}
        <div className="border-t border-line">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="svc-row grid grid-cols-1 md:grid-cols-[56px_minmax(0,4fr)_minmax(0,4fr)_minmax(0,3fr)] gap-4 md:gap-6 py-8 border-b border-line items-start px-3 md:px-4 -mx-3 md:-mx-4 rounded-card"
            >
              {/* Col 1: Number */}
              <span className="text-[22px] leading-[1.25] font-bold text-orange">
                {svc.number}
              </span>

              {/* Col 2: Title & Phrase */}
              <div>
                <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold tracking-[-0.01em] text-slate">
                  {svc.slug ? (
                    <button
                      onClick={() => onOpenService(svc.slug!)}
                      className="text-left font-bold text-slate hover:text-orange transition-colors lnk cursor-pointer bg-transparent border-0 p-0"
                    >
                      {svc.title}
                    </button>
                  ) : (
                    svc.title
                  )}
                </h3>

                {svc.badge && (
                  <span className="mt-2.5 inline-flex items-center h-7 px-3 rounded-pill bg-lime text-[13px] font-medium text-slate">
                    {svc.badge}
                  </span>
                )}

                <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate-soft">
                  {svc.phrase}
                </p>
              </div>

              {/* Col 3: For Whom & What's Inside */}
              <div className="text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                <p className="m-0 text-[13px] font-medium text-slate-soft">
                  Для кого
                </p>
                <p className="mt-0.5 mb-0 text-slate">
                  {svc.forWhom}
                </p>

                <p className="mt-3.5 mb-0 text-[13px] font-medium text-slate-soft">
                  Что внутри
                </p>
                <p className="mt-0.5 mb-0 text-slate">
                  {svc.whatsInside.join(' · ')}
                </p>
              </div>

              {/* Col 4: Price, Note & Button */}
              <div className="flex flex-col items-start gap-1.5">
                <p className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate tabular-nums">
                  {svc.price}
                </p>
                <p className="m-0 text-[13px] sm:text-[14px] leading-[1.45] text-slate-soft">
                  {svc.note}
                </p>

                {svc.hasDetailsPage && svc.slug ? (
                  <button
                    onClick={() => onOpenService(svc.slug!)}
                    className="btn-line mt-2.5 inline-flex items-center h-11 px-5 rounded-pill text-[15px] font-semibold cursor-pointer"
                  >
                    Подробнее
                  </button>
                ) : (
                  <a
                    href={siteConfig.telegramPersonalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line mt-2.5 inline-flex items-center h-11 px-5 rounded-pill text-[15px] font-semibold no-underline"
                  >
                    Обсудить
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
