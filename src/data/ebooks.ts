// Data structure untuk ebook perpustakaan digital

export type EbookCategory = 
  | "Fiksi"
  | "Non-Fiksi"
  | "Akademik"
  | "Sejarah"
  | "Filsafat"
  | "Sastra"
  | "Sains"
  | "Teknologi"
  | "Sosial-Humaniora"
  | "Biografi";

export type EbookFormat = "PDF" | "EPUB" | "MOBI" | "Online";

export interface Ebook {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  publishYear?: number;
  category: EbookCategory;
  description: string;
  coverImage?: string;
  format: EbookFormat[];
  pages?: number;
  language: string;
  isbn?: string;
  fileUrl?: string; // URL to ebook file or reader
  fileSize?: string; // e.g., "2.5 MB"
  availableOnline: boolean;
  requiresLogin: boolean;
  downloadable: boolean;
  tags: string[];
  addedDate: string;
  rating?: number; // 1-5
  views: number;
  downloads: number;
}

// Sample ebook data
export const ebooks: Ebook[] = [
  {
    id: "ebook-001",
    title: "Sejarah Filsafat Barat",
    author: "Bertrand Russell",
    publisher: "Simon & Schuster",
    publishYear: 1945,
    category: "Filsafat",
    description: "Karya monumental yang mengulas perkembangan pemikiran filosofis dari Yunani Kuno hingga abad ke-20. Russell menjelaskan ide-ide filosofis dalam konteks sosial dan politik zamannya.",
    coverImage: "/images/ebooks/filsafat-barat.jpg",
    format: ["PDF", "EPUB"],
    pages: 895,
    language: "Indonesia",
    isbn: "978-0-671-20158-6",
    fileUrl: "/ebooks/sejarah-filsafat-barat.pdf",
    fileSize: "4.2 MB",
    availableOnline: true,
    requiresLogin: false,
    downloadable: true,
    tags: ["filsafat", "sejarah", "klasik", "pemikiran barat"],
    addedDate: "2025-01-01",
    rating: 4.8,
    views: 1250,
    downloads: 340,
  },
  {
    id: "ebook-002",
    title: "Sapiens: Riwayat Singkat Umat Manusia",
    author: "Yuval Noah Harari",
    publisher: "KPG",
    publishYear: 2018,
    category: "Sejarah",
    description: "Penelusuran sejarah manusia dari Homo sapiens pertama di Afrika hingga revolusi teknologi abad ke-21. Harari menjelaskan bagaimana manusia menjadi spesies dominan di planet ini.",
    coverImage: "/images/ebooks/sapiens.jpg",
    format: ["PDF", "EPUB", "Online"],
    pages: 512,
    language: "Indonesia",
    isbn: "978-602-424-228-4",
    fileUrl: "/reader/sapiens",
    fileSize: "3.8 MB",
    availableOnline: true,
    requiresLogin: true,
    downloadable: false,
    tags: ["sejarah", "antropologi", "evolusi", "peradaban"],
    addedDate: "2025-01-02",
    rating: 4.9,
    views: 2100,
    downloads: 0,
  },
  {
    id: "ebook-003",
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    publisher: "Hasta Mitra",
    publishYear: 1980,
    category: "Sastra",
    description: "Novel pertama dari Tetralogi Buru yang menceritakan kisah Minke, seorang pemuda Jawa yang berjuang melawan sistem kolonial. Karya sastra Indonesia yang monumental.",
    coverImage: "/images/ebooks/bumi-manusia.jpg",
    format: ["PDF", "EPUB"],
    pages: 535,
    language: "Indonesia",
    isbn: "979-8926-03-6",
    fileUrl: "/ebooks/bumi-manusia.pdf",
    fileSize: "2.1 MB",
    availableOnline: true,
    requiresLogin: false,
    downloadable: true,
    tags: ["sastra indonesia", "novel", "sejarah", "kolonialisme"],
    addedDate: "2024-12-28",
    rating: 5.0,
    views: 3420,
    downloads: 890,
  },
  {
    id: "ebook-004",
    title: "Pengantar Ilmu Komunikasi",
    author: "Dr. Deddy Mulyana",
    publisher: "Remaja Rosdakarya",
    publishYear: 2020,
    category: "Akademik",
    description: "Buku teks komprehensif tentang ilmu komunikasi yang mencakup teori, konsep, dan praktik komunikasi dalam berbagai konteks.",
    coverImage: "/images/ebooks/ilmu-komunikasi.jpg",
    format: ["PDF"],
    pages: 420,
    language: "Indonesia",
    isbn: "978-602-446-298-7",
    fileUrl: "/ebooks/pengantar-ilmu-komunikasi.pdf",
    fileSize: "5.5 MB",
    availableOnline: true,
    requiresLogin: true,
    downloadable: true,
    tags: ["akademik", "komunikasi", "pendidikan", "textbook"],
    addedDate: "2025-01-03",
    rating: 4.5,
    views: 680,
    downloads: 245,
  },
  {
    id: "ebook-005",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    publisher: "Kompas Gramedia",
    publishYear: 2019,
    category: "Filsafat",
    description: "Pengantar filosofi Stoicisme yang mudah dipahami dan relevan dengan kehidupan modern. Mengajarkan bagaimana mengelola emosi dan menghadapi tantangan hidup.",
    coverImage: "/images/ebooks/filosofi-teras.jpg",
    format: ["PDF", "EPUB", "Online"],
    pages: 320,
    language: "Indonesia",
    isbn: "978-602-412-518-9",
    fileUrl: "/reader/filosofi-teras",
    fileSize: "2.8 MB",
    availableOnline: true,
    requiresLogin: false,
    downloadable: true,
    tags: ["filsafat", "stoicisme", "self-help", "populer"],
    addedDate: "2025-01-04",
    rating: 4.7,
    views: 1890,
    downloads: 520,
  },
];

// Helper functions
export function getEbooksByCategory(category: EbookCategory): Ebook[] {
  return ebooks.filter(ebook => ebook.category === category);
}

export function getEbookById(id: string): Ebook | undefined {
  return ebooks.find(ebook => ebook.id === id);
}

export function searchEbooks(query: string): Ebook[] {
  const lowercaseQuery = query.toLowerCase();
  return ebooks.filter(
    ebook =>
      ebook.title.toLowerCase().includes(lowercaseQuery) ||
      ebook.author.toLowerCase().includes(lowercaseQuery) ||
      ebook.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      ebook.description.toLowerCase().includes(lowercaseQuery)
  );
}

export function getFeaturedEbooks(limit: number = 3): Ebook[] {
  return ebooks
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export function getPopularEbooks(limit: number = 5): Ebook[] {
  return ebooks
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getRecentEbooks(limit: number = 5): Ebook[] {
  return ebooks
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, limit);
}

export function getRelatedEbooks(ebookId: string, limit: number = 4): Ebook[] {
  const currentEbook = getEbookById(ebookId);
  if (!currentEbook) return [];
  
  return ebooks
    .filter(e => e.id !== ebookId && e.category === currentEbook.category)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export const ebookCategories: EbookCategory[] = [
  "Fiksi",
  "Non-Fiksi",
  "Akademik",
  "Sejarah",
  "Filsafat",
  "Sastra",
  "Sains",
  "Teknologi",
  "Sosial-Humaniora",
  "Biografi",
];
