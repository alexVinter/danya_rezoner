import React from 'react';
import { ServiceItem } from '../data/services';
import { Check, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Modal } from './Modal';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOrder: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOrder }) => {
  if (!service) return null;

  return (
    <Modal
      isOpen={!!service}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      {/* Timeline */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-ink-muted flex items-center gap-1 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{service.timeline}</span>
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-3 leading-snug">
        {service.title}
      </h2>

      {/* Short desc */}
      <p className="text-sm sm:text-base text-ink-light mb-6 leading-relaxed">
        {service.shortDesc}
      </p>

      {/* For Whom */}
      <div className="bg-canvas border border-ink/15 rounded-2xl p-4 mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-ink mb-1">
          Кому идеально подходит:
        </div>
        <div className="text-sm text-ink-light leading-relaxed">
          {service.forWhom}
        </div>
      </div>

      {/* What's Inside */}
      <div className="mb-6 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-mono">
          [ что входит в услугу ]
        </div>
        <div className="space-y-2">
          {service.whatsInside.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-canvas border border-ink/10 text-xs sm:text-sm text-ink-light"
            >
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tariffs if present */}
      {service.tariffs && service.tariffs.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-mono">
            [ варианты тарифов ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.tariffs.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl border-2 border-ink bg-canvas shadow-crisp">
                <div className="font-bold text-sm text-ink mb-1">{t.name}</div>
                <div className="font-display text-xl font-bold text-ink mb-1">{t.price}</div>
                <div className="text-xs text-ink-muted">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget recommendation */}
      <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Рекомендуемый рекламный бюджет: </span>
          <span>{service.minBudget}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-ink-muted">Стоимость работы:</div>
          <div className="font-display text-2xl font-bold text-ink">
            {service.price}
          </div>
        </div>

        <button
          onClick={() => {
            onOrder(service.title);
            onClose();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-crisp hover:bg-ink-light transition-all"
        >
          <span>Обсудить задачу</span>
          <ArrowRight className="w-4 h-4 text-risograph-cyan" />
        </button>
      </div>
    </Modal>
  );
};
