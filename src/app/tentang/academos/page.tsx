import type { Metadata } from "next";
import Link from "next/link";
import { organization, units } from "@/data/organization";

export const metadata: Metadata = {
  title: "PT Academos Pustaka Demokrasi - Lembaga Induk",
  description: "Mengenal PT Academos Pustaka Demokrasi, lembaga induk dari Rumah Aletheia dan unit layanan lainnya.",
};

export default function AcademosPage() {

  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">🏛️</span>
            <span className="text-sm uppercase tracking-wider font-serif">Lembaga Induk</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            {organization.name}
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Membangun ekosistem literasi, pendidikan, dan penelitian untuk kemajuan masyarakat Indonesia
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* About */}
          <div className="bg-white border-2 border-[#D4C4B0] p-8 lg:p-12 mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
              Tentang Academos
            </h2>
            <div className="prose prose-lg max-w-none text-[#5A5A5A] leading-relaxed space-y-4">
              <p>
                PT Academos Pustaka Demokrasi adalah lembaga yang berfokus pada pengembangan literasi,
                pendidikan, dan penelitian sosial. Kami berkomitmen untuk meningkatkan akses terhadap
                pengetahuan dan memperkuat budaya literasi di Indonesia.
              </p>
              <p>
                Melalui berbagai unit layanan, kami menghadirkan solusi komprehensif untuk kebutuhan
                pendidikan, penelitian, dan penerbitan yang berkualitas.
              </p>
            </div>
          </div>

          {/* Legal Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F5F1E8] border-l-4 border-[#B05E3F] p-6">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-4">
                Informasi Legal
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[#7A7A7A] mb-1">SK Pendirian</div>
                  <div className="font-bold text-[#1F4E4C]">{organization.sk}</div>
                </div>
                <div>
                  <div className="text-[#7A7A7A] mb-1">Tahun Berdiri</div>
                  <div className="font-bold text-[#1F4E4C]">{organization.established}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F1E8] border-l-4 border-[#2C5F5D] p-6">
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-4">
                Kepemimpinan
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[#7A7A7A] mb-1">Direktur</div>
                  <div className="font-bold text-[#1F4E4C]">{organization.director}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Layanan */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Unit Layanan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {units.map((unit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#D4C4B0] p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{unit.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">
                        {unit.name}
                      </h3>
                      <p className="text-sm text-[#5A5A5A] leading-relaxed">
                        {unit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] p-12 border-4 border-[#B05E3F]">
            <h3 className="font-serif text-3xl font-bold text-[#F5F1E8] mb-4">
              Ingin Mengetahui Lebih Lanjut?
            </h3>
            <p className="text-[#E8DED0] mb-8">
              Hubungi kami untuk informasi lengkap tentang layanan kami
            </p>
            <Link
              href="/kontak"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
