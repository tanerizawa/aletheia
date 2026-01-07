'use client';

import Link from "next/link";
import Image from "next/image";
import { organization, library, units } from "@/data/organization";
import StatsShowcase from "@/components/StatsShowcase";
import { PlantIcon, BuildingIcon, BookIcon, LocationIcon } from "@/components/icons";
import NavIcon from "@/components/NavIcon";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  
  return (
    <>
      {/* ==========================================
          HALAMAN DEPAN - The Gate/Entrance
          First impression with gate metaphor
          ========================================== */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800"
        aria-label="Halaman Depan Rumah Aletheia"
      >
        {/* Decorative elements - gate pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-terra-700 to-transparent opacity-30" aria-hidden="true"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-terra-700 to-transparent opacity-30" aria-hidden="true"></div>
        
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(240,235,227,0.1) 35px, rgba(240,235,227,0.1) 70px)'}} aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-16 text-center">
          {/* Welcome Text */}
          <div className="mb-4 animate-[fadeIn_0.8s_ease-in]">
            <span className="inline-block text-cream-warm text-sm uppercase tracking-[0.4em] font-serif font-semibold border-b-2 border-terra-light pb-2">
              Selamat Datang di
            </span>
          </div>
          
          {/* Main Heading - Logo */}
          <div className="mb-6 animate-[fadeIn_1s_ease-in]">
            <Image src="/logo.svg" alt="Rumah Aletheia - part of Academos" width={400} height={133} className="mx-auto h-24 lg:h-32 w-auto" priority />
          </div>
          
          {/* Subtitle - Organization */}
          <p className="text-lg text-cream-beige mb-8 font-serif italic animate-[fadeIn_1.2s_ease-in]">
            Perpustakaan PT Academos Pustaka Demokrasi
          </p>
          
          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-cream-warm mb-12 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_1.4s_ease-in]">
            Tempat di mana <span className="text-terra-light font-semibold">keberanian</span> bertemu{' '}
            <span className="text-terra-light font-semibold">kebijaksanaan</span> melalui pengetahuan dan pembelajaran
          </p>
          
          {/* Stats Quick View */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-[fadeIn_1.6s_ease-in]">
            <div className="text-center">
              <div className="text-4xl font-bold text-terra-light font-serif">{library.stats.books.toLocaleString('id-ID')}</div>
              <div className="text-sm text-cream-beige uppercase tracking-wider mt-1">Koleksi Buku</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terra-light font-serif">{library.stats.members.toLocaleString('id-ID')}+</div>
              <div className="text-sm text-cream-beige uppercase tracking-wider mt-1">Anggota</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terra-light font-serif">{library.stats.visitors.toLocaleString('id-ID')}+</div>
              <div className="text-sm text-cream-beige uppercase tracking-wider mt-1">Pengunjung/Bulan</div>
            </div>
          </div>
          
          {/* CTA - Enter the house */}
          <div className="animate-[fadeIn_1.8s_ease-in]">
            <a
              href="#teras"
              className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg rounded-lg"
              aria-label="Masuk ke Teras"
            >
              <span>Masuk ke Rumah</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
            <svg className="w-6 h-6 text-cream-beige/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="py-24 lg:py-32 bg-gradient-to-b from-cream-soft-white/30 to-white relative"
        aria-labelledby="teras-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Room Indicator */}
          <div className="inline-flex items-center gap-2 mb-6 text-secondary">
            <PlantIcon className="w-6 h-6 text-teal-700" />
            <span className="text-sm uppercase tracking-wider font-serif font-bold">Teras</span>
          </div>

          {/* Heading */}
          <ScrollFadeIn direction="up">
            <h2 id="teras-heading" className="font-serif text-4xl lg:text-6xl font-bold text-teal-900 mb-6">
              Sekilas Tentang Kami
            </h2>

            <p className="text-xl text-secondary mb-16 max-w-3xl leading-relaxed">
              {organization.name} menghadirkan beragam layanan untuk mendukung riset, literasi, dan pembelajaran masyarakat
            </p>
          </ScrollFadeIn>
          
          {/* Organization Info Grid - Improved Contrast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left: About Academos */}
            <ScrollFadeIn direction="left" delay={100}>
              <div className="card-group hover-lift bg-gradient-to-br from-teal-700 to-teal-900 border-l-4 border-teal-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <BuildingIcon className="w-6 h-6 text-terra-400" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {organization.shortName}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed text-cream-100 text-lg">
                    <span className="font-bold text-white">Lembaga induk</span> yang menaungi berbagai unit layanan untuk kemajuan pengetahuan dan literasi publik.
                  </p>
                  <div className="pt-4 border-t border-teal-500/30 space-y-2 text-cream-200">
                    <p className="text-sm"><span className="font-semibold text-white">SK Pendirian:</span> {organization.sk}</p>
                    <p className="text-sm"><span className="font-semibold text-white">Kepala Lembaga:</span> {organization.director}</p>
                    <p className="text-sm"><span className="font-semibold text-white">Tahun Berdiri:</span> {organization.established}</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Right: About Aletheia Library */}
            <ScrollFadeIn direction="right" delay={200}>
              <div className="card-group hover-lift bg-gradient-to-br from-terra-700 to-terra-900 border-l-4 border-terra-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-terra-500/20 flex items-center justify-center">
                    <BookIcon className="w-6 h-6 text-cream-100" />
                  </div>
                  <Image src="/logo.svg" alt="Rumah Aletheia - part of Academos" width={200} height={67} className="h-10 lg:h-12 w-auto brightness-0 invert" />
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed text-cream-100 text-lg">
                    <span className="font-bold text-white">Perpustakaan komunitas</span> yang menyediakan akses ke berbagai koleksi buku dan pengetahuan untuk semua kalangan.
                  </p>
                  <div className="pt-4 border-t border-terra-500/30 space-y-2 text-cream-200">
                    <p className="text-sm"><span className="font-semibold text-white">NPP:</span> {library.npp}</p>
                    <p className="text-sm"><span className="font-semibold text-white">Jenis:</span> Umum - Komunitas/TBM</p>
                    <p className="text-sm"><span className="font-semibold text-white">SK:</span> {library.sk}</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
          
          {/* Unit Layanan Showcase */}
          <div className="mb-20">
            <ScrollFadeIn direction="up">
              <h3 className="font-serif text-3xl font-bold text-teal-900 mb-8 text-center">
                Unit Layanan Kami
              </h3>
            </ScrollFadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {units.map((unit, index) => (
                <ScrollFadeIn key={unit.id} direction="up" delay={index * 100}>
                  <div className="card-group hover-lift group h-full border-2 border-cream-400 hover:border-terra-700 transition-all duration-200">
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                      <NavIcon icon={unit.icon} className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-teal-900 mb-3">
                      {unit.name}
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed">
                      {unit.description}
                    </p>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
          
          {/* Statistics Showcase */}
          <StatsShowcase />
          
          {/* Room Navigation - Explore the House */}
          <div className="mt-20">
            <ScrollFadeIn direction="up">
              <h3 className="font-serif text-3xl font-bold text-teal-900 mb-8 text-center">
                Jelajahi Ruangan
              </h3>
              <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
                Silakan masuk ke ruangan-ruangan untuk menemukan layanan dan sumber daya yang Anda butuhkan
              </p>
            </ScrollFadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Ruang Tamu - Tentang */}
              <ScrollFadeIn direction="up" delay={0}>
                <Link href="/tentang" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="users" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Ruang Tamu
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Kenali sejarah, visi-misi, dan tim kami
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Galeri Koleksi - Koleksi */}
              <ScrollFadeIn direction="up" delay={100}>
                <Link href="/koleksi" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="library" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Galeri Koleksi
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Jelajahi 8000+ koleksi buku kami
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Ruang Baca - Baca */}
              <ScrollFadeIn direction="up" delay={200}>
                <Link href="/baca" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="read" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Ruang Baca
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Baca e-book dan dokumen digital
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Ruang Artikel - Artikel */}
              <ScrollFadeIn direction="up" delay={300}>
                <Link href="/artikel" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="document" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Ruang Artikel
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Baca artikel dan esai terkurasi
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Ruang Belajar - Belajar */}
              <ScrollFadeIn direction="up" delay={400}>
                <Link href="/belajar" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="lightbulb" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Ruang Belajar
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Program pendidikan dan pelatihan
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Studio Riset - Penelitian */}
              <ScrollFadeIn direction="up" delay={500}>
                <Link href="/penelitian" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="research" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Studio Riset
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Hasil penelitian dan kajian
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Toko Buku - Penerbitan */}
              <ScrollFadeIn direction="up" delay={600}>
                <Link href="/penerbitan" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="publish" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Toko Buku
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Terbitan dan publikasi kami
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>

              {/* Taman - Kegiatan */}
              <ScrollFadeIn direction="up" delay={700}>
                <Link href="/kegiatan" className="card-group hover-lift group block h-full border-2 border-cream-400 hover:border-teal-700 transition-all duration-200">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <NavIcon icon="calendar" className="w-12 h-12 text-teal-700 group-hover:text-terra-700 transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-teal-900 mb-3 group-hover:text-terra-700 transition-colors">
                    Taman
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    Event, workshop, dan kegiatan
                  </p>
                  <div className="flex items-center gap-2 text-terra-700 text-sm font-serif font-bold group-hover:gap-4 transition-all">
                    <span>Masuk</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA Section - Invitation
          ========================================== */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-teal-700 to-teal-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-terra-700 opacity-10 rounded-full blur-3xl" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cream-soft-white opacity-5 rounded-full blur-3xl" aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-cream-soft-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="mb-6">
            <Image src="/logo.svg" alt="Rumah Aletheia - part of Academos" width={300} height={100} className="mx-auto h-16 lg:h-20 w-auto" />
          </div>
          
          <p className="text-xl text-cream-warm mb-10 leading-relaxed max-w-2xl mx-auto">
            Temukan pengetahuan, jalin diskusi, dan kembangkan wawasan bersama komunitas pembaca dan peneliti kami
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/koleksi"
              className="btn-primary inline-block px-10 py-4 text-lg rounded-lg font-serif"
            >
              Lihat Koleksi
            </Link>
            <Link
              href="/kontak"
              className="btn-secondary inline-block px-10 py-4 text-lg rounded-lg font-serif bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          Location Preview
          ========================================== */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-white to-cream-soft-white/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Address Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4 text-secondary">
                <LocationIcon className="w-6 h-6 text-terra-700" />
                <span className="text-sm uppercase tracking-wider font-serif font-bold">Lokasi</span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-teal-900 mb-6">
                Temukan Kami
              </h3>
              
              <address className="not-italic space-y-4 text-secondary mb-8">
                <p className="text-lg leading-relaxed">
                  {organization.address.street}<br />
                  Desa {organization.address.village}, Kec. {organization.address.district}<br />
                  {organization.address.regency}, {organization.address.province} {organization.address.postalCode}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-terra-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${organization.contact.phone}`} className="font-semibold text-primary hover:text-terra-700 transition-colors">
                    {organization.contact.phone}
                  </a>
                </p>
              </address>

              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 font-serif font-bold text-primary hover:text-terra-700 hover:gap-4 transition-all"
              >
                <span>Lihat Peta & Info Lengkap</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Map Placeholder / Image */}
            <div className="bg-cream-soft-white/50 border border-cream-warm/20 h-96 flex items-center justify-center shadow-inner rounded-lg">
              <div className="text-center text-secondary">
                <svg className="w-16 h-16 mx-auto mb-4 text-teal-700 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm font-medium">Peta interaktif tersedia di halaman Kontak</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
