-- Run this in your Supabase SQL editor. Accounts are invite-only when
-- 'Allow new users to sign up' is OFF in Supabase Auth settings.
create extension if not exists pgcrypto;
create table if not exists public.places (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null, address text default '', city text default '', country text default '',
 category text not null default 'Other', lat double precision, lng double precision,
 notes text default '', saved boolean not null default false,
 visited boolean not null default false, external_id text,
 created_at timestamptz not null default now()
);
create table if not exists public.recommendations (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 place_id uuid not null references public.places(id) on delete cascade,
 person text not null default 'Me', note text not null default '',
 source text not null default 'Manual', created_at timestamptz not null default now()
);
create index if not exists places_by_user on public.places(user_id);
create index if not exists recommendations_by_user on public.recommendations(user_id);
alter table public.places enable row level security;
alter table public.recommendations enable row level security;
drop policy if exists "Own places" on public.places;
create policy "Own places" on public.places for all to authenticated using (auth.uid()=user_id) with check(auth.uid()=user_id);
drop policy if exists "Own recommendations" on public.recommendations;
create policy "Own recommendations" on public.recommendations for all to authenticated using (auth.uid()=user_id and exists (select 1 from public.places p where p.id=place_id and p.user_id=auth.uid())) with check(auth.uid()=user_id and exists (select 1 from public.places p where p.id=place_id and p.user_id=auth.uid()));
-- Prevent different users from seeing or modifying one another's records via RLS.
-- Version 2 metadata for tags and personal favorites. Also safe for existing projects.
alter table public.places add column if not exists tags text[] not null default '{}';
alter table public.places add column if not exists favorite boolean not null default false;
