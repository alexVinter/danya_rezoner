import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '../data/content';

export type PrivacyTab = 'privacy' | 'consent';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PrivacyTab;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<PrivacyTab>(initialTab);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync tab when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate/70 backdrop-blur-sm"
      style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-[1.5px] border-slate rounded-card max-w-2xl w-full max-h-[88vh] flex flex-col text-slate shadow-2xl relative overflow-hidden my-auto"
      >
        {/* Header with Title and Close Button */}
        <div className="p-6 sm:p-8 pb-4 border-b border-line/60 flex items-start justify-between gap-4">
          <div>
            <h3 className="m-0 text-[22px] sm:text-[26px] font-bold leading-[1.2] text-slate">
              {activeTab === 'privacy'
                ? 'Политика конфиденциальности'
                : 'Согласие на обработку персональных данных'}
            </h3>
            <p className="mt-1 mb-0 text-[13px] text-slate-soft">
              {siteConfig.authorName} · {siteConfig.legalInfo}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="flex-shrink-0 w-9 h-9 rounded-pill bg-paper border border-slate flex items-center justify-center text-slate hover:bg-slate hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 sm:px-8 pt-3 pb-1 flex gap-2 border-b border-line/40 bg-paper/50">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-1.5 rounded-pill text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer border-0 ${
              activeTab === 'privacy'
                ? 'bg-slate text-white'
                : 'bg-transparent text-slate hover:bg-paper'
            }`}
          >
            Политика
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('consent')}
            className={`px-3.5 py-1.5 rounded-pill text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer border-0 ${
              activeTab === 'consent'
                ? 'bg-slate text-white'
                : 'bg-transparent text-slate hover:bg-paper'
            }`}
          >
            Согласие
          </button>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-[14px] sm:text-[15px] leading-[1.6] text-slate">
          {activeTab === 'privacy' ? (
            <>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных физических лиц, пользующихся сайтом {siteConfig.authorName} ({siteConfig.email}), в соответствии с требованиями Федерального закона РФ от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">1. Какие данные собираются</h4>
              <p>
                Оператор собирает только те данные, которые пользователь добровольно указывает в формах на сайте:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Имя (для персонализации общения);</li>
                <li>Контакт в Telegram (для оперативной связи и ответа);</li>
                <li>Описание задачи или ссылка на проект;</li>
                <li>Ориентировочный бюджет и источник, откуда пользователь узнал о сайте.</li>
              </ul>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">2. Цели обработки данных</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Установление контакта и обратная связь по запросу пользователя.</li>
                <li>Консультация, предварительный расчёт бюджета и подготовка коммерческого предложения.</li>
                <li>Заключение и исполнение договоров на оказание маркетинговых услуг.</li>
              </ul>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">3. Хранение и передача данных</h4>
              <p>
                Все данные хранятся и обрабатываются на серверах, расположенных на территории Российской Федерации. Данные не передаются третьим лицам, за исключением случаев, прямо предусмотренных законодательством РФ.
              </p>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">4. Сроки обработки и отзыв</h4>
              <p>
                Данные обрабатываются до момента достижения целей обработки или до отзыва согласия пользователем. Отозвать согласие можно в любой момент, отправив письменный запрос на электронную почту{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-orange font-medium underline">
                  {siteConfig.email}
                </a>.
              </p>
            </>
          ) : (
            <>
              <p>
                Заполняя и отправляя форму обратной связи на настоящем сайте, пользователь свободно, своей волей и в своем интересе дает согласие {siteConfig.authorName} ({siteConfig.legalInfo}, email: {siteConfig.email}) на обработку своих персональных данных.
              </p>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">1. Перечень данных, на обработку которых даётся согласие:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Имя;</li>
                <li>Никнейм или контактный аккаунт в Telegram;</li>
                <li>Сведения о проекте, рекламной задаче и бюджете, добровольно предоставленные в сообщении;</li>
                <li>Технические данные (IP-адрес, файлы cookie, источник перехода), автоматически передаваемые устройством.</li>
              </ul>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">2. Действия с персональными данными:</h4>
              <p>
                Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача по каналам связи (Telegram Bot API, электронная почта), обезличивание, блокирование, удаление, уничтожение персональных данных как с использованием средств автоматизации, так и без них.
              </p>

              <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">3. Срок действия согласия:</h4>
              <p>
                Настоящее согласие действует бессрочно с момента отправки формы до момента его отзыва путем направления письменного заявления на адрес электронной почты:{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-orange font-medium underline">
                  {siteConfig.email}
                </a>.
              </p>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 px-6 sm:px-8 border-t border-line/60 bg-paper/30 flex items-center justify-between gap-4">
          <span className="text-[12px] sm:text-[13px] text-slate-soft">
            152-ФЗ «О персональных данных»
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-s h-10 px-6 rounded-pill text-[14px] font-semibold cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};
