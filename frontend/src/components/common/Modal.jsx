import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with soft warm blur */}
      <div
        className="fixed inset-0 bg-[#3D2B24]/50 dark:bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-white/95 dark:bg-[#30211B]/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-10px_rgba(61,43,36,0.25)] border border-[#F6EBDD] dark:border-[#553B30] p-6 sm:p-7 z-10 my-8 transition-all animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F6EBDD] dark:border-[#553B30]">
          <h3 className="text-xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 hover:text-[#E9785B] dark:hover:text-[#F5B895] rounded-xl hover:bg-[#F6EBDD] dark:hover:bg-[#452E25] transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
