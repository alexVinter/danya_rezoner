import React from 'react';

export const StatsBanner: React.FC = () => {
  const statsList = [
    {
      value: "−33%",
      label: "к цене подписчика",
    },
    {
      value: "×1,9",
      label: "рост CTR",
    },
    {
      value: "114%",
      label: "плана по регистрациям",
    },
    {
      value: "+23%",
      label: "выручки с вебинаров",
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-y border-ink/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Радуга аркой над цифрами strictly as in ТЗ */}
        <div className="flex justify-center -mt-6 mb-4">
          <div className="w-40 sm:w-52 select-none pointer-events-none">
            <img
              src="/images/rainbow.png"
              alt="Радуга над цифрами"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* 4 цифры крупно заголовочным шрифтом */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="bg-canvas border border-ink/15 rounded-2xl p-5 text-center"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-ink-light leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Логотипы TgConf и eLama strictly as in ТЗ */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 pt-6 border-t border-ink/10 text-ink-muted text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-wider text-ink">TgConf</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-wider text-ink">eLama</span>
          </div>
        </div>

      </div>
    </section>
  );
};
