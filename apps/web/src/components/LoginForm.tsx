/**
 * Login form React island — handles email/password submission,
 * stores auth state via Zustand, and redirects on success.
 */
import { useState } from 'react';
import { apiPost } from '@marketplace/shared/api-client';

interface LoginResponse {
  user: { id: string; email: string; name: string; role: string };
  token: string;
}

interface Props {
  locale: 'en' | 'ro';
}

const strings = {
  en: {
    heading: 'Sign in to your account',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    submit: 'Sign in',
    submitting: 'Signing in…',
    noAccount: "Don't have an account?",
    register: 'Sign up',
    errorFallback: 'Invalid email or password.',
  },
  ro: {
    heading: 'Conectează-te la contul tău',
    emailLabel: 'Adresă de email',
    emailPlaceholder: 'tu@exemplu.com',
    passwordLabel: 'Parolă',
    passwordPlaceholder: '••••••••',
    submit: 'Conectare',
    submitting: 'Se conectează…',
    noAccount: 'Nu ai cont?',
    register: 'Înregistrează-te',
    errorFallback: 'Email sau parolă incorecte.',
  },
};

export function LoginForm({ locale }: Props) {
  const t = strings[locale];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { user, token } = await apiPost<LoginResponse>('/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      window.location.href = `/${locale}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorFallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">{t.heading}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            {t.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-marketplace-primary focus:outline-none focus:ring-2 focus:ring-marketplace-primary/20"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            {t.passwordLabel}
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPlaceholder}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-marketplace-primary focus:outline-none focus:ring-2 focus:ring-marketplace-primary/20"
          />
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-marketplace-primary px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t.submitting : t.submit}
        </button>
      </form>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-slate-500">
        {t.noAccount}{' '}
        <a href={`/${locale}/register`} className="font-medium text-marketplace-primary hover:underline">
          {t.register}
        </a>
      </p>
    </div>
  );
}