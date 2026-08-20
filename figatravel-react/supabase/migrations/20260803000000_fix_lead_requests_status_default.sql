-- Corrective fix: an earlier partial run left `status` without its default,
-- so new inserts got status=NULL and were rejected by the insert RLS policy
-- (`with check (status = 'pending')`). This forces the default and backfills.
begin;

alter table public.lead_requests
  alter column status set default 'pending';

update public.lead_requests
  set status = 'pending'
  where status is null;

alter table public.lead_requests
  alter column status set not null;

commit;
