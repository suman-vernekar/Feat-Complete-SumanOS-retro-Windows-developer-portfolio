import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { sound } from '../../utils/audio';

export const MusicPlayerApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioHandleRef = useRef<{ stop: () => void } | null>(null);

  const tracks = [
    { title: 'Windows 95 Chill Synthwave', artist: 'Suman Vernekar', duration: '0:45' },
    { title: 'Retro 8-Bit Chiptune Breeze', artist: 'Suman Synth', duration: '0:35' },
    { title: 'MS-DOS Hackers Cyber Theme', artist: 'MERN Beats', duration: '0:30' }
  ];

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioHandleRef.current?.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioHandleRef.current = sound.playSynthesizedTrack(currentTrack, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleNext = () => {
    audioHandleRef.current?.stop();
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    if (isPlaying) {
      audioHandleRef.current = sound.playSynthesizedTrack(next);
    }
  };

  const handlePrev = () => {
    audioHandleRef.current?.stop();
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);
    if (isPlaying) {
      audioHandleRef.current = sound.playSynthesizedTrack(prev);
    }
  };

  useEffect(() => {
    return () => {
      audioHandleRef.current?.stop();
    };
  }, []);

  return (
    <div className="p-4 bg-[#c0c0c0] font-sans text-xs select-none space-y-4 max-w-sm mx-auto my-auto shadow-2xl">
      {/* Player Display Screen */}
      <div className="win-inset p-3 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white rounded space-y-2 border-2 border-gray-600">
        <div className="flex justify-between items-center text-xs text-blue-300">
          <span className="font-bold flex items-center gap-1">
            <Music className="w-3.5 h-3.5" /> Windows Media Player 9
          </span>
          <span className="font-mono text-[10px]">{isPlaying ? 'PLAYING ♫' : 'STOPPED'}</span>
        </div>

        {/* Visualizer Canvas Simulation */}
        <div className="h-16 win-inset bg-black p-1 flex items-end justify-center gap-1 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : '10%'
              }}
              className="w-1.5 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 transition-all duration-150"
            />
          ))}
        </div>

        <div className="space-y-0.5 pt-1">
          <div className="font-bold text-sm truncate text-yellow-400">{tracks[currentTrack].title}</div>
          <div className="text-xs text-gray-300">{tracks[currentTrack].artist}</div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2">
        <button onClick={handlePrev} className="win-btn w-9 h-9 flex items-center justify-center">
          <SkipBack className="w-4 h-4 text-black" />
        </button>
        <button
          onClick={handleTogglePlay}
          className="win-btn w-12 h-10 bg-blue-700 text-white flex items-center justify-center font-bold text-base"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={handleNext} className="win-btn w-9 h-9 flex items-center justify-center">
          <SkipForward className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Playlist Track Selection */}
      <div className="win-inset bg-white p-2 space-y-1 max-h-36 overflow-y-auto">
        <div className="font-bold border-b pb-1 text-gray-700">Track List:</div>
        {tracks.map((t, idx) => (
          <div
            key={idx}
            onClick={() => {
              audioHandleRef.current?.stop();
              setCurrentTrack(idx);
              setIsPlaying(true);
              audioHandleRef.current = sound.playSynthesizedTrack(idx);
            }}
            className={`p-1.5 rounded cursor-pointer flex justify-between items-center text-xs ${
              currentTrack === idx ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100'
            }`}
          >
            <span className="truncate">{idx + 1}. {t.title}</span>
            <span className="font-mono text-[10px] ml-2">{t.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
