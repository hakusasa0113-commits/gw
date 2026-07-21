-- Groundwork database schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Profiles (extends Supabase auth.users)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  target_course text,
  postcode_or_town text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- Courses
-- ---------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

alter table public.courses enable row level security;
create policy "Courses are publicly readable"
  on public.courses for select
  using (true);

-- ---------------------------------------------------------------------
-- Organisations
-- ---------------------------------------------------------------------
create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  town text,
  lat double precision,
  lng double precision,
  source text check (source in ('manual','do-it','reach','nhs','charityjob','council','university')) default 'manual',
  created_at timestamptz not null default now()
);

alter table public.organisations enable row level security;
create policy "Organisations are publicly readable"
  on public.organisations for select
  using (true);

-- ---------------------------------------------------------------------
-- Volunteer opportunities
-- ---------------------------------------------------------------------
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references public.organisations (id) on delete cascade,
  role text not null,
  description text not null,
  why_it_helps text not null,
  skills text[] not null default '{}',
  course_slugs text[] not null default '{}',   -- courses this role is relevant to
  mode text check (mode in ('online','in-person','hybrid')) not null,
  weekly_commitment text not null,
  min_age int not null default 16,
  town text,
  lat double precision,
  lng double precision,
  apply_url text not null,
  achievements text[] not null default '{}',
  reflection_prompts text[] not null default '{}',
  example_sentence text,
  created_at timestamptz not null default now()
);

alter table public.opportunities enable row level security;
create policy "Opportunities are publicly readable"
  on public.opportunities for select
  using (true);

create index if not exists idx_opportunities_course_slugs on public.opportunities using gin (course_slugs);
create index if not exists idx_opportunities_mode on public.opportunities (mode);
create index if not exists idx_opportunities_town on public.opportunities (town);

-- ---------------------------------------------------------------------
-- Saved / tracked opportunities (per user)
-- ---------------------------------------------------------------------
create table if not exists public.saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  status text check (status in ('saved','in_progress','completed')) not null default 'saved',
  notes text,
  saved_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, opportunity_id)
);

alter table public.saved_opportunities enable row level security;

create policy "Users can view their own saved opportunities"
  on public.saved_opportunities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved opportunities"
  on public.saved_opportunities for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own saved opportunities"
  on public.saved_opportunities for update
  using (auth.uid() = user_id);

create policy "Users can delete their own saved opportunities"
  on public.saved_opportunities for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Completed volunteering log (distinct table for CV/portfolio history,
-- keeps a durable record even if the opportunity listing later changes)
-- ---------------------------------------------------------------------
create table if not exists public.completed_volunteering (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_id uuid references public.opportunities (id) on delete set null,
  role_snapshot text not null,
  organisation_snapshot text not null,
  skills_snapshot text[] not null default '{}',
  hours_logged numeric,
  start_date date,
  end_date date,
  reflection text,
  created_at timestamptz not null default now()
);

alter table public.completed_volunteering enable row level security;

create policy "Users can manage their own completed volunteering"
  on public.completed_volunteering for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Seed courses
-- ---------------------------------------------------------------------
insert into public.courses (name, slug) values
  ('Medicine','medicine'),
  ('Computer Science','computer-science'),
  ('Psychology','psychology'),
  ('Law','law'),
  ('Engineering','engineering'),
  ('Education','education'),
  ('Business','business'),
  ('Nursing','nursing'),
  ('Architecture','architecture'),
  ('Biology / Life Sciences','biology-life-sciences'),
  ('Journalism','journalism')
on conflict (slug) do nothing;
