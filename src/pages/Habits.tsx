import { Check, Trash2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { HabitForm } from '../components/HabitForm';
import { PageHeader } from '../components/PageHeader';
import { useCadence } from '../context/CadenceContext';
import { todayISO } from '../lib/date';
import { currentStreak, heatmapDays, longestStreak } from '../lib/streaks';

export function Habits() {
  const { habits, logs, addHabit, deleteHabit, toggleHabitToday } = useCadence();
  const doneToday = (habitId: string) => logs.some((log) => log.habit_id === habitId && log.completed_on === todayISO());
  return (
    <>
      <PageHeader title="Habits" kicker="Streaks" />
      <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <div className="panel"><HabitForm onSubmit={addHabit} submitLabel="Add habit" /></div>
        <div className="grid gap-4">
          {habits.length === 0 && <EmptyState title="Start a rhythm" body="Add one small habit that is easy enough to repeat tomorrow." />}
          {habits.map((habit) => (
            <article className="panel" key={habit.id}>
              <div className="mb-4 flex items-start gap-3">
                <button className={`icon-btn mt-1 ${doneToday(habit.id) ? 'bg-teal text-white' : ''}`} onClick={() => toggleHabitToday(habit)} title="Toggle habit"><Check size={17} /></button>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-semibold">{habit.title}</h2>
                  <p className="text-sm text-slate">{habit.description || 'No notes'} · {habit.frequency}</p>
                </div>
                <button className="icon-btn" onClick={() => deleteHabit(habit.id)} title="Delete habit"><Trash2 size={17} /></button>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <Metric label="Current" value={`${currentStreak(logs, habit.id)} days`} />
                <Metric label="Longest" value={`${longestStreak(logs, habit.id)} days`} />
              </div>
              <div className="heatmap">{heatmapDays(logs, habit.id).map((day) => <span key={day.date} title={day.date} style={{ backgroundColor: day.done ? habit.color ?? '#E8983D' : undefined }} className={day.done ? 'heat filled' : 'heat'} />)}</div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-fog px-4 py-3"><div className="text-xs font-semibold uppercase text-slate">{label}</div><div className="font-display text-xl font-bold">{value}</div></div>;
}
