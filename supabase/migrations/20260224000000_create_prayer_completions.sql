-- Prayer completions table for cloud sync
create table prayer_completions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  hour_id text not null,
  pater_count integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, date, hour_id)
);

-- Index for fast lookups
create index idx_prayer_completions_user_date on prayer_completions(user_id, date);

-- RLS: users can only see/modify their own data
alter table prayer_completions enable row level security;

create policy "Users can read their own completions"
  on prayer_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own completions"
  on prayer_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own completions"
  on prayer_completions for update
  using (auth.uid() = user_id);
