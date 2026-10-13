import React from 'react';
import { methodologySteps } from '../data/methodology';

export const MethodologySection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-ink/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Заголовок с персонажем-аватаром strictly as in ТЗ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-2">
              Как работаю
            </h2>
            <p className="text-base text-ink-muted">
              5 шагов: от созвона до еженедельных отчётов.
            </p>
          </div>

          {/* Персонаж-аватар (зелёная голова/рыжая кофта/шаги) strictly as in ТЗ */}
          <div className="w-20 sm:w-24 select-none pointer-events-none">
            <img
              src="/images/walker.png"
              alt="Персонаж-проводник"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* 5 шагов списком */}
        <div className="space-y-4">
          {methodologySteps.map((step) => (
            <div
              key={step.step}
              className="bg-canvas border border-ink/20 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-display text-3xl font-bold text-ink">
                  0{step.step}
                </span>
                <span className="text-xs font-mono text-ink-muted px-2.5 py-1 rounded bg-white border border-ink/10">
                  {step.duration}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Честное «работаю один» как в Designjoy strictly from references */}
        <div className="mt-8 p-4 rounded-xl bg-canvas border border-ink/15 text-xs text-ink-muted text-center">
          Честное «работаю один»: на созвоны выхожу сам, рекламные кампании веду сам, отчёты присылаю лично — без посредников и стажёров.
        </div>

      </div>
    </section>
  );
};
