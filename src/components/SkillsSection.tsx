import React, { useState } from 'react';
import { Search, Code2, Cpu, Layout, Cloud } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const icons = [Code2, Cpu, Layout, Cloud];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.note.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Technical Competencies</span>
              <span aria-hidden="true">·</span>
              <span>Architecture Arsenal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
              Skills & Engineering Stack
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Battle-tested competencies honed over 8+ years architecting high-throughput distributed systems and human-AI software.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, tool, or tech..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid: 4 domain categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={category.title}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="mt-6 space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {skill.name}
                          </span>
                          <span className="font-mono text-neutral-500 dark:text-neutral-400 tabular-nums">
                            {skill.experience}
                          </span>
                        </div>
                        
                        {/* Proficiency bar */}
                        <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Production context note */}
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                          {skill.note}
                        </div>
                      </div>
                    ))}
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
