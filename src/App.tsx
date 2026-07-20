import React, { useState, useEffect } from 'react';
import type { AppId, WindowState, DesktopIconData, StickyNoteData, SystemSettings, ToastNotification } from './types/os';
import { BootScreen } from './components/os/BootScreen';
import { ShutdownModal } from './components/os/ShutdownModal';
import { ScreenSaver } from './components/os/ScreenSaver';
import { BSOD } from './components/os/BSOD';
import { LockScreen } from './components/os/LockScreen';
import { ToastContainer } from './components/os/ToastContainer';
import { RecruiterTourBanner } from './components/os/RecruiterTourBanner';
import { DevModeOverlay } from './components/os/DevModeOverlay';
import { Desktop } from './components/os/Desktop';
import { Taskbar } from './components/os/Taskbar';
import { StartMenu } from './components/os/StartMenu';
import { Window } from './components/os/Window';

// Apps Content Components
import { AboutApp } from './components/apps/AboutApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { SkillsApp } from './components/apps/SkillsApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { ExperienceApp } from './components/apps/ExperienceApp';
import { AchievementsApp } from './components/apps/AchievementsApp';
import { ContactApp } from './components/apps/ContactApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { NotepadApp } from './components/apps/NotepadApp';
import { PaintApp } from './components/apps/PaintApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { MusicPlayerApp } from './components/apps/MusicPlayerApp';
import { AntivirusApp } from './components/apps/AntivirusApp';
import { SettingsApp } from './components/apps/SettingsApp';
import { TaskManagerApp } from './components/apps/TaskManagerApp';
import { RecycleBinApp } from './components/apps/RecycleBinApp';
import { FileExplorerApp } from './components/apps/FileExplorerApp';
import { BrowserApp } from './components/apps/BrowserApp';
import { CertificatesApp } from './components/apps/CertificatesApp';
import { BlogApp } from './components/apps/BlogApp';
import { GalleryApp } from './components/apps/GalleryApp';
import { RegistryApp } from './components/apps/RegistryApp';
import { WidgetsApp } from './components/apps/WidgetsApp';
import { CommandPalette } from './components/apps/CommandPalette';
import { GamesCollection } from './components/apps/GamesCollection';

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [isShutdownOpen, setIsShutdownOpen] = useState(false);
  const [isBSODOpen, setIsBSODOpen] = useState(false);
  const [isScreenSaverActive, setIsScreenSaverActive] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // OS Settings
  const [settings, setSettings] = useState<SystemSettings>({
    theme: 'dark',
    wallpaper: 'win98_teal',
    accentColor: '#000080',
    crtEffect: true,
    soundEffects: true,
    animationSpeed: 1,
    cursorStyle: 'classic',
    transparency: 0.95,
    autoArrangeIcons: false,
    recruiterMode: false,
    developerMode: false,
    activeDesktop: 1,
    isLocked: false,
    isSleeping: false,
    userProfile: 'Recruiter'
  });

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 't-1',
      title: 'Welcome to SumanOS 2026',
      message: 'Explore Full-Stack MERN apps, MS-DOS Terminal, and Games.',
      time: 'Just now',
      icon: '🎉'
    },
    {
      id: 't-2',
      title: 'GitHub Commit Verified',
      message: 'Pushed Medical OCR transcription pipeline update.',
      time: '2 mins ago',
      icon: '🐙'
    }
  ]);

  // Windows State Manager
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  // Desktop Icons Configuration
  const desktopIcons: DesktopIconData[] = [
    { id: 'about', title: 'System Info', iconName: '💻', x: 20, y: 20 },
    { id: 'projects', title: 'My Projects', iconName: '📁', x: 20, y: 120 },
    { id: 'skills', title: 'Tech Stack', iconName: '🛠️', x: 20, y: 220 },
    { id: 'resume', title: 'Resume / CV', iconName: '📄', x: 20, y: 320 },
    { id: 'explorer', title: 'File Explorer', iconName: '📂', x: 120, y: 20 },
    { id: 'browser', title: 'Web Browser', iconName: '🌐', x: 120, y: 120 },
    { id: 'widgets', title: 'Live Dashboard', iconName: '📊', x: 120, y: 220 },
    { id: 'certificates', title: 'Certificates', iconName: '📜', x: 120, y: 320 },
    { id: 'experience', title: 'Experience', iconName: '🏛️', x: 220, y: 20 },
    { id: 'achievements', title: 'Achievements', iconName: '🏆', x: 220, y: 120 },
    { id: 'contact', title: 'Outlook Mail', iconName: '✉️', x: 220, y: 220 },
    { id: 'terminal', title: 'MS-DOS Prompt', iconName: '📟', x: 220, y: 320 },
    { id: 'notepad', title: 'Notepad', iconName: '📝', x: 320, y: 20 },
    { id: 'paint', title: 'WinPaint', iconName: '🎨', x: 320, y: 120 },
    { id: 'minesweeper', title: 'Arcade Games', iconName: '💣', x: 320, y: 220 },
    { id: 'blog', title: 'Dev Articles', iconName: '📚', x: 320, y: 320 },
    { id: 'antivirus', title: 'SumanDefender', iconName: '🛡️', x: 420, y: 20 },
    { id: 'settings', title: 'Control Panel', iconName: '⚙️', x: 420, y: 120 },
    { id: 'recycle', title: 'Recycle Bin', iconName: '🗑️', x: 420, y: 220 }
  ];

  // Sticky Notes
  const [stickyNotes, setStickyNotes] = useState<StickyNoteData[]>([
    {
      id: 'note-1',
      text: '📌 Welcome to Suman Vernekar\'s OS Portfolio!\n- Double click icons to open apps\n- Use MS-DOS terminal (ai <query>)\n- Enjoy Minesweeper & Paint!',
      color: 'bg-yellow-200 text-yellow-950',
      x: window.innerWidth > 768 ? window.innerWidth - 280 : 20,
      y: 40
    }
  ]);

  // Inactivity Timer for ScreenSaver (60s)
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (booted && !isBSODOpen && !isShutdownOpen && !settings.isLocked) {
          setIsScreenSaverActive(true);
        }
      }, 60000); // 60s
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
    };
  }, [booted, isBSODOpen, isShutdownOpen, settings.isLocked]);

  // Open / Focus Window
  const handleOpenApp = (id: AppId) => {
    setIsStartMenuOpen(false);

    const existing = windows.find(w => w.id === id);
    if (existing) {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      setWindows(prev =>
        prev.map(w =>
          w.id === id
            ? { ...w, isMinimized: false, zIndex: nextZ, isFocused: true }
            : { ...w, isFocused: false }
        )
      );
      return;
    }

    const titlesMap: Record<AppId, { title: string; icon: string; width: number; height: number }> = {
      about: { title: 'System Properties - About Suman Vernekar', icon: '💻', width: 680, height: 480 },
      projects: { title: 'Windows Explorer - Projects Portfolio', icon: '📁', width: 840, height: 540 },
      skills: { title: 'Control Panel - Add/Remove Programs (Skills)', icon: '🛠️', width: 720, height: 500 },
      resume: { title: 'Document Viewer - Suman Vernekar Resume', icon: '📄', width: 760, height: 540 },
      experience: { title: 'Event Viewer - Experience & Education Logs', icon: '🏛️', width: 780, height: 500 },
      education: { title: 'Document - Education Credentials', icon: '🎓', width: 680, height: 460 },
      achievements: { title: 'Trophy Room - Achievements & DSA Mastery', icon: '🏆', width: 700, height: 480 },
      certificates: { title: 'Verified Credentials & Certificates', icon: '📜', width: 720, height: 500 },
      contact: { title: 'Outlook Express 6.0 - Contact Suman', icon: '✉️', width: 680, height: 500 },
      terminal: { title: 'MS-DOS Command Prompt (C:\\Users\\Suman)', icon: '📟', width: 680, height: 440 },
      notepad: { title: 'Notepad - Suman_Notes.txt', icon: '📝', width: 560, height: 420 },
      paint: { title: 'WinPaint 1.0 - Drawing Studio', icon: '🎨', width: 700, height: 500 },
      calculator: { title: 'Calculator', icon: '🧮', width: 340, height: 400 },
      minesweeper: { title: 'Minesweeper', icon: '💣', width: 360, height: 400 },
      snake: { title: 'Arcade Snake Game', icon: '🐍', width: 360, height: 400 },
      tetris: { title: 'Tetris Arcade', icon: '🕹️', width: 400, height: 460 },
      pong: { title: 'Pong Arcade', icon: '🕹️', width: 400, height: 460 },
      tictactoe: { title: 'Tic Tac Toe', icon: '❌', width: 340, height: 420 },
      memory: { title: 'Memory Matching Game', icon: '🃏', width: 400, height: 460 },
      sudoku: { title: 'Sudoku Puzzle', icon: '🔢', width: 400, height: 460 },
      chess: { title: 'Chess Game', icon: '♟️', width: 440, height: 480 },
      music: { title: 'Windows Media Player 9', icon: '🎵', width: 440, height: 480 },
      antivirus: { title: 'SumanDefender Security v2026', icon: '🛡️', width: 660, height: 460 },
      settings: { title: 'Display Properties & Control Panel', icon: '⚙️', width: 680, height: 480 },
      taskmanager: { title: 'Windows Task Manager', icon: '📊', width: 480, height: 420 },
      recycle: { title: 'Recycle Bin Explorer', icon: '🗑️', width: 580, height: 420 },
      sticky: { title: 'Sticky Notes', icon: '📌', width: 320, height: 300 },
      explorer: { title: 'File Explorer - C:\\Users\\Suman', icon: '📂', width: 760, height: 500 },
      browser: { title: 'Internet Explorer 6.0', icon: '🌐', width: 780, height: 520 },
      gallery: { title: 'Windows Picture Viewer - Project Gallery', icon: '🖼️', width: 720, height: 480 },
      downloads: { title: 'Downloads Manager', icon: '📥', width: 580, height: 420 },
      blog: { title: 'Developer Blog Articles', icon: '📚', width: 740, height: 500 },
      registry: { title: 'Registry Editor (regedit.exe)', icon: '🔑', width: 660, height: 440 },
      camera: { title: 'Webcam Capture Simulator', icon: '📷', width: 480, height: 400 },
      clock: { title: 'Alarm & World Clock', icon: '⏰', width: 400, height: 400 },
      recruiter: { title: 'Recruiter Express Mode', icon: '⚡', width: 700, height: 480 },
      developer: { title: 'Developer System Diagnostics', icon: '🔍', width: 600, height: 440 },
      widgets: { title: 'Live Analytics & GitHub Widgets', icon: '📈', width: 820, height: 540 }
    };

    const info = titlesMap[id] || { title: 'Window App', icon: '💻', width: 600, height: 400 };

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const initialX = Math.max(10, Math.floor((screenW - info.width) / 2) + (windows.length * 20));
    const initialY = Math.max(10, Math.floor((screenH - info.height) / 2) + (windows.length * 15));

    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);

    const newWin: WindowState = {
      id,
      title: info.title,
      iconName: info.icon,
      isMinimized: false,
      isMaximized: false,
      position: { x: Math.min(initialX, screenW - 200), y: Math.min(initialY, screenH - 200) },
      size: { width: Math.min(info.width, screenW - 20), height: Math.min(info.height, screenH - 60) },
      zIndex: nextZ,
      isFocused: true
    };

    setWindows(prev => prev.map(w => ({ ...w, isFocused: false })).concat(newWin));
  };

  const handleFocusWindow = (id: AppId) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZ, isFocused: true } : { ...w, isFocused: false }))
    );
  };

  const handleCloseWindow = (id: AppId) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const handleMinimizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true, isFocused: false } : w)));
  };

  const handleMaximizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const handleMoveWindow = (id: AppId, x: number, y: number) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, position: { x, y } } : w)));
  };

  const handleResizeWindow = (id: AppId, width: number, height: number) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, size: { width, height } } : w)));
  };

  const handleAddStickyNote = () => {
    const newNote: StickyNoteData = {
      id: `note-${Date.now()}`,
      text: 'New Note...',
      color: 'bg-yellow-200 text-yellow-950',
      x: 100 + stickyNotes.length * 30,
      y: 100 + stickyNotes.length * 20
    };
    setStickyNotes(prev => [...prev, newNote]);
  };

  const triggerRecruiterMode = () => {
    setSettings(prev => ({ ...prev, recruiterMode: true }));
    handleOpenApp('resume');
    handleOpenApp('projects');
    handleOpenApp('skills');
    handleOpenApp('contact');
  };

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'about': return <AboutApp />;
      case 'projects': return <ProjectsApp />;
      case 'skills': return <SkillsApp />;
      case 'resume': return <ResumeApp />;
      case 'experience': return <ExperienceApp />;
      case 'achievements': return <AchievementsApp />;
      case 'certificates': return <CertificatesApp />;
      case 'contact': return <ContactApp />;
      case 'terminal': return (
        <TerminalApp
          onOpenApp={handleOpenApp}
          onTriggerBSOD={() => setIsBSODOpen(true)}
          onRestart={() => setBooted(false)}
          onToggleTheme={(mode) => setSettings(s => ({ ...s, theme: mode }))}
        />
      );
      case 'notepad': return <NotepadApp />;
      case 'paint': return <PaintApp />;
      case 'calculator': return <CalculatorApp />;
      case 'minesweeper': return <GamesCollection gameType="minesweeper" />;
      case 'snake': return <GamesCollection gameType="snake" />;
      case 'tictactoe': return <GamesCollection gameType="tictactoe" />;
      case 'pong': return <GamesCollection gameType="pong" />;
      case 'memory': return <GamesCollection gameType="memory" />;
      case 'sudoku': return <GamesCollection gameType="sudoku" />;
      case 'chess': return <GamesCollection gameType="chess" />;
      case 'music': return <MusicPlayerApp />;
      case 'antivirus': return <AntivirusApp />;
      case 'settings': return (
        <SettingsApp
          settings={settings}
          onUpdateSettings={setSettings}
          onTriggerScreenSaver={() => setIsScreenSaverActive(true)}
        />
      );
      case 'taskmanager': return (
        <TaskManagerApp windows={windows} onCloseWindow={handleCloseWindow} />
      );
      case 'recycle': return <RecycleBinApp />;
      case 'explorer': return <FileExplorerApp onOpenApp={handleOpenApp} />;
      case 'browser': return <BrowserApp />;
      case 'gallery': return <GalleryApp />;
      case 'blog': return <BlogApp />;
      case 'registry': return <RegistryApp />;
      case 'widgets': return <WidgetsApp />;
      default: return <AboutApp />;
    }
  };

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${settings.theme === 'dark' ? 'dark-os' : ''} ${settings.crtEffect ? 'crt-overlay' : ''}`}>
      <ScreenSaver
        isActive={isScreenSaverActive}
        onDismiss={() => setIsScreenSaverActive(false)}
      />

      <LockScreen
        isLocked={settings.isLocked}
        onUnlock={(profile) => setSettings(s => ({ ...s, isLocked: false, userProfile: profile }))}
      />

      <BSOD
        isOpen={isBSODOpen}
        onDismiss={() => setIsBSODOpen(false)}
      />

      <ShutdownModal
        isOpen={isShutdownOpen}
        onClose={() => setIsShutdownOpen(false)}
        onRestart={() => {
          setIsShutdownOpen(false);
          setBooted(false);
          setWindows([]);
        }}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenApp={handleOpenApp}
      />

      <RecruiterTourBanner
        isActive={settings.recruiterMode}
        onDismiss={() => setSettings(s => ({ ...s, recruiterMode: false }))}
      />

      <DevModeOverlay
        isActive={settings.developerMode}
        onDismiss={() => setSettings(s => ({ ...s, developerMode: false }))}
        windowsCount={windows.length}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />

      <Desktop
        icons={desktopIcons}
        onOpenApp={handleOpenApp}
        wallpaper={settings.wallpaper}
        stickyNotes={stickyNotes}
        onUpdateNoteText={(id, text) =>
          setStickyNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n))
        }
        onDeleteNote={(id) =>
          setStickyNotes(prev => prev.filter(n => n.id !== id))
        }
        onAddStickyNote={handleAddStickyNote}
        onTriggerBSOD={() => setIsBSODOpen(true)}
      />

      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          onClose={() => handleCloseWindow(win.id)}
          onMinimize={() => handleMinimizeWindow(win.id)}
          onMaximize={() => handleMaximizeWindow(win.id)}
          onFocus={() => handleFocusWindow(win.id)}
          onMove={(x, y) => handleMoveWindow(win.id, x, y)}
          onResize={(w, h) => handleResizeWindow(win.id, w, h)}
        >
          {renderAppContent(win.id)}
        </Window>
      ))}

      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenApp={handleOpenApp}
        onOpenShutdown={() => setIsShutdownOpen(true)}
      />

      <Taskbar
        windows={windows}
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWindowClick={(id) => {
          const target = windows.find(w => w.id === id);
          if (target?.isMinimized || !target?.isFocused) {
            handleFocusWindow(id);
            setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
          } else {
            handleMinimizeWindow(id);
          }
        }}
        onOpenApp={handleOpenApp}
        theme={settings.theme === 'dark' ? 'dark' : 'light'}
        onToggleTheme={() =>
          setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))
        }
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onLockScreen={() => setSettings(s => ({ ...s, isLocked: true }))}
        onTriggerRecruiterMode={triggerRecruiterMode}
      />
    </div>
  );
};

export default App;
