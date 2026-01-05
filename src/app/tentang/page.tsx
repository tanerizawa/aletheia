import type { Metadata } from "next";
import StatsShowcase from "@/components/StatsShowcase";

export const metadata: Metadata = {
  title: "Tentang Kami - Rumah Aletheia",
  description: "Mengenal lebih dekat Rumah Aletheia, sejarah, visi, misi, dan tim kami.",
};

export default function TentangPage() {
  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Header */}
      <section className="bg-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="inline-block mb-4">
            <span className="text-[#B05E3F] text-sm uppercase tracking-[0.3em] font-semibold">Mengenal Kami</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">Tentang Rumah Aletheia</h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Sebuah ruang belajar yang menghadirkan keberanian dan kebijaksanaan melalui pengetahuan
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Sejarah */}
        <article className="mb-20">
          <div className="border-l-4 border-[#B05E3F] pl-8 mb-8">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-6">Sejarah Kami</h2>
          </div>
          <div className="bg-white p-10 lg:p-12 shadow-lg border-t-2 border-[#2C5F5D]">
            <p className="text-lg text-[#5A5A5A] leading-relaxed mb-6 first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
              Rumah Aletheia adalah perpustakaan yang didirikan dengan semangat untuk menyebarkan pengetahuan 
              dan menciptakan ruang belajar yang nyaman bagi masyarakat. Nama "Aletheia" berasal dari bahasa Yunani 
              yang berarti "kebenaran", mencerminkan komitmen kami untuk menyediakan sumber informasi yang akurat 
              dan terpercaya.
            </p>
          </div>
        </article>

        {/* Visi & Misi Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <article className="bg-white p-10 shadow-lg border-l-4 border-[#B05E3F]">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">Visi</h2>
            <p className="text-lg text-[#5A5A5A] leading-relaxed italic">
              Menjadi pusat pengetahuan dan pembelajaran yang inspiratif, inklusif, dan inovatif untuk 
              mengembangkan potensi masyarakat melalui akses terhadap informasi dan literasi.
            </p>
          </article>

          <article className="bg-[#2C5F5D] p-10 shadow-lg text-[#F5F1E8]">
            <h2 className="font-serif text-3xl font-bold mb-6">Misi</h2>
            <ul className="space-y-4 text-[#E8DED0]">
              <li className="flex items-start">
                <span className="text-[#B05E3F] mr-3 mt-1 flex-shrink-0">◆</span>
                <span className="leading-relaxed">Menyediakan koleksi buku dan sumber informasi yang berkualitas dan beragam</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B05E3F] mr-3 mt-1 flex-shrink-0">◆</span>
                <span className="leading-relaxed">Menyelenggarakan kegiatan edukatif untuk meningkatkan minat baca masyarakat</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B05E3F] mr-3 mt-1 flex-shrink-0">◆</span>
                <span className="leading-relaxed">Menciptakan lingkungan belajar yang kondusif dan nyaman</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B05E3F] mr-3 mt-1 flex-shrink-0">◆</span>
                <span className="leading-relaxed">Membangun kemitraan dengan berbagai pihak untuk pengembangan perpustakaan</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B05E3F] mr-3 mt-1 flex-shrink-0">◆</span>
                <span className="leading-relaxed">Memanfaatkan teknologi untuk meningkatkan akses terhadap informasi</span>
              </li>
            </ul>
          </article>
        </div>

        {/* Nilai-Nilai */}
        <article>
          <div className="border-l-4 border-[#B05E3F] pl-8 mb-10">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C]">Nilai-Nilai Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Integritas</h3>
              <p className="text-[#5A5A5A] leading-relaxed">Menjunjung tinggi kejujuran dan kebenaran dalam setiap layanan.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Inklusivitas</h3>
              <p className="text-[#5A5A5A] leading-relaxed">Terbuka untuk semua kalangan tanpa diskriminasi.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Inovasi</h3>
              <p className="text-[#5A5A5A] leading-relaxed">Terus berinovasi dalam menyajikan layanan perpustakaan.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Kolaborasi</h3>
              <p className="text-[#5A5A5A] leading-relaxed">Membangun kerjasama dengan berbagai pihak.</p>
            </div>
          </div>
        </article>
      </div>

      {/* Stats Showcase */}
      <StatsShowcase />
    </main>
  );
}
