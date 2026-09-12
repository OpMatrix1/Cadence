import { useState } from 'react';
import type { Priority, Task } from '../lib/types';

export function TaskForm({ initial, onSubmit, submitLabel = 'Save task' }: { initial?: Task; onSubmit: (value: { title: string; description?: string; due_date?: string | null; priority: Priority }) => Promise<void>; submitLabel?: string }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [dueDate, setDueDate] = useState(initial?.due_date ?? '');
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'medium');
  return (
    <form className="grid gap-3" onSubmit={async (event) => { event.preventDefault(); if (!title.trim()) return; await onSubmit({ title: title.trim(), description, due_date: dueDate || null, priority }); setTitle(''); setDescription(''); setDueDate(''); }}>
      <input className="field" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
      <textarea className="field min-h-20" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Notes" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="field" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        <select className="field" value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
      </div>
      <button className="btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}
