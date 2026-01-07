import type { Metadata } from "next";
import Link from "next/link";
import { HistoryIcon, LibraryIcon, BuildingIcon, BookIcon, TechnologyIcon, UsersIcon, SparklesIcon, LightbulbIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sejarah - Perjalanan Rumah Aletheia",
  description: "Sejarah dan perjalanan Rumah Aletheia dan PT Academos Pustaka Demokrasi.",
};

export default function SejarahPage() {
  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <HistoryIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Perjalanan Kami</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Perjalanan Kami
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Dari mimpi sederhana hingga ekosistem literasi yang tumbuh bersama komunitas — 
            inilah cerita bagaimana kami memulai dan terus berkembang
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-16 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Dari Mana Kami Memulai?
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                Setiap perjalanan besar dimulai dari <strong className="text-[#1F4E4C]">langkah kecil yang penuh makna</strong>. 
                Di tahun 2024, sekelompok pegiat literasi dan pendidikan berkumpul dengan satu visi sederhana: 
                <em className="text-[#B05E3F] font-semibold">bagaimana jika pengetahuan dapat diakses semua orang, tanpa batasan?</em>
              </p>
              <p>
                Dari diskusi-diskusi kecil di kafe hingga perencanaan matang, kami menyadari bahwa Indonesia 
                membutuhkan lebih dari sekadar akses buku. Kami memerlukan <strong className="text-[#1F4E4C]">ekosistem lengkap</strong> yang 
                mengintegrasikan perpustakaan, penelitian, penerbitan, dan pendidikan dalam satu wadah yang saling menguatkan.
              </p>
              <p>
                Maka lahirlah <strong className="text-[#1F4E4C]">PT Academos Pustaka Demokrasi</strong> — sebuah lembaga yang 
                tidak hanya menyimpan buku, tetapi <em className="text-[#B05E3F] font-semibold">menghidupkan pengetahuan</em> melalui 
                riset, publikasi, dan program literasi yang menyentuh langsung masyarakat.
              </p>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Timeline Perjalanan Kami
            </h2>
            <p className="text-center text-[#5A5A5A] mb-12 max-w-2xl mx-auto">
              Setiap tonggak adalah bukti komitmen kami untuk terus tumbuh dan memberikan dampak nyata
            </p>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-[#B05E3F] via-[#2C5F5D] to-[#1F4E4C] hidden md:block"></div>
              
              <div className="space-y-12">
                {/* 2024 - Pendirian PT Academos */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="bg-white border-2 border-[#B05E3F] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex md:flex-row-reverse items-start gap-4">
                        <BuildingIcon className="w-12 h-12 text-[#B05E3F] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#B05E3F] mb-2">2024</div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Pendirian PT Academos</h3>
                          <p className="text-[#5A5A5A] leading-relaxed mb-2">
                            Berdiri secara resmi dengan SK AHU-038489.AH.01.30.Tahun 2024. 
                            Odang ditunjuk sebagai Direktur untuk memimpin visi jangka panjang.
                          </p>
                          <div className="text-xs text-[#7A7A7A] italic">
                            "Sebuah awal baru untuk demokratisasi pengetahuan"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-[#B05E3F] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                  <div className="md:w-1/2"></div>
                </div>

                {/* Oktober 2024 - Konsep Aletheia */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:block w-8 h-8 bg-[#2C5F5D] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white border-2 border-[#2C5F5D] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex items-start gap-4">
                        <LightbulbIcon className="w-12 h-12 text-[#2C5F5D] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#2C5F5D] mb-2">Okt 2024</div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Konsep Rumah Aletheia</h3>
                          <p className="text-[#5A5A5A] leading-relaxed mb-2">
                            Brainstorming intensif untuk merancang perpustakaan komunitas yang tidak hanya 
                            menyediakan buku, tetapi juga menjadi rumah bagi pencinta ilmu.
                          </p>
                          <div className="text-xs text-[#7A7A7A] italic">
                            "Aletheia — kebenaran yang terungkap melalui literasi"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Januari 2025 - Pembukaan Aletheia */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="bg-white border-2 border-[#B05E3F] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex md:flex-row-reverse items-start gap-4">
                        <LibraryIcon className="w-12 h-12 text-[#B05E3F] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#B05E3F] mb-2">Jan 2025</div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Pembukaan Rumah Aletheia</h3>
                          <p className="text-[#5A5A5A] leading-relaxed mb-2">
                            Perpustakaan komunitas resmi dibuka di Jl. Patinggi, Cibadak, Karawang. 
                            SK Pendirian: 01/SK/Academos/int/X/2025. NPP: 3215184J0000003.
                          </p>
                          <div className="text-xs text-[#7A7A7A] italic">
                            "Pintu pertama menuju ekosistem literasi terbuka"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-[#B05E3F] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                  <div className="md:w-1/2"></div>
                </div>

                {/* Maret 2025 - Koleksi 8000 Buku */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:block w-8 h-8 bg-[#2C5F5D] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white border-2 border-[#2C5F5D] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex items-start gap-4">
                        <BookIcon className="w-12 h-12 text-[#2C5F5D] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#2C5F5D] mb-2">Mar 2025</div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Koleksi 8,000 Buku Tercapai</h3>
                          <p className="text-[#5A5A5A] leading-relaxed mb-2">
                            Melalui donasi dan pengadaan berkelanjutan, koleksi perpustakaan mencapai 8,000 judul 
                            dari berbagai genre: fiksi, non-fiksi, akademik, dan referensi.
                          </p>
                          <div className="text-xs text-[#7A7A7A] italic">
                            "Setiap buku adalah jendela ke dunia baru"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Juni 2025 - 2500 Anggota */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="bg-white border-2 border-[#B05E3F] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex md:flex-row-reverse items-start gap-4">
                        <UsersIcon className="w-12 h-12 text-[#B05E3F] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#B05E3F] mb-2">Jun 2025</div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Komunitas 2,500+ Anggota</h3>
                          <p className="text-[#5A5A5A] leading-relaxed mb-2">
                            Pertumbuhan komunitas pembaca yang luar biasa. Program literasi rutin seperti bedah buku, 
                            story telling anak, dan workshop menulis menarik berbagai kalangan.
                          </p>
                          <div className="text-xs text-[#7A7A7A] italic">
                            "Komunitas yang tumbuh bersama adalah kekuatan sejati"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-[#B05E3F] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                  <div className="md:w-1/2"></div>
                </div>

                {/* Januari 2026 - Platform Digital */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:block w-8 h-8 bg-[#2C5F5D] rounded-full border-4 border-cream-soft-white absolute left-1/2 transform -translate-x-1/2 z-10 animate-pulse"></div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] border-2 border-[#2C5F5D] p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex items-start gap-4">
                        <TechnologyIcon className="w-12 h-12 text-[#D4A574] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-serif text-3xl font-bold text-[#D4A574] mb-2">Jan 2026</div>
                          <h3 className="font-serif text-2xl font-bold text-cream-soft-white mb-3">Ekspansi Digital</h3>
                          <p className="text-cream-warm leading-relaxed mb-2">
                            Peluncuran website academos.or.id dengan perpustakaan digital, platform artikel, 
                            dan sistem manajemen kegiatan. Akses literasi kini tanpa batas ruang dan waktu.
                          </p>
                          <div className="text-xs text-[#D4A574] italic">
                            "Masa depan literasi adalah hybrid: fisik dan digital"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Pencapaian Utama
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-serif font-bold text-[#B05E3F] mb-2">8,000</div>
                <div className="text-sm text-[#7A7A7A] uppercase tracking-wide mb-3">Koleksi Buku</div>
                <p className="text-xs text-[#5A5A5A]">
                  Dari berbagai genre dan kategori untuk semua usia
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#2C5F5D] p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-serif font-bold text-[#2C5F5D] mb-2">2,500+</div>
                <div className="text-sm text-[#7A7A7A] uppercase tracking-wide mb-3">Anggota Aktif</div>
                <p className="text-xs text-[#5A5A5A]">
                  Komunitas pembaca dari berbagai latar belakang
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-serif font-bold text-[#B05E3F] mb-2">50+</div>
                <div className="text-sm text-[#7A7A7A] uppercase tracking-wide mb-3">Program/Tahun</div>
                <p className="text-xs text-[#5A5A5A]">
                  Workshop, bedah buku, dan kegiatan literasi rutin
                </p>
              </div>
            </div>
          </div>

          {/* Vision Forward */}
          <div className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] p-12 text-center shadow-2xl">
            <SparklesIcon className="w-16 h-16 text-[#D4A574] mx-auto mb-6" />
            <h2 className="font-serif text-4xl font-bold text-cream-soft-white mb-4">
              Perjalanan Masih Panjang
            </h2>
            <p className="text-cream-warm text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              Ini baru permulaan. Kami terus berinovasi untuk memperluas jangkauan, meningkatkan kualitas layanan, 
              dan menciptakan dampak nyata bagi masyarakat. <strong>Masa depan literasi Indonesia dimulai dari sini.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kegiatan"
                className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] shadow-lg"
              >
                Lihat Program Kami
              </Link>
              <Link
                href="/kontak"
                className="inline-block bg-white text-[#1F4E4C] px-10 py-4 font-serif font-bold text-lg hover:bg-cream-soft-white transition-all border-2 border-white shadow-lg"
              >
                Bergabung dengan Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
