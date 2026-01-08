/**
 * Organization Timeline
 * Historical milestones of PT Academos & Rumah Aletheia
 */

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  quote?: string;
  icon: 'building' | 'lightbulb' | 'library' | 'book' | 'users' | 'technology';
  color: 'terra' | 'teal';
  side?: 'left' | 'right';
}

export const organizationTimeline: TimelineEvent[] = [
  {
    date: '2024',
    title: 'Pendirian PT Academos',
    description: 'Berdiri secara resmi dengan SK AHU-038489.AH.01.30.Tahun 2024. Odang ditunjuk sebagai Direktur untuk memimpin visi jangka panjang.',
    quote: 'Sebuah awal baru untuk demokratisasi pengetahuan',
    icon: 'building',
    color: 'terra',
    side: 'left',
  },
  {
    date: 'Okt 2024',
    title: 'Konsep Rumah Aletheia',
    description: 'Brainstorming intensif untuk merancang perpustakaan komunitas yang tidak hanya menyediakan buku, tetapi juga menjadi rumah bagi pencinta ilmu.',
    quote: 'Aletheia — kebenaran yang terungkap melalui literasi',
    icon: 'lightbulb',
    color: 'teal',
    side: 'right',
  },
  {
    date: 'Jan 2025',
    title: 'Pembukaan Rumah Aletheia',
    description: 'Perpustakaan komunitas resmi dibuka di Jl. Patinggi, Cibadak, Karawang. SK Pendirian: 01/SK/Academos/int/X/2025. NPP: 3215184J0000003.',
    quote: 'Pintu pertama menuju ekosistem literasi terbuka',
    icon: 'library',
    color: 'terra',
    side: 'left',
  },
  {
    date: 'Mar 2025',
    title: 'Koleksi 8,000 Buku Tercapai',
    description: 'Melalui donasi dan pengadaan berkelanjutan, koleksi perpustakaan mencapai 8,000 judul dari berbagai genre: fiksi, non-fiksi, akademik, dan referensi.',
    quote: 'Setiap buku adalah jendela ke dunia baru',
    icon: 'book',
    color: 'teal',
    side: 'right',
  },
  {
    date: 'Jun 2025',
    title: 'Komunitas 2,500+ Anggota',
    description: 'Pertumbuhan komunitas pembaca yang luar biasa. Program literasi rutin seperti bedah buku, story telling anak, dan workshop menulis menarik berbagai kalangan.',
    quote: 'Komunitas yang tumbuh bersama adalah kekuatan sejati',
    icon: 'users',
    color: 'terra',
    side: 'left',
  },
  {
    date: 'Jan 2026',
    title: 'Ekspansi Digital',
    description: 'Peluncuran website academos.or.id dengan perpustakaan digital, platform artikel, dan sistem manajemen kegiatan. Akses literasi kini tanpa batas ruang dan waktu.',
    quote: 'Masa depan literasi adalah hybrid: fisik dan digital',
    icon: 'technology',
    color: 'teal',
    side: 'right',
  },
];

export const keyAchievements = [
  {
    value: '8,000',
    label: 'Koleksi Buku',
    description: 'Dari berbagai genre dan kategori untuk semua usia',
    color: 'terra',
  },
  {
    value: '2,500+',
    label: 'Anggota Aktif',
    description: 'Komunitas pembaca dari berbagai latar belakang',
    color: 'teal',
  },
  {
    value: '50+',
    label: 'Program/Tahun',
    description: 'Workshop, bedah buku, dan kegiatan literasi rutin',
    color: 'terra',
  },
];
