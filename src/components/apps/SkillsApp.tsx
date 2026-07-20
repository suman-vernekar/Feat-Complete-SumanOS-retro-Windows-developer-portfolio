import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Search, Wrench, CheckCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

export const SkillsApp: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.category)];

  const filteredCategories = SKILL_CATEGORIES.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.version.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat =>
    selectedCategory === 'All' ? cat.skills.length > 0 : cat.category === selectedCategory && cat.skills.length > 0
  );

  return (
    <div className="p-3 font-sans text-xs md:text-sm select-text space-y-3">
      {/* Control Panel Header */}
      <div className="win-outset p-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💻</div>
          <div>
            <h2 className="text-sm sm:text-base font-bold">Control Panel - Installed Tech Stack Programs</h2>
            <p className="text-[11px] text-blue-200">System Software Specifications & Verified Developer Tools</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skill or tool..."
            className="win-inset w-full px-3 py-1 pl-8 text-black bg-white rounded font-mono text-xs outline-none"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2 top-2" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`win-btn px-3 py-1 font-bold text-xs whitespace-nowrap ${
              selectedCategory === cat ? 'win-btn-pressed bg-blue-700 text-white' : 'bg-[#c0c0c0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Group Listing */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
        {filteredCategories.map(group => (
          <div key={group.category} className="win-inset p-3 bg-white dark:bg-[#1e1e1e] space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-400 border-b pb-1 flex items-center gap-2 text-xs sm:text-sm">
              <Wrench className="w-4 h-4 text-amber-600" /> {group.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {group.skills.map(skill => (
                <div key={skill.name} className="p-2 border rounded bg-gray-50 dark:bg-[#252525] space-y-1 hover:border-blue-400 transition-colors">
                  <div className="flex justify-between items-center font-bold text-xs">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      {skill.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-mono">
                      {skill.version}
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-4 win-inset bg-gray-200 dark:bg-neutral-800 p-0.5 overflow-hidden flex">
                    <div
                      style={{ width: `${skill.level}%` }}
                      className="h-full bg-gradient-to-r from-blue-700 to-blue-500 rounded-sm transition-all duration-500"
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-600 dark:text-gray-400 font-mono">
                    <span>Proficiency: {skill.level}%</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">Status: Installed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
