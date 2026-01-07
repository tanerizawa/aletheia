// Data structure untuk artikel/blog

export type ArticleCategory = 
  | "Literasi"
  | "Pendidikan"
  | "Penelitian"
  | "Budaya"
  | "Teknologi"
  | "Sejarah"
  | "Opini"
  | "Tutorial";

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full content in markdown or HTML
  coverImage: string;
  category: ArticleCategory;
  author: ArticleAuthor;
  publishedDate: string;
  updatedDate?: string;
  readTime: number; // in minutes
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
}

// Sample articles
export const articles: Article[] = [
  {
    id: "article-001",
    slug: "pentingnya-literasi-digital-di-era-modern",
    title: "Pentingnya Literasi Digital di Era Modern",
    excerpt: "Literasi digital bukan hanya tentang menggunakan teknologi, tetapi memahami, mengevaluasi, dan menciptakan konten digital dengan bijak dan bertanggung jawab.",
    content: `
# Pentingnya Literasi Digital di Era Modern

Di era digital saat ini, kemampuan membaca dan menulis saja tidak lagi cukup. Literasi digital telah menjadi keterampilan esensial yang harus dimiliki setiap orang.

## Apa itu Literasi Digital?

Literasi digital adalah kemampuan untuk menggunakan teknologi informasi dan komunikasi untuk menemukan, mengevaluasi, membuat, dan mengkomunikasikan informasi, yang memerlukan keterampilan kognitif maupun teknis.

## Mengapa Penting?

1. **Akses Informasi** - Internet menyediakan akses tak terbatas ke informasi
2. **Keamanan Online** - Melindungi diri dari ancaman cyber
3. **Partisipasi Aktif** - Berkontribusi dalam diskusi digital
4. **Peluang Ekonomi** - Membuka kesempatan kerja dan bisnis online

## Komponen Literasi Digital

### 1. Literasi Informasi
Kemampuan untuk menemukan, mengevaluasi, dan menggunakan informasi secara efektif.

### 2. Literasi Media
Memahami bagaimana media digital dibuat dan dikonsumsi.

### 3. Literasi Teknologi
Keterampilan teknis dalam menggunakan perangkat dan aplikasi digital.

### 4. Etika Digital
Memahami norma dan tanggung jawab dalam berinteraksi online.

## Kesimpulan

Literasi digital adalah keterampilan abad ke-21 yang wajib dikuasai untuk sukses di dunia yang semakin digital.
    `,
    coverImage: "/images/articles/literasi-digital.jpg",
    category: "Literasi",
    author: {
      name: "Dr. Sarah Wijaya",
      role: "Peneliti Literasi Digital",
      avatar: "/images/authors/sarah.jpg",
    },
    publishedDate: "2026-01-02",
    readTime: 8,
    tags: ["literasi digital", "teknologi", "pendidikan", "internet"],
    featured: true,
    views: 1240,
    likes: 89,
  },
  {
    id: "article-002",
    slug: "metode-penelitian-kualitatif-untuk-pemula",
    title: "Metode Penelitian Kualitatif untuk Pemula",
    excerpt: "Panduan lengkap memahami dan menerapkan metode penelitian kualitatif dalam studi ilmu sosial dan humaniora.",
    content: `
# Metode Penelitian Kualitatif untuk Pemula

Penelitian kualitatif adalah pendekatan yang fokus pada pemahaman mendalam tentang fenomena sosial dan manusia.

## Karakteristik Penelitian Kualitatif

- Fokus pada makna dan pemahaman
- Pengumpulan data dalam setting natural
- Peneliti sebagai instrumen utama
- Analisis induktif
- Desain yang fleksibel

## Metode Pengumpulan Data

### Wawancara Mendalam
Percakapan terstruktur untuk mendapatkan informasi detail.

### Observasi Partisipan
Peneliti terlibat langsung dalam konteks yang diteliti.

### Analisis Dokumen
Mempelajari dokumen tertulis, visual, atau audio.

## Kesimpulan

Penelitian kualitatif memberikan wawasan mendalam yang tidak bisa didapat dari angka semata.
    `,
    coverImage: "/images/articles/penelitian-kualitatif.jpg",
    category: "Penelitian",
    author: {
      name: "Prof. Ahmad Hidayat",
      role: "Dosen Metodologi Penelitian",
      avatar: "/images/authors/ahmad.jpg",
    },
    publishedDate: "2026-01-01",
    readTime: 12,
    tags: ["penelitian", "metode kualitatif", "akademik", "ilmu sosial"],
    featured: false,
    views: 850,
    likes: 62,
  },
  {
    id: "article-003",
    slug: "sejarah-perpustakaan-di-indonesia",
    title: "Sejarah Perpustakaan di Indonesia",
    excerpt: "Menelusuri perjalanan perpustakaan di Indonesia dari masa kolonial hingga era digital modern.",
    content: `
# Sejarah Perpustakaan di Indonesia

Perpustakaan memiliki sejarah panjang di Indonesia, berkembang dari masa kolonial hingga kini.

## Era Kolonial Belanda

Perpustakaan pertama didirikan oleh pemerintah kolonial untuk kalangan terbatas.

## Pasca Kemerdekaan

Perpustakaan mulai terbuka untuk umum dan menjadi pusat pendidikan masyarakat.

## Era Digital

Transformasi perpustakaan menjadi pusat informasi digital yang modern.

## Masa Depan

Perpustakaan akan terus beradaptasi dengan teknologi dan kebutuhan masyarakat.
    `,
    coverImage: "/images/articles/sejarah-perpustakaan.jpg",
    category: "Sejarah",
    author: {
      name: "Ratna Sari, M.Hum",
      role: "Pustakawan Senior",
      avatar: "/images/authors/ratna.jpg",
    },
    publishedDate: "2025-12-30",
    readTime: 10,
    tags: ["sejarah", "perpustakaan", "indonesia", "budaya"],
    featured: true,
    views: 1560,
    likes: 104,
  },
];

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter(article => article.category === category);
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  return articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}

export function getRecentArticles(limit: number = 5): Article[] {
  return articles
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}

export function getPopularArticles(limit: number = 5): Article[] {
  return articles
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(
    article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      article.author.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function getRelatedArticles(articleId: string, limit: number = 3): Article[] {
  const currentArticle = getArticleBySlug(articleId);
  if (!currentArticle) return [];
  
  return articles
    .filter(a => a.id !== currentArticle.id && a.category === currentArticle.category)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export const articleCategories: ArticleCategory[] = [
  "Literasi",
  "Pendidikan",
  "Penelitian",
  "Budaya",
  "Teknologi",
  "Sejarah",
  "Opini",
  "Tutorial",
];
