import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, TESTIMONIALS } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Career Progression</span>
            <span aria-hidden="true">·</span>
            <span>Leadership & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Experience & Impact
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            A track record of taking complex distributed architectures from blank-canvas design to 99.99% multi-region production scale.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    <span>{exp.company}</span>
                    <span aria-hidden="true" className="text-neutral-400">·</span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-normal flex items-center gap-1 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg self-start">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-4 leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements with clean CheckCircle2 */}
              <div className="mt-5 space-y-2.5">
                {exp.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack tags */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Endorsements / Testimonials (Section H: Social Proof & Quantitative Rigor) */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6">
            Colleague & Leadership Endorsements
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="text-xs font-bold text-neutral-950 dark:text-white">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
