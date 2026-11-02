-- Editable pricing rules for custom door-to-door routes (custom-route-booking
-- edge function). Single row (id = 1) edited from /admin.
--
-- Model (all from the 5-passenger vehicle):
--   * 3 distance tiers with a USD/km rate each; after tier3_max_km the price
--     stops growing (top fare).
--   * 6-8 and 9-18 passenger vehicles = 5-passenger price x multiplier.
--
-- The edge function reads this with the service role; browsers never send a
-- price. Check constraints keep the values sane even if someone bypasses the
-- admin form validation.
begin;

create table if not exists public.custom_route_pricing (
  id smallint primary key default 1 check (id = 1),
  tier1_max_km numeric(6,1) not null check (tier1_max_km > 0),
  tier1_rate numeric(6,2) not null check (tier1_rate > 0 and tier1_rate <= 20),
  tier2_max_km numeric(6,1) not null,
  tier2_rate numeric(6,2) not null check (tier2_rate > 0 and tier2_rate <= 20),
  tier3_max_km numeric(6,1) not null check (tier3_max_km <= 1000),
  tier3_rate numeric(6,2) not null check (tier3_rate > 0 and tier3_rate <= 20),
  medium_group_multiplier numeric(5,3) not null check (medium_group_multiplier >= 1),
  large_group_multiplier numeric(5,3) not null check (large_group_multiplier <= 5),
  minimum_fare numeric(8,2) not null default 0 check (minimum_fare >= 0 and minimum_fare <= 1000),
  updated_at timestamptz not null default now(),
  updated_by uuid,
  constraint custom_route_pricing_tiers_ordered
    check (tier1_max_km < tier2_max_km and tier2_max_km < tier3_max_km),
  constraint custom_route_pricing_multipliers_ordered
    check (large_group_multiplier >= medium_group_multiplier)
);

-- Empty-seat discounts were dropped from the model; remove the columns if an
-- earlier draft of this migration already created them.
alter table public.custom_route_pricing
  drop column if exists small_empty_seat_discount_pct,
  drop column if exists medium_empty_seat_discount_pct,
  drop column if exists large_empty_seat_discount_pct;

-- Defaults: 5 pax = $216 @120 km, $350 @250 km, $415 from 280 km.
insert into public.custom_route_pricing (
  id, tier1_max_km, tier1_rate, tier2_max_km, tier2_rate, tier3_max_km, tier3_rate,
  medium_group_multiplier, large_group_multiplier, minimum_fare
)
values (1, 120, 1.80, 250, 1.03, 280, 2.17, 1.128, 1.371, 0)
on conflict (id) do nothing;

-- Audit: who changed the prices and when (set server-side, not by the client).
create or replace function public.touch_custom_route_pricing()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists custom_route_pricing_touch on public.custom_route_pricing;
create trigger custom_route_pricing_touch
before update on public.custom_route_pricing
for each row execute function public.touch_custom_route_pricing();

alter table public.custom_route_pricing enable row level security;

-- Same admin model as travel_packages: signed-in users are admins. No insert
-- or delete policies: the single row can only be edited.
drop policy if exists "authenticated_can_read_custom_route_pricing" on public.custom_route_pricing;
create policy "authenticated_can_read_custom_route_pricing"
on public.custom_route_pricing
for select
to authenticated
using (true);

drop policy if exists "authenticated_can_update_custom_route_pricing" on public.custom_route_pricing;
create policy "authenticated_can_update_custom_route_pricing"
on public.custom_route_pricing
for update
to authenticated
using (id = 1)
with check (id = 1);

commit;
