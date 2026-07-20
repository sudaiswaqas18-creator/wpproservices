import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { apiUrl } from '../config/api';

const GROUP_LABELS: Record<string, string> = {
  build: 'BUILD — Creation & Foundation',
  manage: 'MANAGE — Maintenance & Operations',
  enhance: 'ENHANCE — Growth & Optimization',
};

const SECTION_LABELS: Record<string, string> = {
  setup: 'SETUP', customize: 'CUSTOMIZE', migrate: 'MIGRATE',
  maintain: 'MAINTAIN', retainers: 'RETAINERS',
  redesign: 'REDESIGN', speed: 'SPEED', integrate: 'INTEGRATE', automate: 'AUTOMATE', seo: 'SEO',
};

type GroupedServices = Record<string, Record<string, { title: string; slug: string; is_new: boolean }[]>>;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<'services' | 'products' | 'resources' | null>(null);
  const [grouped, setGrouped] = useState<GroupedServices>({});

  useEffect(() => {
    fetch(apiUrl('services/grouped'))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) setGrouped(data);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between lg:h-[72px]">
        <Link to="/"><Logo /></Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-brand-600">About Us</Link>

          <div className="relative" onMouseEnter={() => setMega('services')} onMouseLeave={() => setMega(null)}>
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600">
              Services <ChevronDown size={14} />
            </button>
            {mega === 'services' && (
              <div className="absolute left-1/2 top-full z-50 mt-0 w-[720px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(grouped).map(([group, sections]) => (
                    <div key={group}>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-600">{GROUP_LABELS[group]}</p>
                      {Object.entries(sections).map(([sec, items]) => (
                        <div key={sec} className="mb-4">
                          <p className="mb-1 text-[10px] font-semibold text-gray-400">{SECTION_LABELS[sec]}</p>
                          {Array.isArray(items) && items.map((s) => (
                            <Link key={s.slug} to={`/services/${s.slug}`} className="block py-1 text-sm text-gray-700 hover:text-brand-600">
                              {s.title}{s.is_new && <span className="ml-1 rounded bg-green-100 px-1 text-[9px] font-bold text-green-700">NEW</span>}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <Link to="/services" className="mt-4 block text-center text-sm font-semibold text-brand-600 hover:underline">View all Services →</Link>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setMega('products')} onMouseLeave={() => setMega(null)}>
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600">
              Products <ChevronDown size={14} />
            </button>
            {mega === 'products' && (
              <div className="absolute left-0 top-full z-50 mt-0 w-64 rounded-xl border border-gray-100 bg-white py-3 shadow-card">
                <p className="px-4 pb-2 text-[10px] font-bold uppercase text-gray-400">WooCommerce Plugins</p>
                <Link to="/products/quote-flow-pro" className="block px-4 py-2 text-sm hover:bg-gray-50">QuoteFlow Pro</Link>
                <Link to="/products/smart-pricing" className="block px-4 py-2 text-sm hover:bg-gray-50">SmartPricing</Link>
                <Link to="/products/bundlecraft" className="block px-4 py-2 text-sm hover:bg-gray-50">BundleCraft</Link>
                <Link to="/products/sales-boost-pack" className="block px-4 py-2 text-sm hover:bg-gray-50">SalesBoost Pack</Link>
                <Link to="/products" className="block px-4 py-2 text-sm font-semibold text-brand-600">View All Products →</Link>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setMega('resources')} onMouseLeave={() => setMega(null)}>
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600">
              Resources <ChevronDown size={14} />
            </button>
            {mega === 'resources' && (
              <div className="absolute right-0 top-full z-50 mt-0 w-72 rounded-xl border border-gray-100 bg-white py-3 shadow-card">
                <p className="px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Insights</p>
                <Link to="/blog" className="block px-4 py-2 text-sm hover:bg-gray-50">Blogs</Link>
                <Link to="/case-studies" className="block px-4 py-2 text-sm hover:bg-gray-50">Case Studies</Link>
                <p className="mt-2 px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Guidebooks</p>
                <Link to="/resources/guidebooks" className="block px-4 py-2 text-sm hover:bg-gray-50">All Guidebooks</Link>
                <p className="mt-2 px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Tools</p>
                <Link to="/resources/tools" className="block px-4 py-2 text-sm hover:bg-gray-50">All Tools</Link>
                <Link to="/resources" className="block px-4 py-2 text-sm font-semibold text-brand-600">Resources Hub →</Link>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>

        <button type="button" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <Link to="/about" className="block py-2 text-sm" onClick={() => setOpen(false)}>About Us</Link>
          <Link to="/services" className="block py-2 text-sm" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/products" className="block py-2 text-sm" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/resources" className="block py-2 text-sm" onClick={() => setOpen(false)}>Resources</Link>
          <Link to="/blog" className="block py-2 text-sm" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/case-studies" className="block py-2 text-sm" onClick={() => setOpen(false)}>Case Studies</Link>
          <Link to="/contact" className="btn-primary mt-3 block text-center" onClick={() => setOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}
