# 🔍 Audit Report: Hardcoded Values & Dummy Data
**Date:** 2026-01-08
**Audited Files:** 149 TypeScript/TSX files
**Status:** ⚠️ CRITICAL - Banyak hardcode ditemukan

---

## 📊 EXECUTIVE SUMMARY

### Issues Found:
- ❌ **78+ instances** of hardcoded hex colors (#XXX)
- ⚠️ **15+ instances** of hardcoded years (2024, 2025, 2026)
- ⚠️ **8+ instances** of hardcoded URLs (http://103.44.149.34)
- ℹ️ **Placeholder text** - OK (UI purposes)
- ℹ️ **localhost fallbacks** - OK (development safety)

---

## 🚨 CRITICAL ISSUES (HARUS DIPERBAIKI)

### 1. **Hardcoded Colors - Frontend Pages**

#### **HIGH PRIORITY** - User-Facing Pages

**`src/app/penelitian/page.tsx`** - 40+ hardcoded colors
```tsx
❌ bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D]
❌ border-[#B05E3F]
❌ text-[#1F4E4C]
❌ text-[#5A5A5A]
❌ text-[#7A7A7A]
... dan 35 lainnya
```
**Impact:** CRITICAL - Main research page
**Priority:** P0

---

**`src/app/penerbitan/page.tsx`** - 30+ hardcoded colors
**`src/app/tentang/sejarah/page.tsx`** - 25+ hardcoded colors
**`src/app/tentang/tim/page.tsx`** - 20+ hardcoded colors
**`src/app/kontak/page.tsx`** - 15+ hardcoded colors

**Impact:** HIGH - Main info pages
**Priority:** P1

---

#### **MEDIUM PRIORITY** - Components

**`src/components/ContactForm.tsx`** - 12 instances
```tsx
Line 134: text-[#1F4E4C]
Line 148: focus:border-[#B05E3F] focus:ring-[#B05E3F]
Line 291: bg-[#B05E3F] ... border-[#B05E3F]
... 9 more
```
**Impact:** MEDIUM - Used on contact page
**Priority:** P1

---

**`src/components/Footer.tsx`** - 10 instances
```tsx
Line 8:   bg-[#1F4E4C] border-[#B05E3F]
Line 31:  style={{ color: '#F5DDD3' }}
Line 38:  hover:text-[#B05E3F] hover:border-[#B05E3F]
... 7 more
```
**Impact:** HIGH - Used on every page
**Priority:** P1

---

**`src/components/VisitIndicator.tsx`**
```tsx
Line 41: text-[#B05E3F] border-[#B05E3F]/20
```
**Impact:** LOW - Minor component
**Priority:** P2

---

### 2. **Hardcoded Years/Dates**

**`src/components/StatsShowcase.tsx`**
```tsx
Line 68: value: 2025  // ❌ Should be from organization.established
```
**Fix:** Use `organization.established` from config

---

**`src/app/penelitian/page.tsx`**
```tsx
Line 159: Penelitian Sosial • 2025  // ❌ Hardcoded year
Line 170: Studi Humaniora • 2024
Line 181: Riset Psikologi • 2024
```
**Fix:** Remove or make dynamic with `new Date().getFullYear()`

---

**`src/app/penerbitan/page.tsx`**
```tsx
Line 189: Non-fiksi • 2024
Line 203: Riset • 2024
Line 217: Antologi • 2025
```
**Fix:** Fetch from database or remove

---

**`src/app/tentang/sejarah/page.tsx`** - Timeline hardcoded
```tsx
Line 79:  2024 - Pendirian
Line 105: Okt 2024 - Konsep
Line 127: Jan 2025 - Pembukaan
Line 153: Mar 2025 - 8000 Buku
Line 175: Jun 2025 - 2500 Anggota
Line 201: Jan 2026 - Platform Digital
```
**Note:** ⚠️ Timeline sejarah boleh hardcode JIKA sudah terjadi
**Action:** Move to `/data/timeline.ts` config file

---

### 3. **Hardcoded External URLs**

**`src/app/admin/migrate/page.tsx`**
```tsx
Line 18:  useState('http://103.44.149.34/elib/halaman/buku/90')
Line 346: placeholder="http://103.44.149.34/elib/halaman/buku/90"
```
**Note:** ⚠️ Temporary migration URL - acceptable untuk admin tool
**Action:** Move to environment variable `MIGRATION_BASE_URL`

---

**`src/app/api/admin/check-ebooks/route.ts`**
```tsx
Line 27: fileUrl: { contains: 'http://103.44.149.34' }
Line 34: coverImage: { contains: 'http://103.44.149.34' }
```
**Action:** Use env var

---

**`src/app/api/admin/scrape-ebooks/route.ts`**
```tsx
Line 82-83: coverImage/fileUrl with http://103.44.149.34
```
**Action:** Use env var

---

## ✅ ACCEPTABLE HARDCODES (No Action Needed)

### Email Templates (`src/lib/email.ts`)
```
✅ HTML email memerlukan inline styles dengan hex colors
✅ Email clients tidak support CSS variables
✅ Keep as-is
```

### Localhost Fallbacks
```tsx
✅ http://localhost:${process.env.PORT} || http://localhost:3001
✅ Fallback untuk development environment
✅ Keep as-is
```

### UI Placeholder Text
```tsx
✅ placeholder="Masukkan nama Anda"
✅ placeholder="nama@email.com"
✅ UI copy - acceptable
```

---

## 🎯 RECOMMENDED FIXES

### Phase 1: High Priority (P0-P1)

**1. Create Color Mapping Helper**
```tsx
// src/lib/colorMap.ts
const LEGACY_COLOR_MAP = {
  '#1F4E4C': 'teal-800',
  '#2C5F5D': 'teal-700',
  '#B05E3F': 'terra-700',
  '#5A5A5A': 'text-secondary',
  '#7A7A7A': 'text-tertiary',
  // ... etc
}
```

**2. Fix Critical Pages**
- [ ] `penelitian/page.tsx` - Replace 40+ colors
- [ ] `penerbitan/page.tsx` - Replace 30+ colors
- [ ] `components/Footer.tsx` - Replace 10+ colors
- [ ] `components/ContactForm.tsx` - Replace 12+ colors

**3. Create Timeline Config**
```tsx
// src/data/timeline.ts
export const organizationTimeline = [
  { date: '2024', title: 'Pendirian PT Academos', ... },
  { date: 'Okt 2024', title: 'Konsep Aletheia', ... },
  // ...
]
```

**4. Add Environment Variables**
```env
# .env
MIGRATION_BASE_URL=http://103.44.149.34
NEXT_PUBLIC_BASE_URL=https://academos.or.id
```

---

### Phase 2: Medium Priority (P2)

- [ ] Fix remaining admin pages
- [ ] Fix tentang/* pages
- [ ] Replace hardcoded years with dynamic values

---

## 📈 IMPACT ANALYSIS

| Issue Type | Count | Files Affected | User Impact |
|------------|-------|----------------|-------------|
| Hex Colors | 78+ | 15+ | **HIGH** - Inconsistent theming |
| Hardcoded Years | 15+ | 5+ | **MEDIUM** - Outdated content |
| External URLs | 8+ | 3+ | **LOW** - Admin tools only |

---

## 🚀 NEXT STEPS

1. ✅ **Approve this audit report**
2. 🔧 **Execute Phase 1 fixes** (penelitian, penerbitan, footer, contactform)
3. 🔧 **Create timeline config file**
4. 🔧 **Add environment variables**
5. ✅ **Test all pages**
6. ✅ **Commit & deploy**

---

**Estimated Fix Time:** 2-3 hours
**Files to Modify:** ~15 files
**Priority:** HIGH - Affects brand consistency

---

## 📝 NOTES

- Email templates (`src/lib/email.ts`) should KEEP hardcoded colors
- Localhost fallbacks are intentional and should remain
- Timeline dates in sejarah page can stay if they represent historical facts
- Migration URLs should move to env vars for flexibility
