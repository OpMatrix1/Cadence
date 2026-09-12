import { addDays, todayISO } from './date';
import type { HabitLog } from './types';

const dates = (logs: HabitLog[], habitId: string) => new Set(logs.filter((log) => log.habit_id === habitId).map((log) => log.completed_on));

export const currentStreak = (logs: HabitLog[], habitId: string) => {
  const done = dates(logs, habitId);
  let cursor = todayISO();
  let count = 0;
  while (done.has(cursor)) {
    count += 1;
    cursor = addDays(cursor, -1);
  }
  return count;
};

export const longestStreak = (logs: HabitLog[], habitId: string) => {
  const sorted = [...dates(logs, habitId)].sort();
  let best = 0;
  let run = 0;
  let previous = '';
  for (const day of sorted) {
    run = previous && addDays(previous, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    previous = day;
  }
  return best;
};

export const heatmapDays = (logs: HabitLog[], habitId: string, length = 90) => {
  const done = dates(logs, habitId);
  return Array.from({ length }, (_, index) => {
    const date = addDays(todayISO(), index - length + 1);
    return { date, done: done.has(date) };
  });
};
