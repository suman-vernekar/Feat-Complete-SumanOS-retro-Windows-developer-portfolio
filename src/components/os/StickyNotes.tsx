import React from 'react';
import { X } from 'lucide-react';
import type { StickyNoteData } from '../../types/os';
import { sound } from '../../utils/audio';

interface StickyNotesProps {
  notes: StickyNoteData[];
  onUpdateNoteText: (id: string, text: string) => void;
  onDeleteNote: (id: string) => void;
}

export const StickyNotes: React.FC<StickyNotesProps> = ({
  notes,
  onUpdateNoteText,
  onDeleteNote
}) => {
  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{ top: `${note.y}px`, left: `${note.x}px` }}
          className={`absolute w-56 h-48 ${note.color} p-2 shadow-xl border-t-8 border-yellow-400 rounded-b font-sans text-xs select-text z-20 transition-all`}
        >
          <div className="flex justify-between items-center border-b border-black/10 pb-1 mb-1 font-bold text-gray-700">
            <span>Sticky Note</span>
            <button
              onClick={() => {
                sound.playTrash();
                onDeleteNote(note.id);
              }}
              className="hover:text-red-600 font-bold p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={note.text}
            onChange={(e) => onUpdateNoteText(note.id, e.target.value)}
            placeholder="Type a quick note or todo..."
            className="w-full h-[calc(100%-24px)] bg-transparent resize-none outline-none font-mono text-gray-800 text-xs leading-relaxed"
          />
        </div>
      ))}
    </>
  );
};
