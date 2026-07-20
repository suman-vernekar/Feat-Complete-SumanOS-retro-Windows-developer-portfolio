import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RefreshCw, Bookmark, Home, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://linkedin.com/in/suman-vernekar');
  const [activeUrl, setActiveUrl] = useState('https://linkedin.com/in/suman-vernekar');
  const [isLoading, setIsLoading] = useState(false);

  const bookmarks = [
    { name: 'LinkedIn Profile', url: PERSONAL_INFO.linkedin, icon: '💼' },
    { name: 'GitHub Profile', url: PERSONAL_INFO.github, icon: '🐙' },
    { name: 'LeetCode Profile', url: PERSONAL_INFO.leetcode, icon: '🧩' },
    { name: 'Weather API App', url: 'https://weather-crop-forecast.vernekar.dev', icon: '☀️' },
    { name: 'Medical OCR AI', url: 'https://medical-ocr-summarizer.vernekar.dev', icon: '🩺' }
  ];

  const handleNavigate = (targetUrl: string) => {
    sound.playClick();
    setUrl(targetUrl);
    setIsLoading(true);
    setTimeout(() => {
      setActiveUrl(targetUrl);
      setIsLoading(false);
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(url.startsWith('http') ? url : `https://${url}`);
  };

  const isLinkedIn = activeUrl.includes('linkedin');
  const isGitHub = activeUrl.includes('github');
  const isLeetCode = activeUrl.includes('leetcode');

  return (
    <div className="flex flex-col h-full text-xs font-sans select-text bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
      {/* IE 6.0 Navigation & Menu Bar */}
      <div className="win-outset p-1.5 bg-[#c0c0c0] dark:bg-[#2a2a2a] space-y-1 border-b border-gray-400 select-none">
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleNavigate(PERSONAL_INFO.linkedin)} className="win-btn p-1" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleNavigate(PERSONAL_INFO.github)} className="win-btn p-1" title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleNavigate(url)} className="win-btn p-1" title="Reload">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={() => handleNavigate(PERSONAL_INFO.linkedin)} className="win-btn p-1" title="Home">
            <Home className="w-3.5 h-3.5" />
          </button>

          {/* Address URL input */}
          <form onSubmit={handleFormSubmit} className="flex-1 flex gap-1">
            <div className="win-inset flex-1 px-2 py-0.5 bg-white dark:bg-black font-mono text-xs flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-600" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent outline-none font-mono text-xs"
              />
            </div>
            <button type="submit" className="win-btn px-3 py-0.5 font-bold bg-blue-700 text-white">Go</button>
          </form>
        </div>

        {/* Bookmarks bar */}
        <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
          <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-500" /> Favorites:
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {bookmarks.map(b => (
              <button
                key={b.name}
                onClick={() => handleNavigate(b.url)}
                className={`win-btn px-2 py-0.5 whitespace-nowrap flex items-center gap-1 ${
                  activeUrl === b.url ? 'win-btn-pressed bg-blue-700 text-white' : ''
                }`}
              >
                <span>{b.icon}</span>
                <span>{b.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Browser Main Display Viewport */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-200 dark:bg-[#121212] flex flex-col justify-between">
        <div className="win-inset p-6 bg-white dark:bg-[#1a1a1a] shadow-xl space-y-4 max-w-4xl mx-auto w-full border border-gray-400">
          {/* Top Address Status */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌐</span>
              <div>
                <h2 className="text-base font-bold text-blue-900 dark:text-blue-400">Internet Explorer 6.0 - Web Browser</h2>
                <div className="text-xs font-mono text-gray-500">{activeUrl}</div>
              </div>
            </div>

            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="win-btn px-4 py-1.5 font-bold bg-blue-700 text-white flex items-center gap-1"
            >
              <span>Launch Site</span> <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Rendered Web Content */}
          {isLinkedIn && (
            <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-2xl border-2 border-white shadow">
                  SV
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">{PERSONAL_INFO.name}</h3>
                  <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">{PERSONAL_INFO.role}</p>
                  <p className="text-xs text-gray-500">{PERSONAL_INFO.college} • {PERSONAL_INFO.location}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{PERSONAL_INFO.summary}</p>
                <div className="p-3 bg-white dark:bg-black rounded border font-mono space-y-1">
                  <div className="text-blue-600 font-bold">💼 LinkedIn Profile URL:</div>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="underline text-blue-900 dark:text-blue-400">
                    {PERSONAL_INFO.linkedin}
                  </a>
                </div>
              </div>
            </div>
          )}

          {isGitHub && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-[#252525] rounded border border-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🐙</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">GitHub Profile - @{PERSONAL_INFO.githubUsername}</h3>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-mono text-xs">
                    {PERSONAL_INFO.github}
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">Explore open source full-stack repositories, computer vision OCR pipelines, and React web applications.</p>
            </div>
          )}

          {isLeetCode && (
            <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-300">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🧩</span>
                <div>
                  <h3 className="text-base font-bold text-amber-900 dark:text-amber-300">LeetCode Competitive Programming Profile</h3>
                  <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-mono text-xs">
                    {PERSONAL_INFO.leetcode}
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">Solving Data Structures & Algorithms challenges across Arrays, Trees, Dynamic Programming, and Graph algorithms.</p>
            </div>
          )}

          {!isLinkedIn && !isGitHub && !isLeetCode && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded border text-xs space-y-2">
              <h3 className="font-bold text-blue-900 dark:text-blue-300">Target Web Service</h3>
              <p>URL: <span className="font-mono">{activeUrl}</span></p>
              <a href={activeUrl} target="_blank" rel="noopener noreferrer" className="win-btn px-4 py-1.5 font-bold bg-blue-700 text-white inline-block">
                Open External Site ↗
              </a>
            </div>
          )}
        </div>

        <div className="win-outset p-1 text-[10px] font-mono text-gray-600 dark:text-gray-400 flex justify-between">
          <span>Status: Done. Security Zone: Trusted Sites</span>
          <span>100% Verified SSL Connection</span>
        </div>
      </div>
    </div>
  );
};
