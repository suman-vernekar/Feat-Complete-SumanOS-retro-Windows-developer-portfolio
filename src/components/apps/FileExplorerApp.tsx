import React, { useState } from 'react';
import { PROJECTS, CERTIFICATES, PERSONAL_INFO } from '../../data/portfolioData';
import { Search, Copy, Check, Grid, List, ChevronRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../utils/audio';
import type { AppId } from '../../types/os';

interface FileExplorerProps {
  onOpenApp?: (id: AppId) => void;
}

export const FileExplorerApp: React.FC<FileExplorerProps> = ({ onOpenApp }) => {
  const [currentFolder, setCurrentFolder] = useState<string>('Root');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [copiedPath, setCopiedPath] = useState(false);

  const folders = [
    { name: 'Projects', icon: '📁', count: PROJECTS.length },
    { name: 'Certificates', icon: '📜', count: CERTIFICATES.length },
    { name: 'Resume', icon: '📄', count: 1 },
    { name: 'Achievements', icon: '🏆', count: 4 },
    { name: 'Photos', icon: '🖼️', count: 6 },
    { name: 'Downloads', icon: '📥', count: 3 },
    { name: 'Notes', icon: '📝', count: 2 },
    { name: 'Source Code', icon: '💻', count: 8 },
    { name: 'Documents', icon: '📚', count: 5 }
  ];

  const handleFolderClick = (folderName: string) => {
    sound.playClick();
    setCurrentFolder(folderName);
  };

  const handleBack = () => {
    sound.playClick();
    setCurrentFolder('Root');
  };

  const handleCopyPath = () => {
    sound.playClick();
    navigator.clipboard.writeText(`C:\\Users\\Suman\\${currentFolder}`);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <div className="flex flex-col h-full text-xs font-sans select-text bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
      <div className="win-outset p-1.5 bg-[#c0c0c0] dark:bg-[#2a2a2a] flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 select-none">
        <div className="flex items-center gap-1 flex-1 min-w-[200px]">
          {currentFolder !== 'Root' && (
            <button onClick={handleBack} className="win-btn p-1" title="Back to Root">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="win-inset flex-1 px-2 py-1 bg-white dark:bg-black font-mono text-[11px] flex items-center gap-1 truncate">
            <span className="text-gray-500">C:\Users\Suman</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="font-bold text-blue-700 dark:text-blue-400">{currentFolder}</span>
          </div>

          <button onClick={handleCopyPath} className="win-btn px-2 py-1 flex items-center gap-1 font-bold">
            {copiedPath ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            {copiedPath ? 'Copied' : 'Copy Path'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { sound.playClick(); setViewMode('grid'); }}
            className={`win-btn p-1 ${viewMode === 'grid' ? 'win-btn-pressed' : ''}`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { sound.playClick(); setViewMode('list'); }}
            className={`win-btn p-1 ${viewMode === 'list' ? 'win-btn-pressed' : ''}`}
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="win-inset px-2 py-0.5 pl-6 bg-white dark:bg-black text-xs font-mono w-32 outline-none"
            />
            <Search className="w-3 h-3 text-gray-400 absolute left-1.5 top-1.5" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="w-44 win-inset bg-gray-100 dark:bg-[#181818] p-2 border-r overflow-y-auto hidden sm:block">
          <div className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
            ⭐ Quick Access
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleFolderClick('Root')}
              className={`w-full text-left px-2 py-1 rounded font-bold ${currentFolder === 'Root' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-neutral-800'}`}
            >
              💻 This PC (Root)
            </button>
            {folders.map((f) => (
              <button
                key={f.name}
                onClick={() => handleFolderClick(f.name)}
                className={`w-full text-left px-2 py-1 rounded flex items-center gap-1.5 truncate ${currentFolder === f.name ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200 dark:hover:bg-neutral-800'}`}
              >
                <span>{f.icon}</span>
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-[#1e1e1e]">
          {currentFolder === 'Root' && (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-1'}>
              {folders.map((f) => (
                <div
                  key={f.name}
                  onClick={() => handleFolderClick(f.name)}
                  className={`cursor-pointer border rounded p-3 flex ${viewMode === 'grid' ? 'flex-col items-center text-center' : 'items-center gap-3'} hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors`}
                >
                  <span className="text-3xl mb-1">{f.icon}</span>
                  <div>
                    <div className="font-bold text-xs">{f.name}</div>
                    <div className="text-[10px] text-gray-500">{f.count} items</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentFolder === 'Projects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {PROJECTS.map(p => (
                <div
                  key={p.id}
                  onClick={() => onOpenApp?.('projects')}
                  className="p-3 border rounded bg-gray-50 dark:bg-[#252525] hover:border-blue-500 cursor-pointer space-y-1"
                >
                  <div className="font-bold text-blue-900 dark:text-blue-400 flex items-center gap-1">
                    📁 {p.folderName}
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 truncate">{p.title}</p>
                  <div className="text-[10px] text-emerald-600 font-mono">Double click to inspect project details</div>
                </div>
              ))}
            </div>
          )}

          {currentFolder === 'Certificates' && (
            <div className="space-y-2">
              {CERTIFICATES.map(c => (
                <div key={c.id} className="p-3 border rounded bg-gray-50 dark:bg-[#252525] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs">📜 {c.title}</div>
                    <div className="text-[11px] text-gray-600 dark:text-gray-300">{c.issuer} ({c.date})</div>
                  </div>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="win-btn px-3 py-1 font-bold text-blue-700">
                    Verify Credential ↗
                  </a>
                </div>
              ))}
            </div>
          )}

          {currentFolder === 'Resume' && (
            <div className="p-4 border rounded bg-blue-50 dark:bg-blue-950/40 space-y-3">
              <div className="font-bold text-base flex items-center gap-2">
                📄 Suman_Vernekar_Resume.pdf
              </div>
              <p className="text-xs">{PERSONAL_INFO.summary}</p>
              <button onClick={() => onOpenApp?.('resume')} className="win-btn px-4 py-1.5 font-bold bg-blue-700 text-white">
                Launch Full Resume Document Viewer
              </button>
            </div>
          )}

          {currentFolder !== 'Root' && currentFolder !== 'Projects' && currentFolder !== 'Certificates' && currentFolder !== 'Resume' && (
            <div className="space-y-2">
              <div className="p-3 border rounded bg-gray-50 dark:bg-[#252525] font-mono text-xs">
                <div>📁 Directory: C:\Users\Suman\{currentFolder}</div>
                <div className="text-gray-500 mt-1">Contains portfolio assets and verified system binaries.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
