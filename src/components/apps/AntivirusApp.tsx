import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AntivirusApp: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scannedFiles, setScannedFiles] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const filesToScan = [
    'C:\\System32\\dsa_algorithms.dll',
    'C:\\Drivers\\react_vite_v19.sys',
    'C:\\Kernel\\node_express_api.bin',
    'C:\\Users\\Suman\\mongodb_schemas.dat',
    'C:\\AI\\medical_ocr_tesseract.py',
    'C:\\Security\\jwt_bcrypt_auth.sys',
    'C:\\Verification\\developer_skills_certified.inf'
  ];

  const handleStartScan = () => {
    sound.playClick();
    setScanning(true);
    setProgress(0);
    setScannedFiles([]);
    setCompleted(false);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < filesToScan.length) {
        setScannedFiles(prev => [...prev, filesToScan[idx]]);
        setProgress(Math.round(((idx + 1) / filesToScan.length) * 100));
        idx++;
      } else {
        clearInterval(interval);
        setScanning(false);
        setCompleted(true);
        sound.playWin();
      }
    }, 400);
  };

  return (
    <div className="p-4 bg-[#c0c0c0] font-sans text-xs md:text-sm select-none space-y-4">
      {/* Antivirus Banner */}
      <div className="win-outset p-4 bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-white" />
          <div>
            <h2 className="text-base font-bold">SumanDefender Security v2026</h2>
            <p className="text-xs text-emerald-200">Real-time Code Quality & Malware Protection Engine</p>
          </div>
        </div>

        <button
          onClick={handleStartScan}
          disabled={scanning}
          className="win-btn px-5 py-2 font-bold bg-white text-emerald-900 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
          {scanning ? 'Scanning...' : 'Scan System'}
        </button>
      </div>

      {/* Status Container */}
      <div className="win-inset p-4 bg-white dark:bg-[#1e1e1e] space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>System Security Level: 100% Top Developer Certified</span>
        </div>

        {/* Scan Progress Bar */}
        {scanning && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Scanning System Files...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-5 win-inset bg-gray-200 p-0.5 overflow-hidden flex">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-emerald-600 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* File Scan Output Console */}
        <div className="win-inset p-3 bg-black text-green-400 font-mono text-xs max-h-44 overflow-y-auto space-y-1">
          {scannedFiles.length === 0 ? (
            <div className="text-gray-500">Click 'Scan System' to verify portfolio files integrity...</div>
          ) : (
            scannedFiles.map((file, i) => (
              <div key={i} className="flex justify-between">
                <span>[SCANNING] {file}</span>
                <span className="text-yellow-400">PASSED [0 VULNERABILITIES]</span>
              </div>
            ))
          )}
        </div>

        {completed && (
          <div className="win-inset p-3 bg-emerald-100 text-emerald-900 font-bold text-center border border-emerald-500 rounded">
            🎉 Scan Complete! 0 Viruses found. 100% Clean Code, DSA Excellence & MERN Stack Readiness Verified.
          </div>
        )}
      </div>
    </div>
  );
};
