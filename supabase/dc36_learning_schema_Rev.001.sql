-- ===========================================================================
-- DC36-EU Ireland & EU Data Centre Mastery Tracker — Supabase Postgres Schema
-- Target Project: https://nkkwegvplpozirrjcxsn.supabase.co
-- Run once in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- Idempotent: Safe to re-run without dropping existing progress or history.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Current Learning Module State (public.dc_learning_modules)
-- ---------------------------------------------------------------------------
create table if not exists public.dc_learning_modules (
  profile_id  text not null,
  module_id   text not null,
  track       text not null check (track in ('pm', 'legal')),
  pillar      text not null,
  status      text not null default 'todo' check (status in ('todo', 'progress', 'mastered')),
  hours       numeric(7,2) not null default 0 check (hours >= 0),
  confidence  smallint not null default 3 check (confidence between 1 and 5),
  notes       text not null default '',
  updated_at  timestamptz not null default now(),
  primary key (profile_id, module_id)
);

create index if not exists dc_learning_modules_profile_idx
  on public.dc_learning_modules (profile_id, track, pillar);

alter table public.dc_learning_modules enable row level security;
grant select, insert, update on public.dc_learning_modules to anon, authenticated;

drop policy if exists dc_modules_select on public.dc_learning_modules;
create policy dc_modules_select on public.dc_learning_modules
  for select to anon, authenticated using (true);

drop policy if exists dc_modules_insert on public.dc_learning_modules;
create policy dc_modules_insert on public.dc_learning_modules
  for insert to anon, authenticated with check (length(trim(profile_id)) between 3 and 64);

drop policy if exists dc_modules_update on public.dc_learning_modules;
create policy dc_modules_update on public.dc_learning_modules
  for update to anon, authenticated
  using (length(trim(profile_id)) between 3 and 64)
  with check (length(trim(profile_id)) between 3 and 64);


-- ---------------------------------------------------------------------------
-- 2. Portfolio Deliverables State (public.dc_learning_portfolio)
-- ---------------------------------------------------------------------------
create table if not exists public.dc_learning_portfolio (
  profile_id  text not null,
  item_id     text not null,
  track       text not null check (track in ('pm', 'legal')),
  status      text not null default 'Planned' check (status in ('Planned', 'In Progress', 'Complete')),
  notes       text not null default '',
  updated_at  timestamptz not null default now(),
  primary key (profile_id, item_id)
);

alter table public.dc_learning_portfolio enable row level security;
grant select, insert, update on public.dc_learning_portfolio to anon, authenticated;

drop policy if exists dc_portfolio_select on public.dc_learning_portfolio;
create policy dc_portfolio_select on public.dc_learning_portfolio
  for select to anon, authenticated using (true);

drop policy if exists dc_portfolio_insert on public.dc_learning_portfolio;
create policy dc_portfolio_insert on public.dc_learning_portfolio
  for insert to anon, authenticated with check (length(trim(profile_id)) between 3 and 64);

drop policy if exists dc_portfolio_update on public.dc_learning_portfolio;
create policy dc_portfolio_update on public.dc_learning_portfolio
  for update to anon, authenticated
  using (length(trim(profile_id)) between 3 and 64)
  with check (length(trim(profile_id)) between 3 and 64);


-- ---------------------------------------------------------------------------
-- 3. Interview Prep Readiness State (public.dc_learning_interviews)
-- ---------------------------------------------------------------------------
create table if not exists public.dc_learning_interviews (
  profile_id  text not null,
  qa_id       text not null,
  track       text not null check (track in ('pm', 'legal')),
  ready       boolean not null default false,
  updated_at  timestamptz not null default now(),
  primary key (profile_id, qa_id)
);

alter table public.dc_learning_interviews enable row level security;
grant select, insert, update on public.dc_learning_interviews to anon, authenticated;

drop policy if exists dc_interviews_select on public.dc_learning_interviews;
create policy dc_interviews_select on public.dc_learning_interviews
  for select to anon, authenticated using (true);

drop policy if exists dc_interviews_insert on public.dc_learning_interviews;
create policy dc_interviews_insert on public.dc_learning_interviews
  for insert to anon, authenticated with check (length(trim(profile_id)) between 3 and 64);

drop policy if exists dc_interviews_update on public.dc_learning_interviews;
create policy dc_interviews_update on public.dc_learning_interviews
  for update to anon, authenticated
  using (length(trim(profile_id)) between 3 and 64)
  with check (length(trim(profile_id)) between 3 and 64);


-- ---------------------------------------------------------------------------
-- 4. Immutable Learning History & Readiness Trajectory (public.dc_learning_history)
-- ---------------------------------------------------------------------------
create table if not exists public.dc_learning_history (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          text not null,
  event_type          text not null check (event_type in (
                        'status_change',
                        'hours_logged',
                        'confidence_update',
                        'note_update',
                        'portfolio_update',
                        'interview_update',
                        'manual_checkin',
                        'cloud_sync'
                      )),
  entity_id           text not null,
  entity_title        text not null default '',
  track               text not null default 'pm' check (track in ('pm', 'legal', 'system')),
  old_status          text,
  new_status          text,
  hours_delta         numeric(7,2) not null default 0,
  total_hours         numeric(8,2) not null default 0,
  old_confidence      smallint,
  new_confidence      smallint,
  pm_readiness_pct    numeric(5,2) not null default 0,
  legal_readiness_pct numeric(5,2) not null default 0,
  summary             text not null default '',
  created_at          timestamptz not null default now()
);

create index if not exists dc_learning_history_profile_time_idx
  on public.dc_learning_history (profile_id, created_at desc);

create index if not exists dc_learning_history_entity_idx
  on public.dc_learning_history (profile_id, entity_id, created_at desc);

-- Strictly append-only: SELECT + INSERT only (no client UPDATE or DELETE)
alter table public.dc_learning_history enable row level security;
grant select, insert on public.dc_learning_history to anon, authenticated;

drop policy if exists dc_history_select on public.dc_learning_history;
create policy dc_history_select on public.dc_learning_history
  for select to anon, authenticated using (true);

drop policy if exists dc_history_insert on public.dc_learning_history;
create policy dc_history_insert on public.dc_learning_history
  for insert to anon, authenticated with check (length(trim(profile_id)) between 3 and 64);


-- ---------------------------------------------------------------------------
-- 5. Daily Rollup View for Fast Analytics
-- ---------------------------------------------------------------------------
create or replace view public.dc_learning_daily_summary as
select
  profile_id,
  date_trunc('day', created_at)::date as study_date,
  count(*) as events_count,
  sum(greatest(hours_delta, 0)) as net_hours_added,
  max(pm_readiness_pct) as peak_pm_readiness_pct,
  max(legal_readiness_pct) as peak_legal_readiness_pct
from public.dc_learning_history
group by profile_id, date_trunc('day', created_at)::date
order by study_date desc;

grant select on public.dc_learning_daily_summary to anon, authenticated;
