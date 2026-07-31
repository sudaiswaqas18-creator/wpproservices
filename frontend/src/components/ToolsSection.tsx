import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bug, Palette, MessageCircle, Zap, TrendingUp, Shield } from 'lucide-react';
import { apiUrl } from '../config/api';

const iconMap: Record<string, typeof Bug> = { bug: Bug, palette: Palette, 'message-circle': MessageCircle, zap: Zap, 'trending-up': TrendingUp, shield: Shield };

interface Tool { id: number; title: string; slug: string; description: string; icon: string; is_new: boolean; }

const FALLBACK_TOOLS: Tool[] = [
  { id: 1, title: 'Core Web Vitals Scorecard', slug: 'speed-estimator', description: 'Estimate where your WordPress or WooCommerce pages lose time — LCP, CLS, and server response.', icon: 'zap', is_new: true },
  { id: 2, title: 'WordPress Hardening Checklist', slug: 'security-checklist', description: 'Walk through login protection, file permissions, backups, and common misconfigurations before launch.', icon: 'shield', is_new: false },
  { id: 3, title: 'Plugin Conflict Diagnostic', slug: 'plugin-troubleshooter', description: 'A structured isolation path to find which plugin or theme update broke your checkout or admin screens.', icon: 'bug', is_new: false },
];

export default function ToolsSection() {
  const [tools, setTools] = useState<Tool[]>(FALLBACK_TOOLS);
  useEffect(() => {
    fetch(apiUrl('tools'))
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setTools(d); })
      .catch(() => {});
  }, []);

  if (!tools.length) return null;

  return (
    <section className="bg-background py-20">
      <div className="section-container">
        <h2 className="section-title text-center">Practical WordPress Tools</h2>
        <p className="section-subtitle mx-auto text-center">
          Quick checks for performance, security, and plugin conflicts — useful before you book a full engagement.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const Icon = iconMap[t.icon] || Zap;
            return (
              <Link key={t.id} to={`/resources/tools/${t.slug}`} className="card group flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 group-hover:bg-brand-500">
                  <Icon size={22} className="text-brand-600 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-600">
                    {t.title}{t.is_new && <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700">NEW</span>}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{t.description}</p>
                  <span className="mt-2 inline-flex text-sm font-semibold text-brand-600">View Details →</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center"><Link to="/resources/tools" className="btn-outline">All Tools</Link></div>
      </div>
    </section>
  );
}
