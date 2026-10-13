import React, { useEffect } from 'react';
import { CaseItem } from '../data/cases';
import { ArrowLeft, ArrowRight, FileDown, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

interface CaseDetailViewProps {
  caseItem: CaseItem;
  onBack: () => void;
  onWantSame: (caseTitle: string) => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  caseItem,
  onBack,
  onWantSame,
}) => {
  // Always scroll to the very top when case page opens
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [caseItem.id]);

  const scrollToResults = () => {
    const el = document.getElementById('case-results-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-24">
      
      {/* Dedicated top navigation bar */}
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-ink/10 py-3.5 px-4 sm:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBack}
              className="font-display text-2xl font-bold tracking-tight text-ink uppercase focus:outline-none"
            >
              Даня
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink hover:text-ink-light transition-colors px-3 py-1.5 rounded-xl border border-ink/15 hover:border-ink bg-white shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ко всем кейсам</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={scrollToResults}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-risograph-yellow hover:bg-amber-400 text-ink border border-ink shadow-crisp transition-all"
            >
              ↓ К результатам
            </button>
            {caseItem.pdfUrl && (
              <a
                href={caseItem.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink-light hover:text-ink font-medium px-3 py-1.5 rounded-xl border border-ink/20 hover:border-ink bg-white transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-risograph-cyan" />
                <span>PDF-оригинал</span>
              </a>
            )}
            <button
              onClick={() => onWantSame(caseItem.title)}
              className="hidden md:inline-flex items-center gap-1.5 bg-ink text-white px-3.5 py-1.5 rounded-xl font-bold text-xs hover:bg-ink-light transition-colors"
            >
              <span>Хочу так же →</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Case Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted mb-4">
          <button onClick={onBack} className="hover:underline">Кейсы</button>
          <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          <span className="text-ink font-semibold">{caseItem.platforms}</span>
        </div>

        {/* Niche & Platform banner */}
        <div className="text-xs sm:text-sm font-mono text-ink-muted mb-3 tracking-wide">
          {caseItem.platforms} • {caseItem.niche}
        </div>

        {/* Big Headline with Key Numbers (Oswald / Cyrillic) */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-ink mb-6 leading-[1.08]">
          {caseItem.title}
        </h1>

        {/* Quick Result Hero Quote */}
        {caseItem.resultHero && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ink/15 mb-8 text-base sm:text-lg font-medium text-ink leading-relaxed">
            «{caseItem.resultHero}»
          </div>
        )}

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-ink/15">
          <button
            onClick={scrollToResults}
            className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-risograph-yellow hover:bg-amber-400 text-ink border border-ink shadow-crisp transition-all"
          >
            ↓ Сразу к результатам в цифрах
          </button>

          {caseItem.pdfUrl && (
            <a
              href={caseItem.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-ink-light hover:text-ink font-medium px-4 py-2.5 rounded-xl border border-ink/20 hover:border-ink bg-white transition-colors"
            >
              <FileDown className="w-4 h-4 text-risograph-cyan" />
              <span>Открыть оригинальный PDF-кейс</span>
            </a>
          )}
        </div>

        {/* Block: Задача */}
        <section className="mb-8 bg-white border border-ink/15 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-3">
            Задача проекта
          </h2>
          <p className="text-sm sm:text-base text-ink-light leading-relaxed">
            {caseItem.taskText}
          </p>
        </section>

        {/* Block: Сложность ниши */}
        <section className="mb-8 bg-white border border-ink/15 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-3">
            Сложность ниши
          </h2>
          <p className="text-sm sm:text-base text-ink-light leading-relaxed">
            {caseItem.challengeText}
          </p>
        </section>

        {/* Block: Что не сработало (Честный тест) */}
        {caseItem.whatFailedText && (
          <section className="mb-8 p-6 sm:p-8 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Что не сработало (и стало гипотезой для пересборки)</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              {caseItem.whatFailedText}
            </p>
          </section>
        )}

        {/* Block: Что сработало и легло в результат */}
        <section className="mb-10 bg-white border border-ink/15 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-4">
            Что сработало и легло в результат
          </h2>
          <div className="space-y-3">
            {caseItem.whatWorked.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-canvas border border-ink/10 text-sm sm:text-base text-ink leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results in dry numbers (Anchor target) */}
        <section id="case-results-section" className="mb-12 pt-8 border-t-2 border-ink scroll-mt-20">
          <div className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">
            [ итоговые цифры ]
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-6">
            Результаты в сухом остатке
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {caseItem.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border-2 border-ink text-center shadow-crisp"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-ink">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-ink-light mt-1.5 leading-snug">
                  {m.label}
                </div>
                {m.hint && (
                  <div className="text-[11px] text-ink-muted mt-1">
                    {m.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Conversion CTA Block at Bottom */}
        <section className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-10 shadow-pop">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-2">
              Хотите повторить этот результат в своём проекте?
            </h3>
            <p className="text-sm sm:text-base text-ink-light leading-relaxed mb-6">
              Методология тестов и связок легко адаптируется под ваши задачи: VK Ads, Директ, Telegram или воронки в ботах. Обсудим проект на 30-минутном созвоне.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onWantSame(caseItem.title)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-crisp hover:bg-ink-light transition-all"
              >
                <span>Хочу так же</span>
                <ArrowRight className="w-4 h-4 text-risograph-cyan" />
              </button>

              <button
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-ink/20 hover:border-ink text-ink font-semibold text-xs sm:text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Вернуться ко всем кейсам</span>
              </button>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
};
