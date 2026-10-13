import React, { useState } from 'react';
import { siteConfig } from '../data/content';

interface ServiceDetailPageProps {
  onBackToHome: () => void;
  onOpenCase: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  onBackToHome,
  onOpenCase,
}) => {
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
            Услуги
          </button>
          <span aria-hidden="true" className="text-slate-soft">/</span>
          <span className="text-slate font-medium">Ведение Telegram Ads</span>
        </nav>

        {/* 1. Hero Block */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <span className="inline-flex items-center h-7 px-3 rounded-pill bg-lime text-[13px] font-medium text-slate">
              до 31 декабря
            </span>

            <h1 className="mt-5 mb-0 text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-bold tracking-[-0.025em] text-slate">
              Ведение <span className="mark whitespace-nowrap">Telegram Ads</span>
            </h1>

            <p className="mt-6 mb-0 text-[18px] sm:text-[20px] leading-[1.45] text-slate max-w-[580px]">
              Подписчики и заявки через официальную рекламу Telegram, пока она разрешена. Запускаю промо и бонусом собираю воронку в боте.
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-4 sm:gap-10">
              <div>
                <p className="m-0 text-[28px] sm:text-[32px] leading-[1.15] font-bold tracking-[-0.015em] text-slate tabular-nums">
                  от 30 000 ₽ / мес
                </p>
                <p className="mt-1.5 mb-0 text-[15px] text-slate-soft">
                  бюджет на рекламу от 500 € в месяц, отдельно
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-7">
              <a
                href={siteConfig.telegramPersonalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-o inline-flex items-center gap-2.5 h-14 px-7 rounded-pill text-[17px] font-semibold no-underline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2 11 13"></path>
                  <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
                </svg>
                <span>Обсудить в Telegram</span>
              </a>

              <a href="#include" className="lnk text-[17px] font-semibold text-slate">
                Что входит
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <img
              src="/assets/piranha.webp"
              alt=""
              aria-hidden="true"
              className="wob w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] h-auto object-contain select-none rotate-[4deg]"
            />
          </div>
        </div>

        {/* 2. Special Promo Banner */}
        <div className="mt-14">
          <div className="bg-lime border-[1.5px] border-slate rounded-card p-7 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[820px]">
              <p className="m-0 text-[20px] leading-[1.3] font-bold text-slate">
                Спецусловия до 31 декабря
              </p>
              <p className="mt-2 mb-0 text-[16px] sm:text-[17px] leading-[1.5] text-slate">
                Промо стоит 20 000 ₽ в месяц, воронку в боте собираю бонусом. С января реклама в Telegram под запретом, поэтому 31 декабря кампании выключаем.
              </p>
            </div>
            <a
              href="#price"
              className="btn-s flex-shrink-0 inline-flex items-center h-12 px-6 rounded-pill text-[17px] font-semibold no-underline"
            >
              Смотреть цены
            </a>
          </div>
        </div>

        {/* 3. Что входит */}
        <section id="include" className="pt-16 md:pt-[120px]">
          <div className="flex items-end justify-between gap-6 mb-9">
            <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
              Что входит
            </h2>
            <img
              src="/assets/hands-keyboard.webp?v=2"
              alt=""
              aria-hidden="true"
              className="wob w-[180px] sm:w-[220px] md:w-[260px] h-auto select-none -mb-1.5"
            />
          </div>

          <div className="border-t border-line">
            {[
              { title: "Стратегия", desc: "Сегменты, офферы, гипотезы для тестов и медиаплан до конца года." },
              { title: "Запуск", desc: "Настраиваю кабинет и маркировку, запускаю кампании." },
              { title: "Креативы", desc: "До 10 разных визуальных креативов в месяц делаю сам. Каждый следующий стоит 1 000 ₽." },
              { title: "Ведение", desc: "Выключаю то, что не работает, и докручиваю то, что приводит подписчиков и заявки." },
              { title: "Отчёты", desc: "Раз в неделю присылаю короткий отчёт с цифрами." },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-2 md:gap-6 py-7 border-b border-line items-baseline"
              >
                <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                  {row.title}
                </h3>
                <p className="m-0 text-[16px] sm:text-[18px] leading-[1.5] text-slate max-w-[640px]">
                  {row.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Воронка в подарок */}
        <section className="pt-16 md:pt-[120px]">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                Воронка в подарок
              </h2>
              <p className="mt-3.5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-slate max-w-[620px]">
                Часть трафика ведём не в канал, а в бота. Так растёт и канал, и база, а заявки приходят сразу менеджеру.
              </p>
            </div>
            <img
              src="/assets/rainbow.webp?v=2"
              alt=""
              aria-hidden="true"
              className="wob w-[160px] sm:w-[190px] md:w-[230px] h-auto select-none -mb-1"
            />
          </div>

          {/* 5 Chain Steps */}
          <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {[
              { num: "1", title: "Канал", desc: "Готовим к трафику: описание, закреп и посты, которые новый человек увидит первыми" },
              { num: "2", title: "Лид-магнит", desc: "Бот отдаёт его после подписки на канал. Растёт и канал, и база в боте" },
              { num: "3", title: "Прогрев", desc: "2–3 вопроса, чтобы понять, кто пришёл, и цепочка из 3–5 сообщений с кейсом и оффером" },
              { num: "4", title: "Заявка", desc: "Сразу падает вашему менеджеру" },
              { num: "5", title: "Метки", desc: "У каждой кампании своя, поэтому видно цену подписчика и цену заявки" },
            ].map((step, idx) => (
              <li
                key={idx}
                className="relative bg-white border-[1.5px] border-slate rounded-card p-6 flex flex-col gap-2.5"
              >
                <span className="text-[36px] sm:text-[40px] leading-none font-bold text-orange tabular-nums">
                  {step.num}
                </span>
                <h3 className="mt-1.5 mb-0 text-[18px] sm:text-[19px] leading-[1.25] font-bold text-slate">
                  {step.title}
                </h3>
                <p className="m-0 text-[14px] sm:text-[15px] leading-[1.5] text-slate">
                  {step.desc}
                </p>
                {idx < 4 && (
                  <svg
                    aria-hidden="true"
                    width="28"
                    height="12"
                    viewBox="0 0 28 12"
                    className="hidden lg:block absolute right-[-29px] top-[42px] pointer-events-none z-10"
                  >
                    <path d="M1 6h24M19 1l6 5-6 5" fill="none" stroke="#313A43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          {/* 3 Pink Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] leading-[1.25] font-bold text-slate">
                Лид-магнит придумаем вместе
              </h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.5] text-slate">
                Структура и тексты бота на мне, экспертная начинка на вас.
              </p>
            </div>

            <div className="bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] leading-[1.25] font-bold text-slate">
                Контент на время рекламы
              </h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.5] text-slate">
                Подскажу, что публиковать, чтобы новые подписчики не отваливались и доходили до заявки.
              </p>
            </div>

            <div className="bg-pink border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] leading-[1.25] font-bold text-slate">
                Созвон в конце декабря
              </h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.5] text-slate">
                Подведём итоги и решим, как работать с базой, когда рекламы в Telegram уже не будет.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Как по срокам (Dark Forest Section) */}
        <section className="mt-16 md:mt-[120px] -mx-4 md:-mx-10 bg-forest px-4 md:px-10 py-16 md:py-[112px]">
          <div className="max-w-site mx-auto">
            <h2 className="m-0 mb-10 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-paper">
              Как по срокам
            </h2>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
              <div className="flex-1 bg-white rounded-card p-6 sm:p-7 min-h-[150px] sm:min-h-[168px]">
                <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                  Октябрь
                </h3>
                <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                  Стратегия и запуск рекламы на канал.
                </p>
              </div>

              <svg aria-hidden="true" width="32" height="14" viewBox="0 0 32 14" className="self-center lg:self-auto rotate-90 lg:rotate-0 flex-shrink-0">
                <path d="M1 7h28M23 1l7 6-7 6" fill="none" stroke="#F3EFEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="flex-1 bg-white rounded-card p-6 sm:p-7 min-h-[150px] sm:min-h-[168px]">
                <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                  Ноябрь
                </h3>
                <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                  Собираем воронку, переводим часть трафика в бота и смотрим, где заявка дешевле.
                </p>
              </div>

              <svg aria-hidden="true" width="32" height="14" viewBox="0 0 32 14" className="self-center lg:self-auto rotate-90 lg:rotate-0 flex-shrink-0">
                <path d="M1 7h28M23 1l7 6-7 6" fill="none" stroke="#F3EFEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="flex-1 bg-white rounded-card p-6 sm:p-7 min-h-[150px] sm:min-h-[168px]">
                <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                  Декабрь
                </h3>
                <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                  Масштабируем то, что сработало.
                </p>
              </div>

              <svg aria-hidden="true" width="32" height="14" viewBox="0 0 32 14" className="self-center lg:self-auto rotate-90 lg:rotate-0 flex-shrink-0">
                <path d="M1 7h28M23 1l7 6-7 6" fill="none" stroke="#F3EFEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="w-full lg:w-[240px] flex-shrink-0 bg-lime rounded-card p-6 sm:p-7 min-h-[150px] sm:min-h-[168px] flex flex-col justify-center">
                <p className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate">
                  31 декабря
                </p>
                <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                  выключаем кампании
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Сколько стоит */}
        <section id="price" className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Сколько стоит
          </h2>

          <div className="border-t border-line">
            {[
              {
                title: "Промо в Telegram Ads",
                desc: "Стратегия, запуск, до 10 визуальных креативов, ведение и отчёты",
                price: "20 000 ₽ / мес",
                sub: "до 31 декабря, обычно от 30 000 ₽"
              },
              {
                title: "Креатив сверх 10",
                desc: "Любой дополнительный креатив в этом месяце",
                price: "1 000 ₽ / шт",
                sub: ""
              },
              {
                title: "Воронка в боте",
                desc: "Канал под трафик, бот с лид-магнитом, цепочка сообщений и метки",
                price: "бонусом",
                sub: "от 30 000 ₽",
                isStrike: true
              },
              {
                title: "Бюджет на рекламу",
                desc: "Пополнение через реселлера, сверху комиссия и НДС",
                price: "от 500 € / мес",
                sub: ""
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,6fr)_minmax(0,3fr)] gap-3 md:gap-6 py-6 border-b border-line items-baseline"
              >
                <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                  {row.title}
                </h3>
                <p className="m-0 text-[16px] sm:text-[17px] leading-[1.5] text-slate">
                  {row.desc}
                </p>
                <div>
                  <p className="m-0 text-[20px] sm:text-[22px] leading-[1.25] font-bold text-slate tabular-nums">
                    {row.price}
                  </p>
                  {row.sub && (
                    <p className="mt-1 mb-0 text-[14px] text-slate-soft">
                      {row.isStrike ? <s>{row.sub}</s> : row.sub}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 mb-0 text-[15px] sm:text-[16px] text-slate-soft">
            Стратегия и запуск входят в первый месяц.
          </p>
        </section>

        {/* 7. Что нужно от вас */}
        <section className="pt-16 md:pt-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
                Что нужно от вас
              </h2>

              <ul className="list-none m-0 p-0 flex flex-col gap-5 sm:gap-6">
                {[
                  { bold: "Живой канал.", text: "Ведёте его сами, посты хотя бы 1–2 раза в неделю." },
                  { bold: "Человек на заявках.", text: "Разбирает их в тот же день." },
                  { bold: "Быстрые согласования.", text: "Креативы за 1–2 дня: до января времени мало." },
                  { bold: "Доступы", text: "к каналу, рекламному кабинету и конструктору бота. Можно собрать бота и без конструктора." },
                ].map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3.5 items-start text-[18px] sm:text-[20px] leading-[1.45] text-slate">
                    <img src="/assets/arrow.webp?v=2" alt="" aria-hidden="true" className="w-[30px] mt-1 select-none" />
                    <span><b>{item.bold}</b> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <img
                src="/assets/finger-sparkles.webp?v=2"
                alt=""
                aria-hidden="true"
                className="wob hidden md:block h-[340px] lg:h-[380px] w-auto select-none rotate-[6deg]"
              />
            </div>
          </div>
        </section>

        {/* 8. Договоримся на берегу */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Договоримся на берегу
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                Одна воронка
              </h3>
              <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                Один бот, одна цепочка, один лид-магнит и два круга правок.
              </p>
            </div>

            <div className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                Бот остаётся у вас
              </h3>
              <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                Собираю на конструкторе на вашем аккаунте или в кастомном варианте. Тариф или сервер оплачиваете вы.
              </p>
            </div>

            <div className="bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-7">
              <h3 className="m-0 text-[19px] sm:text-[20px] leading-[1.3] font-bold text-slate">
                Оплата
              </h3>
              <p className="mt-2.5 mb-0 text-[15px] sm:text-[16px] leading-[1.5] text-slate">
                Работаю как самозанятый, по договору и с чеками. Первый месяц оплачиваете перед стартом, дальше в начале каждого месяца.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Кейсы по Telegram Ads */}
        <section className="pt-16 md:pt-[120px]">
          <h2 className="m-0 mb-9 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-slate">
            Кейсы по Telegram Ads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onOpenCase('kontur-extern')}
              className="text-left bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col gap-3 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
            >
              <span className="text-[48px] sm:text-[56px] leading-none font-bold tracking-[-0.03em] text-orange tabular-nums">
                −33%
              </span>
              <span className="text-[20px] sm:text-[22px] leading-[1.3] font-bold text-slate">
                к цене подписчика для канала Контур.Экстерн
              </span>
              <span className="text-[15px] sm:text-[16px] text-slate-soft">
                €3 → €2 за подписчика, CTR 0,2% → 0,38%
              </span>
              <span className="mt-2 text-[16px] font-semibold text-slate inline-flex items-center gap-1">
                <span className="lnk">Читать кейс</span>
                <span aria-hidden="true" className="text-orange"> →</span>
              </span>
            </button>

            <button
              onClick={() => onOpenCase('kontur-extern')}
              className="text-left bg-white border-[1.5px] border-slate rounded-card p-6 sm:p-8 flex flex-col gap-3 cursor-pointer no-underline text-slate hover:border-orange transition-colors"
            >
              <span className="text-[48px] sm:text-[56px] leading-none font-bold tracking-[-0.03em] text-orange tabular-nums">
                −26%
              </span>
              <span className="text-[20px] sm:text-[22px] leading-[1.3] font-bold text-slate">
                к цене подписчика для канала Контур.Эльба
              </span>
              <span className="text-[15px] sm:text-[16px] text-slate-soft">
                €3,66 → €2,7 за подписчика, CTR 0,34% → 0,43%
              </span>
              <span className="mt-2 text-[16px] font-semibold text-slate inline-flex items-center gap-1">
                <span className="lnk">Читать кейс</span>
                <span aria-hidden="true" className="text-orange"> →</span>
              </span>
            </button>
          </div>
        </section>

        {/* 10. Call to action */}
        <section id="contact" className="pt-32 sm:pt-44 md:pt-[200px] pb-16 md:pb-[120px]">
          <div className="relative">
            <img
              src="/assets/lion.webp?v=2"
              alt=""
              aria-hidden="true"
              className="wob absolute left-7 sm:left-14 md:left-[70px] -top-20 sm:-top-28 md:-top-[134px] w-[180px] sm:w-[220px] md:w-[250px] z-0 select-none -rotate-[6deg]"
            />

            <div className="relative z-10 bg-orange rounded-plate p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="md:col-span-6">
              <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                Давайте назначим <span className="mark">созвон</span>
              </h2>
              <p className="mt-5 mb-0 text-[16px] sm:text-[18px] leading-[1.5] text-white max-w-[460px]">
                За 30 минут забрифуемся, и я соберу стратегию под ваш проект. Напишите, когда вам удобно.
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

            <div className="md:col-span-6 w-full">
              {submitted ? (
                <div className="bg-white rounded-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <span className="w-12 h-12 rounded-pill bg-lime text-slate flex items-center justify-center text-xl font-bold mb-3">✓</span>
                  <h3 className="m-0 text-[22px] font-bold text-slate mb-2">Заявка принята</h3>
                  <p className="m-0 text-[16px] text-slate-soft">Договоримся о времени созвона в Telegram.</p>
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
                    <span>Ссылка на канал</span>
                    <input
                      type="text"
                      placeholder="t.me/channel"
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
        </div>
      </section>

      </div>
    </div>
  );
};
