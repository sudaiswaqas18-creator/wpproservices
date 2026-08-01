import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import ContactLink from './ContactLink';

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
          {industries.map((ind) => (
            <div key={ind.id} className="card group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 transition group-hover:bg-brand-500">
                <Building2 size={20} className="text-brand-600 group-hover:text-white" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">{ind.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{ind.description}</p>
              {ind.has_case_study && (
                <Link to="/case-studies" className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                  View Case Study <ArrowRight size={14} />
                </Link>
              )}
            </div>
          ))}
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
