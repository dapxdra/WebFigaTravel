# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo contains a single project, `figatravel-react/`, a React + TypeScript + Vite SPA (a marketing/booking site for a Costa Rica transfer company) with a Supabase backend. All commands below are run from `figatravel-react/`.

## Commands

```bash
npm install       # install deps
npm run dev       # start Vite dev server
npm run lint      # eslint .
npm run build     # tsc -b && vite build (type-check + production build)
npm run preview   # preview the production build
```

There is no test runner configured in this project. After any code change, run `npm run lint` and `npm run build` — both must pass before considering a change done.

Windows note: in PowerShell, prefer `npm.cmd` over `npm` to avoid execution policy issues.

## Architecture

The app follows a hexagonal/clean-architecture layering under `src/`:

- `domain/` — entities, repository interfaces (ports), and use-cases (business rules). Framework-agnostic, no React or Supabase imports.
- `application/bootstrap/container.ts` — the single place where use-cases are wired to concrete infrastructure repositories (manual DI, no framework). Add new use-case/repository pairs here.
- `infrastructure/supabase/` — concrete adapters implementing the domain repository interfaces via Supabase. `supabaseClient.ts` centralizes client creation; all other files in this folder must reuse it rather than creating ad hoc clients.
- `presentation/` — React: `pages/` (route-level), `components/` (reusable UI, including `components/payment/` for the Tilopay checkout flow), `hooks/` (view-model hooks that orchestrate use-cases for a page), and `auth/` (Supabase-backed auth context/provider and route guards).
- `shared/config/env.ts` — typed access to `import.meta.env` (`VITE_`-prefixed vars) and `hasSupabaseConfig` guard.

Keep layer boundaries intact: UI logic in presentation hooks/components, business rules in domain use-cases, and IO in infrastructure repositories. Don't move business logic into presentation files.

Routing is composed in `src/App.tsx` (`react-router-dom`, `BrowserRouter`). Shared nav/footer is `SiteLayout.tsx`, wrapping most routes; `/admin` is wrapped in `AdminGuard`. Routes:

- `/` Home, `/destinations`, `/destinations/:slug`, `/book-online` (reservation + Tilopay payment), `/pago/respuesta` (payment result, verified server-side), `/faq`, `/about-us`, `/contact`, `/admin` (guarded), `/auth/reset-password` (outside `SiteLayout`).

### Supabase

- Env vars must be `VITE_`-prefixed to be exposed to the browser build: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (see `.env.example`).
- Repositories map Supabase rows to domain entities and throw user-facing errors. Several repositories fall back to mock data / no-op when Supabase env vars are absent (demo mode) — preserve that fallback unless a task explicitly requires real-only behavior.
- SQL schema/policies live inline in `README.md`; migrations under `supabase/migrations/` are additive (Tilopay payment fields, RLS policy tweaks). Edge Functions live under `supabase/functions/` (`get-tilopay-token`, `verify-tilopay-payment`) — these run on Deno, not the Vite/browser toolchain, and are excluded from ESLint (`eslint.config.js` ignores `supabase/functions`).
- Admin panel behavior depends on Supabase RLS policies; without auth or correct policies expect authorization errors.

### Auth

- Auth state is centralized in `presentation/auth/AuthProvider.tsx`; route protection in `presentation/auth/AdminGuard.tsx`. Don't duplicate auth state elsewhere.
- Supports email/password login and optional Google OAuth for `/admin`, plus password recovery via `/auth/reset-password`. OAuth redirects are origin-based (`window.location.origin`), so Supabase provider redirect settings must include every deployed origin.

### Payments (Tilopay)

- Payment flow uses the Tilopay embeddable SDK client-side only — never the server-to-server API directly, and Tilopay credentials (`TILOPAY_API_USER/PASSWORD/KEY`) live only as Supabase Edge Function secrets, never in the frontend or `VITE_` vars.
- `CreatePendingReservation`, `GetTilopaySdkToken`, `VerifyTilopayPayment` use-cases + `SupabaseReservationRepository` implement the flow; SDK loading lives in `presentation/lib/tilopaySdk.ts`, checkout UI in `presentation/components/payment/`.
- The redirect URL passed to `Tilopay.InitTokenize` is built at runtime as `window.location.origin + '/pago/respuesta'`, so it works unmodified on localhost, Vercel previews, and production.
- Only the service role (used by Edge Functions) can mark a reservation `paid`/`failed`; the anon/authenticated insert policy only allows `status = 'pending'`.
- Frontend needs non-secret `VITE_TILOPAY_SDK_URL` and `VITE_TILOPAY_JQUERY_URL` env vars.

## Conventions

- TypeScript strict mode is enabled; keep type-only imports where applicable.
- Keep all user-facing copy (labels, placeholders, errors, success messages) in English — the site is a visual clone of the Figa Travel marketing site.
- Reuse existing CSS classes/patterns in `src/index.css` before adding new ones; avoid CSS-in-JS or new styling systems. Preserve existing breakpoints.
- Prefer small, local, minimal-diff edits over broad rewrites or unrelated refactors.
- Never hardcode secrets or service-role keys in source.

## Deployment

Deploys to Vercel as a static Vite build (build command `npm run build`, output dir `dist`). Vercel project env vars must include `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (and the Tilopay `VITE_` vars above). Supabase Edge Function secrets are configured separately via `supabase secrets set ...` / `supabase functions deploy <name>` and are not part of the Vercel build.
