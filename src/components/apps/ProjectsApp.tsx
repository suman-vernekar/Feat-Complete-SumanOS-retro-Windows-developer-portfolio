import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';
import { Folder, ExternalLink, Code, LayoutGrid, List } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ProjectsApp: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);
  const [viewMode, setViewMode] = useState<'icons' | 'list'>('icons');
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'demo'>('overview');

  return (
    <div className="flex flex-col h-full text-xs font-sans select-text">
      {/* Explorer Address Bar & Toolbar */}
      <div className="win-outset p-1 bg-[#c0c0c0] dark:bg-[#2a2a2a] flex items-center justify-between gap-2 border-b border-gray-400">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-bold text-gray-700 dark:text-gray-300">Address:</span>
          <div className="win-inset flex-1 px-2 py-0.5 bg-white dark:bg-black font-mono text-[11px] truncate">
            C:\Users\Suman\Projects\{selectedProject ? selectedProject.folderName : ''}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => { sound.playClick(); setViewMode('icons'); }}
            className={`win-btn p-1 ${viewMode === 'icons' ? 'win-btn-pressed' : ''}`}
            title="Large Icons View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { sound.playClick(); setViewMode('list'); }}
            className={`win-btn p-1 ${viewMode === 'list' ? 'win-btn-pressed' : ''}`}
            title="Details List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left Folder Tree Sidebar */}
        <div className="w-48 win-inset bg-gray-50 dark:bg-[#181818] p-2 border-r overflow-y-auto hidden sm:block">
          <div className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
            <Folder className="w-4 h-4 text-amber-500" /> All Folders
          </div>
          <div className="space-y-1 pl-2 border-l border-gray-300">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(proj);
                }}
                className={`w-full text-left px-2 py-1 rounded flex items-center gap-1.5 truncate ${
                  selectedProject?.id === proj.id ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200 dark:hover:bg-neutral-800'
                }`}
              >
                <span>📁</span>
                <span className="truncate">{proj.folderName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#1e1e1e]">
          {/* Top Folder Files Grid */}
          <div className="p-3 border-b border-gray-300 overflow-y-auto max-h-44">
            {viewMode === 'icons' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedProject(proj);
                    }}
                    className={`p-2 border rounded cursor-pointer flex flex-col items-center text-center transition-all ${
                      selectedProject?.id === proj.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="text-3xl mb-1">📁</div>
                    <div className="font-bold truncate max-w-full text-xs">{proj.title}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{proj.category}</div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-neutral-800 text-gray-600 border-b">
                    <th className="p-1">Name</th>
                    <th className="p-1">Category</th>
                    <th className="p-1">Tech Stack</th>
                    <th className="p-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((proj) => (
                    <tr
                      key={proj.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedProject(proj);
                      }}
                      className={`cursor-pointer border-b ${
                        selectedProject?.id === proj.id ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <td className="p-1 flex items-center gap-1">📁 {proj.title}</td>
                      <td className="p-1">{proj.category}</td>
                      <td className="p-1 truncate max-w-xs">{proj.techStack.join(', ')}</td>
                      <td className="p-1">{proj.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Bottom Selected Detail Viewer */}
          {selectedProject && (
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#181818]">
              {/* Tab Bar */}
              <div className="flex border-b border-gray-400 gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 font-bold ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                  Overview & Tech Stack
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-3 py-1 font-bold ${activeTab === 'features' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                  Key Features
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-3 py-1 font-bold ${activeTab === 'demo' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                  Interactive Demo Preview
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h3 className="text-base font-bold text-blue-900 dark:text-blue-400">{selectedProject.title}</h3>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono text-[10px]">
                        Category: {selectedProject.category}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win-btn px-3 py-1 bg-[#c0c0c0] font-bold flex items-center gap-1"
                      >
                        <Code className="w-3.5 h-3.5" /> Source Code
                      </a>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win-btn px-3 py-1 bg-[#c0c0c0] font-bold text-blue-900 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo ↗
                      </a>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                    {selectedProject.description}
                  </p>

                  {selectedProject.metrics && (
                    <div className="win-inset p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold border-l-4 border-emerald-600">
                      ⚡ Performance Impact: {selectedProject.metrics}
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold mb-1 text-gray-800 dark:text-gray-200">Technologies Used:</h4>
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 bg-gray-200 dark:bg-neutral-800 rounded text-xs border border-gray-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-base border-b pb-1">Core Functionality Checklist</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white dark:bg-[#252525] p-2 rounded border">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="win-inset p-4 bg-slate-900 text-green-400 font-mono space-y-2 rounded">
                  <div className="text-xs text-gray-400 border-b border-gray-700 pb-1">
                    Demo Terminal Simulator - Running {selectedProject.folderName}...
                  </div>
                  <div>$ npm run start</div>
                  <div>[SUCCESS] Server listening on http://localhost:5000</div>
                  <div>[DATABASE] MongoDB Connected successfully!</div>
                  <div>[API] Executing {selectedProject.title} workflow...</div>
                  <div className="p-3 bg-black/60 rounded border border-green-500/30 text-white font-sans mt-3">
                    <h4 className="font-bold text-yellow-400 mb-1">{selectedProject.title} Output Preview</h4>
                    <p className="text-xs text-gray-300">{selectedProject.summary}</p>
                    <div className="mt-3">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded"
                      >
                        Launch Interactive Full Application ↗
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
