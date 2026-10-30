import React from 'react';
import { ArrowUp, Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { AGENCY_INFO, SERVICES } from '../data/agencyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neutral-950 text-neutral-100 border-t border-neutral-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={AGENCY_INFO.logo}
                alt="YGA Emblem"
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
              <div>
                <div className="text-lg font-black tracking-tight text-white leading-tight">
                  {AGENCY_INFO.name} ({AGENCY_INFO.shortName})
                </div>
                <div className="text-xs font-semibold text-cyan-400">
                  {AGENCY_INFO.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Creative Solutions for Brands That Want to Stand Out. From strategic brand design and retail POSM to nationwide offset printing and high-impact digital campaigns.
            </p>

            <div className="pt-2">
              <a
                href={AGENCY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 rounded-xl hover:bg-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Our Work / Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors cursor-pointer">
                  Our Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Our Services
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Contact Information
            </div>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`mailto:${AGENCY_INFO.contact.email}`} className="hover:text-white transition-colors">
                  {AGENCY_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>{AGENCY_INFO.contact.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>{AGENCY_INFO.contact.address}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Social Media
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            Copyright © 2026 Your Graphics Agency. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>We Create · We Brand · We Grow</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
