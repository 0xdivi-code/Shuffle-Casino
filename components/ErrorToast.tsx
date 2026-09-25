"use client";
import { useEffect } from 'react';
import { X, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function ErrorToast({ message, isVisible, onClose, duration = 4000 }: ErrorToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-6 right-6 z-[200] max-w-[380px]"
        >
          <div className="bg-[#f1323e] border border-[#ff4d4d] text-white rounded-[8px] shadow-[0_8px_30px_rgba(241,50,62,0.4)] px-4 py-3 flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[13px] leading-[1.2] mb-1">API Error</div>
              <div className="text-[12px] leading-[1.4] text-white/90 font-medium">
                {message}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-white/60 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
                <a
                  href="https://t.me/vicckr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
                >
                  Contact
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-[4px] transition-colors flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
