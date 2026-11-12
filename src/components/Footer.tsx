import React from 'react';
import { siteConfig } from '../data/content';

interface FooterProps {
  onOpenPrivacy?: (tab?: 'privacy' | 'consent') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy: _onOpenPrivacy }) => {
  return (
    <footer className="bg-plum text-paper pt-[72px] pb-8">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Bio paragraph (badge removed per TZ) */}
          <div className="md:col-span-7">
            <p className="m-0 text-[17px] leading-[1.55] max-w-[560px] text-paper">
              Платный трафик в контент и воронки. Подписчики в каналы, системные тесты креативов и регистрации на мероприятия.
              <br />
              Да и в целом любую креативную механику или посев могу реализовать.
            </p>
          </div>

          {/* Right Column (5 cols): 3 contact links stacked */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a
              href={siteConfig.telegramPersonalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Telegram</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold text-paper group-hover:underline group-hover:text-white transition-colors">
                @winter_daniil
              </span>
            </a>

            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Канал о маркетинге</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold text-paper group-hover:underline group-hover:text-white transition-colors">
                {siteConfig.channelName}
              </span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="group block no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Почта</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold text-paper group-hover:underline group-hover:text-white transition-colors">
                {siteConfig.email}
              </span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line: 56px top margin, 20px top padding, border-top 1px #5A4650 */}
        <div className="mt-14 pt-5 border-t border-[#5A4650] flex flex-wrap justify-between items-center gap-y-3 gap-x-8 text-[14px] leading-[1.5] text-[#CDC6C4]">
          <p className="m-0">
            © 2026. Все права защищены
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="/policy"
              className="text-[#CDC6C4] hover:text-paper hover:underline no-underline text-[14px] transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/soglasie"
              className="text-[#CDC6C4] hover:text-paper hover:underline no-underline text-[14px] transition-colors"
            >
              Согласие на обработку персональных данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
