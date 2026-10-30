export interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  color: string;
  services: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'branding' | 'retail' | 'printing' | 'events' | 'digital' | 'social';
  categoryLabel: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  impactMetric: string;
  year: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  desc: string;
  detail: string;
}

export const AGENCY_INFO = {
  name: 'Your Graphics Agency',
  shortName: 'YGA',
  tagline: 'We Create. We Brand. We Grow.',
  logo: '/assets/aistudio/image_cd5412e2.png',
  heroHeadline: ['YOUR VISION.', 'OUR CREATIVITY.', 'LIMITLESS POSSIBILITIES.'],
  heroSupportingText: 'We are Your Graphics Agency – your creative partner for branding, printing, offline events and digital marketing. We create experiences that make brands memorable and businesses grow.',
  aboutHeadline: 'More Than an Agency. Your Creative Growth Partner.',
  aboutParagraphs: [
    'At Your Graphics Agency, we believe every brand has a story worth telling.',
    'We combine innovative thinking, compelling design and flawless execution to create experiences that make brands more visible, more memorable and more impactful.',
    "Whether it's designing a brand identity, producing high-quality print materials, executing an engaging offline activation or running a digital campaign, we bring every element together under one creative vision.",
  ],
  mission: 'To turn creative ideas into meaningful brand experiences that deliver real business impact.',
  whatMakesUsDifferent: [
    { title: 'Creative Thinking', desc: 'Out-of-the-box concepts that cut through the noise and capture audience attention.' },
    { title: 'End-to-End Execution', desc: 'From initial sketch to physical fabrication and digital distribution, all under one roof.' },
    { title: 'Quality-Driven Approach', desc: 'Uncompromising print fidelity, pixel-perfect digital assets, and premium finishes.' },
    { title: 'Strategic Brand Communication', desc: 'Every design choice is rooted in business growth and customer psychology.' },
    { title: 'One Partner for Multiple Marketing Needs', desc: 'Eliminate multi-vendor friction with a unified, cohesive creative team.' },
  ],
  whyChooseYGA: {
    heading: 'One Agency. Endless Creative Possibilities.',
    subheading: 'Why coordinate with multiple agencies when you can manage your branding, printing, events and digital marketing under one roof?',
    points: [
      { title: 'Complete Creative Solutions', desc: 'Full spectrum from identity to on-ground activations.' },
      { title: 'Seamless Execution', desc: 'Flawless production timelines with dedicated project managers.' },
      { title: 'Customized Brand Strategies', desc: 'Tailored roadmaps matching your industry and growth stage.' },
      { title: 'Creative & Experienced Team', desc: 'Seasoned art directors, print specialists, and digital strategists.' },
      { title: 'Reliable Production Support', desc: 'State-of-the-art printing presses and fabrication facilities.' },
      { title: 'End-to-End Project Management', desc: 'Single point of contact from kickoff to post-launch evaluation.' },
    ],
  },
  contact: {
    email: 'kishanyadav743@gmail.com',
    phone: '+91 9990742473',
    whatsappUrl: 'https://wa.me/919990742473?text=Hello%20Your%20Graphics%20Agency%20(YGA)%2C%20I%20would%20like%20to%20discuss%20a%20project!',
    address: 'Creative Hub & Studio, Metro Tower, Level 4',
  },
};

export const SERVICES: ServiceCategory[] = [
  {
    id: 'branding',
    number: '01',
    title: 'Branding & Creative Design',
    headline: 'We build powerful visual identities that help brands establish recognition and stand out.',
    description: 'A strong brand is unforgettable. We craft holistic visual ecosystems that communicate your values with confidence across every touchpoint.',
    color: 'from-pink-500 to-rose-600',
    services: [
      'Brand Identity & Logo Design',
      'Corporate Branding',
      'Retail Branding',
      'Store Branding & Signage',
      'Marketing Collaterals',
      'POSM Design',
      'Promotional Creatives',
      'Event Branding & Backdrops',
      'Exhibition & Stall Design',
    ],
  },
  {
    id: 'printing',
    number: '02',
    title: 'Printing & Production',
    headline: 'We transform creative concepts into high-quality physical experiences.',
    description: 'From precision offset brochures to massive architectural vinyl banners, our production press ensures crisp color calibration and premium durability.',
    color: 'from-cyan-500 to-blue-600',
    services: [
      'Offset & Digital Printing',
      'Large Format Printing',
      'Standees & Banners',
      'Posters & Flyers',
      'Backdrops & Fabrication',
      'Retail Display Materials',
      'Promotional Merchandise',
      'Custom Printing Solutions',
      'Signage & Installation',
    ],
  },
  {
    id: 'events',
    number: '03',
    title: 'Offline Events & Activations',
    headline: 'We create engaging offline experiences that connect brands directly with their audiences.',
    description: 'Immersive on-ground consumer activations, high-voltage college festivals, mall engagements, and corporate product unveilings engineered for recall.',
    color: 'from-violet-500 to-purple-600',
    services: [
      'Corporate Events',
      'College Activations',
      'Mall Activations',
      'Retail Promotions',
      'Product Launches',
      'Roadshows & Rallies',
      'Exhibition & Stall Setup',
      'Influencer & On-Ground Engagement',
      'Event Planning & Execution',
    ],
  },
  {
    id: 'digital',
    number: '04',
    title: 'Digital Marketing & Advertising',
    headline: 'We help brands build their digital presence and connect with the right audience.',
    description: 'Data-driven performance campaigns, viral social media video creative, high-converting Meta funnels, and targeted lead generation strategies.',
    color: 'from-amber-500 to-orange-600',
    services: [
      'Social Media Management',
      'Meta Ads & Performance Marketing',
      'Lead Generation Campaigns',
      'Digital Brand Campaigns',
      'Content Creation',
      'Reels & Promotional Videos',
      'Campaign Strategy',
      'Audience Targeting & Optimization',
      'Digital Marketing Consultation',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Step 1',
    number: '01',
    title: 'Understand',
    desc: 'We understand your business, objectives, target audience and requirements.',
    detail: 'In-depth discovery session analyzing your market position, competitive landscape, and specific business targets.',
  },
  {
    step: 'Step 2',
    number: '02',
    title: 'Strategize',
    desc: 'We develop a creative direction and execution strategy.',
    detail: 'Formulating visual moods, messaging architecture, production specifications, and omni-channel distribution blueprints.',
  },
  {
    step: 'Step 3',
    number: '03',
    title: 'Create',
    desc: 'Our team develops concepts, designs and campaign ideas.',
    detail: 'Iterative design sprints, 3D retail mockups, copywriting, and visual asset engineering crafted for high impact.',
  },
  {
    step: 'Step 4',
    number: '04',
    title: 'Execute',
    desc: 'We bring everything to life through production, printing and marketing execution.',
    detail: 'Precision printing, fabrication, on-ground event management, and live digital ad campaign launching.',
  },
  {
    step: 'Step 5',
    number: '05',
    title: 'Deliver & Grow',
    desc: 'We evaluate outcomes and help brands build stronger connections with their audiences.',
    detail: 'Post-launch performance review, footfall & reach analytics, and continuous brand growth advisory.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aetheris-branding',
    title: 'Aetheris Corporate Brand Ecosystem',
    client: 'Aetheris Solutions',
    category: 'branding',
    categoryLabel: 'Branding & Identity',
    image: '/src/assets/images/portfolio_branding_identity_1793359200175.jpg',
    shortDesc: 'Complete corporate visual identity, foil-stamped stationery suite, guidelines, and premium packaging.',
    fullDesc: 'A comprehensive ground-up rebrand for a forward-thinking tech solutions firm. We developed the geometric typography mark, bespoke packaging systems with holographic accents, corporate stationery, and an exhaustive 80-page brand guidelines system.',
    deliverables: ['Logo & Visual Identity', 'Brand Guidelines Book', 'Embossed Stationery', 'Premium Product Packaging'],
    impactMetric: '300% increase in brand recall & B2B deal conversions',
    year: '2026',
  },
  {
    id: 'nexus-retail-posm',
    title: 'Nexus Audio Experience Store & POSM',
    client: 'Nexus Audio Global',
    category: 'retail',
    categoryLabel: 'Retail & POSM',
    image: '/src/assets/images/portfolio_retail_posm_1793359201225.jpg',
    shortDesc: 'Flagship store branding, illuminated 3D channel letters, interactive POSM kiosks, and point-of-sale displays.',
    fullDesc: 'Turnkey retail store branding covering exterior 3D LED signage, custom acrylic product pedestals, promotional POSM standees, and immersive sound demo zones across 14 nationwide retail outlets.',
    deliverables: ['Store Front 3D Signage', 'Interactive POSM Units', 'Wall Vinyl Wrap Systems', 'Counter Merchandising'],
    impactMetric: '42% lift in retail footfall & experiential dwell time',
    year: '2025',
  },
  {
    id: 'global-print-expo',
    title: 'Global Innovations Summit Large-Format Fabrication',
    client: 'TechWave Worldwide',
    category: 'printing',
    categoryLabel: 'Printing & Production',
    image: '/src/assets/images/portfolio_large_format_print_1793359202409.jpg',
    shortDesc: 'Ultra-wide CMYK fabric backdrops, truss banners, directional standees, and branded merchandise.',
    fullDesc: 'High-speed industrial printing and structural truss fabrication for a 5,000-attendee international conference. Executed over 12,000 sq.ft of wrinkle-free tension fabric backdrops and 40+ modular roll-up standees with zero color drift.',
    deliverables: ['Truss Backdrop Fabrication', 'Ultra-Wide Mesh Banners', 'Aluminum Roll-Up Standees', '10,000+ Attendee Kits'],
    impactMetric: '100% on-time delivery across 48-hour turn-around',
    year: '2025',
  },
  {
    id: 'nexus-flux-activation',
    title: 'Nexus Flux Experiential Product Launch',
    client: 'Nexus Tech',
    category: 'events',
    categoryLabel: 'Events & Activations',
    image: '/src/assets/images/portfolio_offline_event_1793359201612.jpg',
    shortDesc: 'Curved LED stage backdrops, interactive hands-on demo pods, lighting design, and live attendee engagement.',
    fullDesc: 'End-to-end on-ground launch event orchestration featuring an immersive curved LED mainstage, custom interactive testing stations, synchronized lighting cues, and influencer livestream integration for 1,200 VIP guests.',
    deliverables: ['Stage Architecture & Fabrication', 'Lighting & AV Production', 'On-Ground Registration App', 'Influencer Experience Pods'],
    impactMetric: '1.8M online impressions & 98% attendee satisfaction',
    year: '2025',
  },
  {
    id: 'aurora-digital-campaign',
    title: 'Aurora Performance Ads & Social Media Creative Suite',
    client: 'Aurora Tech',
    category: 'digital',
    categoryLabel: 'Digital Campaigns',
    image: '/src/assets/images/portfolio_digital_campaign_1793359202698.jpg',
    shortDesc: 'Omni-channel Meta ads, viral short-form video reels, high-converting lead funnels, and performance marketing.',
    fullDesc: 'End-to-end digital growth campaign spanning creative concepting, motion graphics design, A/B testing ad variations, and full-funnel Meta advertising optimization generating high-intent qualified leads.',
    deliverables: ['30+ High-Conversion Ad Creatives', 'Motion Reels & Short Videos', 'Landing Page UX & Funnel Copy', 'Lead Gen Campaign Architecture'],
    impactMetric: '4.8x ROAS & 65,000+ qualified leads generated',
    year: '2026',
  },
  {
    id: 'urban-bites-social',
    title: 'PulseStreet Social Media Creatives & Brand Voice',
    client: 'Pulse Hospitality',
    category: 'social',
    categoryLabel: 'Social Media Creatives',
    image: '/src/assets/images/portfolio_branding_identity_1793359200175.jpg',
    shortDesc: 'Monthly creative calendar, trending Reels templates, festival promotional creatives, and community engagement.',
    fullDesc: '360-degree social media management and creative storytelling that built an active, engaged community through striking visual food photography, motion design, and hyper-local influencer collaborations.',
    deliverables: ['Daily Feed & Story Creatives', 'Bespoke Motion Reels', 'Influencer Collaboration Kits', 'Holiday Promo Campaigns'],
    impactMetric: '+240% organic follower growth in 90 days',
    year: '2025',
  },
];

export interface FAQItem {
  id: string;
  category: 'timelines' | 'pricing' | 'workflow';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  // --- Timelines ---
  {
    id: 'timeline-branding',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question: 'How long does a complete branding and identity design project take?',
    answer: 'A comprehensive brand identity project typically takes 10 to 18 business days. This includes discovery, moodboarding, logo concepts, typography selection, color palette definition, brand guidelines, and stationery deliverables. For fast-track startup launches, we also offer an expedited 5-to-7 day sprint.',
    highlight: 'Standard turnaround: 10–18 business days (Expedited: 5–7 days)',
  },
  {
    id: 'timeline-printing',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question: 'What are the production turnaround times for printing & large format fabrication?',
    answer: 'Standard digital and offset printing (business cards, flyers, brochures) ships within 24 to 72 hours following artwork approval. Large format fabrication (truss backdrops, standees, vinyl wraps, and 3D acrylic store signage) generally requires 3 to 5 business days depending on order volume and installation logistics.',
    highlight: 'Standard print: 24–72 hours · Large fabrication: 3–5 days',
  },
  {
    id: 'timeline-rush-events',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question: 'Can YGA handle urgent print orders or last-minute event activations?',
    answer: 'Yes! We maintain high-speed in-house production machinery specifically reserved for priority rush orders. If you have an event or exhibition in 24 to 48 hours, reach out directly via call or WhatsApp at +91 9990742473 for instantaneous emergency dispatch.',
    highlight: '24-hour emergency turnaround available on selected materials',
  },

  // --- Pricing & Quotations ---
  {
    id: 'pricing-structure',
    category: 'pricing',
    categoryLabel: 'Pricing & Quotations',
    question: 'How does YGA structure project pricing and estimates?',
    answer: 'We provide transparent, itemized quotations based on the specific scope of work, material specifications (for printing), event scale, or monthly marketing objectives. There are no hidden fees. Once you approve the formal estimate, the project cost is locked.',
    highlight: '100% itemized pricing with zero surprise charges',
  },
  {
    id: 'pricing-payment-terms',
    category: 'pricing',
    categoryLabel: 'Pricing & Quotations',
    question: 'What are the standard payment terms and milestone schedules?',
    answer: 'For design and fabrication projects, we typically operate on a 50% mobilization advance upon project kickoff, with the remaining 50% due upon final artwork sign-off or pre-dispatch inspection. For long-term retainers (e.g. digital ads, monthly social media), billing is processed at the start of each monthly cycle.',
    highlight: '50% kickoff advance · 50% upon final sign-off / dispatch',
  },
  {
    id: 'pricing-raw-files',
    category: 'pricing',
    categoryLabel: 'Pricing & Quotations',
    question: 'Are source vector design files and commercial copyrights included?',
    answer: 'Absolutely. Upon settlement of final project dues, full commercial ownership and raw source files (Adobe Illustrator .AI, high-res PDF, SVG, EPS, PNG, and font licenses) are transferred directly to you. You maintain 100% intellectual property ownership.',
    highlight: 'Full IP ownership & raw vector source files included',
  },

  // --- Workflow & Collaboration ---
  {
    id: 'workflow-revisions',
    category: 'workflow',
    categoryLabel: 'Agency Workflow',
    question: 'How do creative revisions and design feedback work?',
    answer: 'We offer structured revision rounds across every project stage (typically 2 to 3 iterations on concepts followed by fine-tuning). We provide collaborative preview links where you and your team can pin comments directly onto visual mockups, ensuring effortless alignment.',
    highlight: '2–3 collaborative iteration rounds with pinned visual comments',
  },
  {
    id: 'workflow-turnkey',
    category: 'workflow',
    categoryLabel: 'Agency Workflow',
    question: 'Can YGA handle both the creative design AND the on-ground physical execution?',
    answer: 'Yes, this is our biggest competitive advantage! With traditional agencies, designers do not understand print bleed or fabrication physics, leading to costly manufacturer miscommunications. At YGA, our design team works directly alongside our printing press and event fabrication crews to ensure what you see on screen matches reality perfectly.',
    highlight: 'Complete turnkey integration: design, print, and physical installation',
  },
  {
    id: 'workflow-getting-started',
    category: 'workflow',
    categoryLabel: 'Agency Workflow',
    question: 'How do we get started on our first project with Your Graphics Agency?',
    answer: 'Getting started is seamless. Submit your requirements through our online form, message us on WhatsApp, or call +91 9990742473. We will schedule a 15-minute discovery call, discuss your goals, and send a tailored creative strategy and quotation within 24 hours.',
    highlight: 'Instant discovery kickoff · Custom strategy & quote in 24 hrs',
  },
];

