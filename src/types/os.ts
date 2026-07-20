export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'resume'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'certificates'
  | 'contact'
  | 'terminal'
  | 'notepad'
  | 'paint'
  | 'minesweeper'
  | 'snake'
  | 'tetris'
  | 'pong'
  | 'tictactoe'
  | 'memory'
  | 'sudoku'
  | 'chess'
  | 'calculator'
  | 'music'
  | 'antivirus'
  | 'settings'
  | 'taskmanager'
  | 'recycle'
  | 'sticky'
  | 'explorer'
  | 'browser'
  | 'gallery'
  | 'downloads'
  | 'blog'
  | 'registry'
  | 'camera'
  | 'clock'
  | 'recruiter'
  | 'developer'
  | 'widgets';

export type UserProfile = 'Recruiter' | 'Suman (Admin)' | 'Guest';

export interface WindowState {
  id: AppId;
  title: string;
  iconName: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isFocused: boolean;
}

export interface DesktopIconData {
  id: AppId;
  title: string;
  iconName: string;
  x: number;
  y: number;
  category?: 'system' | 'portfolio' | 'accessory' | 'game' | 'utility';
}

export interface StickyNoteData {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
}

export type ThemeMode = 'light' | 'dark' | 'xp' | 'windows98' | 'windows11';
export type WallpaperType =
  | 'xp_bliss'
  | 'win98_teal'
  | 'win95_blue'
  | 'matrix'
  | 'synthwave'
  | 'cyberpunk'
  | 'win11_minimal';

export interface SystemSettings {
  theme: ThemeMode;
  wallpaper: WallpaperType;
  accentColor: string;
  crtEffect: boolean;
  soundEffects: boolean;
  animationSpeed: number;
  cursorStyle: 'classic' | 'modern' | 'crosshair';
  transparency: number;
  autoArrangeIcons: boolean;
  recruiterMode: boolean;
  developerMode: boolean;
  activeDesktop: number; // 1 or 2
  isLocked: boolean;
  isSleeping: boolean;
  userProfile: UserProfile;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon?: string;
  type?: 'info' | 'success' | 'warning' | 'achievement';
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file' | 'code' | 'image' | 'pdf';
  size: string;
  date: string;
  content?: string;
  projectId?: string;
}
