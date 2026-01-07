# Changelog

## 2026-01-07 — Fixes & cleanup

### Fixed
- Remove `priority` from homepage hero logo to avoid unused preload warning.
- Replace server-side time-based slug suffixes (`Date.now()`) with short `randomUUID`-based suffixes for deterministic SSR behavior.
- Replace client `Math.random()` toast IDs with a `crypto.getRandomValues`-based short id.
- Added a dev-only analytics blocker (no-op) in `src/app/layout.tsx` to avoid ERR_CONNECTION_REFUSED noise during development.
- Added `Development Notes` to `README.md` documenting hydration mismatch reproduction steps and preload guidance.
- Created `scripts/headless-capture.mjs` to capture HAR and console logs using Playwright.

### Cleanup
- Addressed multiple ESLint warnings across scripts and server routes (unused vars, catch params).
- Ensured TypeScript checks pass (`npx tsc --noEmit`).
- Verified production build (`npm run build`) completes successfully.

### Notes
- Branch: `fix/logo-preload-dev-notes` (committed locally). Remote push not configured in this environment.
- Next actions: push branch and open PR, manual Incognito QA to confirm hydration mismatch not caused by extensions, and merge/deploy to staging.
