/**
 * Organization Information
 * PT Academos Pustaka Demokrasi & Rumah Aletheia
 */

export const organization = {
  name: "PT Academos Pustaka Demokrasi",
  shortName: "Academos",
  established: 2024,
  sk: "AHU-038489.AH.01.30.Tahun 2024",
  director: "Odang",
  
  contact: {
    email: "studiomalaka@gmail.com",
    phone: "081382605030",
    website: "academos.or.id",
  },
  
  address: {
    street: "Jalan Patinggi",
    village: "Desa Cibadak",
    district: "Rawamerta",
    regency: "Karawang",
    province: "Jawa Barat",
    postalCode: "41382",
    coordinates: {
      lat: -6.240639073001823,
      lng: 107.3825141787529,
      elevation: 8.66,
    },
  },
};

export const library = {
  name: "Rumah Aletheia",
  npp: "3215184J0000003",
  sk: "01/SK/Academos/int/X/2025",
  type: "UMUM",
  subtype: "KOMUNITAS/TBM/LAINNYA",
  established: 2025,
  accreditation: "BELUM",
  director: "Odang",
  
  stats: {
    books: 8000,
    members: 2500,
    events: 50,
    visitors: 500, // monthly visitors
    established: 2025,
  },
};

export const units = [
  {
    id: "perpustakaan",
    name: "Perpustakaan",
    fullName: "Rumah Aletheia",
    icon: "library",
    description: "Perpustakaan umum komunitas yang menyediakan akses buku dan informasi untuk semua kalangan masyarakat.",
    href: "/tentang/aletheia",
  },
  {
    id: "penelitian",
    name: "Penelitian",
    fullName: "Lembaga Riset Sosial",
    icon: "research",
    description: "Melakukan penelitian sistematis dalam bidang ilmu sosial, humaniora, psikologi, linguistik, dan cagar budaya.",
    href: "/penelitian",
  },
  {
    id: "penerbitan",
    name: "Penerbitan",
    fullName: "Penerbit Independen",
    icon: "publish",
    description: "Menerbitkan buku, jurnal, majalah, dan konten digital berkualitas untuk mencerdaskan bangsa.",
    href: "/penerbitan",
  },
  {
    id: "literasi",
    name: "Literasi",
    fullName: "Pendidikan & Literasi",
    icon: "read",
    description: "Program pendidikan luar sekolah untuk meningkatkan literasi dan kapasitas masyarakat dalam berbagai bidang.",
    href: "/belajar",
  },
];

export const kbliActivities = [
  {
    code: "47612",
    name: "Perdagangan Eceran Hasil Pencetakan Dan Penerbitan",
    unit: "penerbitan",
  },
  {
    code: "58110",
    name: "Penerbitan Buku",
    unit: "penerbitan",
  },
  {
    code: "58120",
    name: "Penerbitan Direktori dan Mailing List",
    unit: "penerbitan",
  },
  {
    code: "58130",
    name: "Penerbitan Surat Kabar, Jurnal Dan Buletin Atau Majalah",
    unit: "penerbitan",
  },
  {
    code: "58190",
    name: "Aktivitas Penerbitan lainnya",
    unit: "penerbitan",
  },
  {
    code: "58200",
    name: "Penerbitan piranti lunak (Software)",
    unit: "penerbitan",
  },
  {
    code: "59201",
    name: "Aktivitas Perekaman Suara",
    unit: "penerbitan",
  },
  {
    code: "59202",
    name: "Aktivitas Penerbitan Musik Dan Buku Musik",
    unit: "penerbitan",
  },
  {
    code: "72102",
    name: "Penelitian Dan Pengembangan Teknologi Dan Rekayasa",
    unit: "penelitian",
  },
  {
    code: "72105",
    name: "Penelitian Dan Pengembangan Ilmu Pertanian, Peternakan, dan Kehutanan",
    unit: "penelitian",
  },
  {
    code: "72201",
    name: "Penelitian Dan Pengembangan Ilmu Pengetahuan Sosial",
    unit: "penelitian",
  },
  {
    code: "72202",
    name: "Penelitian Dan Pengembangan Linguistik dan Sastra",
    unit: "penelitian",
  },
  {
    code: "72204",
    name: "Penelitian Dan Pengembangan Seni",
    unit: "penelitian",
  },
  {
    code: "72205",
    name: "Penelitian Dan Pengembangan Psikologi",
    unit: "penelitian",
  },
  {
    code: "72206",
    name: "Penelitian Dan Pengembangan Sejarah/Cagar Budaya",
    unit: "penelitian",
  },
  {
    code: "72209",
    name: "Penelitian Dan Pengembangan Ilmu Pengetahuan Sosial dan Humaniora Lainnya",
    unit: "penelitian",
  },
  {
    code: "73201",
    name: "Penelitian Pasar",
    unit: "penelitian",
  },
  {
    code: "73202",
    name: "Jajak Pendapat Masyarakat",
    unit: "penelitian",
  },
  {
    code: "85499",
    name: "Pendidikan Lainnya Swasta",
    unit: "literasi",
  },
  {
    code: "90025",
    name: "Jurnalis Berita Independen",
    unit: "literasi",
  },
];
