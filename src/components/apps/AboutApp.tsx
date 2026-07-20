import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { User, Cpu, BookOpen, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const AboutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'skills' | 'education' | 'personal'>('general');

  return (
    <div className="p-3 text-xs md:text-sm font-sans space-y-3 select-text">
      {/* Tabs bar */}
      <div className="flex border-b border-gray-400 gap-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3 py-1 font-bold border-t-2 border-x-2 rounded-t ${
            activeTab === 'general' ? 'bg-[#c0c0c0] dark:bg-[#333] border-white dark:border-gray-500 -mb-[2px] z-10' : 'bg-gray-200 dark:bg-[#222] text-gray-600 dark:text-gray-400'
          }`}
        >
          System (General)
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1 font-bold border-t-2 border-x-2 rounded-t ${
            activeTab === 'skills' ? 'bg-[#c0c0c0] dark:bg-[#333] border-white dark:border-gray-500 -mb-[2px] z-10' : 'bg-gray-200 dark:bg-[#222] text-gray-600 dark:text-gray-400'
          }`}
        >
          Tech Overview
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-3 py-1 font-bold border-t-2 border-x-2 rounded-t ${
            activeTab === 'education' ? 'bg-[#c0c0c0] dark:bg-[#333] border-white dark:border-gray-500 -mb-[2px] z-10' : 'bg-gray-200 dark:bg-[#222] text-gray-600 dark:text-gray-400'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-3 py-1 font-bold border-t-2 border-x-2 rounded-t ${
            activeTab === 'personal' ? 'bg-[#c0c0c0] dark:bg-[#333] border-white dark:border-gray-500 -mb-[2px] z-10' : 'bg-gray-200 dark:bg-[#222] text-gray-600 dark:text-gray-400'
          }`}
        >
          Personal & Languages
        </button>
      </div>

      {/* Tab Content */}
      <div className="win-inset p-4 bg-white dark:bg-[#1e1e1e] min-h-[320px]">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="flex gap-4 items-start border-b pb-4">
              <div className="w-16 h-16 rounded-full bg-blue-700 text-white font-bold text-2xl flex items-center justify-center border-2 border-white shadow">
                SV
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400">{PERSONAL_INFO.name}</h2>
                <p className="font-semibold text-gray-700 dark:text-gray-300">{PERSONAL_INFO.role}</p>
                <p className="text-xs text-gray-500">{PERSONAL_INFO.tagline}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 border-b pb-1">Professional Summary</h3>
              <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">{PERSONAL_INFO.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-2">
              <div className="win-outset p-2 flex items-center gap-2 bg-gray-50 dark:bg-[#262626]">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </div>
              <div className="win-outset p-2 flex items-center gap-2 bg-gray-50 dark:bg-[#262626]">
                <Phone className="w-4 h-4 text-green-600" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="win-outset p-2 flex items-center gap-2 bg-gray-50 dark:bg-[#262626]">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="win-outset p-2 flex items-center gap-2 bg-gray-50 dark:bg-[#262626]">
                <User className="w-4 h-4 text-purple-600" />
                <span>Status: Available for Full Stack / Frontend roles</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h3 className="font-bold border-b pb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" /> System Hardware & Software Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2 border rounded bg-blue-50 dark:bg-blue-950/30">
                <div className="font-bold text-blue-900 dark:text-blue-300 mb-1">Core Architecture</div>
                <p>MERN Stack (MongoDB, Express.js, React.js, Node.js), RESTful APIs, JWT, MVC Pattern</p>
              </div>
              <div className="p-2 border rounded bg-emerald-50 dark:bg-emerald-950/30">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">AI & Computer Vision</div>
                <p>Python, OpenCV, Tesseract OCR, NLP, Prompt Engineering, Ollama, ChatGPT</p>
              </div>
              <div className="p-2 border rounded bg-amber-50 dark:bg-amber-950/30">
                <div className="font-bold text-amber-900 dark:text-amber-300 mb-1">Frontend Engineering</div>
                <p>React.js, React Router, Hooks, Context API, Tailwind CSS, Axios, Modern JS (ES6+)</p>
              </div>
              <div className="p-2 border rounded bg-purple-50 dark:bg-purple-950/30">
                <div className="font-bold text-purple-900 dark:text-purple-300 mb-1">Database & Security</div>
                <p>MongoDB, Mongoose ODM, Schema Design, Aggregation, Bcrypt, Rate Limiting, CORS</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <h3 className="font-bold border-b pb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Education & Academic Credentials
            </h3>
            <div className="space-y-3">
              <div className="p-3 border rounded bg-gray-50 dark:bg-[#252525]">
                <div className="font-bold text-blue-900 dark:text-blue-400">{PERSONAL_INFO.degree}</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">{PERSONAL_INFO.college}</div>
                <div className="text-xs font-semibold text-emerald-600 mt-1">CGPA: {PERSONAL_INFO.cgpa}</div>
              </div>
              <div className="p-3 border rounded bg-gray-50 dark:bg-[#252525]">
                <div className="font-bold text-gray-800 dark:text-gray-200">Higher Secondary Education (PCMB)</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">{PERSONAL_INFO.higherSecondary}</div>
              </div>
              <div className="p-3 border rounded bg-blue-50 dark:bg-blue-950/40">
                <div className="font-bold text-blue-800 dark:text-blue-300">Industry Training</div>
                <div className="text-xs">{PERSONAL_INFO.training}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="font-bold border-b pb-1 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-600" /> Communication & Interests
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Spoken Languages:</h4>
                <div className="flex gap-2 flex-wrap">
                  {PERSONAL_INFO.languages.map(lang => (
                    <span key={lang} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded font-semibold text-xs border border-blue-300">
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Core Tech Interests:</h4>
                <div className="flex gap-2 flex-wrap">
                  {PERSONAL_INFO.interests.map(interest => (
                    <span key={interest} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded text-xs border border-emerald-300">
                      ⚡ {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-[11px] text-gray-500">System ID: SUMAN-VERNEKAR-CSE-2026</span>
        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="win-btn px-3 py-1 text-xs font-bold flex items-center gap-1 bg-[#c0c0c0] text-amber-900"
          >
            <span>LeetCode</span> <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="win-btn px-3 py-1 text-xs font-bold flex items-center gap-1 bg-[#c0c0c0]"
          >
            <span>GitHub</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
