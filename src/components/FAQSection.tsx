import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle, Clock, DollarSign, Workflow, Search } from 'lucide-react';
import { FAQ_ITEMS, FAQItem, AGENCY_INFO } from '../data/agencyData';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'timelines' | 'pricing' | 'workflow'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('timeline-branding');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'timelines', label: 'Project Timelines', icon: Clock },
    { id: 'pricing', label: 'Pricing & Quotations', icon: DollarSign },
    { id: 'workflow', label: 'Agency Workflow', icon: Workflow },
  ];

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>Client Transparency & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-2">
            Answers to How We Work, Price & Deliver
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2">
            Transparent insights into our project turnarounds, straightforward pricing structure, and collaborative execution workflow.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full sm:w-auto overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 text-xs">
              No questions found matching your search. Try another keyword or reach out directly.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-neutral-900 border-blue-400/80 dark:border-blue-600/80 shadow-sm'
                      : 'bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-bold text-neutral-400 dark:text-neutral-500 shrink-0">
                        {item.categoryLabel.split(' ')[0]}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 mt-1 animate-in fade-in duration-200 space-y-3">
                      <p>{item.answer}</p>
                      
                      {item.highlight && (
                        <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span>{item.highlight}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Trust Reassurance Banner with Direct Phone & WhatsApp */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Have a specific question not covered here?
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Speak directly with our team at {AGENCY_INFO.contact.phone}
            </h3>
            <p className="text-xs text-neutral-300 max-w-md">
              We respond immediately to urgent print deadlines, custom fabrication queries, and digital marketing audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${AGENCY_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 text-xs font-bold rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call {AGENCY_INFO.contact.phone}</span>
            </a>

            <a
              href={AGENCY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
