import {
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Hotel,
  HeartHandshake,
  Home,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export interface IndustryPageContent {
  slug: string;
  title: string;
  eyebrow: string;
  heroLine: string;
  intro: string;
  imageHint: string;
  imagePath: string;
  challenges: string[];
  deliverables: string[];
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedCaseStudy?: string;
  seoDescription: string;
  cardBlurb: string;
  icon: LucideIcon;
}

export const INDUSTRY_PAGES: IndustryPageContent[] = [
  {
    slug: 'ecommerce-retail',
    title: 'E-Commerce & Retail',
    eyebrow: 'WooCommerce retail',
    heroLine: 'Stores where catalog, checkout, and shipping rules stay honest under real traffic',
    intro:
      'Retail WordPress work at WPServices centers on WooCommerce paths shoppers and ops can trust — product templates, shipping thresholds, and staging QA before campaign weeks. We do not sell fake conversion percentages; we ship maintainable storefronts.',
    imageHint: 'Retail floor and product shelves',
    imagePath: '/section-images/case-grocery.jpg',
    challenges: [
      'Overlapping plugins fighting over cart and shipping',
      'Editors who cannot update product layouts safely',
      'Cutover risk when catalogs and gateways move',
    ],
    deliverables: [
      'Scoped WooCommerce theme or template work',
      'Checkout and shipping rules documented',
      'Staging rehearsal before go-live',
      'Editor handoff for catalog changes',
    ],
    sections: [
      {
        heading: 'How we approach retail WordPress',
        body: 'We map how you sell — online, in-store pickup, wholesale — then shape templates and cart logic to match. Merchandisers get patterns they can reuse; developers keep update-safe code ownership with you.',
      },
      {
        heading: 'What ranking content looks like here',
        body: 'Industry pages that rank explain operational problems (shipping rules, inventory honesty, mobile checkout) and how WordPress delivery solves them. That is the content we publish — not scraped “top 10 store tips.”',
      },
    ],
    faqs: [
      {
        q: 'Do you only work on WooCommerce?',
        a: 'Retail engagements are usually WooCommerce-centered, with custom rules when stock plugins collide.',
      },
      {
        q: 'Can you help before a sale event?',
        a: 'Yes — we prefer staging changes well before peak traffic, not live experiments on checkout day.',
      },
    ],
    relatedCaseStudy: '/case-studies/grocery-loyalty-shipping',
    seoDescription:
      'WordPress and WooCommerce for retail teams — catalogs, checkout clarity, shipping rules, and staging-first launches.',
    cardBlurb: 'Catalog clarity, checkout paths, and shipping rules retailers can run without plugin chaos.',
    icon: ShoppingBag,
  },
  {
    slug: 'education-elearning',
    title: 'Education & E-Learning',
    eyebrow: 'LearnDash & training',
    heroLine: 'Cohorts and courses with access rules staff can explain on a support call',
    intro:
      'Training teams need LearnDash (or similar LMS) setups where drip, roles, and progress match how cohorts actually run. WPServices builds access matrices first — then templates and enrollment paths that instructors can own.',
    imageHint: 'Learners collaborating',
    imagePath: '/section-images/case-lms.jpg',
    challenges: [
      'Access rules only a developer understands',
      'Enrollment exceptions flooding support',
      'Progress and unlock behavior that frustrates learners',
    ],
    deliverables: [
      'Course structure and sample cohort on staging',
      'Role and drip documentation',
      'Enrollment or payment path verification',
      'Instructor admin handoff',
    ],
    sections: [
      {
        heading: 'LMS delivery that survives the first cohort',
        body: 'We rehearse a full learner path on staging before opening enrollment. Certificates, resets, and seat assignment get written policies — not improvisation after launch.',
      },
      {
        heading: 'Content that helps Search',
        body: 'Education industry pages earn trust when they describe cohort ops, drip, and admin tooling honestly. That is the angle we take across this page and related case studies.',
      },
    ],
    faqs: [
      {
        q: 'Do you migrate existing courses?',
        a: 'Yes — we inventory media and progress expectations before import so learners are not reset by accident.',
      },
      {
        q: 'Can memberships and courses share one site?',
        a: 'Often yes. We clarify product ↔ access mapping during discovery.',
      },
    ],
    relatedCaseStudy: '/case-studies/cohort-lms-access',
    seoDescription:
      'LearnDash and WordPress for education teams — cohort access, drip schedules, learner dashboards, and instructor handoffs.',
    cardBlurb: 'Cohort access, drip schedules, and dashboards instructors can run without daily developer tickets.',
    icon: GraduationCap,
  },
  {
    slug: 'healthcare-wellness',
    title: 'Healthcare & Wellness',
    eyebrow: 'Clinics & wellness brands',
    heroLine: 'Calm booking-friendly WordPress with accessible layouts and careful form handling',
    intro:
      'Clinics and wellness brands need WordPress that feels trustworthy on mobile — clear booking or inquiry paths, accessible templates, and update habits that do not break forms after every plugin bump.',
    imageHint: 'Calm clinic interior',
    imagePath: '/section-images/portfolio-corporate.jpg',
    challenges: [
      'Forms that fail silently after updates',
      'Accessibility gaps on key templates',
      'Page builders that make routine content edits risky',
    ],
    deliverables: [
      'Editor-safe page patterns',
      'Form and notification verification',
      'Staging update cadence recommendations',
      'Handoff notes for front-desk or marketing staff',
    ],
    sections: [
      {
        heading: 'Trust is a template problem',
        body: 'We prioritize clarity, contrast, and predictable booking or contact flows. Visual polish comes after the path a patient or client actually takes.',
      },
      {
        heading: 'Compliance-minded delivery',
        body: 'We do not claim legal certifications. We do keep scopes honest about forms, hosting, and what your team must own for privacy policies and consent copy.',
      },
    ],
    faqs: [
      {
        q: 'Do you integrate specific EHR systems?',
        a: 'Integrations are scoped case by case after we see the vendor’s API and auth model.',
      },
      {
        q: 'Can you improve an existing clinic site?',
        a: 'Yes — often starting with forms, mobile templates, and removing fragile builder stacks.',
      },
    ],
    seoDescription:
      'WordPress for healthcare and wellness brands — accessible layouts, booking-friendly pages, and careful form handling.',
    cardBlurb: 'Accessible layouts, clear inquiry paths, and update habits that keep clinic forms working.',
    icon: HeartPulse,
  },
  {
    slug: 'corporate-b2b',
    title: 'Corporate & B2B',
    eyebrow: 'Service & expertise brands',
    heroLine: 'Lead-driven WordPress sites and member-style portals for teams that sell expertise',
    intro:
      'B2B WordPress is about lead quality, clear offers, and portals or gated areas when needed — not decorative homepage animations. WPServices scopes service sites with forms, CRM-friendly handoffs, and editor workflows sales can trust.',
    imageHint: 'B2B meeting and screens',
    imagePath: '/section-images/portfolio-b2b.jpg',
    challenges: [
      'Generic templates that do not explain the offer',
      'Forms that do not reach CRM cleanly',
      'Member areas bolted on without access clarity',
    ],
    deliverables: [
      'Service and landing templates with clear CTAs',
      'Form → inbox or CRM wiring',
      'Optional member/gated patterns',
      'Content handoff for marketing',
    ],
    sections: [
      {
        heading: 'Proof over decoration',
        body: 'We structure pages around problems, proof, and next steps. Case study links and process pages support SEO better than stock “synergy” copy.',
      },
      {
        heading: 'Portals when they earn their keep',
        body: 'Member areas are scoped only when access rules and content ownership are clear — otherwise they become support debt.',
      },
    ],
    faqs: [
      {
        q: 'Can you connect HubSpot or similar?',
        a: 'Yes when API access exists. Field mapping and failure logging are part of the integration scope.',
      },
      {
        q: 'Do you write the website copy?',
        a: 'We can guide structure and placeholders; final brand voice usually stays with your team or a writer you appoint.',
      },
    ],
    relatedCaseStudy: '/case-studies',
    seoDescription:
      'WordPress for B2B and corporate teams — service sites, lead capture, and member-style portals with clear handoffs.',
    cardBlurb: 'Service funnels, lead capture, and portals shaped for expertise-led businesses.',
    icon: Briefcase,
  },
  {
    slug: 'hospitality-travel',
    title: 'Hospitality & Travel',
    eyebrow: 'Destination & stay brands',
    heroLine: 'Story-led WordPress pages with booking CTAs that stay fast on mobile',
    intro:
      'Hospitality sites fail when heavy builders crush Core Web Vitals on destination pages. We build lightweight storytelling templates with clear booking or inquiry actions — and media habits that do not kill LCP.',
    imageHint: 'Travel destination mood',
    imagePath: '/section-images/portfolio-coffee.jpg',
    challenges: [
      'Slow hero media on mobile',
      'Booking widgets that block the main thread',
      'Seasonal campaign pages that break the design system',
    ],
    deliverables: [
      'Mobile-first destination templates',
      'Booking/inquiry CTA patterns',
      'Media guidance for editors',
      'Seasonal page slots without rebuilds',
    ],
    sections: [
      {
        heading: 'Speed is part of hospitality UX',
        body: 'Guests decide on phones. We treat image weight, fonts, and third-party booking scripts as first-class scope items.',
      },
      {
        heading: 'Campaign pages without chaos',
        body: 'Editors get constrained patterns for seasonal offers so campaigns do not invent a new layout language every month.',
      },
    ],
    faqs: [
      {
        q: 'Do you integrate booking engines?',
        a: 'We embed or connect providers you already use, after reviewing script impact on performance.',
      },
      {
        q: 'Can you migrate from a builder theme?',
        a: 'Yes — usually by rebuilding key templates leaner rather than “optimizing” a bloated stack forever.',
      },
    ],
    relatedCaseStudy: '/portfolio',
    seoDescription:
      'WordPress for hospitality and travel — fast destination pages, booking-friendly CTAs, and editor-safe campaign templates.',
    cardBlurb: 'Fast destination storytelling and booking CTAs without bloated page-builder stacks.',
    icon: Hotel,
  },
  {
    slug: 'non-profit-ngo',
    title: 'Non-Profit & NGO',
    eyebrow: 'Mission-led organizations',
    heroLine: 'Donation-ready layouts and campaign pages staff and volunteers can update',
    intro:
      'Non-profits need WordPress that fundraising and program teams can run after launch. We scope donation paths, campaign templates, and handoffs that respect limited budgets — without fake “impact metrics.”',
    imageHint: 'Community and campaign work',
    imagePath: '/section-images/guidebook-pre-launch-checklist.jpg',
    challenges: [
      'Volunteer editors breaking layouts',
      'Donation flows that fail on mobile',
      'Campaign pages rebuilt from scratch each time',
    ],
    deliverables: [
      'Donation/inquiry templates',
      'Campaign page patterns',
      'Editor training notes',
      'Care options that fit nonprofit budgets',
    ],
    sections: [
      {
        heading: 'Editors are part of the mission',
        body: 'If only a developer can publish a campaign, fundraising slows down. Patterns and docs are deliverables, not extras.',
      },
      {
        heading: 'Honest scopes',
        body: 'We write what is in and out of budget clearly — including payment processors and who owns receipt emails.',
      },
    ],
    faqs: [
      {
        q: 'Which donation tools do you support?',
        a: 'We work with processors you choose after reviewing fees, accessibility, and WordPress integration quality.',
      },
      {
        q: 'Can you train volunteers?',
        a: 'Yes — short handoff sessions and written steps for common publishing tasks.',
      },
    ],
    seoDescription:
      'WordPress for non-profits and NGOs — donation-ready layouts, campaign pages, and editor-friendly storytelling.',
    cardBlurb: 'Donation paths and campaign templates volunteers can update after handoff.',
    icon: HeartHandshake,
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    eyebrow: 'Property & agency sites',
    heroLine: 'Listing-friendly structures, inquiry forms, and gallery pages that stay maintainable',
    intro:
      'Real estate WordPress sites drown in gallery weight and fragile listing layouts. WPServices builds inquiry-first templates, sensible media habits, and forms that reach agents — with staging checks before theme updates.',
    imageHint: 'Property and listings',
    imagePath: '/section-images/case-optics.jpg',
    challenges: [
      'Huge image sets crushing mobile performance',
      'Inquiry forms lost in spam or wrong inboxes',
      'Listing templates agents cannot update safely',
    ],
    deliverables: [
      'Listing and detail page patterns',
      'Inquiry form routing',
      'Gallery performance guidance',
      'Agent/editor handoff',
    ],
    sections: [
      {
        heading: 'Listings as a content model',
        body: 'Whether custom post types or a structured page pattern, we keep fields consistent so agents are not inventing layouts per property.',
      },
      {
        heading: 'Media discipline',
        body: 'We set compression and dimension habits early. Beautiful photos should not make the site unusable on cellular networks.',
      },
    ],
    faqs: [
      {
        q: 'Do you sync MLS feeds?',
        a: 'Possible when a reliable feed/API exists; complexity and licensing are scoped in discovery.',
      },
      {
        q: 'Can multiple agents edit listings?',
        a: 'Yes — with roles and capabilities defined so edits stay in the right fields.',
      },
    ],
    seoDescription:
      'WordPress for real estate — listing-friendly structures, inquiry forms, and gallery pages built for agents and mobile visitors.',
    cardBlurb: 'Listing structures, inquiry forms, and galleries that stay fast and editable.',
    icon: Home,
  },
  {
    slug: 'startup-tech',
    title: 'Startup & Tech',
    eyebrow: 'Product marketing sites',
    heroLine: 'Launch sites with room for docs, blogs, and gated content as you grow',
    intro:
      'Startups need WordPress that ships quickly without painting the team into a page-builder corner. We build launch marketing sites with clean information architecture so docs, blogs, and gated assets can land later without a rewrite.',
    imageHint: 'Product and growth team',
    imagePath: '/section-images/case-courses.jpg',
    challenges: [
      'Throwaway launch themes that cannot scale content',
      'No plan for docs or blog SEO',
      'Founders stuck waiting on freelancers for every copy change',
    ],
    deliverables: [
      'Launch IA and core templates',
      'Blog/docs-ready structure',
      'Editor-safe marketing pages',
      'Optional gated content patterns',
    ],
    sections: [
      {
        heading: 'Ship fast, leave a path to grow',
        body: 'We prioritize the pages that unlock waitlists or demos first, while leaving clean templates for content teams to expand SEO over time.',
      },
      {
        heading: 'Avoid rewrite debt',
        body: 'Starter themes and builders that cannot grow become a second project. We choose structures that accept CPTs and new sections later.',
      },
    ],
    faqs: [
      {
        q: 'Can you work from Figma?',
        a: 'Yes. We implement approved designs and flag WordPress constraints early.',
      },
      {
        q: 'Do you support ongoing growth pages?',
        a: 'Retainers or small scopes cover landing experiments after launch.',
      },
    ],
    relatedCaseStudy: '/case-studies',
    seoDescription:
      'WordPress for startups and tech brands — launch marketing sites with room for blogs, docs, and gated content.',
    cardBlurb: 'Launch marketing sites structured for blogs, docs, and gated content later.',
    icon: Rocket,
  },
];

export function getIndustryBySlug(slug: string | undefined | null): IndustryPageContent | undefined {
  if (!slug) return undefined;
  return INDUSTRY_PAGES.find((i) => i.slug === slug);
}

export function industrySlugFromTitle(title: string): string | undefined {
  const map: Record<string, string> = {
    'E-Commerce & Retail': 'ecommerce-retail',
    'Education & E-Learning': 'education-elearning',
    'Healthcare & Wellness': 'healthcare-wellness',
    'Corporate & B2B': 'corporate-b2b',
    'Hospitality & Travel': 'hospitality-travel',
    'Non-Profit & NGO': 'non-profit-ngo',
    'Real Estate': 'real-estate',
    'Startup & Tech': 'startup-tech',
  };
  return map[title];
}
