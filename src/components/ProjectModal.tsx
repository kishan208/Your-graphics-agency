import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { PortfolioProject } from '../data/agencyData';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onStartSimilarProject: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartSimilarProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Client: {project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Visual Image Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-video w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mt-3 leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Quantitative Impact Metric */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                Measurable Business Outcome
              </div>
              <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {project.impactMetric}
              </div>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              Executed Deliverables
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Esc to close
          </div>
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject(project.title);
            }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Inquire for Similar Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
