import React from 'react';
import { Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const MobileStickyBar: React.FC = () => {
  return (
    <div id="mobile-sticky-bar" className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-canvas/95 backdrop-blur-md border-t-2 border-ink md:hidden shadow-lg">
      <a
        href={siteConfig.telegramChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-ink text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-crisp active:translate-y-0"
      >
        <Send className="w-4 h-4 text-risograph-cyan" />
        <span>Написать Дане в Telegram</span>
      </a>
    </div>
  );
};
