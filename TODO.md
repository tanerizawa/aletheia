# TODO - Rumah Aletheia Website

**Last Updated**: January 5, 2026  
**Status**: Phase 5 Completed (70% → 85%)  
**Production URL**: https://academos.or.id

---

## ✅ COMPLETED (Todos #1-5)

### 1. Production Checklist Updated ✅
- [x] Updated PRODUCTION_CHECKLIST.md with actual deployment status
- [x] Marked all VPS deployment steps as complete
- [x] Updated version to 2.0.0 (DEPLOYED & LIVE)
- [x] Added production URL and PM2 status

### 2. StatsShowcase Component Created ✅
- [x] Created `/src/components/StatsShowcase.tsx` (102 lines)
- [x] Animated counter component with 2-second duration
- [x] 4 stats cards: Books (8000), Members (2500+), Visitors (500+/month), Events (50+/year)
- [x] Hover effects and SSR handling
- [x] Successfully imported in homepage

### 3. Image Directory Structure Setup ✅
- [x] Created `/public/images/ebooks/covers/`
- [x] Created `/public/images/articles/covers/`
- [x] Created `/public/images/events/covers/`
- [x] Created `/public/images/events/photos/`
- [x] Added comprehensive README.md with usage guidelines
- [x] Currently using emoji placeholders

### 4. Search Functionality Implemented ✅
- [x] Created `/src/app/baca/search/page.tsx` (160+ lines)
  - Grid layout with 4 columns
  - Empty state with category quick links
  - Not found state with back button
- [x] Created `/src/app/artikel/search/page.tsx` (180+ lines)
  - List layout for better article previews
  - Category icons and full metadata display
  - 8 category quick links in empty state
- [x] Updated search bars in `/baca` and `/artikel` pages to use actual forms
- [x] Helper functions: `searchEbooks()` and `searchArticles()`

### 5. Detail Pages Created ✅
- [x] `/src/app/artikel/[slug]/page.tsx` (300+ lines)
  - Markdown content renderer (headings, lists, bold, italic, links)
  - Author bio section
  - Related articles grid (3 items)
  - Tags display
  - Like & share buttons
  - Breadcrumb navigation
  - Metadata generation for SEO
  
- [x] `/src/app/kegiatan/[slug]/page.tsx` (270+ lines, client component)
  - Event status badge (Upcoming/Ongoing/Past)
  - Registration button with capacity tracking
  - Photo gallery with lightbox modal
  - Related events (upcoming only)
  - Date, time, location metadata
  - Organizer information
  
- [x] `/src/app/baca/[id]/page.tsx` (250+ lines)
  - Sticky book cover sidebar
  - Rating display (star visualization)
  - Download & read buttons
  - Book details grid (publisher, year, pages, format, language, filesize)
  - Description section
  - Tags display
  - Related books grid (4 items)
  - Stats: views and downloads

- [x] Added helper functions to data files:
  - `getEbookById()`, `getRelatedEbooks()` in `/src/data/ebooks.ts`
  - `getArticleBySlug()`, `getRelatedArticles()` in `/src/data/articles.ts`
  - Used existing `getEventBySlug()`, `getUpcomingEvents()` from `/src/data/events.ts`

---

## 🔄 REMAINING WORK (Todos #6-8)

### 6. Google Analytics Configuration ⚠️ LOW PRIORITY
**Issue**: ERR_CONNECTION_REFUSED  
**Possible Causes**:
- GA script might be blocked by firewall/VPS
- GA4 measurement ID might be incorrect
- Script loading before network ready

**Action Items**:
- [ ] Verify GA4 measurement ID in layout.tsx
- [ ] Check VPS firewall rules for Google Analytics domains
- [ ] Test GA script loading in production console
- [ ] Consider alternative: Plausible Analytics (privacy-friendly, self-hostable)
- [ ] Or use Umami (open-source, self-hosted)

**Files to Check**:
- `/src/app/layout.tsx` - Google Analytics script tag
- NGINX config - Check if blocking analytics domains

**Notes**: Not critical for site functionality. Analytics can be added later or use alternative solution.

---

### 7. Complete Content for Coming-Soon Pages 📝 MEDIUM PRIORITY
**Current Status**: 5 pages showing professional "Coming Soon" placeholders

**Pages Needing Content**:
1. `/src/app/belajar/page.tsx` - Learning Hub
2. `/src/app/penelitian/page.tsx` - Research Studio
3. `/src/app/penerbitan/page.tsx` - Publishing Store
4. `/src/app/tentang/tim/page.tsx` - Team Page
5. `/src/app/tentang/sejarah/page.tsx` - History Timeline

**Content Requirements**:

#### A. /belajar (Learning Hub)
- [ ] List of education programs (kursus, pelatihan, webinar)
- [ ] Program categories:
  - Literasi Digital
  - Keterampilan Menulis
  - Riset & Metodologi
  - Bahasa & Komunikasi
- [ ] Program structure: title, duration, level, schedule, instructor
- [ ] Registration form or contact CTA
- [ ] Testimonials (optional)

#### B. /penelitian (Research Studio)
- [ ] Research areas:
  - Sosial & Humaniora
  - Psikologi Masyarakat
  - Sejarah Lokal
  - Studi Literasi
- [ ] Research team profiles (3-5 researchers)
- [ ] Current projects (2-3 ongoing research)
- [ ] Publications list (research papers, reports)
- [ ] Research collaboration opportunities
- [ ] Contact form for research inquiries

#### C. /penerbitan (Publishing Store)
- [ ] Published books catalog (10-15 titles)
- [ ] Book categories: Fiksi, Non-Fiksi, Jurnal, Buku Anak
- [ ] Each book: cover, title, author, price, description, buy link
- [ ] Publishing services:
  - Self-Publishing Support
  - Editorial Services
  - Book Design
  - Distribution
- [ ] Submission guidelines for authors
- [ ] Contact form for publishing inquiries

#### D. /tentang/tim (Team Page)
- [ ] Organization structure chart
- [ ] Leadership team (3-5 people):
  - Odang (Kepala Lembaga PT Academos)
  - Library Director
  - Research Head
  - Publishing Manager
  - Education Coordinator
- [ ] Each profile: photo (or avatar), name, role, bio (2-3 sentences)
- [ ] Team values or culture statement
- [ ] Join us section (career opportunities)

#### E. /tentang/sejarah (History Timeline)
- [ ] Timeline entries (5-10 milestones):
  - 2024 Oct: PT Academos founded (SK AHU-038489.AH.01.30.Tahun 2024)
  - 2025 Jan: Rumah Aletheia perpustakaan established (SK 01/SK/Academos/int/X/2025)
  - 2025: First programs launched
  - 2026: Digital library launched
  - Future vision (2027-2030)
- [ ] Photos/images for each milestone (optional)
- [ ] Vision for the future section
- [ ] Impact statistics over time

**Data Structure Needed**:
- `/src/data/programs.ts` - Learning programs
- `/src/data/researchers.ts` - Research team
- `/src/data/publications.ts` - Books/journals
- `/src/data/team.ts` - Organization team members
- `/src/data/timeline.ts` - Historical milestones

**Estimated Effort**: 8-12 hours (content writing + data structuring + page updates)

---

### 8. Performance Optimization (Lighthouse Audit) 🚀 HIGH PRIORITY
**Goal**: Achieve 90+ scores on all Lighthouse metrics

**Current Status**: Not yet audited

**Action Items**:

#### A. Run Lighthouse Audit
- [ ] Open Chrome DevTools on https://academos.or.id
- [ ] Run Lighthouse audit (Desktop & Mobile)
- [ ] Record baseline scores:
  - Performance: ?/100
  - Accessibility: ?/100
  - Best Practices: ?/100
  - SEO: ?/100

#### B. Performance Optimizations
- [ ] **Image Optimization**:
  - Replace emoji placeholders with actual optimized images
  - Use Next.js `<Image>` component instead of `<img>` tags
  - Add width/height attributes to prevent layout shift
  - Implement lazy loading for below-fold images
  - Consider WebP format with fallbacks
  
- [ ] **Code Splitting**:
  - Use dynamic imports for heavy components
  - Lazy load StatsShowcase if below fold
  - Split vendor bundles
  
- [ ] **Font Optimization**:
  - Already using Google Fonts (Playfair Display, Source Sans Pro, Lora)
  - Consider font-display: swap
  - Subset fonts if possible
  
- [ ] **Bundle Size Analysis**:
  - Run `npm run build` and check bundle sizes
  - Remove unused dependencies
  - Tree-shake Tailwind CSS (if not already)
  
- [ ] **Caching Strategy**:
  - Verify Cache-Control headers in NGINX
  - Implement static asset caching
  - Consider service worker for offline support

#### C. Accessibility Improvements
- [ ] **Screen Reader Testing**:
  - Test with NVDA/JAWS screen reader
  - Ensure all images have alt text
  - Verify heading hierarchy (H1 → H2 → H3)
  
- [ ] **Keyboard Navigation**:
  - Test tab navigation on all pages
  - Ensure focus indicators visible
  - Check modal/lightbox keyboard trap handling
  
- [ ] **Color Contrast**:
  - Verify all text meets WCAG AA contrast (4.5:1)
  - Check button/link contrast ratios
  - Test with color blindness simulator
  
- [ ] **ARIA Labels**:
  - Add aria-label to icon-only buttons
  - Add aria-live for dynamic content updates
  - Verify form labels properly associated

#### D. SEO Enhancements
- [ ] **Metadata**:
  - Verify all pages have unique titles
  - Check meta descriptions (50-160 characters)
  - Ensure Open Graph tags for social sharing
  - Add Twitter Card metadata
  
- [ ] **Structured Data**:
  - Add JSON-LD schema for articles (ArticleSchema)
  - Add schema for events (EventSchema)
  - Add schema for books (BookSchema)
  - Add organization schema for /tentang pages
  
- [ ] **Sitemap**:
  - Verify sitemap.ts includes all routes
  - Check dynamic routes generation
  - Submit to Google Search Console
  
- [ ] **Robots.txt**:
  - Already exists at `/public/robots.txt`
  - Verify no important pages blocked

#### E. Best Practices
- [ ] HTTPS: ✅ Already implemented (Let's Encrypt)
- [ ] CSP Headers: Consider adding Content Security Policy
- [ ] Remove console.logs in production
- [ ] Check for deprecated APIs
- [ ] Verify no mixed content (HTTP resources on HTTPS page)

**Tools Needed**:
- Lighthouse (Chrome DevTools)
- WebPageTest (https://www.webpagetest.org)
- GTmetrix (https://gtmetrix.com)
- Google Search Console (for indexing verification)
- WAVE (https://wave.webaim.org) - Accessibility checker

**Estimated Effort**: 6-10 hours (audit + fixes + re-test)

---

## 📊 SUMMARY

### Completed (85%)
- ✅ Production deployment (18 pages, PM2, NGINX, SSL)
- ✅ Homepage redesign with "Rumah Perpustakaan" concept
- ✅ Digital library features (ebooks, articles, events)
- ✅ Search functionality (2 search pages)
- ✅ Detail pages (3 dynamic routes)
- ✅ Image directory structure
- ✅ Core components (Header, Footer, StatsShowcase)
- ✅ Data structures (ebooks, articles, events)

### In Progress (10%)
- 🔄 Content writing for 5 coming-soon pages

### Not Started (5%)
- ⏳ Google Analytics configuration
- ⏳ Performance optimization (Lighthouse audit)
- ⏳ Accessibility testing (screen readers)

---

## 🎯 RECOMMENDED NEXT STEPS

### Short Term (1-2 weeks)
1. **Priority #1**: Performance Audit
   - Run Lighthouse and fix critical issues
   - Optimize images and bundle size
   - Improve Core Web Vitals
   
2. **Priority #2**: Content for Key Pages
   - Start with `/belajar` (Learning Hub) - highest user value
   - Then `/penelitian` (Research) - showcases expertise
   - Finally `/penerbitan` (Publishing) - revenue potential

3. **Priority #3**: Accessibility Testing
   - Screen reader testing
   - Keyboard navigation
   - Color contrast fixes

### Medium Term (3-4 weeks)
4. **Team & History Pages**
   - `/tentang/tim` - builds trust
   - `/tentang/sejarah` - storytelling

5. **Analytics & Monitoring**
   - Fix or replace Google Analytics
   - Set up error monitoring (Sentry?)
   - Track user behavior

6. **SEO Optimization**
   - Structured data (JSON-LD)
   - Submit sitemap to GSC
   - Monitor indexing

### Long Term (1-3 months)
7. **Interactive Features**
   - Newsletter integration (backend)
   - Contact form backend
   - Event registration system
   - User accounts for ebook reading

8. **Content Expansion**
   - Add more ebooks (target: 50+)
   - Regular article publishing
   - Event documentation
   - Photo uploads (replace emojis)

9. **Advanced Features**
   - PDF viewer for ebooks
   - Reading progress tracking
   - Bookmark system
   - Comment system for articles

---

## 📁 FILES TO UPDATE

### For Content (Todo #7)
- `/src/app/belajar/page.tsx`
- `/src/app/penelitian/page.tsx`
- `/src/app/penerbitan/page.tsx`
- `/src/app/tentang/tim/page.tsx`
- `/src/app/tentang/sejarah/page.tsx`
- `/src/data/programs.ts` (NEW)
- `/src/data/researchers.ts` (NEW)
- `/src/data/publications.ts` (NEW)
- `/src/data/team.ts` (NEW)
- `/src/data/timeline.ts` (NEW)

### For Analytics (Todo #6)
- `/src/app/layout.tsx` - GA script
- NGINX config - firewall rules
- Consider alternative analytics tool

### For Performance (Todo #8)
- All pages with images (convert to `<Image>`)
- `/next.config.ts` - image optimization config
- NGINX config - caching headers
- All components - add loading states

---

## 🔗 RESOURCES

### Documentation
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [Lighthouse Performance](https://web.dev/performance-scoring/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Documentation](https://schema.org)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Checker](https://wave.webaim.org)
- [Google Search Console](https://search.google.com/search-console)
- [GTmetrix](https://gtmetrix.com)
- [WebPageTest](https://www.webpagetest.org)

### Alternatives to Consider
- **Analytics**: Plausible, Umami, Matomo (privacy-friendly)
- **Error Monitoring**: Sentry (free tier available)
- **CDN**: Cloudflare (free tier with caching)
- **Image Hosting**: Cloudinary (generous free tier)

---

**Notes**:
- All todo items tracked with status (not-started/in-progress/completed)
- Priority levels assigned (High/Medium/Low)
- Effort estimates included (hours)
- Files to modify listed for each todo
- Resources and tools documented

**Maintained By**: Development Team  
**Review Frequency**: Weekly during active development
