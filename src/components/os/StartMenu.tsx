import React, { useState } from 'react';
import type { AppId } from '../../types/os';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onOpenShutdown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onOpenShutdown
}) => {
  const [activeFlyout, setActiveFlyout] = useState<'none' | 'accessories' | 'games'>('none');

  if (!isOpen) return null;

  const handleAppClick = (id: AppId) => {
    sound.playClick();
    onOpenApp(id);
    onClose();
  };

  const toggleFlyout = (menu: 'accessories' | 'games') => {
    setActiveFlyout(activeFlyout === menu ? 'none' : menu);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-10 left-0 win-outset bg-[#c0c0c0] dark:bg-[#262626] shadow-2xl z-[999999] flex select-none text-black dark:text-white border-2 border-white dark:border-neutral-700 max-w-sm w-full sm:w-80 font-sans text-xs md:text-sm max-h-[85vh] overflow-hidden"
    >
      {/* Vertical Windows Banner */}
      <div className="w-8 sm:w-9 bg-gradient-to-t from-blue-950 via-blue-800 to-blue-600 flex flex-col justify-end p-2 text-white font-bold tracking-wider relative overflow-hidden flex-shrink-0">
        <div className="rotate-[-90deg] whitespace-nowrap origin-bottom-left text-xs md:text-base font-serif font-black tracking-widest translate-x-1 translate-y-[-10px]">
          Suman<span className="text-yellow-400">OS</span> 2026
        </div>
      </div>

      {/* Main Menu Items Column */}
      <div className="flex-1 p-1 space-y-1 relative overflow-y-auto max-h-[85vh]">
        {/* User Profile Header */}
        <div className="win-inset p-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-sm border border-white flex-shrink-0">
            SV
          </div>
          <div className="truncate">
            <div className="font-bold text-xs truncate">{PERSONAL_INFO.name}</div>
            <div className="text-[10px] text-blue-200 truncate">Full Stack MERN Developer</div>
          </div>
        </div>

        {/* Portfolio Primary Items */}
        <button onClick={() => handleAppClick('about')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>💻</span> About Me</button>
        <button onClick={() => handleAppClick('projects')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📁</span> Projects Explorer</button>
        <button onClick={() => handleAppClick('skills')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>🛠️</span> Technical Skills</button>
        <button onClick={() => handleAppClick('resume')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📄</span> Resume Viewer</button>
        <button onClick={() => handleAppClick('explorer')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📂</span> File Explorer</button>
        <button onClick={() => handleAppClick('browser')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>🌐</span> Web Browser</button>
        <button onClick={() => handleAppClick('widgets')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📊</span> Live Analytics</button>
        <button onClick={() => handleAppClick('certificates')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📜</span> Certificates</button>
        <button onClick={() => handleAppClick('blog')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📚</span> Dev Blog</button>
        <button onClick={() => handleAppClick('contact')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>✉️</span> Contact Suman</button>
        <button onClick={() => handleAppClick('terminal')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-medium"><span>📟</span> MS-DOS Terminal</button>

        <div className="border-t border-gray-400 my-1" />

        {/* Accessories Trigger */}
        <button
          onClick={() => toggleFlyout('accessories')}
          className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between font-medium"
        >
          <span className="flex items-center gap-2"><span>🧰</span> Accessories</span>
          <span className="text-[10px]">{activeFlyout === 'accessories' ? '▼' : '▶'}</span>
        </button>

        {activeFlyout === 'accessories' && (
          <div className="pl-6 space-y-1 bg-gray-200 dark:bg-[#1a1a1a] py-1 border-y border-gray-400">
            <button onClick={() => handleAppClick('gallery')} className="w-full text-left py-1 hover:text-blue-600">🖼️ Picture Viewer</button>
            <button onClick={() => handleAppClick('notepad')} className="w-full text-left py-1 hover:text-blue-600">📝 Notepad</button>
            <button onClick={() => handleAppClick('paint')} className="w-full text-left py-1 hover:text-blue-600">🎨 Paint App</button>
            <button onClick={() => handleAppClick('calculator')} className="w-full text-left py-1 hover:text-blue-600">🧮 Calculator</button>
            <button onClick={() => handleAppClick('sticky')} className="w-full text-left py-1 hover:text-blue-600">📌 Sticky Notes</button>
            <button onClick={() => handleAppClick('music')} className="w-full text-left py-1 hover:text-blue-600">🎵 Media Player</button>
            <button onClick={() => handleAppClick('antivirus')} className="w-full text-left py-1 hover:text-blue-600">🛡️ Antivirus</button>
            <button onClick={() => handleAppClick('taskmanager')} className="w-full text-left py-1 hover:text-blue-600">📊 Task Manager</button>
          </div>
        )}

        {/* Games Trigger */}
        <button
          onClick={() => toggleFlyout('games')}
          className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between font-medium"
        >
          <span className="flex items-center gap-2"><span>🎮</span> Arcade Games</span>
          <span className="text-[10px]">{activeFlyout === 'games' ? '▼' : '▶'}</span>
        </button>

        {activeFlyout === 'games' && (
          <div className="pl-6 space-y-1 bg-gray-200 dark:bg-[#1a1a1a] py-1 border-y border-gray-400">
            <button onClick={() => handleAppClick('minesweeper')} className="w-full text-left py-1 hover:text-blue-600">💣 Minesweeper</button>
            <button onClick={() => handleAppClick('snake')} className="w-full text-left py-1 hover:text-blue-600">🐍 Snake Game</button>
            <button onClick={() => handleAppClick('tictactoe')} className="w-full text-left py-1 hover:text-blue-600">❌ Tic Tac Toe</button>
          </div>
        )}

        <button onClick={() => handleAppClick('settings')} className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>⚙️</span> Control Panel</button>

        <div className="border-t border-gray-400 my-1" />

        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="w-full text-left px-2.5 py-1 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-mono text-xs"><span>🐙</span> GitHub Profile ↗</a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="w-full text-left px-2.5 py-1 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-mono text-xs"><span>💼</span> LinkedIn Profile ↗</a>
        <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" className="w-full text-left px-2.5 py-1 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-mono text-xs"><span>🧩</span> LeetCode Profile ↗</a>

        <div className="border-t border-gray-400 my-1" />

        <button
          onClick={() => {
            sound.playClick();
            onClose();
            onOpenShutdown();
          }}
          className="w-full text-left px-2.5 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2 font-bold text-red-700 dark:text-red-400"
        >
          <span>🔌</span> Shut Down...
        </button>
      </div>
    </div>
  );
};
