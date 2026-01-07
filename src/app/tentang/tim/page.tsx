import type { Metadata } from "next";
import Link from "next/link";
// removed unused Image import
import { UsersIcon, HeartIcon, LightbulbIcon, HandshakeIcon, ShieldIcon, BookIcon, ResearchIcon, PublishIcon, ReadIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tim & Pengurus - Rumah Aletheia",
  description: "Kenali tim dan pengurus Rumah Aletheia dan PT Academos Pustaka Demokrasi.",
};

export default function TimPage() {
  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <UsersIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Kenali Kami</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Tim & Pengurus
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Orang-orang yang percaya bahwa literasi adalah kunci perubahan — bekerja bersama untuk memberdayakan masyarakat melalui pengetahuan
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Philosophy - Team Spirit */}
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-12 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Filosofi Tim Kami
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                <strong className="text-[#1F4E4C]">&quot;Alone we can do so little; together we can do so much.&quot;</strong> — Helen Keller. 
                Kutipan ini merangkum esensi dari tim kami. Kami bukan sekadar sekumpulan individu yang bekerja di tempat yang sama, 
                melainkan <em className="text-[#B05E3F] font-semibold">komunitas pembelajar</em> yang saling mendukung, berbagi visi, 
                dan berkomitmen pada misi yang sama.
              </p>
              <p>
                Di <strong>Rumah Aletheia</strong> dan <strong>PT Academos Pustaka Demokrasi</strong>, kami percaya bahwa 
                <strong className="text-[#1F4E4C]">keberagaman adalah kekuatan</strong>. Tim kami terdiri dari para pustakawan, peneliti, 
                penulis, pendidik, dan relawan yang berasal dari berbagai latar belakang — namun dipersatukan oleh satu keyakinan: 
                bahwa <em className="text-[#B05E3F] font-semibold">pengetahuan harus dapat diakses semua orang</em>.
              </p>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-4">
                Kepemimpinan
              </h2>
              <p className="text-[#5A5A5A] max-w-2xl mx-auto">
                Memimpin dengan visi, integritas, dan dedikasi untuk membangun ekosistem literasi yang berkelanjutan
              </p>
            </div>

            {/* Director Profile */}
            <div className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] p-10 lg:p-12 text-white mb-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 rounded-full bg-cream-soft-white flex items-center justify-center flex-shrink-0 shadow-xl">
                  <UsersIcon className="w-20 h-20 text-[#2C5F5D]" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-sm text-cream-warm uppercase tracking-wider mb-2">Direktur</div>
                  <h3 className="font-serif text-4xl font-bold mb-3">Odang</h3>
                  <p className="text-cream-warm leading-relaxed mb-4">
                    Sebagai pendiri dan direktur PT Academos Pustaka Demokrasi serta Kepala Perpustakaan Rumah Aletheia, 
                    Odang memiliki visi jangka panjang untuk membangun ekosistem literasi yang inklusif dan berkelanjutan. 
                    Dengan pengalaman dalam bidang pendidikan dan pengembangan masyarakat, beliau memimpin tim dengan 
                    pendekatan kolaboratif dan inovatif.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                      <span className="text-cream-warm">SK Pendirian:</span> <strong>AHU-038489.AH.01.30.Tahun 2024</strong>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                      <span className="text-cream-warm">Tahun Berdiri:</span> <strong>2024</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organizational Structure */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-4">
                Struktur Organisasi
              </h2>
              <p className="text-[#5A5A5A] max-w-2xl mx-auto">
                Empat unit layanan terintegrasi di bawah satu kepemimpinan strategis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* PT Academos */}
              <div className="bg-white border-2 border-[#2C5F5D] p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#B05E3F]">
                  <ShieldIcon className="w-8 h-8 text-[#2C5F5D]" />
                  <h3 className="font-serif text-2xl font-bold text-[#1F4E4C]">
                    PT Academos Pustaka Demokrasi
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <UsersIcon className="w-6 h-6 text-[#B05E3F] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Direktur</div>
                      <div className="text-sm text-[#7A7A7A]">Odang — Memimpin visi strategis lembaga</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ResearchIcon className="w-6 h-6 text-[#B05E3F] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Divisi Penelitian</div>
                      <div className="text-sm text-[#7A7A7A]">Riset sosial, humaniora, dan cagar budaya</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PublishIcon className="w-6 h-6 text-[#B05E3F] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Divisi Penerbitan</div>
                      <div className="text-sm text-[#7A7A7A]">Buku, jurnal, dan konten digital</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ReadIcon className="w-6 h-6 text-[#B05E3F] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Divisi Literasi & Pendidikan</div>
                      <div className="text-sm text-[#7A7A7A]">Program pendidikan luar sekolah</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rumah Aletheia */}
              <div className="bg-white border-2 border-[#B05E3F] p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#2C5F5D]">
                  <BookIcon className="w-8 h-8 text-[#B05E3F]" />
                  <h3 className="font-serif text-2xl font-bold text-[#1F4E4C]">
                    Rumah Aletheia
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <UsersIcon className="w-6 h-6 text-[#2C5F5D] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Kepala Perpustakaan</div>
                      <div className="text-sm text-[#7A7A7A]">Odang — Mengelola operasional perpustakaan</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LightbulbIcon className="w-6 h-6 text-[#2C5F5D] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Koordinator Program</div>
                      <div className="text-sm text-[#7A7A7A]">Merancang dan melaksanakan program literasi</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookIcon className="w-6 h-6 text-[#2C5F5D] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Pustakawan</div>
                      <div className="text-sm text-[#7A7A7A]">Mengelola koleksi dan layanan peminjaman</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HandshakeIcon className="w-6 h-6 text-[#2C5F5D] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#1F4E4C]">Relawan Komunitas</div>
                      <div className="text-sm text-[#7A7A7A]">Mendukung kegiatan dan program perpustakaan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Values */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Nilai-Nilai Tim Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <HeartIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Dedikasi
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Setiap anggota tim berkomitmen penuh untuk melayani komunitas dengan sepenuh hati
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#2C5F5D] p-6 hover:shadow-2xl transition-all group">
                <HandshakeIcon className="w-14 h-14 text-[#2C5F5D] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D] transition-colors">
                  Kolaborasi
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Bekerja bersama lintas divisi untuk menciptakan dampak yang lebih besar
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <LightbulbIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Pembelajaran Berkelanjutan
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Terus belajar dan berkembang untuk memberikan layanan terbaik
                </p>
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] p-12 text-center shadow-2xl border-4 border-[#B05E3F]">
            <UsersIcon className="w-16 h-16 text-cream-soft-white mx-auto mb-6" />
            <h3 className="font-serif text-4xl font-bold text-cream-soft-white mb-4">
              Bergabung dengan Tim Kami
            </h3>
            <p className="text-cream-warm text-lg mb-8 max-w-2xl mx-auto">
              Kami selalu mencari individu yang bersemangat untuk berkontribusi pada misi literasi dan pendidikan. 
              Baik sebagai <strong>staf tetap</strong>, <strong>relawan</strong>, atau <strong>mitra kolaboratif</strong> — 
              ada tempat untuk Anda di keluarga besar Academos dan Aletheia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/kontak"
                className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] shadow-lg"
              >
                Hubungi Kami untuk Bergabung
              </Link>
              <Link
                href="/kegiatan"
                className="inline-block bg-white text-[#1F4E4C] px-10 py-4 font-serif font-bold text-lg hover:bg-cream-soft-white transition-all border-2 border-white shadow-lg"
              >
                Lihat Program Relawan
              </Link>
            </div>
            <div className="text-cream-warm text-sm">
              <p className="mb-2"><strong>Posisi yang kami cari:</strong></p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Pustakawan</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Peneliti</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Editor</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Fasilitator Literasi</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Relawan Komunitas</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
