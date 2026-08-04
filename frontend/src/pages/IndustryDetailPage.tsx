import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';
import { buildTitle } from '../config/seo';
import { getIndustryBySlug, INDUSTRY_PAGES } from '../data/industryContent';
import { optimizeImageUrl } from '../utils/imageUrl';

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug);
  useBreadcrumbLabel(industry?.title);

  if (!industry) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold text-ink">Industry not found</h1>
        <Link to="/industries" className="btn-primary mt-6 inline-flex">
          All industries
        </Link>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <>
      <SEO
        title={buildTitle(`${industry.title} WordPress`)}
        description={industry.seoDescription}
        keywords={`${industry.title} WordPress, WordPress agency ${industry.title}`}
        path={`/industries/${industry.slug}`}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="section-container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Icon size={14} /> {industry.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {industry.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-ink-muted">{industry.heroLine}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{industry.intro}</p>
            <div className="mt-6 rounded-xl border border-border bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600">How we help in this sector</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{industry.cardBlurb}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Free Consultation <ArrowRight size={16} />
              </Link>
              {industry.relatedCaseStudy ? (
                <Link to={industry.relatedCaseStudy} className="btn-outline">
                  View related work
                </Link>
              ) : (
                <Link to="/services" className="btn-outline">
                  Explore Services
                </Link>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <img
              src={optimizeImageUrl(industry.imagePath, 900)}
              alt={industry.imageHint}
              width={900}
              height={560}
              className="max-h-[360px] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14">
        <div className="section-container grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-50 p-6">
            <h2 className="text-lg font-bold text-ink">Common challenges</h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface-50 p-6">
            <h2 className="text-lg font-bold text-ink">What engagements typically include</h2>
            <ul className="mt-4 space-y-3">
              {industry.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-ink-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container max-w-3xl space-y-10">
          {industry.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold text-ink">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-50 py-16">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-bold text-ink">Questions about {industry.title}</h2>
          <div className="mt-8 space-y-4">
            {industry.faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Discuss your stack
            </Link>
            <Link to="/industries" className="btn-outline">
              All industries
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-ink-light">
            More industries
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {INDUSTRY_PAGES.filter((i) => i.slug !== industry.slug).map((i) => (
              <Link
                key={i.slug}
                to={`/industries/${i.slug}`}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-brand-300 hover:text-brand-700"
              >
                {i.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
