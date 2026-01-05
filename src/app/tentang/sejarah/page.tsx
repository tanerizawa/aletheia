import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sejarah - Perjalanan Rumah Aletheia",
  description: "Sejarah dan perjalanan Rumah Aletheia dan PT Academos Pustaka Demokrasi.",
};

export default function SejarahPage() {
  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">📜</span>
            <span className="text-sm uppercase tracking-wider font-serif">Perjalanan Kami</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            Sejarah Kami
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Perjalanan membangun ekosistem literasi dan pendidikan untuk Indonesia
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
            Kami sedang menyusun timeline lengkap perjalanan Rumah Aletheia dan PT Academos.
            Tunggu cerita lengkap kami!
          </p>

          <div className="bg-white border-2 border-[#D4C4B0] p-8 mb-12">
            <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6">
              Tonggak Penting
            </h3>
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="font-serif text-2xl font-bold text-[#B05E3F]">2024</div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Pendirian PT Academos</h4>
                  <p className="text-sm text-[#7A7A7A]">
                    SK Pendirian: AHU-038489.AH.01.30.Tahun 2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="font-serif text-2xl font-bold text-[#B05E3F]">2025</div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Pembukaan Rumah Aletheia</h4>
                  <p className="text-sm text-[#7A7A7A]">
                    Perpustakaan komunitas di Karawang dibuka untuk umum
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="font-serif text-2xl font-bold text-[#2C5F5D]">2026</div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Ekspansi Layanan Digital</h4>
                  <p className="text-sm text-[#7A7A7A]">
                    Peluncuran perpustakaan digital dan platform artikel
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tentang"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Tentang Kami
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-transparent text-[#2C5F5D] px-10 py-4 font-serif font-bold text-lg hover:bg-[#2C5F5D] hover:text-white transition-all border-2 border-[#2C5F5D]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
