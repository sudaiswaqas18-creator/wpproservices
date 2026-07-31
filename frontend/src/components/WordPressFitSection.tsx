import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  GraduationCap,
  PenLine,
  ShieldCheck,
  ArrowRight,
  Gauge,
  Puzzle,
} from 'lucide-react';

const fits = [
  {
    icon: ShoppingCart,
    title: 'WooCommerce operators',
    desc: 'Catalogs, checkout friction, shipping rules, and stock alerts that need custom WordPress logic — not another conflicting plugin stack.',
    href: '/services/woocommerce-development',
    linkLabel: 'WooCommerce development',
  },
  {
    icon: GraduationCap,
    title: 'LearnDash & course teams',
    desc: 'Gated courses, drip content, enrollment flows, and instructor-friendly dashboards on a maintainable LMS stack.',
    href: '/services/learndash-development',
    linkLabel: 'LearnDash development',
  },
  {
    icon: PenLine,
    title: 'Marketing & editorial teams',
    desc: 'Block themes and Gutenberg patterns editors can update without breaking layouts, SEO structure, or Core Web Vitals.',
    href: '/services/wordpress-website-development',
    linkLabel: 'Custom WordPress builds',
  },
  {
    icon: Gauge,
    title: 'Sites fighting slow templates',
    desc: 'LCP, CLS, and INP work on real product, lesson, and landing templates — measured after launch, not only in the lab.',
    href: '/services/wordpress-speed-optimization',
    linkLabel: 'Speed optimization',
  },
  {
    icon: Puzzle,
    title: 'Teams needing custom plugins',
    desc: 'Features you cannot buy off the shelf — secure, update-safe WordPress plugins with clear admin UX and docs.',
    href: '/services/plugin-development',
    linkLabel: 'Custom plugin development',
  },
  {
    icon: ShieldCheck,
    title: 'Ops that need steady care',
    desc: 'Updates, backups, staging checks, and small fixes on a retainer so WordPress debt does not pile up after launch.',
    href: '/services/wordpress-maintenance',
    linkLabel: 'Maintenance & support',
  },
];

/**
 * Homepage section replacing generic testimonials.
 * SEO-focused: clear H2/H3, WordPress keywords, internal links to service pages.
 */
export default function WordPressFitSection() {
  return (
    <section className="bg-background py-20" aria-labelledby="wp-fit-heading">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Who we help
          </p>
          <h2 id="wp-fit-heading" className="section-title mt-2">
            When a Specialist WordPress Team Fits Best
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            High-performing WordPress agency sites spell out who they serve. If your work lives in
            themes, WooCommerce, LearnDash, migrations, or care plans — this is the engagement model
            built for you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fits.map(({ icon: Icon, title, desc, href, linkLabel }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition hover:border-brand-300 hover:shadow-cardHover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Icon size={22} className="text-brand-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-light">{desc}</p>
              <Link
                to={href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
              >
                {linkLabel} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-8 text-center sm:px-10">
          <h3 className="text-xl font-bold text-ink">Not sure which WordPress path you need?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-light">
            Start with a short discovery call. We map your theme, plugins, hosting, and goals — then
            share a written scope before any build work begins.
          </p>
          <Link to="/contact" className="btn-primary mt-6 inline-flex">
            Book a WordPress consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
