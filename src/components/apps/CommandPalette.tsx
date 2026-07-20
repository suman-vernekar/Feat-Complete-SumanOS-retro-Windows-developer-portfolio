import React, { useState, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';
import type { AppId } from '../../types/os';
import { sound } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenApp
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'about' as AppId, title: 'System Properties (About Me)', icon: '💻', tag: 'System' },
    { id: 'projects' as AppId, title: 'Projects Explorer', icon: '📁', tag: 'Portfolio' },
    { id: 'skills' as AppId, title: 'Technical Skills & Control Panel', icon: '🛠️', tag: 'Tech Stack' },
    { id: 'resume' as AppId, title: 'Resume Document Viewer', icon: '📄', tag: 'CV' },
    { id: 'terminal' as AppId, title: 'MS-DOS Command Prompt', icon: '📟', tag: 'CLI' },
    { id: 'contact' as AppId, title: 'Outlook Express Mail (Contact)', icon: '✉️', tag: 'Email' },
    { id: 'explorer' as AppId, title: 'File Explorer', icon: '📂', tag: 'Files' },
    { id: 'browser' as AppId, title: 'Internet Explorer', icon: '🌐', tag: 'Web' },
    { id: 'widgets' as AppId, title: 'Live Analytics & GitHub Widgets', icon: '📊', tag: 'Stats' },
    { id: 'settings' as AppId, title: 'Display Settings & Personalization', icon: '⚙️', tag: 'Config' }
  ];

  const filtered = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id: AppId) => {
    sound.playClick();
    onOpenApp(id);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] bg-black/50 flex items-start justify-center pt-24 p-4 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="win-outset bg-[#c0c0c0] dark:bg-[#262626] max-w-lg w-full p-2 text-black dark:text-white shadow-2xl space-y-2 border-2 border-white"
      >
        <div className="win-titlebar">
          <span className="flex items-center gap-1.5 font-bold">
            <Command className="w-4 h-4" /> Global Search & Command Palette (Ctrl+K)
          </span>
          <button onClick={onClose} className="win-btn px-1.5 py-0">
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search application..."
            autoFocus
            className="win-inset w-full px-3 py-2 pl-9 bg-white dark:bg-black font-sans text-xs md:text-sm outline-none"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5" />
        </div>

        <div className="win-inset bg-white dark:bg-[#1a1a1a] max-h-64 overflow-y-auto p-1 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No matching commands found.</div>
          ) : (
            filtered.map(cmd => (
              <div
                key={cmd.id}
                onClick={() => handleSelect(cmd.id)}
                className="p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white flex justify-between items-center text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{cmd.icon}</span>
                  <span className="font-bold">{cmd.title}</span>
                </div>
                <span className="px-2 py-0.5 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-mono text-[10px] rounded">
                  {cmd.tag}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
