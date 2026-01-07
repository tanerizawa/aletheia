import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { LibraryIcon, BookIcon, HandshakeIcon, PlantIcon, DocumentIcon, UsersIcon, ResearchIcon, PublishIcon, ReadIcon } from "@/components/icons";
import { organization, units } from "@/data/organization";

export const metadata: Metadata = {
  title: "PT Academos Pustaka Demokrasi - Lembaga Induk",
  description: "Mengenal PT Academos Pustaka Demokrasi, lembaga induk dari Rumah Aletheia dan unit layanan lainnya.",
};

export default function AcademosPage() {
  // Icon mapping function
  const getIconComponent = (iconName: string): ReactElement | null => {
    const iconMap: { [key: string]: ReactElement } = {
      'library': <LibraryIcon className="w-14 h-14 text-[#2C5F5D] group-hover:scale-110 transition-transform" />,
      'research': <ResearchIcon className="w-14 h-14 text-[#2C5F5D] group-hover:scale-110 transition-transform" />,
      'publish': <PublishIcon className="w-14 h-14 text-[#2C5F5D] group-hover:scale-110 transition-transform" />,
      'read': <ReadIcon className="w-14 h-14 text-[#2C5F5D] group-hover:scale-110 transition-transform" />,
    };
    return iconMap[iconName] || null;
  };

  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <LibraryIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Lembaga Induk</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            {organization.name}
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Membangun ekosistem literasi, pendidikan, dan penelitian untuk kemajuan masyarakat Indonesia
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Origin Story - Emotional Connection */}
          <div className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-12 mb-12 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Mengapa Academos Ada?
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#2C5F5D] first-letter:mr-3 first-letter:float-left">
                Dalam era informasi yang melimpah, akses terhadap <strong className="text-[#1F4E4C]">pengetahuan berkualitas</strong> seharusnya 
                menjadi hak setiap orang. Namun kenyataannya, kesenjangan literasi dan keterbatasan akses terhadap 
                sumber pembelajaran masih menjadi tantangan besar di Indonesia.
              </p>
              <p>
                <strong className="text-[#1F4E4C]">PT Academos Pustaka Demokrasi</strong> lahir dari kegelisahan dan optimisme. Kegelisahan 
                terhadap rendahnya budaya literasi dan riset yang berkualitas, serta optimisme bahwa perubahan dapat 
                dimulai dengan menyediakan ekosistem yang mendukung pembelajaran sepanjang hayat.
              </p>
              <p>
                Nama <em className="text-[#B05E3F] font-semibold">"Academos"</em> terinspirasi dari Akademia kuno Plato—tempat para 
                pemikir berkumpul untuk berdialog, belajar, dan mengembangkan ide. Kami percaya bahwa demokratisasi 
                pengetahuan adalah fondasi masyarakat yang maju dan bermartabat.
              </p>
            </div>
          </div>

          {/* Vision & Mission - Dual Column for Contrast */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] p-10 text-white shadow-xl">
              <h3 className="font-serif text-3xl font-bold mb-6 border-b-2 border-[#B05E3F] pb-3">Visi Kami</h3>
              <p className="text-cream-warm leading-relaxed text-lg italic">
                Menjadi lembaga terdepan dalam membangun ekosistem literasi, pendidikan, dan penelitian yang 
                inklusif, inovatif, dan berdampak bagi kemajuan masyarakat Indonesia.
              </p>
            </div>
            <div className="bg-white border-2 border-[#2C5F5D] p-10 shadow-xl">
              <h3 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6 border-b-2 border-[#B05E3F] pb-3">Misi Kami</h3>
              <ul className="space-y-3 text-[#5A5A5A]">
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Menyediakan akses terhadap pengetahuan dan informasi berkualitas untuk semua kalangan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Mengembangkan riset sosial yang relevan dengan kebutuhan masyarakat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Menerbitkan karya-karya ilmiah dan literatur yang menginspirasi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B05E3F] text-xl flex-shrink-0">▶</span>
                  <span>Membangun komunitas pembelajar yang aktif dan kolaboratif</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values - Visual Cards with Icons */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Nilai-Nilai Inti
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <BookIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Keunggulan Akademik
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Berkomitmen pada kualitas riset, penerbitan, dan layanan pendidikan yang berstandar tinggi
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#2C5F5D] p-6 hover:shadow-2xl transition-all group">
                <HandshakeIcon className="w-14 h-14 text-[#2C5F5D] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D] transition-colors">
                  Kolaborasi
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Membangun kemitraan dengan berbagai pihak untuk menciptakan dampak yang lebih luas
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#B05E3F] p-6 hover:shadow-2xl transition-all group">
                <PlantIcon className="w-14 h-14 text-[#B05E3F] mb-4" />
                <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                  Keberlanjutan
                </h4>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  Mengembangkan program yang berkelanjutan dan memberikan manfaat jangka panjang
                </p>
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
                  <div className="text-[#7A7A7A] text-sm mb-1">SK Pendirian</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{organization.sk}</div>
                </div>
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">Tahun Berdiri</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{organization.established}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] text-sm mb-1">Status</div>
                  <div className="font-bold text-[#2C5F5D] text-lg">Perseroan Terbatas (PT)</div>
                </div>
              </div>
            </div>

            <div className="bg-cream-soft-white border-l-4 border-[#2C5F5D] p-8 shadow-md">
              <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-6 flex items-center gap-3">
                <UsersIcon className="w-6 h-6 text-[#2C5F5D]" />
                Kepemimpinan
              </h3>
              <div className="space-y-4">
                <div className="border-b border-cream-beige pb-3">
                  <div className="text-[#7A7A7A] text-sm mb-1">Direktur</div>
                  <div className="font-bold text-[#1F4E4C] text-lg">{organization.director}</div>
                </div>
                <div>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed italic">
                    Dengan visi jangka panjang untuk membangun ekosistem pembelajaran yang berkelanjutan 
                    dan berdampak positif bagi masyarakat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Layanan */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl font-bold text-[#1F4E4C] mb-4">
                Unit Layanan Kami
              </h2>
              <p className="text-[#5A5A5A] max-w-2xl mx-auto">
                Empat pilar layanan terintegrasi untuk mendukung ekosistem literasi dan pembelajaran
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {units.map((unit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-cream-beige p-8 hover:border-[#B05E3F] hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div>{getIconComponent(unit.icon)}</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">
                        {unit.name}
                      </h3>
                      <p className="text-[#5A5A5A] leading-relaxed mb-4">
                        {unit.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#B05E3F] font-semibold">
                        <span>Selengkapnya</span>
                        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Metrics - Social Proof */}
          <div className="bg-gradient-to-r from-[#1F4E4C] to-[#2C5F5D] p-12 mb-12 text-center">
            <h3 className="font-serif text-3xl font-bold text-cream-soft-white mb-8">
              Dampak Kami
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">4</div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Unit Layanan</div>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">500+</div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Anggota Komunitas</div>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">50+</div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Program/Tahun</div>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold text-[#D4A574] mb-2">10+</div>
                <div className="text-cream-warm text-sm uppercase tracking-wide">Kemitraan</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] p-12 border-4 border-[#B05E3F]">
            <h3 className="font-serif text-3xl font-bold text-cream-soft-white mb-4">
              Ingin Mengetahui Lebih Lanjut?
            </h3>
            <p className="text-cream-warm mb-8">
              Hubungi kami untuk informasi lengkap tentang layanan kami
            </p>
            <Link
              href="/kontak"
              className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
