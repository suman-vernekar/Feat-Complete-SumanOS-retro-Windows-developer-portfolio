import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';
import type { UserProfile } from '../../types/os';
import { sound } from '../../utils/audio';

interface LockScreenProps {
  isLocked: boolean;
  onUnlock: (profile: UserProfile) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ isLocked, onUnlock }) => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>('Recruiter');
  const [password, setPassword] = useState('');

  if (!isLocked) return null;

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playBootSound();
    onUnlock(selectedProfile);
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white font-sans flex flex-col items-center justify-between p-8 select-none">
      <div className="text-center space-y-1 mt-8">
        <div className="text-5xl md:text-6xl font-extrabold tracking-tight font-mono text-blue-300">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm text-blue-200">
          {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="win-outset p-6 bg-[#c0c0c0] text-black max-w-sm w-full space-y-4 shadow-2xl rounded-sm">
        <div className="win-titlebar">
          <span className="flex items-center gap-1 font-bold">
            <Lock className="w-3.5 h-3.5" /> SumanOS Profile Logon
          </span>
        </div>

        <form onSubmit={handleUnlockSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow flex-shrink-0 bg-blue-900">
              <img src="/suman.jpg" alt="Suman Vernekar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-xs">Select Profile:</div>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value as UserProfile)}
                className="win-inset px-2 py-1 bg-white font-bold text-xs outline-none"
              >
                <option value="Recruiter">Recruiter (Fast Track)</option>
                <option value="Suman (Admin)">Suman Vernekar (Admin)</option>
                <option value="Guest">Guest Visitor</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-blue-800" /> Enter Passcode (or click Unlock):
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Default: any key"
              className="win-inset w-full px-3 py-1.5 bg-white font-mono text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            className="win-btn w-full py-2 font-bold bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <span>Log On to SumanOS</span> <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="text-xs text-gray-400 font-mono">
        SumanOS Professional Edition v2026 • Press ENTER to Logon
      </div>
    </div>
  );
};
