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
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-[#B05E3F] rounded-r overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-[#F5F1E8] transition-colors"
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
                <div className="px-6 pb-5 text-[#5A5A5A] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
