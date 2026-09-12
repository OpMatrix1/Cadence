import { ArrowRight, BarChart3, CalendarCheck, Flame } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useCadence } from '../context/CadenceContext';

export function Welcome() {
  const { session, demoMode } = useCadence();
  if (session || demoMode) return <Navigate to="/app" replace />;

  return (
    <main className="min-h-screen bg-fog text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
        <img src="cadence-logo.svg" className="h-14 w-auto" alt="Cadence" />
        <Link className="rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-bold text-ink shadow-sm hover:border-teal" to="/login">
          Log in
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-8 md:grid-cols-[1fr_0.95fr] md:items-center md:px-8 md:pb-20 md:pt-14">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal">Build your rhythm</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-ink md:text-7xl">
            Keep tasks and habits moving in one calm daily flow.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate">
            Cadence helps you see what matters today, mark progress quickly, and keep streaks honest without turning your day into a spreadsheet.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary inline-flex items-center justify-center gap-2 px-5" to="/login?mode=signup">
              Create account <ArrowRight size={18} />
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/15 bg-white px-5 text-sm font-bold text-ink hover:border-teal" to="/login">
              I already have an account
            </Link>
          </div>
        </div>

        <div className="rounded-md bg-white p-4 shadow-soft">
          <div className="rounded-md bg-ink p-5 text-fog">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-fog/65">Today</p>
                <h2 className="font-display text-3xl font-bold">Steady pace</h2>
              </div>
              <img src="cadence-icon.svg" className="h-12 w-12" alt="" />
            </div>
            <div className="grid gap-3">
              <PreviewRow icon={<CalendarCheck size={18} />} label="Plan project outline" meta="High" />
              <PreviewRow icon={<Flame size={18} />} label="Morning walk" meta="8 day streak" active />
              <PreviewRow icon={<BarChart3 size={18} />} label="Read" meta="90 day view" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} className={`h-9 rounded-md ${index % 4 === 0 || index > 13 ? 'bg-amber' : index % 3 === 0 ? 'bg-teal' : 'bg-fog'}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PreviewRow({ icon, label, meta, active = false }: { icon: React.ReactNode; label: string; meta: string; active?: boolean }) {
  return (
    <div className={`flex min-h-14 items-center gap-3 rounded-md px-3 ${active ? 'bg-teal/30' : 'bg-white/8'}`}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-fog text-ink">{icon}</span>
      <span className="min-w-0 flex-1 font-semibold">{label}</span>
      <span className="text-xs font-bold uppercase text-fog/70">{meta}</span>
    </div>
  );
}
