export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEnrichment {
  categoryLabel: string;
  highlights: { label: string; value: string }[];
  features: string[];
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
  deliverables: string[];
  faqs: ServiceFaq[];
  intro: string;
}

const defaultEnrichment: ServiceEnrichment = {
  categoryLabel: 'WordPress Service',
  highlights: [
    { label: 'Delivery', value: 'Scoped timeline' },
    { label: 'Support', value: 'Post-launch window' },
    { label: 'Team', value: 'WordPress specialists' },
  ],
  features: [
    'Scoped discovery and written plan',
    'Staging environment for review',
    'Quality checks before launch',
    'Handoff documentation',
    'Post-launch support window',
  ],
  benefits: [
    { title: 'WordPress-focused delivery', description: 'Specialists who work in themes, plugins, and WooCommerce daily.' },
    { title: 'Clear communication', description: 'You always know what is in scope and what happens next.' },
    { title: 'Maintainable outcomes', description: 'Code and content structure your team can keep running.' },
  ],
  process: [
    { step: 1, title: 'Discover', description: 'Goals, constraints, and success criteria.' },
    { step: 2, title: 'Plan', description: 'Scope, timeline, and technical approach.' },
    { step: 3, title: 'Build', description: 'Implement on staging with previews.' },
    { step: 4, title: 'Launch', description: 'Deploy, verify, and support.' },
  ],
  deliverables: ['Project summary', 'Staging access', 'Documentation', 'Launch checklist'],
  faqs: [
    { question: 'How do projects start?', answer: 'With a short discovery call and a written scope before build work begins.' },
    { question: 'Do you work on staging?', answer: 'Yes whenever hosting allows — production changes follow a review pass.' },
  ],
  intro: 'WordPress service engagement tailored to your goals, with staging review and a clear handoff.',
};


const enrichments: Record<string, Partial<ServiceEnrichment>> = {
  "wordpress-website-development": {
    "categoryLabel": "Custom Build",
    "highlights": [
      {
        "label": "Timeline",
        "value": "4–8 weeks"
      },
      {
        "label": "Stack",
        "value": "Theme + Gutenberg"
      },
      {
        "label": "Warranty",
        "value": "30 days post-launch"
      }
    ],
    "features": [
      "Custom theme or carefully customized premium theme",
      "Responsive layouts tested across major breakpoints",
      "SEO-friendly markup and basic schema where needed",
      "Contact forms wired to your inbox or CRM",
      "Staging site for review before go-live",
      "Editor training notes and handoff checklist"
    ],
    "benefits": [
      {
        "title": "Built for editors",
        "description": "Editors can update pages without fighting the layout."
      },
      {
        "title": "Clean foundation",
        "description": "Architecture that accepts future plugins and CPTs without chaos."
      },
      {
        "title": "Launch-ready QA",
        "description": "Forms, redirects, and mobile views checked before DNS cutover."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Discovery",
        "description": "Goals, sitemap, and content inventory"
      },
      {
        "step": 2,
        "title": "Design system",
        "description": "Wireframes and visual direction for key templates"
      },
      {
        "step": 3,
        "title": "Build on staging",
        "description": "Theme development with iterative previews"
      },
      {
        "step": 4,
        "title": "Launch",
        "description": "DNS cutover, monitoring, and first-week fixes"
      }
    ],
    "deliverables": [
      "Theme source files",
      "Staging credentials",
      "Handoff guide",
      "Launch checklist"
    ],
    "faqs": [
      {
        "question": "Do you build with Gutenberg or a page builder?",
        "answer": "We prefer Gutenberg block themes when possible, and use Elementor when your editors already rely on it."
      },
      {
        "question": "Can you work from our Figma files?",
        "answer": "Yes. We implement approved designs and flag anything that conflicts with WordPress constraints."
      },
      {
        "question": "Will we own the code?",
        "answer": "Yes. Theme and custom code are yours after final payment."
      },
      {
        "question": "How many revision rounds are included?",
        "answer": "Scoped packages include structured revision rounds; extras are quoted clearly."
      }
    ],
    "intro": "Custom WordPress websites for brands that need more than a starter theme — structured templates, clear editor workflows, and performance-minded markup from day one."
  },
  "wordpress-setup": {
    "categoryLabel": "Launch Setup",
    "highlights": [
      {
        "label": "Timeline",
        "value": "3–10 days"
      },
      {
        "label": "Environments",
        "value": "Local + staging"
      },
      {
        "label": "Includes",
        "value": "Hardening basics"
      }
    ],
    "features": [
      "Fresh WordPress install on your hosting",
      "Recommended plugins only — no bloat stack",
      "Permalink, timezone, and user role setup",
      "SSL, backups, and basic hardening",
      "SMTP or transactional email configuration",
      "Admin walkthrough for day-to-day tasks"
    ],
    "benefits": [
      {
        "title": "Ship sooner",
        "description": "Skip the trial-and-error of a first-time install."
      },
      {
        "title": "Safer defaults",
        "description": "Login and update habits set before you publish."
      },
      {
        "title": "Clear ownership",
        "description": "You know which plugins stay and why."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Hosting review",
        "description": "Confirm PHP, SSL, and DNS readiness"
      },
      {
        "step": 2,
        "title": "Install & configure",
        "description": "Core settings and essential plugins"
      },
      {
        "step": 3,
        "title": "Baseline security",
        "description": "Roles, updates, and backup schedule"
      },
      {
        "step": 4,
        "title": "Handoff",
        "description": "Credentials map and short training"
      }
    ],
    "deliverables": [
      "Configured WordPress install",
      "Plugin shortlist",
      "Access document",
      "Backup schedule notes"
    ],
    "faqs": [
      {
        "question": "Can you set up WordPress on my existing host?",
        "answer": "Yes, as long as the plan meets current PHP and SSL requirements."
      },
      {
        "question": "Do you migrate content during setup?",
        "answer": "Basic setup focuses on a clean install; content migration is a separate service."
      },
      {
        "question": "Will you manage updates afterward?",
        "answer": "Optional — maintenance retainers cover ongoing updates."
      }
    ],
    "intro": "Professional WordPress installation and configuration so your first publish happens on a stable, hardened baseline — not a rushed default install."
  },
  "woocommerce-setup": {
    "categoryLabel": "Store Setup",
    "highlights": [
      {
        "label": "Go-live",
        "value": "1–3 weeks"
      },
      {
        "label": "Payments",
        "value": "Stripe / PayPal+"
      },
      {
        "label": "Catalog",
        "value": "Import support"
      }
    ],
    "features": [
      "WooCommerce install and store settings",
      "Payment gateways configured and test orders verified",
      "Shipping zones, tax rules, and email templates",
      "Product import guidance or assisted import",
      "Checkout and cart review on mobile",
      "Admin notes for fulfillment basics"
    ],
    "benefits": [
      {
        "title": "Ready to take orders",
        "description": "Test purchases completed before launch."
      },
      {
        "title": "Ops-friendly setup",
        "description": "Taxes and shipping match how you actually fulfill."
      },
      {
        "title": "Fewer surprises",
        "description": "Common checkout blockers caught early."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Store brief",
        "description": "Catalog types, currencies, and gateways"
      },
      {
        "step": 2,
        "title": "Configure WooCommerce",
        "description": "Payments, shipping, taxes, emails"
      },
      {
        "step": 3,
        "title": "Catalog & QA",
        "description": "Sample products and checkout tests"
      },
      {
        "step": 4,
        "title": "Launch support",
        "description": "Go-live checklist and first-week monitoring"
      }
    ],
    "deliverables": [
      "Configured store",
      "Payment test log",
      "Shipping/tax map",
      "Admin quick-start"
    ],
    "faqs": [
      {
        "question": "Can you import my product CSV?",
        "answer": "Yes — we validate mapping and sample rows before a full import."
      },
      {
        "question": "Do you set up subscriptions?",
        "answer": "Basic setup covers standard products; subscriptions are scoped separately."
      },
      {
        "question": "Will my theme work with WooCommerce?",
        "answer": "We check compatibility and patch gaps before launch."
      }
    ],
    "intro": "WooCommerce store setup that covers payments, shipping, taxes, and checkout QA — so opening day is about selling, not debugging settings."
  },
  "learndash-setup": {
    "categoryLabel": "LMS Setup",
    "highlights": [
      {
        "label": "Timeline",
        "value": "1–3 weeks"
      },
      {
        "label": "Focus",
        "value": "Courses + access"
      },
      {
        "label": "Includes",
        "value": "Payment options"
      }
    ],
    "features": [
      "LearnDash install and course structure setup",
      "Lessons, topics, and quizzes wired correctly",
      "User registration and course access rules",
      "Optional WooCommerce course selling",
      "Student-facing navigation polish",
      "Instructor orientation notes"
    ],
    "benefits": [
      {
        "title": "Courses that open cleanly",
        "description": "Learners reach content without broken menus."
      },
      {
        "title": "Access that matches your model",
        "description": "Cohorts, drip, or open enrollment — configured intentionally."
      },
      {
        "title": "Admin clarity",
        "description": "Instructors know where to update content."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Learning model",
        "description": "Map courses, drip, and certificates"
      },
      {
        "step": 2,
        "title": "Build structure",
        "description": "Courses, lessons, quizzes"
      },
      {
        "step": 3,
        "title": "Access & payments",
        "description": "Enrollment rules and gateways"
      },
      {
        "step": 4,
        "title": "QA & handoff",
        "description": "Student walkthrough and admin notes"
      }
    ],
    "deliverables": [
      "Configured LMS",
      "Course skeleton",
      "Access rules doc",
      "Instructor guide"
    ],
    "faqs": [
      {
        "question": "Do you create course content?",
        "answer": "We structure and configure the LMS; writing curriculum is usually client-owned unless scoped."
      },
      {
        "question": "Can students buy courses online?",
        "answer": "Yes via WooCommerce integration when included in scope."
      },
      {
        "question": "Is mobile learning supported?",
        "answer": "We test learner flows on phones and tablets."
      }
    ],
    "intro": "LearnDash configuration for training teams that need courses, quizzes, and access rules working together — without a maze of half-set plugins."
  },
  "wordpress-customization": {
    "categoryLabel": "Theme & Feature Customization",
    "highlights": [
      {
        "label": "Scope",
        "value": "Feature-based"
      },
      {
        "label": "Approach",
        "value": "Child theme / blocks"
      },
      {
        "label": "QA",
        "value": "Staging first"
      }
    ],
    "features": [
      "Child theme or block pattern customization",
      "Custom fields and template parts",
      "Plugin tweaks without unsafe core edits",
      "Editor experience improvements",
      "Regression testing on staging",
      "Update-safe implementation notes"
    ],
    "benefits": [
      {
        "title": "Keep what works",
        "description": "Extend your current site instead of a full rebuild."
      },
      {
        "title": "Safe changes",
        "description": "Custom code isolated from theme updates where possible."
      },
      {
        "title": "Editor-friendly results",
        "description": "New fields and layouts that staff can use."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Audit",
        "description": "Identify what to keep vs rewrite"
      },
      {
        "step": 2,
        "title": "Plan changes",
        "description": "Templates, fields, and plugins"
      },
      {
        "step": 3,
        "title": "Implement on staging",
        "description": "Build and review"
      },
      {
        "step": 4,
        "title": "Deploy",
        "description": "Careful push with rollback notes"
      }
    ],
    "deliverables": [
      "Custom code package",
      "Staging preview",
      "Change log",
      "Update-safe notes"
    ],
    "faqs": [
      {
        "question": "Will customization break on theme updates?",
        "answer": "We use child themes or custom plugins to reduce update risk."
      },
      {
        "question": "Can you customize a page-builder site?",
        "answer": "Yes, with care around template inheritance and global styles."
      },
      {
        "question": "How is pricing set?",
        "answer": "By feature complexity after a short technical review."
      }
    ],
    "intro": "WordPress customization for sites that are close but not quite right — templates, fields, and plugin behavior shaped to your workflows."
  },
  "woocommerce-customization": {
    "categoryLabel": "Store Customization",
    "highlights": [
      {
        "label": "Focus",
        "value": "Checkout & catalog"
      },
      {
        "label": "Testing",
        "value": "Order flows"
      },
      {
        "label": "Docs",
        "value": "Admin notes"
      }
    ],
    "features": [
      "Custom product types or fields",
      "Checkout field and validation changes",
      "Shipping or fee logic",
      "Account area improvements",
      "Order email and status tweaks",
      "Staging order regression tests"
    ],
    "benefits": [
      {
        "title": "Match how you sell",
        "description": "Rules reflect wholesale, B2B, or bundles."
      },
      {
        "title": "Fewer workarounds",
        "description": "Replace fragile plugin stacks with targeted code."
      },
      {
        "title": "Tested purchases",
        "description": "Staging orders cover edge cases."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Map store rules",
        "description": "Pricing, shipping, and roles"
      },
      {
        "step": 2,
        "title": "Design the change",
        "description": "UX and data model"
      },
      {
        "step": 3,
        "title": "Build & test",
        "description": "Orders, refunds, emails"
      },
      {
        "step": 4,
        "title": "Release",
        "description": "Deploy with monitoring"
      }
    ],
    "deliverables": [
      "Custom plugin or theme mods",
      "Test order report",
      "Admin guide"
    ],
    "faqs": [
      {
        "question": "Can you change the checkout layout?",
        "answer": "Yes — within theme/WooCommerce constraints and accessibility basics."
      },
      {
        "question": "Do you support HPOS?",
        "answer": "We build with modern WooCommerce compatibility in mind."
      },
      {
        "question": "Will existing extensions conflict?",
        "answer": "We audit active plugins before changing checkout or cart behavior."
      }
    ],
    "intro": "WooCommerce customization for stores whose catalog, roles, or checkout no longer fit stock settings — precise changes, tested order paths."
  },
  "learndash-customization": {
    "categoryLabel": "LMS Customization",
    "highlights": [
      {
        "label": "Focus",
        "value": "Access & reporting"
      },
      {
        "label": "Stack",
        "value": "LearnDash + custom"
      },
      {
        "label": "Support",
        "value": "Staging QA"
      }
    ],
    "features": [
      "Custom course templates",
      "Advanced access and drip rules",
      "Reporting dashboards for instructors",
      "Integrations with CRM or SSO",
      "Certificate and progress UI tweaks",
      "Regression tests after LearnDash updates"
    ],
    "benefits": [
      {
        "title": "Learner experience first",
        "description": "Navigation and progress stay understandable."
      },
      {
        "title": "Admin efficiency",
        "description": "Staff spend less time hunting settings."
      },
      {
        "title": "Integrations that stick",
        "description": "Enrollment syncs without manual CSV rituals."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Requirements workshop",
        "description": "Map learner journeys"
      },
      {
        "step": 2,
        "title": "Prototype key screens",
        "description": "Templates and reports"
      },
      {
        "step": 3,
        "title": "Build on staging",
        "description": "Access rules and integrations"
      },
      {
        "step": 4,
        "title": "Train & launch",
        "description": "Instructor walkthrough"
      }
    ],
    "deliverables": [
      "Custom modules",
      "Staging LMS",
      "Instructor notes"
    ],
    "faqs": [
      {
        "question": "Can you add SSO?",
        "answer": "Often yes — scope depends on your identity provider."
      },
      {
        "question": "Will custom code survive LearnDash updates?",
        "answer": "We isolate customizations and test after major updates."
      },
      {
        "question": "Do you redesign the course player?",
        "answer": "Yes when the theme and LearnDash hooks allow a clean approach."
      }
    ],
    "intro": "LearnDash customization when default course layouts and access rules cannot cover how your academy actually teaches."
  },
  "wordpress-migration": {
    "categoryLabel": "Platform Migration",
    "highlights": [
      {
        "label": "Downtime",
        "value": "Near-zero target"
      },
      {
        "label": "SEO",
        "value": "301 map"
      },
      {
        "label": "QA",
        "value": "Staging cutover"
      }
    ],
    "features": [
      "Content and media migration",
      "URL mapping with 301 redirects",
      "Form and plugin compatibility checks",
      "Staging rehearsal before DNS change",
      "Post-migration Search Console checklist",
      "Rollback plan documentation"
    ],
    "benefits": [
      {
        "title": "Protect rankings",
        "description": "Redirects planned before cutover."
      },
      {
        "title": "Rehearse first",
        "description": "Issues surface on staging, not launch day."
      },
      {
        "title": "Rollback plan",
        "description": "Clear path if something critical fails."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Inventory",
        "description": "Pages, media, forms, integrations"
      },
      {
        "step": 2,
        "title": "Migrate to staging",
        "description": "Import and rebuild templates"
      },
      {
        "step": 3,
        "title": "Redirects & QA",
        "description": "Crawl and form tests"
      },
      {
        "step": 4,
        "title": "Cutover",
        "description": "DNS switch and monitoring"
      }
    ],
    "deliverables": [
      "Redirect map",
      "Staging site",
      "Cutover runbook",
      "Post-launch checklist"
    ],
    "faqs": [
      {
        "question": "Can you migrate from Webflow or Squarespace?",
        "answer": "Yes — content and structure are rebuilt in WordPress with redirects."
      },
      {
        "question": "Will SEO rankings drop?",
        "answer": "We cannot guarantee rankings, but redirects and crawl checks reduce avoidable loss."
      },
      {
        "question": "How long is downtime?",
        "answer": "Most cutovers are minutes if DNS and hosting are prepared."
      },
      {
        "question": "Do you move blog comments?",
        "answer": "When the source export supports it; we confirm during inventory."
      }
    ],
    "intro": "Migrations to WordPress with a redirect plan, staging rehearsal, and post-cutover checks — so SEO and forms survive the move."
  },
  "migrate-woocommerce": {
    "categoryLabel": "Store Migration",
    "highlights": [
      {
        "label": "Focus",
        "value": "Orders & SKUs"
      },
      {
        "label": "Risk",
        "value": "Staging first"
      },
      {
        "label": "SEO",
        "value": "Product URLs"
      }
    ],
    "features": [
      "Product and variation import",
      "Customer and order history where feasible",
      "Payment and shipping reconfiguration",
      "Redirects for product and category URLs",
      "Checkout QA after move",
      "Staff training on the new admin"
    ],
    "benefits": [
      {
        "title": "Catalog integrity",
        "description": "SKUs and attributes land correctly."
      },
      {
        "title": "Checkout confidence",
        "description": "Test orders on staging before switch."
      },
      {
        "title": "URL continuity",
        "description": "Shop pages keep redirect coverage."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Export audit",
        "description": "Catalog and order scope"
      },
      {
        "step": 2,
        "title": "Staging store",
        "description": "Import and rebuild"
      },
      {
        "step": 3,
        "title": "Gateway & shipping QA",
        "description": "Live-mode readiness"
      },
      {
        "step": 4,
        "title": "Cutover",
        "description": "Go-live and monitor"
      }
    ],
    "deliverables": [
      "Imported catalog",
      "Redirect list",
      "Test order log"
    ],
    "faqs": [
      {
        "question": "Can historical orders move?",
        "answer": "Often yes depending on the source platform; we confirm during discovery."
      },
      {
        "question": "What about subscriptions?",
        "answer": "Subscription data needs extra mapping — scoped separately when present."
      },
      {
        "question": "Will payment tokens transfer?",
        "answer": "Usually not; customers may re-save cards depending on the gateway."
      }
    ],
    "intro": "Move an existing store to WooCommerce with catalog, customers, and checkout paths verified on staging before customers notice."
  },
  "migrate-learndash": {
    "categoryLabel": "LMS Migration",
    "highlights": [
      {
        "label": "Focus",
        "value": "Courses & users"
      },
      {
        "label": "Access",
        "value": "Preserved rules"
      },
      {
        "label": "QA",
        "value": "Learner login"
      }
    ],
    "features": [
      "Course content migration",
      "User accounts and enrollments",
      "Progress and quiz data where supported",
      "Access rules rebuilt in LearnDash",
      "Learner smoke tests",
      "Instructor orientation after cutover"
    ],
    "benefits": [
      {
        "title": "Students keep access",
        "description": "Enrollments remapped carefully."
      },
      {
        "title": "Content continuity",
        "description": "Lessons and media arrive intact."
      },
      {
        "title": "Fewer support tickets",
        "description": "Login and course entry tested."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Source audit",
        "description": "Courses, users, progress"
      },
      {
        "step": 2,
        "title": "Rebuild in LearnDash",
        "description": "Structure and media"
      },
      {
        "step": 3,
        "title": "Access mapping",
        "description": "Enrollments and groups"
      },
      {
        "step": 4,
        "title": "Launch",
        "description": "Learner QA and support window"
      }
    ],
    "deliverables": [
      "Migrated courses",
      "User map",
      "Learner test notes"
    ],
    "faqs": [
      {
        "question": "Will quiz scores transfer?",
        "answer": "Depends on the source LMS; we set expectations after audit."
      },
      {
        "question": "Can we migrate mid-cohort?",
        "answer": "Possible with a freeze window — planned during discovery."
      },
      {
        "question": "Do videos need re-hosting?",
        "answer": "Often yes; we integrate your preferred video host."
      }
    ],
    "intro": "Bring courses and learners into LearnDash with enrollment mapping and learner QA — not a blind content dump."
  },
  "wordpress-maintenance": {
    "categoryLabel": "Care Plan",
    "highlights": [
      {
        "label": "Backups",
        "value": "Scheduled"
      },
      {
        "label": "Updates",
        "value": "Staging-tested"
      },
      {
        "label": "Reports",
        "value": "Monthly"
      }
    ],
    "features": [
      "Core, theme, and plugin updates on staging first",
      "Scheduled backups with restore verification",
      "Uptime and security monitoring",
      "Malware scanning and hardening reviews",
      "Priority ticket window for break/fix issues",
      "Monthly health notes"
    ],
    "benefits": [
      {
        "title": "Fewer emergency weekends",
        "description": "Updates happen on a calendar."
      },
      {
        "title": "Safer changes",
        "description": "Staging catches fatal errors early."
      },
      {
        "title": "Visible accountability",
        "description": "Monthly notes show what changed."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Onboarding",
        "description": "Access, inventory, baseline"
      },
      {
        "step": 2,
        "title": "Cadence setup",
        "description": "Backup and update schedule"
      },
      {
        "step": 3,
        "title": "Ongoing care",
        "description": "Updates, scans, small fixes"
      },
      {
        "step": 4,
        "title": "Monthly review",
        "description": "Health summary and recommendations"
      }
    ],
    "deliverables": [
      "Monthly report",
      "Backup confirmation",
      "Change log"
    ],
    "faqs": [
      {
        "question": "Do you work on staging?",
        "answer": "Yes — production updates follow a staging pass when hosting allows."
      },
      {
        "question": "What is response time?",
        "answer": "Priority windows are defined in your care plan agreement."
      },
      {
        "question": "Are content edits included?",
        "answer": "Light edits may be included; larger builds are quoted separately."
      },
      {
        "question": "Do you harden security?",
        "answer": "Yes — baseline hardening and monitoring are part of care plans."
      }
    ],
    "intro": "WordPress maintenance that treats updates, backups, and monitoring as a system — so your site does not quietly rot between launches."
  },
  "website-management": {
    "categoryLabel": "Managed WordPress",
    "highlights": [
      {
        "label": "Team",
        "value": "Named contacts"
      },
      {
        "label": "Scope",
        "value": "Ops + improvements"
      },
      {
        "label": "Cadence",
        "value": "Weekly sync option"
      }
    ],
    "features": [
      "Roadmap of small improvements",
      "Content publishing support within hours budget",
      "Performance and plugin hygiene",
      "Vendor coordination (hosting, DNS, email)",
      "Reporting for stakeholders",
      "Shared backlog visibility"
    ],
    "benefits": [
      {
        "title": "One accountable team",
        "description": "Less juggling freelancers for routine work."
      },
      {
        "title": "Progress you can see",
        "description": "Backlog moves every cycle."
      },
      {
        "title": "Business-aware priorities",
        "description": "We sequence work by impact."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Align goals",
        "description": "KPIs and constraints"
      },
      {
        "step": 2,
        "title": "Backlog & sprint",
        "description": "Prioritized tasks"
      },
      {
        "step": 3,
        "title": "Execute",
        "description": "Build, publish, monitor"
      },
      {
        "step": 4,
        "title": "Report",
        "description": "Outcomes and next options"
      }
    ],
    "deliverables": [
      "Shared backlog",
      "Weekly notes",
      "Access map"
    ],
    "faqs": [
      {
        "question": "Is this the same as maintenance?",
        "answer": "Management includes care plus planned improvements and publishing help."
      },
      {
        "question": "Can you work with our marketing team?",
        "answer": "Yes — we plug into existing workflows and tools."
      },
      {
        "question": "How are hours tracked?",
        "answer": "Against an agreed monthly budget with transparent reporting."
      }
    ],
    "intro": "End-to-end WordPress site management for teams that need a partner handling ops, publishing support, and steady improvements."
  },
  "hire-wordpress-developers": {
    "categoryLabel": "WordPress Retainer",
    "highlights": [
      {
        "label": "Capacity",
        "value": "Hours / month"
      },
      {
        "label": "Skills",
        "value": "Theme + plugin"
      },
      {
        "label": "Overlap",
        "value": "Your timezone window"
      }
    ],
    "features": [
      "Dedicated WordPress developer capacity",
      "Feature work on themes and plugins",
      "Code review habits and staging discipline",
      "Flexible backlog within retainer hours",
      "Knowledge sharing with your internal team",
      "Written notes on completed tickets"
    ],
    "benefits": [
      {
        "title": "Elastic capacity",
        "description": "Scale hours up or down by agreement."
      },
      {
        "title": "WordPress specialists",
        "description": "Not generalists learning on your repo."
      },
      {
        "title": "Continuity",
        "description": "Same people learn your codebase."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Scope retainer",
        "description": "Hours, SLAs, tools"
      },
      {
        "step": 2,
        "title": "Kickoff",
        "description": "Repo, staging, conventions"
      },
      {
        "step": 3,
        "title": "Delivery cycles",
        "description": "Tickets and demos"
      },
      {
        "step": 4,
        "title": "Retro",
        "description": "Improve process each month"
      }
    ],
    "deliverables": [
      "Retainer agreement",
      "Access checklist",
      "Sprint board"
    ],
    "faqs": [
      {
        "question": "Can we pause the retainer?",
        "answer": "Pause terms are written into the agreement."
      },
      {
        "question": "Do you work in our Git repo?",
        "answer": "Yes — we follow your branching rules."
      },
      {
        "question": "Is a project manager included?",
        "answer": "Coordination is included; dedicated PM hours can be added."
      }
    ],
    "intro": "Hire WordPress developers on a retainer when you need ongoing theme and plugin capacity without a full-time hire."
  },
  "hire-woocommerce-developers": {
    "categoryLabel": "WooCommerce Retainer",
    "highlights": [
      {
        "label": "Focus",
        "value": "Store growth"
      },
      {
        "label": "QA",
        "value": "Order flows"
      },
      {
        "label": "Cadence",
        "value": "Sprint-based"
      }
    ],
    "features": [
      "WooCommerce feature development",
      "Checkout and catalog improvements",
      "Extension evaluation and cleanup",
      "Performance passes for shop pages",
      "Coordination with your ops team",
      "Staging purchase tests before release"
    ],
    "benefits": [
      {
        "title": "Store-specific expertise",
        "description": "Developers who know WooCommerce edge cases."
      },
      {
        "title": "Safer releases",
        "description": "Order paths tested before deploy."
      },
      {
        "title": "Less plugin sprawl",
        "description": "We prefer targeted fixes over stacking extensions."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Store audit",
        "description": "Plugins, theme, bottlenecks"
      },
      {
        "step": 2,
        "title": "Prioritize backlog",
        "description": "Revenue and ops impact"
      },
      {
        "step": 3,
        "title": "Build & QA",
        "description": "Staging orders"
      },
      {
        "step": 4,
        "title": "Release",
        "description": "Monitor metrics"
      }
    ],
    "deliverables": [
      "Store health notes",
      "Retainer board",
      "Release checklist"
    ],
    "faqs": [
      {
        "question": "Can you work with a headless storefront?",
        "answer": "Possible when APIs and scope are clear."
      },
      {
        "question": "Do you support multi-vendor?",
        "answer": "Case-by-case — complexity varies widely."
      },
      {
        "question": "Will you remove unused plugins?",
        "answer": "Yes when cleanup is approved and tested."
      }
    ],
    "intro": "WooCommerce developers on retainer for catalog rules, checkout work, and ongoing store improvements."
  },
  "hire-learndash-developers": {
    "categoryLabel": "LearnDash Retainer",
    "highlights": [
      {
        "label": "Focus",
        "value": "LMS features"
      },
      {
        "label": "Learners",
        "value": "QA accounts"
      },
      {
        "label": "Docs",
        "value": "Instructor-facing"
      }
    ],
    "features": [
      "LearnDash feature development",
      "Access and reporting customizations",
      "Integration work (CRM, SSO, payments)",
      "Instructor UX improvements",
      "Regression testing after updates",
      "Shared ticket board"
    ],
    "benefits": [
      {
        "title": "LMS fluency",
        "description": "Faster delivery than teaching a generalist LearnDash."
      },
      {
        "title": "Learner-safe releases",
        "description": "Enrollment paths verified."
      },
      {
        "title": "Instructor empathy",
        "description": "Admin UI stays usable."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Academy briefing",
        "description": "Courses and personas"
      },
      {
        "step": 2,
        "title": "Backlog",
        "description": "Prioritize LMS tickets"
      },
      {
        "step": 3,
        "title": "Build on staging",
        "description": "Features and QA"
      },
      {
        "step": 4,
        "title": "Release & train",
        "description": "Instructor updates"
      }
    ],
    "deliverables": [
      "LMS backlog",
      "Staging academy",
      "Instructor notes"
    ],
    "faqs": [
      {
        "question": "Can you customize certificates?",
        "answer": "Yes — design and data fields are common requests."
      },
      {
        "question": "Do you support group leaders?",
        "answer": "We can configure and extend group features as needed."
      },
      {
        "question": "How fast can urgent bugs be fixed?",
        "answer": "Urgent windows are defined in the retainer SLA."
      }
    ],
    "intro": "LearnDash developer retainers for academies iterating on courses, access, and reporting without restarting vendor search each quarter."
  },
  "wordpress-redesign": {
    "categoryLabel": "Full Redesign",
    "highlights": [
      {
        "label": "Timeline",
        "value": "3–6 weeks"
      },
      {
        "label": "Includes",
        "value": "IA + UI"
      },
      {
        "label": "SEO",
        "value": "URL plan"
      }
    ],
    "features": [
      "UX review of current site",
      "Information architecture refresh",
      "New visual system for key templates",
      "Content migration plan",
      "Conversion-minded CTAs and forms",
      "Redirect strategy when URLs change"
    ],
    "benefits": [
      {
        "title": "Modern without chaos",
        "description": "Refresh look while protecting what ranks."
      },
      {
        "title": "Clearer journeys",
        "description": "Nav and page hierarchy make sense."
      },
      {
        "title": "Editor continuity",
        "description": "Templates stay maintainable."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Audit",
        "description": "Analytics, heatmaps, pain points"
      },
      {
        "step": 2,
        "title": "IA & design",
        "description": "Sitemap and key screens"
      },
      {
        "step": 3,
        "title": "Build",
        "description": "Theme templates on staging"
      },
      {
        "step": 4,
        "title": "Launch",
        "description": "Redirects and measurement"
      }
    ],
    "deliverables": [
      "Design files",
      "New theme",
      "Redirect notes",
      "Launch checklist"
    ],
    "faqs": [
      {
        "question": "Do we keep our URLs?",
        "answer": "Whenever possible; otherwise we map redirects."
      },
      {
        "question": "Can redesign be phased?",
        "answer": "Yes — priority templates first is common."
      },
      {
        "question": "Will content be rewritten?",
        "answer": "Structure is included; full copywriting can be added to scope."
      }
    ],
    "intro": "WordPress redesign for sites that look dated or confuse visitors — new structure and visuals without throwing away SEO equity."
  },
  "landing-page-redesign": {
    "categoryLabel": "Landing Focus",
    "highlights": [
      {
        "label": "Timeline",
        "value": "1–3 weeks"
      },
      {
        "label": "Goal",
        "value": "Conversion"
      },
      {
        "label": "Tests",
        "value": "Mobile-first"
      }
    ],
    "features": [
      "Single-page or short-funnel redesign",
      "Message hierarchy and proof placement",
      "Form or checkout CTA optimization",
      "Speed pass for the landing URL",
      "Simple A/B-ready structure",
      "Analytics event wiring"
    ],
    "benefits": [
      {
        "title": "One job per page",
        "description": "No competing nav noise."
      },
      {
        "title": "Faster experiments",
        "description": "Clean structure for future tests."
      },
      {
        "title": "Mobile clarity",
        "description": "Thumb-friendly CTAs."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Offer brief",
        "description": "Audience and conversion goal"
      },
      {
        "step": 2,
        "title": "Wire & design",
        "description": "Above-the-fold focus"
      },
      {
        "step": 3,
        "title": "Build",
        "description": "Landing template"
      },
      {
        "step": 4,
        "title": "Measure",
        "description": "Analytics events"
      }
    ],
    "deliverables": [
      "Landing template",
      "Event map",
      "QA checklist"
    ],
    "faqs": [
      {
        "question": "Can this plug into our CRM?",
        "answer": "Yes — forms can post to your CRM or email tool."
      },
      {
        "question": "Do you write copy?",
        "answer": "We can refine structure; full copywriting may be scoped."
      },
      {
        "question": "Will it work with Elementor?",
        "answer": "Yes if that is your preferred builder."
      }
    ],
    "intro": "Landing page redesign for campaigns that need a sharper offer story, clearer CTA, and a fast-loading WordPress page."
  },
  "wordpress-speed-optimization": {
    "categoryLabel": "Performance",
    "highlights": [
      {
        "label": "Baseline",
        "value": "Before/after"
      },
      {
        "label": "Focus",
        "value": "CWV"
      },
      {
        "label": "Hosting",
        "value": "Advice included"
      }
    ],
    "features": [
      "Full performance audit",
      "Image and media strategy",
      "Caching and CDN guidance",
      "Database and query cleanup",
      "Critical CSS / deferral where safe",
      "Re-test documentation"
    ],
    "benefits": [
      {
        "title": "Measured gains",
        "description": "We show before/after numbers."
      },
      {
        "title": "Sustainable fixes",
        "description": "Not just a one-time cache plugin toggle."
      },
      {
        "title": "SEO-friendly speed",
        "description": "Technical improvements that support Core Web Vitals."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Measure",
        "description": "Lab and field data"
      },
      {
        "step": 2,
        "title": "Prioritize",
        "description": "Highest impact fixes"
      },
      {
        "step": 3,
        "title": "Implement",
        "description": "Staging then production"
      },
      {
        "step": 4,
        "title": "Verify",
        "description": "Re-test and document"
      }
    ],
    "deliverables": [
      "Audit report",
      "Change log",
      "Monitoring tips"
    ],
    "faqs": [
      {
        "question": "Will my site score 100?",
        "answer": "We aim for meaningful CWV improvements; perfect scores are not always realistic."
      },
      {
        "question": "Do you change hosting?",
        "answer": "We advise; migration is separate if needed."
      },
      {
        "question": "How long do results last?",
        "answer": "Until new plugins or media undo them — we document how to keep gains."
      }
    ],
    "intro": "WordPress speed optimization aimed at real Core Web Vitals gains — caching, media, and query work with before/after evidence."
  },
  "woocommerce-speed-optimization": {
    "categoryLabel": "Store Performance",
    "highlights": [
      {
        "label": "Focus",
        "value": "Shop & checkout"
      },
      {
        "label": "Mobile",
        "value": "Priority"
      },
      {
        "label": "Cart",
        "value": "Fragment care"
      }
    ],
    "features": [
      "Shop and product template profiling",
      "Cart/checkout script audits",
      "Object caching recommendations",
      "Image strategy for catalogs",
      "Third-party script discipline",
      "Purchase-path retests"
    ],
    "benefits": [
      {
        "title": "Faster product pages",
        "description": "Shoppers stay engaged."
      },
      {
        "title": "Checkout that feels light",
        "description": "Fewer abandoned waits."
      },
      {
        "title": "Ops visibility",
        "description": "Know which plugins cost time."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Profile store",
        "description": "Identify bottlenecks"
      },
      {
        "step": 2,
        "title": "Fix high-impact issues",
        "description": "Templates and scripts"
      },
      {
        "step": 3,
        "title": "Retest purchase path",
        "description": "Mobile + desktop"
      },
      {
        "step": 4,
        "title": "Document",
        "description": "Keep wins after new plugins"
      }
    ],
    "deliverables": [
      "Store speed report",
      "Optimization change log"
    ],
    "faqs": [
      {
        "question": "Will optimization break discounts plugins?",
        "answer": "We test key flows after each change."
      },
      {
        "question": "Is a CDN required?",
        "answer": "Often helpful; we recommend based on audience geography."
      },
      {
        "question": "Can you optimize variable products?",
        "answer": "Yes — catalog templates are a common bottleneck."
      }
    ],
    "intro": "WooCommerce performance work focused on product, cart, and checkout paths — where slow templates quietly tax revenue."
  },
  "api-integrations": {
    "categoryLabel": "API & Integrations",
    "highlights": [
      {
        "label": "Pattern",
        "value": "REST / webhooks"
      },
      {
        "label": "Auth",
        "value": "Secure"
      },
      {
        "label": "Docs",
        "value": "Endpoint notes"
      }
    ],
    "features": [
      "Custom REST endpoints when needed",
      "CRM, ERP, or ESP connections",
      "Webhook handlers with logging",
      "Error handling and retries",
      "Admin UI for sync status when useful",
      "Sandbox test evidence"
    ],
    "benefits": [
      {
        "title": "Systems stay in sync",
        "description": "Fewer manual CSV uploads."
      },
      {
        "title": "Debuggable flows",
        "description": "Logs when something fails."
      },
      {
        "title": "WordPress-native fit",
        "description": "Integrations respect roles and hooks."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Map data",
        "description": "Objects and frequency"
      },
      {
        "step": 2,
        "title": "Design API contract",
        "description": "Auth and payloads"
      },
      {
        "step": 3,
        "title": "Build & sandbox test",
        "description": "Edge cases"
      },
      {
        "step": 4,
        "title": "Go live",
        "description": "Monitor and alert"
      }
    ],
    "deliverables": [
      "Integration code",
      "Sandbox results",
      "Ops runbook"
    ],
    "faqs": [
      {
        "question": "Can you connect Salesforce / HubSpot?",
        "answer": "Yes for common CRM patterns — exact objects confirmed in discovery."
      },
      {
        "question": "Do you build headless WordPress APIs?",
        "answer": "We can expose curated REST endpoints for front ends."
      },
      {
        "question": "How are secrets stored?",
        "answer": "Environment-based credentials — never hardcoded in the theme."
      }
    ],
    "intro": "WordPress API development and third-party integrations that move leads, orders, and content between systems without brittle zap stacks."
  },
  "wordpress-ai-automation": {
    "categoryLabel": "Automation",
    "highlights": [
      {
        "label": "Focus",
        "value": "Workflows"
      },
      {
        "label": "Human",
        "value": "In the loop"
      },
      {
        "label": "ROI",
        "value": "Hours saved"
      }
    ],
    "features": [
      "Form-to-CRM automations",
      "Content assist workflows with review steps",
      "Support triage helpers",
      "Inventory or lead alerts",
      "Documentation of each automation",
      "Failure notifications for ops"
    ],
    "benefits": [
      {
        "title": "Save staff hours",
        "description": "Repetitive routing happens automatically."
      },
      {
        "title": "Keep humans accountable",
        "description": "AI drafts; your team approves."
      },
      {
        "title": "WordPress-centered",
        "description": "Automations trigger from real site events."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Find bottlenecks",
        "description": "Where time is wasted"
      },
      {
        "step": 2,
        "title": "Design workflow",
        "description": "Triggers and approvals"
      },
      {
        "step": 3,
        "title": "Implement",
        "description": "Tools + WordPress hooks"
      },
      {
        "step": 4,
        "title": "Measure",
        "description": "Hours saved and error rates"
      }
    ],
    "deliverables": [
      "Automation map",
      "Credentials vault notes",
      "Ops guide"
    ],
    "faqs": [
      {
        "question": "Will AI publish without approval?",
        "answer": "We default to human review unless you explicitly opt into auto-publish."
      },
      {
        "question": "What tools do you use?",
        "answer": "Depends on stack — Zapier, Make, custom code, or LLM APIs."
      },
      {
        "question": "Is training data private?",
        "answer": "We follow your data policies and avoid sending sensitive content to public models unless approved."
      }
    ],
    "intro": "WordPress workflow automation that connects forms, CRM, and store events — with human review where quality matters."
  },
  "wordpress-seo-services": {
    "categoryLabel": "Technical SEO",
    "highlights": [
      {
        "label": "Focus",
        "value": "On-site"
      },
      {
        "label": "Deliverable",
        "value": "Action plan"
      },
      {
        "label": "Dev",
        "value": "Implemented fixes"
      }
    ],
    "features": [
      "Technical SEO crawl and prioritization",
      "On-page template improvements",
      "Internal linking guidance",
      "Schema where appropriate",
      "Coordination with content teams",
      "Re-crawl validation notes"
    ],
    "benefits": [
      {
        "title": "Fix what blocks crawling",
        "description": "Indexation issues get attention."
      },
      {
        "title": "Templates that scale",
        "description": "SEO wins apply sitewide."
      },
      {
        "title": "Practical roadmap",
        "description": "Not an 80-page PDF of fluff."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Audit",
        "description": "Crawl + Search Console"
      },
      {
        "step": 2,
        "title": "Prioritize",
        "description": "Impact vs effort"
      },
      {
        "step": 3,
        "title": "Implement",
        "description": "Theme/template fixes"
      },
      {
        "step": 4,
        "title": "Validate",
        "description": "Re-crawl and monitor"
      }
    ],
    "deliverables": [
      "SEO findings",
      "Implemented changes list",
      "Next-content suggestions"
    ],
    "faqs": [
      {
        "question": "Do you write blog posts?",
        "answer": "Technical SEO is our core; content retainers can be added."
      },
      {
        "question": "Can you guarantee rankings?",
        "answer": "No ethical agency can — we improve technical foundations and clarity."
      },
      {
        "question": "Do you work with Yoast or Rank Math?",
        "answer": "Yes — we configure and complement them with template-level fixes."
      }
    ],
    "intro": "WordPress SEO services focused on technical health, template markup, and crawl clarity — so content work is not wasted on broken foundations."
  },
  "plugin-development": {
    "categoryLabel": "Custom Plugins",
    "highlights": [
      {
        "label": "Standards",
        "value": "WP coding"
      },
      {
        "label": "Tests",
        "value": "Staging + cases"
      },
      {
        "label": "Ownership",
        "value": "Your IP"
      }
    ],
    "features": [
      "Custom plugin architecture",
      "Admin settings screens",
      "REST endpoints and hooks",
      "Capability checks and sanitization",
      "Documentation for future developers",
      "Support window after delivery"
    ],
    "benefits": [
      {
        "title": "Exact behavior",
        "description": "No fighting a bloated marketplace plugin."
      },
      {
        "title": "Maintainable code",
        "description": "Documented for handoff."
      },
      {
        "title": "Security-minded",
        "description": "Capabilities and nonces done properly."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Spec",
        "description": "User stories and edge cases"
      },
      {
        "step": 2,
        "title": "Architecture",
        "description": "Data model and hooks"
      },
      {
        "step": 3,
        "title": "Build & test",
        "description": "Unit/manual cases"
      },
      {
        "step": 4,
        "title": "Ship",
        "description": "Install guide and support window"
      }
    ],
    "deliverables": [
      "Plugin zip / repo",
      "Admin docs",
      "Test notes"
    ],
    "faqs": [
      {
        "question": "Will you submit to wordpress.org?",
        "answer": "Optional — we can prepare for review if requested."
      },
      {
        "question": "Can plugins be multisite-aware?",
        "answer": "Yes when network needs are defined upfront."
      },
      {
        "question": "Who owns the IP?",
        "answer": "You do after final payment unless otherwise agreed."
      }
    ],
    "intro": "Custom WordPress plugin development when off-the-shelf extensions cannot match your pricing rules, workflows, or integrations."
  },
  "woocommerce-development": {
    "categoryLabel": "Full Store Build",
    "highlights": [
      {
        "label": "Timeline",
        "value": "6–12 weeks"
      },
      {
        "label": "Includes",
        "value": "Theme + store"
      },
      {
        "label": "QA",
        "value": "Full purchase path"
      }
    ],
    "features": [
      "Custom or tailored WooCommerce theme",
      "Catalog architecture",
      "Checkout and account areas",
      "Payments, shipping, tax setup",
      "Performance and security baseline",
      "Launch support window"
    ],
    "benefits": [
      {
        "title": "Store built as a product",
        "description": "Not a theme demo with products bolted on."
      },
      {
        "title": "Ops-ready",
        "description": "Emails, statuses, and roles make sense."
      },
      {
        "title": "Room to grow",
        "description": "Extensions added deliberately."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Commerce discovery",
        "description": "Catalog and fulfillment"
      },
      {
        "step": 2,
        "title": "UX & build",
        "description": "Templates and store config"
      },
      {
        "step": 3,
        "title": "Integrations",
        "description": "Payments and tools"
      },
      {
        "step": 4,
        "title": "Launch",
        "description": "Go-live checklist and support"
      }
    ],
    "deliverables": [
      "Store theme",
      "Configured WooCommerce",
      "Launch pack"
    ],
    "faqs": [
      {
        "question": "Do you support B2B stores?",
        "answer": "Yes — role pricing and quotes are common scopes."
      },
      {
        "question": "Headless WooCommerce?",
        "answer": "Possible with clear API and front-end ownership."
      },
      {
        "question": "Can you migrate an existing catalog in?",
        "answer": "Yes as part of a combined build + migration scope."
      }
    ],
    "intro": "Full WooCommerce development for merchants who need a storefront and operations layer designed together — not a generic theme with a cart plugin."
  },
  "learndash-development": {
    "categoryLabel": "Full LMS Build",
    "highlights": [
      {
        "label": "Timeline",
        "value": "6–12 weeks"
      },
      {
        "label": "Stack",
        "value": "LearnDash"
      },
      {
        "label": "Includes",
        "value": "Theme + courses shell"
      }
    ],
    "features": [
      "Custom LMS theme experience",
      "Course architecture and navigation",
      "Enrollment and payment options",
      "Instructor and student dashboards",
      "Reporting basics and progress views",
      "Launch QA with learner test accounts"
    ],
    "benefits": [
      {
        "title": "Cohesive learner UI",
        "description": "Courses feel intentional."
      },
      {
        "title": "Admin that scales",
        "description": "Instructors manage without chaos."
      },
      {
        "title": "Integrated selling",
        "description": "Paid courses when needed."
      }
    ],
    "process": [
      {
        "step": 1,
        "title": "Academy discovery",
        "description": "Programs and personas"
      },
      {
        "step": 2,
        "title": "Design LMS UX",
        "description": "Learner and instructor views"
      },
      {
        "step": 3,
        "title": "Build LearnDash",
        "description": "Courses and access"
      },
      {
        "step": 4,
        "title": "Launch",
        "description": "Cohort-ready QA"
      }
    ],
    "deliverables": [
      "LMS theme",
      "Course framework",
      "Instructor handbook"
    ],
    "faqs": [
      {
        "question": "Can we sell memberships plus courses?",
        "answer": "Yes with the right membership stack scoped in."
      },
      {
        "question": "Do you create video hosting?",
        "answer": "We integrate your host (Vimeo, Bunny, etc.)."
      },
      {
        "question": "Is SCORM required?",
        "answer": "Possible with compatible add-ons — confirmed during discovery."
      }
    ],
    "intro": "Complete LearnDash platform development for academies that need branding, course structure, and enrollment working as one system."
  }
};

export function getServiceEnrichment(slug: string, apiFeatures?: string[]): ServiceEnrichment {
  const partial = enrichments[slug] ?? {};
  const genericFeatures = ['Expert delivery', 'Dedicated team', 'Post-launch support'];
  const isGeneric = !apiFeatures?.length || apiFeatures.every((f) => genericFeatures.includes(f));

  return {
    ...defaultEnrichment,
    ...partial,
    features: isGeneric ? (partial.features ?? defaultEnrichment.features) : apiFeatures!,
    benefits: partial.benefits ?? defaultEnrichment.benefits,
    process: partial.process ?? defaultEnrichment.process,
    deliverables: partial.deliverables ?? defaultEnrichment.deliverables,
    highlights: partial.highlights ?? defaultEnrichment.highlights,
    categoryLabel: partial.categoryLabel ?? defaultEnrichment.categoryLabel,
    faqs: partial.faqs ?? defaultEnrichment.faqs,
    intro: partial.intro ?? defaultEnrichment.intro,
  };
}

export function getServiceSeoDescription(slug: string): string {
  const intro = getServiceEnrichment(slug).intro;
  return intro.length <= 155 ? intro : `${intro.slice(0, 152)}...`;
}
