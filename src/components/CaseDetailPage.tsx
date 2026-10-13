import React, { useState } from 'react';
import { siteConfig } from '../data/content';

interface CaseDetailPageProps {
  onBackToHome: () => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({ onBackToHome }) => {
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
          <span className="text-slate font-medium">Контур.Экстерн</span>
        </nav>

        {/* 1. Hero Block */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-slate text-[13px] font-medium text-slate">
                Telegram Ads
              </span>
              <span className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-slate text-[13px] font-medium text-slate">
                Чат-боты
              </span>
              <span className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-slate text-[13px] font-medium text-slate">
                Комьюнити бухгалтеров
              </span>
            </div>

            <h1 className="mt-5 mb-0 text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate">
              Telegram Ads для <span className="mark whitespace-nowrap">Контур.Экстерн</span>
            </h1>

            <p className="mt-6 mb-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[600px]">
              Экстерн — основное B2B-комьюнити, на котором строится контентный прогрев бухгалтеров в продукты Контура. Нужно было снизить цену подписчика, поднять CTR и удержать поток на масштабе.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <img
              src="/assets/water-pistol.webp"
              alt=""
              aria-hidden="true"
              className="wob w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto object-contain select-none -rotate-[12deg]"
            />
          </div>
        </div>

        {/* 2. Key Metrics Banner */}
        <div className="mt-14">
          <div className="bg-lime border-[1.5px] border-slate rounded-card p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <p className="m-0 text-[36px] sm:text-[44px] md:text-[48px] leading-none font-bold tracking-[-0.03em] text-slate tabular-nums">
                €3 → €2
              </p>
              <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.4] text-slate">
                цена подписчика, минус 33%
              </p>
            </div>

            <div className="sm:border-l sm:border-slate/30 sm:pl-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate/20">
              <p className="m-0 text-[36px] sm:text-[44px] md:text-[48px] leading-none font-bold tracking-[-0.03em] text-slate tabular-nums">
                0,2% → 0,38%
              </p>
              <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.4] text-slate">
                CTR вырос в 1,9 раза
              </p>
            </div>

            <div className="sm:border-l sm:border-slate/30 sm:pl-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate/20">
              <p className="m-0 text-[36px] sm:text-[44px] md:text-[48px] leading-none font-bold tracking-[-0.03em] text-slate tabular-nums">
                €1 000
              </p>
              <p className="mt-3 mb-0 text-[15px] sm:text-[16px] leading-[1.4] text-slate">
                экономии на каждой тысяче подписчиков в месяц
              </p>
            </div>
          </div>
        </div>

        {/* 3. Решение */}
        <section className="pt-16 md:pt-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <h2 className="md:col-span-4 m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Решение
            </h2>

            <div className="md:col-span-8">
              <p className="m-0 text-[18px] sm:text-[20px] leading-[1.5] text-slate max-w-[680px]">
                Сформулировал методологию на трёх принципах. Все креативы и тесты дальше собирал под них.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-pink border-[1.5px] border-slate rounded-card p-6">
                  <h3 className="m-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                    Цепляющий визуал
                  </h3>
                  <p className="mt-2.5 mb-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                    Картинка бьёт в боль, а не просто красивая.
                  </p>
                </div>

                <div className="bg-pink border-[1.5px] border-slate rounded-card p-6">
                  <h3 className="m-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                    Отстройка через боли
                  </h3>
                  <p className="mt-2.5 mb-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                    Бухгалтер узнаёт себя в первой строке: поиск работы, страх перед законодательством, рутина отчётности.
                  </p>
                </div>

                <div className="bg-pink border-[1.5px] border-slate rounded-card p-6">
                  <h3 className="m-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                    Единый сюжет
                  </h3>
                  <p className="mt-2.5 mb-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                    В постах канала человек получает то, что обещала реклама. Поэтому он остаётся.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Первый тест провалился */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Первый тест провалился
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            <figure className="md:col-span-7 m-0 bg-white border-[1.5px] border-slate rounded-card p-6">
              <img
                src="/assets/extern-fail.webp"
                alt="Два креатива Контур.Экстерн из первого теста"
                className="w-full h-auto rounded-lg select-none"
              />
            </figure>

            <div className="md:col-span-5">
              <span className="inline-flex items-center h-7 px-3 rounded-pill bg-pink text-[13px] font-medium text-slate">
                было
              </span>

              <div className="mt-5 flex flex-wrap gap-8">
                <div>
                  <p className="m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] text-slate tabular-nums">
                    €7
                  </p>
                  <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                    цена подписчика
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] text-slate tabular-nums">
                    0,1%
                  </p>
                  <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                    CTR
                  </p>
                </div>
              </div>

              <p className="mt-6 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate">
                Визуально насыщенные креативы без фокуса на боли аудитории уронили CTR до 0,1%, а цена подписчика выросла до €7.
              </p>
              <p className="mt-3.5 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate">
                Этот провал стал главной гипотезой: визуал должен бить в боль, а не быть красивым.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Что изменил */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Что изменил
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            <figure className="md:col-span-7 m-0 bg-white border-[1.5px] border-slate rounded-card p-6">
              <img
                src="/assets/extern-win.webp"
                alt="Два креатива Контур.Экстерн после доработки"
                className="w-full h-auto rounded-lg select-none"
              />
            </figure>

            <div className="md:col-span-5">
              <span className="inline-flex items-center h-7 px-3 rounded-pill bg-lime text-[13px] font-medium text-slate">
                стало
              </span>

              <div className="mt-5 flex flex-wrap gap-8">
                <div>
                  <p className="m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] text-orange tabular-nums">
                    €2
                  </p>
                  <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                    цена подписчика
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[36px] sm:text-[40px] leading-none font-bold tracking-[-0.02em] text-orange tabular-nums">
                    0,38%
                  </p>
                  <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-slate-soft">
                    CTR
                  </p>
                </div>
              </div>

              <p className="mt-6 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate">
                Вернулся к рабочим текстам и добавил визуал, который попадает в конкретные боли.
              </p>
              <p className="mt-3.5 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate">
                Подключил две механики подписки: через пост с полезным контентом и через бота с лид-магнитом, где отток около 5%.
              </p>
              <p className="mt-3.5 mb-0 text-[16px] sm:text-[18px] leading-[1.55] text-slate">
                Тестировал системно: от трёх креативов на аудиторию, одинаковый бюджет, отдельно по каждому каналу.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Что сработало */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Что сработало
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-line">
            {[
              {
                title: "Доработка вместо переделки",
                desc: "Добавил правильный визуал к тексту, который уже подтверждал конверсию."
              },
              {
                title: "Узнавание в первой строке",
                desc: "Визуал и заголовок попадают в конкретную боль бухгалтера."
              },
              {
                title: "Реклама, канал и контент без обмана",
                desc: "Человек получает в постах то, что обещано в оффере. Это удерживает новых подписчиков и снижает отток."
              },
              {
                title: "Подписка через бота с лид-магнитом",
                desc: "Человек сразу получает обещанное: это даёт доверие и держит отток минимальным."
              },
            ].map((item, idx) => (
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

        {/* 7. Следующий кейс */}
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
            onClick={onBackToHome}
            className="w-full text-left bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-4 md:gap-6 items-center cursor-pointer hover:border-orange transition-colors"
          >
            <span className="text-[52px] sm:text-[64px] md:text-[72px] leading-none font-bold tracking-[-0.04em] text-orange tabular-nums">
              114%
            </span>
            <span>
              <span className="block text-[20px] sm:text-[24px] leading-[1.25] font-bold text-slate">
                плана по регистрациям на конференцию для бухгалтеров, CPL на 30% ниже плана
              </span>
              <span className="block mt-2.5 text-[15px] sm:text-[16px] text-slate-soft">
                VK лид-формы и Яндекс Директ
              </span>
            </span>
          </button>
        </section>

        {/* 8. Call to action */}
        <section id="contact" className="pt-36 sm:pt-48 md:pt-[210px] pb-16 md:pb-[120px]">
          <div className="relative bg-orange rounded-plate p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            <img
              src="/assets/tiger.webp"
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2 11 13"></path>
                  <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
                </svg>
                <span>Написать в Telegram</span>
              </a>
            </div>

            <div className="md:col-span-6 relative z-10 w-full">
              {submitted ? (
                <div className="bg-white rounded-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <span className="w-12 h-12 rounded-pill bg-lime text-slate flex items-center justify-center text-xl font-bold mb-3">✓</span>
                  <h3 className="m-0 text-[22px] font-bold text-slate mb-2">Заявка отправлена</h3>
                  <p className="m-0 text-[16px] text-slate-soft">Свяжусь с вами в Telegram для обсуждения деталей.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 sm:p-8 flex flex-col gap-4 text-slate">
                  <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                    <span>Имя *</span>
                    <input
                      type="text"
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
                      required
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
                    <span>Ссылка на проект</span>
                    <input
                      type="text"
                      placeholder="t.me/channel или сайт"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="h-[52px] border-[1.5px] border-slate rounded-input px-4 text-[17px] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange"
                    />
                  </label>

                  <label className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-slate mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="flex-shrink-0 w-5 h-5 mt-0.5 accent-orange rounded"
                    />
                    <span>
                      Согласен на обработку персональных данных и с{' '}
                      <a href="#contact" className="lnk text-slate">политикой конфиденциальности</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!formData.name || !formData.telegram || !formData.consent}
                    className="btn-o mt-1 h-14 border-0 rounded-pill text-[17px] font-semibold cursor-pointer disabled:opacity-50"
                  >
                    Отправить
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
