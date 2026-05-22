# Figa Travel React

Proyecto base en React + TypeScript con arquitectura hexagonal y conexion a Supabase.

## Arquitectura

La app esta organizada en capas:

- domain: entidades, puertos (repositorios), casos de uso.
- application: composicion de dependencias y contenedor.
- infrastructure: adaptadores concretos (Supabase).
- presentation: React (UI + hooks/view-model).
- shared: configuracion transversal.

## Rutas principales

- /: Home
- /destinations: Destinos
- /destinations/:slug: Detalle por destino
- /book-online: Reserva online
- /faq: Preguntas frecuentes
- /about-us: Sobre nosotros
- /contact: Contacto
- /admin: Panel admin basico

Las vistas estan en src/presentation/pages.

## Requisitos

- Node 20+
- npm
- Proyecto Supabase (opcional para modo demo)

## Ejecutar local

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo de variables de entorno:

```bash
cp .env.example .env
```

3. Completa en .env:

```bash
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

4. Inicia el proyecto:

```bash
npm run dev
```

Si no configuras Supabase, los paquetes destacados se cargan desde mock local.

## Script SQL sugerido para Supabase

```sql
create table if not exists public.travel_packages (
  id text primary key,
  title text not null,
  destination text not null,
  duration_days integer not null,
  price numeric not null,
  currency text not null default 'MXN',
  image_url text not null,
  description text not null,
  is_featured boolean not null default true
);

create table if not exists public.lead_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  travel_date date,
  travelers integer not null,
  message text,
  package_id text not null references public.travel_packages(id),
  availability_slot_id text,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.transfer_availability (
  id text primary key,
  package_id text not null references public.travel_packages(id),
  date date not null,
  seats_available integer not null,
  price_override numeric
);

alter table public.lead_requests
  add constraint if not exists lead_requests_availability_slot_id_fkey
  foreign key (availability_slot_id)
  references public.transfer_availability(id);

alter table public.travel_packages enable row level security;
alter table public.lead_requests enable row level security;
alter table public.transfer_availability enable row level security;

create policy "public_can_read_featured_packages"
on public.travel_packages
for select
to anon
using (is_featured = true);

create policy "public_can_read_all_packages"
on public.travel_packages
for select
to anon
using (true);

create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to anon
with check (true);

create policy "public_can_read_transfer_availability"
on public.transfer_availability
for select
to anon
using (true);

create policy "authenticated_can_read_leads"
on public.lead_requests
for select
to authenticated
using (true);

create policy "authenticated_can_update_packages"
on public.travel_packages
for update
to authenticated
using (true)
with check (true);
```

Nota: El panel /admin usa permisos de lectura/escritura segun politicas RLS.
Sin autenticacion o sin esas politicas, podras ver errores de autorizacion.

## Build

```bash
npm run build
```
