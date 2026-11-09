-- Package bookings are inserted straight from the browser (anon key), so the
-- `amount`/`currency` in that insert can be tampered with (DevTools, edited
-- request, etc.). verify-tilopay-payment only checks "charged >= stored
-- amount", so a forged low stored amount would let someone pay less.
--
-- This trigger ignores whatever the client sent and copies the price from
-- travel_packages on every package insert. Custom routes (package_id null)
-- are untouched: their price is computed and inserted by the
-- custom-route-booking edge function with the service role.
begin;

create or replace function public.enforce_package_reservation_amount()
returns trigger
language plpgsql
security definer -- must read travel_packages even if the caller's RLS can't
set search_path = ''
as $$
declare
  pkg_price numeric;
  pkg_currency text;
begin
  if new.package_id is null then
    return new;
  end if;

  select p.price, p.currency
    into pkg_price, pkg_currency
    from public.travel_packages p
   where p.id = new.package_id;

  if pkg_price is null then
    raise exception 'Unknown package %', new.package_id;
  end if;

  new.amount := pkg_price;
  new.currency := pkg_currency;
  return new;
end;
$$;

revoke all on function public.enforce_package_reservation_amount() from public, anon, authenticated;

drop trigger if exists lead_requests_enforce_package_amount on public.lead_requests;
create trigger lead_requests_enforce_package_amount
before insert on public.lead_requests
for each row execute function public.enforce_package_reservation_amount();

commit;
