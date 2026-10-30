import React from 'react';
import { Compass, Lightbulb, PenTool, Flame, TrendingUp, CheckCircle } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';

export const ProcessSection: React.FC = () => {
  const stepIcons = [Compass, Lightbulb, PenTool, Flame, TrendingUp];

  return (
    <section id="process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Our Working Process</span>
            <span aria-hidden="true">·</span>
            <span>How We Partner With You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-2">
            From Concept to Execution.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2">
            A disciplined, 5-stage creative and operational pipeline that ensures zero surprises and maximum audience impact.
          </p>
        </div>

        {/* Process Steps (Horizontal flow on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={step.step}
                className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900">
                      {step.step}
                    </span>
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold">
                      {step.number}
                    </span>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 w-fit group-hover:scale-105 transition-transform text-neutral-900 dark:text-white">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white mt-4">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
