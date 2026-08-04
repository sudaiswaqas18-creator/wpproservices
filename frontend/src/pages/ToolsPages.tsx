import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Bug,
  Check,
  ClipboardList,
  MessageCircle,
  Palette,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
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
  icon?: string;
}

const LOCAL_TOOLS: Tool[] = [
  {
    title: 'Core Web Vitals Review Notes',
    slug: 'speed-estimator',
    description: 'Spot where WordPress or WooCommerce templates lose time — LCP, CLS, and heavy queries.',
    full_content: 'Review hero media, product archive queries, and third-party scripts before buying another speed plugin.',
    is_new: true,
    icon: 'zap',
  },
  {
    title: 'WordPress Hardening Checklist',
    slug: 'security-checklist',
    description: 'Login protection, permissions, backups, and misconfigurations to clear before launch.',
    full_content: 'Treat hardening as an operating cadence — users, backups, staging, and abandoned plugins.',
    is_new: false,
    icon: 'shield',
  },
  {
    title: 'Plugin Conflict Checklist',
    slug: 'plugin-troubleshooter',
    description: 'Isolate which plugin or theme update broke checkout or admin screens.',
    full_content: 'Reproduce on staging, binary-search plugins, then document the root cause for your team.',
    is_new: false,
    icon: 'bug',
  },
  {
    title: 'Bug Fixing Bot',
    slug: 'bug-fixing-bot',
    description: 'Isolate common WordPress breakage — white screens, plugin clashes, and checkout errors.',
    full_content: 'Reproduce on staging, isolate plugins, document the root cause.',
    is_new: true,
    icon: 'bug',
  },
];

const iconMap: Record<string, typeof Bug> = {
  bug: Bug,
  palette: Palette,
  'message-circle': MessageCircle,
  zap: Zap,
  'trending-up': TrendingUp,
  shield: Shield,
};

function toolIcon(slug: string, icon?: string) {
  if (icon && iconMap[icon]) return iconMap[icon];
  if (slug.includes('security')) return Shield;
  if (slug.includes('speed') || slug.includes('estimator')) return Zap;
  if (slug.includes('design')) return Palette;
  if (slug.includes('consult')) return MessageCircle;
  if (slug.includes('conversion')) return TrendingUp;
  return ClipboardList;
}

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
            Operator review notes for performance, hardening, and conflicts — structured pages you can use before a
            full WPServices engagement.
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

  const Icon = toolIcon(tool.slug, tool.icon);
  const checklist = enrich?.checklist ?? [];
  const sections = enrich?.sections ?? [];

  return (
    <>
      <SEO
        title={buildTitle(tool.title)}
        description={(enrich?.seoBlurb || tool.description).slice(0, 160)}
        path={`/resources/tools/${tool.slug}`}
      />

      {/* Service-style hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="section-container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Sparkles size={12} /> Operator checklist
              {tool.is_new && (
                <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>
              )}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {tool.title}
            </h1>
            <p className="mt-3 text-lg text-ink-muted">{tool.description}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {enrich?.intro || tool.full_content}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get a scoped review <ArrowRight size={16} />
              </Link>
              <Link to="/resources/tools" className="btn-outline">
                All checklists
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-card">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-50" />
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
                <Icon size={28} />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-brand-600">How to use this page</p>
              <ul className="mt-4 space-y-3">
                {(checklist.length ? checklist.slice(0, 3) : [
                  'Read the first-pass notes',
                  'Run the checklist on staging',
                  'Book a scoped review if you are stuck',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {sections.map((s) => (
              <article key={s.heading} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <h2 className="text-xl font-bold text-ink">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            ))}
            {!sections.length && (
              <article className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <h2 className="text-xl font-bold text-ink">First-pass notes</h2>
                <p className="mt-3 leading-relaxed text-ink-muted">{tool.full_content}</p>
              </article>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="bg-brand-500 px-5 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <ClipboardList size={18} /> Operator checklist
                </h2>
              </div>
              <ul className="space-y-3 p-5">
                {(checklist.length ? checklist : ['Use staging before production', 'Document the root cause', 'Share notes with your team']).map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check size={14} className="mt-0.5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <div className="border-t border-border p-5">
                <Link to="/contact" className="btn-primary w-full">
                  Request help applying this
                </Link>
                <p className="mt-3 text-center text-[11px] text-ink-light">
                  Free discovery · Written next steps
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}
