import React from 'react';
import { clientTasksData } from '../data/tasks';

export const ClientTasks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Заголовок */}
      <div className="mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-2">
          С чем приходят
        </h2>
        <p className="text-base text-ink-muted">
          Задачи словами клиента — без рекламных обещаний.
        </p>
      </div>

      {/* 4–5 карточек, раскрытые, без тогла, звездочка ✷, без теней */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clientTasksData.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-ink/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <span className="text-xl text-ink leading-none select-none block mb-3 font-mono">
                ✷
              </span>
              <p className="font-bold text-base sm:text-lg text-ink mb-3 leading-snug">
                {task.quote}
              </p>
              <p className="text-sm text-ink-light leading-relaxed">
                {task.explanation}
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-ink/10 text-xs text-ink-muted">
              {task.solutionHint}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
