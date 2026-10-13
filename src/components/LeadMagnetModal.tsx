import React, { useState } from 'react';
import { Send, CheckCircle2, FileText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Modal } from './Modal';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose }) => {
  const [telegram, setTelegram] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // reset after closing animation
    setTimeout(() => {
      setSubmitted(false);
      setTelegram('');
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-lg"
    >
      {submitted ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-emerald-100 border-2 border-ink rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-800 shadow-crisp">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl font-bold uppercase text-ink mb-2">
            Чек-лист готов к отправке!
          </h3>
          <p className="text-sm text-ink-light leading-relaxed mb-6">
            Мы перенаправляем вас в Telegram-бота, который мгновенно отдаст файл с 12 рабочими связками и закрепит за вами бонусы.
          </p>
          <a
            href={siteConfig.botLeadMagnetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-xl font-bold text-sm shadow-crisp hover:bg-ink-light transition-all"
          >
            <Send className="w-4 h-4 text-risograph-cyan" />
            <span>Забрать в Telegram-боте</span>
          </a>
        </div>
      ) : (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-2">
            [ Бесплатный материал ]
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-3 leading-snug">
            Чек-лист: 12 связок платного трафика в контент
          </h3>

          <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-6">
            Реальные механики из кейсов Экстерна, Эльбы и HTML Academy: как вести людей из Директа и VK в Telegram с удержанием 95% и контролировать цену подписчика.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Куда прислать материал? (Telegram @username)
              </label>
              <input
                type="text"
                required
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@your_telegram"
                className="w-full px-4 py-3 rounded-xl border-2 border-ink/30 focus:border-ink focus:outline-none text-sm bg-canvas"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-risograph-yellow hover:bg-amber-400 text-ink font-bold text-sm border-2 border-ink shadow-crisp transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Получить чек-лист</span>
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-ink-muted">Или заберите сразу напрямую: </span>
              <a
                href={siteConfig.botLeadMagnetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-ink underline hover:text-ink-light"
              >
                Telegram-бот →
              </a>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};
