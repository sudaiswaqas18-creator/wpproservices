import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { api } from '../api/client';
import { validateContactForm, fieldClass, FieldErrors, hasErrors } from '../utils/validation';

const budgets = [
  'Select your Budget',
  'Under $1,500',
  '$1,500 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000',
  'Above $10,000',
];

const inputBase =
  'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [searchParams] = useSearchParams();
  const purchaseProduct = searchParams.get('product');
  const purchasePrice = searchParams.get('price');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    project_details: '',
    privacy_accepted: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!purchaseProduct) return;
    const details = purchasePrice
      ? `I would like to purchase "${purchaseProduct}" (${purchasePrice}). Please share license and payment details.`
      : `I would like to purchase "${purchaseProduct}". Please share license and payment details.`;
    setForm((f) => (f.project_details ? f : { ...f, project_details: details }));
  }, [purchaseProduct, purchasePrice]);

  const validate = (data = form) => validateContactForm(data);

  const blur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const update = (field: keyof typeof form, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field] || status === 'error') setErrors(validate(next));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, budget: true, project_details: true, privacy_accepted: true });
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      setStatus('error');
      setMessage('Please fix the errors below before submitting.');
      return;
    }

    setStatus('loading');
    try {
      const res = await api.submitContact({ ...form, budget: form.budget });
      setStatus('success');
      setMessage(res.message);
      setForm({ name: '', phone: '', email: '', budget: '', project_details: '', privacy_accepted: false });
      setErrors({});
      setTouched({});
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const show = (field: string) => touched[field] && errors[field];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-card ${compact ? '' : 'lg:p-8'}`}
      id="contact"
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {purchaseProduct ? 'Complete Your Plugin Purchase' : 'Start with a FREE Consultation'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {purchaseProduct
              ? `You're enquiring about ${purchaseProduct}${purchasePrice ? ` (${purchasePrice})` : ''}. We respond within 24 hours.`
              : 'Tell us about your project — we respond within 24 hours.'}
          </p>
        </div>
      )}

      {purchaseProduct && compact && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
          <ShoppingBag size={16} />
          Purchasing: {purchaseProduct}{purchasePrice ? ` — ${purchasePrice}` : ''}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('name')))}
            placeholder="John Smith"
            autoComplete="name"
          />
          {show('name') && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Phone No.</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => blur('phone')}
            className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('phone')))}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
          {show('phone') && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Work Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => blur('email')}
            className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('email')))}
            placeholder="you@company.com"
            autoComplete="email"
          />
          {show('email') && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Budget *</label>
          <select
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
            onBlur={() => blur('budget')}
            className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('budget')))}
          >
            {budgets.map((b) => (
              <option key={b} value={b === 'Select your Budget' ? '' : b}>
                {b}
              </option>
            ))}
          </select>
          {show('budget') && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Project Details *</label>
        <textarea
          rows={4}
          value={form.project_details}
          onChange={(e) => update('project_details', e.target.value)}
          onBlur={() => blur('project_details')}
          className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('project_details')))}
          placeholder="Describe your project goals, timeline, and any specific requirements..."
        />
        <div className="mt-1 flex justify-between">
          {show('project_details') ? (
            <p className="text-xs text-red-600">{errors.project_details}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-gray-400">{form.project_details.trim().length}/5000</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={form.privacy_accepted}
            onChange={(e) => update('privacy_accepted', e.target.checked)}
            onBlur={() => blur('privacy_accepted')}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
          />
          <span className="text-sm text-gray-600">
            I have read and understood the{' '}
            <a href="#" className="font-medium text-brand-600 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {show('privacy_accepted') && <p className="mt-1 text-xs text-red-600">{errors.privacy_accepted}</p>}
      </div>

      {status === 'success' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle size={18} />
          {message}
        </div>
      )}
      {status === 'error' && message && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} />
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary mt-5 w-full gap-2 disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting...' : 'Get Free Consultation'}
        {status !== 'loading' && <Send size={16} />}
      </button>
    </form>
  );
}
