import React, { useEffect } from 'react';

interface ConsentPageProps {
  onBackToHome: () => void;
  onOpenPolicy?: () => void;
}

export const ConsentPage: React.FC<ConsentPageProps> = ({ onBackToHome, onOpenPolicy }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 text-slate">
      {/* Top breadcrumb navigation */}
      <div className="mb-8">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 text-[15px] font-medium text-slate hover:text-orange transition-colors"
        >
          <span>←</span>
          <span>На главную</span>
        </a>
      </div>

      <header className="mb-10 pb-6 border-b border-line">
        <h1 className="text-[32px] sm:text-[40px] leading-[1.15] font-bold tracking-[-0.02em] m-0">
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-3 text-[15px] text-slate-soft">
          Оператор: Индивидуальный предприниматель Винтер Даниил Денисович · ОГРНИП 326246800181294 · ИНН 243902737230
        </p>
      </header>

      <div className="space-y-6 text-[16px] leading-[1.65]">
        <p>
          Я, Пользователь сайта winterlead.ru, свободно, своей волей и в своем интересе даю конкретное, предметное, информированное, сознательное и однозначное согласие <strong>Индивидуальному предпринимателю Винтеру Даниилу Денисовичу</strong> (ОГРНИП 326246800181294, ИНН 243902737230, e-mail: <a href="mailto:vinterdaniil@yandex.ru" className="text-orange underline">vinterdaniil@yandex.ru</a>, далее — Оператор) на обработку моих персональных данных на следующих условиях:
        </p>

        <section className="bg-white p-6 rounded-card border border-line space-y-4">
          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Цель обработки</h2>
            <p className="text-[15px] text-slate m-0">
              Обработка входящего запроса (заявки) Пользователя с целью обсуждения маркетинговых задач, консультирования по услугам по платному трафику, проведению аудита воронки и ведения переговоров о возможном сотрудничестве.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Перечень персональных данных</h2>
            <ul className="list-disc pl-5 text-[15px] space-y-1 m-0">
              <li>Имя;</li>
              <li>Адрес электронной почты;</li>
              <li>Номер телефона и/или логин (аккаунт) в Telegram;</li>
              <li>Название компании / проекта и ссылка на сайт или канал;</li>
              <li>Описание задачи, выбранный бюджет и источник, откуда я узнал(а) о сайте;</li>
              <li>Дата заявки и страница отправки;</li>
              <li>Иная информация, добровольно предоставленная мной в полях формы обращения или сообщениях.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Способы обработки</h2>
            <p className="text-[15px] text-slate m-0">
              Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление и/или доступ), обезличивание, блокирование, удаление, уничтожение персональных данных с использованием средств автоматизации и без них.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Передача заявки</h2>
            <p className="text-[15px] text-slate m-0">
              Для получения Оператором заявки данные передаются через Telegram Bot API. Резервная копия сохраняется в localStorage моего браузера. Согласие не распространяется на публикацию моих данных и отправку рекламных рассылок.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Срок действия согласия</h2>
            <p className="text-[15px] text-slate m-0">
              Согласие действует с момента его предоставления (отправки заявки через форму на сайте) до достижения цели обработки или до момента его отзыва мной.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-slate mb-1">Порядок отзыва</h2>
            <p className="text-[15px] text-slate m-0">
              Я уведомлен(а), что могу отозвать настоящее согласие в любое время путем направления электронного письма на адрес <a href="mailto:vinterdaniil@yandex.ru" className="text-orange underline">vinterdaniil@yandex.ru</a> с пометкой <em>«Отзыв согласия на обработку персональных данных»</em>.
            </p>
          </div>
        </section>

        <p className="text-[15px] text-slate-soft">
          Настоящее согласие является отдельным документом. Порядок обработки данных Оператором и мои права подробно изложены в{' '}
          <a
            href="/policy"
            onClick={(e) => {
              if (onOpenPolicy) {
                e.preventDefault();
                onOpenPolicy();
              }
            }}
            className="text-orange underline"
          >
            Политике в отношении обработки персональных данных
          </a>
          .
        </p>

        <section className="bg-white p-5 rounded-card border border-line text-[15px] space-y-1">
          <p className="font-semibold text-slate">Реквизиты Оператора</p>
          <p>Индивидуальный предприниматель Винтер Даниил Денисович</p>
          <p>ОГРНИП: 326246800181294</p>
          <p>ИНН: 243902737230</p>
          <p>E-mail: <a href="mailto:vinterdaniil@yandex.ru" className="text-orange underline">vinterdaniil@yandex.ru</a></p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="btn-line px-5 py-2.5 rounded-pill text-[14px] font-medium inline-block"
        >
          ← Вернуться на главную
        </a>
        {onOpenPolicy && (
          <a
            href="/policy"
            onClick={(e) => {
              e.preventDefault();
              onOpenPolicy();
            }}
            className="text-[14px] text-slate-soft hover:text-orange underline"
          >
            Политика конфиденциальности →
          </a>
        )}
      </div>
    </article>
  );
};
