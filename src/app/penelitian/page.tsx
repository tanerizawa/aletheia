import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio Riset - Lembaga Penelitian Sosial",
  description: "Layanan penelitian sosial, humaniora, psikologi, dan sejarah dari PT Academos Pustaka Demokrasi.",
};

export default function PenelitianPage() {
  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">🔬</span>
            <span className="text-sm uppercase tracking-wider font-serif">Studio Riset</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            Lembaga Penelitian Sosial
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Riset mendalam di bidang sosial, humaniora, psikologi, dan sejarah
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
            Kami sedang mempersiapkan platform riset dan layanan penelitian yang komprehensif.
            Nantikan peluncuran resmi kami!
          </p>

          <div className="bg-white border-2 border-[#D4C4B0] p-8 mb-12">
            <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6">
              Layanan Penelitian
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Penelitian Sosial</h4>
                  <p className="text-sm text-[#7A7A7A]">Riset kualitatif dan kuantitatif bidang sosial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎭</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Studi Humaniora</h4>
                  <p className="text-sm text-[#7A7A7A]">Penelitian budaya, seni, dan sastra</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Riset Psikologi</h4>
                  <p className="text-sm text-[#7A7A7A]">Studi perilaku dan psikologi sosial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-[#1F4E4C] mb-1">Penelitian Sejarah</h4>
                  <p className="text-sm text-[#7A7A7A]">Riset historis dan arsip</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/artikel"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Baca Artikel Penelitian
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
