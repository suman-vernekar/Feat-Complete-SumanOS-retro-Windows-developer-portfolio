import React, { useState } from 'react';
import { sound } from '../../utils/audio';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleDigit = (digit: string) => {
    sound.playClick();
    if (display === '0' || shouldReset) {
      setDisplay(digit);
      setShouldReset(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (op: string) => {
    sound.playClick();
    setEquation(`${display} ${op} `);
    setShouldReset(true);
  };

  const handleEqual = () => {
    sound.playClick();
    if (!equation) return;
    try {
      const fullExpr = equation + display;
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
      // Safe math evaluation using Function constructor
      const evalRes = new Function(`"use strict"; return (${sanitized})`)();
      setDisplay(String(evalRes));
      setEquation('');
      setShouldReset(true);
    } catch {
      setDisplay('Error');
      setShouldReset(true);
    }
  };

  const handleClear = () => {
    sound.playClick();
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="p-3 bg-[#c0c0c0] font-sans text-xs select-none space-y-3 w-64 mx-auto my-auto shadow-xl">
      {/* LCD Screen */}
      <div className="win-inset p-2 bg-emerald-100 font-mono text-right text-lg font-bold text-black border-2 border-gray-600 space-y-1">
        <div className="text-[10px] text-gray-500 h-3 font-mono">{equation}</div>
        <div className="truncate">{display}</div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-1.5 font-bold">
        <button onClick={handleClear} className="win-btn py-2 text-red-700 bg-red-100 col-span-2">C / CE</button>
        <button onClick={() => handleOp('÷')} className="win-btn py-2 text-blue-800 bg-[#c0c0c0]">÷</button>
        <button onClick={() => handleOp('×')} className="win-btn py-2 text-blue-800 bg-[#c0c0c0]">×</button>

        {['7', '8', '9'].map(n => (
          <button key={n} onClick={() => handleDigit(n)} className="win-btn py-2 bg-white text-black text-sm">{n}</button>
        ))}
        <button onClick={() => handleOp('-')} className="win-btn py-2 text-blue-800 bg-[#c0c0c0]">-</button>

        {['4', '5', '6'].map(n => (
          <button key={n} onClick={() => handleDigit(n)} className="win-btn py-2 bg-white text-black text-sm">{n}</button>
        ))}
        <button onClick={() => handleOp('+')} className="win-btn py-2 text-blue-800 bg-[#c0c0c0]">+</button>

        {['1', '2', '3'].map(n => (
          <button key={n} onClick={() => handleDigit(n)} className="win-btn py-2 bg-white text-black text-sm">{n}</button>
        ))}
        <button onClick={handleEqual} className="win-btn py-2 bg-blue-700 text-white row-span-2 flex items-center justify-center text-base">=</button>

        <button onClick={() => handleDigit('0')} className="win-btn py-2 bg-white text-black text-sm col-span-2">0</button>
        <button onClick={() => handleDigit('.')} className="win-btn py-2 bg-white text-black text-sm">.</button>
      </div>
    </div>
  );
};
