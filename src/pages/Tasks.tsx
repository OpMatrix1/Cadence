import { Check, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { TaskForm } from '../components/TaskForm';
import { useCadence } from '../context/CadenceContext';
import { formatShortDate } from '../lib/date';
import type { Priority, TaskStatus } from '../lib/types';

export function Tasks() {
  const { tasks, addTask, deleteTask, toggleTask } = useCadence();
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const filtered = useMemo(() => tasks.filter((task) => (status === 'all' || task.status === status) && (priority === 'all' || task.priority === priority)).sort((a, b) => (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999')), [tasks, status, priority]);
  return (
    <>
      <PageHeader title="Tasks" kicker="Commitments" />
      <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <div className="panel"><TaskForm onSubmit={addTask} submitLabel="Add task" /></div>
        <div className="panel">
          <div className="mb-4 flex flex-wrap gap-2">
            <select className="field max-w-40" value={status} onChange={(event) => setStatus(event.target.value as TaskStatus | 'all')}><option value="all">All status</option><option value="pending">Pending</option><option value="done">Done</option></select>
            <select className="field max-w-44" value={priority} onChange={(event) => setPriority(event.target.value as Priority | 'all')}><option value="all">All priority</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          </div>
          <div className="grid gap-3">
            {filtered.length === 0 && <EmptyState title="Nothing matches" body="Adjust filters or add the next concrete task." />}
            {filtered.map((task) => (
              <article className="item-row" key={task.id}>
                <button className={`icon-btn ${task.status === 'done' ? 'bg-teal text-white' : ''}`} onClick={() => toggleTask(task)} title="Toggle task"><Check size={17} /></button>
                <div className="min-w-0 flex-1"><h2 className={`font-semibold ${task.status === 'done' ? 'line-through text-slate' : ''}`}>{task.title}</h2><p className="truncate text-sm text-slate">{task.description || 'No notes'} · {formatShortDate(task.due_date)}</p></div>
                <span className={`tag priority-${task.priority}`}>{task.priority}</span>
                <button className="icon-btn" onClick={() => deleteTask(task.id)} title="Delete task"><Trash2 size={17} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
