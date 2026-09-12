import { useState } from 'react';
import type { Frequency, Habit } from '../lib/types';

const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function HabitForm({ initial, onSubmit, submitLabel = 'Save habit' }: { initial?: Habit; onSubmit: (value: { title: string; description?: string; frequency: Frequency; target_days?: number[] | null; color?: string }) => Promise<void>; submitLabel?: string }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [frequency, setFrequency] = useState<Frequency>(initial?.frequency ?? 'daily');
  const [targetDays, setTargetDays] = useState<number[]>(initial?.target_days ?? []);
  const [color, setColor] = useState(initial?.color ?? '#E8983D');
  const toggleDay = (day: number) => setTargetDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day]);
  return (
    <form className="grid gap-3" onSubmit={async (event) => { event.preventDefault(); if (!title.trim()) return; await onSubmit({ title: title.trim(), description, frequency, target_days: frequency === 'daily' ? null : targetDays, color }); setTitle(''); setDescription(''); }}>
      <input className="field" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Habit title" />
      <textarea className="field min-h-20" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Why it matters" />
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="field" value={frequency} onChange={(event) => setFrequency(event.target.value as Frequency)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        <input className="field h-12" type="color" value={color} onChange={(event) => setColor(event.target.value)} />
      </div>
      {frequency !== 'daily' && <div className="flex flex-wrap gap-2">{week.map((day, index) => <button type="button" key={day} onClick={() => toggleDay(index)} className={`rounded-md border px-3 py-2 text-sm font-semibold ${targetDays.includes(index) ? 'border-ink bg-ink text-fog' : 'border-ink/15 bg-white text-slate'}`}>{day}</button>)}</div>}
      <button className="btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}
