import type { Metadata } from "next";
import Link from "next/link";
import { library } from "@/data/organization";
import { BookIcon, ReadIcon, TechnologyIcon, LibraryIcon, HeartIcon, UsersIcon, LightbulbIcon, CalendarIcon, DocumentIcon, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Rumah Aletheia - Perpustakaan Komunitas",
  description: "Mengenal Rumah Aletheia, perpustakaan komunitas di Karawang yang menyediakan akses gratis ke ribuan buku dan program literasi.",
};

export default function AletheiaPage() {

  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <BookIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Perpustakaan</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            {library.name}
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Lebih dari sekadar perpustakaan — sebuah rumah bagi pencinta ilmu, ruang berdialog, dan komunitas pembelajar yang tumbuh bersama
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Origin Story - Emotional Connection */}
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-12 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Mengapa Aletheia Hadir di Tengah Kita?
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                Di era digital yang serba cepat, buku sering kali terlupakan. Padahal, <strong className="text-[#1F4E4C]">buku adalah jendela dunia</strong> 
                yang membuka wawasan, menumbuhkan empati, dan membebaskan pikiran dari keterbatasan. Namun, tidak semua orang 
                memiliki akses ke buku berkualitas.
              </p>
              <p>
                <strong className="text-[#1F4E4C]">Rumah Aletheia</strong> lahir dari keyakinan bahwa <em className="text-[#B05E3F] font-semibold">pengetahuan harus dapat diakses semua orang</em>, 
                tanpa memandang latar belakang ekonomi atau sosial. Kami bukan sekadar tempat menyimpan buku — kami adalah <strong>rumah bagi pencari ilmu</strong>, 
                tempat berbagi cerita, dan komunitas yang saling belajar.
              </p>
              <p>
                Nama <em className="text-[#B05E3F] font-semibold">&quot;Aletheia&quot;</em> (Ἀλήθεια) berasal dari bahasa Yunani klasik yang berarti <strong>&quot;kebenaran yang terungkap&quot;</strong> 
                atau <strong>&quot;keterbukaan&quot;</strong>. Dalam filosofi Yunani kuno, Aletheia adalah lawan dari kebodohan dan kepalsuan — 
                ia adalah cahaya yang menerangi jalan menuju pemahaman sejati.
              </p>
            </div>
          </div>

          {/* Vision & Mission - Dual Column for Contrast */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] p-10 text-white shadow-xl">
              <h3 className="font-serif text-3xl font-bold mb-6 border-b-2 border-[#B05E3F] pb-3">Visi Kami</h3>
              <p className="text-cream-warm leading-relaxed text-lg italic">
                Menjadi rumah literasi yang inklusif, inspiratif, dan berkelanjutan — tempat setiap orang menemukan 
                pengetahuan, menumbuhkan imajinasi, dan mengembangkan potensi diri melalui kekuatan membaca.
              </p>
            </div>
            <div className="bg-white border-2 border-[#2C5F5D] p-10 shadow-xl">
              <h3 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6 border-b-2 border-[#B05E3F] pb-3">Misi Kami</h3>
              <ul className="space-y-3 text-[#5A5A5A]">
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Menyediakan akses <strong>gratis dan terbuka</strong> ke koleksi buku berkualitas untuk semua kalangan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Menyelenggarakan program literasi yang <strong>menyenangkan dan transformatif</strong> bagi masyarakat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Membangun <strong>komunitas pembaca aktif</strong> yang saling berbagi pengetahuan dan pengalaman</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Mengintegrasikan teknologi untuk <strong>demokratisasi akses literasi</strong> di era digital</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values - Visual Cards with Icons */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Nilai-Nilai Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <HeartIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Inklusivitas
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Perpustakaan untuk semua — tanpa diskriminasi usia, gender, latar belakang ekonomi, atau pendidikan
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#2C5F5D] p-6 hover:shadow-2xl transition-all group">
                <UsersIcon className="w-14 h-14 text-[#2C5F5D] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D] transition-colors">
                  Komunitas
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Membangun ruang berdialog, berbagi cerita, dan tumbuh bersama sebagai pembelajar sepanjang hayat
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <LightbulbIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Inovasi
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Mengintegrasikan teknologi digital dengan tradisi membaca untuk pengalaman literasi yang modern
                </p>
              </div>
            </div>
          </div>

          {/* Impact Metrics - Social Proof */}
          <div className="bg-gradient-to-r from-[#1F4E4C] to-[#2C5F5D] p-12 mb-12 text-center shadow-2xl">
            <h3 className="font-serif text-3xl font-bold text-cream-soft-white mb-3">
              Dampak Kami di Komunitas
            </h3>
            <p className="text-cream-warm mb-8 max-w-2xl mx-auto">
              Sejak berdiri tahun {library.established}, kami telah melayani ribuan pembaca dari berbagai kalangan
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">
                  {library.stats.books.toLocaleString('id-ID')}
                </div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Koleksi Buku</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">
                  {library.stats.members.toLocaleString('id-ID')}+
                </div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Anggota Aktif</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">
                  {library.stats.visitors.toLocaleString('id-ID')}+
                </div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Pengunjung/Bulan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">
                  {library.stats.events}+
                </div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Program/Tahun</div>
              </div>
            </div>
          </div>

          {/* Legal & Leadership Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-cream-soft-white border-l-4 border-[#B05E3F] p-8 shadow-md">
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6 flex items-center gap-3">
                <DocumentIcon className="w-6 h-6 text-[#B05E3F]" />
                Informasi Legal
              </h3>
              <div className="space-y-4">
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">NPP (Nomor Pokok Perpustakaan)</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{library.npp}</div>
                </div>
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">SK Pendirian</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{library.sk}</div>
                </div>
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">Jenis Perpustakaan</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{library.type}</div>
                  <div className="text-sm text-[#7A7A7A] mt-1">{library.subtype}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] text-sm mb-1">Status Akreditasi</div>
                  <div className="font-bold text-[#2C5F5D] text-lg">{library.accreditation}</div>
                </div>
              </div>
            </div>

            <div className="bg-cream-soft-white border-l-4 border-[#2C5F5D] p-8 shadow-md">
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6 flex items-center gap-3">
                <ShieldIcon className="w-6 h-6 text-[#2C5F5D]" />
                Kepemimpinan
              </h3>
              <div className="space-y-4">
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">Kepala Perpustakaan</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{library.director}</div>
                </div>
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">Tahun Berdiri</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{library.established}</div>
                </div>
                <div>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed italic">
                    Dibawah naungan PT Academos Pustaka Demokrasi, Rumah Aletheia berkomitmen memberikan 
                    layanan perpustakaan berkualitas untuk masyarakat Karawang dan sekitarnya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-4">
                Layanan Perpustakaan
              </h2>
              <p className="text-[#5A5A5A] max-w-2xl mx-auto">
                Empat pilar layanan utama untuk mendukung perjalanan literasi Anda
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <BookIcon className="w-12 h-12 text-[#B05E3F] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">Peminjaman Buku</h3>
                    <p className="text-[#5A5A5A] leading-relaxed mb-3">Pinjam buku gratis untuk dibaca di rumah dengan masa peminjaman hingga 2 minggu. Perpanjangan mudah dan tanpa denda!</p>
                    <div className="text-xs text-[#7A7A7A]">
                      <strong>Syarat:</strong> Kartu identitas & formulir keanggotaan
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <ReadIcon className="w-12 h-12 text-[#B05E3F] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">Ruang Baca</h3>
                    <p className="text-[#5A5A5A] leading-relaxed mb-3">Ruang nyaman dengan pencahayaan alami, meja belajar, dan koleksi referensi yang dapat dibaca di tempat</p>
                    <div className="text-xs text-[#7A7A7A]">
                      <strong>Jam Operasional:</strong> Senin-Sabtu, 09.00-17.00 WIB
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <TechnologyIcon className="w-12 h-12 text-[#B05E3F] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">E-Book Digital</h3>
                    <p className="text-[#5A5A5A] leading-relaxed mb-3">Akses koleksi e-book dan bacaan digital kapan saja melalui platform online kami. Baca di laptop, tablet, atau smartphone</p>
                    <Link href="/baca" className="text-xs text-[#B05E3F] font-semibold hover:underline">
                      Jelajahi E-Book →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <CalendarIcon className="w-12 h-12 text-[#B05E3F] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">Program Literasi</h3>
                    <p className="text-[#5A5A5A] leading-relaxed mb-3">Workshop menulis, bedah buku, story telling anak, dan diskusi literasi rutin untuk semua usia</p>
                    <Link href="/kegiatan" className="text-xs text-[#B05E3F] font-semibold hover:underline">
                      Lihat Jadwal Program →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] p-12 border-4 border-[#B05E3F] shadow-2xl">
            <h3 className="font-serif text-4xl font-bold text-cream-soft-white mb-4">
              Mulai Perjalanan Literasi Anda
            </h3>
            <p className="text-cream-warm mb-8 text-lg max-w-2xl mx-auto">
              Keanggotaan <strong>100% GRATIS</strong> dan terbuka untuk umum. Bergabunglah dengan ribuan pembaca aktif di komunitas kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/koleksi"
                className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] shadow-lg"
              >
                Jelajahi {library.stats.books.toLocaleString('id-ID')} Buku
              </Link>
              <Link
                href="/baca"
                className="inline-block bg-white text-[#1F4E4C] px-10 py-4 font-serif font-bold text-lg hover:bg-cream-soft-white transition-all border-2 border-white shadow-lg"
              >
                Baca E-Book Gratis
              </Link>
              <Link
                href="/kontak"
                className="inline-block bg-transparent text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-white/10 transition-all border-2 border-cream-soft-white"
              >
                Daftar Anggota
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-cream-warm text-sm">
              <div className="flex items-center gap-2">
                <LibraryIcon className="w-5 h-5" />
                <span>Jl. Patinggi, Cibadak, Karawang</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>Senin-Sabtu, 09.00-17.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
