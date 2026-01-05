// Data structure untuk kegiatan/events dengan foto dokumentasi

export type EventStatus = "upcoming" | "ongoing" | "completed";
export type EventType = "Workshop" | "Seminar" | "Diskusi" | "Pelatihan" | "Pameran" | "Lomba" | "Lainnya";

export interface EventPhoto {
  id: string;
  url: string;
  caption: string;
  photographer?: string;
  takenDate: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  organizer: string;
  maxParticipants?: number;
  registeredParticipants?: number;
  registrationDeadline?: string;
  contactPerson?: string;
  contactPhone?: string;
  coverImage: string;
  photos: EventPhoto[]; // Foto dokumentasi
  tags: string[];
  featured: boolean;
}

// Sample events dengan dokumentasi foto
export const events: Event[] = [
  {
    id: "event-001",
    slug: "workshop-menulis-kreatif-2026",
    title: "Workshop Menulis Kreatif: Dari Ide ke Karya",
    description: "Workshop intensif 2 hari yang membahas teknik menulis kreatif, dari mengembangkan ide hingga mewujudkannya menjadi karya tulis yang menarik. Dipandu oleh penulis berpengalaman.",
    type: "Workshop",
    status: "upcoming",
    startDate: "2026-01-15",
    endDate: "2026-01-16",
    time: "09:00 - 16:00 WIB",
    location: "Ruang Belajar, Rumah Aletheia",
    organizer: "Rumah Aletheia & Komunitas Penulis Karawang",
    maxParticipants: 30,
    registeredParticipants: 18,
    registrationDeadline: "2026-01-12",
    contactPerson: "Ibu Siti",
    contactPhone: "081382605030",
    coverImage: "/images/events/workshop-menulis.jpg",
    photos: [],
    tags: ["menulis", "kreatif", "workshop", "literasi"],
    featured: true,
  },
  {
    id: "event-002",
    slug: "diskusi-buku-sapiens",
    title: "Diskusi Buku: Sapiens oleh Yuval Noah Harari",
    description: "Sesi diskusi mendalam tentang buku 'Sapiens' yang membahas sejarah umat manusia dari perspektif yang unik. Mari berdiskusi tentang evolusi, revolusi kognitif, dan masa depan manusia.",
    type: "Diskusi",
    status: "completed",
    startDate: "2025-12-20",
    time: "14:00 - 17:00 WIB",
    location: "Taman Baca, Rumah Aletheia",
    organizer: "Rumah Aletheia",
    maxParticipants: 20,
    registeredParticipants: 20,
    contactPerson: "Mas Budi",
    contactPhone: "081382605030",
    coverImage: "/images/events/diskusi-sapiens.jpg",
    photos: [
      {
        id: "photo-001",
        url: "/images/events/sapiens/diskusi-1.jpg",
        caption: "Pembukaan diskusi buku Sapiens oleh moderator",
        photographer: "Andi Pratama",
        takenDate: "2025-12-20",
      },
      {
        id: "photo-002",
        url: "/images/events/sapiens/diskusi-2.jpg",
        caption: "Peserta antusias berdiskusi tentang revolusi kognitif",
        photographer: "Andi Pratama",
        takenDate: "2025-12-20",
      },
      {
        id: "photo-003",
        url: "/images/events/sapiens/diskusi-3.jpg",
        caption: "Sesi tanya jawab yang interaktif",
        photographer: "Andi Pratama",
        takenDate: "2025-12-20",
      },
      {
        id: "photo-004",
        url: "/images/events/sapiens/group-photo.jpg",
        caption: "Foto bersama peserta diskusi buku",
        photographer: "Andi Pratama",
        takenDate: "2025-12-20",
      },
    ],
    tags: ["diskusi buku", "sapiens", "sejarah", "filsafat"],
    featured: true,
  },
  {
    id: "event-003",
    slug: "pelatihan-literasi-digital-guru",
    title: "Pelatihan Literasi Digital untuk Guru",
    description: "Program pelatihan khusus untuk guru dalam mengintegrasikan literasi digital ke dalam pembelajaran. Mencakup penggunaan tools digital, keamanan online, dan metode pengajaran berbasis teknologi.",
    type: "Pelatihan",
    status: "completed",
    startDate: "2025-12-10",
    endDate: "2025-12-11",
    time: "08:00 - 15:00 WIB",
    location: "Ruang Belajar, Rumah Aletheia",
    organizer: "Rumah Aletheia & Dinas Pendidikan Karawang",
    maxParticipants: 40,
    registeredParticipants: 38,
    contactPerson: "Pak Agus",
    contactPhone: "081382605030",
    coverImage: "/images/events/pelatihan-guru.jpg",
    photos: [
      {
        id: "photo-005",
        url: "/images/events/pelatihan-guru/opening.jpg",
        caption: "Sambutan Kepala Dinas Pendidikan",
        photographer: "Tim Dokumentasi",
        takenDate: "2025-12-10",
      },
      {
        id: "photo-006",
        url: "/images/events/pelatihan-guru/praktek.jpg",
        caption: "Guru-guru mempraktekkan penggunaan platform digital",
        photographer: "Tim Dokumentasi",
        takenDate: "2025-12-10",
      },
      {
        id: "photo-007",
        url: "/images/events/pelatihan-guru/presentasi.jpg",
        caption: "Sesi presentasi hasil workshop kelompok",
        photographer: "Tim Dokumentasi",
        takenDate: "2025-12-11",
      },
      {
        id: "photo-008",
        url: "/images/events/pelatihan-guru/sertifikat.jpg",
        caption: "Penyerahan sertifikat kepada peserta",
        photographer: "Tim Dokumentasi",
        takenDate: "2025-12-11",
      },
    ],
    tags: ["pelatihan", "literasi digital", "guru", "pendidikan"],
    featured: false,
  },
  {
    id: "event-004",
    slug: "pameran-buku-langka-nusantara",
    title: "Pameran Buku Langka Nusantara",
    description: "Pameran koleksi buku-buku langka dan berharga tentang sejarah, budaya, dan literatur Nusantara. Kesempatan langka untuk melihat buku-buku bersejarah dari berbagai era.",
    type: "Pameran",
    status: "ongoing",
    startDate: "2026-01-05",
    endDate: "2026-01-12",
    time: "10:00 - 18:00 WIB",
    location: "Galeri Koleksi, Rumah Aletheia",
    organizer: "Rumah Aletheia",
    contactPerson: "Ibu Dewi",
    contactPhone: "081382605030",
    coverImage: "/images/events/pameran-buku.jpg",
    photos: [
      {
        id: "photo-009",
        url: "/images/events/pameran-buku/display-1.jpg",
        caption: "Display buku-buku langka era kolonial",
        photographer: "Fotografer Pameran",
        takenDate: "2026-01-05",
      },
      {
        id: "photo-010",
        url: "/images/events/pameran-buku/pengunjung.jpg",
        caption: "Pengunjung menyimak koleksi buku langka",
        photographer: "Fotografer Pameran",
        takenDate: "2026-01-05",
      },
    ],
    tags: ["pameran", "buku langka", "sejarah", "budaya"],
    featured: true,
  },
  {
    id: "event-005",
    slug: "lomba-menulis-cerpen-remaja",
    title: "Lomba Menulis Cerpen Remaja 2026",
    description: "Kompetisi menulis cerpen untuk pelajar SMP dan SMA se-Karawang. Tema: 'Harapan di Tengah Perubahan'. Total hadiah 10 juta rupiah untuk juara 1, 2, dan 3.",
    type: "Lomba",
    status: "upcoming",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    time: "Pengumpulan: 1-28 Februari 2026",
    location: "Online (pengumpulan) & Rumah Aletheia (pengumuman)",
    organizer: "Rumah Aletheia & Pemkab Karawang",
    registrationDeadline: "2026-02-25",
    contactPerson: "Mbak Rina",
    contactPhone: "081382605030",
    coverImage: "/images/events/lomba-cerpen.jpg",
    photos: [],
    tags: ["lomba", "menulis", "cerpen", "remaja", "pelajar"],
    featured: true,
  },
];

// Helper functions
export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getEventsByStatus(status: EventStatus): Event[] {
  return events.filter(event => event.status === status);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const upcoming = events
    .filter(event => event.status === "upcoming")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getCompletedEvents(limit?: number): Event[] {
  const completed = events
    .filter(event => event.status === "completed")
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  
  return limit ? completed.slice(0, limit) : completed;
}

export function getFeaturedEvents(limit: number = 3): Event[] {
  return events
    .filter(event => event.featured)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, limit);
}

export function getEventsByType(type: EventType): Event[] {
  return events.filter(event => event.type === type);
}

export function searchEvents(query: string): Event[] {
  const lowercaseQuery = query.toLowerCase();
  return events.filter(
    event =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      event.location.toLowerCase().includes(lowercaseQuery)
  );
}

export const eventTypes: EventType[] = [
  "Workshop",
  "Seminar",
  "Diskusi",
  "Pelatihan",
  "Pameran",
  "Lomba",
  "Lainnya",
];
