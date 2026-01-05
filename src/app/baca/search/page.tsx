import type { Metadata } from "next";
import Link from "next/link";
import { ebooks, ebookCategories, searchEbooks } from "@/data/ebooks";

export const metadata: Metadata = {
  title: "Cari E-Book - Perpustakaan Digital",
  description: "Hasil pencarian e-book di perpustakaan digital Rumah Aletheia",
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchEbooksPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const results = query ? searchEbooks(query) : [];

  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-12 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-[#F5F1E8] mb-4">
            Hasil Pencarian E-Book
          </h1>
          <p className="text-[#E8DED0]">
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
                placeholder="Cari judul, penulis, atau kategori..."
                className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-[#D4C4B0] focus:outline-none focus:border-[#B05E3F] transition-all"
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
                Ditemukan <strong>{results.length}</strong> e-book
              </h2>
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((ebook) => (
                <Link
                  key={ebook.id}
                  href={`/baca/${ebook.id}`}
                  className="group bg-white p-4 border-2 border-[#D4C4B0] hover:border-[#B05E3F] hover:shadow-lg transition-all"
                >
                  <div className="bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] h-48 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-5xl">📚</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-[#B05E3F]/10 text-[#B05E3F] text-xs font-bold uppercase">
                      {ebook.category}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-[#1F4E4C] mb-1 group-hover:text-[#B05E3F] line-clamp-2">
                    {ebook.title}
                  </h3>
                  
                  <p className="text-xs text-[#5A5A5A] mb-2">
                    {ebook.author}
                  </p>
                  
                  <div className="flex items-center text-xs text-[#7A7A7A]">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{ebook.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{ebook.views} views</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">
                Tidak Ditemukan
              </h3>
              <p className="text-[#7A7A7A] mb-8">
                Maaf, tidak ada e-book yang cocok dengan pencarian "{query}"
              </p>
              <Link
                href="/baca"
                className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-8 py-3 font-bold hover:bg-[#9A5035] transition-all"
              >
                Kembali ke Perpustakaan Digital
              </Link>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">
                Mulai Pencarian
              </h3>
              <p className="text-[#7A7A7A] mb-8">
                Masukkan kata kunci untuk mencari e-book
              </p>
              
              <div className="max-w-2xl mx-auto">
                <h4 className="font-bold text-[#1F4E4C] mb-4">Kategori Populer:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {ebookCategories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat}
                      href={`/baca/kategori/${cat.toLowerCase()}`}
                      className="px-4 py-2 bg-white border-2 border-[#D4C4B0] hover:border-[#2C5F5D] text-[#1F4E4C] font-bold text-sm transition-all"
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
