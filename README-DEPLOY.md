# Signal MVP Deployment Guide

## 1. Supabase Setup
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Go to **Project Settings > API** and copy the `Project URL` and `anon public` key.
3. In your local project root (`stik`), create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Go to the **SQL Editor** in Supabase and paste the contents of `supabase/migrations/20240324174000_init.sql` to create the tables.
5. (Optional) Set up Row Level Security (RLS) policies based on your needs. For MVP, you can disable RLS or set broad policies.

## 2. Vercel Deployment
1. Push your `stik` repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. In the Vercel project settings, under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Your Signal MVP will be live!

## 3. Realtime Updates
Ensure that Realtime is enabled for your `signals` and `memories` tables in Supabase:
1. Go to **Database > Replication**.
2. Enable replication for the `signals` and `memories` tables.
