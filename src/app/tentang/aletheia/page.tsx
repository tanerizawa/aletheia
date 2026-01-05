import type { Metadata } from "next";
import Link from "next/link";
import { library } from "@/data/organization";

export const metadata: Metadata = {
  title: "Rumah Aletheia - Perpustakaan Komunitas",
  description: "Mengenal Rumah Aletheia, perpustakaan komunitas di Karawang yang menyediakan akses gratis ke ribuan buku dan program literasi.",
};

export default function AletheiaPage() {

  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">📚</span>
            <span className="text-sm uppercase tracking-wider font-serif">Perpustakaan</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            {library.name}
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Perpustakaan komunitas yang terbuka untuk semua
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* About */}
          <div className="bg-white border-2 border-[#D4C4B0] p-8 lg:p-12 mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Tentang Rumah Aletheia
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p>
                <strong>Rumah Aletheia</strong> adalah perpustakaan komunitas yang berlokasi di Karawang, Jawa Barat.
                Kami menyediakan akses gratis ke ribuan koleksi buku dari berbagai genre dan kategori,
                serta menyelenggarakan berbagai program literasi untuk masyarakat.
              </p>
              <p>
                Nama "Aletheia" berasal dari bahasa Yunani yang berarti "kebenaran" atau "keterbukaan".
                Kami percaya bahwa literasi adalah kunci untuk membuka pintu pengetahuan dan memberdayakan
                masyarakat melalui akses informasi yang terbuka.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#2C5F5D] text-white p-8 text-center">
              <div className="text-5xl font-serif font-bold mb-2">
                {library.stats.books.toLocaleString('id-ID')}
              </div>
              <div className="text-[#E8DED0] uppercase tracking-wider">Koleksi Buku</div>
            </div>
            <div className="bg-[#B05E3F] text-white p-8 text-center">
              <div className="text-5xl font-serif font-bold mb-2">
                {library.stats.members.toLocaleString('id-ID')}+
              </div>
              <div className="text-[#E8DED0] uppercase tracking-wider">Anggota</div>
            </div>
            <div className="bg-[#1F4E4C] text-white p-8 text-center">
              <div className="text-5xl font-serif font-bold mb-2">
                {library.stats.visitors.toLocaleString('id-ID')}+
              </div>
              <div className="text-[#E8DED0] uppercase tracking-wider">Pengunjung/Bulan</div>
            </div>
          </div>

          {/* Legal & Admin Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F5F1E8] border-l-4 border-[#B05E3F] p-6">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-4">
                Informasi Legal
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[#7A7A7A] mb-1">NPP (Nomor Pokok Perpustakaan)</div>
                  <div className="font-bold text-[#1F4E4C]">{library.npp}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] mb-1">SK Pendirian</div>
                  <div className="font-bold text-[#1F4E4C]">{library.sk}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] mb-1">Jenis</div>
                  <div className="font-bold text-[#1F4E4C]">{library.type} - {library.subtype}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F1E8] border-l-4 border-[#2C5F5D] p-6">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-4">
                Kepemimpinan
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[#7A7A7A] mb-1">Kepala Perpustakaan</div>
                  <div className="font-bold text-[#1F4E4C]">{library.director}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] mb-1">Tahun Berdiri</div>
                  <div className="font-bold text-[#1F4E4C]">{library.established}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] mb-1">Akreditasi</div>
                  <div className="font-bold text-[#1F4E4C]">{library.accreditation}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Layanan Perpustakaan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-[#D4C4B0] p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">📚</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Peminjaman Buku</h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Pinjam buku gratis untuk dibaca di rumah dengan masa peminjaman hingga 2 minggu</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-[#D4C4B0] p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">📖</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Ruang Baca</h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Ruang nyaman untuk membaca dengan koleksi referensi dan bacaan umum</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-[#D4C4B0] p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">💻</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">E-Book Digital</h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Akses koleksi e-book dan bacaan digital kapan saja</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-[#D4C4B0] p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🎓</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Program Literasi</h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Workshop, seminar, dan kegiatan untuk meningkatkan literasi masyarakat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] p-12 border-4 border-[#B05E3F]">
            <h3 className="font-serif text-3xl font-bold text-[#F5F1E8] mb-4">
              Kunjungi Perpustakaan Kami
            </h3>
            <p className="text-[#E8DED0] mb-8">
              Gratis dan terbuka untuk umum. Mari bergabung dengan komunitas pembaca kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/koleksi"
                className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
              >
                Lihat Koleksi
              </Link>
              <Link
                href="/kontak"
                className="inline-block bg-transparent text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-white/10 transition-all border-2 border-[#F5F1E8]"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
