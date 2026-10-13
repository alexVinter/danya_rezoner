import React from 'react';
import { siteConfig } from '../data/content';

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-plum text-paper pt-16 pb-8">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-pill bg-paper inline-flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/lion-mark.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-[34px] h-auto"
                />
              </span>
              <span className="text-[20px] font-bold text-paper">
                {siteConfig.authorName}
              </span>
            </div>

            <p className="mt-5 mb-0 text-[15px] leading-[1.55] text-[#CDC6C4] max-w-[440px]">
              {siteConfig.brandSummary}
            </p>

            <p className="mt-3 mb-0 text-[15px] leading-[1.55] text-[#CDC6C4] max-w-[440px]">
              {siteConfig.legalInfo}
            </p>
          </div>

          {/* Col 2: Contacts (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-[16px]">
            <p className="m-0 mb-1 text-[14px] text-[#CDC6C4]">
              Связаться
            </p>
            <a
              href={siteConfig.telegramPersonalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flink text-paper hover:text-white"
            >
              Telegram @winter_daniil
            </a>
            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flink text-paper hover:text-white"
            >
              {siteConfig.channelName}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flink text-paper hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Col 3: Documents (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-2.5 text-[16px]">
            <p className="m-0 mb-1 text-[14px] text-[#CDC6C4]">
              Документы
            </p>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="flink text-paper hover:text-white text-left p-0 bg-transparent border-0 cursor-pointer text-[16px]"
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="flink text-paper hover:text-white text-left p-0 bg-transparent border-0 cursor-pointer text-[16px]"
            >
              Согласие на обработку персональных данных
            </button>
          </div>
        </div>

        {/* Bottom copyright line: exactly "© 2026 Даня Винтер" */}
        <p className="mt-12 mb-0 pt-5 border-t border-[#5A4650] text-[14px] text-[#CDC6C4]">
          © {new Date().getFullYear()} {siteConfig.authorName}
        </p>
      </div>
    </footer>
  );
};
