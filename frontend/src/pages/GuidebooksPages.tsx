import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';
import { apiUrl } from '../config/api';
import { buildTitle } from '../config/seo';
import { getGuidebookImage } from '../data/siteContent';
import { getGuidebookEnrichment } from '../data/guidebookEnrichment';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';
import { useApiData } from '../hooks/useApiData';
import { fallbackData } from '../api/fallback';

interface Guidebook {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
}

const FALLBACK_GUIDEBOOKS: Guidebook[] = [
  {
    id: 1,
    title: 'WooCommerce Migration Checklist',
    slug: 'woocommerce-migration-checklist',
    description: 'Move products, customers, and orders without losing URLs or checkout confidence.',
    content: 'Catalog mapping, gateway tests, redirects, and staging QA for store moves.',
    image_url: '/section-images/guidebook-woocommerce-migration.jpg',
  },
  {
    id: 2,
    title: 'LearnDash LMS DIY Setup',
    slug: 'learndash-diy-setup',
    description: 'Stand up courses, drip rules, and learner access with a launch-ready checklist.',
    content: 'Course structure, payments, certificates, and instructor roles.',
    image_url: '/section-images/guidebook-learndash-setup.jpg',
  },
  {
    id: 3,
    title: '44 LearnDash Tips & Tricks',
    slug: 'learndash-tips-tricks',
    description: 'Operator habits for drip content, progress clarity, and fewer support tickets.',
    content: 'Practical tips from LMS delivery work.',
    image_url: '/section-images/guidebook-learndash-tips.jpg',
  },
  {
    id: 4,
    title: 'WooCommerce Extension Selection Guide',
    slug: 'woocommerce-plugin-guide',
    description: 'Choose extensions by job-to-be-done — pricing, inventory, checkout, and care.',
    content: 'When custom work beats another overlapping plugin.',
    image_url: '/section-images/guidebook-woocommerce-plugins.jpg',
  },
  {
    id: 5,
    title: 'WordPress Plugin Developer Guide',
    slug: 'plugin-developer-guide',
    description: 'Maintainable plugins with hooks, capability checks, and a clear release workflow.',
    content: 'Security basics and deployment steps for agency plugin work.',
    image_url: '/section-images/guidebook-plugin-developer.jpg',
  },
];

export function GuidebooksListPage() {
  const { data } = useApiData('guidebooks');
  const items = data as Guidebook[];

  return (
    <>
      <SEO
        title="WordPress Guidebooks | WPServices"
        description="Original WPServices checklists for WooCommerce migrations, LearnDash setup, plugin selection, and launch hygiene."
        path="/resources/guidebooks"
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 text-center">
        <div className="section-container">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">WordPress Guidebooks</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
            Practical checklists written from WPServices delivery work — migrations, LMS setup, extension choices, and
            launch hygiene. Not scraped third-party ebooks.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <Link key={g.id} to={`/resources/guidebooks/${g.slug}`} className="card group overflow-hidden p-0">
              <img
                src={getGuidebookImage(g.slug, g.image_url)}
                alt={g.title}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="p-5">
                <h2 className="font-bold group-hover:text-brand-600">{g.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{g.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

export default function GuidebookDetailPage() {
  const { slug } = useParams();
  const [book, setBook] = useState<Guidebook | null>(null);
  const [loading, setLoading] = useState(true);
  const enrich = getGuidebookEnrichment(slug);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(apiUrl(`guidebooks/${slug}`))
      .then(async (r) => {
        if (!r.ok) throw new Error('missing');
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setBook(d);
      })
      .catch(() => {
        if (!cancelled) {
          const match =
            FALLBACK_GUIDEBOOKS.find((g) => g.slug === slug) ||
            (fallbackData.guidebooks as Guidebook[]).find((g) => g.slug === slug) ||
            null;
          setBook(match);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useBreadcrumbLabel(book?.title);

  if (loading) return <div className="section-container py-32 text-center">Loading...</div>;
  if (!book) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold">Guidebook not found</h1>
        <Link to="/resources/guidebooks" className="btn-primary mt-4 inline-flex">
          All guidebooks
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={buildTitle(book.title)}
        description={(enrich?.seoBlurb || book.description).slice(0, 160)}
        path={`/resources/guidebooks/${book.slug}`}
      />
      <section className="bg-gradient-to-b from-surface-50 to-white py-16">
        <div className="section-container max-w-3xl">
          <img
            src={getGuidebookImage(book.slug, book.image_url)}
            alt={book.title}
            className="mb-8 max-h-64 w-full rounded-2xl object-cover shadow-card"
            loading="eager"
          />
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{book.title}</h1>
          <p className="mt-4 text-lg text-ink-muted">{book.description}</p>
        </div>
      </section>
      <section className="pb-16">
        <div className="section-container max-w-3xl space-y-8">
          <p className="leading-relaxed text-ink-muted">{enrich?.intro || book.content}</p>
          {enrich?.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold text-ink">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
              {s.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
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
          {!enrich && book.content ? (
            <p className="leading-relaxed text-ink-muted">{book.content}</p>
          ) : null}
          <Link
            to={`/contact?product=${encodeURIComponent(book.title)}&type=guidebook`}
            className="btn-primary inline-flex gap-2"
          >
            <Download size={16} /> Request this guide
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
