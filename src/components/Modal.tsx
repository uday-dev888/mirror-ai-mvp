import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, children, maxWidth = 'lg' }: ModalProps) {
  const maxWidths = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      <div
        className={`relative bg-[#FAF8F3] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-full ${maxWidths[maxWidth]} max-h-[90vh] overflow-y-auto animate-slideUp`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200 z-10"
        >
          <X size={24} className="text-[#6B4423]" />
        </button>

        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }
        .animate-slideUp {
          animation: slideUp 300ms ease-out;
        }
      `}</style>
    </div>
  );
}
