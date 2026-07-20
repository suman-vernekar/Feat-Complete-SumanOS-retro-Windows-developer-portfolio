import React from 'react';
import { CERTIFICATES } from '../../data/portfolioData';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

export const CertificatesApp: React.FC = () => {
  return (
    <div className="p-4 font-sans text-xs md:text-sm select-text space-y-4 bg-white dark:bg-[#1e1e1e] text-black dark:text-white h-full overflow-y-auto">
      <div className="win-outset p-4 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-amber-400" />
          <div>
            <h2 className="text-base font-bold">Verified Certificates & Credentials</h2>
            <p className="text-xs text-blue-200">Official Industry Training & Algorithmic Excellence Badges</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATES.map((cert) => (
          <div key={cert.id} className="win-outset p-4 bg-gray-50 dark:bg-[#252525] space-y-2 border-l-4 border-blue-600">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-400">{cert.title}</h3>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono text-[10px] rounded font-bold">
                {cert.tag}
              </span>
            </div>

            <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
              Issued by: <strong className="text-black dark:text-white">{cert.issuer}</strong> ({cert.date})
            </div>

            <div className="win-inset p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Credential ID: {cert.credentialId}
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="win-btn px-4 py-1 font-bold text-blue-800 bg-[#c0c0c0] flex items-center gap-1"
              >
                <span>Verify Credential</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
