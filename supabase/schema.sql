-- ============================================================
-- FlowSaaS schema  (run this in the Supabase SQL editor)
-- ============================================================

-- workspaces
create table public.workspaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  owner_id    uuid references auth.users on delete cascade,
  created_at  timestamptz default now()
);

-- profiles  (mirrors auth.users 1-to-1)
create table public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  email         text not null,
  full_name     text,
  workspace_id  uuid references public.workspaces on delete set null,
  created_at    timestamptz default now()
);

-- ── Row-Level Security ─────────────────────────────────────
alter table public.workspaces enable row level security;
alter table public.profiles    enable row level security;

-- Profiles: user can read/update only their own row
create policy "profile:select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profile:update own" on public.profiles
  for update using (auth.uid() = id);

-- Workspaces: workspace members can read their workspace
create policy "workspace:select member" on public.workspaces
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.workspace_id = workspaces.id
        and profiles.id = auth.uid()
    )
  );

-- ── Auto-create profile on sign-up ────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
