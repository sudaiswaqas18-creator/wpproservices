import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { NAV_PRODUCTS, NAV_RESOURCES, NAV_SERVICES } from '../data/navData';

type DropdownId = 'services' | 'products' | 'resources';

const DROPDOWN_IDS: DropdownId[] = ['services', 'products', 'resources'];

function DropdownPanel({
  id,
  children,
  className = '',
  align = 'center',
}: {
  id: DropdownId;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}) {
  const alignClass =
    align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'right' ? 'right-0' : 'left-0';

  return (
    <motion.div
      id={`dropdown-${id}`}
      role="menu"
      aria-label={`${id} menu`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`absolute top-full z-50 pt-2 ${alignClass} ${className}`}
    >
      <motion.div
        className="rounded-2xl border border-surface-200 bg-white p-2 shadow-cardHover ring-1 ring-black/[0.03]"
        layout
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<DropdownId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    setOpenDropdown(null);
    setMobileAccordion(null);
  }, []);

  const openOnly = useCallback((id: DropdownId) => {
    setOpenDropdown(id);
  }, []);

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
      if (!headerRef.current?.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [closeAll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMenuKeyDown = (e: React.KeyboardEvent, id: DropdownId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(id);
    }
    if (e.key === 'ArrowDown' && openDropdown !== id) {
      e.preventDefault();
      openOnly(id);
    }
  };

  const navLinkClass = (active: boolean) =>
    `flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors ${
      active ? 'text-brand-600' : 'text-ink-muted hover:text-brand-600'
    }`;

  const menuItemClass =
    'flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none';

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-surface-200/80 bg-white/95 py-0 shadow-sm shadow-brand-500/5 backdrop-blur-lg'
          : 'border-transparent bg-white/90 backdrop-blur-md'
      }`}
    >
      <motion.div
        animate={{ height: scrolled ? 60 : 72 }}
        transition={{ duration: 0.25 }}
        className="section-container flex items-center justify-between"
      >
        <Link to="/" onClick={() => { setMobileOpen(false); closeAll(); }}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <Link to="/about" className={navLinkClass(false)}>About Us</Link>

          {/* Services */}
          <motion.div
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
              className={navLinkClass(openDropdown === 'services')}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'services' && (
                <DropdownPanel id="services" className="w-[min(100vw-2rem,520px)]" align="center">
                  <motion.div
                    className="grid gap-1 p-1 sm:grid-cols-2"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    {NAV_SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.title}
                          to={s.href}
                          role="menuitem"
                          className={menuItemClass}
                          onClick={closeAll}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon size={16} />
                          </span>
                          {s.title}
                        </Link>
                      );
                    })}
                  </motion.div>
                  <div className="border-t border-surface-200 p-2">
                    <Link
                      to="/services"
                      role="menuitem"
                      className="block rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-brand-600 hover:bg-brand-50"
                      onClick={closeAll}
                    >
                      View all Services →
                    </Link>
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Products */}
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
              className={navLinkClass(openDropdown === 'products')}
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'products' && (
                <DropdownPanel id="products" className="w-72" align="left">
                  <div className="p-1" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                    <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-light">WooCommerce Plugins</p>
                    {NAV_PRODUCTS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <Link key={p.slug} to={p.href} role="menuitem" className={menuItemClass} onClick={closeAll}>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon size={16} />
                          </span>
                          {p.title}
                        </Link>
                      );
                    })}
                    <Link
                      to="/products"
                      role="menuitem"
                      className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50"
                      onClick={closeAll}
                    >
                      View All Products →
                    </Link>
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </div>

          {/* Resources */}
          <motion.div
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
              className={navLinkClass(openDropdown === 'resources')}
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'resources' && (
                <DropdownPanel id="resources" className="w-72" align="right">
                  <div className="p-1" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                    {NAV_RESOURCES.map((group) => (
                      <motion.div key={group.label} className="mb-1">
                        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-light">{group.label}</p>
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.href} to={item.href} role="menuitem" className={menuItemClass} onClick={closeAll}>
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                <Icon size={16} />
                              </span>
                              {item.title}
                            </Link>
                          );
                        })}
                      </motion.div>
                    ))}
                    <Link
                      to="/resources"
                      role="menuitem"
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50"
                      onClick={closeAll}
                    >
                      Resources Hub →
                    </Link>
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        <motion.div className="hidden items-center gap-3 lg:flex" animate={{ scale: scrolled ? 0.98 : 1 }}>
          <Link to="/contact" className="btn-primary text-sm shadow-glow hover:shadow-glow">Contact Us</Link>
        </motion.div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ink lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-area overflow-hidden border-t border-surface-200 bg-white lg:hidden"
          >
            <div className="section-container max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
              <Link
                to="/about"
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                About Us
              </Link>

              {DROPDOWN_IDS.map((id) => {
                const label = id.charAt(0).toUpperCase() + id.slice(1);
                const expanded = mobileAccordion === id;
                return (
                  <div key={id} className="border-b border-surface-200/80 py-1">
                    <button
                      type="button"
                      className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-sm font-semibold text-ink"
                      aria-expanded={expanded}
                      onClick={() => setMobileAccordion(expanded ? null : id)}
                    >
                      {label}
                      <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pb-2 pl-2"
                        >
                          {id === 'services' && NAV_SERVICES.map((s) => (
                            <Link
                              key={s.title}
                              to={s.href}
                              className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm text-ink-muted hover:bg-brand-50 hover:text-brand-600"
                              onClick={() => { setMobileOpen(false); closeAll(); }}
                            >
                              <s.icon size={16} className="text-brand-500" />
                              {s.title}
                            </Link>
                          ))}
                          {id === 'products' && NAV_PRODUCTS.map((p) => (
                            <Link
                              key={p.slug}
                              to={p.href}
                              className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm text-ink-muted hover:bg-brand-50 hover:text-brand-600"
                              onClick={() => { setMobileOpen(false); closeAll(); }}
                            >
                              <p.icon size={16} className="text-brand-500" />
                              {p.title}
                            </Link>
                          ))}
                          {id === 'resources' && NAV_RESOURCES.flatMap((g) => g.items).map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm text-ink-muted hover:bg-brand-50 hover:text-brand-600"
                              onClick={() => { setMobileOpen(false); closeAll(); }}
                            >
                              <item.icon size={16} className="text-brand-500" />
                              {item.title}
                            </Link>
                          ))}
                          <Link
                            to={`/${id}`}
                            className="mt-1 flex min-h-[44px] items-center px-3 text-sm font-semibold text-brand-600"
                            onClick={() => { setMobileOpen(false); closeAll(); }}
                          >
                            View all {label} →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/contact"
                className="btn-primary mt-4 block min-h-[44px] text-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
