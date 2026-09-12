# Cadence

Cadence is a mobile-first task and habit tracker PWA built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Run the SQL in `supabase/migrations/20260912183800_create_cadence_schema.sql` in Supabase.
5. Start the app with `npm run dev`.

If Supabase env vars are missing, Cadence opens in demo mode with local sample data so the interface can still be reviewed.

## Deployment

The GitHub Pages workflow builds on pushes to `main`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as repository secrets before deploying.
