import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 print:hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Curriculum Vitae / Professional Resume
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {PERSONAL_INFO.role}
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>kishanyadav.dev</span>
              </span>
            </div>
          </div>

          {/* Core Technical Proficiencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <div className="font-bold text-neutral-950 dark:text-white mb-1">{cat.title}</div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Experience History
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-neutral-950 dark:text-white text-sm">
                        {exp.role}
                      </span>
                      <span className="text-neutral-400 mx-1.5">·</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 text-xs">
                        {exp.company}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-neutral-500">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Background */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Education & Honors
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="font-bold text-neutral-950 dark:text-white">
                  B.S. in Computer Science & Distributed Systems
                </span>
                <span className="text-neutral-400 mx-1.5">·</span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  Magna Cum Laude
                </span>
              </div>
              <span className="font-mono text-neutral-500">Graduated 2018</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
