# 📋 RENCANA PERBAIKAN KOMPREHENSIF
## Website Rumah Aletheia - Academos.or.id

**Tanggal:** 5 Januari 2026  
**Status:** Planning Phase

---

## 🔴 MASALAH UTAMA TERIDENTIFIKASI

### 1. Data Frontend TIDAK Terhubung ke Database
- Halaman publik (`/artikel`, `/baca`, `/kegiatan`) menggunakan file hardcoded
- Admin panel sudah terintegrasi Prisma/PostgreSQL
- Koneksi terputus antara Admin Panel ↔ Frontend

### 2. Komponen dengan Mock Data
- `FeaturedBooks.tsx` - Array static 6 buku
- `ContactForm.tsx` - Tidak ada API endpoint
- `NewsletterForm.tsx` - Simulasi saja (setTimeout)

### 3. Halaman Static yang Perlu Dinamis
- `/koleksi` - Kategori hardcoded dalam JSX

---

## 📐 PHASE 1: KONEKSI DATABASE KE FRONTEND (PRIORITAS TINGGI)
**Target:** Semua konten ditampilkan dari database

### Task 1.1: Buat Public API Routes
```
/api/public/articles         - GET articles (published only)
/api/public/articles/[slug]  - GET single article
/api/public/ebooks           - GET ebooks
/api/public/ebooks/[id]      - GET single ebook
/api/public/events           - GET events
/api/public/events/[slug]    - GET single event
/api/public/stats            - GET site statistics
```

### Task 1.2: Update Frontend Pages
- [ ] `/artikel/page.tsx` - Fetch dari `/api/public/articles`
- [ ] `/artikel/[slug]/page.tsx` - Fetch dari `/api/public/articles/[slug]`
- [ ] `/artikel/search/page.tsx` - Fetch dengan query param
- [ ] `/baca/page.tsx` - Fetch dari `/api/public/ebooks`
- [ ] `/baca/[id]/page.tsx` - Fetch dari `/api/public/ebooks/[id]`
- [ ] `/baca/search/page.tsx` - Fetch dengan query param
- [ ] `/kegiatan/page.tsx` - Fetch dari `/api/public/events`
- [ ] `/kegiatan/[slug]/page.tsx` - Fetch dari `/api/public/events/[slug]`

### Task 1.3: Update Components
- [ ] `FeaturedBooks.tsx` - Fetch featured ebooks dari API
- [ ] `StatsShowcase.tsx` - Fetch real stats dari database

---

## 📐 PHASE 2: BACKEND FUNCTIONALITY (PRIORITAS TINGGI)
**Target:** Semua form dan fitur berfungsi

### Task 2.1: Contact Form Backend
- [ ] Buat `/api/contact` POST endpoint
- [ ] Setup email service (Nodemailer/Resend)
- [ ] Simpan ke database (opsional)

### Task 2.2: Newsletter Backend
- [ ] Buat model `Subscriber` di Prisma
- [ ] Buat `/api/newsletter/subscribe` POST endpoint
- [ ] Email confirmation (opsional)

### Task 2.3: Book Borrowing System (Opsional)
- [ ] Model `BookBorrow` untuk peminjaman
- [ ] Form request peminjaman

---

## 📐 PHASE 3: ADMIN PANEL ENHANCEMENTS (PRIORITAS MEDIUM)
**Target:** Admin panel lengkap dan user-friendly

### Task 3.1: Dashboard Real Stats
- [ ] Count real articles, ebooks, events dari database
- [ ] Recent activity log
- [ ] Quick metrics (views, downloads)

### Task 3.2: Image Management
- [ ] Gallery view untuk uploaded images
- [ ] Bulk delete images
- [ ] Image optimization

### Task 3.3: User Management
- [ ] CRUD admin users
- [ ] Role management (ADMIN, EDITOR, VIEWER)
- [ ] Activity log per user

---

## 📐 PHASE 4: UI/UX IMPROVEMENTS (PRIORITAS MEDIUM)
**Target:** Pengalaman pengguna yang lebih baik

### Task 4.1: Loading States
- [ ] Skeleton loaders untuk semua data fetch
- [ ] Loading spinners untuk form submit
- [ ] Error states yang informatif

### Task 4.2: Search & Filter
- [ ] Full-text search untuk articles
- [ ] Advanced filter untuk ebooks (kategori, tahun, format)
- [ ] Event filter by status, type, date

### Task 4.3: Pagination
- [ ] Infinite scroll atau pagination untuk artikel
- [ ] Pagination untuk ebook list
- [ ] Pagination untuk events

### Task 4.4: Responsive Improvements
- [ ] Test semua halaman di mobile
- [ ] Fix layout issues
- [ ] Optimize images untuk mobile

---

## 📐 PHASE 5: SEO & PERFORMANCE (PRIORITAS MEDIUM)
**Target:** Website optimal untuk search engine

### Task 5.1: Dynamic Metadata
- [ ] Generate metadata dari database untuk artikel
- [ ] Open Graph images untuk sharing
- [ ] Structured data (JSON-LD)

### Task 5.2: Sitemap Dynamic
- [ ] Update sitemap.ts untuk include dynamic routes
- [ ] Generate from database entries

### Task 5.3: Performance
- [ ] Image optimization dengan next/image
- [ ] Lazy loading untuk komponen berat
- [ ] Cache API responses

---

## 📐 PHASE 6: CONTENT MANAGEMENT (PRIORITAS RENDAH)
**Target:** Konten lengkap dan terorganisir

### Task 6.1: Seed Data
- [ ] Buat script seed untuk initial content
- [ ] Migrate data dari hardcoded ke database

### Task 6.2: Category Management
- [ ] CRUD categories untuk articles
- [ ] CRUD categories untuk ebooks
- [ ] Tag management

---

## 🔧 TECHNICAL DEBT

### Cleanup
- [ ] Hapus file `@/data/articles.ts` setelah migrasi
- [ ] Hapus file `@/data/ebooks.ts` setelah migrasi
- [ ] Hapus file `@/data/events.ts` setelah migrasi
- [ ] Refactor komponen untuk consistency

### Testing
- [ ] Unit tests untuk API routes
- [ ] Integration tests untuk forms
- [ ] E2E tests untuk critical flows

---

## 📊 PRIORITY MATRIX

| Phase | Effort | Impact | Priority |
|-------|--------|--------|----------|
| Phase 1 | High | Critical | 🔴 P0 |
| Phase 2 | Medium | High | 🔴 P0 |
| Phase 3 | Medium | Medium | 🟡 P1 |
| Phase 4 | Medium | High | 🟡 P1 |
| Phase 5 | Low | Medium | 🟢 P2 |
| Phase 6 | Low | Low | 🟢 P2 |

---

## 📅 ESTIMATED TIMELINE

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1 | 2-3 days | None |
| Phase 2 | 1-2 days | Phase 1 |
| Phase 3 | 2-3 days | None |
| Phase 4 | 2-3 days | Phase 1 |
| Phase 5 | 1-2 days | Phase 1 |
| Phase 6 | 1 day | Phase 1 |

**Total Estimated:** 10-14 hari kerja

---

## 🎯 SUCCESS CRITERIA

1. ✅ Semua konten artikel berasal dari database
2. ✅ Semua e-book berasal dari database  
3. ✅ Semua event berasal dari database
4. ✅ Contact form mengirim email sungguhan
5. ✅ Newsletter form menyimpan ke database
6. ✅ Stats menampilkan data real
7. ✅ No hardcoded mock data di frontend
8. ✅ Admin changes reflect instantly on frontend

---

## 📝 NOTES

- Database sudah siap (PostgreSQL + Prisma)
- Admin panel sudah functional untuk CRUD
- Perlu membuat API public routes
- Perlu update frontend untuk fetch dari API

---

*Document created: January 5, 2026*
*Last updated: January 5, 2026*
