-- View: user stats for admin dashboard
create or replace view user_stats as
select
  p.id as user_id,
  p.email,
  p.role,
  p.sign_up_at,
  p.last_active_at,
  coalesce(sum(pc.pater_count), 0)::int as total_paters,
  count(distinct pc.date)::int as active_days
from profiles p
left join prayer_completions pc on pc.user_id = p.id
group by p.id, p.email, p.role, p.sign_up_at, p.last_active_at;

-- RPC: admin-only access to user stats
create or replace function get_admin_user_stats()
returns setof user_stats as $$
begin
  if not is_admin() then
    raise exception 'Access denied: admin role required';
  end if;
  return query select * from user_stats;
end;
$$ language plpgsql security definer stable;
