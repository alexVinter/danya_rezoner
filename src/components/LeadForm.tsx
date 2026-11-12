import React, { useState } from 'react';
import { sendTelegramMessage } from '../utils/sendLead';

export interface LeadFormProps {
  pageName?: string;
  onOpenPrivacy?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ pageName = 'Главная', onOpenPrivacy: _onOpenPrivacy }) => {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    task: '',
    budget: 'Выберите',
    source: 'Выберите',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.telegram.trim() || !formData.consent) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    const payload = {
      page: pageName,
      name: formData.name.trim(),
      telegram: formData.telegram.trim(),
      task: formData.task.trim() || undefined,
      budget: formData.budget !== 'Выберите' ? formData.budget : undefined,
      source: formData.source !== 'Выберите' ? formData.source : undefined,
      consent: formData.consent,
      createdAt: new Date().toISOString(),
    };

    // 1. Backup to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('danya_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('danya_leads', JSON.stringify(existing));
    } catch {
      // ignore localStorage errors
    }

    // 2. Send to Telegram
    const botToken =
      (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN ||
      '8881601798:AAG9d5YSRk0XDRjdudvCkjXqWxEIqEg17VM';
    const chatId = (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID || '436863522';

    const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lines = [
      '🔔 <b>Новая заявка с сайта!</b>',
      '',
      `📄 <b>Страница:</b> ${escapeHtml(pageName)}`,
      `👤 <b>Имя:</b> ${escapeHtml(formData.name.trim())}`,
      `✈️ <b>Telegram:</b> ${escapeHtml(formData.telegram.trim())}`,
    ];

    if (formData.task.trim()) {
      lines.push(`📝 <b>Задача:</b>\n${escapeHtml(formData.task.trim())}`);
    }
    if (formData.budget !== 'Выберите') {
      lines.push(`💰 <b>Бюджет:</b> ${escapeHtml(formData.budget)}`);
    }
    if (formData.source !== 'Выберите') {
      lines.push(`🔍 <b>Откуда узнали:</b> ${escapeHtml(formData.source)}`);
    }

    let success = false;
    try {
      success = await sendTelegramMessage({ botToken, chatId, text: lines.join('\n') });
    } finally {
      setIsSubmitting(false);
      if (success) {
        setSubmitted(true);
      } else {
        setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую в Telegram: @winter_daniil.');
      }
    }
  };

  if (submitted) {
    return (
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
    );
  }

  return (
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

      {/* Задача */}
      <label className="flex flex-col gap-1.5 text-[14px] font-medium text-slate">
        <span>Задача</span>
        <textarea
          name="task"
          rows={4}
          placeholder="Расскажите, с чем вам помочь, и приложите ссылку на проект"
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
          className="min-h-[132px] border-[1.5px] border-slate rounded-input p-[14px_16px] text-[17px] leading-[1.45] text-slate bg-white placeholder:text-slate-soft outline-none focus:border-orange transition-colors resize-y font-sans"
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
            <option value="больше 300 000 ₽">больше 300 000 ₽</option>
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
            <option value="Канал «Резонёр»">Канал «Резонёр»</option>
            <option value="Конференция или вебинар">Конференция или вебинар</option>
            <option value="Рекомендация">Рекомендация</option>
            <option value="Поиск">Поиск</option>
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

      {/* Чекбокс согласия */}
      <label className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-slate mt-1 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="flex-shrink-0 w-5 h-5 mt-0.5 accent-orange rounded cursor-pointer"
        />
        <span>
          Даю{' '}
          <a href="/soglasie" className="lnk text-slate">
            согласие на обработку персональных данных
          </a>{' '}
          и ознакомлен с{' '}
          <a href="/policy" className="lnk text-slate">
            политикой конфиденциальности
          </a>
        </span>
      </label>

      {submitError && (
        <p role="alert" className="m-0 text-[14px] leading-[1.5] text-orange-hover">
          {submitError}
        </p>
      )}

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={!formData.name.trim() || !formData.telegram.trim() || !formData.consent || isSubmitting}
        className="btn-o mt-1 h-14 border-0 rounded-pill text-[17px] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};
