import React, { useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import { Article } from '../data/portfolioData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
            {article.title}
          </h1>

          {/* Key Takeaways */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              Core Architectural Takeaways
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">›</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full text */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-500">
          <span>Published by Kishan Yadav</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-200/80 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
