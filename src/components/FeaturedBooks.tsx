'use client';

import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  publishedYear?: number;
  rating?: number;
  coverImage?: string;
}

export default function FeaturedBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/api/public/ebooks?featured=true&limit=20');
        if (!res.ok) throw new Error('Failed to fetch');
        const { ebooks } = await res.json();
        setFeaturedBooks(ebooks);
      } catch (error) {
        console.error('Failed to fetch featured books:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const categories = ['Semua', ...Array.from(new Set(featuredBooks.map(book => book.category)))];

  const filteredBooks = featuredBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 lg:py-20 bg-cream-soft-white" aria-labelledby="featured-books-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-books-heading" className="font-serif text-4xl lg:text-5xl font-bold text-[#1F4E4C] mb-4">
            Buku Pilihan
          </h2>
          <div className="w-24 h-1 bg-[#B05E3F] mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Koleksi buku terpilih yang direkomendasikan untuk Anda
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="book-search" className="sr-only">Cari buku</label>
              <div className="relative">
                <input
                  id="book-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari judul atau penulis..."
                  className="w-full px-5 py-3 pl-12 border-2 border-cream-beige rounded focus:outline-none focus:border-[#B05E3F] focus:ring-2 focus:ring-[#B05E3F] focus:ring-opacity-20 transition-all"
                  aria-label="Cari buku berdasarkan judul atau penulis"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="md:w-64">
              <label htmlFor="category-filter" className="sr-only">Filter kategori</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-3 border-2 border-cream-beige rounded focus:outline-none focus:border-[#B05E3F] focus:ring-2 focus:ring-[#B05E3F] focus:ring-opacity-20 transition-all bg-white"
                aria-label="Filter buku berdasarkan kategori"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#B05E3F] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Memuat buku pilihan...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <a
                  key={book.id}
                  href={`/baca/${book.id}`}
                  className="flex flex-col items-center bg-white p-4 hover:translate-y-0 transition-transform"
                >
                  <div className="flex items-end justify-center w-full">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-40 h-60 object-cover rounded-md shadow-2xl hover:scale-105 transform transition-all -rotate-[1deg]"
                      />
                    ) : (
                      <div className="w-40 h-60 bg-cream-200 rounded-md flex items-center justify-center text-sm text-gray-700 shadow-xl -rotate-[1deg] p-2 text-center">
                        <span>{book.title}</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full mt-3">
                    <div className="h-3 bg-gradient-to-r from-[#D4A574] to-[#B05E3F] rounded-sm shadow-inner" />
                  </div>

                  <div className="mt-3 text-center w-full">
                    <h3 className="font-serif text-sm font-semibold text-[#1F4E4C] line-clamp-2">{book.title}</h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="w-16 h-16 mx-auto text-cream-beige mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg">
                  Tidak ada buku yang sesuai dengan pencarian Anda
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
