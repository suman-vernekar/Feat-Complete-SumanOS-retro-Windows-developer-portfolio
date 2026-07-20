import React, { useState } from 'react';
import { Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export const GalleryApp: React.FC = () => {
  const photos = [
    { title: 'Weather App Dashboard Mockup', category: 'Full-Stack Project', color: 'from-blue-600 to-indigo-900', desc: 'Real-time weather forecast & AI crop recommendation engine UI.' },
    { title: 'Medical OCR Processing Pipeline', category: 'Computer Vision AI', color: 'from-emerald-600 to-teal-900', desc: 'Tesseract OCR handwritten medical note summarization flow.' },
    { title: 'JSpiders Traineeship Workshop', category: 'MERN Stack Training', color: 'from-amber-600 to-yellow-900', desc: 'Hands-on REST API development and MongoDB schema design.' },
    { title: '24-Hour Buildathon Hackathon', category: 'Hackathons', color: 'from-purple-600 to-indigo-900', desc: 'Collaborative rapid software development and prompt engineering.' }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    sound.playClick();
    setCurrentIdx((currentIdx + 1) % photos.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setCurrentIdx((currentIdx - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col h-full font-sans text-xs select-none bg-[#c0c0c0] dark:bg-[#1e1e1e] text-black dark:text-white">
      <div className="win-outset p-2 flex items-center justify-between border-b border-gray-400">
        <div className="flex items-center gap-2 font-bold">
          <ImageIcon className="w-4 h-4 text-blue-800" />
          <span>Windows Picture & Fax Viewer ({currentIdx + 1} of {photos.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handlePrev} className="win-btn p-1"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={handleNext} className="win-btn p-1"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-900 flex items-center justify-center overflow-auto">
        <div className="win-inset p-4 bg-black max-w-2xl w-full text-center space-y-4 rounded border-2 border-gray-600 shadow-2xl">
          <div className={`w-full h-64 rounded bg-gradient-to-br ${photos[currentIdx].color} flex flex-col items-center justify-center text-white p-6 shadow-inner border border-white/20`}>
            <div className="text-5xl mb-2">🖼️</div>
            <h3 className="text-lg font-bold drop-shadow">{photos[currentIdx].title}</h3>
            <span className="px-2 py-0.5 bg-black/40 rounded text-xs font-mono mt-2">{photos[currentIdx].category}</span>
          </div>

          <div className="text-gray-300 font-sans text-xs">{photos[currentIdx].desc}</div>
        </div>
      </div>
    </div>
  );
};
