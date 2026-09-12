create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  frequency text not null default 'daily' check (frequency in ('daily','weekly','custom')),
  target_days int[] default null,
  color text default '#E8983D',
  archived boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  completed_on date not null,
  created_at timestamptz not null default now(),
  unique (habit_id, completed_on)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  status text not null default 'pending' check (status in ('pending','done')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "own rows only" on public.habits;
drop policy if exists "own rows only" on public.habit_logs;
drop policy if exists "own rows only" on public.tasks;

create policy "own rows only" on public.habits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own rows only" on public.habit_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own rows only" on public.tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
