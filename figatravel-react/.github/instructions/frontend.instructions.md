---
applyTo: "src/presentation/**/*.{ts,tsx,css}"
description: "Use when editing React presentation pages, components, hooks, or shared CSS for this Vite travel site. Covers UI structure, copy consistency, routing-aware layout work, and validation expectations."
---

# Frontend Instructions

## Scope
Applies to presentation-layer React files and shared frontend styling.

## Core Expectations
- Preserve the current site direction: a close visual clone of the Figa Travel marketing site.
- Keep all user-facing copy in English unless the task explicitly requests another language.
- Prefer small, local UI edits over broad rewrites.
- Reuse existing CSS classes and layout patterns in [src/index.css](../../src/index.css) before introducing new patterns.

## Presentation Boundaries
- Pages belong in [src/presentation/pages](../../src/presentation/pages).
- Reusable UI belongs in [src/presentation/components](../../src/presentation/components).
- Async UI orchestration belongs in [src/presentation/hooks](../../src/presentation/hooks).
- Do not move business rules or data access into presentation files; keep those in domain/application/infrastructure layers.

## Routing And Layout
- Main route composition lives in [src/App.tsx](../../src/App.tsx).
- Shared navigation/footer lives in [src/presentation/components/SiteLayout.tsx](../../src/presentation/components/SiteLayout.tsx).
- When adding or changing page-level UI, keep header/footer behavior consistent across routes.

## Styling Rules
- Primary styling lives in [src/index.css](../../src/index.css); keep style additions grouped near related sections.
- Match the existing visual language: bold marketing sections, responsive grids, and image-led layouts.
- Preserve current breakpoints and extend them only when the touched layout genuinely needs it.
- Avoid introducing CSS-in-JS or new styling systems.

## Form And UX Rules
- Keep form labels, placeholders, loading states, and success/error messages in English.
- Preserve existing accessibility basics: labels bound to controls, descriptive button text, and meaningful alt text.
- When route selection prefills a form, keep the behavior deterministic and easy to validate.

## Validation
After frontend edits, run:
- npm run lint
- npm run build
