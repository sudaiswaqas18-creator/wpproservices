import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import ContactLink from './ContactLink';

/** Next-step page for each industry card (never render raw MySQL 0/1). */
const INDUSTRY_CTA: Record<string, { to: string; label: string }> = {
  'E-Commerce & Retail': { to: '/case-studies/grocery-loyalty-shipping', label: 'View Case Study' },
  'Education & E-Learning': { to: '/case-studies/cohort-lms-access', label: 'View Case Study' },
  'Healthcare & Wellness': { to: '/services', label: 'Explore Services' },
  'Corporate & B2B': { to: '/case-studies', label: 'View Case Studies' },
  'Hospitality & Travel': { to: '/portfolio', label: 'View Portfolio' },
  'Non-Profit & NGO': { to: '/services', label: 'Explore Services' },
  'Real Estate': { to: '/services', label: 'Explore Services' },
  'Startup & Tech': { to: '/case-studies', label: 'View Case Studies' },
};

function industryCta(title: string, hasCaseStudy: boolean) {
  if (INDUSTRY_CTA[title]) return INDUSTRY_CTA[title];
  if (hasCaseStudy) return { to: '/case-studies', label: 'View Case Study' };
  return { to: '/contact', label: 'Discuss Your Project' };
}

export default function Industries() {
  const { data: industries } = useApiData('industries');

  if (!industries.length) return null;

  return (
    <section className="bg-surface-50 py-20">
      <div className="section-container">
        <h2 className="section-title">Industries We Serve</h2>
        <p className="section-subtitle">
          We apply WordPress themes, WooCommerce stores, LearnDash programs, and care plans to the
          industries we work in most — with scopes shaped to how each sector actually buys and operates.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => {
            const hasCaseStudy = Boolean(ind.has_case_study);
            const cta = industryCta(ind.title, hasCaseStudy);
            return (
              <div key={ind.id} className="card group flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 transition group-hover:bg-brand-500">
                  <Building2 size={20} className="text-brand-600 group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{ind.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{ind.description}</p>
                <Link
                  to={cta.to}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
                >
                  {cta.label} <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-gray-600">
          Same staging and handoff habits — scoped to your catalog, course model, or service funnel.
        </p>
        <div className="mt-6 text-center">
          <ContactLink className="btn-primary">Let&apos;s Build Your Website</ContactLink>
        </div>
      </div>
    </section>
  );
}
