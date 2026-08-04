import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import ContactLink from './ContactLink';
import { INDUSTRY_PAGES, industrySlugFromTitle } from '../data/industryContent';

export default function Industries({ showHeader = true }: { showHeader?: boolean }) {
  const { data: industries } = useApiData('industries');

  const cards =
    industries.length > 0
      ? industries.map((ind) => {
          const slug = industrySlugFromTitle(ind.title);
          const meta = slug ? INDUSTRY_PAGES.find((p) => p.slug === slug) : undefined;
          return {
            id: ind.id,
            title: ind.title,
            description: ind.description,
            blurb: meta?.cardBlurb,
            slug,
            Icon: meta?.icon,
          };
        })
      : INDUSTRY_PAGES.map((p, i) => ({
          id: i + 1,
          title: p.title,
          description: p.intro.slice(0, 140) + '…',
          blurb: p.cardBlurb,
          slug: p.slug,
          Icon: p.icon,
        }));

  return (
    <section className="bg-surface-50 py-20">
      <div className="section-container">
        {showHeader && (
          <>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">
              Open any industry for a dedicated WordPress page — challenges, deliverables, and SEO-minded notes written
              for how that sector actually buys and operates.
            </p>
          </>
        )}

        <div className={`${showHeader ? 'mt-12' : 'mt-0'} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {cards.map((ind) => {
            const Icon = ind.Icon;
            const to = ind.slug ? `/industries/${ind.slug}` : '/contact';
            return (
              <div key={ind.id} className="card group flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 transition group-hover:bg-brand-500">
                  {Icon ? (
                    <Icon size={20} className="text-brand-600 group-hover:text-white" />
                  ) : (
                    <span className="text-brand-600 group-hover:text-white">•</span>
                  )}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{ind.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{ind.description}</p>
                {ind.blurb && (
                  <p className="mt-3 border-t border-border pt-3 text-xs font-medium leading-relaxed text-brand-700">
                    {ind.blurb}
                  </p>
                )}
                <Link
                  to={to}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
                >
                  Open industry page <ArrowRight size={14} />
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
