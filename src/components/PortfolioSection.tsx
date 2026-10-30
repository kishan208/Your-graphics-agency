import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/agencyData';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'branding', label: 'Branding & Identity' },
    { id: 'retail', label: 'Retail & POSM' },
    { id: 'printing', label: 'Printing & Production' },
    { id: 'events', label: 'Events & Activations' },
    { id: 'digital', label: 'Digital Campaigns' },
    { id: 'social', label: 'Social Media Creatives' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Our Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Selected Creative Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1.5">
              Ideas Into Impactful Experiences.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Explore our creative work, branding projects, advertising campaigns and on-ground activations.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line, no wraps) */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto self-start md:self-end max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Visual Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              {/* Large Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg bg-neutral-900/80 backdrop-blur-md text-white border border-neutral-700">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Client: {project.client}
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Impact line and action */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400 truncate max-w-[70%]">
                    {project.impactMetric}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform shrink-0">
                    <span>View Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
