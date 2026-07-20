import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ToolsSection from '../components/ToolsSection';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';

interface Tool { title: string; slug: string; description: string; full_content: string; is_new: boolean; }

export function ToolsListPage() {
  return (<><section className="py-16 text-center"><div className="section-container"><h1 className="text-4xl font-extrabold">Website Tools</h1></div></section><ToolsSection /><CTA /></>);
}

export default function ToolDetailPage() {
  const { slug } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  useEffect(() => { if (slug) fetch(apiUrl(`tools/${slug}`)).then((r) => r.json()).then(setTool).catch(() => {}); }, [slug]);
  if (!tool) return <div className="section-container py-32 text-center">Loading...</div>;
  return (
    <section className="py-16">
      <div className="section-container max-w-3xl">
        <Link to="/resources/tools" className="text-sm text-brand-600 hover:underline">← All Tools</Link>
        <h1 className="mt-4 text-4xl font-extrabold">{tool.title}{tool.is_new && <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">NEW</span>}</h1>
        <p className="mt-4 text-lg text-gray-600">{tool.description}</p>
        <p className="mt-6 leading-relaxed text-gray-700">{tool.full_content}</p>
        <Link to="/contact" className="btn-primary mt-8 inline-flex">Get Started</Link>
      </div>
    </section>
  );
}
