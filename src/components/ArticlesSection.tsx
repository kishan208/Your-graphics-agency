import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTICLES, Article } from '../data/portfolioData';

interface ArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="articles" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Engineering Insights</span>
            <span aria-hidden="true">·</span>
            <span>Technical Papers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Articles & Publications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            In-depth breakdowns on distributed consensus, speculative agent scheduling, and low-latency kernel telemetry.
          </p>
        </div>

        {/* Articles List */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6 cursor-pointer hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 px-4 -mx-4 rounded-xl transition-colors"
            >
              <div className="space-y-2 max-w-3xl">
                {/* Clean unboxed metadata with dot separators (NO PILLS) */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="shrink-0 self-start md:self-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
