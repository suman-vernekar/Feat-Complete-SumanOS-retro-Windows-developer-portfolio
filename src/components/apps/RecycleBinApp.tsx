import React, { useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';

export const RecycleBinApp: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'old_legacy_bugs.js', size: '14 KB', deleted: 'Yesterday' },
    { id: '2', name: 'unoptimized_queries.sql', size: '8 KB', deleted: '3 days ago' },
    { id: '3', name: 'temporary_draft.txt', size: '2 KB', deleted: '1 week ago' }
  ]);

  const handleEmptyBin = () => {
    sound.playTrash();
    setItems([]);
  };

  const handleRestore = (id: string) => {
    sound.playClick();
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="flex flex-col h-full font-sans text-xs select-none bg-[#c0c0c0]">
      {/* Explorer Toolbar */}
      <div className="win-outset p-1.5 flex items-center justify-between border-b border-gray-400">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-gray-700" />
          <span className="font-bold">Recycle Bin ({items.length} items)</span>
        </div>

        <button
          onClick={handleEmptyBin}
          disabled={items.length === 0}
          className="win-btn px-3 py-1 font-bold text-red-700 disabled:opacity-50 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Empty Recycle Bin
        </button>
      </div>

      <div className="flex-1 p-3 bg-white dark:bg-[#1e1e1e] overflow-y-auto">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <div className="text-4xl">🗑️</div>
            <div className="font-bold">The Recycle Bin is empty.</div>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-neutral-800 border-b font-bold text-gray-700">
                <th className="p-1">Name</th>
                <th className="p-1">Size</th>
                <th className="p-1">Deleted Date</th>
                <th className="p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800">
                  <td className="p-1.5 flex items-center gap-1.5 font-bold">📄 {item.name}</td>
                  <td className="p-1.5 font-mono">{item.size}</td>
                  <td className="p-1.5">{item.deleted}</td>
                  <td className="p-1.5">
                    <button
                      onClick={() => handleRestore(item.id)}
                      className="win-btn px-2 py-0.5 text-[11px] font-bold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3 text-blue-600" /> Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
