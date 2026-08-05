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
  Wrench,
  Zap,
} from 'lucide-react';
import ToolsSection from '../components/ToolsSection';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';
import { apiUrl } from '../config/api';
import { buildTitle } from '../config/seo';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';
import { getToolEnrichment } from '../data/toolEnrichment';
import { fallbackData } from '../api/fallback';

interface Tool {
  title: string;
  slug: string;
  description: string;
  full_content: string;
  is_new: boolean;
  icon?: string;
}

const iconMap: Record<string, typeof Bug> = {
  bug: Bug,
  palette: Palette,
  'message-circle': MessageCircle,
  zap: Zap,
  'trending-up': TrendingUp,
  shield: Shield,
  wrench: Wrench,
  clipboard: ClipboardList,
  'clipboard-list': ClipboardList,
};

function toolIcon(slug: string, icon?: string) {
  if (icon && iconMap[icon]) return iconMap[icon];
  if (slug.includes('security')) return Shield;
  if (slug.includes('speed') || slug.includes('estimator')) return Zap;
  if (slug.includes('design')) return Palette;
  if (slug.includes('consult')) return MessageCircle;
  if (slug.includes('conversion')) return TrendingUp;
  return Wrench;
}

/** Build balanced column content from admin `full_content` when no SEO enrichment exists */
function synthesizeFromTool(tool: Tool) {
  const raw = (tool.full_content || tool.description || '').trim();
  const paras = raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  let chunks = paras;
  if (chunks.length < 2 && raw.length > 180) {
    const sentences = raw.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [raw];
    const mid = Math.ceil(sentences.length / 2) || 1;
    chunks = [sentences.slice(0, mid).join(' '), sentences.slice(mid).join(' ')].filter(Boolean);
  }
  if (!chunks.length) chunks = [tool.description || 'Operator checklist from WPServices.'];

  const sections = chunks.slice(0, 4).map((body, i) => ({
    heading: i === 0 ? 'First-pass notes' : i === 1 ? 'How to apply this' : `Detail ${i + 1}`,
    body,
  }));

  return {
    intro: tool.description,
    sections,
    checklist: [
      'Review these notes on a staging clone',
      'Capture evidence before changing production',
      'Document the outcome in your care log',
      'Book a scoped review if you are stuck',
    ],
    whoFor: [
      'Operators running this checklist on their stack',
      'Teams preparing a WPServices discovery call',
      'Agencies handing off a written first-pass brief',
    ],
    outcomes: [
      'A written first-pass path for this tool',
      'Clear next step before production changes',
      'Notes you can share with stakeholders',
    ],
    faqs: [
      {
        q: 'Is this an automated bot?',
        a: 'No. Admin-managed checklists are operator guides. You (or WPServices) still run the steps on your stack.',
      },
      {
        q: 'Can WPServices apply this for us?',
        a: 'Yes — bring these notes to a discovery call and we scope a staging-first engagement.',
      },
    ],
  };
}

function fallbackTool(slug: string): Tool | null {
  const row = fallbackData.tools.find((t) => t.slug === slug);
  if (!row) return null;
  return {
    title: row.title,
    slug: row.slug,
    description: row.description,
    full_content: row.description,
    is_new: Boolean(row.is_new),
    icon: row.icon,
  };
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
        if (!cancelled) setTool(fallbackTool(slug));
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
  const synth = enrich ? null : synthesizeFromTool(tool);
  const checklist = enrich?.checklist ?? synth?.checklist ?? [];
  const sections = enrich?.sections ?? synth?.sections ?? [];
  const whoFor = enrich?.whoFor ?? synth?.whoFor ?? [];
  const outcomes = enrich?.outcomes ?? synth?.outcomes ?? [];
  const faqs = enrich?.faqs ?? synth?.faqs ?? [];
  const intro = enrich?.intro || synth?.intro || tool.full_content;

  // Split long-form notes across both columns so heights stay even
  const splitAt = Math.ceil(sections.length / 2) || 0;
  const leftSections = sections.slice(0, splitAt);
  const rightSections = sections.slice(splitAt);

  const SectionCard = ({ heading, body }: { heading: string; body: string }) => (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-bold text-ink sm:text-xl">{heading}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{body}</p>
    </article>
  );

  return (
    <>
      <SEO
        title={buildTitle(tool.title)}
        description={(enrich?.seoBlurb || tool.description).slice(0, 160)}
        path={`/resources/tools/${tool.slug}`}
      />

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
              {intro}
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

      <section className="border-t border-border bg-surface-50/40 py-14 lg:py-16">
        <div className="section-container grid items-start gap-5 lg:grid-cols-2 lg:gap-6 lg:items-stretch">
          {/* LEFT — notes + audience + outcomes + CTA (balances heavy checklist on right) */}
          <div className="flex flex-col gap-5">
            {leftSections.map((s) => (
              <SectionCard key={s.heading} heading={s.heading} body={s.body} />
            ))}
            {!sections.length && (
              <SectionCard heading="First-pass notes" body={tool.full_content} />
            )}

            {whoFor.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-lg font-bold text-ink">Who this checklist is for</h2>
                <ul className="mt-4 space-y-2.5">
                  {whoFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {outcomes.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-lg font-bold text-ink">What you walk away with</h2>
                <ul className="mt-4 space-y-2.5">
                  {outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-ink">Need this applied on your stack?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Bring these notes to a discovery call — we map hosting, staging, and a written next step before any
                production change. Same habits on every WPServices engagement.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Talk to WPServices <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* RIGHT — checklist + remaining notes + FAQs */}
          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="bg-brand-500 px-5 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <ClipboardList size={18} /> Operator checklist
                </h2>
              </div>
              <ul className="space-y-3 p-5">
                {(checklist.length
                  ? checklist
                  : ['Use staging before production', 'Document the root cause', 'Share notes with your team']
                ).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={14} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
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

            {rightSections.map((s) => (
              <SectionCard key={s.heading} heading={s.heading} body={s.body} />
            ))}

            {faqs.length > 0 && (
              <div className="mt-auto rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-lg font-bold text-ink">Questions operators ask</h2>
                <div className="mt-4 space-y-4">
                  {faqs.map((f) => (
                    <div key={f.q} className="border-t border-border pt-4 first:border-0 first:pt-0">
                      <h3 className="font-semibold text-ink">{f.q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
