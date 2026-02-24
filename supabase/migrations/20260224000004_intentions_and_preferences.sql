-- Intentions table for cloud sync
create table intentions (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  hour_id text,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index idx_intentions_user on intentions(user_id);

alter table intentions enable row level security;

create policy "Users can read own intentions"
  on intentions for select using (auth.uid() = user_id);

create policy "Users can insert own intentions"
  on intentions for insert with check (auth.uid() = user_id);

create policy "Users can update own intentions"
  on intentions for update using (auth.uid() = user_id);

create policy "Users can delete own intentions"
  on intentions for delete using (auth.uid() = user_id);

-- User preferences table for cross-device settings sync
create table user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  locale text default 'en',
  sound_enabled boolean default true,
  favorite_prayers text[] default '{}',
  updated_at timestamptz not null default now()
);

alter table user_preferences enable row level security;

create policy "Users can read own preferences"
  on user_preferences for select using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on user_preferences for insert with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on user_preferences for update using (auth.uid() = user_id);
