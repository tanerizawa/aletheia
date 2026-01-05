# Rumah Aletheia - Library Website
# Part of PT Academos Pustaka Demokrasi

## Project Overview
Website perpustakaan Rumah Aletheia dan unit layanan PT Academos Pustaka Demokrasi dengan domain academos.or.id. Dibangun menggunakan Next.js 16.1.0, TypeScript, dan Tailwind CSS 4.0 dengan pendekatan **Neuroscience UI/UX** dan konsep **"Rumah Perpustakaan"** (spatial navigation metaphor).

## Organization Structure

### Lembaga Induk
- **Nama**: PT Academos Pustaka Demokrasi
- **SK Pendirian**: AHU-038489.AH.01.30.Tahun 2024
- **Kepala Lembaga**: Odang

### Rumah Aletheia (Perpustakaan)
- **NPP**: 3215184J0000003
- **SK Pendirian**: 01/SK/Academos/int/X/2025
- **Jenis**: UMUM - KOMUNITAS/TBM
- **Tahun Berdiri**: 2025
- **Akreditasi**: Belum

### Unit Layanan Lainnya
1. **Lembaga Penelitian Sosial** - Riset sosial, humaniora, psikologi, sejarah
2. **Penerbitan Independen** - Buku, jurnal, media digital
3. **Literasi & Pendidikan** - Program pendidikan dan literasi masyarakat

## Contact Information (AKTUAL)
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
```

## Tech Stack
- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion (planned)
- **Icons**: Lucide React (planned)
- **Fonts**: Google Fonts (Playfair Display, Source Sans Pro, Lora, Inter)
- **Package Manager**: npm

## Design Philosophy

### Neuroscience UI/UX Approach
1. **Cognitive Load Management** - Chunking, hierarchy, progressive disclosure
2. **Attention Principles** - Von Restorff, Serial Position, Hick's Law
3. **Emotional Design** - Visceral → Behavioral → Reflective layers
4. **Spatial Memory** - Room-based navigation metaphor

### Spatial Design Concept ("Rumah Perpustakaan")
Website dirancang sebagai rumah virtual dengan ruangan-ruangan:

| Ruangan | Path | Fungsi |
|---------|------|--------|
| Halaman Depan | `/` | Landing hero, welcome |
| Teras | `/` (below fold) | Overview, highlights |
| Ruang Tamu | `/tentang` | About, history, team |
| Taman | `/kegiatan` | Events, programs |
| Galeri Koleksi | `/koleksi` | Book catalog |
| Ruang Baca | `/baca` | Digital reading |
| Ruang Belajar | `/belajar` | Learning resources |
| Studio Riset | `/penelitian` | Research hub |
| Toko Buku | `/penerbitan` | Publishing store |
| Resepsionis | `/kontak` | Contact, help |

## Color Palette

### Primary Colors
```css
/* Deep Teal - Wisdom */
--teal-700: #2C5F5D;
--teal-900: #1A3D3B;

/* Terracotta - Courage */
--terra-700: #B05E3F;
--terra-500: #C67B5D;

/* Warm Cream - Comfort */
--cream-300: #F0EBE3;
--cream-100: #FAF8F5;
```

### Typography
- **Display**: Playfair Display / Crimson Text (serif)
- **Body**: Source Sans Pro / Inter (sans-serif)
- **Accent**: Lora (serif)

## Pages Structure

### Current Pages (Need Redesign)
- `/` - Homepage with hero, services, newsletter
- `/tentang` - About page with history, vision, mission, values, stats
- `/kegiatan` - Activities page with program listings
- `/koleksi` - Collection page with categories and featured books
- `/kontak` - Contact page with form and FAQ

### New Pages (Planned)
- `/baca` - Digital Reading Room
- `/belajar` - Learning Hub
- `/penelitian` - Research Studio
- `/penerbitan` - Publishing Store
- `/tentang/academos` - Parent organization info
- `/tentang/aletheia` - Library specific info
- `/tentang/tim` - Team page
- `/tentang/sejarah` - History timeline

## Components

### Existing
- `Header.tsx` - Navigation with mobile menu
- `Footer.tsx` - Footer with links and contact info
- `NewsletterForm.tsx` - Email subscription form
- `FAQ.tsx` - Accordion FAQ component
- `FeaturedBooks.tsx` - Book showcase with search & filter
- `StatsShowcase.tsx` - Animated statistics counter

### Planned New Components
- `RoomIndicator.tsx` - Shows current "room" location
- `Breadcrumb.tsx` - Navigation breadcrumbs
- `PageTransition.tsx` - Room transition animations
- `BookCatalog.tsx` - Enhanced book catalog
- `EventCalendar.tsx` - Event calendar view
- `SearchBar.tsx` - Global search
- `FilterPanel.tsx` - Advanced filters

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Documents
- **REDESIGN_PLAN.md** - Full redesign documentation with implementation phases
- **README.md** - General project info

## Design Principles
1. **Spatial metaphor** - Navigate like walking through a house
2. **Cognitive ease** - Reduce mental load with clear hierarchy
3. **Emotional connection** - Create sense of "home"
4. **Progressive disclosure** - Reveal information gradually
5. **Consistent atmosphere** - Each "room" has distinct visual identity
6. **Accessibility first** - WCAG 2.1 AA compliance

## Notes
- All pages will be statically generated (SSG)
- Forms require backend integration (future)
- Contact information is now accurate (Karawang, West Java)

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:
- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:
- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.
-->
