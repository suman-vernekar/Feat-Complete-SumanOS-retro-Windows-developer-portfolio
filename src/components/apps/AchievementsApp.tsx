import React from 'react';
import { ACHIEVEMENTS } from '../../data/portfolioData';
import { Award, Zap, Code2 } from 'lucide-react';

export const AchievementsApp: React.FC = () => {
  return (
    <div className="p-4 font-sans text-xs md:text-sm select-text space-y-4">
      <div className="win-outset p-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-black flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-black" />
          <div>
            <h2 className="text-base font-bold">Hall of Fame - Achievements & Hackathons</h2>
            <p className="text-xs font-medium text-amber-950">DSA Mastery, 24h Hackathons & AI Medical OCR Impact</p>
          </div>
        </div>
      </div>

      {/* Grid of trophies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((item, idx) => (
          <div key={idx} className="win-outset p-4 bg-white dark:bg-[#222] space-y-2 border-l-4 border-amber-500">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-400">{item.title}</h3>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono text-[10px] rounded font-bold">
                {item.tag}
              </span>
            </div>

            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>

            {item.metric && (
              <div className="win-inset p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" /> Key Outcome: {item.metric}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DSA Problem Solving Covered Topics Checklist */}
      <div className="win-inset p-4 bg-gray-50 dark:bg-[#1a1a1a] space-y-2">
        <h3 className="font-bold text-sm flex items-center gap-2 border-b pb-1 text-gray-800 dark:text-gray-200">
          <Code2 className="w-4 h-4 text-blue-600" /> Data Structures & Algorithms Topics Mastered
        </h3>
        <div className="flex gap-2 flex-wrap text-xs font-mono">
          {[
            'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues',
            'Trees', 'Hashing', 'Sorting', 'Searching', 'Recursion',
            'Two Pointers', 'Sliding Window', 'Binary Search', 'Dynamic Programming (Basic)'
          ].map(topic => (
            <span key={topic} className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 rounded border border-blue-300">
              ✔️ {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
