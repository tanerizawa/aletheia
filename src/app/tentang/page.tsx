import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StatsShowcase from "@/components/StatsShowcase";
import { ShieldIcon, HeartIcon, LightbulbIcon, HandshakeIcon } from "@/components/icons";
import { organization } from "@/data/organization";

export const metadata: Metadata = {
  title: "Tentang Kami - Rumah Aletheia",
  description: "Mengenal lebih dekat Rumah Aletheia dan PT Academos Pustaka Demokrasi, sejarah, visi, misi, dan nilai-nilai kami.",
};

export default function TentangPage() {
  return (
    <main className="flex-grow bg-[#E8E3DB]">
      {/* Header */}
      <section className="bg-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="inline-block mb-4">
            <span className="text-[#B05E3F] text-sm uppercase tracking-[0.3em] font-semibold">Mengenal Kami</span>
          </div>
          <div className="mb-6">
            <Image src="/logo.svg" alt="Rumah Aletheia - part of Academos" width={300} height={100} className="h-16 lg:h-20 w-auto" />
          </div>
          <p className="text-xl text-[#D4A574] max-w-3xl leading-relaxed">
            Perpustakaan komunitas di bawah naungan {organization.name}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Intro Section */}
        <article className="mb-20">
          <div className="border-l-4 border-[#B05E3F] pl-8 mb-8">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-6">Siapa Kami?</h2>
          </div>
          <div className="bg-white p-10 lg:p-12 shadow-lg border-t-2 border-[#2C5F5D]">
            <p className="text-lg text-gray-600 leading-relaxed mb-6 first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
              <strong>Rumah Aletheia</strong> adalah perpustakaan komunitas yang beroperasi di bawah naungan 
              {organization.name}. Kami didirikan dengan semangat untuk menyebarkan pengetahuan 
              dan menciptakan ruang belajar yang nyaman bagi masyarakat Karawang dan sekitarnya.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nama &quot;Aletheia&quot; berasal dari bahasa Yunani yang berarti &quot;kebenaran&quot; atau &quot;keterbukaan&quot;, 
              mencerminkan komitmen kami untuk menyediakan sumber informasi yang akurat, terpercaya, 
              dan terbuka untuk semua kalangan.
            </p>
          </div>
        </article>

        {/* Quick Links to Sub-pages */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">Pelajari Lebih Lanjut</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tentang/academos" className="group bg-white border-2 border-[#C4BDB2] p-6 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D]">PT Academos Pustaka Demokrasi</h3>
              <p className="text-sm text-gray-600 mb-3">Lembaga induk yang menaungi Rumah Aletheia dan unit layanan lainnya</p>
              <span className="text-[#B05E3F] text-sm font-semibold group-hover:underline">Selengkapnya →</span>
            </Link>
            <Link href="/tentang/aletheia" className="group bg-white border-2 border-[#C4BDB2] p-6 hover:border-[#B05E3F] hover:shadow-xl transition-all">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F]">Rumah Aletheia</h3>
              <p className="text-sm text-gray-600 mb-3">Perpustakaan komunitas dengan ribuan koleksi buku dan program literasi</p>
              <span className="text-[#B05E3F] text-sm font-semibold group-hover:underline">Selengkapnya →</span>
            </Link>
            <Link href="/tentang/sejarah" className="group bg-white border-2 border-[#C4BDB2] p-6 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D]">Sejarah & Perjalanan</h3>
              <p className="text-sm text-gray-600 mb-3">Timeline dan tonggak penting dalam perjalanan kami</p>
              <span className="text-[#B05E3F] text-sm font-semibold group-hover:underline">Selengkapnya →</span>
            </Link>
            <Link href="/tentang/tim" className="group bg-white border-2 border-[#C4BDB2] p-6 hover:border-[#B05E3F] hover:shadow-xl transition-all">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F]">Tim & Pengurus</h3>
              <p className="text-sm text-gray-600 mb-3">Kenali orang-orang di balik layanan kami</p>
              <span className="text-[#B05E3F] text-sm font-semibold group-hover:underline">Selengkapnya →</span>
            </Link>
          </div>
        </div>

        {/* Visi & Misi Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <article className="bg-white p-10 shadow-lg border-l-4 border-[#B05E3F]">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">Visi</h2>
            <p className="text-lg text-gray-500 leading-relaxed italic">
              Menjadi pusat pengetahuan dan pembelajaran yang inspiratif, inklusif, dan inovatif untuk 
              mengembangkan potensi masyarakat melalui akses terhadap informasi dan literasi.
            </p>
          </article>

          <article className="bg-[#2C5F5D] p-10 shadow-lg text-[#FAF8F5]">
            <h2 className="font-serif text-3xl font-bold mb-6">Misi</h2>
            <ul className="space-y-4 text-[#D4A574]">
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
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-2xl hover:scale-105 transition-all duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center mb-4 group-hover:bg-[#B05E3F] transition-colors">
                <ShieldIcon className="w-8 h-8 text-[#2C5F5D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Integritas</h3>
              <p className="text-gray-500 leading-relaxed">Menjunjung tinggi kejujuran dan kebenaran dalam setiap layanan.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-2xl hover:scale-105 transition-all duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center mb-4 group-hover:bg-[#B05E3F] transition-colors">
                <HeartIcon className="w-8 h-8 text-[#2C5F5D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Inklusivitas</h3>
              <p className="text-gray-500 leading-relaxed">Terbuka untuk semua kalangan tanpa diskriminasi.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-2xl hover:scale-105 transition-all duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center mb-4 group-hover:bg-[#B05E3F] transition-colors">
                <LightbulbIcon className="w-8 h-8 text-[#2C5F5D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Inovasi</h3>
              <p className="text-gray-500 leading-relaxed">Terus berinovasi dalam menyajikan layanan perpustakaan.</p>
            </div>
            <div className="bg-white p-8 border-t-4 border-[#B05E3F] hover:shadow-2xl hover:scale-105 transition-all duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center mb-4 group-hover:bg-[#B05E3F] transition-colors">
                <HandshakeIcon className="w-8 h-8 text-[#2C5F5D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Kolaborasi</h3>
              <p className="text-gray-500 leading-relaxed">Membangun kerjasama dengan berbagai pihak.</p>
            </div>
          </div>
        </article>
      </div>

      {/* Stats Showcase */}
      <StatsShowcase />
    </main>
  );
}
