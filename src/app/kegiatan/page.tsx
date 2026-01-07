import type { Metadata } from "next";
import Link from "next/link";
import { TargetIcon, CalendarIcon, SparklesIcon, BookIcon, UsersIcon, ChatIcon, CameraIcon } from "@/components/icons";
import { formatDate } from '@/lib/dateUtils';
interface EventItem {
  id?: string;
  slug: string;
  type?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  location?: string;
  status?: string;
  photos?: { id?: string }[];
  maxParticipants?: number;
  registeredParticipants?: number;
}

export const metadata: Metadata = {
  title: "Kegiatan - Program & Event Rumah Aletheia",
  description: "Ikuti berbagai kegiatan, workshop, seminar, dan event menarik di Rumah Aletheia. Lihat foto dokumentasi kegiatan yang telah berlangsung.",
  keywords: ["kegiatan", "event", "workshop", "seminar", "diskusi", "pelatihan", "perpustakaan"],
};

async function getEvents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/events?limit=100`, { next: { revalidate: 60 } });
    if (!res.ok) return { events: [] };
    const data = await res.json();
    return { events: (data.events || []) as EventItem[] };
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return { events: [] };
  }
}

export default async function KegiatanPage() {
  const { events } = await getEvents();
  
  const upcomingEvents = events.filter((e: EventItem) => e.status === 'UPCOMING').slice(0, 3);
  const ongoingEvents = events.filter((e: EventItem) => e.status === 'ONGOING');
  const completedEvents = events.filter((e: EventItem) => e.status === 'COMPLETED').slice(0, 6);

  return (
    <main className="flex-grow bg-cream-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-cream-warm">
            <TargetIcon className="w-8 h-8" />
            <span className="text-sm uppercase tracking-wider font-serif">Taman Kegiatan</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-cream-soft-white mb-6">
            Program & Kegiatan
          </h1>
          
          <p className="text-xl text-cream-warm max-w-3xl leading-relaxed">
            Bergabunglah dalam beragam kegiatan edukatif — dari workshop kreatif, diskusi literasi, bedah buku, 
            hingga pelatihan keterampilan. Tempat berkumpul, belajar, dan tumbuh bersama komunitas
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-cream-warm">
              <CalendarIcon className="w-6 h-6" />
              <div>
                <span className="font-bold text-lg">{upcomingEvents.length}</span>
                <span className="ml-1">Event Mendatang</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-cream-warm">
              <SparklesIcon className="w-6 h-6" />
              <div>
                <span className="font-bold text-lg">{ongoingEvents.length}</span>
                <span className="ml-1">Sedang Berlangsung</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-cream-warm">
              <CalendarIcon className="w-6 h-6" />
              <div>
                <span className="font-bold text-lg">{completedEvents.length}+</span>
                <span className="ml-1">Dokumentasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1F4E4C] mb-4">
              Jenis Program Kami
            </h2>
            <p className="text-[#5A5A5A] leading-relaxed">
              Setiap program dirancang dengan pendekatan partisipatif dan interaktif untuk memaksimalkan 
              pembelajaran dan pengalaman peserta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#B05E3F]/5 to-[#B05E3F]/10 border-2 border-[#B05E3F]/20 p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all group">
              <BookIcon className="w-12 h-12 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Workshop</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Pelatihan praktis menulis, desain, fotografi, dan keterampilan lainnya
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-6 hover:border-[#2C5F5D] hover:shadow-lg transition-all group">
              <ChatIcon className="w-12 h-12 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Diskusi</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Bedah buku, talkshow, dan forum dialog dengan praktisi dan akademisi
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#B05E3F]/5 to-[#B05E3F]/10 border-2 border-[#B05E3F]/20 p-6 hover:border-[#B05E3F] hover:shadow-lg transition-all group">
              <UsersIcon className="w-12 h-12 text-[#B05E3F] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Seminar</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Presentasi dan pembelajaran mendalam tentang topik spesifik
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#2C5F5D]/5 to-[#2C5F5D]/10 border-2 border-[#2C5F5D]/20 p-6 hover:border-[#2C5F5D] hover:shadow-lg transition-all group">
              <SparklesIcon className="w-12 h-12 text-[#2C5F5D] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2">Komunitas</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Klub baca, story telling anak, dan kegiatan komunitas reguler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10 flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-[#B05E3F]" />
              Event Mendatang
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event: EventItem) => (
                <Link
                  key={event.slug}
                  href={`/kegiatan/${event.slug}`}
                  className="group bg-cream-soft-white border-2 border-cream-beige hover:border-[#B05E3F] hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#B05E3F] text-white text-xs font-bold uppercase tracking-wider">
                        {event.type}
                      </span>
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase">
                        Upcoming
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#B05E3F] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Date & Time */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDate(event.startDate, 'id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time} WIB</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Registration Info */}
                    {event.maxParticipants && event.registeredParticipants !== undefined && (
                      <div className="pt-4 border-t border-cream-beige">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Kuota: {event.registeredParticipants}/{event.maxParticipants}
                          </span>
                          <span className="text-green-600 font-bold">Pendaftaran Dibuka</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10 flex items-center gap-3">
              <SparklesIcon className="w-8 h-8 text-[#B05E3F]" />
              Sedang Berlangsung
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ongoingEvents.map((event: EventItem) => (
                <Link
                  key={event.slug}
                  href={`/kegiatan/${event.slug}`}
                  className="group bg-white border-2 border-cream-beige hover:border-[#2C5F5D] hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Featured Photo */}
                  {event.photos && event.photos.length > 0 && (
                    <div className="h-56 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center">
                      <div className="text-center text-white">
                        <CameraIcon className="w-24 h-24 mb-2 mx-auto" />
                        <p className="text-sm">{event.photos.length} Foto Dokumentasi</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#2C5F5D]/10 text-[#2C5F5D] text-xs font-bold uppercase">
                        {event.type}
                      </span>
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase animate-pulse">
                        Sedang Berlangsung
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1F4E4C] mb-3 group-hover:text-[#2C5F5D] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 mb-4">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {formatDate(event.startDate, 'id-ID', { day: 'numeric', month: 'long' })}{event.endDate ? ` - ${formatDate(event.endDate, 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed Events with Photo Galleries */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10 flex items-center gap-3">
            <BookIcon className="w-8 h-8 text-[#B05E3F]" /> Dokumentasi Kegiatan
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {completedEvents.map((event: EventItem) => (
              <Link
                key={event.slug}
                href={`/kegiatan/${event.slug}`}
                className="group bg-cream-soft-white border-2 border-cream-beige hover:border-[#B05E3F] hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  {event.photos && event.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-1 h-40 mb-4">
                      {event.photos.slice(0, 4).map((photo, index) => (
                        <div
                          key={photo?.id ?? index}
                          className="bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center"
                        >
                          <span className="text-white">
                            {index === 0 && <BookIcon className="w-6 h-6" />}
                            {index === 1 && <UsersIcon className="w-6 h-6" />}
                            {index === 2 && <ChatIcon className="w-6 h-6" />}
                            {index === 3 && <SparklesIcon className="w-6 h-6" />}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-gray-500/10 text-gray-600 text-xs font-bold uppercase">
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(event.startDate, 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-3 border-t border-cream-beige">
                    <span className="flex items-center gap-1">
                      <CameraIcon className="w-4 h-4" /> {event.photos?.length || 0} Foto
                    </span>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" /> {event.registeredParticipants ?? 0} Peserta
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Lihat dokumentasi kegiatan lainnya</p>
            <Link
              href="/kegiatan/arsip"
              className="inline-block px-8 py-3 border-2 border-[#2C5F5D] text-[#2C5F5D] font-bold hover:bg-[#2C5F5D] hover:text-white transition-all"
            >
              Arsip Lengkap Kegiatan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream-soft-white mb-6">
            Ingin Berpartisipasi?
          </h2>
          <p className="text-xl text-cream-warm mb-8">
            Daftarkan diri Anda untuk mengikuti kegiatan mendatang atau usulkan kegiatan baru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="inline-block bg-[#B05E3F] text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-transparent text-cream-soft-white px-10 py-4 font-serif font-bold text-lg hover:bg-white/10 transition-all border-2 border-cream-soft-white"
            >
              Usulkan Kegiatan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
