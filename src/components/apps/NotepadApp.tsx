import React, { useState } from 'react';
import { sound } from '../../utils/audio';

export const NotepadApp: React.FC = () => {
  const [text, setText] = useState<string>(
    `Suman Vernekar - Full Stack MERN Developer\n===========================================\nEmail: sumanvernekarvernekar@gmail.com\nPhone: +91-7625086715\nGitHub: github.com/suman-vernekar\nLinkedIn: linkedin.com/in/suman-vernekar\n\nNotes:\n- Passionate about building high performance web apps with React & Node.js\n- Built AI Medical OCR Summarizer reducing 30% manual effort\n- Available for software engineering & web development roles!`
  );
  const [wordWrap, setWordWrap] = useState(true);

  const handleClear = () => {
    sound.playClick();
    setText('');
  };

  return (
    <div className="flex flex-col h-full bg-white text-black font-mono text-xs select-text">
      {/* Menu Bar */}
      <div className="win-outset p-1 bg-[#c0c0c0] flex items-center gap-4 text-xs font-sans border-b border-gray-400 select-none">
        <button className="hover:underline">File</button>
        <button className="hover:underline">Edit</button>
        <button onClick={() => setWordWrap(!wordWrap)} className="hover:underline">
          Format (Wrap: {wordWrap ? 'ON' : 'OFF'})
        </button>
        <button onClick={handleClear} className="hover:underline text-red-700">Clear</button>
      </div>

      {/* Editable Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`flex-1 p-3 outline-none resize-none bg-white font-mono text-xs leading-relaxed ${
          wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
        }`}
      />

      {/* Status Bar */}
      <div className="win-outset p-1 bg-[#c0c0c0] text-[11px] font-sans flex justify-between px-3 text-gray-700">
        <span>Lines: {text.split('\n').length} | Chars: {text.length}</span>
        <span>UTF-8 | Windows (CRLF)</span>
      </div>
    </div>
  );
};
