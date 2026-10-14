import React, { useState, useEffect } from 'react';
import { servicesData, ServiceData, ServiceBlock } from '../data/services';
import { siteConfig } from '../data/content';

interface ServiceDetailPageProps {
  serviceSlug: string;
  onBackToHome: (hash?: string) => void;
  onOpenCase: (caseSlug: string) => void;
  onOpenService: (serviceSlug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceSlug,
  onBackToHome,
  onOpenCase,
  onOpenService: _onOpenService,
}) => {
  const currentService: ServiceData =
    servicesData.find((s) => s.slug === serviceSlug) || servicesData[0];

  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    project: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Reset form state on service change
  useEffect(() => {
    setSubmitted(false);
    setFormData({ name: '', telegram: '', project: '', consent: false });
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.telegram.trim() || !formData.consent) {
      return;
    }

    const payload = {
      ...formData,
      page: currentService.breadcrumb,
      serviceSlug: currentService.slug,
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

  const renderBlock = (block: ServiceBlock, index: number) => {
    switch (block.type) {
      case 'quote':
        return (
          <section key={index} className="pt-16 md:pt-[112px]">
            <div className="wrap">
              <h2 className="m-0 mb-8 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <figure className="quote m-0 bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-10 md:p-14">
                <blockquote className="quote-text m-0 text-[22px] sm:text-[26px] md:text-[30px] leading-[1.25] font-bold tracking-[-0.015em] max-w-[960px] text-slate">
                  {block.quote}
                </blockquote>
                <figcaption className="mt-5 text-[16px] sm:text-[18px] leading-[1.55] max-w-[780px] text-slate">
                  {block.caption}
                </figcaption>
              </figure>
              {block.paragraph && (
                <p className="mt-6 mb-0 text-[16px] sm:text-[18px] leading-[1.55] max-w-[780px] text-slate">
                  {block.paragraph}
                </p>
              )}
            </div>
          </section>
        );

      case 'rows':
        return (
          <section key={index} id={block.id} className="pt-16 md:pt-[120px] scroll-mt-8 md:scroll-mt-12">
            <div className="wrap">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <div className="border-t border-line">
                {block.items.map((item, idx) => (
                  <div key={idx} className="row2">
                    <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                      {item.title}
                    </h3>
                    <p className="m-0 text-[16px] sm:text-[18px] leading-[1.5] max-w-[640px] text-slate">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'steps':
        return (
          <section key={index} id={block.id} className="pt-16 md:pt-[120px] scroll-mt-8 md:scroll-mt-12">
            <div className="wrap">
              <h2 className="m-0 mb-10 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <ol className={`steps ${block.items.length === 5 ? 'steps-5' : ''}`}>
                {block.items.map((step, idx) => (
                  <li
                    key={idx}
                    className="relative bg-white border-[1.5px] border-slate rounded-card p-6 flex flex-col gap-2.5 sm:gap-3"
                  >
                    <span className="text-[36px] sm:text-[40px] leading-none font-bold text-orange">
                      {step.num}
                    </span>
                    {step.chip && (
                      <span className="self-start inline-flex items-center h-7 px-3 rounded-pill bg-pink text-[13px] font-medium text-slate">
                        {step.chip}
                      </span>
                    )}
                    <h3 className="m-0 text-[18px] sm:text-[19px] md:text-[20px] leading-[1.25] font-bold text-slate">
                      {step.title}
                    </h3>
                    <p className="m-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5] text-slate">
                      {step.text}
                    </p>

                    {/* Arrow between steps (hidden on tablet & mobile) */}
                    {idx < block.items.length - 1 && (
                      <svg
                        className="step-arrow hidden lg:block absolute -right-[31px] top-10 pointer-events-none"
                        aria-hidden="true"
                        width="28"
                        height="12"
                        viewBox="0 0 28 12"
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
                ))}
              </ol>
            </div>
          </section>
        );

      case 'prices':
        return (
          <section key={index} className="pt-16 md:pt-[120px]">
            <div className="wrap">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <div className="border-t border-line">
                {block.items.map((p, idx) => (
                  <div key={idx} className="price-row">
                    <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                      {p.name}
                    </h3>
                    <p className="m-0 text-[15px] sm:text-[17px] leading-[1.5] text-slate">
                      {p.text}
                    </p>
                    <div>
                      <p className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                        {p.price}
                      </p>
                      {p.note && (
                        <p className="m-0 mt-1 text-[13px] sm:text-[14px] text-slate-soft">
                          {p.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {block.footnote && (
                <p className="mt-5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate-soft max-w-[780px]">
                  {block.footnote}
                </p>
              )}
            </div>
          </section>
        );

      case 'pricePlate':
        return (
          <section key={index} className="pt-16 md:pt-[120px]">
            <div className="wrap">
              <div className="plate g2 bg-pink border-[1.5px] border-slate rounded-plate p-7 sm:p-10 md:p-14">
                <div>
                  <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                    {block.title}
                  </h2>
                  <p className="mt-4 mb-0 text-[16px] sm:text-[18px] leading-[1.55] max-w-[560px] text-slate">
                    {block.text}
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[40px] sm:text-[48px] md:text-[56px] leading-none font-bold tracking-[-0.03em] text-slate">
                    {block.price}
                  </p>
                  <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] text-slate">
                    {block.priceNote}
                  </p>
                  <a
                    className="btn-s mt-6 inline-flex items-center h-12 px-6 rounded-pill text-[17px] font-semibold no-underline"
                    href={siteConfig.telegramPersonalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {block.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </section>
        );

      case 'caseLink':
        return (
          <section key={index} className="pt-16 md:pt-[120px]">
            <div className="wrap">
              <h2 className="m-0 mb-8 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <button
                type="button"
                onClick={() => onOpenCase(block.caseSlug)}
                className="w-full text-left g2 case-link bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 md:p-10 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
              >
                <span className="case-num text-[56px] sm:text-[64px] md:text-[72px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
                  {block.metric}
                </span>
                <span>
                  <span className="block text-[20px] sm:text-[22px] md:text-[24px] leading-[1.25] font-bold text-slate">
                    {block.heading}
                  </span>
                  <span className="block mt-2.5 text-[15px] sm:text-[16px] text-slate-soft">
                    {block.tags}
                  </span>
                  <span className="inline-block mt-3.5 text-[16px] font-semibold text-slate">
                    <span className="lnk">Читать кейс</span>
                    <span aria-hidden="true" className="text-orange"> →</span>
                  </span>
                </span>
              </button>
            </div>
          </section>
        );

      case 'caseCards':
        return (
          <section key={index} className="pt-16 md:pt-[120px]">
            <div className="wrap">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <div className="cards2">
                {block.cards.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onOpenCase(c.caseSlug)}
                    className="w-full text-left flex flex-col gap-3 bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
                  >
                    <span className="text-[44px] sm:text-[52px] md:text-[56px] leading-none font-bold tracking-[-0.03em] text-orange tabular-nums">
                      {c.metric}
                    </span>
                    <span className="text-[19px] sm:text-[21px] md:text-[22px] leading-[1.3] font-bold text-slate">
                      {c.heading}
                    </span>
                    <span className="text-[15px] sm:text-[16px] text-slate-soft">
                      {c.desc}
                    </span>
                    <span className="mt-2 text-[16px] font-semibold text-slate inline-flex items-center gap-1">
                      <span className="lnk">Читать кейс</span>
                      <span aria-hidden="true" className="text-orange"> →</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );

      case 'flow':
        return (
          <section key={index} id={block.id} className="band mt-16 md:mt-[120px] scroll-mt-8 md:scroll-mt-12">
            <div className="wrap">
              <h2 className="m-0 mb-10 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-paper">
                {block.title}
              </h2>
              <div className="flow">
                {block.steps.map((st, idx) => (
                  <React.Fragment key={idx}>
                    <div
                      className={`flex-1 rounded-card p-6 sm:p-7 ${
                        st.isHighlight ? 'bg-lime text-slate' : 'bg-white text-slate'
                      }`}
                    >
                      <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold">
                        {st.title}
                      </h3>
                      <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5]">
                        {st.text}
                      </p>
                    </div>
                    {idx < block.steps.length - 1 && (
                      <svg
                        className="f-arrow"
                        aria-hidden="true"
                        width="32"
                        height="14"
                        viewBox="0 0 32 14"
                      >
                        <path
                          d="M1 7h28M23 1l7 6-7 6"
                          fill="none"
                          stroke="#F3EFEA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {block.caption && (
                <p className="mt-8 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-paper max-w-[780px]">
                  {block.caption}
                </p>
              )}
            </div>
          </section>
        );

      case 'formats':
        return (
          <section key={index} id={block.id} className="pt-16 md:pt-[120px] scroll-mt-8 md:scroll-mt-12">
            <div className="wrap">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                {block.title}
              </h2>
              <div className="cards2 items-stretch">
                {block.cards.map((fc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-9"
                  >
                    <h3 className="m-0 text-[22px] sm:text-[26px] leading-[1.2] font-bold text-slate">
                      {fc.title}
                    </h3>
                    <p className="mt-2.5 mb-0 text-[22px] sm:text-[24px] leading-[1.2] font-bold text-orange">
                      {fc.price}
                    </p>
                    {fc.paragraphs?.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={`mb-0 text-[16px] sm:text-[17px] leading-[1.55] text-slate ${
                          pIdx === 0 ? 'mt-5' : 'mt-3'
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                    {fc.bullets && (
                      <ul className="mt-5 mb-0 pl-5 text-[16px] sm:text-[17px] leading-[1.55] text-slate flex flex-col gap-2">
                        {fc.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'note':
        return (
          <section key={index} className="pt-16 md:pt-[120px]">
            <div className="wrap">
              <div className="g2 items-start" style={{ gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)' }}>
                <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                  {block.title}
                </h2>
                <div>
                  {block.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className={`mb-0 leading-[1.55] max-w-[680px] ${
                        pIdx === 0
                          ? 'text-[18px] sm:text-[20px] text-slate'
                          : pIdx === 1
                          ? 'mt-3.5 text-[16px] sm:text-[18px] text-slate-soft'
                          : 'mt-7 text-[16px] sm:text-[18px] text-slate'
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                  {block.caseTeaser && (
                    <button
                      type="button"
                      onClick={() => onOpenCase(block.caseTeaser!.caseSlug)}
                      className="w-full text-left mt-3.5 g2 case-link bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-7 md:p-8 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
                    >
                      <span className="case-num text-[48px] sm:text-[56px] md:text-[64px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
                        {block.caseTeaser.metric}
                      </span>
                      <span>
                        <span className="block text-[19px] sm:text-[21px] md:text-[22px] leading-[1.25] font-bold text-slate">
                          {block.caseTeaser.heading}
                        </span>
                        <span className="inline-block mt-3 text-[16px] font-semibold text-slate">
                          <span className="lnk">Читать кейс</span>
                          <span aria-hidden="true" className="text-orange"> →</span>
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pb-16 md:pb-[120px]">
      {/* 1. Breadcrumbs & Hero */}
      <section className="pt-8">
        <div className="wrap">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-slate-soft flex items-center gap-2">
            <button
              onClick={() => onBackToHome('#services')}
              className="lnk bg-transparent border-0 p-0 font-medium text-slate-soft cursor-pointer"
            >
              Услуги
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-slate font-medium">{currentService.breadcrumb}</span>
          </nav>

          <div className="g2 mt-8">
            <div>
              {currentService.hero.chip && (
                <span className="inline-flex items-center h-7 px-3.5 rounded-pill bg-lime text-[13px] font-medium text-slate mb-4">
                  {currentService.hero.chip}
                </span>
              )}
              <h1 className="h1 m-0 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate">
                {currentService.hero.h1}{' '}
                <span className="mark">{currentService.hero.h1Mark}</span>
              </h1>
              <p className="mt-6 mb-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[580px]">
                {currentService.hero.lead}
              </p>
              <p className="mt-3.5 mb-0 text-[15px] sm:text-[17px] leading-[1.5] text-slate-soft max-w-[580px]">
                {currentService.hero.audience}
              </p>

              <div className="mt-8">
                <p className="m-0 text-[28px] sm:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate">
                  {currentService.hero.price}
                </p>
                <p className="mt-1.5 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                  {currentService.hero.priceNote}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-7">
                <a
                  className="btn-o inline-flex items-center gap-2.5 h-14 px-7 rounded-pill text-[17px] font-semibold no-underline"
                  href={siteConfig.telegramPersonalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  {currentService.hero.buttonText}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(currentService.hero.anchor.target);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="lnk text-[17px] font-semibold text-slate bg-transparent border-0 p-0 cursor-pointer text-left"
                >
                  {currentService.hero.anchor.text}
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-6 md:mt-0">
              <img
                src={currentService.hero.illustration}
                alt=""
                aria-hidden="true"
                className={`wob select-none ${currentService.hero.illustrationClass}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Blocks */}
      {currentService.blocks.map((block, idx) => renderBlock(block, idx))}

      {/* 3. Call to Action Form with Lion biting the card */}
      <section id="contact" className="contact pt-36 sm:pt-48 md:pt-[200px]">
        <div className="wrap relative">
          
          {/* LION HEAD (Layer 0, behind orange card) */}
          <img
            src="/assets/lion.webp?v=4"
            alt=""
            aria-hidden="true"
            className="cta-lion select-none"
          />

          {/* ORANGE CARD (Layer 10) */}
          <div className="cta g2 relative z-10 bg-orange rounded-plate p-6 sm:p-10 md:p-14">
            <div>
              <h2 className="h2 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                {currentService.cta.title}
                <br />
                <span className="mark inline-block mt-1">{currentService.cta.titleMark}</span>
              </h2>
              <p className="mt-5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-white max-w-[460px]">
                {currentService.cta.text}
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
                  <h3 className="m-0 text-[22px] font-bold text-slate mb-2">Заявка принята</h3>
                  <p className="m-0 text-[16px] text-slate-soft">
                    Договоримся о времени созвона в Telegram.
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
                    <span>{currentService.cta.projectLabel || 'Ссылка на проект'}</span>
                    <input
                      type="text"
                      name="project"
                      placeholder={currentService.cta.projectPlaceholder || 't.me/channel или сайт'}
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

          {/* LION TEETH OVERLAY (Layer 20, hooks over the top edge of orange card) */}
          <img
            src="/assets/lion-teeth.webp?v=5"
            alt=""
            aria-hidden="true"
            className="cta-lion-teeth select-none"
          />

        </div>
      </section>
    </div>
  );
};
