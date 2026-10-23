import React from 'react';
import { siteConfig } from '../data/content';

interface FooterProps {
  onOpenPrivacy?: (tab?: 'privacy' | 'consent') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-plum text-paper pt-[72px] pb-8">
      <div className="max-w-site mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Avatar, Name, Role, Bio paragraph */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-4">
              <img
                src="/assets/avatar-daniil.webp"
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="w-16 h-16 rounded-pill flex-shrink-0 object-cover"
              />
              <div>
                <p className="m-0 text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-paper">
                  {siteConfig.authorName}
                </p>
                <p className="mt-1 mb-0 text-[15px] text-[#CDC6C4]">
                  {siteConfig.role}
                </p>
              </div>
            </div>

            <p className="mt-7 mb-0 text-[17px] leading-[1.55] max-w-[560px] text-paper">
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
              className="flink block text-paper hover:text-white no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Telegram</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold">
                @winter_daniil
              </span>
            </a>

            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flink block text-paper hover:text-white no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Канал о маркетинге</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold">
                {siteConfig.channelName}
              </span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flink block text-paper hover:text-white no-underline"
            >
              <span className="block text-[14px] text-[#CDC6C4]">Почта</span>
              <span className="block mt-1 text-[22px] leading-[1.25] font-semibold">
                {siteConfig.email}
              </span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line: 56px top margin, 20px top padding, border-top 1px #5A4650 */}
        <div className="mt-14 pt-5 border-t border-[#5A4650] flex flex-wrap justify-between items-center gap-y-3 gap-x-8 text-[14px] leading-[1.5] text-[#CDC6C4]">
          <p className="m-0">
            © {new Date().getFullYear()} {siteConfig.authorName} · {siteConfig.legalInfo}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenPrivacy?.('privacy')}
              className="flink text-[#CDC6C4] hover:text-paper bg-transparent border-0 p-0 cursor-pointer text-[14px]"
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.('consent')}
              className="flink text-[#CDC6C4] hover:text-paper bg-transparent border-0 p-0 cursor-pointer text-[14px]"
            >
              Согласие на обработку персональных данных
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
