import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { validateEmail } from '../utils/validation';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
    window.setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="border-t border-border bg-surface-elevated py-12">
      <div className="section-container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Mail size={22} />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Get WordPress Tips</h2>
          <p className="mt-2 text-sm text-gray-600">
            Practical insights on WordPress development, WooCommerce, and site performance — no spam.
          </p>

          {status === 'success' ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700" role="status">
              <CheckCircle size={18} />
              Thanks for subscribing! Check your inbox soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row" noValidate>
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                {error && <p className="mt-1 text-left text-xs text-red-600" role="alert">⚠ {error}</p>}
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn-primary shrink-0 px-6 py-3 disabled:opacity-60">
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-gray-600">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
