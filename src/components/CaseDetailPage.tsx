import React, { useState, useEffect } from 'react';
import { casesList, CaseData } from '../data/cases';
import { siteConfig } from '../data/content';

interface CaseDetailPageProps {
  caseSlug: string;
  onBackToHome: (hash?: string) => void;
  onSelectCase: (slug: string) => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseSlug,
  onBackToHome,
  onSelectCase,
}) => {
  const currentCase: CaseData =
    casesList.find((c) => c.slug === caseSlug) || casesList[0];

  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    project: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setFormData({ name: '', telegram: '', project: '', consent: false });
    window.scrollTo(0, 0);
  }, [caseSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.telegram.trim() || !formData.consent) {
      return;
    }

    const payload = {
      ...formData,
      page: currentCase.breadcrumb,
      caseSlug: currentCase.slug,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('danya_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('danya_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const renderTitle = () => {
    const parts = currentCase.title.split(currentCase.titleHighlight);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="mark whitespace-nowrap">{currentCase.titleHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return currentCase.title;
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

      {/* 3. Solution */}
      <section className="sec pt-16 md:pt-[120px]">
        <div className="wrap">
          <div
            className="g2 items-start"
            style={{ gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)' }}
          >
            <h2 className="h2 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Решение
            </h2>
            <div>
              {currentCase.solutionParagraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`m-0 leading-[1.5] max-w-[680px] text-slate ${
                    idx === 0 ? 'text-[18px] sm:text-[20px]' : 'mt-3.5 text-[16px] sm:text-[18px]'
                  }`}
                >
                  {p}
                </p>
              ))}

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

          {/* Solution cards placed below full width (e.g. Conference) */}
          {currentCase.solutionCards && currentCase.solutionCardsPlacement === 'below' && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCase.solutionCards.map((sc, scIdx) => (
                <div
                  key={scIdx}
                  className="bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-7 flex flex-col gap-2.5"
                >
                  <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                    {sc.title}
                  </h3>
                  <p className="m-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                    {sc.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Layout Specific Sections */}

      {/* Layout A: Comparison (Extern & Elba) */}
      {currentCase.layoutType === 'comparison' && currentCase.comparisonCards && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            {currentCase.comparisonTitle && (
              <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {currentCase.comparisonTitle}
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Bad card / or Good card depending on order */}
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

      {/* Layout B: Conference MediaPair & Table */}
      {currentCase.layoutType === 'conference' && (
        <>
          {currentCase.mediaPair && (
            <section className="sec pt-16 md:pt-[120px]">
              <div className="wrap">
                <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {currentCase.mediaPair.title}
                </h2>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  <div className="md:col-span-8 bg-white border-[1.5px] border-slate rounded-card p-4 sm:p-5">
                    <img
                      src={currentCase.mediaPair.left.image}
                      alt={currentCase.mediaPair.left.alt}
                      className="w-full h-auto rounded-input"
                    />
                    {currentCase.mediaPair.left.caption && (
                      <p className="mt-3 mb-1 text-[14px] sm:text-[15px] text-slate-soft">
                        {currentCase.mediaPair.left.caption}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-4 bg-white border-[1.5px] border-slate rounded-card p-4 sm:p-5">
                    <img
                      src={currentCase.mediaPair.right.image}
                      alt={currentCase.mediaPair.right.alt}
                      className="w-full h-auto rounded-input"
                    />
                    {currentCase.mediaPair.right.caption && (
                      <p className="mt-3 mb-1 text-[14px] sm:text-[15px] text-slate-soft">
                        {currentCase.mediaPair.right.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {currentCase.tableRows && (
            <section className="sec pt-16 md:pt-[120px]">
              <div className="wrap">
                <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {currentCase.tableTitle || 'CPL по сегментам'}
                </h2>
                <div className="border-t border-line">
                  {currentCase.tableRows.map((tr, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-4 sm:py-5 border-b border-line gap-4 text-[16px] sm:text-[18px]"
                    >
                      <span className="font-medium text-slate">{tr.segment}</span>
                      <span
                        className={`font-bold tabular-nums text-[20px] sm:text-[22px] ${
                          tr.highlight ? 'text-orange' : 'text-slate'
                        }`}
                      >
                        {tr.cpl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Layout C: Funnel before/after (Webinars) */}
      {currentCase.layoutType === 'funnel' && currentCase.funnelCards && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Было и стало
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col gap-4">
                <span className="inline-flex self-start items-center h-7 px-3.5 rounded-pill bg-pink text-[13px] font-bold uppercase tracking-wider text-slate">
                  {currentCase.funnelCards.before.badge}
                </span>
                <img
                  src={currentCase.funnelCards.before.image}
                  alt=""
                  className="w-full h-auto rounded-input border border-line"
                />
                <h3 className="m-0 text-[20px] font-bold text-slate">
                  {currentCase.funnelCards.before.title}
                </h3>
                <p className="m-0 text-[15px] sm:text-[16px] text-slate-soft">
                  {currentCase.funnelCards.before.desc}
                </p>
              </div>

              <div className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col gap-4">
                <span className="inline-flex self-start items-center h-7 px-3.5 rounded-pill bg-lime text-[13px] font-bold uppercase tracking-wider text-slate">
                  {currentCase.funnelCards.after.badge}
                </span>
                <img
                  src={currentCase.funnelCards.after.image}
                  alt=""
                  className="w-full h-auto rounded-input border border-line"
                />
                <h3 className="m-0 text-[20px] font-bold text-slate">
                  {currentCase.funnelCards.after.title}
                </h3>
                <p className="m-0 text-[15px] sm:text-[16px] text-slate-soft">
                  {currentCase.funnelCards.after.desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Layout D: Creatives & Figure (HTML Academy Lead Magnet) */}
      {currentCase.layoutType === 'creatives-figure' && (
        <>
          {currentCase.creatives && (
            <section className="sec pt-16 md:pt-[120px]">
              <div className="wrap">
                <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  Креативы
                </h2>
                <div className="cards3">
                  {currentCase.creatives.map((cr, idx) => (
                    <figure
                      key={idx}
                      className="m-0 bg-white border-[1.5px] border-slate rounded-card p-4 flex flex-col"
                    >
                      <img
                        src={cr.image}
                        alt={cr.alt}
                        className="w-full h-auto rounded-input"
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
                    className="w-full h-auto rounded-input"
                  />
                </figure>
                <p className="mt-8 mb-0 text-[18px] sm:text-[20px] leading-[1.5] max-w-[780px] text-slate">
                  {currentCase.figure.caption}
                </p>
              </div>
            </section>
          )}
        </>
      )}

      {/* Layout E: Gallery (HTML Academy Collab) */}
      {currentCase.layoutType === 'gallery' && currentCase.gallery && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Материалы
            </h2>
            <div className="cards4">
              {currentCase.gallery.map((g, idx) => (
                <img
                  key={idx}
                  src={g.image}
                  alt={g.alt}
                  className="w-full h-auto border-[1.5px] border-slate rounded-card"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. What Worked (Что сработало) */}
      {currentCase.whatWorked && currentCase.whatWorked.length > 0 && (
        <section className="sec pt-16 md:pt-[120px]">
          <div className="wrap">
            <h2 className="h2 m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Что сработало
            </h2>
            <div
              className={`worked grid gap-8 ${
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

      {/* 6. Next Case (Следующий кейс) */}
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
            className="w-full text-left g2 case-link bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 md:p-10 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
          >
            <span className="case-num text-[56px] sm:text-[64px] md:text-[72px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
              {currentCase.nextCase.metricMain}
            </span>
            <span>
              <span className="block text-[20px] sm:text-[22px] md:text-[24px] leading-[1.25] font-bold text-slate">
                {currentCase.nextCase.title}
              </span>
              <span className="block mt-2.5 text-[15px] sm:text-[16px] text-slate-soft">
                {currentCase.nextCase.tags}
              </span>
              <span className="inline-block mt-3.5 text-[16px] font-semibold text-slate">
                <span className="lnk">Читать кейс</span>
                <span aria-hidden="true" className="text-orange"> →</span>
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* 7. CTA with Tiger */}
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
                Давайте работать <span className="mark">вместе</span>
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
              {submitted ? (
                <div className="bg-white rounded-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <span className="w-12 h-12 rounded-pill bg-lime text-slate flex items-center justify-center text-xl font-bold mb-3">
                    ✓
                  </span>
                  <h3 className="m-0 text-[22px] font-bold text-slate mb-2">Заявка у меня!</h3>
                  <p className="m-0 text-[16px] text-slate-soft">
                    Напишу вам в Telegram в течение рабочего дня.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-card p-6 sm:p-8 flex flex-col gap-4 text-slate"
                >
                  <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                    <span>Имя *</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Как к вам обращаться"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                    <span>Telegram *</span>
                    <input
                      type="text"
                      name="telegram"
                      required
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                    <span>Ссылка на канал</span>
                    <input
                      type="text"
                      name="project"
                      placeholder="t.me/channel или сайт"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange"
                    />
                  </label>

                  <label className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-slate mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="flex-none w-5 h-5 mt-0.5 accent-orange"
                    />
                    <span>
                      Согласен на обработку персональных данных и с{' '}
                      <span className="lnk">политикой конфиденциальности</span>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="btn-o mt-1 h-14 border-0 rounded-pill text-[17px] font-semibold cursor-pointer"
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
