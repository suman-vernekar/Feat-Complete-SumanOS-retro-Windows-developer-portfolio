import React, { useState, useRef, useEffect } from 'react';
import type { DesktopIconData, WallpaperType, StickyNoteData, AppId } from '../../types/os';
import { DesktopIcon } from './DesktopIcon';
import { ContextMenu } from './ContextMenu';
import { StickyNotes } from './StickyNotes';

interface DesktopProps {
  icons: DesktopIconData[];
  onOpenApp: (id: AppId) => void;
  wallpaper: WallpaperType;
  stickyNotes: StickyNoteData[];
  onUpdateNoteText: (id: string, text: string) => void;
  onDeleteNote: (id: string) => void;
  onAddStickyNote: () => void;
  onTriggerBSOD: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  icons,
  onOpenApp,
  wallpaper,
  stickyNotes,
  onUpdateNoteText,
  onDeleteNote,
  onAddStickyNote,
  onTriggerBSOD
}) => {
  const [selectedIconId, setSelectedIconId] = useState<AppId | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dragBox, setDragBox] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);

  const desktopRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix wallpaper animation
  useEffect(() => {
    if (wallpaper !== 'matrix') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01SUMANVERNEKARMERNSTACKREACTVITE';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [wallpaper]);

  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return; // Right click
    setSelectedIconId(null);
    setContextMenu(null);

    setDragBox({
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragBox) {
      setDragBox(prev => prev ? { ...prev, endX: e.clientX, endY: e.clientY } : null);
    }
  };

  const handleMouseUp = () => {
    setDragBox(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 200);
  };

  // Compute wallpaper styles
  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'xp_bliss':
        return 'bg-gradient-to-b from-[#4a89dc] via-[#5d9cec] to-[#8cc152]';
      case 'win98_teal':
        return 'bg-[#008080]';
      case 'win95_blue':
        return 'bg-[#000080]';
      case 'synthwave':
        return 'bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-700';
      case 'cyberpunk':
        return 'bg-slate-950';
      default:
        return 'bg-[#008080]';
    }
  };

  return (
    <div
      ref={desktopRef}
      onMouseDown={handleDesktopMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-[calc(100vh-40px)] overflow-hidden select-none transition-opacity duration-150 ${getWallpaperClass()} ${
        isRefreshing ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {/* Matrix Canvas wallpaper */}
      {wallpaper === 'matrix' && (
        <canvas ref={canvasRef} className="matrix-canvas z-0" />
      )}

      {/* Synthwave Grid Overlay */}
      {wallpaper === 'synthwave' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      )}

      {/* Grid of Desktop Icons */}
      <div className="relative z-10 p-4 grid grid-flow-col grid-rows-6 md:grid-rows-6 gap-2 w-max h-full">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIconId === icon.id}
            onSelect={() => setSelectedIconId(icon.id)}
            onDoubleClick={() => onOpenApp(icon.id)}
          />
        ))}
      </div>

      {/* Sticky Notes */}
      <StickyNotes
        notes={stickyNotes}
        onUpdateNoteText={onUpdateNoteText}
        onDeleteNote={onDeleteNote}
      />

      {/* Rubber-band Drag Selection Box */}
      {dragBox && (
        <div
          style={{
            left: `${Math.min(dragBox.startX, dragBox.endX)}px`,
            top: `${Math.min(dragBox.startY, dragBox.endY)}px`,
            width: `${Math.abs(dragBox.endX - dragBox.startX)}px`,
            height: `${Math.abs(dragBox.endY - dragBox.startY)}px`
          }}
          className="absolute border border-blue-500 bg-blue-500/20 z-30 pointer-events-none"
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRefresh={handleRefresh}
          onOpenApp={onOpenApp}
          onAddStickyNote={onAddStickyNote}
          onTriggerBSOD={onTriggerBSOD}
        />
      )}
    </div>
  );
};
