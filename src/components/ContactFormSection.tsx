import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ContactFormProps {
  onSuccess: (data: any) => void;
  onOpenPrivacy: () => void;
  preselectedService?: string;
}

export const ContactFormSection: React.FC<ContactFormProps> = ({
  onSuccess,
  onOpenPrivacy,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [budget, setBudget] = useState('100–300к');
  const [source, setSource] = useState('Резонёр');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [currentService, setCurrentService] = useState<string | undefined>(preselectedService);

  useEffect(() => {
    setCurrentService(preselectedService);
  }, [preselectedService]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
      const val = searchParams.get(key);
      if (val) utms[key] = val;
    });
    setUtmParams(utms);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !telegram.trim() || !consent) return;

    setIsSubmitting(true);

    const payload = {
      name,
      telegram,
      projectUrl,
      budget,
      source,
      consent,
      utms: utmParams,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('danya_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('danya_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(payload);
    }, 400);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-canvas relative overflow-hidden">
      
      {/* Баннер с цветами, как в Ноушене strictly as in ТЗ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Цветы над баннером */}
        <div className="flex justify-center -mb-6 relative z-20">
          <div className="w-48 sm:w-64 select-none pointer-events-none">
            <img
              src="/images/flowers-tiger.png"
              alt="Цветы"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Рамка экрана: карточка скругление 16–24 px, без теней */}
        <div className="bg-white border border-ink/20 rounded-2xl p-6 sm:p-10 relative">
          
          {/* Заголовок «Давайте работать вместе» strictly as in ТЗ */}
          <div className="text-center max-w-lg mx-auto mb-10 pt-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-ink mb-2">
              Давайте работать вместе
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              Заполните форму или напишите напрямую в Telegram.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Telegram quick button */}
            <div className="md:col-span-5 bg-canvas border border-ink/15 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-ink mb-2">
                  Быстро в Telegram
                </h3>
                <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-6">
                  Можно сразу прислать ссылку на канал или сайт и описать задачу в свободной форме.
                </p>
              </div>

              <a
                href={siteConfig.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3.5 px-4 rounded-xl text-sm font-semibold hover:bg-ink-light transition-colors"
              >
                <Send className="w-4 h-4 text-risograph-cyan" />
                <span>Написать в Telegram</span>
              </a>
            </div>

            {/* Форма заявки strictly by fields in ТЗ */}
            <div className="md:col-span-7">
              {currentService && (
                <div className="mb-5 p-3.5 rounded-xl bg-canvas border border-ink/20 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-ink">
                    [ Выбрана услуга: {currentService} ]
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentService(undefined)}
                    className="text-[11px] text-ink-muted hover:text-ink underline"
                  >
                    Сбросить
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Имя */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                    Имя *
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-ink focus:outline-none text-sm bg-white"
                  />
                </div>

                {/* Telegram */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                    Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="@username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-ink focus:outline-none text-sm bg-white"
                  />
                </div>

                {/* Задача */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                    Задача
                  </label>
                  <input
                    type="text"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="t.me/channel или сайт"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-ink focus:outline-none text-sm bg-white"
                  />
                </div>

                {/* Бюджет на рекламу списком: до 50к, 50–100к, 100–300к, больше 300к */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                    Бюджет на рекламу
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-ink focus:outline-none text-sm bg-white"
                  >
                    <option value="до 50к">до 50 000 ₽</option>
                    <option value="50–100к">50 000–100 000 ₽</option>
                    <option value="100–300к">100 000–300 000 ₽</option>
                    <option value="больше 300к">больше 300 000 ₽</option>
                  </select>
                </div>

                {/* Откуда узнали списком: Резонёр, Директ, статья, выступление, посоветовали, другое */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                    Откуда узнали
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-ink focus:outline-none text-sm bg-white"
                  >
                    <option value="Резонёр">Резонёр</option>
                    <option value="Директ">Директ</option>
                    <option value="статья">статья</option>
                    <option value="выступление">выступление</option>
                    <option value="посоветовали">посоветовали</option>
                    <option value="другое">другое</option>
                  </select>
                </div>

                {/* Галочка согласия */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-ink-muted">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-ink/20 text-ink"
                    />
                    <span>
                      Согласен на обработку персональных данных (
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="underline text-ink hover:text-ink-light"
                      >
                        политика конфиденциальности
                      </button>
                      )
                    </span>
                  </label>
                </div>

                {/* Кнопка «Отправить» */}
                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full mt-3 py-3.5 px-6 rounded-xl bg-ink hover:bg-ink-light text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>

              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
