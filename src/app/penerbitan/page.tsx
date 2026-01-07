import type { Metadata } from "next";
import Link from "next/link";
import { PublishIcon, BookIcon, NewspaperIcon, TechnologyIcon, DocumentIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Toko Buku - Penerbitan Independen",
  description: "Penerbitan buku, jurnal, dan media digital dari PT Academos Pustaka Demokrasi.",
};

export default function PenerbitanPage() {
  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <PublishIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Toko Buku</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Penerbitan Independen
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Menerbitkan buku berkualitas, jurnal akademik, dan media digital untuk kemajuan literasi
          </p>
        </div>
      </section>

      {/* About Publishing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-16 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Menerbitkan Ide, Menyebarkan Pengetahuan
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#B05E3F] first-letter:mr-3 first-letter:float-left">
                <strong className="text-[#1F4E4C]">Setiap naskah adalah perjalanan — dari ide di kepala penulis hingga menjadi buku di tangan pembaca.</strong> 
                PT Academos Pustaka Demokrasi berkomitmen menjadi jembatan perjalanan ini, menerbitkan karya berkualitas yang 
                memperkaya khazanah literasi Indonesia.
              </p>
              <p>
                Kami adalah <em className="text-[#B05E3F] font-semibold">penerbit independen</em> yang fokus pada buku non-fiksi, 
                riset sosial-humaniora, jurnal akademik, dan media digital. Kami percaya bahwa <strong className="text-[#1F4E4C]">penulis 
                independen dan peneliti lokal</strong> memiliki suara penting yang perlu didengar oleh publik yang lebih luas.
              </p>
            </div>
          </div>

          {/* Publishing Services */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Layanan Penerbitan
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Dari naskah hingga buku jadi, kami mendampingi setiap tahap penerbitan
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
                <BookIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Penerbitan Buku</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Menerbitkan buku fiksi, non-fiksi, akademik, dan buku anak dengan kualitas editorial dan desain profesional.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Self-publishing assistance</div>
                  <div>• Traditional publishing</div>
                  <div>• Format cetak dan digital (e-book)</div>
                  <div>• ISBN dan registrasi nasional</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
                <NewspaperIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Jurnal Akademik</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Publikasi jurnal ilmiah peer-reviewed di bidang sosial, humaniora, dan pendidikan.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Jurnal terindeks nasional</div>
                  <div>• Peer-review process</div>
                  <div>• Open access publishing</div>
                  <div>• DOI untuk setiap artikel</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
                <TechnologyIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Media Digital</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Produksi konten digital: e-book, audiobook, dan publikasi online untuk jangkauan lebih luas.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• E-book formatting (EPUB, PDF)</div>
                  <div>• Audiobook production</div>
                  <div>• Web-based publications</div>
                  <div>• Digital marketing support</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
                <DocumentIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Jasa Editing</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Layanan editing profesional untuk naskah buku, artikel, dan dokumen akademik.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Substantive editing</div>
                  <div>• Copy editing & proofreading</div>
                  <div>• Fact-checking</div>
                  <div>• Formatting & layout</div>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Process */}
          <div className="bg-gradient-to-br from-cream-soft-white to-white p-8 lg:p-12 mb-16">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6 text-center">
              Proses Penerbitan
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Dari naskah hingga buku terbit, kami mendampingi Anda di setiap langkah
            </p>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">Submit Naskah</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Kirim naskah melalui email atau form online
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">Review</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Tim editor menilai kelayakan naskah (2-4 minggu)
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">Editing</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Proses editing dan revisi bersama penulis
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2C5F5D] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  4
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">Desain & Cetak</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Desain cover, layout, dan proses percetakan
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B05E3F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  5
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">Distribusi</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Peluncuran buku dan distribusi ke toko/online
                </p>
              </div>
            </div>
          </div>

          {/* Published Books */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Buku Terbitan Kami
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Beberapa karya yang telah kami terbitkan
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-cream-beige p-6 hover:shadow-xl transition-all">
                <div className="aspect-[3/4] bg-[#2C5F5D]/10 mb-4 flex items-center justify-center">
                  <BookIcon className="w-20 h-20 text-[#2C5F5D]" />
                </div>
                <div className="text-xs text-[#7A7A7A] mb-1 uppercase tracking-wider">Non-fiksi • 2024</div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">
                  Literasi Digital untuk Semua
                </h3>
                <p className="text-sm text-[#7A7A7A] mb-3">Oleh Tim Academos</p>
                <p className="text-sm text-[#5A5A5A]">
                  Panduan praktis meningkatkan literasi digital di era informasi.
                </p>
              </div>

              <div className="bg-white border-2 border-cream-beige p-6 hover:shadow-xl transition-all">
                <div className="aspect-[3/4] bg-[#B05E3F]/10 mb-4 flex items-center justify-center">
                  <BookIcon className="w-20 h-20 text-[#B05E3F]" />
                </div>
                <div className="text-xs text-[#7A7A7A] mb-1 uppercase tracking-wider">Riset • 2024</div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">
                  Tradisi Lisan Sunda
                </h3>
                <p className="text-sm text-[#7A7A7A] mb-3">Oleh Dr. Nurhayati</p>
                <p className="text-sm text-[#5A5A5A]">
                  Dokumentasi dan analisis tradisi lisan masyarakat Sunda.
                </p>
              </div>

              <div className="bg-white border-2 border-cream-beige p-6 hover:shadow-xl transition-all">
                <div className="aspect-[3/4] bg-[#2C5F5D]/10 mb-4 flex items-center justify-center">
                  <BookIcon className="w-20 h-20 text-[#2C5F5D]" />
                </div>
                <div className="text-xs text-[#7A7A7A] mb-1 uppercase tracking-wider">Antologi • 2025</div>
                <h3 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">
                  Suara dari Perpustakaan
                </h3>
                <p className="text-sm text-[#7A7A7A] mb-3">Oleh Komunitas Aletheia</p>
                <p className="text-sm text-[#5A5A5A]">
                  Kumpulan cerita dan puisi dari anggota komunitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#B05E3F] to-[#9A5035]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <PublishIcon className="w-16 h-16 text-cream-soft-white mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-cream-soft-white mb-6">
            Punya Naskah Siap Terbit?
          </h2>
          <p className="text-xl text-cream-warm mb-8 max-w-2xl mx-auto">
            Kami terbuka untuk menerbitkan karya penulis independen. Kirim naskah Anda sekarang!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/koleksi"
              className="inline-block bg-white text-[#B05E3F] px-10 py-4 font-serif font-bold text-lg hover:bg-cream-soft-white transition-all border-2 border-white shadow-lg"
            >
              Lihat Katalog Buku
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-[#2C5F5D] text-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#1F4E4C] transition-all border-2 border-[#2C5F5D] shadow-lg"
            >
              Ajukan Naskah
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
