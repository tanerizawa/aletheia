# Rumah Aletheia - Website Perpustakaan

Website resmi perpustakaan Rumah Aletheia yang dapat diakses melalui domain **academos.or.id**.

## Tentang Proyek

Rumah Aletheia adalah website perpustakaan modern yang dibangun menggunakan Next.js dengan TypeScript dan Tailwind CSS. Website ini menyediakan informasi lengkap tentang perpustakaan termasuk kegiatan, koleksi buku, dan layanan perpustakaan.

## Desain & Filosofi

Website ini dirancang dengan pendekatan **magazine-style layout** yang mencerminkan keberanian dan kebijaksanaan melalui:

### Palet Warna (3 Warna Doff)
- **Deep Teal (#2C5F5D)**: Warna utama yang merepresentasikan kebijaksanaan, ketenangan, dan kedalaman pengetahuan
- **Terracotta (#B05E3F)**: Warna aksen yang merepresentasikan keberanian, kehangatan, dan semangat belajar
- **Warm Cream (#F5F1E8)**: Warna netral yang menciptakan kenyamanan dan ketenangan visual

### Tipografi
- **Headings**: Crimson Text (serif) - untuk kesan elegan dan literer
- **Body**: Inter (sans-serif) - untuk keterbacaan optimal
- **Accent**: Lora (serif) - untuk variasi editorial

### Struktur Magazine-Style
- Grid-based layout dengan whitespace yang generous
- Card-based design dengan border dan shadow yang subtle
- Typography hierarchy yang jelas
- Section yang terpisah dengan visual yang kuat

## Fitur Utama

### Halaman Utama
- **Halaman Beranda**: Hero section dengan informasi layanan perpustakaan
- **Tentang Kami**: Sejarah, visi, misi, nilai-nilai, dan statistik perpustakaan
- **Kegiatan**: Daftar kegiatan dan program perpustakaan
- **Koleksi**: Informasi tentang koleksi buku dengan fitur pencarian dan filter
- **Kontak**: Informasi kontak, formulir, dan FAQ interaktif

### Fitur Advanced
- **Newsletter Subscription**: Form berlangganan dengan validasi dan status feedback
- **FAQ Accordion**: Accordion interaktif untuk pertanyaan umum
- **Featured Books**: Showcase buku pilihan dengan search & filter
- **Stats Showcase**: Animated statistics counter
- **Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **SEO Optimized**: Metadata lengkap dengan Open Graph dan Twitter Cards
- **Accessibility**: WCAG 2.1 compliant dengan ARIA labels dan keyboard navigation
- **Performance**: Optimized fonts, smooth animations, dan fast loading
- **Sitemap & Robots.txt**: Untuk SEO dan indexing yang lebih baik

## Accessibility Features

Website ini dibangun dengan memperhatikan accessibility:
- ✅ Semantic HTML5 elements
- ✅ ARIA labels dan landmarks
- ✅ Skip to content link
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Screen reader friendly
- ✅ Color contrast WCAG AA compliant
- ✅ Form labels dan autocomplete attributes

## Teknologi yang Digunakan

- **Framework**: Next.js 16.1.0 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0 dengan custom color palette
- **Typography**: Google Fonts (Crimson Text, Lora, Inter)
- **Runtime**: Node.js
- **Package Manager**: npm

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Struktur Proyek

```
/
├── src/
│   ├── app/                  # App Router pages
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Halaman beranda
│   │   ├── tentang/          # Halaman tentang
│   │   ├── kegiatan/         # Halaman kegiatan
│   │   ├── koleksi/          # Halaman koleksi
│   │   └── kontak/           # Halaman kontak
│   └── components/           # Reusable components
│       ├── Header.tsx        # Navigation header
│       └── Footer.tsx        # Footer component
├── public/                   # Static files
└── ...config files
```

## Kustomisasi

### Mengubah Konten

Untuk mengubah konten website, edit file-file berikut:
- **Beranda**: `src/app/page.tsx`
- **Tentang**: `src/app/tentang/page.tsx`
- **Kegiatan**: `src/app/kegiatan/page.tsx`
- **Koleksi**: `src/app/koleksi/page.tsx`
- **Kontak**: `src/app/kontak/page.tsx`

### Mengubah Metadata

Edit metadata di setiap file page untuk SEO:
```typescript
export const metadata: Metadata = {
  title: "Judul Halaman",
  description: "Deskripsi halaman",
};
```

## Development & Deployment

### Development Server
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run prod     # Build and start in production mode
```

### Deployment to Production

Website ini siap untuk di-deploy ke production. Lihat **[DEPLOYMENT.md](./DEPLOYMENT.md)** untuk panduan lengkap deployment ke:
- ✅ **Vercel** (Recommended - Auto-deploy dari Git)
- ✅ **VPS/Dedicated Server** (Manual deployment dengan PM2 + Nginx)
- ✅ **Docker** (Container deployment)

#### Quick Deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

#### Production Build Test:
```bash
npm run build && npm start
# Visit http://localhost:3000
```

## Catatan Penting

- ⚠️ Semua data kontak dan informasi adalah placeholder - **update dengan data real sebelum deploy**
- ⚠️ Form kontak belum terintegrasi dengan backend - tambahkan API endpoint jika perlu
- ⚠️ Update domain di `src/app/sitemap.ts` dan metadata
- ✅ SSL certificate akan auto-configured jika deploy via Vercel
- ✅ Semua pages sudah static generated untuk performance optimal

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Deployment Guide](./DEPLOYMENT.md)
- [Vercel Platform](https://vercel.com)

---

**Website**: academos.or.id  
**Copyright** © 2025 Rumah Aletheia. All rights reserved.
**Status**: ✅ Production Ready

