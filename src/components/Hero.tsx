import React from 'react';
import { Send, FileText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface HeroProps {
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      
      {/* Цветы по краям первого экрана strictly as in ТЗ */}
      <div className="absolute top-20 left-[-30px] md:left-2 w-32 md:w-44 pointer-events-none select-none animate-sway">
        <img
          src="/images/flowers-tiger.png"
          alt=""
          className="w-full h-auto object-contain scale-x-[-1]"
        />
      </div>
      <div className="absolute top-24 right-[-30px] md:right-2 w-36 md:w-48 pointer-events-none select-none animate-sway">
        <img
          src="/images/flowers-tiger.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Текстовая часть первого экрана */}
          <div className="md:col-span-7 flex flex-col items-start">
            
            {/* Оффер одной фразой */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-ink leading-[1.05] mb-6">
              {siteConfig.offerHeading}
            </h1>

            {/* Подзаголовок strictly as in ТЗ */}
            <p className="text-lg sm:text-xl text-ink-light leading-relaxed mb-8 max-w-xl">
              {siteConfig.offerSubheading}
            </p>

            {/* Кнопки strictly as in ТЗ: «Написать в Telegram», рядом поменьше «Забрать чек-лист» */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-white px-7 py-4 rounded-2xl text-base font-semibold hover:bg-ink-light transition-colors"
              >
                <Send className="w-5 h-5 text-risograph-cyan" />
                <span>Написать в Telegram</span>
              </a>

              <a
                href={siteConfig.botLeadMagnetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-ink border border-ink/30 hover:border-ink px-5 py-4 rounded-2xl text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4 text-risograph-pink" />
                <span>Забрать чек-лист в боте</span>
              </a>
            </div>

          </div>

          {/* Фото Дани без фона + стикер «Место для рекламы» strictly as in ТЗ */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm flex flex-col items-center">
              
              {/* Стикер «Место для рекламы» (чуть отклеивается при наведении) */}
              <div className="absolute top-2 right-4 z-20">
                <div className="sticker-peel bg-risograph-yellow border border-ink px-3 py-1.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider text-ink shadow-sm rotate-3 cursor-pointer">
                  Место для рекламы
                </div>
              </div>

              {/* Фото Дани без фона (или маскот-заглушка с подписью под фото) */}
              <div className="w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center relative">
                <img
                  src="/images/lion-avatar.png"
                  alt="Даниил Винтер"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
