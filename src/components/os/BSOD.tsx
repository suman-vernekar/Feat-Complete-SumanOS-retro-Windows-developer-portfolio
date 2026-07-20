import React, { useEffect } from 'react';
import { sound } from '../../utils/audio';

interface BSODProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const BSOD: React.FC<BSODProps> = ({ isOpen, onDismiss }) => {
  useEffect(() => {
    if (isOpen) {
      sound.playError();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-[999999] bg-[#0000aa] text-white font-mono p-8 text-sm md:text-base flex flex-col justify-between select-none cursor-pointer"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white text-[#0000aa] px-2 py-0.5 inline-block font-bold">
          Windows
        </div>

        <p>
          A fatal exception 0E has occurred at 0028:C0011ED in VXD MERN(01) +
          00008E2D. The current application will be terminated.
        </p>

        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>Press ANY KEY to restart SumanOS and clear buffer.</li>
          <li>Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</li>
        </ul>

        <div className="pt-8 border-t border-blue-400 space-y-2 text-xs md:text-sm text-blue-200">
          <p>Technical Information:</p>
          <p>*** STOP: 0x0000007B (0xF78D2524, 0xC0000034, 0x00000000, 0x00000000)</p>
          <p>*** FULL_STACK_DEV_OVERFLOW - SUMAN_VERNEKAR_MERN_SKILLS_TOO_POWERFUL</p>
        </div>
      </div>

      <div className="text-center text-yellow-300 animate-pulse font-bold text-sm">
        Press any key or click anywhere to return to Desktop...
      </div>
    </div>
  );
};
