import React from 'react';
import type { AppId } from '../../types/os';
import { sound } from '../../utils/audio';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onOpenApp: (id: AppId) => void;
  onAddStickyNote: () => void;
  onTriggerBSOD: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onRefresh,
  onOpenApp,
  onAddStickyNote,
  onTriggerBSOD
}) => {
  const handleItemClick = (action: () => void) => {
    sound.playClick();
    action();
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top: `${y}px`, left: `${x}px` }}
      className="fixed win-outset bg-[#c0c0c0] dark:bg-[#262626] p-1 shadow-2xl z-[9999999] w-48 text-xs select-none text-black dark:text-white"
    >
      <button
        onClick={() => handleItemClick(onRefresh)}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>🔄 Refresh Desktop</span>
        <span className="text-[10px] text-gray-500">F5</span>
      </button>

      <div className="border-t border-gray-400 my-1" />

      <button
        onClick={() => handleItemClick(() => onOpenApp('settings'))}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>🖼️ Personalize / Wallpapers</span>
      </button>

      <button
        onClick={() => handleItemClick(onAddStickyNote)}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>📌 New Sticky Note</span>
      </button>

      <button
        onClick={() => handleItemClick(() => onOpenApp('terminal'))}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>💻 Open MS-DOS Terminal</span>
      </button>

      <div className="border-t border-gray-400 my-1" />

      <button
        onClick={() => handleItemClick(() => onOpenApp('about'))}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>ℹ️ System Properties</span>
      </button>

      <button
        onClick={() => handleItemClick(() => onOpenApp('antivirus'))}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between"
      >
        <span>🛡️ Run SumanDefender Scan</span>
      </button>

      <button
        onClick={() => handleItemClick(onTriggerBSOD)}
        className="w-full text-left px-3 py-1.5 hover:bg-blue-800 hover:text-white flex items-center justify-between text-red-600 font-bold"
      >
        <span>💥 Trigger BSOD (Joke)</span>
      </button>
    </div>
  );
};
