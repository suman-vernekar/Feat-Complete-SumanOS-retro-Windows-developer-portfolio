import React from 'react';
import { X } from 'lucide-react';
import type { ToastNotification } from '../../types/os';
import { sound } from '../../utils/audio';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-12 right-4 z-[999999] space-y-2 max-w-sm w-full select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="win-outset p-3 bg-[#c0c0c0] text-black shadow-2xl flex items-start justify-between gap-3 border-2 border-white animate-bounce-short"
        >
          <div className="flex gap-2.5 items-start">
            <div className="text-xl pt-0.5">
              {toast.icon || '🔔'}
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-blue-900">{toast.title}</div>
              <div className="text-[11px] text-gray-800 leading-tight">{toast.message}</div>
              <div className="text-[10px] text-gray-500 font-mono">{toast.time}</div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onDismiss(toast.id);
            }}
            className="win-btn p-0.5 hover:bg-red-600 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
