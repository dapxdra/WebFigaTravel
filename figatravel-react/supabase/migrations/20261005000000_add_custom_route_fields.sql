-- Custom door-to-door routes (priced by km in the custom-route-booking edge
-- function) are not tied to a travel package, so package_id becomes optional.
-- `children` and `distance_km` let the FIGA sync and the admin panel see the
-- passenger split and the distance the price was computed from.
begin;

alter table public.lead_requests
  alter column package_id drop not null;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'children'
  ) then
    alter table public.lead_requests add column children integer not null default 0;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'distance_km'
  ) then
    alter table public.lead_requests add column distance_km numeric;
  end if;
end $$;

-- Only the service role (custom-route-booking) may insert custom routes:
-- browser inserts must still reference a package, so nobody can create an
-- unpriced/arbitrarily priced package-less reservation with the anon key.
drop policy if exists "public_can_insert_lead_requests" on public.lead_requests;
create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to public
with check (status = 'pending' and package_id is not null and distance_km is null);

commit;
