import { useEffect, useState, FormEvent } from 'react';
import { Mail, CheckCircle, Loader2, UserMinus } from 'lucide-react';
import { api } from '../api/client';
import { validateEmail } from '../utils/validation';

const STORAGE_KEY = 'wps_newsletter_email';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'subscribed' | 'unsubscribed'>('idle');
  const [activeEmail, setActiveEmail] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)?.trim().toLowerCase() || '';
      if (saved) {
        setActiveEmail(saved);
        setEmail(saved);
        setStatus('subscribed');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const remember = (value: string | null) => {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setMessage('');
    setStatus('loading');
    try {
      const res = await api.subscribeNewsletter(email.trim().toLowerCase());
      const next = (res.email || email).trim().toLowerCase();
      setActiveEmail(next);
      setEmail(next);
      remember(next);
      setMessage(res.message || 'Thanks for subscribing!');
      setStatus('subscribed');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Subscription failed';
      setError(msg);
      if (msg.toLowerCase().includes('already subscribed')) {
        const next = email.trim().toLowerCase();
        setActiveEmail(next);
        remember(next);
        setStatus('subscribed');
      } else {
        setStatus('idle');
      }
    }
  };

  const handleUnsubscribe = async () => {
    const target = (activeEmail || email).trim().toLowerCase();
    const err = validateEmail(target);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setMessage('');
    setStatus('loading');
    try {
      const res = await api.unsubscribeNewsletter(target);
      remember(null);
      setActiveEmail('');
      setMessage(res.message || 'You have been unsubscribed.');
      setStatus('unsubscribed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unsubscribe failed');
      setStatus(activeEmail ? 'subscribed' : 'idle');
    }
  };

  return (
    <section className="border-t border-border bg-surface-elevated py-12">
      <div className="section-container">
        <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-card sm:p-8 md:grid-cols-2">
          <div className="text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Mail size={22} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Get WordPress Tips</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Practical insights on WordPress development, WooCommerce, and site performance — no spam.
              One email per address; you can unsubscribe anytime and subscribe again later unless we disable
              the address for abuse.
            </p>
          </div>

          <div>
            {status === 'subscribed' ? (
              <div className="space-y-4">
                <p
                  className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                  role="status"
                >
                  <CheckCircle size={18} />
                  {message || `Subscribed as ${activeEmail}`}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{activeEmail}</span> is on the list. Same email
                  cannot subscribe twice while active.
                </p>
                <button
                  type="button"
                  onClick={handleUnsubscribe}
                  className="btn-outline inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <UserMinus size={16} /> Unsubscribe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row" noValidate>
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                      setMessage('');
                      if (status === 'unsubscribed') setStatus('idle');
                    }}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary shrink-0 px-6 py-3 disabled:opacity-60"
                >
                  {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'unsubscribed' && message && (
              <p className="mt-3 text-sm font-medium text-gray-700" role="status">
                {message} You can subscribe again with this email unless an admin has disabled it.
              </p>
            )}
            {error && (
              <p className="mt-2 text-left text-xs text-red-600" role="alert">
                ⚠ {error}
              </p>
            )}
            <p className="mt-3 text-xs text-gray-600">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
