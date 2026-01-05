import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tim & Pengurus - Rumah Aletheia",
  description: "Kenali tim dan pengurus Rumah Aletheia dan PT Academos Pustaka Demokrasi.",
};

export default function TimPage() {
  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">👥</span>
            <span className="text-sm uppercase tracking-wider font-serif">Kenali Kami</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            Tim & Pengurus
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Orang-orang yang berdedikasi untuk kemajuan literasi dan pendidikan
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
            Halaman profil tim dan pengurus sedang dalam pengembangan.
            Nantikan informasi lengkap tentang orang-orang di balik Rumah Aletheia!
          </p>

          <div className="bg-white border-2 border-[#D4C4B0] p-8 mb-12">
            <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6">
              Struktur Organisasi
            </h3>
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <div>
                <h4 className="font-bold text-[#1F4E4C] mb-2">PT Academos Pustaka Demokrasi</h4>
                <ul className="space-y-2 text-sm text-[#7A7A7A]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Kepala Lembaga
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Divisi Penelitian
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Divisi Penerbitan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Divisi Pendidikan
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D4C4B0]">
                <h4 className="font-bold text-[#1F4E4C] mb-2">Rumah Aletheia</h4>
                <ul className="space-y-2 text-sm text-[#7A7A7A]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Kepala Perpustakaan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Koordinator Program
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Pustakawan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B05E3F]">•</span>
                    Relawan
                  </li>
                </ul>
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
