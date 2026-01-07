"use client";

import { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

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
          <h2 id="featured-books-heading" className="font-serif text-4xl lg:text-5xl font-bold text-teal-900 mb-4">
            Buku Pilihan
          </h2>
          <div className="w-24 h-1 bg-terra-700 mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
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
                  className="form-input w-full pl-12"
                  aria-label="Cari buku berdasarkan judul atau penulis"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                className="form-input w-full"
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
            <div className="loading-spinner mx-auto w-12 h-12"></div>
            <p className="mt-4 text-secondary">Memuat buku pilihan...</p>
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
                      <OptimizedImage
                        src={book.coverImage}
                        alt={book.title}
                        width={160}
                        height={240}
                        className="rounded-md shadow-2xl hover:scale-105 transform transition-all -rotate-[1deg]"
                      />
                    ) : (
                      <div className="w-40 h-60 bg-cream-200 rounded-md flex items-center justify-center text-sm text-secondary shadow-xl -rotate-[1deg] p-2 text-center">
                        <span>{book.title}</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full mt-3">
                    <div className="h-3 bg-gradient-to-r from-terra-400 to-terra-700 rounded-sm shadow-inner" />
                  </div>

                  <div className="mt-3 text-center w-full">
                    <h3 className="font-serif text-sm font-semibold text-teal-900 line-clamp-2">{book.title}</h3>
                    <p className="text-xs text-tertiary">{book.author}</p>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full empty-state">
                <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-secondary text-lg">
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
