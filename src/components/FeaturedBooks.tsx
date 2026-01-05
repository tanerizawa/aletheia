'use client';

import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  year: number;
}

const featuredBooks: Book[] = [
  { id: 1, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "Sejarah & Sosial", year: 2011 },
  { id: 2, title: "Filsafat Teras", author: "Henry Manampiring", category: "Filsafat & Teologi", year: 2018 },
  { id: 3, title: "Atomic Habits", author: "James Clear", category: "Bisnis & Pengembangan Diri", year: 2018 },
  { id: 4, title: "Dunia Sophie", author: "Jostein Gaarder", category: "Filsafat & Teologi", year: 1991 },
  { id: 5, title: "Laskar Pelangi", author: "Andrea Hirata", category: "Sastra & Seni", year: 2005 },
  { id: 6, title: "The Design of Everyday Things", author: "Don Norman", category: "Sains & Teknologi", year: 1988 },
];

export default function FeaturedBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(featuredBooks.map(book => book.category)))];

  const filteredBooks = featuredBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 lg:py-20 bg-[#F5F1E8]" aria-labelledby="featured-books-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-books-heading" className="font-serif text-4xl lg:text-5xl font-bold text-[#1F4E4C] mb-4">
            Buku Pilihan
          </h2>
          <div className="w-24 h-1 bg-[#B05E3F] mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-[#5A5A5A] text-lg max-w-2xl mx-auto">
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
                  className="w-full px-5 py-3 pl-12 border-2 border-[#D4C4B0] rounded focus:outline-none focus:border-[#B05E3F] focus:ring-2 focus:ring-[#B05E3F] focus:ring-opacity-20 transition-all"
                  aria-label="Cari buku berdasarkan judul atau penulis"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                className="w-full px-5 py-3 border-2 border-[#D4C4B0] rounded focus:outline-none focus:border-[#B05E3F] focus:ring-2 focus:ring-[#B05E3F] focus:ring-opacity-20 transition-all bg-white"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <article
                key={book.id}
                className="bg-white p-6 border-l-4 border-[#B05E3F] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="mb-3">
                  <span className="inline-block bg-[#2C5F5D] bg-opacity-10 text-[#2C5F5D] text-xs px-3 py-1 font-semibold uppercase tracking-wider group-hover:bg-opacity-20 transition-all">
                    {book.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-[#1F4E4C] group-hover:text-[#B05E3F] transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-[#5A5A5A] mb-2">
                  oleh <span className="font-semibold">{book.author}</span>
                </p>
                <p className="text-sm text-[#5A5A5A]">
                  Tahun: {book.year}
                </p>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg className="w-16 h-16 mx-auto text-[#D4C4B0] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#5A5A5A] text-lg">
                Tidak ada buku yang cocok dengan pencarian Anda
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
