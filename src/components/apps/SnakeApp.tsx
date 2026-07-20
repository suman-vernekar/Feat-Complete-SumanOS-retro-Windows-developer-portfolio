import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';

export const SnakeApp: React.FC = () => {
  const GRID_SIZE = 16;
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 8, y: 8 },
    { x: 8, y: 9 }
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 4, y: 4 });
  const [dir, setDir] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('UP');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const dirRef = useRef(dir);
  dirRef.current = dir;

  const restartGame = () => {
    sound.playClick();
    setSnake([
      { x: 8, y: 8 },
      { x: 8, y: 9 }
    ]);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setDir('UP');
    setIsGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && dirRef.current !== 'DOWN') setDir('UP');
      else if (e.key === 'ArrowDown' && dirRef.current !== 'UP') setDir('DOWN');
      else if (e.key === 'ArrowLeft' && dirRef.current !== 'RIGHT') setDir('LEFT');
      else if (e.key === 'ArrowRight' && dirRef.current !== 'LEFT') setDir('RIGHT');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = { ...prev[0] };
        if (dirRef.current === 'UP') head.y -= 1;
        if (dirRef.current === 'DOWN') head.y += 1;
        if (dirRef.current === 'LEFT') head.x -= 1;
        if (dirRef.current === 'RIGHT') head.x += 1;

        // Collision bounds
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          sound.playError();
          setIsGameOver(true);
          return prev;
        }

        // Collision self
        if (prev.some(segment => segment.x === head.x && segment.y === head.y)) {
          sound.playError();
          setIsGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          sound.playClick();
          setScore(s => {
            const next = s + 10;
            if (next > highScore) setHighScore(next);
            return next;
          });
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 130);
    return () => clearInterval(interval);
  }, [food, isGameOver, highScore]);

  return (
    <div className="p-3 bg-[#c0c0c0] font-sans text-xs select-none space-y-3 w-max mx-auto my-auto shadow-xl">
      <div className="win-inset p-2 bg-black text-green-400 font-mono flex justify-between items-center text-sm font-bold">
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>

      {/* Grid Canvas Area */}
      <div className="win-inset p-1 bg-black grid grid-cols-16 gap-0.5 w-[280px] h-[280px]">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFoodCell = food.x === x && food.y === y;

          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-sm ${
                isHead
                  ? 'bg-yellow-400 border border-yellow-200'
                  : isSnake
                  ? 'bg-green-500'
                  : isFoodCell
                  ? 'bg-red-500 animate-pulse'
                  : 'bg-neutral-900'
              }`}
            />
          );
        })}
      </div>

      {isGameOver && (
        <div className="win-inset p-2 bg-red-100 text-red-900 font-bold text-center space-y-1">
          <div>Game Over! Score: {score}</div>
          <button onClick={restartGame} className="win-btn px-4 py-1 bg-red-600 text-white">Play Again</button>
        </div>
      )}
    </div>
  );
};
