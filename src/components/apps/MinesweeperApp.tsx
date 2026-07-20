import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export const MinesweeperApp: React.FC = () => {
  const GRID_SIZE = 9;
  const MINE_COUNT = 10;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [flagsCount, setFlagsCount] = useState<number>(MINE_COUNT);
  const [timer, setTimer] = useState<number>(0);
  const [face, setFace] = useState<string>('😊');

  const initGame = () => {
    sound.playClick();
    setGameState('playing');
    setFlagsCount(MINE_COUNT);
    setTimer(0);
    setFace('😊');

    // Create empty grid
    let newGrid: Cell[][] = Array.from({ length: GRID_SIZE }, (_, y) =>
      Array.from({ length: GRID_SIZE }, (_, x) => ({
        x,
        y,
        isMine: false,
        isOpen: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const rx = Math.floor(Math.random() * GRID_SIZE);
      const ry = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[ry][rx].isMine) {
        newGrid[ry][rx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor counts
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].isMine) {
              count++;
            }
          }
        }
        newGrid[r][c].neighborMines = count;
      }
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setInterval>;
    if (gameState === 'playing') {
      t = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(t);
  }, [gameState]);

  const revealCell = (r: number, c: number) => {
    if (gameState !== 'playing') return;
    const cell = grid[r][c];
    if (cell.isOpen || cell.isFlagged) return;

    sound.playClick();

    if (cell.isMine) {
      sound.playError();
      setGameState('lost');
      setFace('😵');
      // Reveal all mines
      setGrid(prev => prev.map(row => row.map(cell => cell.isMine ? { ...cell, isOpen: true } : cell)));
      return;
    }

    let updated = grid.map(row => row.map(c => ({ ...c })));

    const floodFill = (y: number, x: number) => {
      if (y < 0 || y >= GRID_SIZE || x < 0 || x >= GRID_SIZE) return;
      if (updated[y][x].isOpen || updated[y][x].isFlagged || updated[y][x].isMine) return;

      updated[y][x].isOpen = true;
      if (updated[y][x].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) floodFill(y + dr, x + dc);
          }
        }
      }
    };

    floodFill(r, c);

    // Check Win
    let openCount = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (updated[i][j].isOpen) openCount++;
      }
    }

    if (openCount === GRID_SIZE * GRID_SIZE - MINE_COUNT) {
      sound.playWin();
      setGameState('won');
      setFace('😎');
    }

    setGrid(updated);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    const cell = grid[r][c];
    if (cell.isOpen) return;

    sound.playClick();
    const updated = grid.map(row => row.map(item => {
      if (item.x === c && item.y === r) {
        const nextFlag = !item.isFlagged;
        setFlagsCount(prev => nextFlag ? prev - 1 : prev + 1);
        return { ...item, isFlagged: nextFlag };
      }
      return item;
    }));

    setGrid(updated);
  };

  const getNumberColor = (num: number) => {
    switch (num) {
      case 1: return 'text-blue-600 font-bold';
      case 2: return 'text-green-700 font-bold';
      case 3: return 'text-red-600 font-bold';
      case 4: return 'text-purple-800 font-bold';
      default: return 'text-red-800 font-bold';
    }
  };

  return (
    <div className="p-3 bg-[#c0c0c0] font-sans text-xs select-none space-y-3 w-max mx-auto my-auto shadow-xl border-2 border-white">
      {/* Header Counter Bar */}
      <div className="win-inset p-2 bg-[#c0c0c0] flex items-center justify-between">
        {/* Mine counter */}
        <div className="win-inset px-2 py-1 bg-black text-red-500 font-mono font-bold text-lg w-12 text-center">
          {String(flagsCount).padStart(3, '0')}
        </div>

        {/* Reset Smiley */}
        <button
          onClick={initGame}
          className="win-btn text-xl p-1 w-9 h-9 flex items-center justify-center"
        >
          {face}
        </button>

        {/* Timer */}
        <div className="win-inset px-2 py-1 bg-black text-red-500 font-mono font-bold text-lg w-12 text-center">
          {String(Math.min(999, timer)).padStart(3, '0')}
        </div>
      </div>

      {/* Grid */}
      <div className="win-inset p-1 bg-gray-400 grid grid-cols-9 gap-0.5">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => handleRightClick(e, r, c)}
              className={`w-7 h-7 flex items-center justify-center font-mono font-bold text-xs select-none ${
                cell.isOpen
                  ? 'win-inset bg-gray-200'
                  : 'win-btn bg-[#c0c0c0]'
              }`}
            >
              {cell.isOpen ? (
                cell.isMine ? '💣' : cell.neighborMines > 0 ? (
                  <span className={getNumberColor(cell.neighborMines)}>{cell.neighborMines}</span>
                ) : ''
              ) : cell.isFlagged ? (
                '🚩'
              ) : ''}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
