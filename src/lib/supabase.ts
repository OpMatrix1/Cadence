import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(url && anonKey && !url.includes('your-project'));

export const supabase = hasSupabaseConfig ? createClient<Database>(url, anonKey) : null;

export const authRedirectUrl = () => {
  const basePath = import.meta.env.BASE_URL || '/';
  return `${window.location.origin}${basePath}`;
};
