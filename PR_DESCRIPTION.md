Title: fix: remove hero logo priority and add development notes

Summary

- Remove `priority` from the homepage hero logo to avoid unused preload warnings in development.
- Add a short `Development Notes` section to `README.md` describing how to reproduce hydration mismatches (Incognito/no extensions) and guidance on SSR determinism.

Files changed

- `src/app/page.tsx` — removed `priority` prop from hero logo image
- `README.md` — added `Development Notes` with testing and SSR guidance

Why

- Headless capture and local dev logs showed an unused-preload warning for `/logo.svg` and hydration mismatch traces were observed in a developer environment. Removing the unnecessary preload from the hero image reduces the warning noise while preserving the header `priority` logo for above-the-fold rendering.

Testing

1. Push branch `fix/logo-preload-dev-notes` and open a PR.
2. Run local dev and visit `http://localhost:3000` in an Incognito window (no extensions). Confirm no preload warning and verify no hydration mismatch is reproduced.
3. Run `npx playwright test` or the included `scripts/headless-capture.mjs` to capture `captures/homepage-console.json` and `captures/homepage-network.json` and attach to PR if needed.

Push / PR commands (example)

```bash
# if remote origin is not configured, set it first:
# git remote add origin git@github.com:OWNER/REPO.git

# push branch
git push -u origin fix/logo-preload-dev-notes

# create PR (if GitHub CLI is available)
gh pr create --fill --title "fix: remove hero logo priority and add development notes" --body-file PR_DESCRIPTION.md --base main --head fix/logo-preload-dev-notes
```

Notes

- The repo in this environment could not push to `origin` (remote not configured or no access). Run the push commands from a machine with your remote configured and credentials.
- Next recommended steps: manual Incognito QA, SSR determinism audit (grep for `Date.now()`, `Math.random()`, `toLocaleString`), and resolve remaining ESLint warnings.
