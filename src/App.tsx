import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseYGA } from './components/WhyChooseYGA';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { WorkspaceHubModal } from './components/WorkspaceHubModal';
import { PortfolioProject, AGENCY_INFO } from './data/agencyData';
import { initAuth } from './services/googleAuth';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default dark aesthetic matching the vibrant neon YGA brand identity
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [inquiryService, setInquiryService] = useState<string>('Branding & Creative Design');

  // Google Workspace Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setInquiryService(serviceName);
    scrollToSection('contact');
  };

  const handleStartSimilarProject = (projectName: string) => {
    setInquiryService(`Project similar to: ${projectName}`);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContact={() => scrollToSection('contact')}
        onOpenWorkspace={() => setWorkspaceModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Agency Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Prominent YGA Logo */}
        <HeroSection
          onExploreServices={() => scrollToSection('services')}
          onStartProject={() => scrollToSection('contact')}
        />

        {/* 2. About Us Section & 5 Differentiators */}
        <AboutSection />

        {/* 3. Our Services (4 Pillars & 36 subservices + Scope Builder) */}
        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* 4. Portfolio / Our Work Gallery */}
        <PortfolioSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Our Working Process (5 Steps) */}
        <ProcessSection />

        {/* 6. Why Choose YGA? (6 Core Pillars) */}
        <WhyChooseYGA
          onStartProject={() => scrollToSection('contact')}
        />

        {/* 7. Frequently Asked Questions (Timelines, Pricing, Workflow) */}
        <FAQSection />

        {/* 8. Contact Us & WhatsApp Direct */}
        <ContactSection
          initialService={inquiryService}
          onOpenWorkspace={() => setWorkspaceModalOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Project Lightbox & Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilarProject={handleStartSimilarProject}
      />

      {/* Google Workspace Client Hub (Gmail & Forms) */}
      <WorkspaceHubModal
        isOpen={workspaceModalOpen}
        onClose={() => setWorkspaceModalOpen(false)}
        currentUser={currentUser}
        onAuthChange={(user, token) => {
          setCurrentUser(user);
          setAccessToken(token);
        }}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={AGENCY_INFO.contact.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          title="Chat with Your Graphics Agency on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
            WhatsApp Us
          </span>
        </a>
      </aside>

    </div>
  );
}
