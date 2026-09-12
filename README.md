# Cadence

Cadence is a mobile-first task and habit tracker PWA built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Run the SQL in `supabase/migrations/20260912183800_create_cadence_schema.sql` in Supabase.
5. Start the app with `npm run dev`.

If Supabase env vars are missing, Cadence opens in demo mode with local sample data so the interface can still be reviewed.

## Supabase Auth

Cadence supports email/password and email one-time-code login. In Supabase, keep the Email provider enabled and set the Site URL to `https://opmatrix1.github.io/Cadence/`.

For typed email codes, update the Magic Link email template to include `{{ .Token }}`. Otherwise Supabase will send a magic link instead of a six-digit code.

## Deployment

The GitHub Pages workflow builds on pushes to `main`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as repository secrets before deploying.
