import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ToolsSection from '../components/ToolsSection';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';
import { apiUrl } from '../config/api';
import { buildTitle } from '../config/seo';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';
import { getToolEnrichment } from '../data/toolEnrichment';

interface Tool {
  title: string;
  slug: string;
  description: string;
  full_content: string;
  is_new: boolean;
}

const LOCAL_TOOLS: Tool[] = [
  {
    title: 'Core Web Vitals Review Notes',
    slug: 'speed-estimator',
    description: 'Spot where WordPress or WooCommerce templates lose time — LCP, CLS, and heavy queries.',
    full_content:
      'Review hero media, product archive queries, and third-party scripts before buying another speed plugin.',
    is_new: true,
  },
  {
    title: 'WordPress Hardening Checklist',
    slug: 'security-checklist',
    description: 'Login protection, permissions, backups, and misconfigurations to clear before launch.',
    full_content: 'Treat hardening as an operating cadence — users, backups, staging, and abandoned plugins.',
    is_new: false,
  },
  {
    title: 'Plugin Conflict Checklist',
    slug: 'plugin-troubleshooter',
    description: 'Isolate which plugin or theme update broke checkout or admin screens.',
    full_content: 'Reproduce on staging, binary-search plugins, then document the root cause for your team.',
    is_new: false,
  },
];

export function ToolsListPage() {
  return (
    <>
      <SEO
        title="WordPress Checklists & Review Notes | WPServices"
        description="Practical WordPress checklists for Core Web Vitals, hardening, and plugin conflicts — written for operators before a full engagement."
        path="/resources/tools"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 text-center">
        <div className="section-container">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">WordPress Checklists</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
            Review notes for Core Web Vitals, hardening, and plugin conflicts before a full engagement — unique
            WPServices operator guidance, not a live SaaS scanner.
          </p>
        </div>
      </section>
      <ToolsSection />
      <CTA />
    </>
  );
}

export default function ToolDetailPage() {
  const { slug } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const enrich = getToolEnrichment(slug);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(apiUrl(`tools/${slug}`))
      .then(async (r) => {
        if (!r.ok) throw new Error('missing');
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setTool(d);
      })
      .catch(() => {
        if (!cancelled) setTool(LOCAL_TOOLS.find((t) => t.slug === slug) || null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useBreadcrumbLabel(tool?.title);

  if (loading) return <div className="section-container py-32 text-center">Loading...</div>;
  if (!tool) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Link to="/resources/tools" className="btn-primary mt-4 inline-flex">
          All tools
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={buildTitle(tool.title)}
        description={(enrich?.seoBlurb || tool.description).slice(0, 160)}
        path={`/resources/tools/${tool.slug}`}
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            {tool.title}
            {tool.is_new && (
              <span className="ml-2 rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">NEW</span>
            )}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{tool.description}</p>
        </div>
      </section>
      <section className="pb-16">
        <div className="section-container max-w-3xl space-y-8">
          <p className="leading-relaxed text-ink-muted">{enrich?.intro || tool.full_content}</p>
          {enrich?.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold text-ink">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
          {enrich?.checklist?.length ? (
            <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink">Operator checklist</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-muted">
                {enrich.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {!enrich && tool.full_content && (
            <p className="leading-relaxed text-ink-muted">{tool.full_content}</p>
          )}
          <Link to="/contact" className="btn-primary inline-flex">
            Get a scoped review
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
