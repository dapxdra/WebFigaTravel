# AGENTS

## Scope
These instructions apply to the full repository.

## Project Focus
- Web application: React 19 + TypeScript + Vite SPA.
- Data/auth backend: Supabase client-side integration.
- Deployment target: Vercel static hosting for Vite output.

## Fast Start For Agents
- Install: npm install
- Dev server: npm run dev
- Lint: npm run lint
- Build: npm run build
- Preview production build: npm run preview

Windows note:
- In PowerShell, prefer npm.cmd instead of npm to avoid execution policy issues.

## Architecture Map
- Routing shell: [src/App.tsx](src/App.tsx)
- Shared layout/navigation: [src/presentation/components/SiteLayout.tsx](src/presentation/components/SiteLayout.tsx)
- Presentation pages: [src/presentation/pages](src/presentation/pages)
- View-model hooks: [src/presentation/hooks](src/presentation/hooks)
- Domain entities/use-cases/ports: [src/domain](src/domain)
- Dependency wiring: [src/application/bootstrap/container.ts](src/application/bootstrap/container.ts)
- Infrastructure adapters (Supabase): [src/infrastructure/supabase](src/infrastructure/supabase)
- Runtime env mapping: [src/shared/config/env.ts](src/shared/config/env.ts)

Use the existing layer boundaries. Keep UI logic in presentation hooks/components, business rules in domain use-cases, and IO in infrastructure repositories.

## Supabase Rules
- Required env vars (client-exposed):
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
- Client creation and env guard: [src/infrastructure/supabase/supabaseClient.ts](src/infrastructure/supabase/supabaseClient.ts)
- If env vars are missing, repository implementations may fall back to mock data or disable real operations.
- SQL tables and RLS guidance are documented in [README.md](README.md).

## Vercel Rules
- Build command: npm run build
- Output directory: dist
- Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables.
- OAuth redirect behavior is origin-based in [src/presentation/auth/AuthProvider.tsx](src/presentation/auth/AuthProvider.tsx). Ensure Supabase provider redirect settings include deployed origins.

## Coding Conventions In This Repo
- TypeScript strict mode is enabled. Keep type-only imports where needed.
- Follow existing file/folder naming and avoid moving layers unless requested.
- Prefer minimal patches and avoid unrelated refactors.
- Preserve current UX copy language (English) unless the task explicitly asks otherwise.

## Validation Expectations
After edits, run:
- npm run lint
- npm run build

If a change is scoped to one feature, still ensure these two commands pass before finishing.

## Common Pitfalls
- Auth-only screens require Supabase session and configured OAuth provider.
- Admin workflows depend on Supabase RLS and proper policies.
- Missing VITE_ prefix on env vars will make values unavailable in the browser build.

## Reference Docs
- Project setup, routes, SQL, and policies: [README.md](README.md)
- Tooling scripts and dependencies: [package.json](package.json)
- Vite config entry: [vite.config.ts](vite.config.ts)
