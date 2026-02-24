-- Profiles table for user tracking
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  sign_up_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins can read all profiles"
  on profiles for select
  using (is_admin());

-- Users can update their own profile (last_active_at)
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile (for upsert)
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on new user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, sign_up_at, last_active_at)
  values (new.id, new.email, now(), now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Admin read policy on prayer_completions
create policy "Admins can read all completions"
  on prayer_completions for select
  using (is_admin());
