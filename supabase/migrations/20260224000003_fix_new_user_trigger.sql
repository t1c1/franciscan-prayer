-- Fix the new user trigger to handle edge cases
-- The original trigger may fail if profile already exists or email is null

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, sign_up_at, last_active_at)
  values (
    new.id,
    coalesce(new.email, new.raw_user_meta_data->>'email'),
    now(),
    now()
  )
  on conflict (id) do update set
    email = coalesce(excluded.email, profiles.email),
    last_active_at = now();
  return new;
end;
$$ language plpgsql security definer;
