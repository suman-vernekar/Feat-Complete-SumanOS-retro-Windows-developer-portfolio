import React from 'react';
import { Code, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface DevModeOverlayProps {
  isActive: boolean;
  onDismiss: () => void;
  windowsCount: number;
}

export const DevModeOverlay: React.FC<DevModeOverlayProps> = ({ isActive, onDismiss, windowsCount }) => {
  if (!isActive) return null;

  return (
    <div className="fixed top-2 right-2 z-[999999] win-inset p-3 bg-slate-950 text-green-400 font-mono text-xs max-w-sm w-full shadow-2xl border border-green-500/50 space-y-2 select-text">
      <div className="flex justify-between items-center border-b border-green-800 pb-1 font-bold text-yellow-400">
        <span className="flex items-center gap-1">
          <Code className="w-4 h-4" /> Developer HUD Inspector
        </span>
        <button onClick={() => { sound.playClick(); onDismiss(); }} className="hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1 text-[11px]">
        <div>Framework: React v19.2 + Vite 8.1</div>
        <div>Bundle Engine: Tailwind CSS v4</div>
        <div>Active Components Mounted: {windowsCount * 4 + 18}</div>
        <div>State Management: React State & Context</div>
        <div>Audio Synth: Web Audio API Oscillator</div>
        <div>Render FPS: 60.0 FPS</div>
        <div>Memory Heap: 48.2 MB / 64.0 MB</div>
      </div>
    </div>
  );
};
