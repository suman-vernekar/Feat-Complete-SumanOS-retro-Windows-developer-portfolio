import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE_ITEMS, EDUCATION_ITEMS, ACHIEVEMENTS } from '../../data/portfolioData';
import { Printer, Copy, FileText, Check, Phone, Mail, Globe, Award, BookOpen, Briefcase, Code, Wrench, UserCheck, Moon, Sun } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ResumeApp: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'text'>('preview');
  const [paperMode, setPaperMode] = useState<'white' | 'dark'>('dark');

  const handleCopyText = () => {
    sound.playClick();
    const resumeTxt = `
SUMAN VERNEKAR
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

EDUCATION
• ${PERSONAL_INFO.degree} (2022 – 2026)
  ${PERSONAL_INFO.college} - ${PERSONAL_INFO.cgpa}
• ${PERSONAL_INFO.higherSecondary}

TECHNICAL SKILLS
- Programming Languages: JavaScript (ES6+), Java (Basic), HTML5, CSS3
- Frontend: React.js, React Router, Context API, Hooks, Axios, Tailwind CSS, Responsive Web Design, Flexbox, CSS Grid
- Backend: Node.js, Express.js, RESTful APIs, CRUD Operations, JWT Authentication, Cookies, CORS, Helmet, Rate Limiting, Multer, MVC Architecture
- Node.js Concepts: ${PERSONAL_INFO.nodeJsConcepts.join(', ')}
- Database: MongoDB, Mongoose, Schema Design, CRUD Operations, Validation, Aggregation Framework (Basic), Query Operators, Pagination
- Authentication & Security: ${PERSONAL_INFO.authSecurity.join(', ')}
- Developer Tools: Git, GitHub, VS Code, Postman, Chrome DevTools, npm
- AI Tools: ChatGPT, GitHub Copilot, Cursor AI, Qoder AI, Ollama, Tesseract OCR
- Additional Technologies: Axios, JSON, React Icons, React Loader, dotenv, Nodemon, Cloudinary
- Core Concepts: ${PERSONAL_INFO.coreConcepts.join(', ')}
- Soft Skills: ${PERSONAL_INFO.softSkills.join(', ')}
- Areas of Interest: ${PERSONAL_INFO.interests.join(', ')}

TRAINING
• JSpiders Training & Development Center (Jan 2026 – Present)
  MERN Stack Development Trainee - Bengaluru, India

PERSONAL PROJECTS
${PROJECTS.map(p => `• ${p.title} (${p.category})\n  Tech: ${p.techStack.join(', ')}\n  ${p.description}`).join('\n\n')}

EXPERIENCE
${EXPERIENCE_ITEMS.map(e => `• ${e.role} (${e.period})\n  ${e.organization}\n  ${e.details.map(d => `  - ${d}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS
${ACHIEVEMENTS.map(a => `• ${a.title}: ${a.description}`).join('\n')}

COMMUNICATION LANGUAGES
• ${PERSONAL_INFO.languages.join('\n• ')}
    `;

    navigator.clipboard.writeText(resumeTxt.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const isWhite = paperMode === 'white';

  // Strict inline style constants to guarantee zero dark mode color leaks
  const paperBg = isWhite ? '#ffffff' : '#0f172a';
  const paperText = isWhite ? '#0f172a' : '#f8fafc';
  const headerText = isWhite ? '#1e3a8a' : '#60a5fa';
  const subText = isWhite ? '#334155' : '#94a3b8';
  const borderColor = isWhite ? '#cbd5e1' : '#334155';
  const linkColor = isWhite ? '#1d4ed8' : '#38bdf8';

  return (
    <div className="flex flex-col h-full font-sans text-xs select-text bg-[#c0c0c0] dark:bg-[#262626]">
      {/* Top Document Toolbar */}
      <div className="win-outset p-2 bg-[#c0c0c0] dark:bg-[#262626] flex items-center justify-between border-b border-gray-400 select-none">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-800 dark:text-blue-400" />
          <span className="font-bold text-gray-800 dark:text-gray-200">Suman_Vernekar_Resume.pdf (Document Viewer)</span>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'preview' && (
            <button
              onClick={() => {
                sound.playClick();
                setPaperMode(isWhite ? 'dark' : 'white');
              }}
              className="win-btn px-3 py-1 font-bold flex items-center gap-1 bg-[#c0c0c0]"
              title="Toggle Paper Background Mode"
            >
              {isWhite ? <Moon className="w-3.5 h-3.5 text-purple-700" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isWhite ? 'Night Paper' : 'White Paper'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab(activeTab === 'preview' ? 'text' : 'preview');
            }}
            className="win-btn px-3 py-1 font-bold bg-[#c0c0c0]"
          >
            {activeTab === 'preview' ? '📄 Plain Text View' : '🖼️ Document Paper View'}
          </button>

          <button
            onClick={handleCopyText}
            className="win-btn px-3 py-1 font-bold flex items-center gap-1 bg-[#c0c0c0]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied All!' : 'Copy Text'}
          </button>

          <button
            onClick={handlePrint}
            className="win-btn px-3 py-1 font-bold bg-blue-700 text-white flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Main Document Viewer Container */}
      <div
        style={{ backgroundColor: isWhite ? '#cbd5e1' : '#020617' }}
        className="flex-1 p-3 md:p-6 overflow-y-auto flex justify-center transition-colors duration-200"
      >
        {activeTab === 'preview' ? (
          <div
            style={{ backgroundColor: paperBg, color: paperText, borderColor: borderColor }}
            className="p-6 md:p-10 max-w-4xl w-full shadow-2xl rounded border space-y-6 font-serif leading-relaxed text-xs md:text-sm select-text transition-colors duration-200"
          >
            {/* Resume Header */}
            <div style={{ borderColor: isWhite ? '#000000' : '#475569' }} className="border-b-2 pb-4 space-y-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <h1 style={{ color: paperText }} className="text-2xl md:text-3xl font-bold tracking-tight font-sans">
                    {PERSONAL_INFO.name}
                  </h1>
                  <div style={{ color: subText }} className="font-semibold text-xs md:text-sm font-sans">{PERSONAL_INFO.role}</div>
                  <div style={{ color: subText }} className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-sans font-medium pt-1">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {PERSONAL_INFO.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {PERSONAL_INFO.email}</span>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" style={{ color: linkColor }} className="flex items-center gap-1 underline">
                      <Globe className="w-3.5 h-3.5" /> github.com/suman-vernekar
                    </a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: linkColor }} className="flex items-center gap-1 underline">
                      <Globe className="w-3.5 h-3.5" /> linkedin.com/in/suman-vernekar
                    </a>
                  </div>
                </div>

                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-600 shadow-md flex-shrink-0 bg-slate-800">
                  <img src="/suman.jpg" alt="Suman Vernekar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="space-y-1">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Professional Summary
              </h2>
              <p style={{ color: paperText }} className="leading-relaxed font-sans text-xs md:text-sm">
                {PERSONAL_INFO.summary}
              </p>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Education
              </h2>
              <div className="space-y-2 font-sans text-xs md:text-sm">
                {EDUCATION_ITEMS.map((edu, idx) => (
                  <div key={idx} style={{ borderColor: borderColor }} className="flex flex-col sm:flex-row justify-between items-start border-b border-dashed pb-1.5">
                    <div>
                      <div style={{ color: paperText }} className="font-bold">• {edu.degree}</div>
                      <div style={{ color: subText }} className="italic">{edu.institution}</div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div style={{ color: subText }}>{edu.period}</div>
                      <div style={{ color: isWhite ? '#047857' : '#34d399' }} className="font-bold">{edu.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-2">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <Wrench className="w-4 h-4" /> Technical Skills
              </h2>
              <div style={{ color: paperText }} className="space-y-1.5 font-sans text-xs leading-relaxed">
                <div><strong>Programming Languages:</strong> JavaScript (ES6+), Java (Basic), HTML5, CSS3</div>
                <div><strong>Frontend:</strong> React.js, React Router, Context API, Hooks, Axios, Tailwind CSS, Responsive Web Design, Flexbox, CSS Grid</div>
                <div><strong>Backend:</strong> Node.js, Express.js, RESTful APIs, CRUD Operations, JWT Authentication, Cookies, CORS, Helmet, Rate Limiting, Multer, MVC Architecture</div>
                <div><strong>Node.js Concepts:</strong> {PERSONAL_INFO.nodeJsConcepts.join(', ')}</div>
                <div><strong>Database:</strong> MongoDB, Mongoose, Schema Design, CRUD Operations, Validation, Aggregation Framework (Basic), Query Operators, Pagination</div>
                <div><strong>Authentication & Security:</strong> {PERSONAL_INFO.authSecurity.join(', ')}</div>
                <div><strong>Developer Tools:</strong> Git, GitHub, VS Code, Postman, Chrome DevTools, npm</div>
                <div><strong>AI Tools:</strong> ChatGPT, GitHub Copilot, Cursor AI, Qoder AI, Ollama, Tesseract OCR</div>
                <div><strong>Additional Technologies:</strong> Axios, JSON, React Icons, React Loader, dotenv, Nodemon, Cloudinary</div>
                <div><strong>Core Concepts:</strong> {PERSONAL_INFO.coreConcepts.join(', ')}</div>
                <div><strong>Soft Skills:</strong> {PERSONAL_INFO.softSkills.join(', ')}</div>
                <div><strong>Areas of Interest:</strong> {PERSONAL_INFO.interests.join(', ')}</div>
              </div>
            </section>

            {/* Training */}
            <section className="space-y-2">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Training
              </h2>
              <div className="font-sans text-xs space-y-1">
                <div style={{ color: paperText }} className="flex justify-between font-bold">
                  <span>• JSpiders Training & Development Center</span>
                  <span className="font-mono font-normal">Jan 2026 – Present</span>
                </div>
                <div style={{ color: subText }} className="italic">MERN Stack Development Trainee - Bengaluru, India</div>
                <ul style={{ color: paperText }} className="list-disc list-inside space-y-1 pl-2">
                  <li>Acquired hands-on experience in full-stack web development using HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, Express.js, and MongoDB.</li>
                  <li>Designed and developed scalable MERN Stack applications with RESTful APIs, CRUD functionality, JWT authentication, and MongoDB database integration.</li>
                  <li>Implemented responsive user interfaces, API integration, authentication, authorization, middleware, and secure backend development following MVC architecture.</li>
                  <li>Utilized Git, GitHub, Postman, npm, and VS Code for source control, API testing, debugging, and collaborative development.</li>
                </ul>
              </div>
            </section>

            {/* Personal Projects */}
            <section className="space-y-3 font-sans text-xs">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <Code className="w-4 h-4" /> Personal Projects
              </h2>
              {PROJECTS.map(proj => (
                <div key={proj.id} className="space-y-1">
                  <div style={{ color: paperText }} className="flex justify-between font-bold">
                    <span>• {proj.title}</span>
                    <span style={{ color: subText }} className="font-mono font-normal">{proj.date}</span>
                  </div>
                  <div style={{ color: subText }} className="italic">{proj.category}</div>
                  <ul style={{ color: paperText }} className="list-disc list-inside space-y-1 pl-2">
                    {proj.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Experience */}
            <section className="space-y-3 font-sans text-xs">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Experience
              </h2>
              {EXPERIENCE_ITEMS.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div style={{ color: paperText }} className="flex justify-between font-bold">
                    <span>• {item.role}</span>
                    <span style={{ color: subText }} className="font-mono font-normal">{item.period}</span>
                  </div>
                  <div style={{ color: subText }} className="italic">{item.organization}</div>
                  <ul style={{ color: paperText }} className="list-disc list-inside space-y-1 pl-2">
                    {item.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Achievements */}
            <section className="space-y-2 font-sans text-xs">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Achievements
              </h2>
              <ul style={{ color: paperText }} className="list-disc list-inside space-y-1.5">
                {ACHIEVEMENTS.map((a, idx) => (
                  <li key={idx}>
                    <strong style={{ color: paperText }}>{a.title}:</strong> {a.description}
                  </li>
                ))}
              </ul>
            </section>

            {/* Communication Languages */}
            <section className="space-y-1 font-sans text-xs">
              <h2 style={{ color: headerText, borderColor: borderColor }} className="text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-0.5 font-sans flex items-center gap-1.5">
                🌐 Communication Languages
              </h2>
              <ul style={{ color: paperText }} className="flex gap-4 font-bold pl-2">
                {PERSONAL_INFO.languages.map(lang => (
                  <li key={lang}>• {lang}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-black text-green-400 font-mono p-4 rounded win-inset overflow-x-auto text-xs leading-relaxed">
            <pre className="whitespace-pre-wrap">{`
SUMAN VERNEKAR
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

EDUCATION
• ${PERSONAL_INFO.degree} (2022 – 2026)
  ${PERSONAL_INFO.college} - ${PERSONAL_INFO.cgpa}
• ${PERSONAL_INFO.higherSecondary}

TECHNICAL SKILLS
- Programming Languages: JavaScript (ES6+), Java (Basic), HTML5, CSS3
- Frontend: React.js, React Router, Context API, Hooks, Axios, Tailwind CSS, Responsive Web Design, Flexbox, CSS Grid
- Backend: Node.js, Express.js, RESTful APIs, CRUD Operations, JWT Authentication, Cookies, CORS, Helmet, Rate Limiting, Multer, MVC Architecture
- Node.js Concepts: ${PERSONAL_INFO.nodeJsConcepts.join(', ')}
- Database: MongoDB, Mongoose, Schema Design, CRUD Operations, Validation, Aggregation Framework (Basic), Query Operators, Pagination
- Authentication & Security: ${PERSONAL_INFO.authSecurity.join(', ')}
- Developer Tools: Git, GitHub, VS Code, Postman, Chrome DevTools, npm
- AI Tools: ChatGPT, GitHub Copilot, Cursor AI, Qoder AI, Ollama, Tesseract OCR
- Additional Technologies: Axios, JSON, React Icons, React Loader, dotenv, Nodemon, Cloudinary
- Core Concepts: ${PERSONAL_INFO.coreConcepts.join(', ')}
- Soft Skills: ${PERSONAL_INFO.softSkills.join(', ')}
- Areas of Interest: ${PERSONAL_INFO.interests.join(', ')}

TRAINING
• JSpiders Training & Development Center (Jan 2026 – Present)
  MERN Stack Development Trainee - Bengaluru, India

PERSONAL PROJECTS
${PROJECTS.map(p => `• ${p.title} (${p.category})\n  Tech: ${p.techStack.join(', ')}\n  ${p.description}`).join('\n\n')}

EXPERIENCE
${EXPERIENCE_ITEMS.map(e => `• ${e.role} (${e.period})\n  ${e.organization}\n  ${e.details.map(d => `  - ${d}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS
${ACHIEVEMENTS.map(a => `• ${a.title}: ${a.description}`).join('\n')}

COMMUNICATION LANGUAGES
• ${PERSONAL_INFO.languages.join('\n• ')}
            `}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
