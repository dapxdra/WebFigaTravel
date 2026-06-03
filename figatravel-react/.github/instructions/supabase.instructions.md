---
applyTo: "src/infrastructure/supabase/**/*.ts"
description: "Use when editing Supabase repositories or client setup. Covers env handling, mock fallbacks, auth-aware errors, and repository boundaries for this Vite app."
---

# Supabase Instructions

## Scope
Applies to Supabase client setup and repository files.

## Required Runtime Assumptions
- Browser-exposed env vars must use the `VITE_` prefix.
- Expected vars are documented in [README.md](../../README.md) and implemented in [src/shared/config/env.ts](../../src/shared/config/env.ts).
- Client creation is centralized in [src/infrastructure/supabase/supabaseClient.ts](../../src/infrastructure/supabase/supabaseClient.ts); do not create ad hoc clients elsewhere.

## Repository Rules
- Keep Supabase calls inside [src/infrastructure/supabase](../../src/infrastructure/supabase).
- Preserve the current repository interface pattern: map Supabase rows to domain entities and throw user-facing errors from the repository layer.
- Keep null-client guards in place so the app can still run in mock/demo mode when env vars are missing.
- If a repository already has mock fallback behavior, do not remove it unless the task explicitly requires real-only operation.

## Auth And Wiring Notes
- Auth state is owned by [src/presentation/auth/AuthProvider.tsx](../../src/presentation/auth/AuthProvider.tsx).
- Admin route protection is enforced by [src/presentation/auth/AdminGuard.tsx](../../src/presentation/auth/AdminGuard.tsx).
- Keep dependency wiring changes inside [src/application/bootstrap/container.ts](../../src/application/bootstrap/container.ts).

## Vercel Notes
- Vercel must provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in project environment settings.
- Build output is static `dist/`; do not introduce server-only Supabase assumptions into this client app.

## Safety Rules
- Do not hardcode secrets or service-role keys.
- Do not bypass RLS assumptions in app code; if behavior depends on policies, document it and keep error messages clear.

## Validation
After Supabase/auth/config edits, run:
- npm run lint
- npm run build
