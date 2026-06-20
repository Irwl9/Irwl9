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

-- ============================================================
-- Projects
-- ============================================================
create table public.projects (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces on delete cascade,
  name         text not null check (char_length(name) between 2 and 200),
  description  text check (char_length(description) <= 2000),
  status       text not null default 'active'
               check (status in ('active', 'completed', 'archived')),
  owner_id     uuid references auth.users on delete set null,
  due_date     date,
  created_at   timestamptz default now()
);

alter table public.projects enable row level security;

create policy "projects:select by workspace member" on public.projects
  for select using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = projects.workspace_id and p.id = auth.uid()
    )
  );

create policy "projects:insert by workspace member" on public.projects
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = projects.workspace_id and p.id = auth.uid()
    )
  );

create policy "projects:update by workspace member" on public.projects
  for update using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = projects.workspace_id and p.id = auth.uid()
    )
  );

create policy "projects:delete by owner" on public.projects
  for delete using (owner_id = auth.uid());

-- ============================================================
-- Tasks
-- ============================================================
create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects on delete cascade,
  workspace_id uuid not null references public.workspaces on delete cascade,
  title        text not null check (char_length(title) between 1 and 500),
  description  text check (char_length(description) <= 5000),
  status       text not null default 'todo'
               check (status in ('todo', 'in_progress', 'done', 'blocked')),
  priority     text not null default 'medium'
               check (priority in ('low', 'medium', 'high', 'urgent')),
  assignee_id  uuid references auth.users on delete set null,
  due_date     date,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

alter table public.tasks enable row level security;

create policy "tasks:select by workspace member" on public.tasks
  for select using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = tasks.workspace_id and p.id = auth.uid()
    )
  );

create policy "tasks:insert by workspace member" on public.tasks
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = tasks.workspace_id and p.id = auth.uid()
    )
  );

create policy "tasks:update by workspace member" on public.tasks
  for update using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = tasks.workspace_id and p.id = auth.uid()
    )
  );

create policy "tasks:delete by workspace member" on public.tasks
  for delete using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = tasks.workspace_id and p.id = auth.uid()
    )
  );

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- Activity log
-- ============================================================
create table public.activity_log (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces on delete cascade,
  user_id       uuid references auth.users on delete set null,
  action        text not null,
  resource_type text not null,
  resource_id   uuid,
  metadata      jsonb,
  created_at    timestamptz default now()
);

alter table public.activity_log enable row level security;

create policy "activity_log:select by workspace member" on public.activity_log
  for select using (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = activity_log.workspace_id and p.id = auth.uid()
    )
  );

create policy "activity_log:insert by workspace member" on public.activity_log
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.workspace_id = activity_log.workspace_id and p.id = auth.uid()
    )
  );
