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
- /book-online: Reserva online + pago con Tilopay SDK
- /pago/respuesta: Resultado del pago (verificado contra Tilopay)
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
begin;

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
  user_id uuid references auth.users(id),
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

create unique index if not exists transfer_availability_package_date_idx
  on public.transfer_availability (package_id, date);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'lead_requests_availability_slot_id_fkey'
  ) then
    alter table public.lead_requests
      add constraint lead_requests_availability_slot_id_fkey
      foreign key (availability_slot_id)
      references public.transfer_availability(id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'lead_requests'
      and column_name = 'user_id'
  ) then
    alter table public.lead_requests
      add column user_id uuid references auth.users(id);
  end if;
end $$;

alter table public.travel_packages enable row level security;
alter table public.lead_requests enable row level security;
alter table public.transfer_availability enable row level security;

drop policy if exists "public_can_read_featured_packages" on public.travel_packages;
create policy "public_can_read_featured_packages"
on public.travel_packages
for select
to anon
using (is_featured = true);

drop policy if exists "public_can_read_all_packages" on public.travel_packages;
create policy "public_can_read_all_packages"
on public.travel_packages
for select
to anon
using (true);

drop policy if exists "authenticated_can_read_all_packages" on public.travel_packages;
create policy "authenticated_can_read_all_packages"
on public.travel_packages
for select
to authenticated
using (true);

drop policy if exists "public_can_insert_lead_requests" on public.lead_requests;
create policy "public_can_insert_lead_requests"
on public.lead_requests
for insert
to anon
with check (true);

drop policy if exists "public_can_read_transfer_availability" on public.transfer_availability;
create policy "public_can_read_transfer_availability"
on public.transfer_availability
for select
to anon
using (true);

drop policy if exists "authenticated_can_read_leads" on public.lead_requests;
create policy "authenticated_can_read_leads"
on public.lead_requests
for select
to authenticated
using (true);

drop policy if exists "authenticated_can_update_packages" on public.travel_packages;
create policy "authenticated_can_update_packages"
on public.travel_packages
for update
to authenticated
using (true)
with check (true);

-- Optional hard reset before seeding fresh data:
truncate table public.lead_requests restart identity;
truncate table public.transfer_availability;
truncate table public.travel_packages;

-- Routes shown in Book Online:
insert into public.travel_packages
  (id, title, destination, duration_days, price, currency, image_url, description, is_featured)
values
  ('lf-sjo-airport', 'La Fortuna - San Jose Airport', 'San Jose, Costa Rica', 1, 175, 'USD', 'https://images.unsplash.com/photo-1552465881-721a37ffaf1f?auto=format&fit=crop&w=1200&q=80', 'Private transfer to San Jose Airport (3 hr).', true),
  ('lf-sjo-downtown', 'La Fortuna - San Jose Downtown', 'San Jose, Costa Rica', 1, 207, 'USD', 'https://images.unsplash.com/photo-1552465881-721a37ffaf1f?auto=format&fit=crop&w=1200&q=80', 'Private transfer to downtown San Jose (3 hr 30 min).', true),
  ('lf-liberia', 'La Fortuna - Liberia Airport', 'Liberia, Costa Rica', 1, 188, 'USD', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Liberia Airport (3 hr).', true),
  ('lf-papagayo', 'La Fortuna - Papagayo', 'Papagayo, Costa Rica', 1, 230, 'USD', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Papagayo luxury resorts (3 hr 30 min).', true),
  ('lf-tamarindo', 'La Fortuna - Tamarindo', 'Tamarindo, Costa Rica', 1, 278, 'USD', 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Tamarindo surf beach (4 hr).', true),
  ('lf-poas', 'La Fortuna - Poas', 'Poas, Costa Rica', 1, 219, 'USD', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Poas volcano area (1 hr 45 min).', true),
  ('lf-jaco', 'La Fortuna - Jaco', 'Jaco, Costa Rica', 1, 207, 'USD', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Jaco beach town (4 hr).', true),
  ('lf-manuel', 'La Fortuna - Manuel Antonio', 'Manuel Antonio, Costa Rica', 1, 279, 'USD', 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Manuel Antonio national park (5 hr).', true),
  ('lf-rio-celeste', 'La Fortuna - Rio Celeste', 'Rio Celeste, Costa Rica', 1, 170, 'USD', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Rio Celeste waterfall (1 hr 30 min).', true),
  ('lf-guanacaste', 'La Fortuna - Guanacaste', 'Guanacaste, Costa Rica', 1, 218, 'USD', 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?auto=format&fit=crop&w=1200&q=80', 'Private transfer across Guanacaste (3 hr 30 min).', true),
  ('lf-bajos', 'La Fortuna - Bajos del Toro', 'Bajos del Toro, Costa Rica', 1, 145, 'USD', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Bajos del Toro (1 hr 45 min).', true),
  ('lf-monteverde', 'La Fortuna - Monteverde', 'Monteverde, Costa Rica', 1, 215, 'USD', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Monteverde cloud forest (3 hr).', true),
  ('lf-montezuma', 'La Fortuna - Montezuma', 'Montezuma, Costa Rica', 1, 215, 'USD', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Montezuma beach town (5 hr 30 min).', true),
  ('lf-dreams', 'La Fortuna - Dreams Las Mareas', 'Las Mareas, Costa Rica', 1, 376, 'USD', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Dreams Las Mareas resort (4 hr).', true),
  ('lf-catalinas', 'La Fortuna - Las Catalinas', 'Las Catalinas, Costa Rica', 1, 266, 'USD', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Las Catalinas beach community (4 hr).', true),
  ('lf-riu', 'La Fortuna - Riu Hotels', 'Guanacaste, Costa Rica', 1, 225, 'USD', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Riu all-inclusive hotels (3 hr 30 min).', true),
  ('lf-samara', 'La Fortuna - Samara', 'Samara, Costa Rica', 1, 328, 'USD', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Samara beach (4 hr 30 min).', true),
  ('lf-puerto-viejo', 'La Fortuna - Puerto Viejo', 'Puerto Viejo, Costa Rica', 1, 352, 'USD', 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Caribbean Puerto Viejo (5 hr).', true),
  ('lf-sarapiqui', 'La Fortuna - Sarapiqui', 'Sarapiqui, Costa Rica', 1, 135, 'USD', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', 'Private transfer to Sarapiqui river area (1 hr 30 min).', true)
on conflict (id) do update
set
  title = excluded.title,
  destination = excluded.destination,
  duration_days = excluded.duration_days,
  price = excluded.price,
  currency = excluded.currency,
  image_url = excluded.image_url,
  description = excluded.description,
  is_featured = excluded.is_featured;

-- Date availability (one row per package per date):
with availability_seed(package_id, day_offset, seats_available) as (
  values
    ('lf-sjo-airport',  1, 6), ('lf-sjo-airport',  2, 6), ('lf-sjo-airport',  3, 6),
    ('lf-sjo-downtown', 1, 6), ('lf-sjo-downtown', 2, 6), ('lf-sjo-downtown', 3, 6),
    ('lf-liberia',      1, 6), ('lf-liberia',      2, 6), ('lf-liberia',      3, 6),
    ('lf-papagayo',     1, 6), ('lf-papagayo',     2, 6), ('lf-papagayo',     3, 6),
    ('lf-tamarindo',    1, 6), ('lf-tamarindo',    2, 6), ('lf-tamarindo',    3, 6),
    ('lf-poas',         1, 6), ('lf-poas',         2, 6), ('lf-poas',         3, 6),
    ('lf-jaco',         1, 6), ('lf-jaco',         2, 6), ('lf-jaco',         3, 6),
    ('lf-manuel',       1, 6), ('lf-manuel',       2, 6), ('lf-manuel',       3, 6),
    ('lf-rio-celeste',  1, 6), ('lf-rio-celeste',  2, 6), ('lf-rio-celeste',  3, 6),
    ('lf-guanacaste',   1, 6), ('lf-guanacaste',   2, 6), ('lf-guanacaste',   3, 6),
    ('lf-bajos',        1, 6), ('lf-bajos',        2, 6), ('lf-bajos',        3, 6),
    ('lf-monteverde',   1, 6), ('lf-monteverde',   2, 6), ('lf-monteverde',   3, 6),
    ('lf-montezuma',    1, 6), ('lf-montezuma',    2, 6), ('lf-montezuma',    3, 6),
    ('lf-dreams',       2, 4), ('lf-dreams',       3, 4), ('lf-dreams',       4, 4),
    ('lf-catalinas',    1, 6), ('lf-catalinas',    2, 6), ('lf-catalinas',    3, 6),
    ('lf-riu',          1, 6), ('lf-riu',          2, 6), ('lf-riu',          3, 6),
    ('lf-samara',       2, 4), ('lf-samara',       3, 4), ('lf-samara',       4, 4),
    ('lf-puerto-viejo', 2, 4), ('lf-puerto-viejo', 3, 4), ('lf-puerto-viejo', 4, 4),
    ('lf-sarapiqui',    1, 6), ('lf-sarapiqui',    2, 6), ('lf-sarapiqui',    3, 6)
), normalized as (
  select
    package_id,
    current_date + day_offset as date,
    seats_available,
    format('av-%s-%s', package_id, to_char(current_date + day_offset, 'YYYYMMDD')) as id
  from availability_seed
)
insert into public.transfer_availability (id, package_id, date, seats_available)
select id, package_id, date, seats_available from normalized
on conflict (package_id, date) do update
set seats_available = excluded.seats_available;

commit;
```

Nota: El panel /admin usa permisos de lectura/escritura segun politicas RLS.
Sin autenticacion o sin esas politicas, podras ver errores de autorizacion.

## Login local (email/password) + Google opcional

La app ya soporta:

- Login local con email/password en /admin.
- Login con Google (opcional, puede activarse despues).
- Recuperacion de contraseña desde /admin.

Nota: el acceso es solo para admins ya creados en Supabase Auth.

### 1) Activar login local en Supabase

En Supabase Dashboard:

1. Authentication > Providers > Email.
2. Activa Email provider.
3. Crea los usuarios admin desde Authentication > Users (si aun no existen).

### 2) Configurar URLs de redireccion

En Authentication > URL Configuration agrega:

- Site URL: tu URL principal (por ejemplo http://localhost:5173).
- Additional Redirect URLs:
  - http://localhost:5173/auth/reset-password
  - http://localhost:5173/*
  - https://TU_DOMINIO/*

### 3) (Opcional) Activar Google despues

Cuando tengas Google Cloud listo:

1. Authentication > Providers > Google.
2. Activa Google y pega Client ID/Client Secret.
3. En Google Cloud, agrega el callback de Supabase (el que te muestra Supabase).

Si Google no esta habilitado, el login local sigue funcionando sin problema.

### 4) Recuperar contraseña (flujo completo)

1. En /admin, pestaña Forgot, envia email de recuperacion.
2. Abre el link recibido por correo.
3. La app detecta modo recovery y muestra el formulario Set a new password en /auth/reset-password.
4. Actualiza la contraseña y entra al panel.

## Pagos con Tilopay (SDK)

El flujo de pago usa el SDK embebible de Tilopay, nunca la API server-to-server
directa. Las credenciales de Tilopay viven unicamente como secrets de Supabase
Edge Functions; nunca en el frontend ni en variables VITE_.

### 1) Migracion SQL

Aplica [supabase/migrations/20260730000000_add_tilopay_payment_fields.sql](supabase/migrations/20260730000000_add_tilopay_payment_fields.sql)
con `supabase db push` (o pegala en el SQL editor de Supabase). Extiende
`lead_requests` con `order_number`, `amount`, `currency`, `status` y
`tilopay_transaction_id`, y ajusta la policy de insert para que el cliente
solo pueda insertar filas con `status = 'pending'`. No hay policy de update
para `anon`/`authenticated`: solo el service role (usado por las Edge
Functions) puede marcar una reserva como `paid`/`failed`.

### 2) Secrets de Supabase (nunca en el frontend)

```bash
supabase secrets set TILOPAY_API_USER=... 
 supabase secrets set TILOPAY_API_PASSWORD=...
supabase secrets set TILOPAY_API_KEY=...
```

Usa las credenciales de sandbox mientras pruebas; cuando Tilopay te entregue
credenciales de produccion, corre los mismos comandos con los valores reales
sobre el mismo proyecto de Supabase (un solo proyecto sirve para ambos
entornos, ya que Tilopay diferencia sandbox/produccion por credencial, no por
URL).

### 3) Deploy de las Edge Functions

```bash
supabase functions deploy get-tilopay-token
supabase functions deploy verify-tilopay-payment
```

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` ya estan disponibles automaticamente
dentro de las Edge Functions; no hace falta configurarlos a mano.

### 4) Variables del frontend (no secretas)

En `.env` / Vercel, agrega la URL publica del script del SDK (la encuentras en
tu panel/documentacion de Tilopay):

```
VITE_TILOPAY_SDK_URL=https://.../tilopay-sdk.js
VITE_TILOPAY_JQUERY_URL=https://code.jquery.com/jquery-3.x.x.min.js
```

### 5) Redirect dinamico

El `redirect` que se envia a `Tilopay.InitTokenize` se arma en el navegador con
`window.location.origin + '/pago/respuesta'`, por lo que funciona igual en
`localhost`, previews de Vercel y produccion sin variables adicionales. Si
Tilopay exige registrar dominios de redirect en su panel, agrega ahi tu
dominio de produccion y el de `localhost`; para previews de Vercel confirma
con soporte de Tilopay (sac@tilopay.com) si aceptan comodines de dominio.

## Build

```bash
npm run build
```
