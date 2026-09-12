import { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useCadence } from '../context/CadenceContext';

export function Login() {
  const { session, demoMode, signIn, signUp, sendEmailCode, verifyEmailCode } = useCadence();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [signupSent, setSignupSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup' | 'code'>(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [error, setError] = useState<string | null>(null);
  if (session || demoMode) return <Navigate to="/app" replace />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    if (mode === 'code') {
      if (!codeSent) {
        const nextError = await sendEmailCode(email);
        setError(nextError);
        setCodeSent(!nextError);
        setSubmitting(false);
        return;
      }
      setError(await verifyEmailCode(email, token));
      setSubmitting(false);
      return;
    }
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setSubmitting(false);
        return;
      }
      const nextError = await signUp(name.trim(), email, password);
      setError(nextError);
      setSignupSent(!nextError);
      setSubmitting(false);
      return;
    }
    setError(await signIn(email, password));
    setSubmitting(false);
  };

  const switchMode = (nextMode: 'login' | 'signup' | 'code') => {
    setMode(nextMode);
    setError(null);
    setCodeSent(false);
    setSignupSent(false);
    setToken('');
  };

  return (
    <main className="grid min-h-screen place-items-center bg-fog px-4 text-ink">
      <section className="w-full max-w-md rounded-md bg-white p-6 shadow-soft">
        <Link to="/" aria-label="Back to welcome">
          <img src="cadence-logo.svg" className="mb-8 h-16 w-auto" alt="Cadence" />
        </Link>
        <h1 className="mb-4 font-display text-3xl font-bold">{mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Check your email'}</h1>
        {signupSent && (
          <div className="mb-4 rounded-md border border-teal/30 bg-teal/10 px-4 py-3 text-sm leading-6 text-ink">
            Account created. Check your email and confirm your address, then come back to Cadence to log in.
          </div>
        )}
        <form className="grid gap-3" onSubmit={submit}>
          {mode === 'signup' && <input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required />}
          <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
          {mode !== 'code' && <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required minLength={6} />}
          {mode === 'signup' && <input className="field" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" required minLength={6} />}
          {mode === 'code' && codeSent && <input className="field" inputMode="numeric" autoComplete="one-time-code" value={token} onChange={(event) => setToken(event.target.value)} placeholder="6-digit code" required minLength={6} />}
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={submitting || signupSent}>
            {submitting ? 'Working...' : mode === 'login' ? 'Log in' : mode === 'signup' ? 'Create account' : codeSent ? 'Verify code' : 'Send email code'}
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-teal">
          <button onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Already have an account?' : 'Need an account?'}</button>
          <button onClick={() => switchMode(mode === 'code' ? 'login' : 'code')}>{mode === 'code' ? 'Use password instead' : 'Email me a login code'}</button>
        </div>
      </section>
    </main>
  );
}
