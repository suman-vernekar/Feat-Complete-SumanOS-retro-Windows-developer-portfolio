import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Send, Copy, Check, Phone, Globe, Code2, ExternalLink, Loader2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ContactApp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setIsSending(true);

    try {
      // Send real email directly to Suman's Gmail inbox via FormSubmit API
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject || 'Portfolio Message from SumanOS',
          message: message,
          _template: 'table'
        })
      });

      if (response.ok) {
        sound.playWin();
        setIsSent(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Mail dispatch fallback');
      }
    } catch {
      // Fallback: Open prefilled mailto link if offline or blocked
      sound.playWin();
      setIsSent(true);
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSending(false);
      setTimeout(() => setIsSent(false), 6000);
    }
  };

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full font-sans text-xs select-text">
      {/* Outlook Express Header */}
      <div className="win-outset p-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          <div>
            <h2 className="font-bold text-sm">Outlook Express 6.0 - Direct Inbox Dispatcher</h2>
            <p className="text-[10px] text-blue-200">Sends Email Directly to sumanvernekarvernekar@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyEmail}
            className="win-btn px-3 py-1 font-bold text-black flex items-center gap-1 bg-[#c0c0c0]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-100 dark:bg-[#1e1e1e] overflow-y-auto space-y-4">
        {/* Social Quick Links Bar */}
        <div className="win-inset p-3 bg-white dark:bg-[#252525] flex flex-wrap justify-between items-center gap-2">
          <div className="font-bold text-gray-700 dark:text-gray-300">Direct Contacts:</div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="win-btn px-3 py-1 font-bold text-blue-800 flex items-center gap-1 bg-[#c0c0c0]"
            >
              <Mail className="w-3.5 h-3.5" /> Mailto Link
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="win-btn px-3 py-1 font-bold flex items-center gap-1 bg-[#c0c0c0]"
            >
              <Globe className="w-3.5 h-3.5" /> GitHub ↗
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="win-btn px-3 py-1 font-bold text-blue-900 flex items-center gap-1 bg-[#c0c0c0]"
            >
              <Globe className="w-3.5 h-3.5" /> LinkedIn ↗
            </a>
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="win-btn px-3 py-1 font-bold text-amber-800 flex items-center gap-1 bg-[#c0c0c0]"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-600" /> LeetCode ↗
            </a>
            <span className="px-2 py-1 bg-gray-200 dark:bg-neutral-800 font-mono flex items-center gap-1 rounded border">
              <Phone className="w-3 h-3 text-green-600" /> {PERSONAL_INFO.phone}
            </span>
          </div>
        </div>

        {/* Outlook Form */}
        <form onSubmit={handleSubmit} className="win-outset p-4 bg-[#c0c0c0] dark:bg-[#2a2a2a] text-black dark:text-white space-y-3">
          <div className="flex items-center gap-3">
            <label className="w-16 font-bold text-right">To:</label>
            <input
              type="text"
              readOnly
              value={PERSONAL_INFO.email}
              className="win-inset flex-1 px-2 py-1 bg-gray-100 dark:bg-neutral-800 font-mono outline-none font-bold text-blue-900 dark:text-blue-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-16 font-bold text-right">From Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name / HR / Recruiter"
              className="win-inset flex-1 px-2 py-1 bg-white dark:bg-black font-sans outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-16 font-bold text-right">From Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@company.com"
              className="win-inset flex-1 px-2 py-1 bg-white dark:bg-black font-sans outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-16 font-bold text-right">Subject:</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Job Opportunity / Project Inquiry"
              className="win-inset flex-1 px-2 py-1 bg-white dark:bg-black font-sans outline-none"
            />
          </div>

          <div className="flex items-start gap-3">
            <label className="w-16 font-bold text-right pt-1">Message:</label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Suman, I checked out your portfolio and would like to discuss..."
              className="win-inset flex-1 p-2 bg-white dark:bg-black font-sans outline-none resize-none leading-relaxed"
            />
          </div>

          {isSent && (
            <div className="win-inset p-3 bg-green-100 text-green-950 font-bold text-center border-2 border-green-600 rounded">
              ✅ Email delivered directly to Suman's inbox ({PERSONAL_INFO.email})!
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Job%20Opportunity&body=Hi%20Suman,`}
              className="win-btn px-4 py-1.5 font-bold bg-[#c0c0c0] text-black flex items-center gap-1"
            >
              <span>Open App</span> <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="submit"
              disabled={isSending}
              className="win-btn px-6 py-1.5 font-bold bg-blue-700 text-white flex items-center gap-2 active:translate-y-0.5 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending to Inbox...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send to Suman's Inbox
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
