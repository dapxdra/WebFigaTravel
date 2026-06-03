---
applyTo: "src/presentation/auth/**/*.{ts,tsx}"
description: "Use when editing auth context or route guards. Covers OAuth redirects, auth ownership, and keeping auth logic centralized."
---

# Auth And Config Instructions

## Scope
Applies to auth context and guard files.

## Rules
- Keep auth state centralized in [src/presentation/auth/AuthProvider.tsx](../../src/presentation/auth/AuthProvider.tsx).
- Keep guarded-route logic in [src/presentation/auth/AdminGuard.tsx](../../src/presentation/auth/AdminGuard.tsx).
- If changing OAuth redirects, ensure the new path still matches deployed Supabase provider settings.
- Never hardcode secret values in source.
- Keep user-facing auth errors in English.

## Related Files
- Environment parsing: [src/shared/config/env.ts](../../src/shared/config/env.ts)
- Dependency wiring: [src/application/bootstrap/container.ts](../../src/application/bootstrap/container.ts)

## Validation
After auth edits, run:
- npm run lint
- npm run build
