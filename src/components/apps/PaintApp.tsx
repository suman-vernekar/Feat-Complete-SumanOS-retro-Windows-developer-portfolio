import React, { useRef, useState, useEffect } from 'react';
import { Download, Trash2, Paintbrush, Eraser } from 'lucide-react';
import { sound } from '../../utils/audio';

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  const palette = [
    '#000000', '#ffffff', '#808080', '#c0c0c0', '#800000', '#ff0000',
    '#808000', '#ffff00', '#008000', '#00ff00', '#008080', '#00ffff',
    '#000080', '#0000ff', '#800080', '#ff00ff'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background initial
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sound.playTrash();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    sound.playWin();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'suman_paint_drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] font-sans text-xs select-none">
      {/* Top Toolbar */}
      <div className="win-outset p-1 flex items-center justify-between gap-2 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTool('brush')}
            className={`win-btn px-2 py-1 flex items-center gap-1 ${tool === 'brush' ? 'win-btn-pressed bg-blue-700 text-white' : ''}`}
          >
            <Paintbrush className="w-3.5 h-3.5" /> Brush
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`win-btn px-2 py-1 flex items-center gap-1 ${tool === 'eraser' ? 'win-btn-pressed bg-blue-700 text-white' : ''}`}
          >
            <Eraser className="w-3.5 h-3.5" /> Eraser
          </button>

          <div className="flex items-center gap-1 font-bold ml-2">
            <span>Size:</span>
            {[2, 4, 8, 14].map(size => (
              <button
                key={size}
                onClick={() => setLineWidth(size)}
                className={`win-btn w-6 h-6 flex items-center justify-center font-bold ${lineWidth === size ? 'win-btn-pressed bg-gray-400' : ''}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={clearCanvas} className="win-btn px-3 py-1 flex items-center gap-1 text-red-700 font-bold">
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
          <button onClick={downloadCanvas} className="win-btn px-3 py-1 flex items-center gap-1 font-bold bg-blue-700 text-white">
            <Download className="w-3.5 h-3.5" /> Save Image
          </button>
        </div>
      </div>

      {/* Canvas Canvas Work Area */}
      <div className="flex-1 p-2 flex items-center justify-center overflow-auto bg-gray-600">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="win-inset bg-white cursor-crosshair shadow-lg"
        />
      </div>

      {/* Bottom Color Palette Bar */}
      <div className="win-outset p-2 flex items-center gap-2 border-t border-gray-400 bg-[#c0c0c0]">
        <div className="w-6 h-6 win-inset" style={{ backgroundColor: tool === 'eraser' ? '#ffffff' : color }} />
        <div className="flex gap-1 flex-wrap">
          {palette.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool('brush'); }}
              style={{ backgroundColor: c }}
              className="w-5 h-5 win-outset border hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
