-- The named-role restriction (anon, authenticated) didn't match the actual
-- Postgres role used by requests signed with the newer sb_publishable_/
-- sb_secret_ Supabase API keys, causing every insert to be rejected by RLS
-- even though a direct `set role anon;` insert succeeded. Drop the role
-- restriction and rely solely on the WITH CHECK for security.
begin;

drop policy if exists "public_can_insert_lead_requests" on public.lead_requests;
create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to public
with check (status = 'pending');

commit;
