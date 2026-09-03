-- Adds pickup/dropoff/time detail to lead_requests so a paid reservation
-- carries enough data to sync into the FIGA operations system (Firestore)
-- via the verify-tilopay-payment edge function.
begin;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'pickup_time'
  ) then
    alter table public.lead_requests add column pickup_time text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'pickup_location'
  ) then
    alter table public.lead_requests add column pickup_location text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'dropoff_location'
  ) then
    alter table public.lead_requests add column dropoff_location text;
  end if;
end $$;

commit;
