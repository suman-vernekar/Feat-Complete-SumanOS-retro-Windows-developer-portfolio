import React from 'react';
import { Briefcase } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RecruiterTourBannerProps {
  isActive: boolean;
  onDismiss: () => void;
}

export const RecruiterTourBanner: React.FC<RecruiterTourBannerProps> = ({ isActive, onDismiss }) => {
  if (!isActive) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[999999] win-outset p-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-black shadow-2xl flex items-center justify-between gap-4 max-w-xl w-full border-2 border-white select-none">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-black animate-pulse" />
        <div>
          <div className="font-bold text-xs">⚡ Recruiter 30-Second Express Mode Active!</div>
          <div className="text-[11px] text-amber-950 font-medium">Auto-launched Resume, Projects, Skills & Contact windows.</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            onDismiss();
          }}
          className="win-btn px-3 py-1 font-bold text-xs bg-[#c0c0c0]"
        >
          Dismiss Tour
        </button>
      </div>
    </div>
  );
};
