import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { User } from 'firebase/auth';
import { AGENCY_INFO } from '../data/agencyData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenContact: () => void;
  onOpenWorkspace: () => void;
  currentUser: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenContact,
  onOpenWorkspace,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Our Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* 3-zone Top Bar Contract: Brand — 5 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Mark with Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src={AGENCY_INFO.logo}
            alt="Your Graphics Agency (YGA) Logo"
            className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none">
              {AGENCY_INFO.name}
            </span>
            <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 tracking-wider mt-0.5">
              {AGENCY_INFO.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action (Let's Work Together) + Theme Switcher */}
        {/* Zone 3: Primary Action (Let's Work Together) + Workspace + Theme Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Google Workspace Portal Trigger */}
          <button
            onClick={onOpenWorkspace}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              currentUser
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700'
            }`}
            title="Google Workspace (Gmail & Forms)"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{currentUser ? 'Workspace Connected' : 'Gmail & Forms'}</span>
          </button>

          <a
            href={AGENCY_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            title="Chat on WhatsApp"
            aria-label="WhatsApp quick chat"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 rounded-xl text-center shadow-xs"
            >
              Let's Work Together
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkspace();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center gap-2 border border-blue-200 dark:border-blue-800"
            >
              <Mail className="w-4 h-4" />
              <span>{currentUser ? 'Open Workspace Hub' : 'Connect Gmail & Forms'}</span>
            </button>
            <a
              href={AGENCY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
