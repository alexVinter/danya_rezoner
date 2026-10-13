import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-2xl',
  className = '',
  showCloseButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock background body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Always reset scroll to top when modal opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering wrapper: min-h-full flex justify-center py-6 sm:py-12 (NO items-center on parent so top is NEVER cut off) */}
      <div
        className="min-h-full flex justify-center py-6 sm:py-12 px-3 sm:px-6 relative z-10"
        onClick={onClose}
      >
        {/* Modal card */}
        <div
          className={`relative w-full bg-white border-2 border-ink rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-left my-auto transform transition-all shadow-2xl ${maxWidth} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-ink/20 hover:border-ink flex items-center justify-center text-ink hover:bg-canvas transition-colors z-20"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
