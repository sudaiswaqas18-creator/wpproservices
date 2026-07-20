import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';

interface Guidebook { id: number; title: string; slug: string; description: string; content: string; image_url: string; }

export function GuidebooksListPage() {
  const [items, setItems] = useState<Guidebook[]>([]);
  useEffect(() => { fetch(apiUrl('guidebooks')).then((r) => r.json()).then((d) => setItems(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  return (
    <>
      <section className="py-16 text-center"><div className="section-container"><h1 className="text-4xl font-extrabold">Guidebooks</h1><p className="mt-4 text-gray-600">Free guides and checklists for WordPress professionals.</p></div></section>
      <section className="pb-20"><div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <Link key={g.id} to={`/resources/guidebooks/${g.slug}`} className="card group overflow-hidden p-0">
            {g.image_url && <img src={g.image_url} alt={g.title} className="h-40 w-full object-cover" />}
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
  if (!book) return <div className="section-container py-32 text-center">Loading...</div>;
  return (
    <section className="py-16"><div className="section-container max-w-3xl">
      <Link to="/resources/guidebooks" className="text-sm text-brand-600 hover:underline">← All Guidebooks</Link>
      <h1 className="mt-4 text-4xl font-extrabold">{book.title}</h1>
      <p className="mt-4 text-lg text-gray-600">{book.description}</p>
      {book.content && <p className="mt-6 leading-relaxed text-gray-700">{book.content}</p>}
      <button type="button" className="btn-primary mt-8 inline-flex gap-2"><Download size={16} /> Download Guide</button>
    </div></section>
  );
}
