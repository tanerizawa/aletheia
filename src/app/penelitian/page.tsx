import type { Metadata } from "next";
import Link from "next/link";
import { ResearchIcon, ChartIcon, CultureIcon, BrainIcon, LibraryIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Studio Riset - Lembaga Penelitian Sosial",
  description: "Layanan penelitian sosial, humaniora, psikologi, dan sejarah dari PT Academos Pustaka Demokrasi.",
};

export default function PenelitianPage() {
  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <ResearchIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Studio Riset</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Lembaga Penelitian Sosial
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Riset mendalam di bidang sosial, humaniora, psikologi, dan sejarah
          </p>
        </div>
      </section>

      {/* About Research */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white border-l-4 border-[#2C5F5D] p-8 lg:p-12 mb-16 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Penelitian untuk Pemahaman yang Lebih Dalam
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                <strong className="text-[#1F4E4C]">Penelitian adalah jendela untuk memahami kompleksitas masyarakat, budaya, dan individu.</strong> 
                Lembaga Penelitian Sosial PT Academos hadir untuk menghasilkan pengetahuan yang bermakna, berbasis bukti, 
                dan relevan dengan kebutuhan masyarakat Indonesia.
              </p>
              <p>
                Kami fokus pada <em className="text-[#2C5F5D] font-semibold">riset kolaboratif dan partisipatif</em>, melibatkan 
                komunitas dalam setiap tahap penelitian — dari perumusan masalah hingga diseminasi hasil. Penelitian kami tidak 
                hanya menghasilkan laporan, tetapi juga <strong className="text-[#1F4E4C]">mendorong perubahan sosial</strong> yang nyata.
              </p>
            </div>
          </div>

          {/* Research Areas */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Bidang Riset Kami
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Empat pilar riset yang kami fokuskan untuk memahami dinamika sosial dan budaya
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
                <ChartIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Penelitian Sosial</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Riset kualitatif dan kuantitatif untuk memahami dinamika masyarakat, struktur sosial, dan perubahan sosial.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Survei dan analisis statistik</div>
                  <div>• Etnografi dan studi kasus</div>
                  <div>• Analisis kebijakan publik</div>
                  <div>• Riset partisipatif berbasis komunitas</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
                <CultureIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Studi Humaniora</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Penelitian mendalam tentang budaya, seni, sastra, dan warisan budaya Indonesia.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Kajian budaya lokal dan tradisi</div>
                  <div>• Analisis karya sastra</div>
                  <div>• Dokumentasi seni pertunjukan</div>
                  <div>• Pelestarian warisan budaya</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-xl transition-all group">
                <BrainIcon className="w-14 h-14 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Riset Psikologi</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Studi tentang perilaku manusia, proses kognitif, dan dinamika psikologi sosial.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Psikologi sosial dan komunitas</div>
                  <div>• Studi perilaku konsumen</div>
                  <div>• Riset kesehatan mental</div>
                  <div>• Psikologi pendidikan</div>
                </div>
              </div>

              <div className="bg-white border-2 border-cream-beige p-8 hover:border-[#2C5F5D] hover:shadow-xl transition-all group">
                <LibraryIcon className="w-14 h-14 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3">Penelitian Sejarah</h3>
                <p className="text-[#5A5A5A] leading-relaxed mb-4">
                  Riset historis berbasis arsip dan sumber primer untuk merekonstruksi masa lalu.
                </p>
                <div className="text-sm text-[#7A7A7A] space-y-2">
                  <div>• Sejarah lokal dan oral history</div>
                  <div>• Kajian arsip dan dokumen</div>
                  <div>• Biografi tokoh sejarah</div>
                  <div>• Sejarah sosial ekonomi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-3 text-center">
              Layanan Kami
            </h2>
            <p className="text-center text-[#5A5A5A] mb-10 max-w-2xl mx-auto">
              Dukungan riset profesional untuk akademisi, pemerintah, dan organisasi
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-6 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
                <div className="text-2xl font-bold text-[#2C5F5D] mb-2">01</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">Konsultasi Riset</h3>
                <p className="text-sm text-[#5A5A5A]">
                  Bimbingan metodologi penelitian, desain riset, dan analisis data untuk mahasiswa dan peneliti.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#B05E3F]/5 to-[#B05E3F]/10 border-2 border-[#B05E3F]/20 p-6 hover:border-[#B05E3F] hover:shadow-xl transition-all">
                <div className="text-2xl font-bold text-[#B05E3F] mb-2">02</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">Jasa Penelitian</h3>
                <p className="text-sm text-[#5A5A5A]">
                  Melakukan riset untuk kebutuhan organisasi, pemerintah, dan lembaga dengan metode yang rigorous.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-6 hover:border-[#2C5F5D] hover:shadow-xl transition-all">
                <div className="text-2xl font-bold text-[#2C5F5D] mb-2">03</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-3">Training & Workshop</h3>
                <p className="text-sm text-[#5A5A5A]">
                  Pelatihan metode penelitian, analisis data, dan penulisan akademik untuk meningkatkan kapasitas riset.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Research */}
          <div className="bg-cream-soft-white p-8 lg:p-12 mb-16">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6 text-center">
              Riset Terkini
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 border-l-4 border-[#2C5F5D] hover:shadow-lg transition-shadow">
                <div className="text-xs text-[#7A7A7A] mb-2 uppercase tracking-wider">Penelitian Sosial • 2025</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">
                  Dinamika Literasi di Pedesaan Karawang
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-3">
                  Studi etnografi tentang praktik literasi masyarakat pedesaan dan upaya peningkatan minat baca.
                </p>
                <div className="text-xs text-[#B05E3F] font-bold">Status: Ongoing</div>
              </div>

              <div className="bg-white p-6 border-l-4 border-[#B05E3F] hover:shadow-lg transition-shadow">
                <div className="text-xs text-[#7A7A7A] mb-2 uppercase tracking-wider">Studi Humaniora • 2024</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">
                  Tradisi Lisan Masyarakat Sunda
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-3">
                  Dokumentasi dan analisis tradisi lisan sebagai warisan budaya tak benda di Jawa Barat.
                </p>
                <div className="text-xs text-[#2C5F5D] font-bold">Status: Published</div>
              </div>

              <div className="bg-white p-6 border-l-4 border-[#2C5F5D] hover:shadow-lg transition-shadow">
                <div className="text-xs text-[#7A7A7A] mb-2 uppercase tracking-wider">Riset Psikologi • 2024</div>
                <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">
                  Kesehatan Mental Mahasiswa Pasca Pandemi
                </h3>
                <p className="text-sm text-[#5A5A5A] mb-3">
                  Survei dampak pandemi terhadap kesehatan mental mahasiswa dan strategi pemulihan.
                </p>
                <div className="text-xs text-[#2C5F5D] font-bold">Status: Published</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ResearchIcon className="w-16 h-16 text-[#D4A574] mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-cream-soft-white mb-6">
            Kolaborasi Riset?
          </h2>
          <p className="text-xl text-cream-warm mb-8 max-w-2xl mx-auto">
            Kami terbuka untuk kolaborasi penelitian dengan universitas, lembaga, dan peneliti independen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/artikel"
              className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] shadow-lg"
            >
              Baca Artikel Riset
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-white text-[#1F4E4C] px-10 py-4 font-serif font-bold text-lg hover:bg-cream-soft-white transition-all border-2 border-white shadow-lg"
            >
              Ajukan Kolaborasi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
