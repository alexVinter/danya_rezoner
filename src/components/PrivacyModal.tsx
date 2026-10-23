import React from 'react';
import { siteConfig } from '../data/content';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-[1.5px] border-slate rounded-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-slate shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-5 top-5 w-9 h-9 rounded-pill bg-paper border border-slate flex items-center justify-center text-slate hover:bg-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        <h3 className="m-0 text-[24px] sm:text-[28px] font-bold leading-[1.2] text-slate mb-4">
          Политика обработки персональных данных
        </h3>

        <div className="space-y-4 text-[14px] sm:text-[15px] leading-[1.6] text-slate">
          <p>
            Настоящая Политика регулирует порядок сбора, обработки и защиты персональных данных пользователей сайта {siteConfig.authorName} ({siteConfig.email}) в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных».
          </p>

          <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">1. Сбор данных</h4>
          <p>
            Оператор собирает только те данные, которые пользователь добровольно предоставляет через форму обратной связи на сайте: имя, контакт в Telegram, описание задачи.
          </p>

          <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">2. Цели обработки</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Связь с пользователем для обсуждения проекта и оказания маркетинговых услуг.</li>
            <li>Оценка рекламных показателей и подготовка коммерческого предложения.</li>
          </ul>

          <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">3. Хранение и безопасность</h4>
          <p>
            Персональные данные обрабатываются на территории Российской Федерации и не передаются третьим лицам без законных оснований.
          </p>

          <h4 className="font-bold text-[16px] text-slate pt-2 mb-1">4. Согласие и отзыв</h4>
          <p>
            Отправляя форму на сайте, пользователь подтверждает согласие с настоящими условиями. Согласие может быть отозвано в любой момент письменным обращением на электронную почту {siteConfig.email}.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-line flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-s h-11 px-6 rounded-pill text-[15px] font-semibold cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
