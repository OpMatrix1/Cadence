import { Check, Circle } from 'lucide-react';
import { useCadence } from '../context/CadenceContext';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { formatShortDate, isHabitDue, todayISO } from '../lib/date';
import { currentStreak } from '../lib/streaks';

export function Dashboard() {
  const { tasks, habits, logs, toggleTask, toggleHabitToday } = useCadence();
  const todayTasks = tasks.filter((task) => task.status === 'pending' && (!task.due_date || task.due_date <= todayISO()));
  const dueHabits = habits.filter((habit) => isHabitDue(habit.target_days, habit.frequency));
  const doneToday = (habitId: string) => logs.some((log) => log.habit_id === habitId && log.completed_on === todayISO());
  return (
    <>
      <PageHeader title="Today" kicker="Daily rhythm" />
      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="panel">
          <h2 className="section-title">Tasks</h2>
          <div className="grid gap-3">
            {todayTasks.length === 0 && <EmptyState title="The day is clear" body="Anything you add with a due date of today or earlier will land here." />}
            {todayTasks.map((task) => <button key={task.id} onClick={() => toggleTask(task)} className="item-row text-left"><Circle size={20} /><span className="flex-1 font-semibold">{task.title}</span><span className="tag">{formatShortDate(task.due_date)}</span></button>)}
          </div>
        </div>
        <div className="panel">
          <h2 className="section-title">Habits</h2>
          <div className="grid gap-3">
            {dueHabits.length === 0 && <EmptyState title="No habits due" body="Create a daily or scheduled habit to see it in this focus list." />}
            {dueHabits.map((habit) => <button key={habit.id} onClick={() => toggleHabitToday(habit)} className={`item-row text-left ${doneToday(habit.id) ? 'bg-teal/10' : ''}`}>{doneToday(habit.id) ? <Check size={20} /> : <Circle size={20} />}<span className="flex-1 font-semibold">{habit.title}</span><span className="tag">{currentStreak(logs, habit.id)} day</span></button>)}
          </div>
        </div>
      </section>
    </>
  );
}
