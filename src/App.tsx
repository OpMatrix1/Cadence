import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CheckSquare, Flame, LayoutDashboard, LogOut } from 'lucide-react';
import { CadenceProvider, useCadence } from './context/CadenceContext';
import { Dashboard } from './pages/Dashboard';
import { Habits } from './pages/Habits';
import { Tasks } from './pages/Tasks';
import { Login } from './pages/Login';

function Shell() {
  const { session, demoMode, signOut } = useCadence();
  const navigate = useNavigate();
  if (!session && !demoMode) return <Navigate to="/login" replace />;

  const logout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-fog text-ink">
      <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-fog/95 px-3 py-2 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-t-0 md:px-5 md:py-6">
        <div className="hidden items-center gap-3 md:flex">
          <img src="cadence-icon.svg" className="h-11 w-11" alt="" />
          <div>
            <div className="font-display text-2xl font-bold">Cadence</div>
            <div className="text-sm text-slate">Build your rhythm</div>
          </div>
        </div>
        <nav className="grid grid-cols-3 gap-2 md:mt-10 md:flex md:flex-col">
          <NavItem to="/" icon={<LayoutDashboard size={19} />} label="Today" />
          <NavItem to="/habits" icon={<Flame size={19} />} label="Habits" />
          <NavItem to="/tasks" icon={<CheckSquare size={19} />} label="Tasks" />
        </nav>
        <button onClick={logout} className="mt-6 hidden w-full items-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold text-slate hover:bg-white md:flex">
          <LogOut size={17} /> Sign out
        </button>
      </aside>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:ml-64 md:px-8 md:py-8">
        {demoMode && <div className="mb-5 rounded-md border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-ink">Demo mode is active. Add Supabase values to `.env` to enable real auth and cloud storage.</div>}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex min-h-12 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold md:justify-start ${isActive ? 'bg-ink text-fog' : 'text-slate hover:bg-white'}`}>
      {icon}<span>{label}</span>
    </NavLink>
  );
}

export function App() {
  return (
    <CadenceProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
    </CadenceProvider>
  );
}
