import React from 'react';
import type { DesktopIconData } from '../../types/os';
import { sound } from '../../utils/audio';

interface DesktopIconProps {
  icon: DesktopIconData;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  isSelected,
  onSelect,
  onDoubleClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    onSelect(e);

    // On Touch / Mobile devices, single tap selects and opens app for ultra smooth mobile UX
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      onDoubleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      className={`w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center p-1.5 sm:p-2 rounded cursor-pointer group select-none transition-all duration-75 active:scale-95 ${
        isSelected ? 'bg-blue-600/40 ring-1 ring-dotted ring-white' : 'hover:bg-white/10'
      }`}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl mb-1 filter drop-shadow group-hover:scale-105 transition-transform">
        {icon.iconName}
      </div>
      <div
        className={`text-[11px] sm:text-xs text-center leading-tight px-1 font-sans font-medium text-white drop-shadow-md line-clamp-2 max-w-full ${
          isSelected ? 'bg-blue-900 text-white font-semibold' : ''
        }`}
      >
        {icon.title}
      </div>
    </div>
  );
};
