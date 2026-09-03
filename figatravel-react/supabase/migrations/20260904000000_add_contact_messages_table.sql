-- Optional audit trail for the public contact form. The send-contact-email
-- edge function writes here with the service role after the email is sent;
-- the write is best-effort and never blocks the response.
--
-- No anon/authenticated policies are added on purpose: browsers must go
-- through the edge function, never touch this table directly. RLS stays on
-- with zero permissive policies, so only the service role can read/write.
begin;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

commit;
