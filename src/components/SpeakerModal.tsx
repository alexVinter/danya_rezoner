import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Modal } from './Modal';

interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-2">
        [ Для организаторов мероприятий ]
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-3 leading-snug">
        Позвать Даню спикером
      </h3>

      <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-6">
        Выступаю на конференциях, вебинарах, закрытых митапах и подкастах. Доклады только на основе реальных цифр, без теоретической воды и рекламы собственных услуг со сцены.
      </p>

      <div className="space-y-4 mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
          [ типовые темы выступлений ]
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-ink-light">
          <div className="p-3.5 rounded-xl bg-canvas border border-ink/10 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>«Как снизить стоимость подписчика в Telegram Ads на 30–50%: методология тестов креативов»</span>
          </div>
          <div className="p-3.5 rounded-xl bg-canvas border border-ink/10 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>«Связка Директ → лендинг → Telegram: легальный внешний трафик в мессенджеры в эпоху ограничений»</span>
          </div>
          <div className="p-3.5 rounded-xl bg-canvas border border-ink/10 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>«Пересборка воронки в чат-ботах: как поднять доходимость до онлайн-вебинаров на треть»</span>
          </div>
        </div>
      </div>

      <div className="bg-canvas border border-ink/15 rounded-2xl p-4 text-xs text-ink-muted leading-relaxed mb-6">
        <strong className="text-ink block mb-1">Формат участия:</strong>
        Онлайн (по всей России и миру) или офлайн (Москва / Екатеринбург / другие города по согласованию). Презентации готовы, тайминг от 20 до 60 минут + сессия Q&A.
      </div>

      <div className="pt-4 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-ink-muted">
          Напишите тему, дату и формат:
        </span>
        <a
          href={siteConfig.telegramChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-white px-5 py-3 rounded-xl font-bold text-xs shadow-crisp hover:bg-ink-light transition-all"
        >
          <Send className="w-3.5 h-3.5 text-risograph-cyan" />
          <span>Написать в Telegram</span>
        </a>
      </div>
    </Modal>
  );
};
