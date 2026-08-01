import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';
import { getGuidebookImage } from '../data/siteContent';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';

interface Guidebook { id: number; title: string; slug: string; description: string; content: string; image_url: string; }

const FALLBACK_GUIDEBOOKS: Guidebook[] = [
  { id: 1, title: 'WooCommerce Migration Checklist', slug: 'woocommerce-migration-checklist', description: 'Move products, customers, and orders to WooCommerce without losing URLs or checkout confidence.', content: 'Catalog mapping, gateway tests, redirects, and staging QA for store moves.', image_url: '/section-images/guidebook-woocommerce-migration.jpg' },
  { id: 2, title: 'LearnDash LMS DIY Setup', slug: 'learndash-diy-setup', description: 'Stand up LearnDash courses, drip rules, and learner access with a launch-ready checklist.', content: 'Course structure, payments, certificates, and instructor roles.', image_url: '/section-images/guidebook-learndash-setup.jpg' },
  { id: 3, title: '44 LearnDash Tips & Tricks', slug: 'learndash-tips-tricks', description: 'Operator-level LearnDash habits for drip content, progress clarity, and fewer support tickets.', content: 'Practical tips from LMS delivery work.', image_url: '/section-images/guidebook-learndash-tips.jpg' },
  { id: 4, title: 'Top WooCommerce Plugin Guide', slug: 'woocommerce-plugin-guide', description: 'Choose WooCommerce plugins by job-to-be-done — pricing, inventory, checkout, and care.', content: 'When custom work beats another plugin.', image_url: '/section-images/guidebook-woocommerce-plugins.jpg' },
  { id: 5, title: 'WordPress Plugin Developer Guide', slug: 'plugin-developer-guide', description: 'Build maintainable WordPress plugins with hooks, capability checks, and a clear release workflow.', content: 'Security basics and deployment steps for agency plugin work.', image_url: '/section-images/guidebook-plugin-developer.jpg' },
];

export function GuidebooksListPage() {
  const [items, setItems] = useState<Guidebook[]>(FALLBACK_GUIDEBOOKS);
  useEffect(() => {
    fetch(apiUrl('guidebooks'))
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setItems(d); })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="py-16 text-center"><div className="section-container"><h1 className="text-4xl font-extrabold">WordPress Guidebooks</h1><p className="mt-4 text-gray-600">Practical checklists for migrations, LMS setup, WooCommerce plugins, and launch hygiene.</p></div></section>
      <section className="pb-20"><div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <Link key={g.id} to={`/resources/guidebooks/${g.slug}`} className="card group overflow-hidden p-0">
            <img src={getGuidebookImage(g.slug, g.image_url)} alt={g.title} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
            <div className="p-5"><h2 className="font-bold group-hover:text-brand-600">{g.title}</h2><p className="mt-2 text-sm text-gray-600 line-clamp-2">{g.description}</p></div>
          </Link>
        ))}
      </div></section>
      <CTA />
    </>
  );
}

export default function GuidebookDetailPage() {
  const { slug } = useParams();
  const [book, setBook] = useState<Guidebook | null>(null);
  useEffect(() => { if (slug) fetch(apiUrl(`guidebooks/${slug}`)).then((r) => r.json()).then(setBook).catch(() => {}); }, [slug]);
  useBreadcrumbLabel(book?.title);
  if (!book) return <div className="section-container py-32 text-center">Loading...</div>;
  return (
    <section className="py-16"><div className="section-container max-w-3xl">
      <Link to="/resources/guidebooks" className="text-sm text-brand-600 hover:underline">← All Guidebooks</Link>
      <h1 className="mt-4 text-4xl font-extrabold">{book.title}</h1>
      <p className="mt-4 text-lg text-gray-600">{book.description}</p>
      {book.content && <p className="mt-6 leading-relaxed text-gray-700">{book.content}</p>}
      <Link
        to={`/contact?product=${encodeURIComponent(book.title)}&type=guidebook`}
        className="btn-primary mt-8 inline-flex gap-2"
      >
        <Download size={16} /> Request this guide
      </Link>
    </div></section>
  );
}
