import { addDays, todayISO } from './date';
import type { Habit, HabitLog, Task } from './types';

const user_id = 'demo-user';

export const demoTasks: Task[] = [
  { id: 'task-1', user_id, title: 'Plan the week', description: 'Choose the next three priorities.', due_date: todayISO(), priority: 'high', status: 'pending', created_at: new Date().toISOString(), completed_at: null },
  { id: 'task-2', user_id, title: 'Clear inbox triage', description: null, due_date: addDays(todayISO(), 1), priority: 'medium', status: 'pending', created_at: new Date().toISOString(), completed_at: null },
  { id: 'task-3', user_id, title: 'Archive old notes', description: null, due_date: addDays(todayISO(), -1), priority: 'low', status: 'done', created_at: new Date().toISOString(), completed_at: new Date().toISOString() }
];

export const demoHabits: Habit[] = [
  { id: 'habit-1', user_id, title: 'Morning walk', description: 'Ten quiet minutes outside.', frequency: 'daily', target_days: null, color: '#4F8577', archived: false, created_at: new Date().toISOString() },
  { id: 'habit-2', user_id, title: 'Read', description: 'A few pages is enough.', frequency: 'daily', target_days: null, color: '#E8983D', archived: false, created_at: new Date().toISOString() },
  { id: 'habit-3', user_id, title: 'Strength session', description: 'Light, repeatable, no heroics.', frequency: 'weekly', target_days: [1, 3, 5], color: '#7A5C8F', archived: false, created_at: new Date().toISOString() }
];

export const demoLogs: HabitLog[] = Array.from({ length: 42 }, (_, index) => {
  const completed_on = addDays(todayISO(), -index);
  return [
    index < 9 ? { id: `log-walk-${index}`, habit_id: 'habit-1', user_id, completed_on, created_at: new Date().toISOString() } : null,
    index % 2 === 0 ? { id: `log-read-${index}`, habit_id: 'habit-2', user_id, completed_on, created_at: new Date().toISOString() } : null,
    index % 5 === 0 ? { id: `log-strength-${index}`, habit_id: 'habit-3', user_id, completed_on, created_at: new Date().toISOString() } : null
  ];
}).flat().filter(Boolean) as HabitLog[];
