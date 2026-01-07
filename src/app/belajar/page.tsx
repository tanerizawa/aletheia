import type { Metadata } from "next";
import Link from "next/link";
import { BookIcon, MonitorIcon, PresentationIcon, SparklesIcon, LightbulbIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Ruang Belajar - Program Pendidikan & Literasi",
  description: "Program pendidikan, kursus, dan pelatihan literasi dari Rumah Aletheia.",
};

export default function BelajarPage() {
  return (
    <main className="flex-grow bg-[#E8E3DB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#D4A574]">
            <div className="w-12 h-12 rounded-full bg-[#E8E3DB]/10 flex items-center justify-center">
              <LightbulbIcon className="w-7 h-7 text-[#B05E3F]" />
            </div>
            <span className="text-sm uppercase tracking-wider font-serif">Ruang Belajar</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#E8E3DB] mb-6">
            Pendidikan & Literasi
          </h1>
          
          <p className="text-xl text-[#D4A574] max-w-3xl leading-relaxed">
            Program pendidikan berkelanjutan — kursus, pelatihan, dan workshop untuk meningkatkan literasi, 
            keterampilan digital, dan pengembangan diri. Belajar tidak pernah berhenti
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-12 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Mengapa Program Literasi Kami Berbeda?
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                <strong className="text-[#1F4E4C]">Literasi bukan hanya tentang kemampuan membaca dan menulis</strong> — 
                ia adalah fondasi untuk berpikir kritis, memahami dunia, dan berpartisipasi aktif dalam masyarakat. 
                Program pendidikan kami dirancang dengan pendekatan <em className="text-[#B05E3F] font-semibold">partisipatif, inklusif, 
                dan berbasis komunitas</em>.
              </p>
              <p>
                Kami percaya bahwa <strong className="text-[#1F4E4C]">setiap orang adalah pembelajar</strong> — tanpa batasan usia, 
                latar belakang, atau tingkat pendidikan formal. Dari anak-anak hingga lansia, dari pemula hingga mahir, 
                kami menyediakan ruang yang aman dan menyenangkan untuk terus belajar dan berkembang.
              </p>
            </div>
          </div>

          {/* Program Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-[#B05E3F]/5 to-[#B05E3F]/10 border-2 border-[#B05E3F]/20 p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
              <BookIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Literasi Dasar</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                Program untuk meningkatkan kemampuan membaca, menulis, dan berhitung bagi semua kalangan
              </p>
              <div className="text-xs text-[#7A7A7A] space-y-1">
                <div>✓ Kelas membaca untuk pemula</div>
                <div>✓ Workshop menulis kreatif</div>
                <div>✓ Berhitung praktis</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
              <MonitorIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Literasi Digital</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                Penguasaan teknologi informasi dan komunikasi untuk era digital
              </p>
              <div className="text-xs text-[#7A7A7A] space-y-1">
                <div>✓ Dasar komputer & internet</div>
                <div>✓ Media sosial bijak</div>
                <div>✓ Keamanan digital</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#B05E3F]/5 to-[#B05E3F]/10 border-2 border-[#B05E3F]/20 p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
              <PresentationIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Workshop Kreatif</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                Pengembangan keterampilan kreatif dan ekspresi diri melalui berbagai medium
              </p>
              <div className="text-xs text-[#7A7A7A] space-y-1">
                <div>✓ Menulis kreatif</div>
                <div>✓ Fotografi dasar</div>
                <div>✓ Desain grafis</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
              <SparklesIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Program Anak</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                Membangun fondasi literasi sejak dini dengan cara yang menyenangkan
              </p>
              <div className="text-xs text-[#7A7A7A] space-y-1">
                <div>✓ Story telling interaktif</div>
                <div>✓ Klub baca anak</div>
                <div>✓ Kerajinan edukatif</div>
              </div>
            </div>
          </div>

          {/* Ongoing Programs */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Program Rutin Kami
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Kegiatan berkala yang dapat diikuti secara gratis oleh anggota perpustakaan
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-[#C4BDB2] p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#B05E3F]/10 flex items-center justify-center flex-shrink-0">
                    <BookIcon className="w-6 h-6 text-[#B05E3F]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">Klub Baca Komunitas</h3>
                    <div className="text-sm text-[#7A7A7A] mb-3">
                      <span className="font-bold">Jadwal:</span> Setiap Sabtu, 14.00-16.00 WIB
                    </div>
                    <p className="text-[#5A5A5A] leading-relaxed mb-4">
                      Diskusi buku bulanan dengan fokus pada karya sastra Indonesia dan dunia. Peserta membaca buku yang sama 
                      kemudian berdiskusi tentang tema, karakter, dan pesan yang terkandung.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] rounded-full">Gratis</span>
                      <span className="text-xs px-3 py-1 bg-[#2C5F5D]/10 text-[#2C5F5D] rounded-full">Semua Usia</span>
                      <span className="text-xs px-3 py-1 bg-[#C4BDB2] text-[#7A7A7A] rounded-full">Max 20 peserta</span>
                    </div>
                  </div>
                </div>
              </div>

                <div className="bg-white border-2 border-[#C4BDB2] p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-6 h-6 text-[#2C5F5D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">Story Telling Anak</h3>
                    <div className="text-sm text-[#7A7A7A] mb-3">
                      <span className="font-bold">Jadwal:</span> Setiap Minggu, 10.00-11.30 WIB
                    </div>
                    <p className="text-[#5A5A5A] leading-relaxed mb-4">
                      Sesi mendongeng interaktif untuk anak usia 4-10 tahun. Membangun kebiasaan membaca sejak dini 
                      dengan cerita yang menarik, visual yang colorful, dan aktivitas kreatif.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] rounded-full">Gratis</span>
                      <span className="text-xs px-3 py-1 bg-[#2C5F5D]/10 text-[#2C5F5D] rounded-full">Usia 4-10 tahun</span>
                      <span className="text-xs px-3 py-1 bg-[#C4BDB2] text-[#7A7A7A] rounded-full">Pendampingan ortu</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#C4BDB2] p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#B05E3F]/10 flex items-center justify-center flex-shrink-0">
                    <PresentationIcon className="w-6 h-6 text-[#B05E3F]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">Workshop Menulis</h3>
                    <div className="text-sm text-[#7A7A7A] mb-3">
                      <span className="font-bold">Jadwal:</span> Sabtu Pertama, 09.00-12.00 WIB
                    </div>
                    <p className="text-[#5A5A5A] leading-relaxed mb-4">
                      Workshop menulis kreatif bulanan dengan fokus berbeda setiap bulan: cerpen, puisi, esai, atau artikel. 
                      Dipandu oleh penulis dan editor berpengalaman.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] rounded-full">Gratis</span>
                      <span className="text-xs px-3 py-1 bg-[#2C5F5D]/10 text-[#2C5F5D] rounded-full">Remaja & Dewasa</span>
                      <span className="text-xs px-3 py-1 bg-[#C4BDB2] text-[#7A7A7A] rounded-full">Pendaftaran online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#C4BDB2] p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center flex-shrink-0">
                    <MonitorIcon className="w-6 h-6 text-[#2C5F5D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-2">Literasi Digital</h3>
                    <div className="text-sm text-[#7A7A7A] mb-3">
                      <span className="font-bold">Jadwal:</span> Kamis Kedua & Keempat, 15.00-17.00 WIB
                    </div>
                    <p className="text-[#5A5A5A] leading-relaxed mb-4">
                      Pelatihan dasar komputer, internet, dan media sosial. Cocok untuk pemula yang ingin belajar teknologi 
                      atau lansia yang ingin update dengan perkembangan digital.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-[#B05E3F]/10 text-[#B05E3F] rounded-full">Gratis</span>
                      <span className="text-xs px-3 py-1 bg-[#2C5F5D]/10 text-[#2C5F5D] rounded-full">Semua Usia</span>
                      <span className="text-xs px-3 py-1 bg-[#C4BDB2] text-[#7A7A7A] rounded-full">Laptop disediakan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <div className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] p-12 text-white shadow-2xl mb-16">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">
              Cara Bergabung
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Daftar Anggota</h3>
                <p className="text-[#D4A574] text-sm">
                  Menjadi anggota perpustakaan gratis dengan membawa fotokopi KTP
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Pilih Program</h3>
                <p className="text-[#D4A574] text-sm">
                  Lihat jadwal dan pilih program yang sesuai dengan minat Anda
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Datang & Belajar</h3>
                <p className="text-[#D4A574] text-sm">
                  Hadir sesuai jadwal dan nikmati pengalaman belajar bersama komunitas
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Special Programs */}
          <div>
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Program Spesial
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Workshop dan pelatihan intensif yang diselenggarakan secara berkala dengan topik khusus
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-[#B05E3F] p-6 hover:shadow-xl transition-all">
                <div className="text-xs text-[#B05E3F] font-bold mb-2 uppercase tracking-wider">Workshop 3 Hari</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">
                  Jurnalistik Warga
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-4">
                  Belajar menulis berita, artikel, dan reportase untuk media online. Dari riset hingga publikasi.
                </p>
                <div className="text-xs text-[#7A7A7A]">
                  <div className="mb-1"><strong>Instruktur:</strong> Praktisi jurnalis</div>
                  <div><strong>Sertifikat:</strong> Ya</div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#2C5F5D] p-6 hover:shadow-xl transition-all">
                <div className="text-xs text-[#2C5F5D] font-bold mb-2 uppercase tracking-wider">Kursus 2 Minggu</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">
                  Desain Grafis Dasar
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-4">
                  Menguasai Canva dan tools desain gratis lainnya untuk membuat konten visual yang menarik.
                </p>
                <div className="text-xs text-[#7A7A7A]">
                  <div className="mb-1"><strong>Instruktur:</strong> Designer profesional</div>
                  <div><strong>Sertifikat:</strong> Ya</div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#B05E3F] p-6 hover:shadow-xl transition-all">
                <div className="text-xs text-[#B05E3F] font-bold mb-2 uppercase tracking-wider">Pelatihan 1 Bulan</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">
                  Penulisan Kreatif
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-4">
                  Program intensif untuk menulis cerpen dan novel. Dari ide hingga karya siap terbit.
                </p>
                <div className="text-xs text-[#7A7A7A]">
                  <div className="mb-1"><strong>Instruktur:</strong> Penulis berpengalaman</div>
                  <div><strong>Sertifikat:</strong> Ya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <LightbulbIcon className="w-16 h-16 text-[#D4A574] mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-[#E8E3DB] mb-6">
            Siap Memulai Perjalanan Belajar?
          </h2>
          <p className="text-xl text-[#D4A574] mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pembelajar di Rumah Aletheia. Semua program gratis dan terbuka untuk umum!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kegiatan"
              className="inline-block bg-[#B05E3F] text-[#E8E3DB] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] shadow-lg"
            >
              Lihat Jadwal Lengkap
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-white text-[#1F4E4C] px-10 py-4 font-serif font-bold text-lg hover:bg-[#E8E3DB] transition-all border-2 border-white shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
