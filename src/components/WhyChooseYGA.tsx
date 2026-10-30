import React from 'react';
import { CheckCircle2, Layers, Clock, Zap, Users, Shield, Headphones } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface WhyChooseYGAProps {
  onStartProject: () => void;
}

export const WhyChooseYGA: React.FC<WhyChooseYGAProps> = ({ onStartProject }) => {
  const icons = [Layers, Zap, Clock, Users, Shield, Headphones];

  return (
    <section className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/40 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Why Choose YGA?</span>
            <span aria-hidden="true">·</span>
            <span>The Single-Partner Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1.5 leading-tight">
            {AGENCY_INFO.whyChooseYGA.heading}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
            {AGENCY_INFO.whyChooseYGA.subheading}
          </p>
        </div>

        {/* 6 Core Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENCY_INFO.whyChooseYGA.points.map((point, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={point.title}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                    {point.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {point.desc}
                </p>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Guaranteed by YGA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action strip */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to eliminate marketing fragmentation?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Unify your branding, printing, offline activations, and digital marketing today.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="px-6 py-3.5 text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            Start Your Project With YGA
          </button>
        </div>

      </div>
    </section>
  );
};
