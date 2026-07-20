import React, { useEffect, useRef } from 'react';

interface ScreenSaverProps {
  isActive: boolean;
  onDismiss: () => void;
}

export const ScreenSaver: React.FC<ScreenSaverProps> = ({ isActive, onDismiss }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // 3D Starfield particles
    const stars = Array.from({ length: 400 }).map(() => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: Math.random() * width
    }));

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        star.z -= 6;
        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 128 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 128 / star.pz;
        const ppx = star.x * pk + cx;
        const ppy = star.y * pk + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const size = Math.max(1, (1 - star.z / width) * 4);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.z / width})`;
          ctx.lineWidth = size;
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });

      // Flying retro logo
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.fillText('SUMAN-OS 3D PIPES & STARFIELD', 40, height - 40);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleInput = () => {
      onDismiss();
    };

    window.addEventListener('mousemove', handleInput);
    window.addEventListener('keydown', handleInput);
    window.addEventListener('click', handleInput);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleInput);
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('click', handleInput);
    };
  }, [isActive, onDismiss]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black cursor-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
