# Lighthouse Audit Guide

This file contains quick steps and a remediation checklist to run Lighthouse audits for the Rumah Aletheia site.

Prerequisites
- Chrome (stable) installed on your machine
- Optional: `lighthouse` CLI (`npm i -g lighthouse`) or use Chrome DevTools

Run Lighthouse via Chrome DevTools (recommended for one-off audits):
1. Open Chrome and navigate to https://academos.or.id (or your staging URL).
2. Open DevTools (F12) → Lighthouse tab.
3. Select Mobile or Desktop and choose categories (Performance, Accessibility, Best Practices, SEO).
4. Click "Generate report" and wait for results.

Run Lighthouse CLI (headless):
```bash
# Install once (global)
npm i -g lighthouse

# Run mobile audit and save report
lighthouse https://academos.or.id --preset=mobile --output=html --output-path=./lighthouse-report-mobile.html

# Desktop
lighthouse https://academos.or.id --preset=desktop --output=html --output-path=./lighthouse-report-desktop.html
```

Checklist & Remediations
- Performance
  - [ ] Image optimization: replace placeholders with optimized WebP/AVIF; ensure `width` and `height` set
  - [ ] Enable Next.js image optimization where appropriate and add `priority` for hero images
  - [ ] Use `loading="lazy"` for below-the-fold images
  - [ ] Remove render-blocking third-party scripts
  - [ ] Audit Largest Contentful Paint (LCP) and avoid large layout shifts

- Accessibility
  - [ ] Ensure all images have meaningful `alt` text
  - [ ] Verify heading hierarchy (H1 → H2 → H3)
  - [ ] Ensure color contrast meets WCAG AA (4.5:1) for body text
  - [ ] Add `aria-label` for icon-only buttons and ensure keyboard focus styles

- Best Practices
  - [ ] Remove console.log from production bundles
  - [ ] Serve assets with appropriate cache headers via NGINX
  - [ ] Ensure valid HTTPS and no mixed content

- SEO
  - [ ] Verify unique titles & meta descriptions for each page
  - [ ] Add structured data (JSON-LD) for articles, events, books
  - [ ] Verify `sitemap.xml` and submit to Search Console

Notes
- Use the Lighthouse HTML reports to locate exact issues and prioritize fixes.
- If running the CLI on the VPS, ensure Chrome is installed or use `--chrome-flags="--headless"` and a headless Chromium binary.

Contact
If you want, I can prepare automated Lighthouse runs (CI job) or help remediate the top 5 performance issues after you run the audit and share the report.
