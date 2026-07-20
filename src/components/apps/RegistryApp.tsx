import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Folder, Key, Database } from 'lucide-react';

export const RegistryApp: React.FC = () => {
  const registryKeys = [
    { key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\SUMAN_VERNEKAR\\STACK', name: 'MERN_ENGINE', type: 'REG_SZ', value: 'MongoDB + Express + React + Node' },
    { key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\SUMAN_VERNEKAR\\SECURITY', name: 'AUTH_PROTOCOL', type: 'REG_SZ', value: 'JWT_BEARER_COOKIES_BCRYPT' },
    { key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\SUMAN_VERNEKAR\\AI_VISION', name: 'OCR_ENGINE', type: 'REG_SZ', value: 'Python_OpenCV_Tesseract_v5' },
    { key: 'HKEY_CURRENT_USER\\ENVIRONMENT\\DEVELOPER', name: 'CANDIDATE_STATUS', type: 'REG_SZ', value: 'AVAILABLE_FOR_HIRING' },
    { key: 'HKEY_CURRENT_USER\\ENVIRONMENT\\EDUCATION', name: 'DEGREE', type: 'REG_SZ', value: `${PERSONAL_INFO.degree} (${PERSONAL_INFO.cgpa})` }
  ];

  return (
    <div className="flex flex-col h-full font-sans text-xs select-text bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
      <div className="win-outset p-1.5 bg-[#c0c0c0] dark:bg-[#2a2a2a] flex items-center gap-2 border-b border-gray-400 select-none">
        <Database className="w-4 h-4 text-blue-800" />
        <span className="font-bold">Registry Editor (regedit.exe)</span>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="w-64 win-inset bg-gray-50 dark:bg-[#181818] p-2 border-r font-mono text-[11px] overflow-y-auto space-y-1">
          <div className="font-bold flex items-center gap-1">
            <Folder className="w-3.5 h-3.5 text-amber-500" /> Computer
          </div>
          <div className="pl-3 space-y-1">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">📁 HKEY_CLASSES_ROOT</div>
            <div className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-400">📁 HKEY_CURRENT_USER</div>
            <div className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-400">📁 HKEY_LOCAL_MACHINE</div>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto bg-white dark:bg-[#1e1e1e] font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-neutral-800 border-b font-bold text-gray-700">
                <th className="p-1">Name</th>
                <th className="p-1">Type</th>
                <th className="p-1">Data / Value</th>
              </tr>
            </thead>
            <tbody>
              {registryKeys.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800">
                  <td className="p-1.5 flex items-center gap-1 font-bold">
                    <Key className="w-3 h-3 text-red-600" /> {item.name}
                  </td>
                  <td className="p-1.5 text-blue-600 font-mono">{item.type}</td>
                  <td className="p-1.5 text-emerald-700 dark:text-emerald-400">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
