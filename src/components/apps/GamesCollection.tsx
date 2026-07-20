import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MinesweeperApp } from './MinesweeperApp';
import { SnakeApp } from './SnakeApp';

interface GamesCollectionProps {
  gameType?: 'minesweeper' | 'snake' | 'tetris' | 'pong' | 'tictactoe' | 'memory' | 'sudoku' | 'chess';
}

export const GamesCollection: React.FC<GamesCollectionProps> = ({ gameType = 'minesweeper' }) => {
  const [activeGame, setActiveGame] = useState<string>(gameType);

  const [tttBoard, setTttBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  const handleTttClick = (idx: number) => {
    if (tttBoard[idx] || tttWinner) return;
    sound.playClick();
    const next = [...tttBoard];
    next[idx] = isXNext ? 'X' : 'O';
    setTttBoard(next);
    setIsXNext(!isXNext);

    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
      if (next[a] && next[a] === next[b] && next[a] === next[c]) {
        sound.playWin();
        setTttWinner(next[a]);
        return;
      }
    }
  };

  const resetTtt = () => {
    sound.playClick();
    setTttBoard(Array(9).fill(null));
    setIsXNext(true);
    setTttWinner(null);
  };

  return (
    <div className="flex flex-col h-full text-xs font-sans select-none bg-[#c0c0c0] dark:bg-[#1e1e1e] text-black dark:text-white">
      <div className="win-outset p-1.5 bg-[#c0c0c0] dark:bg-[#2a2a2a] flex items-center justify-between border-b border-gray-400">
        <div className="flex items-center gap-2 font-bold">
          <Gamepad2 className="w-4 h-4 text-purple-700" />
          <span>Windows Retro Games Arcade</span>
        </div>

        <div className="flex gap-1 overflow-x-auto">
          {['minesweeper', 'snake', 'tictactoe', 'pong', 'memory', 'sudoku'].map(g => (
            <button
              key={g}
              onClick={() => { sound.playClick(); setActiveGame(g); }}
              className={`win-btn px-2 py-0.5 capitalize font-bold ${activeGame === g ? 'win-btn-pressed bg-blue-700 text-white' : ''}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
        {activeGame === 'minesweeper' && <MinesweeperApp />}
        {activeGame === 'snake' && <SnakeApp />}

        {activeGame === 'tictactoe' && (
          <div className="win-outset p-4 bg-[#c0c0c0] space-y-4 max-w-xs w-full text-center text-black">
            <div className="win-titlebar font-bold">Tic Tac Toe</div>
            <div className="font-bold text-sm">
              {tttWinner ? `🎉 Winner: ${tttWinner}!` : `Next Turn: ${isXNext ? 'X' : 'O'}`}
            </div>
            <div className="grid grid-cols-3 gap-1 win-inset p-1 bg-gray-400">
              {tttBoard.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTttClick(idx)}
                  className="w-16 h-16 win-btn font-mono text-2xl font-bold bg-[#c0c0c0] flex items-center justify-center"
                >
                  {val}
                </button>
              ))}
            </div>
            <button onClick={resetTtt} className="win-btn px-4 py-1.5 font-bold bg-blue-700 text-white">Restart Match</button>
          </div>
        )}

        {(activeGame === 'pong' || activeGame === 'memory' || activeGame === 'sudoku') && (
          <div className="win-outset p-6 bg-white dark:bg-[#252525] text-center max-w-md w-full space-y-3">
            <div className="text-4xl">🕹️</div>
            <h3 className="font-bold text-base capitalize">{activeGame} Game Arcade</h3>
            <p className="text-xs text-gray-500">Retro arcade module initialized for SumanOS 2026 Edition.</p>
            <button onClick={() => setActiveGame('minesweeper')} className="win-btn px-4 py-1.5 font-bold bg-blue-700 text-white">
              Switch to Minesweeper
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
