# Rencana Perbaikan SEO - Academos/Aletheia

**Status Audit:** 58% SEO Health Score
**Target:** 95%+ SEO Health Score
**Timeline:** Implementasi bertahap dengan prioritas

---

## 📊 Hasil Audit SEO

### Skor Per Kategori
| Kategori | Skor | Status |
|----------|------|--------|
| Metadata & Headers | 75% | ✅ Good dengan gap kritis |
| Infrastructure Files | 60% | ⚠️ Basic tapi tidak lengkap |
| Structured Data (JSON-LD) | 0% | ❌ Belum ada sama sekali |
| Image Optimization | 85% | ✅ Sangat baik |
| Performance & Code Splitting | 70% | ✅ Foundation solid |

---

## 🔴 PRIORITAS TINGGI (Critical SEO Issues)

### 1. Fix Homepage Metadata ⚡ URGENT
**Masalah:** `/src/app/page.tsx` adalah 'use client' sehingga tidak bisa export metadata
**Dampak:** Halaman paling penting tidak punya SEO tags yang proper
**Solusi:**
- [ ] Pisahkan client components dari server component
- [ ] Export metadata dari page.tsx server component
- [ ] Tambahkan metadata lengkap: title, description, OpenGraph, Twitter Cards

**Implementation:**
```typescript
// src/app/page.tsx (server component)
export const metadata: Metadata = {
  title: 'Rumah Aletheia - Perpustakaan Komunitas & Pusat Literasi Karawang',
  description: 'Perpustakaan komunitas dengan 8,000+ koleksi buku, layanan penelitian, penerbitan, dan program literasi. Ekosistem lengkap untuk demokratisasi pengetahuan.',
  keywords: ['perpustakaan', 'literasi', 'karawang', 'buku', 'penelitian', 'penerbitan'],
  openGraph: {
    title: 'Rumah Aletheia - Perpustakaan Komunitas',
    description: '8,000+ buku, layanan riset, penerbitan & program literasi',
    images: ['/og-home.jpg'],
    locale: 'id_ID',
    type: 'website',
  },
};
```

### 2. Implementasi JSON-LD Schema Markup ⚡ URGENT
**Masalah:** Tidak ada structured data sama sekali
**Dampak:** Tidak muncul di Rich Snippets, Google Knowledge Panel, Event Listings
**Solusi:**
- [ ] Buat utility untuk generate JSON-LD schemas
- [ ] Implementasi Organization schema di root layout
- [ ] Implementasi LocalBusiness schema untuk library
- [ ] Implementasi Article schema untuk artikel pages
- [ ] Implementasi Event schema untuk kegiatan pages
- [ ] Implementasi Book schema untuk koleksi pages

**Schemas Needed:**
1. **Organization** (root layout) - nama, logo, social profiles, contact
2. **LocalBusiness** (library info) - alamat, jam operasional, layanan
3. **Article** (artikel/[slug]) - author, datePublished, headline, image
4. **Event** (kegiatan/[slug]) - name, startDate, location, organizer
5. **Book** (baca/[slug], koleksi) - name, author, isbn, genre
6. **SearchAction** (untuk search functionality)

### 3. Fix Event Detail Page Metadata ⚡ URGENT
**Masalah:** `/kegiatan/[slug]/page.tsx` adalah 'use client' - tidak ada metadata
**Dampak:** Event pages tidak SEO friendly, tidak muncul di Google Events
**Solusi:**
- [ ] Refactor kegiatan/[slug] page menjadi server component
- [ ] Implementasi generateMetadata untuk dynamic SEO
- [ ] Tambahkan Event schema JSON-LD

### 4. Create PWA Manifest ⚡ CRITICAL
**Masalah:** Tidak ada manifest.json
**Dampak:** Tidak bisa diinstall sebagai PWA, mobile SEO kurang optimal
**Solusi:**
- [ ] Buat manifest.json dengan app metadata
- [ ] Generate app icons (192x192, 512x512, dll)
- [ ] Configure theme colors
- [ ] Add to next.config.ts

### 5. Extend Dynamic Sitemap ⚡ CRITICAL
**Masalah:** Sitemap hanya include static pages, tidak ada dynamic slugs
**Dampak:** Google tidak index semua artikel, events, ebooks
**Solusi:**
- [ ] Fetch all artikel slugs dan tambahkan ke sitemap
- [ ] Fetch all kegiatan slugs dan tambahkan ke sitemap
- [ ] Fetch all baca slugs dan tambahkan ke sitemap
- [ ] Set proper priority & changeFrequency per content type
- [ ] Implement generateSitemaps() untuk skalabilitas

---

## 🟡 PRIORITAS MENENGAH (Important for Ranking)

### 6. Add Canonical URLs
**Solusi:**
- [ ] Set canonical URL di metadata semua pages
- [ ] Format: `https://academos.or.id/[path]`
- [ ] Prevent duplicate content issues

### 7. Configure metadataBase
**Solusi:**
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://academos.or.id'),
  // ... rest of metadata
};
```

### 8. Generate OpenGraph Images
**Solusi:**
- [ ] Buat template OG image (1200x630px)
- [ ] Dynamic OG image generation untuk artikel
- [ ] Logo + title overlay untuk setiap page
- [ ] Store di /public/og/ folder

### 9. Optimize Meta Descriptions
**Current Status:** Ada tapi bisa lebih baik
**Solusi:**
- [ ] Audit semua meta descriptions (max 160 chars)
- [ ] Include keywords naturally
- [ ] Add call-to-action phrases
- [ ] Make unique and compelling

---

## 🟢 PRIORITAS RENDAH (Nice to Have)

### 10. Breadcrumb Schema
- [ ] Implement breadcrumb navigation
- [ ] Add BreadcrumbList schema

### 11. FAQ Schema
- [ ] Identify common FAQs
- [ ] Add FAQ schema to relevant pages

### 12. Video Schema (if applicable)
- [ ] If adding video content
- [ ] Implement VideoObject schema

### 13. Review/Rating Schema
- [ ] For books, events (if user reviews added)
- [ ] Aggregate rating display

### 14. Google Search Console Integration
- [ ] Verify ownership
- [ ] Submit sitemap manually
- [ ] Monitor Core Web Vitals
- [ ] Check indexing status

---

## 📁 File Structure untuk SEO

```
src/
├── lib/
│   ├── seo/
│   │   ├── schemas/
│   │   │   ├── organization.ts      # Organization schema
│   │   │   ├── local-business.ts    # LocalBusiness schema
│   │   │   ├── article.ts           # Article schema generator
│   │   │   ├── event.ts             # Event schema generator
│   │   │   └── book.ts              # Book schema generator
│   │   ├── metadata/
│   │   │   ├── default-metadata.ts  # Default SEO config
│   │   │   └── og-image-generator.ts # Dynamic OG image
│   │   └── utils.ts                 # SEO helper functions
│   └── ...
public/
├── manifest.json                     # PWA manifest
├── og/                              # OpenGraph images
│   ├── home.jpg
│   ├── default.jpg
│   └── ...
├── icons/                           # PWA icons
│   ├── icon-192.png
│   ├── icon-512.png
│   └── ...
└── ...
```

---

## 🎯 Metrics & Success Criteria

### Before (Current State)
- ❌ Homepage: No metadata
- ❌ Structured Data: 0 schemas
- ⚠️ Sitemap: Static only (5 pages)
- ❌ PWA: Not installable
- ⚠️ OG Images: Missing on most pages

### After (Target State)
- ✅ Homepage: Full metadata + OG tags
- ✅ Structured Data: 6+ schema types
- ✅ Sitemap: Dynamic with all content (100+ pages)
- ✅ PWA: Installable dengan manifest
- ✅ OG Images: Every page has custom image
- ✅ Google Rich Snippets: Active untuk artikel & events
- ✅ Core Web Vitals: All green
- ✅ Lighthouse SEO Score: 95+

---

## 📅 Implementation Timeline

### Week 1: Critical Fixes (PRIORITAS TINGGI)
- Day 1-2: Fix homepage metadata + refactor client components
- Day 2-3: Implement all JSON-LD schemas
- Day 3-4: Fix event detail metadata
- Day 4-5: Create manifest.json + PWA icons
- Day 5-7: Extend dynamic sitemap

### Week 2: Important Improvements (PRIORITAS MENENGAH)
- Day 1-2: Add canonical URLs everywhere
- Day 2-3: Configure metadataBase
- Day 3-5: Generate OpenGraph images
- Day 5-7: Optimize all meta descriptions

### Week 3: Nice to Have + Testing (PRIORITAS RENDAH)
- Day 1-2: Breadcrumb schema
- Day 2-3: FAQ schema
- Day 3-7: Testing, validation, Google Search Console setup

---

## 🔧 Technical Debt to Address

1. **Client Component Overuse**
   - Problem: Too many pages marked as 'use client'
   - Solution: Move interactivity to child components
   - Benefit: Enable metadata export on more pages

2. **Missing Error Boundaries**
   - Add error.tsx for better UX and SEO

3. **No Loading States**
   - Add loading.tsx for better perceived performance

4. **Image Optimization Config**
   - Add images domains to next.config.ts
   - Enable remote patterns for Cloudinary/Unsplash

---

## 📈 Expected SEO Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Indexed Pages | ~10 | 100+ | +900% |
| Rich Snippets | 0 | Active | ∞ |
| Mobile Usability | 70% | 95% | +25% |
| Lighthouse SEO | 75 | 95+ | +20 |
| Organic Traffic | Baseline | +150% | 6 months |
| Page Load Time | 2.5s | <2s | -20% |

---

## ✅ Checklist Implementasi

### Phase 1: Critical SEO (Week 1)
- [ ] Homepage metadata implementation
- [ ] Organization JSON-LD schema
- [ ] LocalBusiness JSON-LD schema
- [ ] Article JSON-LD schema
- [ ] Event JSON-LD schema
- [ ] Book JSON-LD schema
- [ ] Event detail page metadata
- [ ] PWA manifest.json
- [ ] App icons generation
- [ ] Dynamic sitemap extension

### Phase 2: Important SEO (Week 2)
- [ ] Canonical URLs on all pages
- [ ] metadataBase configuration
- [ ] OpenGraph image templates
- [ ] Dynamic OG image generation
- [ ] Meta description optimization
- [ ] Twitter Card validation

### Phase 3: Enhancements (Week 3)
- [ ] Breadcrumb schema
- [ ] FAQ schema
- [ ] Search Console verification
- [ ] Sitemap submission
- [ ] Performance testing
- [ ] SEO audit final check

---

## 🚀 Quick Wins (Dapat dikerjakan hari ini)

1. ✅ Add metadataBase to layout.tsx (5 menit)
2. ✅ Create basic manifest.json (10 menit)
3. ✅ Add Organization schema to layout (15 menit)
4. ✅ Extend sitemap with artikel slugs (20 menit)
5. ✅ Fix homepage metadata structure (30 menit)

---

**Total Estimated Effort:** 3 weeks full implementation
**Priority Items Only:** 1 week critical fixes
**Quick Wins Today:** 2 hours untuk impact besar

---

_Last Updated: 2026-01-08_
_Next Review: After Week 1 implementation_
