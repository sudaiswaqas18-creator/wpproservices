import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

/** Fallback when API is unavailable (e.g. production without backend) */
const FALLBACK_GROUPED: GroupedServices = {
  build: {
    setup: [
      { title: 'Custom Websites', slug: 'wordpress-website-development', is_new: false },
      { title: 'WordPress Setup', slug: 'wordpress-setup', is_new: false },
      { title: 'WooCommerce Setup', slug: 'woocommerce-setup', is_new: false },
      { title: 'LearnDash Setup', slug: 'learndash-setup', is_new: false },
    ],
    customize: [
      { title: 'WordPress Customization', slug: 'wordpress-customization', is_new: false },
      { title: 'WooCommerce Customization', slug: 'woocommerce-customization', is_new: false },
      { title: 'LearnDash Customization', slug: 'learndash-customization', is_new: false },
      { title: 'Plugin Development', slug: 'plugin-development', is_new: false },
    ],
    migrate: [
      { title: 'Migrate to WordPress', slug: 'wordpress-migration', is_new: true },
      { title: 'Migrate to WooCommerce', slug: 'migrate-woocommerce', is_new: false },
      { title: 'Migrate to LearnDash', slug: 'migrate-learndash', is_new: false },
    ],
  },
  manage: {
    maintain: [
      { title: 'WordPress Maintenance', slug: 'wordpress-maintenance', is_new: false },
    ],
    retainers: [
      { title: 'Website Management', slug: 'website-management', is_new: false },
      { title: 'Hire WordPress Developers', slug: 'hire-wordpress-developers', is_new: false },
      { title: 'Hire WooCommerce Developers', slug: 'hire-woocommerce-developers', is_new: false },
      { title: 'Hire LearnDash Developers', slug: 'hire-learndash-developers', is_new: false },
    ],
  },
  enhance: {
    redesign: [
      { title: 'WordPress Re-design', slug: 'wordpress-redesign', is_new: true },
      { title: 'Landing Page Redesign', slug: 'landing-page-redesign', is_new: false },
    ],
    speed: [
      { title: 'WordPress Speed Optimization', slug: 'wordpress-speed-optimization', is_new: false },
      { title: 'WooCommerce Speed Optimization', slug: 'woocommerce-speed-optimization', is_new: false },
    ],
    integrate: [
      { title: 'WordPress API Development', slug: 'api-integrations', is_new: false },
    ],
    automate: [
      { title: 'WordPress AI Automation', slug: 'wordpress-ai-automation', is_new: true },
    ],
    seo: [
      { title: 'WordPress SEO Services', slug: 'wordpress-seo-services', is_new: false },
    ],
  },
};

type DropdownId = 'services' | 'products' | 'resources';

function hasGroupedData(data: GroupedServices) {
  return Object.keys(data).length > 0;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [grouped, setGrouped] = useState<GroupedServices>(FALLBACK_GROUPED);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(apiUrl('services/grouped'))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data) && hasGroupedData(data)) {
          setGrouped(data);
        }
      })
      .catch(() => {});
  }, []);

  const closeAll = useCallback(() => setOpenDropdown(null), []);

  const openOnly = useCallback((id: DropdownId) => setOpenDropdown(id), []);

  const toggleDropdown = useCallback((id: DropdownId) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAll();
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeAll]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [closeAll]);

  const handleMenuKeyDown = (e: React.KeyboardEvent, id: DropdownId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(id);
    }
  };

  const navBtnClass = (active: boolean) =>
    `flex items-center gap-1 text-sm font-medium transition-colors ${
      active ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
    }`;

  const dropdownMotion = {
    initial: { opacity: 0, y: -6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.22, ease: 'easeOut' as const },
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm shadow-brand-500/5"
    >
      <div className="section-container flex h-16 items-center justify-between lg:h-[72px]">
        <Link to="/" onClick={() => { setMobileOpen(false); closeAll(); }}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-brand-600">About Us</Link>

          {/* Services — original mega menu design */}
          <div
            className="relative"
            onMouseEnter={() => { cancelClose(); openOnly('services'); }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              id="services-menu-button"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'services'}
              aria-controls="dropdown-services"
              onClick={() => toggleDropdown('services')}
              onKeyDown={(e) => handleMenuKeyDown(e, 'services')}
              className={navBtnClass(openDropdown === 'services')}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'services' && (
                <motion.div
                  key="services-menu"
                  id="dropdown-services"
                  role="menu"
                  aria-label="Services menu"
                  {...dropdownMotion}
                  className="absolute top-full z-50 pt-2"
                  style={{ left: 'calc(50% - 360px)' }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="w-[720px] rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(grouped).map(([group, sections]) => (
                        <div key={group}>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-600">
                            {GROUP_LABELS[group]}
                          </p>
                          {Object.entries(sections).map(([sec, items]) => (
                            <div key={sec} className="mb-4">
                              <p className="mb-1 text-[10px] font-semibold text-gray-400">{SECTION_LABELS[sec]}</p>
                              {Array.isArray(items) && items.map((s) => (
                                <Link
                                  key={s.slug}
                                  to={`/services/${s.slug}`}
                                  role="menuitem"
                                  className="block py-1 text-sm text-gray-700 hover:text-brand-600"
                                  onClick={closeAll}
                                >
                                  {s.title}
                                  {s.is_new && (
                                    <span className="ml-1 rounded bg-green-100 px-1 text-[9px] font-bold text-green-700">NEW</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/services"
                      role="menuitem"
                      className="mt-4 block text-center text-sm font-semibold text-brand-600 hover:underline"
                      onClick={closeAll}
                    >
                      View all Services →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products — original design */}
          <div
            className="relative"
            onMouseEnter={() => { cancelClose(); openOnly('products'); }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              id="products-menu-button"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'products'}
              aria-controls="dropdown-products"
              onClick={() => toggleDropdown('products')}
              onKeyDown={(e) => handleMenuKeyDown(e, 'products')}
              className={navBtnClass(openDropdown === 'products')}
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'products' && (
                <motion.div
                  key="products-menu"
                  id="dropdown-products"
                  role="menu"
                  aria-label="Products menu"
                  {...dropdownMotion}
                  className="absolute left-0 top-full z-50 pt-2"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="w-64 rounded-xl border border-gray-100 bg-white py-3 shadow-card">
                    <p className="px-4 pb-2 text-[10px] font-bold uppercase text-gray-400">WooCommerce Plugins</p>
                    <Link to="/products/quote-flow-pro" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>QuoteFlow Pro</Link>
                    <Link to="/products/smart-pricing" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>SmartPricing</Link>
                    <Link to="/products/bundlecraft" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>BundleCraft</Link>
                    <Link to="/products/sales-boost-pack" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>SalesBoost Pack</Link>
                    <Link to="/products/stock-alert-pro" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>StockAlert Pro</Link>
                    <Link to="/products/review-boost" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>ReviewBoost</Link>
                    <Link to="/products" role="menuitem" className="block px-4 py-2 text-sm font-semibold text-brand-600" onClick={closeAll}>View All Products →</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources — original design */}
          <div
            className="relative"
            onMouseEnter={() => { cancelClose(); openOnly('resources'); }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              id="resources-menu-button"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'resources'}
              aria-controls="dropdown-resources"
              onClick={() => toggleDropdown('resources')}
              onKeyDown={(e) => handleMenuKeyDown(e, 'resources')}
              className={navBtnClass(openDropdown === 'resources')}
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'resources' && (
                <motion.div
                  key="resources-menu"
                  id="dropdown-resources"
                  role="menu"
                  aria-label="Resources menu"
                  {...dropdownMotion}
                  className="absolute right-0 top-full z-50 pt-2"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="w-72 rounded-xl border border-gray-100 bg-white py-3 shadow-card">
                    <p className="px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Insights</p>
                    <Link to="/blog" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>Blogs</Link>
                    <Link to="/case-studies" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>Case Studies</Link>
                    <p className="mt-2 px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Guidebooks</p>
                    <Link to="/resources/guidebooks" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>All Guidebooks</Link>
                    <p className="mt-2 px-4 pb-1 text-[10px] font-bold uppercase text-gray-400">Tools</p>
                    <Link to="/resources/tools" role="menuitem" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={closeAll}>All Tools</Link>
                    <Link to="/resources" role="menuitem" className="block px-4 py-2 text-sm font-semibold text-brand-600" onClick={closeAll}>Resources Hub →</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="scroll-area max-h-[calc(100vh-4rem)] overflow-y-auto border-t bg-white px-4 py-4 lg:hidden">
          <Link to="/about" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link to="/services" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link to="/products" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>Products</Link>
          <Link to="/resources" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>Resources</Link>
          <Link to="/blog" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link to="/case-studies" className="block min-h-[44px] py-2 text-sm" onClick={() => setMobileOpen(false)}>Case Studies</Link>
          <Link to="/contact" className="btn-primary mt-3 block min-h-[44px] text-center" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}
