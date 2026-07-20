import React, { useState } from 'react';
import { Power, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ShutdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const ShutdownModal: React.FC<ShutdownModalProps> = ({ isOpen, onClose, onRestart }) => {
  const [option, setOption] = useState<'shutdown' | 'restart' | 'logoff'>('shutdown');
  const [state, setState] = useState<'dialog' | 'shuttingdown' | 'safe'>('dialog');

  if (!isOpen) return null;

  const handleConfirm = () => {
    sound.playShutdownSound();
    if (option === 'restart') {
      onRestart();
    } else if (option === 'shutdown') {
      setState('shuttingdown');
      setTimeout(() => {
        setState('safe');
      }, 2000);
    } else {
      onRestart();
    }
  };

  if (state === 'safe') {
    return (
      <div className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center p-6 text-center select-none">
        <h1 className="text-amber-500 font-serif text-3xl font-bold mb-4 tracking-wider">
          It is now safe to turn off your computer.
        </h1>
        <p className="text-gray-400 text-sm mb-6">Or click below to boot back into SumanOS</p>
        <button
          onClick={() => {
            sound.playBootSound();
            setState('dialog');
            onClose();
            onRestart();
          }}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded shadow border border-amber-300"
        >
          Power On (Restart SumanOS)
        </button>
      </div>
    );
  }

  if (state === 'shuttingdown') {
    return (
      <div className="fixed inset-0 z-[999999] bg-[#008080] flex flex-col items-center justify-center text-white font-sans">
        <div className="win-outset p-8 bg-[#c0c0c0] text-black text-center space-y-4">
          <div className="animate-spin text-3xl text-blue-900 mx-auto">⚙️</div>
          <h2 className="text-xl font-bold">Windows is shutting down...</h2>
          <p className="text-xs text-gray-700">Saving your portfolio session data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center p-4">
      <div className="win-outset max-w-sm w-full p-1 bg-[#c0c0c0] text-black shadow-2xl">
        <div className="win-titlebar">
          <span className="flex items-center gap-1 font-bold">
            <Power className="w-4 h-4" /> Shut Down Windows
          </span>
          <button onClick={onClose} className="win-btn px-1.5 py-0 text-xs font-bold">
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-amber-500 text-black flex items-center justify-center rounded-full text-2xl shadow border-2 border-white">
              💻
            </div>
            <div className="space-y-1">
              <p className="font-bold text-sm">What do you want the computer to do?</p>
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-option"
                    checked={option === 'shutdown'}
                    onChange={() => setOption('shutdown')}
                  />
                  <span>Shut down</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-option"
                    checked={option === 'restart'}
                    onChange={() => setOption('restart')}
                  />
                  <span>Restart</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-option"
                    checked={option === 'logoff'}
                    onChange={() => setOption('logoff')}
                  />
                  <span>Log off Suman Vernekar</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleConfirm} className="win-btn px-5 py-1 text-xs font-bold bg-[#c0c0c0]">
              OK
            </button>
            <button onClick={onClose} className="win-btn px-4 py-1 text-xs bg-[#c0c0c0]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
