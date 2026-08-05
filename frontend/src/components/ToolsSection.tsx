import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bug, Palette, MessageCircle, Zap, TrendingUp, Shield } from 'lucide-react';
import { apiUrl } from '../config/api';
import { fallbackData } from '../api/fallback';

const iconMap: Record<string, typeof Bug> = {
  bug: Bug,
  palette: Palette,
  'message-circle': MessageCircle,
  zap: Zap,
  'trending-up': TrendingUp,
  shield: Shield,
};

interface Tool {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  is_new: boolean;
}

export default function ToolsSection() {
  const [tools, setTools] = useState<Tool[]>(fallbackData.tools as Tool[]);
  useEffect(() => {
    fetch(apiUrl('tools'))
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setTools(d);
      })
      .catch(() => {});
  }, []);

  if (!tools.length) return null;

  return (
    <section className="bg-background py-20">
      <div className="section-container">
        <h2 className="section-title text-center">WordPress Checklists & Review Notes</h2>
        <p className="section-subtitle mx-auto text-center">
          Practical first-pass guides for performance, hardening, and plugin conflicts — not live SaaS scanners.
          Each page is original WPServices operator copy you can run on staging before a full engagement.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const Icon = iconMap[t.icon] || Zap;
            return (
              <Link
                key={t.id}
                to={`/resources/tools/${t.slug}`}
                className="card group flex h-full gap-4 transition hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 transition group-hover:bg-brand-500">
                  <Icon size={22} className="text-brand-600 transition group-hover:text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 transition group-hover:text-brand-600">
                    {t.title}
                    {t.is_new && (
                      <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700">
                        NEW
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{t.description}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-brand-600">Open checklist →</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link to="/resources/tools" className="btn-outline">
            All Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
