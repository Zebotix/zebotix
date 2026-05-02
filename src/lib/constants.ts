export const COMPANY_NAME = 'Zebotix';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zebotix.com';
export const SHORT_DESC = 'Zebotix — software & AI solutions that power modern businesses: web apps, ML, and custom IT services.';
 
export const CONTACT_PHONE = '+92-337-8568671';
export const CONTACT_EMAIL = 'zebotix@gmail.com';

export const SOCIAL_LINKS = {
  twitter: 'https://x.com/zebotix1499',
  github: 'https://github.com/Zebotix',
  facebook: 'https://www.facebook.com/people/Zebotix/61567313714101/',
  instagram: 'https://www.instagram.com/zebotix',
};

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    pricePKR: 'PKR 4,999',
    short: 'Simple, fast launch for small businesses — responsive site + basic PWA/wrapper.',
    features: [
      'Up to 10 responsive pages',
      'Basic contact form (emails forwarded)',
      '1 simple logo (free)',
      'PWA / wrapper (not a native app)',
      'Content upload guidance',
    ],
    details: {
      deliverables:
        '1 responsive website (up to 10 pages), basic contact form (emails forwarded to client), 1 simple logo, Progressive Web App (PWA) or wrapper for Android/iOS — not a native app unless explicitly scoped.',
      content:
        'Client supplies all content (images, copy). Content upload allowed to local storage only. We provide upload instructions; optional upload-for-you service available for an extra fee on request.',
      exclusions:
        'No source code / no repo access included. Hosting is not included by default; hosting available for an additional monthly fee (quoted separately).',
      delivery: 'Delivery within 2 business days after we receive required content and deposit.',
      revisions:
        'Up to 5 UI revisions included (minor edits: text, images, colors, layout tweaks). Major scope changes (new pages, new features) will be quoted separately.',
      support:
        '30-day limited bug-fix window after delivery. Response SLA: critical issues within 48 hours; non-critical within 5 business days.',
      note: 'Starter is intended for quick launches and small sites. If you need server-side admin or custom integrations, choose Business or Enterprise.',
      addons: [
        'Role-based access: +PKR 2,999 (up to 3 roles; custom roles quoted separately)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe recommended; gateway fees & PCI compliance are client responsibility)',
        'Source code transfer: +PKR 4,999 (delivered after final payment and repo handover)',
      ],
    },
  },
  {
    id: 'business',
    name: 'Business (recommended)',
    pricePKR: 'PKR 14,999',
    short: 'Content editing, staging, and a small admin panel for growing businesses.',
    features: [
      'Simple admin panel (lightweight CMS)',
      'Email/password auth + reset',
      'Image optimization & CDN',
      'Staging environment',
      'UAT with 5 business days acceptance',
    ],
    details: {
      deliverables:
        'Responsive website with a lightweight admin panel for editing content (titles, images, basic pages). Tech: lightweight headless or in-app editor (e.g., Next.js + headless CMS or similar) — focused on content updates, not a full enterprise CMS.',
      auth: 'Basic email/password login with secure password reset via email. Passwords are stored hashed; standard security measures applied (rate limits, secure cookies). For SSO or enterprise auth, choose Enterprise.',
      performance:
        'We will implement image optimization (e.g., next/image or build-time optimizations), caching recommendations, and CDN setup where applicable. This is implemented as part of the deliverable (not just recommended).',
      staging_uat:
        'A staging environment is provided for review. One round of User Acceptance Testing (UAT) is included. Client has 5 business days to provide feedback; after that, changes follow the revision policy.',
      delivery:
        'Delivery timeline depends on scope and content — typical delivery quoted on acceptance. Includes basic QA and one UAT round.',
      support:
        '30-day bug-fix window included. Response SLA: critical within 24–48 hours; non-critical within 3–5 business days.',
      addons: [
        'Role-based access: +PKR 2,999 (up to 5 roles; complexity caps apply — custom roles require quote)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe; client pays gateway fees; PCI compliance considerations apply)',
        'Source code transfer: +PKR 4,999 (after final payment & license checks)',
        'Advanced SEO / performance: quoted per page or fixed package — includes audit, prioritized fixes, and a report.',
      ],
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    pricePKR: 'PKR 34,999',
    short: 'Full delivery with repo access, CI/CD, analytics, and security checklist.',
    features: [
      'Source code & repo access (after final payment)',
      'Basic CI/CD setup (Vercel/Netlify)',
      'Analytics + GTM setup',
      'Security checklist delivered',
      'Custom integrations (quoted separately)',
    ],
    details: {
      deliverables:
        'Full project delivery with code repository access and a basic CI/CD pipeline (Vercel / Netlify or equivalent). Analytics and Google Tag Manager (GTM) setup included. A concise security checklist will be provided.',
      source_code:
        'Source code transfer is provided only after final payment is cleared and confirmation of required third-party licenses. We will grant repo access (Git) once payment and license checks are complete.',
      ci_cd:
        'Basic CI/CD setup for automatic deploys (branch → staging / branch → production workflows). Further automation or complex pipelines are scoped separately.',
      integrations:
        'Enterprise integrations (ERP, payment platforms, CRMs) require separate scoping and quote — not included in the base price.',
      delivery:
        'Delivery timeline depends on final scope and integrations. Exact timelines provided after scoping.',
      support:
        'Enterprise-level SLAs available — contact sales for dedicated support and options (on-call, faster response times).',
      addons: [
        'Role-based access: +PKR 2,999 (complexity caps; custom RBAC quoted separately)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe; gateway fees & PCI/merchant responsibilities apply)',
        'Source code transfer: +PKR 4,999 (transfer terms: post-payment & repo handover)',
        'Advanced SEO / performance: custom quote (site audit, fixes, and reporting).',
      ],
    },
  },
]
export const FAQS = [
  {
    question: 'What services does Zebotix offer?',
    answer:
      'We build responsive websites, Progressive Web Apps (PWA), mobile wrappers, and admin panels. We also provide hosting, performance optimization, analytics setup, and custom integrations for growing businesses.',
  },
  {
    question: 'What is the difference between a PWA, a wrapper, and a native app?',
    answer:
      'A PWA is a web app that behaves like a mobile app (installable, offline support). A wrapper packages a web app into an Android/iOS shell (not a native rebuild). A native app is built specifically for Android/iOS and requires separate development and costs.',
  },
  {
    question: 'Which package should I choose (Starter / Business / Enterprise)?',
    answer:
      'Starter is for small sites/landing pages (PKR 4,999). Business is for growing companies needing a lightweight CMS and staging (PKR 14,999). Enterprise is for full repo access, CI/CD, analytics and custom integrations (PKR 34,999). Contact us if you need help selecting.',
  },
  {
    question: 'What does the Starter package include?',
    answer:
      'Starter includes one responsive site up to 10 pages, a basic contact form (email forwarding), one simple logo, and a PWA/wrapper (not a native app). Client provides content; optional uploads-for-you are available for a fee.',
  },
  {
    question: 'Do you provide content or design copywriting?',
    answer:
      'Clients should provide images and copy. We offer guidance and templates for content upload. Content creation or copywriting is available as an add-on and will be quoted separately.',
  },
  {
    question: 'Will you host my website? What are hosting fees?',
    answer:
      'Hosting is not included by default. We can host your site for a separate monthly fee (quoted based on traffic and storage). Alternatively, we can supply deployment instructions so you host with your own provider.',
  },
  {
    question: 'Do I get source code or repo access?',
    answer:
      'Source code transfer is available as an add-on (PKR 4,999) and is provided only after final payment and confirmation of licenses for third-party tools. Repo access for collaboration can be provided earlier on request under agreed terms.',
  },
  {
    question: 'What are payment terms, deposits and refunds?',
    answer:
      'A deposit is required before work starts (typically 30–50%). Final payment is due before source code transfer or project handover. Refunds follow our contract; simple cancellations before development may be partially refundable depending on work completed.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Starter sites: typically 2 business days after we receive required content and deposit. Business & Enterprise timelines vary by scope — we provide a delivery estimate during quoting.',
  },
  {
    question: 'How many revisions are included?',
    answer:
      'Starter: up to 5 UI revisions (small edits to text, images, and layout). Business/Enterprise include UAT and one formal review; additional revisions or scope changes are quoted separately.',
  },
  {
    question: 'What post-delivery support do you offer?',
    answer:
      'All packages include a 30-day limited bug-fix window. Response SLA: critical issues within 24–48 hours; non-critical within 3–5 business days. Extended maintenance plans are available.',
  },
  {
    question: 'How do you test quality and accessibility?',
    answer:
      'We perform functional QA, basic cross-browser testing, and keyboard/accessibility checks for major flows. Full WCAG audits or accessibility remediation can be quoted as an additional service.',
  },
  {
    question: 'How do I start a project with Zebotix?',
    answer:
      'Reach out via the contact form or email. We’ll schedule a quick discovery call, provide a scope and quote, request a deposit to start, and collect content requirements to begin development.',
  },
]
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQs', href: '#faq' },
]
export const FEATURES = [
  {
    iconName: 'Search',
    title: 'Smart Insights',
    description:
      'Understand your data instantly with clear analytics and visual reports that guide better business decisions.',
  },
  {
    iconName: 'Settings',
    title: 'Seamless Integration',
    description:
      'Easily connect with your existing apps and systems to keep your workflow smooth and efficient.',
  },
  {
    iconName: 'User',
    title: 'Advanced User Control',
    description:
      'Manage users, roles, and permissions securely with our easy-to-use access management tools.',
  },
  {
    iconName: 'Home',
    title: 'Custom Dashboards',
    description:
      'Design personalized dashboards that show only the data and metrics that matter most to your business.',
  },
  {
    iconName: 'Calendar',
    title: 'Automated Scheduling',
    description:
      'Plan, automate, and track tasks with built-in scheduling tools that save time and boost productivity.',
  },
  {
    iconName: 'Check',
    title: 'Real-Time Progress Tracking',
    description:
      'Monitor team performance and project milestones in real time with interactive reports and alerts.',
  },
]

export const PORTFOLIOS = [
  {
    title: 'Zebotix E-Commerce',
    slug: 'zebotix-ecommerce',
    summary:
      'A fast, responsive e-commerce storefront with CMS-driven product pages and Stripe checkout.',
    description:
      'Zebotix E-Commerce is a high-performance storefront designed for modern retail. Built with Next.js and optimized for SEO, it features a seamless shopping experience with real-time inventory updates and secure payment processing.',
    challenges:
      'The primary challenge was ensuring sub-second page loads while managing a large catalog of high-resolution product images and complex category filtering.',
    results:
      'Achieved a 98/100 Lighthouse performance score and integrated a custom headless CMS that reduced content update time by 70%.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    tags: ['E-commerce', 'Stripe', 'PWA'],
  },
  {
    title: 'TeamTracker App',
    slug: 'teamtracker-app',
    summary:
      'Project & task dashboard with role-based access, progress tracking and real-time updates.',
    description:
      'TeamTracker is an enterprise-grade project management tool that centralizes team communication and task tracking. It provides managers with bird-eye views of project health while keeping individual contributors focused.',
    challenges:
      'Implementing complex role-based access control (RBAC) and real-time synchronization across multiple users without sacrificing performance.',
    results:
      'Successfully deployed to 3 corporate clients, serving over 500 active daily users with zero reported data synchronization issues.',
    image:
      'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=1200&q=80',
    tags: ['Dashboard', 'Auth', 'Realtime'],
  },
  {
    title: 'LocalBiz Landing',
    slug: 'localbiz-landing',
    summary:
      '10-page responsive website for a local business with lead capture and performance optimizations.',
    description:
      'LocalBiz Landing is a highly optimized multi-page website designed to maximize local SEO and lead conversion for service-based businesses.',
    challenges:
      'Balancing rich visual storytelling with the need for extremely fast mobile performance and effective lead capture forms.',
    results:
      'Increased organic lead generation by 150% within the first three months of launch and secured top-3 Google rankings for targeted local keywords.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['Responsive', 'SEO', 'Lead Capture'],
  },
]
export const SOLUTIONS = [
  {
    id: 'ecommerce',
    title: 'E‑commerce / Multi‑vendor',
    subtitle: 'Stores & marketplaces for retail businesses',
    products: [
      {
        name: 'Winter clothing (coats, hoodies, shawls)',
        why: 'High seasonal demand; good margins',
      },
      { name: 'Perfumes & itar', why: 'Popular gifting category; high margins' },
      { name: 'Cosmetics & skincare', why: 'Growing online personal care market' },
      { name: 'Mobile accessories', why: 'Fast repeat purchases; low ticket items' },
      { name: 'Small home appliances', why: 'High-value items for home shoppers' },
    ],
  },
  {
    id: 'fashion',
    title: 'Fashion / Clothing (Seasonal)',
    subtitle: 'Seasonal drops, bundles and collections',
    products: [
      { name: 'Woollen shawls & mufflers', why: 'Local winter staple with strong demand' },
      { name: 'Quilted jackets & thermals', why: 'Functional items that sell in cold months' },
      { name: 'Knitted caps & winter footwear', why: 'Accessory upsells for bundles' },
    ],
  },
  {
    id: 'perfume',
    title: 'Perfumes & Itar (Niche)',
    subtitle: 'High-margin gifting & personal fragrance',
    products: [
      { name: 'Branded perfumes', why: 'Recognized brands convert well online' },
      { name: 'Local itar blends', why: 'Cultural preference; popular as gifts' },
      { name: 'Fragrance gift sets', why: 'Great during wedding/holiday seasons' },
    ],
  },
  {
    id: 'beauty',
    title: 'Cosmetics & Beauty',
    subtitle: 'Skincare, makeup & grooming',
    products: [
      { name: 'Halal skincare & serums', why: 'Local preference + rising organic demand' },
      { name: 'Makeup kits & henna', why: 'High repeat buyers and gifting' },
      { name: 'Men’s grooming kits', why: 'Expanding mens personal care market' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics & Mobile Accessories',
    subtitle: 'Fast-selling accessories and devices',
    products: [
      { name: 'Phone cases & chargers', why: 'Low-cost, high-repeat items' },
      { name: 'Power banks & earphones', why: 'Everyday essentials with good margins' },
      { name: 'Budget smartphones', why: 'Large local demand for affordable devices' },
    ],
  },
  {
    id: 'home-winter',
    title: 'Home & Winter Essentials',
    subtitle: 'Comfort and seasonal appliances',
    products: [
      { name: 'Electric heaters & heated blankets', why: 'Seasonal spikes in colder months' },
      { name: 'Hot water bottles & hand warmers', why: 'Low-cost, widely used items' },
      { name: 'Heavy blankets & thermal bedding', why: 'High local demand in winter regions' },
    ],
  },
  {
    id: 'grocery',
    title: 'Grocery & Specialty Foods',
    subtitle: 'Local flavors & ready-to-eat',
    products: [
      { name: 'Artisanal pickles & chutneys', why: 'Local tastes; giftable' },
      { name: 'Frozen parathas & ready meals', why: 'Convenience sells in urban markets' },
      { name: 'Gourmet spices & confectionery', why: 'Good repeat purchase potential' },
    ],
  },
  {
    id: 'services-marketplace',
    title: 'Salon & Beauty Services Marketplace',
    subtitle: 'Booking app + product upsell',
    products: [
      { name: 'Home bridal makeups & treatments', why: 'High conversion with local logistics' },
      { name: 'Salon product bundles', why: 'Upsell during bookings' },
      { name: 'Subscription care plans', why: 'Recurring revenue model' },
    ],
  },
  {
    id: 'power',
    title: 'Small Appliances & Power Solutions',
    subtitle: 'Backup power & energy products',
    products: [
      { name: 'Inverters & UPS', why: 'Essential during load-shedding' },
      { name: 'Solar power banks & panels', why: 'Growing renewable interest' },
      { name: 'Efficient heaters', why: 'High seasonal demand' },
    ],
  },
  {
    id: 'jewelry',
    title: 'Jewelry & Accessories',
    subtitle: 'Gifting, weddings & fashion',
    products: [
      { name: 'Lightweight gold/plated jewellery', why: 'Wedding season demand' },
      { name: 'Kundan / local-inspired pieces', why: 'Cultural appeal and gifting' },
      { name: 'Watches & cufflinks', why: 'Men’s gifting & accessories' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids & Baby Products',
    subtitle: 'High-repeat essentials & gifts',
    products: [
      { name: 'Winter baby clothes & thermals', why: 'Seasonal and repeat purchases' },
      { name: 'Diapers & baby skincare', why: 'Essential repeat items' },
      { name: 'Educational toys', why: 'Parents invest in learning tools' },
    ],
  },
  {
    id: 'handmade',
    title: 'Handmade & Local Artisans',
    subtitle: 'Crafts, truck-art & cultural goods',
    products: [
      {
        name: 'Ajrak scarves & handcrafted textiles',
        why: 'Strong local identity and tourist appeal',
      },
      { name: 'Truck-art merchandise', why: 'Unique gifts & home decor' },
      { name: 'Handmade perfumes & soaps', why: 'Premium artisan positioning' },
    ],
  },
];

export const PLATFORMS = [
  { id: 'lms', title: 'Learning Management System (LMS)' },
  { id: 'hotel', title: 'Hotel / Hospitality Management' },
  { id: 'portfolio', title: 'Portfolio / Showcase Web App' },
  { id: 'erp', title: 'Finance / Accounting / ERP' },
  { id: 'inventory', title: 'Inventory & Supply Chain' },
  { id: 'ecommerce-platform', title: 'E‑commerce Platforms' },
  { id: 'booking', title: 'Booking & Reservation Systems' },
  { id: 'workflow', title: 'Document Management / Workflow' },
  { id: 'subscription', title: 'Subscription / Membership Management' },
];
