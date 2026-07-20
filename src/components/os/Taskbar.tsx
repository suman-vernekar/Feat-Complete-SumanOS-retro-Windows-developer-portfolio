import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldCheck, CloudSun, Battery, Moon, Sun, Search, Lock, Briefcase } from 'lucide-react';
import type { WindowState, AppId } from '../../types/os';
import { sound } from '../../utils/audio';

interface TaskbarProps {
  windows: WindowState[];
  onToggleStartMenu: () => void;
  isStartMenuOpen: boolean;
  onWindowClick: (id: AppId) => void;
  onOpenApp: (id: AppId) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onLockScreen: () => void;
  onTriggerRecruiterMode: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onToggleStartMenu,
  isStartMenuOpen,
  onWindowClick,
  onOpenApp,
  theme,
  onToggleTheme,
  onOpenCommandPalette,
  onLockScreen,
  onTriggerRecruiterMode
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showClockPopup, setShowClockPopup] = useState(false);
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    sound.playClick();
    setIsMuted(!isMuted);
    sound.setEnabled(isMuted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 win-outset bg-[#c0c0c0] dark:bg-[#262626] flex items-center justify-between px-1 z-[99999] select-none text-black dark:text-white">
      {/* Left side: Start Button & Quick Launch */}
      <div className="flex items-center gap-1.5 overflow-hidden">
        <button
          onClick={() => {
            sound.playClick();
            onToggleStartMenu();
          }}
          className={`win-btn h-8 px-2 flex items-center gap-1.5 font-bold text-sm ${
            isStartMenuOpen ? 'win-btn-pressed bg-gray-300 dark:bg-neutral-700' : ''
          }`}
        >
          <div className="w-5 h-5 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-black shadow-sm">
            田
          </div>
          <span className="font-serif tracking-wide text-xs md:text-sm">Start</span>
        </button>

        {/* Global Search Bar Trigger (Ctrl+K) */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenCommandPalette();
          }}
          className="win-inset h-8 px-2.5 bg-white dark:bg-black text-gray-700 dark:text-gray-300 flex items-center gap-1.5 text-xs font-mono hover:border-blue-500 hidden sm:flex"
          title="Type to search apps (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>Search (Ctrl+K)</span>
        </button>

        {/* Recruiter Mode Button */}
        <button
          onClick={() => {
            sound.playClick();
            onTriggerRecruiterMode();
          }}
          className="win-btn h-8 px-2 font-bold text-xs bg-amber-500 text-black flex items-center gap-1 hidden md:flex"
          title="Fast Track Recruiter Mode"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Recruiter Mode</span>
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-0.5 border-l border-gray-400 border-r border-white mx-0.5" />

        {/* Quick Launch Icons */}
        <div className="hidden lg:flex items-center gap-1">
          <button onClick={() => onOpenApp('explorer')} className="p-1 hover:bg-black/10 rounded" title="File Explorer">📂</button>
          <button onClick={() => onOpenApp('terminal')} className="p-1 hover:bg-black/10 rounded" title="Command Prompt">📟</button>
          <button onClick={() => onOpenApp('browser')} className="p-1 hover:bg-black/10 rounded" title="Web Browser">🌐</button>
          <button onClick={() => onOpenApp('widgets')} className="p-1 hover:bg-black/10 rounded" title="Analytics Dashboard">📊</button>
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-0.5 border-l border-gray-400 border-r border-white mx-0.5 hidden lg:block" />

        {/* Running Window Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[40vw] no-scrollbar">
          {windows.map((win) => {
            const isActive = win.isFocused && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => {
                  sound.playClick();
                  onWindowClick(win.id);
                }}
                className={`win-btn h-8 px-2 max-w-[140px] truncate text-xs flex items-center gap-1.5 ${
                  isActive ? 'win-btn-pressed bg-gray-200 dark:bg-neutral-800 font-bold' : ''
                }`}
              >
                <span>{win.iconName}</span>
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: System Tray */}
      <div className="flex items-center gap-1 text-xs">
        {/* Lock Screen Button */}
        <button
          onClick={() => {
            sound.playClick();
            onLockScreen();
          }}
          className="win-btn h-8 px-2 flex items-center justify-center"
          title="Lock System Profile"
        >
          <Lock className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleTheme();
          }}
          className="win-btn h-8 px-2 flex items-center justify-center"
          title="Toggle OS Light / Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-blue-900" />}
        </button>

        {/* Weather Quick Widget */}
        <button
          onClick={() => setShowWeatherPopup(!showWeatherPopup)}
          className="win-inset px-2 py-1 flex items-center gap-1 font-mono text-[11px] bg-white dark:bg-neutral-800 hover:brightness-95"
          title="Bengaluru Weather 26°C Sunny"
        >
          <CloudSun className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden md:inline">26°C</span>
        </button>

        {/* System Tray Box */}
        <div className="win-inset px-2 py-0.5 flex items-center gap-2 bg-white dark:bg-neutral-900 font-mono text-[11px] relative">
          <button
            onClick={() => onOpenApp('antivirus')}
            className="text-green-600 dark:text-green-400 hover:scale-110 transition-transform"
            title="SumanDefender Antivirus: System Protected"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </button>

          <button onClick={toggleSound} title={isMuted ? 'Unmute Sound' : 'Mute Sound'}>
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          </button>

          <div className="flex items-center gap-0.5 text-gray-700 dark:text-gray-300" title="Battery: 100% Plugged In">
            <Battery className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] hidden lg:inline">100%</span>
          </div>

          <button
            onClick={() => setShowClockPopup(!showClockPopup)}
            className="font-bold hover:underline ml-1"
          >
            {time}
          </button>
        </div>
      </div>

      {/* Clock Calendar Popup */}
      {showClockPopup && (
        <div className="absolute bottom-12 right-2 win-outset p-4 bg-[#c0c0c0] dark:bg-[#262626] shadow-2xl z-[999999] text-black dark:text-white space-y-2 w-64">
          <div className="win-titlebar text-xs">Date and Time Properties</div>
          <div className="text-center font-bold text-sm border-b pb-2">{date}</div>
          <div className="text-center font-mono text-xl py-2 bg-black text-green-400 rounded">
            {time}
          </div>
          <p className="text-[11px] text-gray-700 dark:text-gray-300 text-center">
            Time Zone: (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
          </p>
        </div>
      )}

      {/* Weather Forecast Popup */}
      {showWeatherPopup && (
        <div className="absolute bottom-12 right-24 win-outset p-3 bg-[#c0c0c0] dark:bg-[#262626] shadow-2xl z-[999999] text-black dark:text-white space-y-2 w-56">
          <div className="win-titlebar text-xs">Live Weather - Bengaluru</div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">☀️</span>
            <div>
              <div className="font-bold text-lg">26°C / 78°F</div>
              <div className="text-xs text-gray-700 dark:text-gray-300">Mostly Clear & Pleasant</div>
            </div>
          </div>
          <div className="text-[11px] border-t pt-2 space-y-0.5 font-mono text-gray-700 dark:text-gray-300">
            <div>Humidity: 58%</div>
            <div>Wind: 12 km/h E</div>
            <div>AI Crop Index: Optimal</div>
          </div>
        </div>
      )}
    </div>
  );
};
