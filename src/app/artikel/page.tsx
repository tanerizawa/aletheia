import type { Metadata } from "next";
import Link from "next/link";
import { DocumentIcon, ClockIcon, HeartFilledIcon } from "@/components/icons";
import CategoryIcon from "@/components/CategoryIcon";
import { formatDate } from '@/lib/dateUtils';

interface Article {
  slug: string;
  featured?: boolean;
  category?: string;
  publishedDate?: string;
  title?: string;
  excerpt?: string;
  author?: { name?: string; role?: string };
  readTime?: number;
  views?: number;
  likes?: number;
  tags?: string[];
  coverImage?: string;
  content?: string;
}

export const metadata: Metadata = {
  title: "Artikel & Blog - Literasi, Pendidikan, Penelitian",
  description: "Baca artikel berkualitas tentang literasi, pendidikan, penelitian, budaya, dan topik menarik lainnya dari Rumah Aletheia.",
  keywords: ["artikel", "blog", "literasi", "pendidikan", "penelitian", "budaya"],
};

async function getArticles(): Promise<{ articles: Article[] }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/articles?limit=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { articles: [] };
    const data = await res.json();
    return { articles: (data.articles || []) as Article[] };
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return { articles: [] };
  }
}

async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/stats`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
}

export default async function ArtikelPage() {
  const { articles } = await getArticles();
  const stats = await getStats();
  
  const featuredArticles = articles.filter((a: Article) => a.featured).slice(0, 2);
  const recentArticles = articles.slice(0, 6);
  
  // Get unique categories
  const articleCategories = Array.from(new Set(articles.map((a: Article) => a.category || 'Lainnya')));

  return (
    <main className="flex-grow bg-[#E8E3DB]">
      {/* Hero Section */}
      <section className="hero-outer py-16 border-b-4 border-[#B05E3F]">
        <div className="hero-inner">
          <div className="flex items-center gap-3 mb-4 hero-label">
            <DocumentIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Perpustakaan Pengetahuan</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold hero-title mb-6">
            Artikel & Blog
          </h1>
          
          <p className="text-xl hero-lead max-w-3xl leading-relaxed mb-8">
            Eksplorasi ide-ide, pengetahuan, dan wawasan mendalam — dari literasi, pendidikan, penelitian, 
            hingga budaya dan isu sosial. Bacaan yang menginspirasi dan memperluas perspektif
          </p>
          
          {/* Search Bar */}
          <form method="GET" action="/artikel/search" className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Cari artikel berdasarkan judul, topik, atau tag..."
                className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-[#FAF8F5]/30 bg-white/10 text-[#FAF8F5] placeholder-[#D4A574]/60 focus:outline-none focus:border-[#B05E3F] focus:bg-white/20 transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#B05E3F] text-white p-2 rounded hover:bg-[#9A5035] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-[#D4A574]">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-bold">{stats?.articles?.published || articles.length}</span> Artikel
            </div>
            <div className="flex items-center gap-2 text-[#D4A574]">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-bold">{articleCategories.length}</span> Kategori
            </div>
            <div className="flex items-center gap-2 text-[#D4A574]">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Update Rutin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10">
              Artikel Unggulan
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article: Article) => (
                <Link
                  key={article.slug}
                  href={`/artikel/${article.slug}`}
                  className="group bg-[#E8E3DB] border-2 border-[#C4BDB2] hover:border-[#B05E3F] hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="h-64 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center overflow-hidden">
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      <CategoryIcon category={article.category} className="w-24 h-24" />
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-sm text-[#7A7A7A]">
                        {formatDate(article.publishedDate, 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#1F4E4C] mb-4 group-hover:text-[#B05E3F] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-[#5A5A5A] leading-relaxed mb-6">
                      {article.excerpt}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#2C5F5D] flex items-center justify-center text-white font-bold">
                        {article.author?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1F4E4C]">{article.author?.name || 'Anonymous'}</p>
                        <p className="text-xs text-[#7A7A7A]">{article.author?.role || 'Kontributor'}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-[#7A7A7A] pt-4 border-t border-[#C4BDB2]">
                      <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> {article.readTime ?? 0} menit</span>
                      <span>{article.views ?? 0} views</span>
                      <span className="flex items-center gap-1"><HeartFilledIcon className="w-3.5 h-3.5 text-red-500" /> {article.likes ?? 0} likes</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(article.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white text-[#7A7A7A] rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10 text-center">
            Jelajahi Berdasarkan Kategori
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {articleCategories.map((category: string) => (
              <Link
                key={category}
                href={`/artikel/kategori/${category.toLowerCase()}`}
                className="group p-6 bg-white border-2 border-[#C4BDB2] hover:border-[#2C5F5D] hover:bg-[#E8E3DB] transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  <CategoryIcon category={category} className="w-10 h-10 mx-auto text-[#2C5F5D] group-hover:text-[#B05E3F] transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-[#1F4E4C] group-hover:text-[#2C5F5D]">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10">
            Artikel Terbaru
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article: Article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="group bg-[#E8E3DB] border-2 border-[#C4BDB2] hover:border-[#B05E3F] hover:shadow-lg transition-all"
              >
                {/* Cover */}
                <div className="h-48 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center">
                  <div className="text-white group-hover:scale-110 transition-transform">
                    <CategoryIcon category={article.category} className="w-16 h-16" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-[#B05E3F]/10 text-[#B05E3F] text-xs font-bold uppercase">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#7A7A7A]">
                      {formatDate(article.publishedDate, 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#5A5A5A] line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Author */}
                    <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#2C5F5D] flex items-center justify-center text-white text-xs font-bold">
                      {article.author?.name?.charAt(0) ?? 'A'}
                    </div>
                    <span className="text-xs text-[#7A7A7A]">{article.author?.name ?? 'Anonymous'}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#7A7A7A] pt-3 border-t border-[#C4BDB2]">
                    <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> {article.readTime}</span>
                    <span>views {article.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#FAF8F5] mb-6">
            Ingin Berkontribusi?
          </h2>
          <p className="text-xl text-[#D4A574] mb-8">
            Kirimkan artikel Anda dan bagikan pengetahuan dengan komunitas kami
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-[#B05E3F] text-[#FAF8F5] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
