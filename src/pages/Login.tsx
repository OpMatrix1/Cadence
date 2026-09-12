import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCadence } from '../context/CadenceContext';

export function Login() {
  const { session, demoMode, signIn, signUp } = useCadence();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  if (session || demoMode) return <Navigate to="/" replace />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(mode === 'login' ? await signIn(email, password) : await signUp(email, password));
  };

  return (
    <main className="grid min-h-screen place-items-center bg-fog px-4 text-ink">
      <section className="w-full max-w-md rounded-md bg-white p-6 shadow-soft">
        <img src="cadence-logo.svg" className="mb-8 h-16 w-auto" alt="Cadence" />
        <form className="grid gap-3" onSubmit={submit}>
          <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
          <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required minLength={6} />
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button className="btn-primary" type="submit">{mode === 'login' ? 'Log in' : 'Create account'}</button>
        </form>
        <button className="mt-4 text-sm font-semibold text-teal" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
        </button>
      </section>
    </main>
  );
}
