import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'wpservices_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const save = (value: 'all' | 'essential') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(124,58,237,0.12)] backdrop-blur-md sm:p-5"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="section-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Cookie size={20} />
              </div>
              <p className="text-sm text-gray-600">
                We use cookies to improve your experience and analyze site traffic.{' '}
                <Link to="/cookie-policy" className="font-semibold text-brand-600 hover:underline">
                  Learn More
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <button
                type="button"
                onClick={() => save('essential')}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Reject Non-Essential
              </button>
              <button type="button" onClick={() => save('all')} className="btn-primary px-5 py-2.5 text-sm">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
