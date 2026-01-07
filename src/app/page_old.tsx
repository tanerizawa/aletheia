import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      {/* Hero Section - Magazine Style */}
      <section className="relative bg-[#2C5F5D] overflow-hidden" aria-label="Hero - Selamat datang di Rumah Aletheia">
        <div className="absolute inset-0 opacity-5 bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="font-serif text-[#B05E3F] text-sm uppercase tracking-[0.3em] font-semibold border-b-2 border-[#B05E3F] pb-1">
                Perpustakaan & Pusat Informasi
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-cream-soft-white leading-[1.1]">
              Rumah Aletheia
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-cream-warm leading-relaxed max-w-2xl">
              Tempat di mana keberanian bertemu kebijaksanaan melalui pengetahuan dan pembelajaran
            </p>
            <Link
              href="/kegiatan"
              className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-semibold hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] hover:border-[#9A5035] shadow-lg hover:shadow-xl"
            >
              Jelajahi Kegiatan
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#B05E3F] opacity-10 rounded-tl-full"></div>
      </section>

      {/* Features Section - Grid Magazine Style */}
      <section className="py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="font-serif text-4xl lg:text-5xl font-bold text-[#1F4E4C] mb-6">
              Layanan Kami
            </h2>
            <div className="w-24 h-1 bg-[#B05E3F] mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <article className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#2C5F5D] bg-opacity-10 rounded flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                  <svg className="w-10 h-10 text-[#2C5F5D] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Koleksi Buku</h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Berbagai koleksi buku dari berbagai kategori untuk mendukung pembelajaran dan penelitian yang mendalam.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#2C5F5D] bg-opacity-10 rounded flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                  <svg className="w-10 h-10 text-[#2C5F5D] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Kegiatan Edukatif</h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Program dan kegiatan edukatif yang dirancang untuk meningkatkan minat baca dan pengetahuan bersama.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-white border-l-4 border-[#B05E3F] p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#2C5F5D] bg-opacity-10 rounded flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                  <svg className="w-10 h-10 text-[#2C5F5D] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#1F4E4C]">Informasi & Layanan</h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Informasi terkini tentang perpustakaan dan layanan bantuan yang ramah untuk semua pengunjung.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section - Magazine Pull Quote Style */}
      <section className="py-20 bg-white border-t-4 border-b-4 border-[#2C5F5D]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-[#B05E3F] opacity-20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-[#1F4E4C] italic leading-tight">
            "Kunjungi Rumah Aletheia"
          </h2>
          <p className="text-xl text-[#5A5A5A] mb-10 leading-relaxed">
            Temukan pengetahuan dan pengalaman baru di perpustakaan yang dirancang untuk kenyamanan Anda
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-[#2C5F5D] text-cream-soft-white px-10 py-4 font-semibold hover:bg-[#1F4E4C] transition-all border-2 border-[#2C5F5D] hover:border-[#1F4E4C]"
            aria-label="Hubungi kami untuk informasi lebih lanjut"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterForm />
    </>
  );
}
