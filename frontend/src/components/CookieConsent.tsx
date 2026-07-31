import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'wpservices_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const save = (value: 'all' | 'essential') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(26,26,26,0.12)] backdrop-blur-md sm:p-5"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="section-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Cookie size={20} aria-hidden="true" />
          </div>
          <p className="text-sm text-gray-700">
            We use cookies to improve your experience and analyze site traffic.{' '}
            <Link to="/cookie-policy" className="font-semibold text-brand-600 hover:underline">
              Cookie Policy
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
    </div>
  );
}
