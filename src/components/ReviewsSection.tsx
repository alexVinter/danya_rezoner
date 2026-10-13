import React from 'react';
import { reviewsData } from '../data/content';

export const ReviewsSection: React.FC = () => {
  if (!reviewsData || reviewsData.length === 0) return null;

  return (
    <section id="reviews" className="pt-16 md:pt-[120px] pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        {/* Header with 2 Flower Illustrations */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Отзывы
          </h2>
          <div className="flex items-end gap-1.5 -mb-1">
            <img
              src="/assets/flower-1.webp?v=2"
              alt=""
              aria-hidden="true"
              className="wob h-[72px] sm:h-[90px] md:h-[104px] w-auto select-none -rotate-[6deg]"
            />
            <img
              src="/assets/flower-2.webp?v=2"
              alt=""
              aria-hidden="true"
              className="wob h-[60px] sm:h-[76px] md:h-[90px] w-auto select-none rotate-[5deg]"
            />
          </div>
        </div>

        {/* 3 Pink Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((rev) => (
            <figure
              key={rev.id}
              className="m-0 bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-7 flex flex-col gap-6 min-h-[280px] sm:min-h-[300px]"
            >
              <blockquote className="m-0 text-[16px] sm:text-[17px] leading-[1.55] text-slate">
                «{rev.text}»
              </blockquote>

              <figcaption className="mt-auto pt-4 border-t border-slate">
                <span className="block text-[16px] font-semibold text-slate">
                  {rev.name}
                </span>
                <span className="block mt-0.5 text-[14px] text-slate">
                  {rev.role}, {rev.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
