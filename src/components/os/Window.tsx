import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import type { WindowState } from '../../types/os';
import { sound } from '../../utils/audio';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; winX: number; winY: number }>({ x: 0, y: 0, winX: 0, winY: 0 });
  const resizeStartRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Drag handling
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    onFocus();
    sound.playClick();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      winX: win.position.x,
      winY: win.position.y
    };
  };

  // Resize handling
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: win.size.width,
      h: win.size.height
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;
        const newX = Math.max(0, dragStartRef.current.winX + deltaX);
        const newY = Math.max(0, dragStartRef.current.winY + deltaY);
        onMove(newX, newY);
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;
        const newW = Math.max(320, resizeStartRef.current.w + deltaX);
        const newH = Math.max(240, resizeStartRef.current.h + deltaY);
        onResize(newW, newH);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
      if (isResizing) setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, onMove, onResize]);

  if (win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 42px)',
        zIndex: win.zIndex
      }
    : {
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex
      };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      style={style}
      className={`fixed win-outset flex flex-col shadow-2xl transition-all duration-75 ${
        win.isFocused ? 'ring-1 ring-black/20' : ''
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={onMaximize}
        className={`win-titlebar ${win.isFocused ? '' : 'inactive'}`}
      >
        <div className="flex items-center gap-2 truncate pr-2 select-none">
          <span className="text-base leading-none">{win.iconName}</span>
          <span className="font-bold text-xs md:text-sm truncate">{win.title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMinimize();
            }}
            className="win-btn w-5 h-5 flex items-center justify-center text-[10px]"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMaximize();
            }}
            className="win-btn w-5 h-5 flex items-center justify-center text-[10px]"
            title={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            {win.isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onClose();
            }}
            className="win-btn w-5 h-5 bg-[#c0c0c0] text-black font-bold hover:bg-red-600 hover:text-white flex items-center justify-center text-[10px]"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-auto bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-gray-100 p-1">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right Corner) */}
      {!win.isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
        >
          <div className="w-2 h-2 border-r-2 border-b-2 border-gray-600" />
        </div>
      )}
    </div>
  );
};
