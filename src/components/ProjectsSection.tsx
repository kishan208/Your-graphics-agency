import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'systems' | 'devtools'>('all');

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Selected Case Studies</span>
              <span aria-hidden="true">·</span>
              <span>Production Architectures</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
              Engineering Work & Systems
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Real-world systems engineered for resilience under heavy concurrency, sub-second latency, and enterprise workloads.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with active/inactive states) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 self-start md:self-end">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'ai', label: 'AI & Agents' },
              { id: 'systems', label: 'Distributed Systems' },
              { id: 'devtools', label: 'Developer Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            // Give the first two projects prominent wide bento spans
            const isWide = index === 0 || index === 1;
            const spanClass = isWide 
              ? 'lg:col-span-6' 
              : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md ${spanClass}`}
              >
                {/* Media frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Subtle top metadata */}
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-neutral-900/80 backdrop-blur-md text-white font-medium border border-neutral-700">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Clean unboxed category label (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      <span>{project.subtitle}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Highlight Metric Line */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-700 dark:text-neutral-300 font-medium">
                      {project.highlightMetric}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
