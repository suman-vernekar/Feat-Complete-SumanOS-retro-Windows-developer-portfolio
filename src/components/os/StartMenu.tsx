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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-10 left-0 win-outset bg-[#c0c0c0] dark:bg-[#262626] shadow-2xl z-[999999] flex select-none text-black dark:text-white border-2 border-white dark:border-neutral-700 max-w-sm w-full font-sans text-xs md:text-sm"
    >
      {/* Vertical Windows Banner */}
      <div className="w-9 bg-gradient-to-t from-blue-950 via-blue-800 to-blue-600 flex flex-col justify-end p-2 text-white font-bold tracking-wider relative overflow-hidden">
        <div className="rotate-[-90deg] whitespace-nowrap origin-bottom-left text-sm md:text-base font-serif font-black tracking-widest translate-x-2 translate-y-[-10px]">
          Suman<span className="text-yellow-400">OS</span> 2026
        </div>
      </div>

      {/* Main Menu Items Column */}
      <div className="flex-1 p-1 space-y-1 relative max-h-[80vh] overflow-y-auto">
        {/* User Profile Header */}
        <div className="win-inset p-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-sm border border-white">
            SV
          </div>
          <div>
            <div className="font-bold text-xs truncate">{PERSONAL_INFO.name}</div>
            <div className="text-[10px] text-blue-200">Full Stack MERN Developer</div>
          </div>
        </div>

        {/* Portfolio Primary Items */}
        <button
          onClick={() => handleAppClick('about')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">💻</span> About Me (System Properties)
        </button>

        <button
          onClick={() => handleAppClick('projects')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📁</span> Projects Explorer
        </button>

        <button
          onClick={() => handleAppClick('skills')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">🛠️</span> Technical Skills & Programs
        </button>

        <button
          onClick={() => handleAppClick('resume')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📄</span> Resume Document Viewer
        </button>

        <button
          onClick={() => handleAppClick('explorer')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📂</span> File Explorer
        </button>

        <button
          onClick={() => handleAppClick('browser')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">🌐</span> Internet Explorer Browser
        </button>

        <button
          onClick={() => handleAppClick('widgets')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📊</span> Live Analytics & GitHub Widgets
        </button>

        <button
          onClick={() => handleAppClick('certificates')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📜</span> Verified Certificates
        </button>

        <button
          onClick={() => handleAppClick('blog')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📚</span> Dev Blog & Articles
        </button>

        <button
          onClick={() => handleAppClick('contact')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">✉️</span> Contact Suman (Outlook)
        </button>

        <button
          onClick={() => handleAppClick('terminal')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none font-medium"
        >
          <span className="text-base">📟</span> MS-DOS Terminal
        </button>

        {/* Divider */}
        <div className="border-t border-gray-400 my-1" />

        {/* Accessories Flyout Trigger */}
        <div
          onMouseEnter={() => setActiveFlyout('accessories')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-base">🧰</span> Accessories
          </span>
          <span className="text-xs">▶</span>
        </div>

        {/* Games Flyout Trigger */}
        <div
          onMouseEnter={() => setActiveFlyout('games')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-base">🎮</span> Arcade Games
          </span>
          <span className="text-xs">▶</span>
        </div>

        <button
          onClick={() => handleAppClick('settings')}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 rounded-none"
        >
          <span className="text-base">⚙️</span> Control Panel (Settings)
        </button>

        {/* External Links */}
        <div className="border-t border-gray-400 my-1" />

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 block font-mono text-xs"
        >
          <span className="text-base">🐙</span> GitHub Profile ↗
        </a>

        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 block font-mono text-xs"
        >
          <span className="text-base">💼</span> LinkedIn Profile ↗
        </a>

        <a
          href={PERSONAL_INFO.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 block font-mono text-xs"
        >
          <span className="text-base">🧩</span> LeetCode Profile ↗
        </a>

        {/* Bottom Actions */}
        <div className="border-t border-gray-400 my-1" />

        <button
          onClick={() => {
            sound.playClick();
            onClose();
            onOpenShutdown();
          }}
          className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-3 font-bold text-red-700 dark:text-red-400"
        >
          <span className="text-base">🔌</span> Shut Down...
        </button>
      </div>

      {/* Accessories Flyout Menu */}
      {activeFlyout === 'accessories' && (
        <div
          onMouseLeave={() => setActiveFlyout('none')}
          className="absolute left-[calc(100%-8px)] top-24 win-outset bg-[#c0c0c0] dark:bg-[#262626] p-1 shadow-2xl z-[999999] space-y-1 w-52 text-black dark:text-white"
        >
          <button onClick={() => handleAppClick('gallery')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🖼️</span> Picture Viewer</button>
          <button onClick={() => handleAppClick('notepad')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>📝</span> Notepad</button>
          <button onClick={() => handleAppClick('paint')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🎨</span> Paint</button>
          <button onClick={() => handleAppClick('calculator')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🧮</span> Calculator</button>
          <button onClick={() => handleAppClick('sticky')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>📌</span> Sticky Notes</button>
          <button onClick={() => handleAppClick('music')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🎵</span> Media Player</button>
          <button onClick={() => handleAppClick('registry')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🔑</span> Registry Editor</button>
          <button onClick={() => handleAppClick('antivirus')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🛡️</span> Defender Antivirus</button>
          <button onClick={() => handleAppClick('taskmanager')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>📊</span> Task Manager</button>
        </div>
      )}

      {/* Games Flyout Menu */}
      {activeFlyout === 'games' && (
        <div
          onMouseLeave={() => setActiveFlyout('none')}
          className="absolute left-[calc(100%-8px)] top-36 win-outset bg-[#c0c0c0] dark:bg-[#262626] p-1 shadow-2xl z-[999999] space-y-1 w-48 text-black dark:text-white"
        >
          <button onClick={() => handleAppClick('minesweeper')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>💣</span> Minesweeper</button>
          <button onClick={() => handleAppClick('snake')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>🐍</span> Snake Game</button>
          <button onClick={() => handleAppClick('tictactoe')} className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center gap-2"><span>❌</span> Tic Tac Toe</button>
        </div>
      )}
    </div>
  );
};
