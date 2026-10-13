import React from 'react';
import { CaseItem } from '../data/cases';
import { CheckCircle2, AlertTriangle, FileDown, ArrowRight } from 'lucide-react';
import { Modal } from './Modal';

interface CaseModalProps {
  caseItem: CaseItem | null;
  onClose: () => void;
  onWantSame: (caseTitle: string) => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ caseItem, onClose, onWantSame }) => {
  if (!caseItem) return null;

  const scrollToResults = () => {
    const el = document.getElementById('case-results-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Modal
      isOpen={!!caseItem}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      {/* Niche & Platform line without clutter badges */}
      <div className="text-xs font-mono text-ink-muted mb-2 tracking-wide">
        {caseItem.platforms} • {caseItem.niche}
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink mb-4 leading-tight">
        {caseItem.title}
      </h2>

      {/* Button «Сразу к результатам» as specified in ТЗ */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          onClick={scrollToResults}
          className="text-xs font-bold px-4 py-2.5 rounded-xl bg-risograph-yellow hover:bg-amber-400 text-ink border border-ink shadow-crisp transition-all"
        >
          ↓ Сразу к результатам
        </button>

        {caseItem.pdfUrl && (
          <a
            href={caseItem.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-ink-light hover:text-ink font-medium px-3.5 py-2.5 rounded-xl border border-ink/20 hover:border-ink transition-colors"
          >
            <FileDown className="w-4 h-4 text-risograph-cyan" />
            <span>Открыть оригинальный PDF</span>
          </a>
        )}
      </div>

      {/* Task & Context */}
      <div className="mb-6 space-y-2">
        <h3 className="font-display text-lg font-bold uppercase text-ink">
          Задача
        </h3>
        <p className="text-sm text-ink-light leading-relaxed bg-canvas p-4 rounded-2xl border border-ink/10">
          {caseItem.taskText}
        </p>
      </div>

      {/* Challenge / Complexity */}
      <div className="mb-6 space-y-2">
        <h4 className="font-display text-base font-bold uppercase text-ink">
          Сложность ниши
        </h4>
        <p className="text-sm text-ink-light leading-relaxed">
          {caseItem.challengeText}
        </p>
      </div>

      {/* What Failed (Honest test failures) */}
      {caseItem.whatFailedText && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Что не сработало (и стало гипотезой)</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {caseItem.whatFailedText}
          </p>
        </div>
      )}

      {/* What Worked */}
      <div className="mb-8 space-y-3">
        <h3 className="font-display text-lg font-bold uppercase text-ink">
          Что сработало и легло в результат
        </h3>
        <div className="space-y-2.5">
          {caseItem.whatWorked.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-canvas border border-ink/10 text-xs sm:text-sm text-ink-light leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Results Section (Target of anchor) */}
      <div id="case-results-section" className="pt-6 border-t-2 border-ink mb-8 scroll-mt-6">
        <div className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-1">
          [ итоговые цифры ]
        </div>
        <h3 className="font-display text-2xl font-bold uppercase text-ink mb-4">
          Результаты в сухом остатке
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {caseItem.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-canvas border-2 border-ink text-center shadow-crisp"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {m.value}
              </div>
              <div className="text-xs font-semibold text-ink-light mt-1">
                {m.label}
              </div>
              {m.hint && (
                <div className="text-[10px] text-ink-muted mt-0.5">
                  {m.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions: Button «Хочу так же» as in ТЗ */}
      <div className="pt-6 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-ink-muted text-center sm:text-left">
          Методология переносится на Директ, VK и новые каналы.
        </span>
        <button
          onClick={() => {
            onWantSame(caseItem.title);
            onClose();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-crisp hover:bg-ink-light transition-all"
        >
          <span>Хочу так же</span>
          <ArrowRight className="w-4 h-4 text-risograph-cyan" />
        </button>
      </div>
    </Modal>
  );
};
