import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';
import { validateLoginForm, fieldClass, FieldErrors, hasErrors } from '../../utils/validation';

const inputBase =
  'w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-2';

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const show = (field: string) => touched[field] && errors[field];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const fieldErrors = validateLoginForm(email, password);
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) return;

    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <Logo className="justify-center" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your website content</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) setErrors(validateLoginForm(e.target.value, password));
                }}
                onBlur={() => {
                  setTouched((t) => ({ ...t, email: true }));
                  setErrors(validateLoginForm(email, password));
                }}
                placeholder="admin@yourcompany.com"
                autoComplete="email"
                className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('email')))}
              />
            </div>
            {show('email') && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) setErrors(validateLoginForm(email, e.target.value));
                }}
                onBlur={() => {
                  setTouched((t) => ({ ...t, password: true }));
                  setErrors(validateLoginForm(email, password));
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={fieldClass(`${inputBase} border-gray-200 focus:border-brand-500 focus:ring-brand-500/20`, Boolean(show('password')))}
              />
            </div>
            {show('password') && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
