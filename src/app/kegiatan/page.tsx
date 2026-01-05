import type { Metadata } from "next";
import Link from "next/link";
import { events, getUpcomingEvents, getEventsByStatus } from "@/data/events";

export const metadata: Metadata = {
  title: "Kegiatan - Program & Event Rumah Aletheia",
  description: "Ikuti berbagai kegiatan, workshop, seminar, dan event menarik di Rumah Aletheia. Lihat foto dokumentasi kegiatan yang telah berlangsung.",
  keywords: ["kegiatan", "event", "workshop", "seminar", "diskusi", "pelatihan", "perpustakaan"],
};

export default function KegiatanPage() {
  const upcomingEvents = getUpcomingEvents(3);
  const ongoingEvents = getEventsByStatus("ongoing");
  const completedEvents = getEventsByStatus("completed").slice(0, 6);

  return (
    <main className="flex-grow bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F4E4C] to-[#2C5F5D] py-16 border-b-4 border-[#B05E3F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-[#E8DED0]">
            <span className="text-3xl">🎯</span>
            <span className="text-sm uppercase tracking-wider font-serif">Taman Kegiatan</span>
          </div>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#F5F1E8] mb-6">
            Program & Kegiatan
          </h1>
          
          <p className="text-xl text-[#E8DED0] max-w-3xl leading-relaxed">
            Berbagai kegiatan edukatif, workshop, seminar, dan diskusi untuk meningkatkan literasi dan pengetahuan
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-[#E8DED0]">
              <span className="text-2xl">📅</span>
              <div>
                <span className="font-bold text-lg">{upcomingEvents.length}</span>
                <span className="ml-1">Event Mendatang</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#E8DED0]">
              <span className="text-2xl">✨</span>
              <div>
                <span className="font-bold text-lg">{ongoingEvents.length}</span>
                <span className="ml-1">Sedang Berlangsung</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#E8DED0]">
              <span className="text-2xl">📸</span>
              <div>
                <span className="font-bold text-lg">{completedEvents.length}+</span>
                <span className="ml-1">Dokumentasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10">
              📅 Event Mendatang
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/kegiatan/${event.slug}`}
                  className="group bg-[#F5F1E8] border-2 border-[#D4C4B0] hover:border-[#B05E3F] hover:shadow-xl transition-all"
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

                    <p className="text-[#5A5A5A] mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Date & Time */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {new Date(event.startDate).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time} WIB</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                        <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Registration Info */}
                    {event.maxParticipants && event.registeredParticipants !== undefined && (
                      <div className="pt-4 border-t border-[#D4C4B0]">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#7A7A7A]">
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
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10">
              ✨ Sedang Berlangsung
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ongoingEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/kegiatan/${event.slug}`}
                  className="group bg-white border-2 border-[#D4C4B0] hover:border-[#2C5F5D] hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Featured Photo */}
                  {event.photos && event.photos.length > 0 && (
                    <div className="h-56 bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center">
                      <div className="text-center text-white">
                        <span className="text-6xl mb-2 block">📸</span>
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

                    <p className="text-[#5A5A5A] mb-4">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                      <svg className="w-4 h-4 text-[#B05E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(event.startDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long'
                        })}{event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}`}
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
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1F4E4C] mb-10">
            📸 Dokumentasi Kegiatan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/kegiatan/${event.slug}`}
                className="group bg-[#F5F1E8] border-2 border-[#D4C4B0] hover:border-[#B05E3F] hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Photo Grid Preview */}
                {event.photos && event.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-1 h-48">
                    {event.photos.slice(0, 4).map((photo, index) => (
                      <div
                        key={photo.id}
                        className="bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center group-hover:scale-105 transition-transform"
                      >
                        <span className="text-3xl">
                          {index === 0 && "📖"}
                          {index === 1 && "👥"}
                          {index === 2 && "💬"}
                          {index === 3 && "✨"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-gray-500/10 text-gray-600 text-xs font-bold uppercase">
                      {event.type}
                    </span>
                    <span className="text-xs text-[#7A7A7A]">
                      {new Date(event.startDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1F4E4C] mb-2 group-hover:text-[#B05E3F] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-[#5A5A5A] line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#7A7A7A] pt-3 border-t border-[#D4C4B0]">
                    <span className="flex items-center gap-1">
                      <span>📸</span> {event.photos?.length || 0} Foto
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👥</span> {event.registeredParticipants} Peserta
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#7A7A7A] mb-4">Lihat dokumentasi kegiatan lainnya</p>
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
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#F5F1E8] mb-6">
            Ingin Berpartisipasi?
          </h2>
          <p className="text-xl text-[#E8DED0] mb-8">
            Daftarkan diri Anda untuk mengikuti kegiatan mendatang atau usulkan kegiatan baru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="inline-block bg-[#B05E3F] text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F]"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-transparent text-[#F5F1E8] px-10 py-4 font-serif font-bold text-lg hover:bg-white/10 transition-all border-2 border-[#F5F1E8]"
            >
              Usulkan Kegiatan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
