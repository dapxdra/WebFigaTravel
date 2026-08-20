-- Defensive fix: allow both guest (anon) and signed-in (authenticated)
-- visitors to create pending reservations. If a customer has an active
-- Supabase Auth session (e.g. after visiting /admin) while booking, the
-- anon-only policy silently rejected the insert with 42501.
begin;

drop policy if exists "public_can_insert_lead_requests" on public.lead_requests;
create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to anon, authenticated
with check (status = 'pending');

commit;
