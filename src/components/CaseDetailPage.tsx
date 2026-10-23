import React, { useEffect } from 'react';
import { casesList, CaseData } from '../data/cases';
import { siteConfig } from '../data/content';
import { LeadForm } from './LeadForm';

interface CaseDetailPageProps {
  caseSlug: string;
  onBackToHome: (hash?: string) => void;
  onSelectCase: (slug: string) => void;
  onOpenPrivacy?: () => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseSlug,
  onBackToHome,
  onSelectCase,
  onOpenPrivacy,
}) => {
  const currentCase: CaseData =
    casesList.find((c) => c.slug === caseSlug) || casesList[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseSlug]);

  const renderTitle = () => {
    if (!currentCase.titleHighlight) {
      return currentCase.title;
    }
    if (currentCase.title.includes(currentCase.titleHighlight)) {
      const parts = currentCase.title.split(currentCase.titleHighlight);
      return (
        <>
          {parts[0]}
          <span className="mark whitespace-nowrap">{currentCase.titleHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return (
      <>
        {currentCase.title}{' '}
        <span className="mark whitespace-nowrap">{currentCase.titleHighlight}</span>
      </>
    );
  };

  return (
    <div className="pb-16 md:pb-[120px]">
      {/* 1. Breadcrumbs & Hero */}
      <section className="pt-8">
        <div className="wrap">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-slate-soft flex items-center gap-2">
            <button
              onClick={() => onBackToHome('#cases')}
              className="lnk bg-transparent border-0 p-0 font-medium text-slate-soft cursor-pointer"
            >
              Кейсы
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-slate font-medium">{currentCase.breadcrumb}</span>
          </nav>

          <div className="g2 mt-8">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentCase.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-slate text-[13px] font-medium text-slate"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="h1 mt-5 mb-0 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate">
                {renderTitle()}
              </h1>

              {/* Lead */}
              <p className="mt-6 mb-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[620px]">
                {currentCase.lead}
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="flex justify-center mt-6 md:mt-0">
              <img
                src={currentCase.heroIllustration}
                alt=""
                aria-hidden="true"
                className={`wob select-none ${currentCase.heroIllustrationClass}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Banner */}
      <section className="pt-12 sm:pt-14">
        <div className="wrap">
          <div
            className={`metrics ${
              currentCase.metricsLayout === 'two'
                ? 'metrics-2'
                : currentCase.metricsLayout === 'elba'
                ? 'metrics-elba'
                : ''
            }`}
          >
            {currentCase.keyMetrics.map((m, idx) => (
              <div key={idx} className="metric">
                <p className="big-num m-0 text-slate">
                  {m.value}
                </p>
                <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.4] text-slate">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Done & Result (3 new cases) */}
      {currentCase.doneResult && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h2 className="h2 m-0 text-[32px] sm:text-[36px] md:text-[40px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {currentCase.doneResult.done.title}
                </h2>
                <ul className="mt-5 mb-0 pl-5 sm:pl-6 flex flex-col gap-2.5 text-[17px] sm:text-[18px] leading-[1.5] text-slate">
                  {currentCase.doneResult.done.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="h2 m-0 text-[32px] sm:text-[36px] md:text-[40px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {currentCase.doneResult.result.title}
                </h2>
                <ul className="mt-5 mb-0 pl-5 sm:pl-6 flex flex-col gap-2.5 text-[17px] sm:text-[18px] leading-[1.5] text-slate">
                  {currentCase.doneResult.result.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10 md:mt-12 mb-0 text-[20px] sm:text-[22px] leading-[1.45] font-semibold max-w-[860px] text-slate">
              {currentCase.doneResult.conclusion}
            </p>
          </div>
        </section>
      )}

      {/* 4. Stats Screenshot with Horizontal Scroll on Mobile (3 new cases) */}
      {currentCase.stats && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              {currentCase.stats.title}
            </h2>
            <figure className="tbl m-0 inline-block max-w-full bg-white border-[1.5px] border-slate rounded-card p-4">
              <img
                src={currentCase.stats.image.file}
                alt={currentCase.stats.image.alt}
                width={currentCase.stats.image.width}
                height={currentCase.stats.image.height}
                style={{
                  width: `${currentCase.stats.image.displayWidth}px`,
                  ['--mw' as any]: `${currentCase.stats.image.mobileWidth}px`,
                  height: 'auto',
                  borderRadius: '12px',
                }}
              />
            </figure>
            <p className="mt-3 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
              {currentCase.stats.caption}
            </p>
          </div>
        </section>
      )}

      {/* 5. Solution / "Что делал" (Old cases) */}
      {(currentCase.solutionParagraphs || currentCase.solutionList) && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <div
              className="g2 items-start"
              style={{ gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)' }}
            >
              <h2 className="h2 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {currentCase.solutionTitle || 'Решение'}
              </h2>
              <div>
                {currentCase.solutionList ? (
                  <ul className="m-0 pl-5 sm:pl-6 flex flex-col gap-2.5 text-[17px] sm:text-[18px] leading-[1.5] max-w-[720px] text-slate">
                    {currentCase.solutionList.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                ) : (
                  currentCase.solutionParagraphs?.map((p, idx) => (
                    <p
                      key={idx}
                      className={`m-0 leading-[1.5] max-w-[680px] text-slate ${
                        idx === 0 ? 'text-[18px] sm:text-[20px]' : 'mt-3.5 text-[16px] sm:text-[18px]'
                      }`}
                    >
                      {p}
                    </p>
                  ))
                )}

                {/* Solution cards inside right column (e.g. Extern) */}
                {currentCase.solutionCards && currentCase.solutionCardsPlacement === 'inside' && (
                  <div className="mt-8 flex flex-col gap-4">
                    {currentCase.solutionCards.map((sc, scIdx) => (
                      <div
                        key={scIdx}
                        className="bg-pink border-[1.5px] border-slate rounded-card p-6"
                      >
                        <h3 className="m-0 text-[20px] font-bold text-slate">
                          {sc.title}
                        </h3>
                        <p className="mt-2 mb-0 text-[16px] leading-[1.5] text-slate">
                          {sc.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Layout Specific: Comparison (Extern & Elba) */}
      {currentCase.layoutType === 'comparison' && currentCase.comparisonCards && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            {currentCase.comparisonTitle && (
              <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {currentCase.comparisonTitle}
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {[currentCase.comparisonCards.good, currentCase.comparisonCards.bad].map(
                (card, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col gap-5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center h-7 px-3.5 rounded-pill text-[13px] font-bold uppercase tracking-wider ${
                          card.badgeType === 'lime'
                            ? 'bg-lime text-slate'
                            : 'bg-pink text-slate'
                        }`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-auto rounded-input border border-line object-cover"
                    />

                    {/* Card metrics */}
                    <div className="flex gap-6 border-b border-line pb-4">
                      {card.metrics.map((cm, cmIdx) => (
                        <div key={cmIdx}>
                          <span
                            className={`block text-[28px] sm:text-[32px] font-bold tabular-nums leading-none ${
                              cm.highlight ? 'text-orange' : 'text-slate'
                            }`}
                          >
                            {cm.value}
                          </span>
                          <span className="block text-[13px] sm:text-[14px] text-slate-soft mt-1">
                            {cm.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Card text */}
                    {card.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="m-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>

            {currentCase.comparisonConclusion && (
              <p className="mt-8 mb-0 text-[16px] sm:text-[18px] leading-[1.55] max-w-[780px] text-slate">
                {currentCase.comparisonConclusion}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 7. Layout Specific: Creatives & Figure (HTML Academy Lead Magnet) */}
      {currentCase.layoutType === 'creatives-figure' && (
        <>
          {currentCase.creatives && (
            <section className="sec pt-16 md:pt-[120px]">
              <div className="wrap">
                <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  Креативы
                </h2>
                <div className="cards3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentCase.creatives.map((cr, idx) => (
                    <figure
                      key={idx}
                      className="m-0 bg-white border-[1.5px] border-slate rounded-card p-4"
                    >
                      <img
                        src={cr.image}
                        alt={cr.alt}
                        className="w-full h-auto rounded-xl"
                      />
                      <figcaption className="mt-4 mx-2 mb-1 text-[16px] text-slate">
                        CTR{' '}
                        <span
                          className={`text-[24px] font-bold tabular-nums ${
                            cr.highlight ? 'text-orange' : 'text-slate'
                          }`}
                        >
                          {cr.ctr}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {currentCase.figure && (
            <section className="sec pt-16 md:pt-[120px]">
              <div className="wrap">
                <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {currentCase.figure.title}
                </h2>
                <figure className="m-0 bg-white border-[1.5px] border-slate rounded-card p-5">
                  <img
                    src={currentCase.figure.image}
                    alt={currentCase.figure.alt}
                    className="w-full h-auto"
                  />
                </figure>
                {currentCase.figure.subheading && (
                  <h3 className="mt-8 mb-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                    {currentCase.figure.subheading}
                  </h3>
                )}
                {currentCase.figure.sublist && (
                  <ul className="mt-3.5 mb-0 pl-5 sm:pl-6 flex flex-col gap-2 text-[16px] sm:text-[17px] leading-[1.5] max-w-[760px] text-slate">
                    {currentCase.figure.sublist.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}
        </>
      )}

      {/* 8. Layout Specific: Gallery (HTML Academy Collab) */}
      {currentCase.layoutType === 'gallery' && currentCase.gallery && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Материалы
            </h2>
            <div className="cards4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentCase.gallery.map((g, idx) => (
                <img
                  key={idx}
                  src={g.image}
                  alt={g.alt}
                  className="w-full h-auto border-[1.5px] border-slate rounded-2xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. What Worked */}
      {currentCase.whatWorked && currentCase.whatWorked.length > 0 && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Что сработало
            </h2>
            <div
              className={`grid gap-6 ${
                currentCase.whatWorkedColumns === 3
                  ? 'grid-cols-1 md:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
              {currentCase.whatWorked.map((item, idx) => (
                <div
                  key={idx}
                  className="border-t border-line pt-6 flex flex-col gap-3"
                >
                  <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[16px] sm:text-[17px] leading-[1.5] text-slate">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Next Case (Следующий кейс) */}
      <section className="sec pt-16 md:pt-[120px]">
        <div className="wrap">
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
            <h2 className="h2 m-0 text-[28px] sm:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate">
              Следующий кейс
            </h2>
            <button
              onClick={() => onBackToHome('#cases')}
              className="lnk text-[17px] font-semibold text-slate bg-transparent border-0 cursor-pointer p-0"
            >
              Все кейсы
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSelectCase(currentCase.nextCase.slug)}
            className="w-full text-left case-link bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
          >
            <span className="case-num text-[56px] sm:text-[64px] md:text-[72px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
              {currentCase.nextCase.number}
            </span>
            <span>
              <span className="block text-[20px] sm:text-[22px] md:text-[24px] leading-[1.25] font-bold text-slate">
                {currentCase.nextCase.title}
              </span>
              <span className="block mt-2.5 text-[15px] sm:text-[16px] text-slate-soft">
                {currentCase.nextCase.text}
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* 11. CTA with Tiger */}
      <section id="contact" className="contact pt-36 sm:pt-48 md:pt-[210px]">
        <div className="wrap">
          <div className="cta g2 relative bg-orange rounded-plate p-6 sm:p-10 md:p-14">
            {/* Tiger Illustration Resting on Top */}
            <img
              src="/assets/tiger.webp?v=4"
              alt=""
              aria-hidden="true"
              className="wob cta-tiger select-none"
            />

            <div>
              <h2 className="h2 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                Давайте работать
                <br />
                <span className="mark inline-block mt-1">вместе</span>
              </h2>
              <p className="mt-5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-white max-w-[460px]">
                Пришлите ссылку на канал и опишите задачу своими словами. За 30 минут созвона забрифуемся, и я соберу стратегию под ваш проект.
              </p>
              <a
                href={siteConfig.telegramPersonalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-w mt-8 inline-flex items-center gap-2.5 h-14 px-7 rounded-pill text-[17px] font-semibold no-underline"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                </svg>
                <span>Написать в Telegram</span>
              </a>
            </div>

            <div>
              <LeadForm pageName={currentCase.breadcrumb} onOpenPrivacy={onOpenPrivacy} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
