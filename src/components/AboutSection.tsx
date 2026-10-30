import React from 'react';
import { Target, Lightbulb, Workflow, Award, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const AboutSection: React.FC = () => {
  const diffIcons = [Lightbulb, Workflow, Award, Target, Layers];

  return (
    <section id="about" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/40 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>About Your Graphics Agency</span>
            <span aria-hidden="true">·</span>
            <span>Who We Are</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1.5 leading-tight">
            {AGENCY_INFO.aboutHeadline}
          </h2>
        </div>

        {/* Narrative & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Narrative Paragraphs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            {AGENCY_INFO.aboutParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Mission Callout Card */}
            <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                <Target className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <p className="text-lg font-bold text-neutral-950 dark:text-white leading-snug">
                "{AGENCY_INFO.mission}"
              </p>
            </div>
          </div>

          {/* Agency Creative Highlights & Statistics (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                Creative Firepower Under One Roof
              </div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                We bridge the gap between imagination and physical reality.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Most agencies do design, but leave printing to a 3rd party. Event planners don't understand digital marketing funnels. At YGA, every discipline is synchronized under unified creative direction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div>
                <div className="text-3xl font-black font-mono text-neutral-950 dark:text-white">360°</div>
                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">Brand Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-black font-mono text-neutral-950 dark:text-white">100%</div>
                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">In-House Quality Control</div>
              </div>
            </div>
          </div>

        </div>

        {/* What Makes Us Different? (5 Core Cards) */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Our Key Differentiators
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mt-1">
              What Makes Us Different?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AGENCY_INFO.whatMakesUsDifferent.map((item, idx) => {
              const Icon = diffIcons[idx % diffIcons.length];
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
