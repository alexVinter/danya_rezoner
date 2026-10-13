import React, { useState } from 'react';
import { siteConfig } from '../data/content';
import { getCaseBySlug, CaseData } from '../data/cases';

interface CaseDetailPageProps {
  caseSlug: string;
  onBackToHome: () => void;
  onSelectCase: (slug: string) => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseSlug,
  onBackToHome,
  onSelectCase,
}) => {
  const currentCase: CaseData = getCaseBySlug(caseSlug);

  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    project: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.telegram || !formData.consent) return;
    setSubmitted(true);
  };

  // Helper to highlight part of title
  const renderTitle = () => {
    const { title, titleHighlight } = currentCase;
    if (!titleHighlight || !title.includes(titleHighlight)) {
      return title;
    }
    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="mark whitespace-nowrap">{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="pt-8 pb-0">
      <div className="max-w-site mx-auto px-4 md:px-10">
        
        {/* Breadcrumbs */}
        <nav aria-label="Хлебные крошки" className="text-[14px] text-slate-soft flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="lnk text-slate-soft bg-transparent border-0 p-0 cursor-pointer text-[14px]"
          >
            Кейсы
          </button>
          <span aria-hidden="true" className="text-slate-soft">/</span>
          <span className="text-slate font-medium">{currentCase.breadcrumb}</span>
        </nav>

        {/* 1. Hero Block */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
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
            <h1 className="mt-5 mb-0 text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate">
              {renderTitle()}
            </h1>

            {/* Lead */}
            <p className="mt-6 mb-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[620px]">
              {currentCase.lead}
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="md:col-span-5 flex justify-center items-center mt-6 md:mt-0">
            <img
              src={currentCase.heroIllustration}
              alt=""
              aria-hidden="true"
              className={`wob select-none ${currentCase.heroIllustrationClass}`}
            />
          </div>
        </div>

        {/* 2. Key Metrics Banner */}
        <div className="mt-14">
          <div className={`bg-lime border-[1.5px] border-slate rounded-card p-6 sm:p-10 grid grid-cols-1 ${
            currentCase.keyMetrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
          } gap-6 sm:gap-8`}>
            {currentCase.keyMetrics.map((m, idx) => (
              <div
                key={idx}
                className={
                  idx > 0
                    ? 'sm:border-l sm:border-slate/30 sm:pl-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate/20'
                    : ''
                }
              >
                <p className="m-0 text-[36px] sm:text-[44px] md:text-[48px] leading-none font-bold tracking-[-0.03em] text-slate tabular-nums">
                  {m.value}
                </p>
                <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.4] text-slate">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Решение & Стратегия */}
        <section className="pt-16 md:pt-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <h2 className="md:col-span-4 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Решение
            </h2>

            <div className="md:col-span-8">
              <p className="m-0 text-[18px] sm:text-[20px] leading-[1.5] text-slate max-w-[680px]">
                {currentCase.solutionLead}
              </p>

              {/* Solution cards if available */}
              {currentCase.solutionCards && currentCase.solutionCards.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentCase.solutionCards.map((card, idx) => (
                    <div key={idx} className="bg-pink border-[1.5px] border-slate rounded-card p-6">
                      <h3 className="m-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 mb-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. LAYOUT SPECIFIC SECTIONS */}

        {/* TYPE A: Comparison Layout (Extern & Elba) */}
        {currentCase.layoutType === 'comparison' && currentCase.comparisonCards && (
          <>
            {/* Good Approach */}
            <section className="pt-16 md:pt-[120px]">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {currentCase.slug === 'elba' ? 'Рабочий подход' : 'Что изменил'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
                <figure className="md:col-span-7 m-0 bg-white border-[1.5px] border-slate rounded-card p-6">
                  <img
                    src={currentCase.comparisonCards.good.image}
                    alt={currentCase.comparisonCards.good.imageAlt}
                    className="w-full h-auto rounded-lg select-none"
                  />
                </figure>

                <div className="md:col-span-5">
                  <span className={`inline-flex items-center h-7 px-3 rounded-pill text-[13px] font-medium text-slate ${
                    currentCase.comparisonCards.good.badgeType === 'lime' ? 'bg-lime' : 'bg-pink'
                  }`}>
                    {currentCase.comparisonCards.good.badge}
                  </span>

                  <div className="mt-5 flex flex-wrap gap-8">
                    {currentCase.comparisonCards.good.metrics.map((m, idx) => (
                      <div key={idx}>
                        <p className={`m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] tabular-nums ${
                          m.highlight ? 'text-orange' : 'text-slate'
                        }`}>
                          {m.value}
                        </p>
                        <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {currentCase.comparisonCards.good.paragraphs.map((p, idx) => (
                    <p key={idx} className={`${idx === 0 ? 'mt-6' : 'mt-3.5'} mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Bad / Test Failed Approach */}
            <section className="pt-16 md:pt-[120px]">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {currentCase.slug === 'elba' ? 'Тест видеоформата провалился' : 'Первый тест провалился'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
                <figure className="md:col-span-7 m-0 bg-white border-[1.5px] border-slate rounded-card p-6">
                  <img
                    src={currentCase.comparisonCards.bad.image}
                    alt={currentCase.comparisonCards.bad.imageAlt}
                    className="w-full h-auto rounded-lg select-none"
                  />
                </figure>

                <div className="md:col-span-5">
                  <span className={`inline-flex items-center h-7 px-3 rounded-pill text-[13px] font-medium text-slate ${
                    currentCase.comparisonCards.bad.badgeType === 'pink' ? 'bg-pink' : 'bg-lime'
                  }`}>
                    {currentCase.comparisonCards.bad.badge}
                  </span>

                  <div className="mt-5 flex flex-wrap gap-8">
                    {currentCase.comparisonCards.bad.metrics.map((m, idx) => (
                      <div key={idx}>
                        <p className={`m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] tabular-nums ${
                          m.highlight ? 'text-orange' : 'text-slate'
                        }`}>
                          {m.value}
                        </p>
                        <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {currentCase.comparisonCards.bad.paragraphs.map((p, idx) => (
                    <p key={idx} className={`${idx === 0 ? 'mt-6' : 'mt-3.5'} mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* TYPE B: Conference Layout (Campaign cards + Creatives + Results Table) */}
        {currentCase.layoutType === 'conference' && (
          <>
            {/* 3 Strategy Cards */}
            {currentCase.campaignCards && (
              <section className="pt-16 md:pt-[100px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentCase.campaignCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-flex items-center h-7 px-3 rounded-pill bg-pink text-[13px] font-semibold text-slate mb-4">
                          0{idx + 1}
                        </span>
                        <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                          {card.title}
                        </h3>
                        <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.55] text-slate">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Creative Showcase */}
            {currentCase.creativesImage && (
              <section className="pt-16 md:pt-[100px]">
                <h2 className="m-0 mb-8 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  Креативы в ВК и Директе
                </h2>
                <figure className="m-0 bg-white border-[1.5px] border-slate rounded-card p-4 sm:p-8">
                  <img
                    src={currentCase.creativesImage}
                    alt={currentCase.creativesAlt || ''}
                    className="w-full h-auto rounded-lg select-none"
                  />
                </figure>
              </section>
            )}

            {/* Results Banner & CPL Table */}
            {currentCase.tableRows && (
              <section className="pt-16 md:pt-[100px]">
                <div className="bg-[#313A43] text-paper rounded-card p-6 sm:p-10 mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] leading-[1.15] font-bold text-paper">
                      {currentCase.resultsBanner?.headline}
                    </h3>
                    <p className="mt-2 mb-0 text-[16px] sm:text-[18px] text-lime font-medium">
                      {currentCase.resultsBanner?.subline}
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-4 py-2 rounded-pill bg-lime text-slate text-[14px] font-bold whitespace-nowrap">
                    Результаты по сегментам
                  </span>
                </div>

                <div className="overflow-hidden rounded-card border-[1.5px] border-slate bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-orange text-white border-b border-slate">
                        <th className="py-4 px-6 sm:px-8 text-[16px] sm:text-[18px] font-bold">
                          Канал / Сегмент аудитории
                        </th>
                        <th className="py-4 px-6 sm:px-8 text-[16px] sm:text-[18px] font-bold text-right">
                          CPL (стоимость лида)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {currentCase.tableRows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-[#FAF8F5] transition-colors"
                        >
                          <td className="py-4 px-6 sm:px-8 text-[15px] sm:text-[17px] text-slate font-medium">
                            {row.segment}
                          </td>
                          <td className="py-4 px-6 sm:px-8 text-[16px] sm:text-[19px] text-orange font-bold tabular-nums text-right whitespace-nowrap">
                            {row.cpl}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}

        {/* TYPE C: Funnel Schemes Layout (Webinars) */}
        {currentCase.layoutType === 'funnel' && currentCase.funnelCards && (
          <>
            {/* Scheme 1: Было */}
            <section className="pt-16 md:pt-[100px]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                <div className="md:col-span-8">
                  <span className="inline-flex items-center h-7 px-3 rounded-pill bg-pink text-[13px] font-bold text-slate">
                    {currentCase.funnelCards.before.badge.toUpperCase()}
                  </span>
                  <h2 className="mt-3 mb-0 text-[26px] sm:text-[34px] leading-[1.2] font-bold text-slate">
                    {currentCase.funnelCards.before.title}
                  </h2>
                  <p className="mt-2.5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-slate">
                    {currentCase.funnelCards.before.desc}
                  </p>
                </div>
              </div>

              <figure className="m-0 bg-white border-[1.5px] border-slate rounded-card p-4 sm:p-8">
                <img
                  src={currentCase.funnelCards.before.image}
                  alt={currentCase.funnelCards.before.title}
                  className="w-full h-auto rounded-lg select-none"
                />
              </figure>
            </section>

            {/* Scheme 2: Стало */}
            <section className="pt-16 md:pt-[100px]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                <div className="md:col-span-8">
                  <span className="inline-flex items-center h-7 px-3 rounded-pill bg-lime text-[13px] font-bold text-slate">
                    {currentCase.funnelCards.after.badge.toUpperCase()}
                  </span>
                  <h2 className="mt-3 mb-0 text-[26px] sm:text-[34px] leading-[1.2] font-bold text-slate">
                    {currentCase.funnelCards.after.title}
                  </h2>
                  <p className="mt-2.5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-slate">
                    {currentCase.funnelCards.after.desc}
                  </p>
                </div>
              </div>

              <figure className="m-0 bg-white border-[1.5px] border-slate rounded-card p-4 sm:p-8">
                <img
                  src={currentCase.funnelCards.after.image}
                  alt={currentCase.funnelCards.after.title}
                  className="w-full h-auto rounded-lg select-none"
                />
              </figure>
            </section>

            {/* Big Results Banner */}
            {currentCase.resultsBanner && (
              <section className="pt-16 md:pt-[80px]">
                <div className="bg-lime border-[1.5px] border-slate rounded-card p-6 sm:p-10 text-center">
                  <h3 className="m-0 text-[28px] sm:text-[36px] md:text-[44px] leading-[1.15] font-bold text-slate max-w-[800px] mx-auto">
                    {currentCase.resultsBanner.headline}
                  </h3>
                  <p className="mt-4 mb-0 text-[18px] sm:text-[20px] font-semibold text-orange">
                    {currentCase.resultsBanner.subline}
                  </p>
                </div>
              </section>
            )}
          </>
        )}

        {/* 5. Что сработало */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Что сработало
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-line">
            {currentCase.whatWorked.map((item, idx) => (
              <div key={idx} className="py-7 border-b border-line">
                <h3 className="m-0 text-[19px] sm:text-[21px] leading-[1.3] font-bold text-slate">
                  {item.title}
                </h3>
                <p className="mt-2.5 mb-0 text-[15px] sm:text-[17px] leading-[1.55] text-slate">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Следующий кейс */}
        <section className="pt-16 md:pt-[120px]">
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
            <h2 className="m-0 text-[28px] sm:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate">
              Следующий кейс
            </h2>
            <button
              onClick={onBackToHome}
              className="lnk text-[16px] sm:text-[17px] font-semibold text-slate bg-transparent border-0 p-0 cursor-pointer"
            >
              Все кейсы
            </button>
          </div>

          <button
            onClick={() => onSelectCase(currentCase.nextCase.slug)}
            className="w-full text-left bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-4 md:gap-6 items-center cursor-pointer hover:border-orange transition-colors"
          >
            <span className="text-[52px] sm:text-[64px] md:text-[72px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
              {currentCase.nextCase.metricMain}
            </span>
            <span>
              <span className="block text-[20px] sm:text-[24px] leading-[1.25] font-bold text-slate">
                {currentCase.nextCase.title}
              </span>
              <span className="block mt-2.5 text-[15px] sm:text-[16px] text-slate-soft">
                {currentCase.nextCase.tags}
              </span>
            </span>
          </button>
        </section>

        {/* 7. Call to action */}
        <section id="contact" className="pt-36 sm:pt-48 md:pt-[210px] pb-16 md:pb-[120px]">
          <div className="relative bg-orange rounded-plate p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            <img
              src="/assets/tiger.webp?v=3"
              alt=""
              aria-hidden="true"
              className="wob absolute select-none left-5 sm:left-10 md:left-12 -top-24 sm:-top-32 md:-top-[164px] w-[220px] sm:w-[280px] md:w-[340px] z-10"
            />

            <div className="md:col-span-6 relative z-10">
              <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
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
                <span>Написать в Telegram</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Form */}
            <div className="md:col-span-6 relative z-10 bg-white rounded-card p-6 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="m-0 text-[24px] font-bold text-slate">
                    Спасибо! Заявка отправлена
                  </p>
                  <p className="mt-3 mb-0 text-[16px] text-slate-soft">
                    Отвечу вам в Telegram в течение нескольких часов.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-slate mb-1.5">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Алексей"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-paper text-slate text-[16px] focus:outline-none focus:border-slate"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-slate mb-1.5">
                      Ник в Telegram
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-paper text-slate text-[16px] focus:outline-none focus:border-slate"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-slate mb-1.5">
                      Ссылка на проект или канал
                    </label>
                    <input
                      type="text"
                      placeholder="t.me/yourchannel"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-paper text-slate text-[16px] focus:outline-none focus:border-slate"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 mt-2">
                    <input
                      type="checkbox"
                      id="consent-case"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-line text-orange focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="consent-case" className="text-[13px] leading-[1.4] text-slate-soft cursor-pointer">
                      Согласен на обработку персональных данных
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-p mt-3 w-full h-12 rounded-pill text-[16px] font-semibold flex items-center justify-center cursor-pointer border-0"
                  >
                    Обсудить проект
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
