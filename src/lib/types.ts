export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'done';
export type Frequency = 'daily' | 'weekly' | 'custom';

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: Priority;
  status: TaskStatus;
  created_at: string;
  completed_at: string | null;
};

export type Habit = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  frequency: Frequency;
  target_days: number[] | null;
  color: string | null;
  archived: boolean;
  created_at: string;
};

export type HabitLog = {
  id: string;
  habit_id: string;
  user_id: string;
  completed_on: string;
  created_at: string;
};
