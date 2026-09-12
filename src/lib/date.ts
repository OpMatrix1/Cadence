export const todayISO = () => new Date().toISOString().slice(0, 10);

export const addDays = (date: string, days: number) => {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
};

export const formatShortDate = (date: string | null) => {
  if (!date) return 'No date';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`));
};

export const isHabitDue = (targetDays: number[] | null, frequency: string) => {
  if (frequency === 'daily' || !targetDays?.length) return true;
  return targetDays.includes(new Date().getDay());
};
