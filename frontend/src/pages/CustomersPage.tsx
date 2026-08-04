import { Link } from 'react-router-dom';
import {
  Building2, GraduationCap, HeartPulse, ShoppingBag, Briefcase, Hotel,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

const segments = [
  {
    icon: ShoppingBag,
    title: 'Retail & WooCommerce operators',
    desc: 'Catalog-heavy stores that need checkout clarity, shipping rules, inventory honesty, and themes editors can update without breaking layouts.',
    outcomes: ['Attribute-aware pricing paths', 'Staging-first campaign launches', 'Cart recovery tied to real order events'],
  },
  {
    icon: GraduationCap,
    title: 'Training & LearnDash teams',
    desc: 'Cohort and membership programs that outgrow stock LMS defaults — role-gated access, clearer progress views, and seat assignment that operations can own.',
    outcomes: ['Member access rules that hold', 'Admin tools for cohort ops', 'Wallet or seat checkout patterns'],
  },
  {
    icon: Briefcase,
    title: 'B2B & service companies',
    desc: 'Lead-driven WordPress sites and member-style portals where content models, forms, and handoffs matter more than decorative page builders.',
    outcomes: ['Editor-safe page patterns', 'CRM-friendly form flows', 'Docs your sales team can trust'],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & wellness brands',
    desc: 'Booking-friendly layouts, accessible templates, and calm admin UX for clinics that cannot afford fragile stacks after every plugin update.',
    outcomes: ['Accessible template habits', 'Form & booking hygiene', 'Update cadence with staging'],
  },
  {
    icon: Hotel,
    title: 'Hospitality & destination brands',
    desc: 'Story-led WordPress pages with booking CTAs that stay fast on mobile — without bloated builders that destroy Core Web Vitals.',
    outcomes: ['Mobile-first landing paths', 'Media that does not kill LCP', 'Seasonal campaign slots'],
  },
  {
    icon: Building2,
    title: 'Non-profits & campaigns',
    desc: 'Donation-ready structures and campaign pages staff can update after launch — with clear scopes so budgets stay predictable.',
    outcomes: ['Campaign page templates', 'Donation path clarity', 'Handoff docs for volunteers'],
  },
];

export default function CustomersPage() {
  return (
    <>
      <SEO
        title="Who We Build For | WPServices Customers"
        description="WPServices serves WooCommerce retailers, LearnDash training teams, B2B sites, healthcare, hospitality, and non-profits with maintainable WordPress delivery."
        keywords="WordPress agency customers, WooCommerce agency for retailers, LearnDash developers, WordPress for B2B"
        path="/customers"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-background py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="section-container relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Customers</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Teams That Need WordPress Work That Stays Maintainable
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            WPServices partners with operators who live in wp-admin — not agencies chasing vanity redesigns.
            Below are the customer shapes we scope most often, with the outcomes we protect on every engagement.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {segments.map(({ icon: Icon, title, desc, outcomes }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={22} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{desc}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-ink-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="section-container mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Talk about your stack <ArrowRight size={16} />
          </Link>
          <Link to="/case-studies" className="btn-outline">
            Read case studies
          </Link>
          <Link to="/quotes" className="btn-outline">
            Build-floor principles
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
