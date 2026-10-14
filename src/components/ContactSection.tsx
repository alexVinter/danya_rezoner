import React, { useState } from 'react';
import { siteConfig } from '../data/content';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    project: '',
    budget: 'Выберите',
    source: 'Выберите',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.telegram || !formData.consent) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="pt-36 sm:pt-48 md:pt-[210px] pb-16 md:pb-[120px]">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="relative bg-orange rounded-plate p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {/* Tiger Illustration Resting on Top */}
          <img
            src="/assets/tiger.webp?v=3"
            alt=""
            aria-hidden="true"
            className="wob absolute select-none left-5 sm:left-10 md:left-12 -top-24 sm:-top-32 md:-top-[164px] w-[220px] sm:w-[280px] md:w-[340px] z-10"
          />

          {/* Left Column: Heading, Subtitle & White Button */}
          <div className="md:col-span-6 relative z-10">
            <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              Давайте работать
              <br />
              <span className="mark inline-block mt-1">вместе</span>
            </h2>

            <p className="mt-5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-white max-w-[460px]">
              Заполните форму или напишите напрямую в Telegram. Можно сразу прислать ссылку на канал или сайт и описать задачу своими словами.
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
                <path d="M22 2 11 13"></path>
                <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
              </svg>
              <span>Написать в Telegram</span>
            </a>
          </div>

          {/* Right Column: White Card with Form */}
          <div className="md:col-span-6 relative z-10 w-full">
            {submitted ? (
              <div className="bg-white rounded-card p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[360px] animate-in fade-in duration-200">
                <span className="w-14 h-14 rounded-pill bg-lime text-slate flex items-center justify-center text-2xl font-bold mb-4">
                  ✓
                </span>
                <h3 className="m-0 text-[24px] font-bold text-slate mb-2">
                  Заявка у меня!
                </h3>
                <p className="m-0 text-[17px] text-slate-soft max-w-[340px] leading-[1.5]">
                  Спасибо за обращение. Напишу вам в Telegram в течение рабочего дня.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[14px] text-slate lnk cursor-pointer bg-transparent border-0 font-medium"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-card p-6 sm:p-8 flex flex-col gap-4 text-slate"
              >
                {/* Имя */}
                <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                  <span>Имя *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Как к вам обращаться"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange transition-colors"
                  />
                </label>

                {/* Telegram */}
                <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                  <span>Telegram *</span>
                  <input
                    type="text"
                    name="telegram"
                    required
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange transition-colors"
                  />
                </label>

                {/* Ссылка на проект */}
                <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                  <span>Ссылка на проект</span>
                  <input
                    type="text"
                    name="project"
                    placeholder="t.me/channel или сайт"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange transition-colors"
                  />
                </label>

                {/* Бюджет на рекламу */}
                <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                  <span>Бюджет на рекламу</span>
                  <span className="relative block">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-[52px] border-[1.5px] border-slate rounded-input pl-4 pr-[44px] text-[17px] text-slate bg-white appearance-none [-webkit-appearance:none] outline-none focus:border-orange transition-colors cursor-pointer"
                    >
                      <option value="Выберите">Выберите</option>
                      <option value="до 50 000 ₽">до 50 000 ₽</option>
                      <option value="50 000–100 000 ₽">50 000–100 000 ₽</option>
                      <option value="100 000–300 000 ₽">100 000–300 000 ₽</option>
                      <option value="от 300 000 ₽">от 300 000 ₽</option>
                    </select>
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="absolute right-[18px] top-[19px] pointer-events-none"
                    >
                      <path
                        d="M2 5l5 5 5-5"
                        fill="none"
                        stroke="#313A43"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>

                {/* Откуда узнали */}
                <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                  <span>Откуда узнали</span>
                  <span className="relative block">
                    <select
                      name="source"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full h-[52px] border-[1.5px] border-slate rounded-input pl-4 pr-[44px] text-[17px] text-slate bg-white appearance-none [-webkit-appearance:none] outline-none focus:border-orange transition-colors cursor-pointer"
                    >
                      <option value="Выберите">Выберите</option>
                      <option value="Из «Резонёра»">Из «Резонёра»</option>
                      <option value="Порекомендовали">Порекомендовали</option>
                      <option value="vc.ru">vc.ru</option>
                      <option value="Хабр">Хабр</option>
                      <option value="Другое">Другое</option>
                    </select>
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="absolute right-[18px] top-[19px] pointer-events-none"
                    >
                      <path
                        d="M2 5l5 5 5-5"
                        fill="none"
                        stroke="#313A43"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>

                {/* Чекбокс согласия (пустой по умолчанию) */}
                <label className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-slate mt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="flex-shrink-0 w-5 h-5 mt-0.5 accent-orange rounded"
                  />
                  <span>
                    Согласен на обработку персональных данных и с{' '}
                    <a href="#contact" className="lnk text-slate">
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>

                {/* Кнопка отправки */}
                <button
                  type="submit"
                  disabled={!formData.name || !formData.telegram || !formData.consent}
                  className="btn-o mt-1 h-14 border-0 rounded-pill text-[17px] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
