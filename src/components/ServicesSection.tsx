import React, { useState } from 'react';
import { ArrowRight, Check, Palette, Printer, Calendar, Megaphone, SlidersHorizontal, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Brand Identity & Logo Design',
    'Large Format Printing',
  ]);

  const serviceIcons = [Palette, Printer, Calendar, Megaphone];

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <section id="services" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Full-Stack Marketing Solutions</span>
              <span aria-hidden="true">·</span>
              <span>Our Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1.5">
              Comprehensive Creative Services
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              From foundational brand identity to nationwide printing, on-ground event fabrication, and hyper-targeted digital advertising campaigns.
            </p>
          </div>

          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <span>4 Core Disciplines</span>
            <span aria-hidden="true" className="mx-1.5">·</span>
            <span>36 Tailored Services</span>
          </div>
        </div>

        {/* 4 Major Service Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((cat, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <div
                key={cat.id}
                className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col justify-between space-y-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group"
              >
                <div>
                  {/* Category Header Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">
                          {cat.number}
                        </span>
                        <h3 className="text-xl font-bold text-neutral-950 dark:text-white leading-tight">
                          {cat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Headline & Description from brief */}
                  <div className="mt-4 space-y-1.5">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {cat.headline}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Subservices Checklist/Pills */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                      Included Capabilities & Deliverables
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors flex items-center justify-between text-xs font-medium ${
                              isSelected
                                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 text-blue-950 dark:text-blue-200 font-semibold'
                                : 'bg-neutral-50/50 dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <span className="pr-2">{service}</span>
                            <span
                              className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-neutral-300 dark:border-neutral-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {cat.services.length} Specialized Offerings
                  </span>
                  <button
                    onClick={() => onSelectServiceForInquiry(cat.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Inquire About {cat.title.split('&')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope Summary Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">
                Interactive Project Scope: {selectedServices.length} Service(s) Selected
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Click any service box above to tailor your custom package.
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectServiceForInquiry(selectedServices.join(', '))}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            Get Custom Quote for Selected Scope
          </button>
        </div>

      </div>
    </section>
  );
};
