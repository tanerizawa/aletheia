/**
 * Navigation Configuration
 * Rumah Aletheia - Room-based navigation
 */

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: "Beranda",
    href: "/",
    icon: "🏠",
  },
  {
    title: "Tentang",
    href: "/tentang",
    icon: "🛋️",
    description: "Ruang Tamu - Mengenal Kami",
    children: [
      {
        title: "PT Academos",
        href: "/tentang/academos",
        icon: "🏛️",
        description: "Lembaga Induk",
      },
      {
        title: "Rumah Aletheia",
        href: "/tentang/aletheia",
        icon: "📚",
        description: "Perpustakaan",
      },
      {
        title: "Tim & Pengurus",
        href: "/tentang/tim",
        icon: "👥",
        description: "Kenali Kami",
      },
      {
        title: "Sejarah",
        href: "/tentang/sejarah",
        icon: "📜",
        description: "Perjalanan Kami",
      },
    ],
  },
  {
    title: "Jelajahi",
    href: "#",
    icon: "🗺️",
    description: "Eksplorasi Rumah",
    children: [
      {
        title: "Taman",
        href: "/kegiatan",
        icon: "🌳",
        description: "Kegiatan & Event",
      },
      {
        title: "Galeri Koleksi",
        href: "/koleksi",
        icon: "📚",
        description: "Katalog Buku",
      },
      {
        title: "Ruang Baca",
        href: "/baca",
        icon: "📖",
        description: "E-Book & Digital",
      },
      {
        title: "Perpustakaan Artikel",
        href: "/artikel",
        icon: "✍️",
        description: "Artikel & Blog",
      },
      {
        title: "Ruang Belajar",
        href: "/belajar",
        icon: "💡",
        description: "Kursus & Tutorial",
      },
    ],
  },
  {
    title: "Layanan",
    href: "#",
    icon: "⚙️",
    description: "Layanan Academos",
    children: [
      {
        title: "Studio Riset",
        href: "/penelitian",
        icon: "🔬",
        description: "Penelitian",
      },
      {
        title: "Toko Buku",
        href: "/penerbitan",
        icon: "📕",
        description: "Penerbitan",
      },
    ],
  },
  {
    title: "Kontak",
    href: "/kontak",
    icon: "📞",
  },
];

export const footerNavigation = {
  about: [
    { title: "PT Academos", href: "/tentang/academos" },
    { title: "Rumah Aletheia", href: "/tentang/aletheia" },
    { title: "Tim Kami", href: "/tentang/tim" },
    { title: "Sejarah", href: "/tentang/sejarah" },
  ],
  explore: [
    { title: "Kegiatan", href: "/kegiatan" },
    { title: "Koleksi Buku", href: "/koleksi" },
    { title: "E-Book Digital", href: "/baca" },
    { title: "Artikel & Blog", href: "/artikel" },
    { title: "Ruang Belajar", href: "/belajar" },
  ],
  services: [
    { title: "Penelitian", href: "/penelitian" },
    { title: "Penerbitan", href: "/penerbitan" },
    { title: "Pendidikan", href: "/belajar" },
  ],
  contact: [
    { title: "Hubungi Kami", href: "/kontak" },
    { title: "FAQ", href: "/kontak#faq" },
    { title: "Lokasi", href: "/kontak#lokasi" },
  ],
};

export const socialMedia = [
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
  },
  {
    name: "Twitter",
    href: "#",
    icon: "twitter",
  },
  {
    name: "YouTube",
    href: "#",
    icon: "youtube",
  },
];
