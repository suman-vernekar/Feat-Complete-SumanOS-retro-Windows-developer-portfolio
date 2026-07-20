import React, { useState, useEffect, useRef } from 'react';
import type { WindowState, AppId } from '../../types/os';
import { sound } from '../../utils/audio';

interface TaskManagerAppProps {
  windows: WindowState[];
  onCloseWindow: (id: AppId) => void;
}

export const TaskManagerApp: React.FC<TaskManagerAppProps> = ({
  windows,
  onCloseWindow
}) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'performance'>('apps');
  const [selectedAppId, setSelectedAppId] = useState<AppId | null>(null);
  const [cpuUsage, setCpuUsage] = useState(12);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cpuHistory = useRef<number[]>(Array(30).fill(10));

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCpu = Math.floor(Math.random() * 25) + 5;
      setCpuUsage(nextCpu);

      cpuHistory.current.push(nextCpu);
      if (cpuHistory.current.length > 30) cpuHistory.current.shift();

      if (activeTab === 'performance') {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 1;
        for (let y = 0; y < canvas.height; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Green line chart
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const step = canvas.width / 29;
        cpuHistory.current.forEach((val, i) => {
          const x = i * step;
          const y = canvas.height - (val / 100) * canvas.height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleEndTask = () => {
    if (!selectedAppId) return;
    sound.playTrash();
    onCloseWindow(selectedAppId);
    setSelectedAppId(null);
  };

  return (
    <div className="p-3 bg-[#c0c0c0] font-sans text-xs select-none space-y-3 h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-400 gap-1">
        <button
          onClick={() => setActiveTab('apps')}
          className={`px-3 py-1 font-bold ${activeTab === 'apps' ? 'bg-[#c0c0c0] border-t-2 border-x-2 border-white' : 'bg-gray-300'}`}
        >
          Applications
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-3 py-1 font-bold ${activeTab === 'performance' ? 'bg-[#c0c0c0] border-t-2 border-x-2 border-white' : 'bg-gray-300'}`}
        >
          Performance
        </button>
      </div>

      {activeTab === 'apps' && (
        <div className="flex-1 flex flex-col space-y-2">
          <div className="win-inset bg-white dark:bg-[#1e1e1e] p-2 flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200 dark:bg-neutral-800 border-b font-bold text-gray-700">
                  <th className="p-1">Task Name</th>
                  <th className="p-1">Status</th>
                  <th className="p-1">Memory</th>
                </tr>
              </thead>
              <tbody>
                {windows.map((win) => (
                  <tr
                    key={win.id}
                    onClick={() => setSelectedAppId(win.id)}
                    className={`cursor-pointer border-b ${
                      selectedAppId === win.id ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <td className="p-1.5 flex items-center gap-1.5">
                      <span>{win.iconName}</span> {win.title}
                    </td>
                    <td className="p-1.5 text-green-600 font-bold">Running</td>
                    <td className="p-1.5 font-mono">{(win.zIndex * 14 + 18).toFixed(1)} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleEndTask}
              disabled={!selectedAppId}
              className="win-btn px-4 py-1 font-bold text-red-700 disabled:opacity-50"
            >
              End Task
            </button>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-3 font-mono">
          <div className="win-inset p-3 bg-black text-green-400 space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span>CPU Usage History: {cpuUsage}%</span>
              <span>Processors: Octa-Core MERN</span>
            </div>
            <canvas ref={canvasRef} width={380} height={140} className="w-full block border border-green-800" />
          </div>

          <div className="win-inset p-3 bg-white dark:bg-[#1e1e1e] space-y-2 font-sans">
            <div className="font-bold flex justify-between">
              <span>Physical Memory (RAM) Usage:</span>
              <span>4.2 GB / 64 GB</span>
            </div>
            <div className="w-full h-4 win-inset bg-gray-200 p-0.5 overflow-hidden">
              <div className="h-full w-[28%] bg-blue-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
