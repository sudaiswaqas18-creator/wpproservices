import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const COOKIE_KEY = 'wpservices_cookie_consent';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setCookieOpen(!localStorage.getItem(COOKIE_KEY));
    sync();
    window.addEventListener('storage', sync);
    const id = window.setInterval(sync, 800);
    return () => {
      window.removeEventListener('storage', sync);
      window.clearInterval(id);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.9, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition hover:scale-105 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 sm:right-6 sm:h-12 sm:w-12 ${
            cookieOpen ? 'bottom-36 sm:bottom-28' : 'bottom-6'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
