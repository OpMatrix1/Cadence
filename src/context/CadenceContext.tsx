import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { demoHabits, demoLogs, demoTasks } from '../lib/demoData';
import { hasSupabaseConfig, supabase } from '../lib/supabase';
import { todayISO } from '../lib/date';
import type { Frequency, Habit, HabitLog, Priority, Task } from '../lib/types';

type TaskInput = { title: string; description?: string; due_date?: string | null; priority: Priority };
type HabitInput = { title: string; description?: string; frequency: Frequency; target_days?: number[] | null; color?: string };

type CadenceState = {
  session: Session | null;
  demoMode: boolean;
  loading: boolean;
  tasks: Task[];
  habits: Habit[];
  logs: HabitLog[];
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  addTask: (input: TaskInput) => Promise<void>;
  updateTask: (id: string, input: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (task: Task) => Promise<void>;
  addHabit: (input: HabitInput) => Promise<void>;
  updateHabit: (id: string, input: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitToday: (habit: Habit) => Promise<void>;
};

const CadenceContext = createContext<CadenceState | null>(null);
const uuid = () => crypto.randomUUID();

export function CadenceProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const demoMode = !hasSupabaseConfig;

  useEffect(() => {
    if (!supabase) {
      setTasks(demoTasks);
      setHabits(demoHabits);
      setLogs(demoLogs);
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session) return;
    const client = supabase;
    const load = async () => {
      setLoading(true);
      const [{ data: taskRows }, { data: habitRows }, { data: logRows }] = await Promise.all([
        client.from('tasks').select('*').order('created_at', { ascending: false }),
        client.from('habits').select('*').eq('archived', false).order('created_at', { ascending: false }),
        client.from('habit_logs').select('*').order('completed_on', { ascending: false })
      ]);
      setTasks(taskRows ?? []);
      setHabits(habitRows ?? []);
      setLogs(logRows ?? []);
      setLoading(false);
    };
    void load();
  }, [session]);

  const value = useMemo<CadenceState>(() => {
    const userId = session?.user.id ?? 'demo-user';
    const signIn = async (email: string, password: string) => {
      if (!supabase) return null;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error?.message ?? null;
    };
    const signUp = async (email: string, password: string) => {
      if (!supabase) return null;
      const { error } = await supabase.auth.signUp({ email, password });
      return error?.message ?? null;
    };
    const signOut = async () => {
      if (supabase) await supabase.auth.signOut();
      setSession(null);
    };
    const addTask = async (input: TaskInput) => {
      const row: Task = { id: uuid(), user_id: userId, title: input.title, description: input.description ?? null, due_date: input.due_date ?? null, priority: input.priority, status: 'pending', created_at: new Date().toISOString(), completed_at: null };
      setTasks((current) => [row, ...current]);
      if (supabase) await (supabase as any).from('tasks').insert([row]);
    };
    const updateTask = async (id: string, input: Partial<Task>) => {
      setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...input } : task)));
      if (supabase) await (supabase as any).from('tasks').update(input).eq('id', id);
    };
    const deleteTask = async (id: string) => {
      setTasks((current) => current.filter((task) => task.id !== id));
      if (supabase) await (supabase as any).from('tasks').delete().eq('id', id);
    };
    const toggleTask = async (task: Task) => {
      await updateTask(task.id, { status: task.status === 'done' ? 'pending' : 'done', completed_at: task.status === 'done' ? null : new Date().toISOString() });
    };
    const addHabit = async (input: HabitInput) => {
      const row: Habit = { id: uuid(), user_id: userId, title: input.title, description: input.description ?? null, frequency: input.frequency, target_days: input.target_days ?? null, color: input.color ?? '#E8983D', archived: false, created_at: new Date().toISOString() };
      setHabits((current) => [row, ...current]);
      if (supabase) await (supabase as any).from('habits').insert([row]);
    };
    const updateHabit = async (id: string, input: Partial<Habit>) => {
      setHabits((current) => current.map((habit) => (habit.id === id ? { ...habit, ...input } : habit)));
      if (supabase) await (supabase as any).from('habits').update(input).eq('id', id);
    };
    const deleteHabit = async (id: string) => {
      setHabits((current) => current.filter((habit) => habit.id !== id));
      setLogs((current) => current.filter((log) => log.habit_id !== id));
      if (supabase) await (supabase as any).from('habits').delete().eq('id', id);
    };
    const toggleHabitToday = async (habit: Habit) => {
      const completed_on = todayISO();
      const existing = logs.find((log) => log.habit_id === habit.id && log.completed_on === completed_on);
      if (existing) {
        setLogs((current) => current.filter((log) => log.id !== existing.id));
        if (supabase) await (supabase as any).from('habit_logs').delete().eq('id', existing.id);
        return;
      }
      const row: HabitLog = { id: uuid(), user_id: userId, habit_id: habit.id, completed_on, created_at: new Date().toISOString() };
      setLogs((current) => [row, ...current]);
      if (supabase) await (supabase as any).from('habit_logs').insert([row]);
    };
    return { session, demoMode, loading, tasks, habits, logs, signIn, signUp, signOut, addTask, updateTask, deleteTask, toggleTask, addHabit, updateHabit, deleteHabit, toggleHabitToday };
  }, [session, tasks, habits, logs, loading, demoMode]);

  return <CadenceContext.Provider value={value}>{children}</CadenceContext.Provider>;
}

export const useCadence = () => {
  const context = useContext(CadenceContext);
  if (!context) throw new Error('useCadence must be used inside CadenceProvider');
  return context;
};
