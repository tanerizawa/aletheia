# 📚 RENCANA REDESIGN TOTAL WEBSITE RUMAH ALETHEIA
## Pendekatan Neuroscience UI/UX - Konsep "Rumah Perpustakaan"

**Dokumen versi**: 1.0  
**Tanggal**: 5 Januari 2026  
**Organisasi**: PT Academos Pustaka Demokrasi  
**Perpustakaan**: Rumah Aletheia  

---

## 📋 DAFTAR ISI

1. [Analisis Website Saat Ini](#1-analisis-website-saat-ini)
2. [Profil Organisasi Lengkap](#2-profil-organisasi-lengkap)
3. [Konsep Neuroscience UI/UX](#3-konsep-neuroscience-uiux)
4. [Konsep Spatial Design "Rumah Perpustakaan"](#4-konsep-spatial-design-rumah-perpustakaan)
5. [Arsitektur Informasi Baru](#5-arsitektur-informasi-baru)
6. [Design System Baru](#6-design-system-baru)
7. [Phase Implementasi](#7-phase-implementasi)
8. [Komponen Visual & Interaksi](#8-komponen-visual--interaksi)
9. [Teknologi & Tools](#9-teknologi--tools)

---

## 1. ANALISIS WEBSITE SAAT INI

### 1.1 Struktur Halaman Existing

| Halaman | Path | Fungsi | Status |
|---------|------|--------|--------|
| Beranda | `/` | Hero, layanan, CTA, newsletter | ✅ Ada |
| Tentang | `/tentang` | Sejarah, visi, misi, nilai | ✅ Ada |
| Kegiatan | `/kegiatan` | Daftar program aktivitas | ✅ Ada |
| Koleksi | `/koleksi` | Kategori buku, pencarian | ✅ Ada |
| Kontak | `/kontak` | Form kontak, FAQ | ✅ Ada |

### 1.2 Kelebihan Desain Saat Ini

- ✅ **Color palette konsisten** - 3 warna (Teal, Terracotta, Cream)
- ✅ **Typography hierarchy** - Crimson Text, Inter, Lora
- ✅ **Magazine-style layout** - Editorial approach
- ✅ **Accessibility features** - ARIA labels, skip links
- ✅ **Responsive design** - Mobile-first approach
- ✅ **SEO optimization** - Metadata lengkap

### 1.3 Kelemahan & Gap Analysis

| Aspek | Masalah | Dampak |
|-------|---------|--------|
| **Identitas Organisasi** | Hanya menampilkan Rumah Aletheia, tidak ada representasi PT Academos | Kehilangan brand awareness lembaga induk |
| **Scope Layanan** | Hanya fokus perpustakaan, tidak mencakup penelitian, penerbitan | Tidak mencerminkan keseluruhan KBLI |
| **Spatial Experience** | Layout flat/standar, tidak ada sense of place | User tidak merasakan pengalaman "berada di rumah" |
| **Emotional Design** | Minimnya trigger emosional | Engagement rendah |
| **Neuroscience Approach** | Tidak ada penerapan prinsip psikologi kognitif | Navigasi & retention tidak optimal |
| **Data Kontak** | Menggunakan data placeholder | Informasi tidak akurat |
| **Lokasi** | Alamat Jakarta (salah) | Seharusnya Karawang, Jawa Barat |

### 1.4 Data Kontak yang Perlu Diperbarui

**Data Benar (dari input user):**
```
Alamat: Jalan Patinggi, Desa Cibadak
Kecamatan: Rawamerta
Kabupaten: Karawang
Provinsi: Jawa Barat
Kode Pos: 41382
Telepon: 081382605030
Email: studiomalaka@gmail.com
Website: academos.or.id
Koordinat: -6.240639073001823, 107.3825141787529
MDPL: 8.66
```

---

## 2. PROFIL ORGANISASI LENGKAP

### 2.1 Struktur Organisasi

```
┌─────────────────────────────────────────────────────────┐
│             PT ACADEMOS PUSTAKA DEMOKRASI               │
│         SK: AHU-038489.AH.01.30.Tahun 2024             │
│              Kepala: Odang                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   RUMAH     │  │  LEMBAGA    │  │  PENERBITAN │     │
│  │  ALETHEIA   │  │ PENELITIAN  │  │ INDEPENDEN  │     │
│  │(Perpustakaan)│  │   SOSIAL    │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Unit Layanan Academos

#### A. Rumah Aletheia (Perpustakaan)
- **NPP**: 3215184J0000003
- **SK Pendirian**: 01/SK/Academos/int/X/2025
- **Jenis**: UMUM - KOMUNITAS/TBM
- **Tahun Berdiri**: 2025
- **Kepala Perpustakaan**: Odang
- **Akreditasi**: Belum

#### B. Lembaga Penelitian Sosial
- Penelitian & Pengembangan Ilmu Pengetahuan Sosial (KBLI 72201)
- Penelitian Linguistik dan Sastra (KBLI 72202)
- Penelitian Seni (KBLI 72204)
- Penelitian Psikologi (KBLI 72205)
- Penelitian Sejarah/Cagar Budaya (KBLI 72206)
- Penelitian Humaniora Lainnya (KBLI 72209)
- Penelitian Pasar (KBLI 73201)
- Jajak Pendapat Masyarakat (KBLI 73202)
- Penelitian Teknologi dan Rekayasa (KBLI 72102)
- Penelitian Pertanian, Peternakan, Kehutanan (KBLI 72105)

#### C. Penerbitan Independen
- Penerbitan Buku (KBLI 58110)
- Penerbitan Direktori & Mailing List (KBLI 58120)
- Penerbitan Surat Kabar, Jurnal, Buletin (KBLI 58130)
- Aktivitas Penerbitan Lainnya (KBLI 58190)
- Penerbitan Piranti Lunak (KBLI 58200)
- Aktivitas Perekaman Suara (KBLI 59201)
- Penerbitan Musik & Buku Musik (KBLI 59202)

#### D. Literasi & Pendidikan
- Perdagangan Eceran Hasil Pencetakan (KBLI 47612)
- Pendidikan Lainnya Swasta (KBLI 85499)
- Jurnalis Berita Independen (KBLI 90025)

---

## 3. KONSEP NEUROSCIENCE UI/UX

### 3.1 Prinsip Neuroscience dalam Web Design

#### A. Cognitive Load Theory
```
┌─────────────────────────────────────────────────────────┐
│                COGNITIVE LOAD MANAGEMENT                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  INTRINSIC LOAD      EXTRANEOUS LOAD    GERMANE LOAD   │
│  (Kompleksitas       (Distraksi &       (Proses        │
│   Konten)            Noise Visual)      Pembelajaran)   │
│       ↓                    ↓                 ↓          │
│  Chunking Info       Minimalist UI     Progressive      │
│  Hierarchy           Whitespace        Disclosure       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### B. Attention & Memory Principles

| Prinsip | Penerapan |
|---------|-----------|
| **Von Restorff Effect** | Elemen penting dibuat berbeda secara visual |
| **Serial Position Effect** | Informasi penting di awal dan akhir |
| **Zeigarnik Effect** | Progress indicators untuk engagement |
| **Hick's Law** | Batasi pilihan (5-7 item per section) |
| **Miller's Law** | Chunk informasi dalam 7±2 kelompok |

#### C. Emotional Design Layers

```
Layer 3: REFLECTIVE (Makna & Identitas)
    │ → "Saya bagian dari komunitas Aletheia"
    │
Layer 2: BEHAVIORAL (Usability & Satisfaction)
    │ → "Mudah menemukan apa yang saya cari"
    │
Layer 1: VISCERAL (First Impression)
    │ → "Rasanya seperti di rumah sendiri"
    │
```

### 3.2 Dopamine-Driven Design

| Trigger | Implementasi | Hasil |
|---------|--------------|-------|
| **Anticipation** | Loading animations, hover previews | Meningkatkan ekspektasi |
| **Achievement** | Reading progress, badge system | Sense of accomplishment |
| **Social Proof** | Testimonials, active readers count | Trust building |
| **Surprise** | Random book recommendations | Delight moments |
| **Progress** | Reading lists, learning paths | Goal completion |

### 3.3 Spatial Memory & Wayfinding

Otak manusia lebih mudah mengingat lokasi dalam ruang fisik (Hippocampal spatial memory). Dengan menciptakan **metafora ruang fisik**, user dapat:

- Navigasi lebih intuitif
- Mengingat lokasi fitur lebih baik
- Merasa lebih "at home"
- Mengurangi cognitive load

---

## 4. KONSEP SPATIAL DESIGN "RUMAH PERPUSTAKAAN"

### 4.1 Konsep Utama

Website akan didesain seakan user **memasuki sebuah rumah perpustakaan fisik** dengan ruangan-ruangan yang berbeda. Setiap "ruangan" memiliki fungsi, atmosfer, dan pengalaman yang unik.

### 4.2 Denah Rumah Aletheia (Information Architecture)

```
                    ┌─────────────────────────────────────┐
                    │            HALAMAN DEPAN            │
                    │         (Landing / Hero)            │
                    │     • Welcome message               │
                    │     • Brand identity Academos       │
                    │     • Navigation hints              │
                    └───────────────┬─────────────────────┘
                                    │
                    ┌───────────────┴─────────────────────┐
                    │              TERAS                   │
                    │        (Overview / Dashboard)        │
                    │     • Quick stats                    │
                    │     • Upcoming events                │
                    │     • Featured content               │
                    └───────────────┬─────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
┌───────┴───────┐         ┌────────┴────────┐         ┌────────┴───────┐
│    TAMAN      │         │   RUANG TAMU    │         │     GALERI     │
│  (Kegiatan)   │         │   (Tentang)     │         │   (Koleksi)    │
│               │         │                 │         │                │
│ • Events      │         │ • Sejarah       │         │ • Katalog      │
│ • Workshops   │         │ • Visi Misi     │         │ • Pencarian    │
│ • Programs    │         │ • Tim           │         │ • Kategori     │
└───────────────┘         └────────┬────────┘         └────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
┌───────┴───────┐        ┌────────┴────────┐        ┌────────┴───────┐
│  RUANG BACA   │        │  RUANG BELAJAR  │        │   STUDIO       │
│   (Reading)   │        │   (Learning)    │        │ (Penelitian)   │
│               │        │                 │        │                │
│ • E-books     │        │ • Courses       │        │ • Riset        │
│ • Articles    │        │ • Tutorials     │        │ • Publikasi    │
│ • Digital     │        │ • Resources     │        │ • Jurnal       │
└───────────────┘        └─────────────────┘        └────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
           ┌────────┴────────┐          ┌────────┴────────┐
           │   TOKO BUKU     │          │    RESEPSIONIS  │
           │  (Penerbitan)   │          │    (Kontak)     │
           │                 │          │                 │
           │ • Katalog       │          │ • Form Kontak   │
           │ • Pre-order     │          │ • FAQ           │
           │ • Digital       │          │ • Lokasi        │
           └─────────────────┘          └─────────────────┘
```

### 4.3 Mapping Ruangan ke Halaman

| Ruangan Virtual | Path | Fungsi | Visual Metaphor |
|-----------------|------|--------|-----------------|
| **Halaman Depan** | `/` | Landing, hero | Gerbang dengan papan nama |
| **Teras** | `/` (below fold) | Overview, highlights | Serambi dengan welcome sign |
| **Ruang Tamu** | `/tentang` | About, history | Ruangan dengan foto-foto |
| **Taman** | `/kegiatan` | Events, programs | Outdoor area dengan aktivitas |
| **Galeri Koleksi** | `/koleksi` | Book catalog | Rak-rak buku tinggi |
| **Ruang Baca** | `/baca` (NEW) | Reading space | Sofa, lampu, suasana tenang |
| **Ruang Belajar** | `/belajar` (NEW) | Learning resources | Meja belajar, papan tulis |
| **Studio Riset** | `/penelitian` (NEW) | Research hub | Lab research aesthetic |
| **Toko Buku** | `/penerbitan` (NEW) | Publishing | Display toko buku |
| **Resepsionis** | `/kontak` | Contact, help | Meja resepsionis |

### 4.4 Visual Atmosphere per Ruangan

```
┌─────────────────────────────────────────────────────────────────────┐
│                      VISUAL ATMOSPHERE GUIDE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  HALAMAN DEPAN    │  Outdoor, warm sunlight, welcoming             │
│  Warna: Teal + Terracotta + Natural greens                         │
│  Elemen: Gate, pathway, plants, signage                            │
│                                                                     │
│  TERAS            │  Semi-outdoor, morning light, fresh            │
│  Warna: Warm cream, soft shadows                                   │
│  Elemen: Wooden bench, potted plants, welcome mat                  │
│                                                                     │
│  RUANG TAMU       │  Indoor, warm, intimate                        │
│  Warna: Warm tones, earth colors                                   │
│  Elemen: Sofa, coffee table, framed photos, fireplace              │
│                                                                     │
│  TAMAN            │  Outdoor, vibrant, energetic                   │
│  Warna: Greens, Terracotta, Sky blue                               │
│  Elemen: Trees, benches, people gathering                          │
│                                                                     │
│  GALERI           │  Indoor, bright, organized                     │
│  Warna: Warm wood, cream walls                                     │
│  Elemen: Tall bookshelves, ladder, organized sections              │
│                                                                     │
│  RUANG BACA       │  Indoor, dim, cozy                             │
│  Warna: Deep teal, warm lamp light                                 │
│  Elemen: Reading lamp, armchair, side table, books                 │
│                                                                     │
│  RUANG BELAJAR    │  Indoor, bright, focused                       │
│  Warna: Clean white, Teal accents                                  │
│  Elemen: Desk, whiteboard, study materials                         │
│                                                                     │
│  STUDIO RISET     │  Indoor, professional, intellectual            │
│  Warna: Deep teal, white, minimal                                  │
│  Elemen: Documents, charts, research tools                         │
│                                                                     │
│  TOKO BUKU        │  Indoor, commercial, inviting                  │
│  Warna: Terracotta accent, wood tones                              │
│  Elemen: Book displays, price tags, checkout                       │
│                                                                     │
│  RESEPSIONIS      │  Indoor, professional, helpful                 │
│  Warna: Teal + Cream                                               │
│  Elemen: Counter, bell, information boards                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. ARSITEKTUR INFORMASI BARU

### 5.1 Site Map Baru

```
academos.or.id
│
├── / (Beranda)
│   ├── Hero - Gerbang Rumah Aletheia
│   ├── Teras - Quick Overview
│   ├── Highlights - Unit Layanan Academos
│   └── CTA - Newsletter
│
├── /tentang (Ruang Tamu)
│   ├── /tentang/academos - PT Academos Pustaka Demokrasi
│   ├── /tentang/aletheia - Perpustakaan Rumah Aletheia
│   ├── /tentang/sejarah - Perjalanan Kami
│   ├── /tentang/tim - Tim & Pengurus
│   └── /tentang/mitra - Kemitraan
│
├── /kegiatan (Taman)
│   ├── /kegiatan/kalender - Event Calendar
│   ├── /kegiatan/program - Program Rutin
│   ├── /kegiatan/workshop - Workshop & Pelatihan
│   └── /kegiatan/arsip - Arsip Kegiatan
│
├── /koleksi (Galeri)
│   ├── /koleksi/katalog - Katalog Lengkap
│   ├── /koleksi/kategori - Per Kategori
│   ├── /koleksi/baru - Koleksi Terbaru
│   └── /koleksi/rekomendasi - Rekomendasi
│
├── /baca (Ruang Baca) [NEW]
│   ├── /baca/digital - Koleksi Digital
│   ├── /baca/artikel - Artikel & Essay
│   ├── /baca/jurnal - Jurnal
│   └── /baca/podcast - Audio Content
│
├── /belajar (Ruang Belajar) [NEW]
│   ├── /belajar/kursus - Kursus Online
│   ├── /belajar/literasi - Program Literasi
│   ├── /belajar/anak - Untuk Anak-anak
│   └── /belajar/dewasa - Pendidikan Dewasa
│
├── /penelitian (Studio Riset) [NEW]
│   ├── /penelitian/publikasi - Publikasi Riset
│   ├── /penelitian/proyek - Proyek Aktif
│   ├── /penelitian/data - Open Data
│   └── /penelitian/kolaborasi - Ajukan Riset
│
├── /penerbitan (Toko Buku) [NEW]
│   ├── /penerbitan/katalog - Katalog Terbitan
│   ├── /penerbitan/preorder - Pre-order
│   ├── /penerbitan/ajukan - Ajukan Naskah
│   └── /penerbitan/digital - E-book Store
│
├── /kontak (Resepsionis)
│   ├── /kontak/lokasi - Peta & Lokasi
│   ├── /kontak/faq - FAQ
│   ├── /kontak/keanggotaan - Daftar Anggota
│   └── /kontak/feedback - Kritik & Saran
│
└── /[utilitas]
    ├── /sitemap.xml
    ├── /robots.txt
    └── /manifest.json
```

### 5.2 Navigation Structure

#### Primary Navigation (Header)
```
┌────────────────────────────────────────────────────────────────────┐
│  🏠 RUMAH ALETHEIA                                                 │
│  part of Academos                                                  │
├────────────────────────────────────────────────────────────────────┤
│  Beranda  │  Tentang ▼  │  Jelajahi ▼  │  Layanan ▼  │  Kontak   │
│                                                                    │
│            ├─ Academos     ├─ Koleksi      ├─ Perpustakaan         │
│            ├─ Aletheia     ├─ Kegiatan     ├─ Penelitian           │
│            ├─ Tim          ├─ Baca         ├─ Penerbitan           │
│            └─ Sejarah      └─ Belajar      └─ Pendidikan           │
└────────────────────────────────────────────────────────────────────┘
```

#### Room-based Navigation (Alternative)
```
┌────────────────────────────────────────────────────────────────────┐
│                     🚪 MASUK KE RUANGAN                            │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   🏡 Teras    🛋️ Ruang Tamu    🌳 Taman    📚 Galeri    💡 Belajar │
│                                                                    │
│   📖 R.Baca   🔬 Studio        📕 Toko     📞 Resepsionis          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 6. DESIGN SYSTEM BARU

### 6.1 Color Palette (Expanded)

#### Primary Colors
```css
/* Deep Teal - Wisdom, Trust, Depth */
--teal-900: #1A3D3B;  /* Darkest - Headers, Primary actions */
--teal-700: #2C5F5D;  /* Primary - Main brand color */
--teal-500: #3A7A77;  /* Medium - Hover states */
--teal-300: #6BA3A0;  /* Light - Backgrounds */
--teal-100: #D4E5E4;  /* Lightest - Subtle backgrounds */

/* Terracotta - Courage, Warmth, Action */
--terra-900: #7A3D26;  /* Darkest */
--terra-700: #B05E3F;  /* Primary - Accent */
--terra-500: #C67B5D;  /* Medium */
--terra-300: #DBA68F;  /* Light */
--terra-100: #F5DDD3;  /* Lightest */

/* Warm Cream - Comfort, Paper, Home */
--cream-900: #A69A88;  /* Darkest */
--cream-700: #C4B8A6;  /* Medium */
--cream-500: #E0D6C8;  /* Light */
--cream-300: #F0EBE3;  /* Base background */
--cream-100: #FAF8F5;  /* Lightest */
```

#### Semantic Colors
```css
/* Room-specific atmospheres */
--room-teras: linear-gradient(135deg, #F5F1E8 0%, #E8DED0 100%);
--room-tamu: linear-gradient(180deg, #F0EBE3 0%, #DDD5C7 100%);
--room-taman: linear-gradient(135deg, #E8F0E4 0%, #D4E5E4 100%);
--room-galeri: linear-gradient(180deg, #FAF8F5 0%, #F0EBE3 100%);
--room-baca: linear-gradient(180deg, #2C5F5D 0%, #1A3D3B 100%);
--room-belajar: #FFFFFF;
--room-riset: #F8F9FA;
--room-toko: linear-gradient(135deg, #F5DDD3 0%, #F0EBE3 100%);
```

### 6.2 Typography System

#### Font Stack
```css
/* Headings - Editorial, Classic */
--font-display: 'Playfair Display', 'Crimson Text', Georgia, serif;

/* Body - Readable, Modern */
--font-body: 'Source Sans Pro', 'Inter', -apple-system, sans-serif;

/* Accent - Literary, Elegant */
--font-accent: 'Lora', 'Merriweather', serif;

/* Mono - Code, Data */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale
```css
/* Responsive type scale using clamp() */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
--text-5xl: clamp(3rem, 2rem + 5vw, 4.5rem);
```

### 6.3 Spacing System

```css
/* Based on 4px grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 6.4 Component Patterns

#### Cards (Room-aware)
```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║                                   ║  │
│  ║   🏷️ KATEGORI                     ║  │
│  ║                                   ║  │
│  ║   Judul Card                      ║  │
│  ║   ───────────                     ║  │
│  ║   Deskripsi singkat yang          ║  │
│  ║   menjelaskan konten card         ║  │
│  ║                                   ║  │
│  ║   [ CTA Button ]                  ║  │
│  ║                                   ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  Border-left: 4px Terracotta            │
│  Shadow: subtle, soft                   │
│  Hover: lift + deeper shadow            │
│                                         │
└─────────────────────────────────────────┘
```

#### Navigation Indicator (Room metaphor)
```
┌─────────────────────────────────────────┐
│                                         │
│  📍 Anda berada di: Galeri Koleksi      │
│                                         │
│  Beranda → Jelajahi → Koleksi           │
│                                         │
└─────────────────────────────────────────┘
```

### 6.5 Animation Principles

#### Transition Timings
```css
/* Quick - Micro-interactions */
--duration-fast: 150ms;
--ease-fast: cubic-bezier(0.4, 0, 0.2, 1);

/* Normal - Standard transitions */
--duration-normal: 300ms;
--ease-normal: cubic-bezier(0.4, 0, 0.2, 1);

/* Slow - Page transitions */
--duration-slow: 500ms;
--ease-slow: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

#### Room Transition Effect
```
Page enter: Fade in + slight scale up (0.98 → 1)
Page exit: Fade out + slight scale down (1 → 0.98)
Duration: 400ms
Easing: ease-out
```

---

## 7. PHASE IMPLEMENTASI

### Phase 0: Persiapan (1 minggu)
**Objective**: Setup foundation dan dokumentasi

| Task | Output | Priority |
|------|--------|----------|
| Update copilot-instructions.md | Instructions baru | 🔴 High |
| Create design tokens file | CSS variables | 🔴 High |
| Setup new folder structure | Directory structure | 🔴 High |
| Update package.json dependencies | New packages | 🟡 Medium |
| Create component inventory | Spreadsheet | 🟡 Medium |

### Phase 1: Core Infrastructure (2 minggu)
**Objective**: Rebuild foundation with new design system

| Task | Output | Priority |
|------|--------|----------|
| New globals.css dengan design tokens | CSS file | 🔴 High |
| New layout.tsx dengan metadata | Layout component | 🔴 High |
| Room-aware Header component | Header.tsx | 🔴 High |
| Room-aware Footer component | Footer.tsx | 🔴 High |
| Breadcrumb component | Breadcrumb.tsx | 🟡 Medium |
| Navigation system (mega menu) | Nav components | 🔴 High |

### Phase 2: Homepage Redesign (2 minggu)
**Objective**: Implement "Halaman Depan" + "Teras" concept

| Task | Output | Priority |
|------|--------|----------|
| Hero section - Gerbang design | Hero component | 🔴 High |
| Teras overview section | Overview component | 🔴 High |
| Unit layanan showcase | Services component | 🔴 High |
| Quick stats section | Stats component | 🟡 Medium |
| Newsletter section | Newsletter component | 🟡 Medium |
| Animated transitions | Animations | 🟢 Low |

### Phase 3: About Pages (1.5 minggu)
**Objective**: Implement "Ruang Tamu" with organization info

| Task | Output | Priority |
|------|--------|----------|
| /tentang landing page | Page component | 🔴 High |
| /tentang/academos | Academos info page | 🔴 High |
| /tentang/aletheia | Library info page | 🔴 High |
| /tentang/tim | Team page | 🟡 Medium |
| /tentang/sejarah | History timeline | 🟡 Medium |
| Stats showcase component | Stats.tsx | 🟡 Medium |

### Phase 4: Explore Pages (2 minggu)
**Objective**: Implement "Taman" + "Galeri" concepts

| Task | Output | Priority |
|------|--------|----------|
| /kegiatan redesign | Activities page | 🔴 High |
| Event calendar component | Calendar.tsx | 🟡 Medium |
| /koleksi redesign | Collection page | 🔴 High |
| Book catalog with filters | Catalog.tsx | 🔴 High |
| Search functionality | Search.tsx | 🔴 High |
| Category navigation | Categories.tsx | 🟡 Medium |

### Phase 5: New Service Pages (2.5 minggu)
**Objective**: Create new pages for expanded services

| Task | Output | Priority |
|------|--------|----------|
| /baca - Digital reading room | Reading page | 🔴 High |
| /belajar - Learning hub | Learning page | 🔴 High |
| /penelitian - Research studio | Research page | 🔴 High |
| /penerbitan - Publishing store | Publishing page | 🔴 High |
| Article/content components | Content.tsx | 🟡 Medium |
| Resource cards | ResourceCard.tsx | 🟡 Medium |

### Phase 6: Contact & Utilities (1 minggu)
**Objective**: Update contact with correct info

| Task | Output | Priority |
|------|--------|----------|
| /kontak redesign | Contact page | 🔴 High |
| Interactive map (Karawang) | Map component | 🟡 Medium |
| FAQ accordion update | FAQ.tsx | 🟡 Medium |
| Membership form | Membership.tsx | 🟡 Medium |
| Update sitemap.ts | Sitemap | 🟢 Low |

### Phase 7: Polish & Optimization (1.5 minggu)
**Objective**: Final touches and performance

| Task | Output | Priority |
|------|--------|----------|
| Page transitions | Transitions | 🟡 Medium |
| Loading states | Loaders | 🟡 Medium |
| Error pages (404, 500) | Error pages | 🟡 Medium |
| SEO optimization | Meta tags | 🔴 High |
| Performance audit | Report | 🔴 High |
| Accessibility audit | Report | 🔴 High |
| Cross-browser testing | Test results | 🟡 Medium |

### Timeline Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                      IMPLEMENTATION TIMELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Week 1      │ Phase 0: Persiapan                                  │
│  Week 2-3    │ Phase 1: Core Infrastructure                        │
│  Week 4-5    │ Phase 2: Homepage Redesign                          │
│  Week 6-7    │ Phase 3: About Pages                                │
│  Week 8-9    │ Phase 4: Explore Pages                              │
│  Week 10-12  │ Phase 5: New Service Pages                          │
│  Week 13     │ Phase 6: Contact & Utilities                        │
│  Week 14-15  │ Phase 7: Polish & Optimization                      │
│                                                                     │
│  TOTAL: ~15 minggu (3.5 bulan)                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. KOMPONEN VISUAL & INTERAKSI

### 8.1 Micro-interactions

#### Hover Effects
```
Button hover:
  - Transform: translateY(-2px)
  - Shadow: increase depth
  - Background: slightly darker
  - Duration: 200ms

Card hover:
  - Transform: translateY(-4px) scale(1.01)
  - Shadow: prominent elevation
  - Border color: accent color
  - Duration: 300ms

Link hover:
  - Underline animation (left to right)
  - Color: terracotta
  - Duration: 200ms
```

#### Scroll Animations
```
Fade in up:
  - Initial: opacity 0, translateY(20px)
  - Final: opacity 1, translateY(0)
  - Trigger: element enters viewport

Stagger children:
  - Each child delays by 100ms
  - Creates cascade effect
```

### 8.2 Room Transition Concept

```javascript
// Pseudo-code for room transitions
const roomTransition = {
  exitAnimation: {
    opacity: [1, 0],
    transform: ['scale(1)', 'scale(0.98)'],
    duration: 200
  },
  enterAnimation: {
    opacity: [0, 1],
    transform: ['scale(0.98)', 'scale(1)'],
    duration: 300
  },
  backgroundChange: true, // Gradual background shift
  soundEffect: false // Optional ambient sounds
}
```

### 8.3 Interactive Elements

#### Reading Progress Indicator
```
┌─────────────────────────────────────────┐
│  📖 Progress Membaca                    │
│  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 42%             │
│  Artikel: "Sejarah Perpustakaan"        │
└─────────────────────────────────────────┘
```

#### Room Navigation Map
```
┌─────────────────────────────────────────┐
│         🗺️ PETA RUMAH ALETHEIA          │
├─────────────────────────────────────────┤
│                                         │
│     ┌───┐                               │
│     │ T │  T = Teras                    │
│     └─┬─┘  G = Galeri                   │
│       │    R = Ruang Tamu               │
│  ┌────┼────┐                            │
│  │ R  │  G │                            │
│  └────┼────┘                            │
│       │                                 │
│    [📍Anda di sini]                     │
│                                         │
└─────────────────────────────────────────┘
```

### 8.4 Accessibility Features

| Feature | Implementation |
|---------|----------------|
| **Skip links** | Skip to main content, navigation |
| **Focus indicators** | Custom visible focus ring |
| **ARIA labels** | Descriptive labels for all interactive elements |
| **Keyboard navigation** | Full keyboard support |
| **Screen reader** | Semantic HTML + ARIA |
| **Color contrast** | WCAG AA minimum |
| **Reduced motion** | Respect prefers-reduced-motion |
| **Text scaling** | Support up to 200% zoom |

---

## 9. TEKNOLOGI & TOOLS

### 9.1 Tech Stack (Updated)

| Category | Current | Updated | Reason |
|----------|---------|---------|--------|
| Framework | Next.js 16.1.0 | Next.js 16.x | Keep current |
| Language | TypeScript | TypeScript | Keep current |
| Styling | Tailwind CSS 4.0 | Tailwind CSS 4.0 | Keep current |
| Animation | CSS | Framer Motion | Better page transitions |
| Icons | Inline SVG | Lucide React | Consistent, tree-shakeable |
| Forms | Native | React Hook Form | Better validation |
| State | None | Zustand (optional) | Simple state management |
| Maps | None | Leaflet | Open-source maps |

### 9.2 New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.x",
    "lucide-react": "^0.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",
    "date-fns": "^3.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x",
    "@tailwindcss/forms": "^0.5.x"
  }
}
```

### 9.3 File Structure (New)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Homepage
│   ├── (rooms)/                    # Room-based routing group
│   │   ├── tentang/
│   │   │   ├── page.tsx
│   │   │   ├── academos/page.tsx
│   │   │   ├── aletheia/page.tsx
│   │   │   ├── tim/page.tsx
│   │   │   └── sejarah/page.tsx
│   │   ├── kegiatan/
│   │   │   ├── page.tsx
│   │   │   ├── kalender/page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── koleksi/
│   │   │   ├── page.tsx
│   │   │   ├── kategori/[slug]/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── baca/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── belajar/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── penelitian/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── penerbitan/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── kontak/
│   │       └── page.tsx
│   ├── globals.css
│   └── sitemap.ts
├── components/
│   ├── ui/                         # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── layout/                     # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── RoomIndicator.tsx
│   │   └── index.ts
│   ├── sections/                   # Page sections
│   │   ├── Hero.tsx
│   │   ├── TerasOverview.tsx
│   │   ├── ServicesShowcase.tsx
│   │   ├── StatsShowcase.tsx
│   │   ├── Newsletter.tsx
│   │   └── index.ts
│   ├── features/                   # Feature components
│   │   ├── BookCatalog.tsx
│   │   ├── EventCalendar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── FAQ.tsx
│   │   └── index.ts
│   └── animations/                 # Animation components
│       ├── PageTransition.tsx
│       ├── FadeIn.tsx
│       ├── SlideIn.tsx
│       └── index.ts
├── lib/
│   ├── utils.ts                    # Utility functions
│   ├── constants.ts                # Constants & config
│   └── types.ts                    # TypeScript types
├── styles/
│   └── tokens.css                  # Design tokens
├── data/
│   ├── navigation.ts               # Navigation data
│   ├── books.ts                    # Book catalog data
│   ├── events.ts                   # Events data
│   └── team.ts                     # Team data
└── hooks/
    ├── useScrollProgress.ts
    ├── useInView.ts
    └── useMediaQuery.ts
```

---

## 📝 KESIMPULAN

### Ringkasan Perubahan Utama

1. **Brand Identity**
   - Mengintegrasikan PT Academos sebagai lembaga induk
   - Menampilkan seluruh unit layanan (perpustakaan, penelitian, penerbitan)

2. **Spatial Design**
   - Metafora "rumah perpustakaan" untuk navigasi intuitif
   - 10 "ruangan" virtual dengan atmosfer unik

3. **Neuroscience Approach**
   - Cognitive load management
   - Emotional design layers
   - Dopamine-driven engagement

4. **New Pages**
   - `/baca` - Ruang Baca digital
   - `/belajar` - Hub pembelajaran
   - `/penelitian` - Studio riset
   - `/penerbitan` - Toko buku online

5. **Technical Updates**
   - Expanded design system
   - New component architecture
   - Page transitions with Framer Motion

### Next Steps

1. ✅ Review dan approval rencana ini
2. 🔄 Mulai Phase 0: Persiapan
3. 🔄 Setup development environment
4. 🔄 Begin implementation

---

**Dokumen ini dibuat untuk PT Academos Pustaka Demokrasi**  
**Perpustakaan Rumah Aletheia**  
**academos.or.id**

*Last updated: 5 Januari 2026*
