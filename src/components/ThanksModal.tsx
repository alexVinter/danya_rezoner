import React from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Modal } from './Modal';

interface ThanksModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: any;
}

export const ThanksModal: React.FC<ThanksModalProps> = ({ isOpen, onClose, leadData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      className="text-center"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center text-emerald-800 mx-auto mb-4 shadow-crisp">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      {/* Heading */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-2">
        Заявка успешно отправлена!
      </h2>

      <p className="text-sm text-ink-light leading-relaxed mb-6">
        Спасибо, {leadData?.name || 'коллега'}! Данные записаны. Я напишу вам в Telegram{' '}
        <strong className="text-ink font-semibold">{leadData?.telegram || ''}</strong> в течение 2–3 рабочих часов для согласования 30-минутного созвона-знакомства.
      </p>

      {/* Bonus while waiting */}
      <div className="bg-canvas border border-ink/20 rounded-2xl p-4 text-left mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-ink mb-1 font-mono">
          [ пока ждёте ответа ]
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          Полистайте авторский канал «Резонёр» в Telegram — там свежие разборы креативов и цифры по перформанс-кампаниям.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={siteConfig.telegramChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-white px-6 py-3.5 rounded-xl font-bold text-xs shadow-crisp hover:bg-ink-light transition-all"
        >
          <Send className="w-3.5 h-3.5 text-risograph-cyan" />
          <span>Перейти в канал «Резонёр»</span>
        </a>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-ink/20 hover:border-ink text-xs font-semibold text-ink-light hover:text-ink transition-colors"
        >
          Закрыть
        </button>
      </div>
    </Modal>
  );
};
