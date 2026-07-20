import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, CERTIFICATES } from '../../data/portfolioData';
import type { AppId } from '../../types/os';
import { sound } from '../../utils/audio';

interface TerminalAppProps {
  onOpenApp?: (id: AppId) => void;
  onTriggerBSOD?: () => void;
  onRestart?: () => void;
  onToggleTheme?: (mode: 'light' | 'dark') => void;
}

interface CommandOutput {
  id: number;
  cmd: string;
  res: React.ReactNode;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({
  onOpenApp,
  onTriggerBSOD,
  onRestart,
  onToggleTheme
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyCmds, setHistoryCmds] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory([
      {
        id: 1,
        cmd: '',
        res: (
          <div className="space-y-1 text-green-400 font-mono">
            <pre className="text-[10px] sm:text-xs leading-none font-bold text-green-500 overflow-x-auto">
{`   _____                           ____  _____ 
  / ___/ _  ______ ___  ____ _____/ __ \\/ ___/ 
  \\__ \\| | / / __ \`__ \\/ __ \`/ __ \\ / / /\\__ \\  
 ___/ /| |/ / / / / / / /_/ / / / / /_/ /___/ /  
/____/ |___/_/ /_/ /_/\\__,_/_/ /_/\\____//____/   `}
            </pre>
            <div className="text-xs">
              Microsoft Windows 98 [Version 4.10.1998] (SumanOS Command Prompt)
            </div>
            <div className="text-xs text-gray-400">
              (C) Copyright 1985-2026 Microsoft Corp. / Vernekar Tech.
            </div>
            <div className="text-xs text-yellow-300 mt-2">
              Type <span className="font-bold underline">help</span> to view available commands, or <span className="font-bold underline">ai &lt;question&gt;</span> to ask the AI assistant.
            </div>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyCmds.length === 0) return;
      const nextIdx = historyIdx < historyCmds.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInput(historyCmds[historyCmds.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(historyCmds[historyCmds.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete(input);
    }
  };

  const autoComplete = (str: string) => {
    const list = [
      'help', 'whoami', 'about', 'skills', 'projects', 'resume', 'experience',
      'education', 'certificates', 'contact', 'github', 'linkedin', 'leetcode',
      'clear', 'cls', 'date', 'time', 'version', 'systeminfo', 'tree', 'dir',
      'pwd', 'echo', 'joke', 'quote', 'fortune', 'ipconfig', 'hostname', 'ping',
      'theme dark', 'theme light', 'open projects', 'open resume', 'open contact',
      'sudo hire me', 'sudo coffee', 'matrix', 'weather', 'music', 'shutdown', 'restart', 'ai'
    ];
    const match = list.find(c => c.startsWith(str.toLowerCase()));
    if (match) setInput(match);
  };

  const executeCommand = (cmdStr: string) => {
    sound.playClick();
    if (!cmdStr) return;

    const lower = cmdStr.toLowerCase();
    setHistoryCmds(prev => [...prev, cmdStr]);
    setHistoryIdx(-1);
    setInput('');

    let resultNode: React.ReactNode = null;

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    } else if (lower === 'help') {
      resultNode = (
        <div className="space-y-1 text-xs text-gray-300 font-mono">
          <div className="font-bold text-yellow-400">Available System Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
            <div><span className="text-green-400">whoami / about</span> - Developer Bio</div>
            <div><span className="text-green-400">skills</span> - Full Tech Stack</div>
            <div><span className="text-green-400">projects</span> - List Portfolio Work</div>
            <div><span className="text-green-400">resume</span> - Display CV Info</div>
            <div><span className="text-green-400">experience / education</span> - Credentials</div>
            <div><span className="text-green-400">certificates</span> - Industry Certs</div>
            <div><span className="text-green-400">contact / email</span> - Phone & Socials</div>
            <div><span className="text-green-400">github / linkedin</span> - External Links</div>
            <div><span className="text-green-400">systeminfo / ipconfig</span> - Network Specs</div>
            <div><span className="text-green-400">dir / tree / pwd</span> - Filesystem</div>
            <div><span className="text-green-400">sudo hire me</span> - Instant Offer</div>
            <div><span className="text-green-400">sudo coffee</span> - Brew Espresso</div>
            <div><span className="text-green-400">matrix / ascii</span> - Visual Mode</div>
            <div><span className="text-green-400">weather / music</span> - Live Widgets</div>
            <div><span className="text-green-400">open &lt;app&gt;</span> - Launch GUI App</div>
            <div><span className="text-green-400">theme dark/light</span> - Toggle Theme</div>
            <div><span className="text-green-400">bsod</span> - Blue Screen Joke</div>
            <div><span className="text-green-400">shutdown / restart</span> - Reboot</div>
          </div>
        </div>
      );
    } else if (lower === 'whoami' || lower === 'about') {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-green-300">
          <div className="font-bold text-yellow-400">{PERSONAL_INFO.name} - {PERSONAL_INFO.role}</div>
          <div>Location: {PERSONAL_INFO.location}</div>
          <div>College: {PERSONAL_INFO.college} ({PERSONAL_INFO.degree})</div>
          <div>{PERSONAL_INFO.summary}</div>
        </div>
      );
    } else if (lower === 'skills') {
      resultNode = (
        <div className="space-y-2 text-xs font-mono">
          {SKILL_CATEGORIES.map(cat => (
            <div key={cat.category}>
              <div className="font-bold text-yellow-400">{cat.category}:</div>
              <div className="text-gray-300 pl-2">
                {cat.skills.map(s => `${s.name} [${s.version}]`).join(' • ')}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'projects') {
      resultNode = (
        <div className="space-y-2 text-xs font-mono">
          <div className="font-bold text-yellow-400">Personal Projects Directory:</div>
          {PROJECTS.map(p => (
            <div key={p.id} className="border-l-2 border-green-500 pl-2 space-y-0.5">
              <div className="font-bold text-green-300">{p.title} ({p.category})</div>
              <div className="text-gray-300">{p.summary}</div>
              <div className="text-gray-400 text-[11px]">Stack: {p.techStack.join(', ')}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'certificates') {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-cyan-300">
          <div className="font-bold text-yellow-400">Verified Credentials:</div>
          {CERTIFICATES.map(c => (
            <div key={c.id}>• {c.title} - {c.issuer} ({c.date}) [ID: {c.credentialId}]</div>
          ))}
        </div>
      );
    } else if (lower === 'resume') {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-gray-200">
          <div className="font-bold text-yellow-400">Suman Vernekar - Resume Highlights</div>
          <div>Education: {PERSONAL_INFO.degree} (CGPA: {PERSONAL_INFO.cgpa})</div>
          <div>Trainee: {PERSONAL_INFO.training}</div>
          <div>Spoken Languages: {PERSONAL_INFO.languages.join(', ')}</div>
          <div className="text-green-400">Type 'open resume' to launch the full paper document viewer window.</div>
        </div>
      );
    } else if (lower === 'sudo hire me') {
      resultNode = (
        <div className="p-3 bg-gradient-to-r from-emerald-900 to-green-800 border-2 border-green-400 text-white rounded font-mono space-y-1">
          <div className="font-bold text-yellow-300 text-sm">🎉 EXCELLENT CHOICE! CANDIDATE UNLOCKED!</div>
          <div>Access Granted: Suman Vernekar is ready to build scalable MERN applications for your engineering team.</div>
          <div className="text-xs text-green-200">Contact: sumanvernekarvernekar@gmail.com | +91-7625086715</div>
        </div>
      );
    } else if (lower === 'sudo coffee') {
      resultNode = (
        <pre className="text-xs font-mono text-amber-400">
{`   (  )   (   )  )
    ) (   )  (  (
   ( )  (    ) )
   ___________
  |           |]
  |  ESPRESSO |
  |___________|
  \\___________/`}
          <div className="text-white mt-1">Fresh 8-bit coffee brewed! Suman is ready to write clean code!</div>
        </pre>
      );
    } else if (lower === 'contact' || lower === 'email' || lower === 'phone') {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-cyan-300">
          <div>Email: {PERSONAL_INFO.email}</div>
          <div>Phone: {PERSONAL_INFO.phone}</div>
        </div>
      );
    } else if (lower === 'github') {
      resultNode = <div className="text-xs font-mono text-cyan-300">GitHub: {PERSONAL_INFO.github}</div>;
    } else if (lower === 'linkedin') {
      resultNode = <div className="text-xs font-mono text-cyan-300">LinkedIn: {PERSONAL_INFO.linkedin}</div>;
    } else if (lower === 'ipconfig' || lower === 'hostname' || lower === 'pwd') {
      resultNode = (
        <div className="text-xs font-mono text-gray-300 space-y-0.5">
          <div>Host Name: SUMAN-DEV-PC</div>
          <div>IPv4 Address: 192.168.1.104</div>
          <div>Subnet Mask: 255.255.255.0</div>
          <div>Working Directory: C:\Users\Suman</div>
        </div>
      );
    } else if (lower.startsWith('ai ')) {
      const q = cmdStr.substring(3).trim();
      let aiAns = `Analyzing '${q}'... Suman Vernekar is a skilled MERN Stack Developer experienced in React, Node.js, Express, MongoDB, RESTful APIs, and AI OCR tools.`;
      if (q.toLowerCase().includes('hiring') || q.toLowerCase().includes('job')) {
        aiAns = "Suman is actively seeking Full-Stack / MERN / Backend developer roles! Feel free to reach out via email at sumanvernekarvernekar@gmail.com or call +91-7625086715.";
      } else if (q.toLowerCase().includes('dsa') || q.toLowerCase().includes('algorithm')) {
        aiAns = "Suman has solved extensive problems in Data Structures & Algorithms (Arrays, Strings, Linked Lists, Trees, Graphs, DP, Sliding Window).";
      }
      resultNode = (
        <div className="p-2 border border-blue-500 bg-blue-950/40 rounded text-xs font-mono text-blue-200 space-y-1">
          <div className="font-bold text-yellow-400">🤖 SumanOS AI Assistant Output:</div>
          <div>{aiAns}</div>
        </div>
      );
    } else if (lower.startsWith('open ')) {
      const target = lower.replace('open ', '').trim();
      if (target === 'projects' && onOpenApp) onOpenApp('projects');
      else if (target === 'resume' && onOpenApp) onOpenApp('resume');
      else if (target === 'contact' && onOpenApp) onOpenApp('contact');
      else if (target === 'explorer' && onOpenApp) onOpenApp('explorer');
      else if (target === 'browser' && onOpenApp) onOpenApp('browser');
      else if (target === 'widgets' && onOpenApp) onOpenApp('widgets');
      else if (target === 'notepad' && onOpenApp) onOpenApp('notepad');
      else if (target === 'paint' && onOpenApp) onOpenApp('paint');
      else if (target === 'minesweeper' && onOpenApp) onOpenApp('minesweeper');
      else if (onOpenApp) onOpenApp('about');
      resultNode = <div className="text-green-400 font-mono text-xs">Launching GUI window for '{target}'...</div>;
    } else if (lower === 'systeminfo') {
      resultNode = (
        <div className="text-xs font-mono text-gray-300 space-y-0.5">
          <div>Host Name: SUMAN-DEV-PC</div>
          <div>OS Name: Microsoft Windows 98 Professional</div>
          <div>OS Version: 4.10.1998 Build 2026</div>
          <div>System Manufacturer: Vernekar Systems</div>
          <div>Processor: MERN Octa-Core @ 4.2GHz</div>
          <div>Total Physical Memory: 64,000 MB</div>
          <div>Hotfixes: JWT_AUTH_PATCH, MONGODB_AGG_V7</div>
        </div>
      );
    } else if (lower === 'bsod' && onTriggerBSOD) {
      onTriggerBSOD();
      resultNode = <div className="text-red-500 font-mono text-xs">Triggering Blue Screen of Death...</div>;
    } else if (lower === 'shutdown') {
      resultNode = <div className="text-red-400 font-mono text-xs">System shutting down... Use Start menu to turn off.</div>;
    } else if (lower === 'restart' && onRestart) {
      onRestart();
      resultNode = <div className="text-yellow-400 font-mono text-xs">Rebooting SumanOS...</div>;
    } else if (lower.startsWith('theme ')) {
      const mode = lower.includes('dark') ? 'dark' : 'light';
      if (onToggleTheme) onToggleTheme(mode);
      resultNode = <div className="text-yellow-300 font-mono text-xs">OS Theme updated to {mode} mode.</div>;
    } else if (lower === 'dir' || lower === 'tree') {
      resultNode = (
        <pre className="text-xs font-mono text-gray-300">
{`Volume in drive C is SUMAN_OS
 Directory of C:\\Users\\Suman

07/20/2026  10:00 AM    <DIR>          Projects
07/20/2026  10:00 AM    <DIR>          Skills
07/20/2026  10:00 AM    <DIR>          Certificates
07/20/2026  10:00 AM            12,450 Suman_Resume.pdf
07/20/2026  10:00 AM             4,500 Medical_OCR.py
07/20/2026  10:00 AM             8,200 Weather_App.jsx
               3 File(s)         25,150 bytes
               3 Dir(s)  64,000,000,000 bytes free`}
        </pre>
      );
    } else {
      resultNode = (
        <div className="text-xs font-mono text-red-400">
          Bad command or file name: '{cmdStr}'. Type 'help' for available commands.
        </div>
      );
    }

    setHistory(prev => [...prev, { id: Date.now(), cmd: cmdStr, res: resultNode }]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="p-3 bg-black text-green-400 font-mono h-full flex flex-col justify-between select-text overflow-hidden cursor-text text-xs md:text-sm"
    >
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {history.map((h) => (
          <div key={h.id} className="space-y-1">
            {h.cmd && (
              <div className="flex items-center gap-1 text-white">
                <span className="text-yellow-400 font-bold">C:\Users\Suman&gt;</span>
                <span>{h.cmd}</span>
              </div>
            )}
            <div>{h.res}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Active prompt input line */}
      <div className="flex items-center gap-1 pt-2 border-t border-gray-800">
        <span className="text-yellow-400 font-bold">C:\Users\Suman&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-green-300 font-mono outline-none border-none caret-white"
        />
      </div>
    </div>
  );
};
