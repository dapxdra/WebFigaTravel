---
name: "Vercel Predeploy Check"
description: "Run a Vercel-focused predeploy check for this Vite + Supabase app. Use when verifying build output, VITE env vars, SPA assumptions, and OAuth/Supabase deployment readiness."
argument-hint: "Optional deployment target or issue to double-check"
agent: "agent"
tools: [read, search, execute]
---
Run a focused predeploy check for this repository before Vercel deployment.

Check these items:
- `npm run build` status and whether the output targets `dist/`
- Whether the app depends on `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Whether recent code changes assume Supabase is configured or support mock fallback
- Whether SPA routing assumptions are still valid for Vercel static hosting
- Whether Google OAuth redirect behavior in [src/presentation/auth/AuthProvider.tsx](../../src/presentation/auth/AuthProvider.tsx) needs matching deployed origins in Supabase
- Any obvious mismatch between project docs in [README.md](../../README.md) and current code/config

Output format:
1. Ready / Not Ready
2. Findings
3. Required env vars
4. Deployment risks
5. Recommended next action
