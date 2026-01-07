'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Bagaimana cara menjadi anggota perpustakaan?",
    answer: "Anda dapat mendaftar langsung di perpustakaan dengan membawa KTP dan mengisi formulir pendaftaran. Keanggotaan gratis untuk umum."
  },
  {
    question: "Berapa lama masa peminjaman buku?",
    answer: "Masa peminjaman standar adalah 14 hari dengan maksimal 3 buku. Perpanjangan dapat dilakukan 1 kali untuk 7 hari tambahan jika buku tidak dipesan anggota lain."
  },
  {
    question: "Apakah ada denda keterlambatan?",
    answer: "Denda keterlambatan adalah Rp 1.000 per hari per buku. Kami mendorong pengembalian tepat waktu agar semua anggota dapat menikmati koleksi kami."
  },
  {
    question: "Bisakah saya membaca di perpustakaan tanpa menjadi anggota?",
    answer: "Ya! Perpustakaan kami terbuka untuk umum. Anda dapat membaca dan menggunakan fasilitas kami tanpa perlu mendaftar sebagai anggota."
  },
  {
    question: "Apakah tersedia akses WiFi gratis?",
    answer: "Ya, kami menyediakan WiFi gratis untuk semua pengunjung perpustakaan. Minta password WiFi di meja informasi."
  },
  {
    question: "Bagaimana cara mengikuti kegiatan perpustakaan?",
    answer: "Lihat jadwal kegiatan di halaman Kegiatan kami. Beberapa kegiatan gratis dan terbuka untuk umum, sedangkan yang lain mungkin memerlukan pendaftaran terlebih dahulu."
  },
  {
    question: "Apakah koleksi buku dapat diakses secara digital?",
    answer: "Sebagian koleksi kami tersedia dalam format digital untuk anggota terdaftar. Hubungi perpustakaan untuk informasi lebih lanjut."
  },
  {
    question: "Apakah ada ruang diskusi atau meeting room?",
    answer: "Ya, kami memiliki ruang diskusi yang dapat dipesan untuk kegiatan kelompok atau pertemuan. Reservasi dapat dilakukan melalui staf perpustakaan."
  },
  {
    question: "Bagaimana cara menyumbang buku ke perpustakaan?",
    answer: "Kami sangat menghargai donasi buku! Hubungi kami untuk mengetahui jenis buku yang sedang kami butuhkan dan prosedur donasi."
  }
];

// Show first 5 FAQs by default
const INITIAL_FAQ_COUNT = 5;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, INITIAL_FAQ_COUNT);
  const remainingCount = faqs.length - INITIAL_FAQ_COUNT;

  return (
    <section className="py-16 lg:py-20" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="font-serif text-4xl lg:text-5xl font-bold text-[#1F4E4C] mb-4">
            Pertanyaan Umum
          </h2>
          <div className="w-24 h-1 bg-[#B05E3F] mx-auto" aria-hidden="true"></div>
        </div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-[#B05E3F] rounded-r overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-cream-soft-white transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-serif font-bold text-lg text-[#1F4E4C] pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#B05E3F] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-6 pb-5 text-gray-500 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Progressive Disclosure */}
        {!showAll && remainingCount > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#B05E3F] text-[#B05E3F] px-8 py-3 font-serif font-bold hover:bg-[#B05E3F] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Tampilkan {remainingCount} Pertanyaan Lainnya</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setShowAll(false);
                setOpenIndex(null); // Close any open FAQ when collapsing
              }}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#2C5F5D] text-[#2C5F5D] px-8 py-3 font-serif font-bold hover:bg-[#2C5F5D] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Tampilkan Lebih Sedikit</span>
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
