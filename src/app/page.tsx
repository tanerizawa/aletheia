import Link from "next/link";
import { organization, library, units } from "@/data/organization";
import { mainNavigation } from "@/data/navigation";
import StatsShowcase from "@/components/StatsShowcase";

export default function Home() {
  // Get "Jelajahi" items for room cards
  const exploreItems = mainNavigation.find(item => item.title === "Jelajahi")?.children || [];
  
  return (
    <>
      {/* ==========================================
          HALAMAN DEPAN - The Gate/Entrance
          First impression with gate metaphor
          ========================================== */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A3D3B] via-[#2C5F5D] to-[#1F4E4C]"
        aria-label="Halaman Depan Rumah Aletheia"
      >
        {/* Decorative elements - gate pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#B05E3F] to-transparent opacity-30" aria-hidden="true"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#B05E3F] to-transparent opacity-30" aria-hidden="true"></div>
        
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(240,235,227,0.1) 35px, rgba(240,235,227,0.1) 70px)'}} aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-16 text-center">
          {/* Library Icon/Logo */}
          <div className="mb-8 animate-[fadeIn_0.6s_ease-in]">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F5F1E8]/10 backdrop-blur-sm border-2 border-[#F5F1E8]/30">
              <span className="text-6xl" role="img" aria-label="Rumah Perpustakaan">🏛️</span>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="mb-4 animate-[fadeIn_0.8s_ease-in]">
            <span className="inline-block text-[#E8DED0] text-sm uppercase tracking-[0.4em] font-serif font-bold border-b-2 border-[#B05E3F] pb-2">
              Selamat Datang di
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-serif text-6xl lg:text-8xl font-bold mb-6 text-[#F5F1E8] leading-[1.1] animate-[fadeIn_1s_ease-in]">
            Rumah Aletheia
          </h1>
          
          {/* Subtitle - Organization */}
          <p className="text-lg text-[#D4C4B0] mb-8 font-serif italic animate-[fadeIn_1.2s_ease-in]">
            Perpustakaan PT Academos Pustaka Demokrasi
          </p>
          
          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-[#E8DED0] mb-12 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_1.4s_ease-in]">
            Tempat di mana <span className="text-[#B05E3F] font-bold">keberanian</span> bertemu{' '}
            <span className="text-[#B05E3F] font-bold">kebijaksanaan</span> melalui pengetahuan dan pembelajaran
          </p>
          
          {/* Stats Quick View */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-[fadeIn_1.6s_ease-in]">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B05E3F] font-serif">{library.stats.books.toLocaleString('id-ID')}</div>
              <div className="text-sm text-[#E8DED0] uppercase tracking-wider mt-1">Koleksi Buku</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B05E3F] font-serif">{library.stats.members.toLocaleString('id-ID')}+</div>
              <div className="text-sm text-[#E8DED0] uppercase tracking-wider mt-1">Anggota</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B05E3F] font-serif">{library.stats.visitors.toLocaleString('id-ID')}+</div>
              <div className="text-sm text-[#E8DED0] uppercase tracking-wider mt-1">Pengunjung/Bulan</div>
            </div>
          </div>
          
          {/* CTA - Enter the house */}
          <div className="animate-[fadeIn_1.8s_ease-in]">
            <a 
              href="#teras" 
              className="inline-flex items-center gap-3 bg-[#B05E3F] text-[#F5F1E8] px-10 py-5 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all duration-300 border-2 border-[#B05E3F] hover:border-[#9A5035] shadow-2xl hover:shadow-[#B05E3F]/50 hover:scale-105"
              aria-label="Masuk ke Teras"
            >
              <span>Masuk ke Rumah</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
            <svg className="w-6 h-6 text-[#E8DED0]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ==========================================
          TERAS - The Porch/Overview
          Overview of what's inside the house
          ========================================== */}
      <section 
        id="teras"
        className="py-20 lg:py-28 bg-[#F5F1E8] relative"
        aria-labelledby="teras-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Room Indicator */}
          <div className="inline-flex items-center gap-2 mb-6 text-[#5A5A5A]">
            <span className="text-2xl">🪴</span>
            <span className="text-sm uppercase tracking-wider font-serif">Teras</span>
          </div>
          
          {/* Heading */}
          <h2 id="teras-heading" className="font-serif text-4xl lg:text-6xl font-bold text-[#1F4E4C] mb-6">
            Sekilas Tentang Kami
          </h2>
          
          <p className="text-xl text-[#5A5A5A] mb-16 max-w-3xl leading-relaxed">
            {organization.name} menghadirkan beragam layanan untuk mendukung riset, literasi, dan pembelajaran masyarakat
          </p>
          
          {/* Organization Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left: About Academos */}
            <div className="bg-white p-8 lg:p-10 border-l-4 border-[#2C5F5D] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏢</span>
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C]">
                  {organization.shortName}
                </h3>
              </div>
              <div className="space-y-3 text-[#5A5A5A]">
                <p className="leading-relaxed">
                  <span className="font-bold text-[#1F4E4C]">Lembaga induk</span> yang menaungi berbagai unit layanan untuk kemajuan pengetahuan dan literasi publik.
                </p>
                <div className="pt-4 border-t border-[#D4C4B0]">
                  <p className="text-sm"><span className="font-bold">SK Pendirian:</span> {organization.sk}</p>
                  <p className="text-sm"><span className="font-bold">Kepala Lembaga:</span> {organization.director}</p>
                  <p className="text-sm"><span className="font-bold">Tahun Berdiri:</span> {organization.established}</p>
                </div>
              </div>
            </div>
            
            {/* Right: About Aletheia Library */}
            <div className="bg-white p-8 lg:p-10 border-l-4 border-[#B05E3F] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📚</span>
                <h3 className="font-serif text-2xl font-bold text-[#1F4E4C]">
                  Rumah Aletheia
                </h3>
              </div>
              <div className="space-y-3 text-[#5A5A5A]">
                <p className="leading-relaxed">
                  <span className="font-bold text-[#1F4E4C]">Perpustakaan komunitas</span> yang menyediakan akses ke berbagai koleksi buku dan pengetahuan untuk semua kalangan.
                </p>
                <div className="pt-4 border-t border-[#D4C4B0]">
                  <p className="text-sm"><span className="font-bold">NPP:</span> {library.npp}</p>
                  <p className="text-sm"><span className="font-bold">Jenis:</span> Umum - Komunitas/TBM</p>
                  <p className="text-sm"><span className="font-bold">SK:</span> {library.sk}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Unit Layanan Showcase */}
          <div className="mb-20">
            <h3 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Unit Layanan Kami
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {units.map((unit, index) => (
                <div 
                  key={unit.id}
                  className="bg-white p-6 border-2 border-[#D4C4B0] hover:border-[#B05E3F] transition-all duration-300 group hover:shadow-xl"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {unit.icon}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1F4E4C] mb-2">
                    {unit.name}
                  </h4>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed">
                    {unit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Statistics Showcase */}
          <StatsShowcase />
          
          {/* Room Navigation - Explore the House */}
          <div className="mt-20">
            <h3 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-8 text-center">
              Jelajahi Ruangan
            </h3>
            <p className="text-center text-[#5A5A5A] mb-12 max-w-2xl mx-auto">
              Silakan masuk ke ruangan-ruangan untuk menemukan layanan dan sumber daya yang Anda butuhkan
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exploreItems.map((room) => (
                <Link
                  key={room.href}
                  href={room.href}
                  className="group block bg-white p-8 border-2 border-[#D4C4B0] hover:border-[#2C5F5D] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {room.icon}
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#2C5F5D]">
                    {room.title}
                  </h4>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed mb-4">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#B05E3F] text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA Section - Invitation
          ========================================== */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B05E3F] opacity-10 rounded-full blur-3xl" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5F1E8] opacity-5 rounded-full blur-3xl" aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl" role="img" aria-label="Undangan">💌</span>
          </div>
          
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#F5F1E8] mb-6 leading-tight">
            Kunjungi Rumah Aletheia
          </h2>
          
          <p className="text-xl text-[#E8DED0] mb-10 leading-relaxed max-w-2xl mx-auto">
            Temukan pengetahuan, jalin diskusi, dan kembangkan wawasan bersama komunitas pembaca dan peneliti kami
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/koleksi"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all duration-300 border-2 border-[#B05E3F] hover:border-[#9A5035] shadow-lg hover:shadow-xl"
            >
              Lihat Koleksi
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-transparent text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#F5F1E8]/10 transition-all duration-300 border-2 border-[#F5F1E8]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          Location Preview
          ========================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Address Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4 text-[#5A5A5A]">
                <span className="text-2xl">📍</span>
                <span className="text-sm uppercase tracking-wider font-serif">Lokasi</span>
              </div>
              
              <h3 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-6">
                Temukan Kami
              </h3>
              
              <address className="not-italic space-y-3 text-[#5A5A5A] mb-8">
                <p className="text-lg leading-relaxed">
                  {organization.address.street}<br />
                  Desa {organization.address.village}, Kec. {organization.address.district}<br />
                  {organization.address.regency}, {organization.address.province} {organization.address.postalCode}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${organization.contact.phone}`} className="hover:text-[#B05E3F] transition-colors">
                    {organization.contact.phone}
                  </a>
                </p>
              </address>
              
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 text-[#B05E3F] font-serif font-bold hover:gap-4 transition-all"
              >
                <span>Lihat Peta & Info Lengkap</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Map Placeholder / Image */}
            <div className="bg-[#F5F1E8] border-2 border-[#D4C4B0] h-96 flex items-center justify-center">
              <div className="text-center text-[#7A7A7A]">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#2C5F5D] opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm">Peta interaktif tersedia di halaman Kontak</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
