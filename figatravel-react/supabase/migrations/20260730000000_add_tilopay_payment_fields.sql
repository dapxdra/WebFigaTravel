-- Adds payment fields to the existing lead_requests table so it can carry
-- Tilopay reservations, without duplicating name/email/phone/travel_date/package_id.
begin;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'order_number'
  ) then
    alter table public.lead_requests add column order_number text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'amount'
  ) then
    alter table public.lead_requests add column amount numeric;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'currency'
  ) then
    alter table public.lead_requests add column currency text not null default 'USD';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'status'
  ) then
    alter table public.lead_requests add column status text not null default 'pending';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'lead_requests' and column_name = 'tilopay_transaction_id'
  ) then
    alter table public.lead_requests add column tilopay_transaction_id text;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'lead_requests_status_check'
  ) then
    alter table public.lead_requests
      add constraint lead_requests_status_check
      check (status in ('pending', 'paid', 'failed'));
  end if;
end $$;

create unique index if not exists lead_requests_order_number_idx
  on public.lead_requests (order_number)
  where order_number is not null;

alter table public.lead_requests enable row level security;

-- Anon can only insert rows left in 'pending' state; status can never be set to
-- 'paid'/'failed' from the client. Only the service role (used by the
-- verify-tilopay-payment edge function) can update status afterwards.
drop policy if exists "public_can_insert_lead_requests" on public.lead_requests;
create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to anon
with check (status = 'pending');

-- No update policy is defined for anon/authenticated roles: clients can never
-- change status/tilopay_transaction_id directly. Updates only happen via the
-- service role key from the verify-tilopay-payment edge function.

commit;
