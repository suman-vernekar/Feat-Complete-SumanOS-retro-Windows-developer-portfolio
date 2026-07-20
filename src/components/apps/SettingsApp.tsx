import React from 'react';
import type { SystemSettings, WallpaperType } from '../../types/os';
import { sound } from '../../utils/audio';
import { Monitor, Volume2, Sparkles, Moon, Sun } from 'lucide-react';

interface SettingsAppProps {
  settings: SystemSettings;
  onUpdateSettings: (updater: (prev: SystemSettings) => SystemSettings) => void;
  onTriggerScreenSaver: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  settings,
  onUpdateSettings,
  onTriggerScreenSaver
}) => {
  const wallpapers: { id: WallpaperType; name: string; previewColor: string }[] = [
    { id: 'xp_bliss', name: 'Windows XP Bliss Hills', previewColor: 'bg-gradient-to-b from-blue-500 to-green-500' },
    { id: 'win98_teal', name: 'Windows 98 Classic Teal', previewColor: 'bg-[#008080]' },
    { id: 'win95_blue', name: 'Windows 95 Setup Blue', previewColor: 'bg-[#000080]' },
    { id: 'matrix', name: 'Matrix Digital Rain', previewColor: 'bg-black text-green-500 font-mono text-center flex items-center justify-center text-[10px]' },
    { id: 'synthwave', name: 'Synthwave Sunset Grid', previewColor: 'bg-gradient-to-b from-indigo-950 to-pink-600' },
    { id: 'cyberpunk', name: 'Cyberpunk Dark Mode', previewColor: 'bg-slate-950' }
  ];

  return (
    <div className="p-4 font-sans text-xs md:text-sm select-text space-y-4">
      {/* Control Panel Title Bar */}
      <div className="win-outset p-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          <div>
            <h2 className="font-bold text-sm">Display Properties & Control Panel</h2>
            <p className="text-[11px] text-blue-200">Customize Desktop Wallpaper, OS Theme & Audio Effects</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wallpapers Box */}
        <div className="win-inset p-3 bg-white dark:bg-[#1e1e1e] space-y-3">
          <h3 className="font-bold border-b pb-1 text-blue-900 dark:text-blue-400">Desktop Background Wallpapers</h3>
          <div className="grid grid-cols-2 gap-2">
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => {
                  sound.playClick();
                  onUpdateSettings(prev => ({ ...prev, wallpaper: wp.id }));
                }}
                className={`p-2 border rounded text-left flex flex-col gap-2 transition-all ${
                  settings.wallpaper === wp.id
                    ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className={`w-full h-12 rounded ${wp.previewColor}`}>
                  {wp.id === 'matrix' && '010101'}
                </div>
                <span className="font-bold text-xs truncate">{wp.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Settings Box */}
        <div className="win-inset p-3 bg-white dark:bg-[#1e1e1e] space-y-4">
          <h3 className="font-bold border-b pb-1 text-blue-900 dark:text-blue-400">Visual & Sound Controls</h3>

          {/* Light / Dark Mode */}
          <div className="flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-[#252525]">
            <div className="flex items-center gap-2 font-bold">
              {settings.theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>OS Theme Mode ({settings.theme.toUpperCase()})</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpdateSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
              }}
              className="win-btn px-4 py-1 font-bold bg-[#c0c0c0]"
            >
              Toggle Mode
            </button>
          </div>

          {/* CRT Monitor Effect */}
          <div className="flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-[#252525]">
            <div className="flex items-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Retro CRT Scanline Overlay</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={settings.crtEffect}
                onChange={(e) => {
                  sound.playClick();
                  onUpdateSettings(prev => ({ ...prev, crtEffect: e.target.checked }));
                }}
                className="w-4 h-4"
              />
              <span>{settings.crtEffect ? 'ON' : 'OFF'}</span>
            </label>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-[#252525]">
            <div className="flex items-center gap-2 font-bold">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>8-Bit Web Audio Sound Effects</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => {
                  sound.setEnabled(e.target.checked);
                  onUpdateSettings(prev => ({ ...prev, soundEffects: e.target.checked }));
                }}
                className="w-4 h-4"
              />
              <span>{settings.soundEffects ? 'ON' : 'OFF'}</span>
            </label>
          </div>

          {/* Screen Saver Test */}
          <div className="pt-2 border-t flex justify-end">
            <button
              onClick={() => {
                sound.playClick();
                onTriggerScreenSaver();
              }}
              className="win-btn px-5 py-2 font-bold bg-blue-700 text-white"
            >
              Test 3D Starfield ScreenSaver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
