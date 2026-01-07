import type { Metadata } from "next";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { ClockIcon, SearchIcon, HeartFilledIcon, DocumentIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Cari Artikel - Blog Rumah Aletheia",
  description: "Hasil pencarian artikel di blog Rumah Aletheia",
};

interface SearchPageProps {
  searchParams: { q?: string };
}

async function searchArticles(query: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/articles?search=${encodeURIComponent(query)}&limit=100`, { next: { revalidate: 60 } });
    if (!res.ok) return { articles: [] };
    return await res.json();
  } catch (error) {
    console.error('Failed to search articles:', error);
    return { articles: [] };
  }
}

async function getCategories(): Promise<string[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/articles?limit=100`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const { articles } = await res.json();
    return Array.from(new Set(articles.map((a: any) => a.category))) as string[];
  } catch (error) {
    return [];
  }
}

export default async function SearchArticlesPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const { articles: results } = query ? await searchArticles(query) : { articles: [] };
  const articleCategories: string[] = await getCategories();

  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-12 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-cream-soft-white mb-4">
            Hasil Pencarian Artikel
          </h1>
          <p className="text-cream-warm">
            {query ? `Menampilkan hasil untuk: "${query}"` : "Masukkan kata kunci pencarian"}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search Form */}
          <form method="GET" className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Cari artikel berdasarkan judul, topik, atau tag..."
                className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-cream-beige focus:outline-none focus:border-[#B05E3F] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#B05E3F] text-white p-2 rounded hover:bg-[#9A5035] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Results Count */}
          {query && (
            <div className="mb-8">
              <h2 className="text-xl text-[#1F4E4C]">
                Ditemukan <strong>{results.length}</strong> artikel
              </h2>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((article: any) => (
                <Link
                  key={article.slug}
                  href={`/artikel/${article.slug}`}
                  className="group block bg-white border-l-4 border-[#B05E3F] p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center">
                      <CategoryIcon category={article.category} className="w-16 h-16 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-[#B05E3F]/10 text-[#B05E3F] text-xs font-bold uppercase">
                          {article.category}
                        </span>
                        <span className="text-xs text-[#7A7A7A]">
                          {new Date(article.publishedDate).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-[#5A5A5A] mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-[#7A7A7A]">
                        <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {article.readTime}</span>
                        <span>{article.views} views</span>
                        <span className="flex items-center gap-1"><HeartFilledIcon className="w-4 h-4 text-red-500" /> {article.likes}</span>
                        <span className="flex items-center gap-1"><DocumentIcon className="w-4 h-4" /> {article.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <SearchIcon className="w-24 h-24 mx-auto mb-4 text-[#7A7A7A]" />
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">
                Tidak Ditemukan
              </h3>
              <p className="text-[#7A7A7A] mb-8">
                Maaf, tidak ada artikel yang cocok dengan pencarian "{query}"
              </p>
              <Link
                href="/artikel"
                className="inline-block bg-[#B05E3F] text-cream-soft-white px-8 py-3 font-bold hover:bg-[#9A5035] transition-all"
              >
                Kembali ke Artikel
              </Link>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">
                Mulai Pencarian
              </h3>
              <p className="text-[#7A7A7A] mb-8">
                Masukkan kata kunci untuk mencari artikel
              </p>
              
              <div className="max-w-2xl mx-auto">
                <h4 className="font-bold text-[#1F4E4C] mb-4">Kategori Populer:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {articleCategories.map((cat: string) => (
                    <Link
                      key={cat}
                      href={`/artikel/kategori/${cat.toLowerCase()}`}
                      className="px-4 py-2 bg-white border-2 border-cream-beige hover:border-[#2C5F5D] text-[#1F4E4C] font-bold text-sm transition-all"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
