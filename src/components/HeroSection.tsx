import React from 'react';
import { ArrowRight, Sparkles, Palette, Printer, Megaphone, Calendar, CheckCircle } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface HeroSectionProps {
  onExploreServices: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onStartProject,
}) => {
  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Background ambient gradient waves matching the YGA logo colors (cyan, magenta, indigo) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/20 to-pink-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Headline & Proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed kicker (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">{AGENCY_INFO.shortName}</span>
              <span aria-hidden="true">·</span>
              <span>Full-Service Creative & Marketing Agency</span>
            </div>

            {/* Main Headline: 3 bold punchy lines */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              <span className="block text-neutral-950 dark:text-white">YOUR VISION.</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
                OUR CREATIVITY.
              </span>
              <span className="block text-neutral-950 dark:text-white">LIMITLESS POSSIBILITIES.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {AGENCY_INFO.heroSupportingText}
            </p>

            {/* Value Proposition bullets */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Branding & Retail Signage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>High-Speed Production Printing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Offline On-Ground Activations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Meta Ads & Performance Growth</span>
              </div>
            </div>

            {/* Buttons: Explore Our Services & Start a Project */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl transition-colors whitespace-nowrap cursor-pointer border border-neutral-200 dark:border-neutral-700"
              >
                <span>Explore Our Services</span>
              </button>
            </div>
          </div>

          {/* Right Column: Prominent Animated Agency Logo Visual (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Radial glow and neon grid backdrop */}
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden w-full max-w-md mx-auto">
              
              {/* Animated subtle grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293720_1px,transparent_1px),linear-gradient(to_bottom,#1f293720_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Glowing energy wave ring behind logo */}
              <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-500/30 to-pink-500/25 blur-2xl animate-pulse pointer-events-none" />

              {/* Agency Logo Image */}
              <div className="relative group cursor-pointer z-10 transition-transform duration-500 hover:scale-105">
                <img
                  src={AGENCY_INFO.logo}
                  alt="Your Graphics Agency (YGA) Official Emblem"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-full shadow-2xl border-2 border-neutral-800/80"
                />
              </div>

              {/* Agency badge tag */}
              <div className="mt-6 z-10 text-center space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {AGENCY_INFO.tagline}
                </div>
                <div className="text-xs text-neutral-400 font-medium">
                  Branding · Printing · Offline Events · Digital Marketing
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Full-Width Row Below Hero Split: 4 Service Capability Strips */}
        <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">Branding & Creative</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Identities, retail & POSM</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">Printing & Production</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Offset, digital & fabrications</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">Offline Events</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Launches, mall & activations</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">Digital Marketing</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Meta ads, leads & video reels</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
