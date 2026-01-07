import type { Metadata } from "next";
import FeaturedBooks from "@/components/FeaturedBooks";

export const metadata: Metadata = {
  title: "Koleksi - Rumah Aletheia",
  description: "Jelajahi berbagai koleksi buku dan sumber informasi di Rumah Aletheia.",
};

export default function KoleksiPage() {
  const collections = [
    {
      category: "Fiksi",
      count: "1,500+",
      description: "Novel, cerpen, dan karya sastra dari penulis lokal dan internasional.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      category: "Non-Fiksi",
      count: "2,000+",
      description: "Buku pengetahuan, sejarah, biografi, dan pengembangan diri.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      category: "Anak-anak",
      count: "800+",
      description: "Buku cerita bergambar, dongeng, dan buku edukatif untuk anak.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      category: "Referensi",
      count: "500+",
      description: "Ensiklopedia, kamus, atlas, dan buku referensi lainnya.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      category: "Komik & Manga",
      count: "600+",
      description: "Koleksi komik lokal dan manga dari berbagai genre.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      category: "Digital",
      count: "3,000+",
      description: "E-book, audiobook, dan jurnal digital yang dapat diakses online.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <main className="flex-grow bg-cream-soft-white">
      <div className="bg-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-block mb-4">
            <span className="text-[#B05E3F] text-sm uppercase tracking-[0.3em] font-semibold">Perpustakaan</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">Koleksi Kami</h1>
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Lebih dari 8,000 koleksi buku dan sumber informasi — dari fiksi klasik hingga pengetahuan kontemporer, 
            dari bacaan anak hingga referensi akademik. Setiap buku adalah jendela ke dunia baru yang menanti untuk dibuka
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <article key={index} className="bg-white p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-[#B05E3F] group">
              <div className="text-[#2C5F5D] mb-6 group-hover:text-[#B05E3F] group-hover:scale-110 transition-all">
                {collection.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 text-[#1F4E4C]">{collection.category}</h3>
              <p className="text-3xl font-bold text-[#B05E3F] mb-4">{collection.count}</p>
              <p className="text-gray-500 leading-relaxed">{collection.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-serif text-4xl font-bold mb-12 text-[#1F4E4C] text-center">Cara Meminjam Buku</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="font-serif text-3xl font-bold text-cream-soft-white">1</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1F4E4C]">Daftar Anggota</h3>
              <p className="text-gray-500 leading-relaxed">Daftarkan diri sebagai anggota perpustakaan</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="font-serif text-3xl font-bold text-cream-soft-white">2</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1F4E4C]">Cari Buku</h3>
              <p className="text-gray-500 leading-relaxed">Temukan buku yang Anda inginkan</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="font-serif text-3xl font-bold text-cream-soft-white">3</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1F4E4C]">Pinjam</h3>
              <p className="text-gray-500 leading-relaxed">Bawa kartu anggota dan pinjam maksimal 3 buku</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="font-serif text-3xl font-bold text-cream-soft-white">4</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1F4E4C]">Kembalikan</h3>
              <p className="text-gray-500 leading-relaxed">Kembalikan buku maksimal 14 hari</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white border-l-4 border-[#B05E3F] p-10 lg:p-12 shadow-xl">
          <h2 className="font-serif text-3xl font-bold mb-8 text-[#1F4E4C]">Syarat Keanggotaan</h2>
          <ul className="space-y-4 text-lg text-gray-500">
            <li className="flex items-start">
              <span className="text-[#B05E3F] mr-4 text-2xl flex-shrink-0">✓</span>
              <span>Fotokopi KTP/Kartu Identitas</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#B05E3F] mr-4 text-2xl flex-shrink-0">✓</span>
              <span>Pas foto 3x4 (2 lembar)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#B05E3F] mr-4 text-2xl flex-shrink-0">✓</span>
              <span>Mengisi formulir pendaftaran</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#B05E3F] mr-4 text-2xl flex-shrink-0">✓</span>
              <span>Gratis untuk semua kalangan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Featured Books Section */}
      <FeaturedBooks />
    </main>
  );
}
