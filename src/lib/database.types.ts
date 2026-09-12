import type { Frequency, Habit, HabitLog, Priority, Task, TaskStatus } from './types';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      habits: {
        Row: Habit;
        Insert: Omit<Habit, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Habit, 'id' | 'user_id' | 'created_at'>>;
      };
      habit_logs: {
        Row: HabitLog;
        Insert: Omit<HabitLog, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<HabitLog, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'completed_at'> & { id?: string; created_at?: string; completed_at?: string | null };
        Update: Partial<Omit<Task, 'id' | 'user_id' | 'created_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      priority: Priority;
      task_status: TaskStatus;
      frequency: Frequency;
    };
    CompositeTypes: Record<string, never>;
  };
};
