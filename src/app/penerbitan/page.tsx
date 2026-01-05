import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Toko Buku - Penerbitan Independen",
  description: "Penerbitan buku, jurnal, dan media digital dari PT Academos Pustaka Demokrasi.",
};

export default function PenerbitanPage() {
  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">📕</span>
            <span className="text-sm uppercase tracking-wider font-serif">Toko Buku</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            Penerbitan Independen
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Menerbitkan buku berkualitas, jurnal akademik, dan media digital untuk kemajuan literasi
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-8xl">🚧</span>
          </div>
          
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1F4E4C] mb-6">
            Segera Hadir
          </h2>
          
          <p className="text-xl text-[#5A5A5A] mb-12 leading-relaxed">
            Kami sedang mempersiapkan toko buku online dan layanan penerbitan kami.
            Tunggu koleksi buku terbitan kami!
          </p>

          <div className="bg-white border-2 border-[#D4C4B0] p-8 mb-12">
            <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6">
              Layanan Penerbitan
            </h3>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Penerbitan Buku</h4>
                  <p className="text-sm text-[#7A7A7A]">Menerbitkan buku fiksi, non-fiksi, dan akademik</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Jurnal Akademik</h4>
                  <p className="text-sm text-[#7A7A7A]">Publikasi jurnal penelitian peer-reviewed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💻</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Media Digital</h4>
                  <p className="text-sm text-[#7A7A7A]">E-book, audiobook, dan konten digital</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Jasa Editing</h4>
                  <p className="text-sm text-[#7A7A7A]">Editing profesional untuk naskah Anda</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/koleksi"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Lihat Koleksi Buku
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-transparent text-[#2C5F5D] px-10 py-4 font-serif font-bold text-lg hover:bg-[#2C5F5D] hover:text-white transition-all border-2 border-[#2C5F5D]"
            >
              Ajukan Naskah
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
