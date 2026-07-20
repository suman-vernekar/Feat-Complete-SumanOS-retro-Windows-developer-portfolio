import React, { useState } from 'react';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from '../../data/portfolioData';
import { Calendar, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ExperienceApp: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<number>(0);

  return (
    <div className="p-3 font-sans text-xs md:text-sm select-text space-y-3">
      {/* Event Viewer Header */}
      <div className="win-outset p-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📜</span>
          <div>
            <h2 className="text-base font-bold">Event Viewer - Career & Education System Logs</h2>
            <p className="text-[11px] text-gray-300">Detailed Traineeship, Academic Milestones & Technical Experience</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Event Log Table */}
        <div className="lg:col-span-2 win-inset bg-white dark:bg-[#1e1e1e] p-2 overflow-y-auto max-h-[420px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-b font-bold">
                <th className="p-1">Type</th>
                <th className="p-1">Event / Role</th>
                <th className="p-1">Organization</th>
                <th className="p-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {EXPERIENCE_ITEMS.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => { sound.playClick(); setSelectedLog(idx); }}
                  className={`cursor-pointer border-b ${
                    selectedLog === idx ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <td className="p-1.5 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Exp
                  </td>
                  <td className="p-1.5">{item.role}</td>
                  <td className="p-1.5">{item.organization}</td>
                  <td className="p-1.5 font-mono text-[11px]">{item.period}</td>
                </tr>
              ))}
              {EDUCATION_ITEMS.map((edu, idx) => {
                const totalIdx = idx + EXPERIENCE_ITEMS.length;
                return (
                  <tr
                    key={totalIdx}
                    onClick={() => { sound.playClick(); setSelectedLog(totalIdx); }}
                    className={`cursor-pointer border-b ${
                      selectedLog === totalIdx ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <td className="p-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Edu
                    </td>
                    <td className="p-1.5">{edu.degree}</td>
                    <td className="p-1.5">{edu.institution}</td>
                    <td className="p-1.5 font-mono text-[11px]">{edu.period}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Event Detail Log Inspector */}
        <div className="win-inset bg-gray-50 dark:bg-[#181818] p-4 space-y-3 font-mono text-xs">
          <h3 className="font-bold border-b pb-1 text-blue-900 dark:text-blue-400 flex items-center gap-1 font-sans">
            <Calendar className="w-4 h-4" /> Event Properties
          </h3>

          {selectedLog < EXPERIENCE_ITEMS.length ? (
            <div className="space-y-3 font-sans">
              <div>
                <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {EXPERIENCE_ITEMS[selectedLog].role}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 font-semibold">
                  {EXPERIENCE_ITEMS[selectedLog].organization} ({EXPERIENCE_ITEMS[selectedLog].location})
                </div>
                <div className="text-[11px] font-mono text-gray-500">
                  Period: {EXPERIENCE_ITEMS[selectedLog].period}
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t">
                <div className="font-bold text-xs text-gray-800 dark:text-gray-200">Responsibilities & Achievements:</div>
                <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                  {EXPERIENCE_ITEMS[selectedLog].details.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-2 font-sans">
              {(() => {
                const edu = EDUCATION_ITEMS[selectedLog - EXPERIENCE_ITEMS.length];
                return (
                  <>
                    <div className="font-bold text-sm text-blue-900 dark:text-blue-400">{edu.degree}</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{edu.institution}</div>
                    <div className="text-xs font-mono text-gray-500">Year: {edu.period}</div>
                    <div className="p-2 bg-emerald-100 text-emerald-800 font-bold rounded mt-3">
                      Academic Score: {edu.score}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
