import type { Metadata } from "next";
import Link from "next/link";
import { ReadIcon, BookIcon, FireIcon, SearchIcon } from "@/components/icons";
import CategoryIcon from "@/components/CategoryIcon";

export const metadata: Metadata = {
  title: "Perpustakaan Digital - Baca E-Book Online",
  description: "Akses koleksi e-book digital Rumah Aletheia. Baca buku online dalam berbagai kategori: fiksi, non-fiksi, akademik, sejarah, filsafat, dan lainnya.",
  keywords: ["ebook", "perpustakaan digital", "baca online", "buku digital", "pdf", "epub"],
};

async function getEbooks() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/ebooks?limit=100`, { next: { revalidate: 60 } });
    if (!res.ok) return { ebooks: [] };
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch ebooks:', error);
    return { ebooks: [] };
  }
}

export default async function BacaPage() {
  const { ebooks } = await getEbooks();
  
  const featuredEbooks = ebooks.filter((e: any) => e.rating && e.rating >= 4.5).slice(0, 3);
  const recentEbooks = ebooks.slice(0, 4);
  const popularEbooks = [...ebooks].sort((a: any, b: any) => b.views - a.views).slice(0, 5);
  const ebookCategories: string[] = Array.from(new Set(ebooks.map((e: any) => e.category)));

  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <ReadIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Ruang Baca</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Perpustakaan Digital
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed mb-8">
            Akses ribuan e-book berkualitas — gratis, tanpa batas waktu. Baca online di browser atau download 
            untuk dibaca offline. Literasi digital dimulai dari sini
          </p>
          
          {/* Search Bar */}
          <form method="GET" action="/baca/search" className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Cari judul buku, penulis, atau kategori..."
                className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-cream-soft-white/30 bg-white/10 text-cream-soft-white placeholder-cream-warm/60 focus:outline-none focus:border-[#B05E3F] focus:bg-white/20 transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#B05E3F] text-white p-2 rounded hover:bg-[#9A5035] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-cream-warm">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-bold">{ebooks.length}</span> E-Book
            </div>
            <div className="flex items-center gap-2 text-cream-warm">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="font-bold">{ebookCategories.length}</span> Kategori
            </div>
            <div className="flex items-center gap-2 text-cream-warm">
              <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Gratis Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured E-books */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-2">
                E-Book Unggulan
              </h2>
              <p className="text-gray-500">Koleksi pilihan dengan rating tertinggi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEbooks.map((ebook: any) => (
              <Link
                key={ebook.id}
                href={`/baca/${ebook.slug}`}
                className="group bg-white p-6 border-2 border-cream-beige hover:border-[#B05E3F] hover:shadow-xl transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] h-64 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {ebook.coverImage ? (
                    <img 
                      src={ebook.coverImage} 
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookIcon className="w-20 h-20 text-white/80" />
                  )}
                </div>
                
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] text-xs font-bold uppercase tracking-wider">
                    {ebook.category}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  {ebook.title}
                </h3>
                
                <p className="text-sm text-gray-500 mb-3">
                  oleh {ebook.author}
                </p>
                
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {ebook.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold">{ebook.rating}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>views {ebook.views}</span>
                    <span>⬇️ {ebook.downloads}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-cream-beige">
                  <div className="flex flex-wrap gap-2">
                    {ebook.format.map((format: string) => (
                      <span key={format} className="text-xs px-2 py-1 bg-cream-soft-white text-gray-500 rounded">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10 text-center">
            Jelajahi Berdasarkan Kategori
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ebookCategories.map((category: string) => (
              <Link
                key={category}
                href={`/baca/kategori/${category.toLowerCase()}`}
                className="group p-6 bg-cream-soft-white border-2 border-cream-beige hover:border-[#2C5F5D] hover:bg-white transition-all duration-300 text-center"
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

      {/* Recent & Popular */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent */}
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1F4E4C] mb-6 flex items-center gap-3">
                <span className="text-3xl">🆕</span>
                Baru Ditambahkan
              </h2>
              <div className="space-y-4">
                {recentEbooks.map((ebook: any) => (
                  <Link
                    key={ebook.id}
                    href={`/baca/${ebook.slug}`}
                    className="group flex gap-4 bg-white p-4 border-l-4 border-[#2C5F5D] hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 w-20 h-28 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center overflow-hidden">
                      {ebook.coverImage ? (
                        <img 
                          src={ebook.coverImage} 
                          alt={ebook.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookIcon className="w-8 h-8 text-white/80" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-[#1F4E4C] group-hover:text-[#2C5F5D] mb-1">
                        {ebook.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{ebook.author}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span> {ebook.rating}
                        </span>
                        <span>•</span>
                        <span>{ebook.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1F4E4C] mb-6 flex items-center gap-3">
                <FireIcon className="w-8 h-8 text-[#B05E3F]" />
                Paling Populer
              </h2>
              <div className="space-y-4">
                {popularEbooks.map((ebook: any, index: number) => (
                  <Link
                    key={ebook.id}
                    href={`/baca/${ebook.slug}`}
                    className="group flex gap-4 bg-white p-4 border-l-4 border-[#B05E3F] hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 w-12 flex items-center justify-center">
                      <span className="font-serif text-2xl font-bold text-[#B05E3F]">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-[#1F4E4C] group-hover:text-[#B05E3F] mb-1">
                        {ebook.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{ebook.author}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>views {ebook.views}</span>
                        <span>•</span>
                        <span>⬇️ {ebook.downloads} downloads</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream-soft-white mb-6">
            Tidak Menemukan Buku yang Dicari?
          </h2>
          <p className="text-xl text-cream-warm mb-8">
            Ajukan rekomendasi buku yang ingin ditambahkan ke koleksi digital kami
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
