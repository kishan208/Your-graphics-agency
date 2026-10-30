import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Phone, Mail, MapPin, Copy, Check, ArrowRight, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO, SERVICES } from '../data/agencyData';

interface ContactSectionProps {
  initialService?: string;
  onOpenWorkspace?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, onOpenWorkspace }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || 'Branding & Creative Design');
  const [projectDetails, setProjectDetails] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync initialService if changed
  React.useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !projectDetails) return;

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#6366f1', '#ec4899', '#3b82f6'],
    });

    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(AGENCY_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Inquiries & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <span>Start a Project</span>
                <span aria-hidden="true">·</span>
                <span>Connect With YGA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1.5 leading-tight">
                Let's Create Something Extraordinary.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                Have a project in mind? Looking to build your brand, execute an event or grow your digital presence? Let's turn your ideas into reality.
              </p>
            </div>

            {/* Prominent WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Instant Consultation on WhatsApp</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Need immediate quotes for large format printing, event standee fabrications, or rush branding designs? Chat with our team in real-time.
              </p>
              <a
                href={AGENCY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect With Us on WhatsApp</span>
              </a>
            </div>

            {/* Google Workspace Client Brief & Gmail Portal Card */}
            {onOpenWorkspace && (
              <div className="p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Google Forms & Gmail Portal</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Connect with Google to generate branded client intake questionnaires in Google Forms or send proposals directly via Gmail.
                </p>
                <button
                  type="button"
                  onClick={onOpenWorkspace}
                  className="w-full py-2.5 px-4 text-xs font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Workspace Client Hub</span>
                </button>
              </div>
            )}

            {/* Direct Contact Channels */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-500">Official Email</div>
                    <a
                      href={`mailto:${AGENCY_INFO.contact.email}`}
                      className="text-xs font-bold text-neutral-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {AGENCY_INFO.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500">Direct Helpline</div>
                  <div className="text-xs font-bold text-neutral-950 dark:text-white">
                    {AGENCY_INFO.contact.phone}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
                    Project Request Received!
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-neutral-900 dark:text-white">{fullName}</span>. Our creative director and production manager will review your project requirements and get in touch within 12 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setProjectDetails('');
                    }}
                    className="mt-4 px-5 py-2.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                      Start Your Project With YGA
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Fill in the brief below for a dedicated strategy and production estimate.
                    </p>
                  </div>

                  {/* Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Retail Pvt Ltd"
                        className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 9990742473"
                        className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@company.com"
                        className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Required (dropdown / selection) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors cursor-pointer"
                    >
                      <option value="Branding & Creative Design">01. Branding & Creative Design (Logo, Corporate, Retail, Signage)</option>
                      <option value="Printing & Production">02. Printing & Production (Offset, Large Format, Standees, Merchandise)</option>
                      <option value="Offline Events & Activations">03. Offline Events & Activations (Launches, Mall/College, Stalls)</option>
                      <option value="Digital Marketing & Advertising">04. Digital Marketing & Advertising (Meta Ads, Leads, Reels, Social)</option>
                      <option value="Complete 360 Marketing Package">All Services / Complete 360 Marketing Package</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      Project Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Share your goals, timeline, estimated quantities (for printing/events), or brand vision..."
                      className="w-full px-4 py-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Primary CTA Button: Let's Discuss Your Project */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Let's Discuss Your Project</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
