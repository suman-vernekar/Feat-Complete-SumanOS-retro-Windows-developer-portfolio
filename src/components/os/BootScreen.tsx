import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'bios' | 'splash' | 'logon'>('bios');
  const [progress, setProgress] = useState(0);
  const [biosText, setBiosText] = useState<string[]>([]);

  useEffect(() => {
    // BIOS sequence simulation
    const biosLines = [
      'SUMAN-BIOS (C) 2026 VERNEKAR COMPUTERS INC.',
      'CPU: MERN Stack Processor @ 4.20GHz',
      'Memory Test: 64000K OK',
      'Detecting Primary Master ... MERN_DATABASE_7.0GB',
      'Detecting Primary Slave  ... REACT_VITE_V19',
      'Detecting Secondary Master ... AI_OCR_SUMMARIZER',
      'Booting SumanOS v98 Professional Edition...'
    ];

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < biosLines.length) {
        setBiosText(prev => [...prev, biosLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep('splash');
          sound.playBootSound();
        }, 600);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 'splash') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('logon');
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 70);

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[999999] bg-black text-white font-mono flex flex-col justify-between p-6 select-none overflow-hidden">
      {step === 'bios' && (
        <div className="space-y-2 text-green-400 text-sm md:text-base leading-snug">
          {biosText.map((line, idx) => (
            <div key={idx} className="tracking-wide">{line}</div>
          ))}
          <div className="animate-pulse text-gray-400 mt-4">Press DEL to enter Setup, ESC to Skip...</div>
        </div>
      )}

      {step === 'splash' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#008080] text-white">
          <div className="bg-[#c0c0c0] text-black p-8 rounded border-4 border-white shadow-2xl max-w-md w-full text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 rounded flex items-center justify-center font-bold text-white text-xl shadow">
                田
              </div>
              <h1 className="text-2xl font-bold font-serif tracking-wide text-blue-900">Microsoft Windows 98</h1>
            </div>
            <p className="text-xs text-gray-700 mb-6 uppercase tracking-widest font-bold">Developer Edition - Suman Vernekar</p>
            
            {/* Progress bar */}
            <div className="w-full h-6 win-inset p-1 bg-white mb-2 overflow-hidden flex gap-1">
              {Array.from({ length: Math.floor(progress / 5) }).map((_, i) => (
                <div key={i} className="h-full w-3 bg-blue-800" />
              ))}
            </div>
            <div className="text-xs text-gray-600 font-sans font-medium">Starting Windows... {progress}%</div>
          </div>
        </div>
      )}

      {step === 'logon' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#008080]">
          <div className="win-outset p-6 max-w-sm w-full text-black space-y-4">
            <div className="win-titlebar">Welcome to Windows</div>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white shadow">
                SV
              </div>
              <div>
                <h3 className="font-bold text-base">Suman Vernekar</h3>
                <p className="text-xs text-gray-700">Full Stack MERN Developer</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onComplete();
              }}
              className="win-btn w-full py-2 font-bold bg-[#c0c0c0] active:translate-y-0.5"
            >
              Log On to Desktop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
