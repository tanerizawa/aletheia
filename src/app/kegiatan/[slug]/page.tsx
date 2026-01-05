'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getEventBySlug, getUpcomingEvents } from '@/data/events';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function KegiatanDetailPage({ params }: PageProps) {
  const [event, setEvent] = useState<ReturnType<typeof getEventBySlug> | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<ReturnType<typeof getUpcomingEvents>>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Load data on client
  useState(() => {
    params.then(({ slug }) => {
      const eventData = getEventBySlug(slug);
      setEvent(eventData);
      if (eventData) {
        setUpcomingEvents(getUpcomingEvents(3).filter(e => e.id !== eventData.id));
      }
    });
  });

  const openLightbox = (photo: string) => {
    setSelectedPhoto(photo);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-6">📅</div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F1E8] mb-4">
            Kegiatan Tidak Ditemukan
          </h1>
          <p className="text-xl text-[#E8DED0]/80 mb-8">
            Maaf, kegiatan yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/kegiatan"
            className="inline-block bg-[#B05E3F] text-white px-8 py-3 rounded-lg hover:bg-[#9A5035] transition-colors"
          >
            ← Kembali ke Daftar Kegiatan
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = new Date(event.startDate) > new Date();
  const isPast = new Date(event.startDate) < new Date();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#E8DED0] pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-12 pb-16 mb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[#E8DED0]/60 mb-6">
              <Link href="/" className="hover:text-[#F5F1E8] transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/kegiatan" className="hover:text-[#F5F1E8] transition-colors">Kegiatan</Link>
              <span>/</span>
              <span className="text-[#F5F1E8]">{event.type}</span>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                isUpcoming ? 'bg-green-500 text-white' : 
                isPast ? 'bg-gray-500 text-white' : 
                'bg-[#B05E3F] text-white'
              }`}>
                {isUpcoming ? '🔔 Akan Datang' : isPast ? '✅ Selesai' : '🎯 Sedang Berlangsung'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F1E8] mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 text-[#E8DED0]/90">
                <div className="text-3xl">📅</div>
                <div>
                  <div className="text-sm text-[#E8DED0]/60">Tanggal</div>
                  <div className="font-semibold">{event.startDate}{event.endDate ? ` - ${event.endDate}` : ''}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[#E8DED0]/90">
                <div className="text-3xl">⏰</div>
                <div>
                  <div className="text-sm text-[#E8DED0]/60">Waktu</div>
                  <div className="font-semibold">{event.time}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[#E8DED0]/90">
                <div className="text-3xl">📍</div>
                <div>
                  <div className="text-sm text-[#E8DED0]/60">Lokasi</div>
                  <div className="font-semibold">{event.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Tentang Kegiatan</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Event Type & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 p-6 bg-[#F5F1E8] rounded-xl">
              <div>
                <div className="text-sm text-gray-600 mb-1">Jenis Kegiatan</div>
                <div className="text-lg font-semibold text-gray-900">{event.type}</div>
              </div>
              {event.maxParticipants && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Kapasitas</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {event.registeredParticipants || 0} / {event.maxParticipants} peserta
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#B05E3F] h-full transition-all"
                      style={{ width: `${((event.registeredParticipants || 0) / event.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Registration Button */}
            {isUpcoming && event.maxParticipants && (event.registeredParticipants || 0) < event.maxParticipants && (
              <div className="mb-10">
                <button className="w-full md:w-auto px-8 py-4 bg-[#B05E3F] text-white text-lg font-semibold rounded-lg hover:bg-[#9A5035] hover:shadow-xl transition-all">
                  📝 Daftar Sekarang
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Tersisa {event.maxParticipants - (event.registeredParticipants || 0)} tempat lagi!
                </p>
              </div>
            )}

            {/* Organizer Info */}
            {event.organizer && (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">👥</div>
                  <div>
                    <div className="text-sm text-gray-600">Penyelenggara</div>
                    <div className="text-lg font-semibold text-gray-900">{event.organizer}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {event.photos && event.photos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                📸 Dokumentasi Foto {isPast ? '' : '(Preview)'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => openLightbox(photo.caption)}
                    className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                    <span className="text-xs text-[#F5F1E8]/80 group-hover:text-[#F5F1E8] transition-colors line-clamp-2">{photo.caption}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Kegiatan Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((upcoming) => (
                  <Link
                    key={upcoming.id}
                    href={`/kegiatan/${upcoming.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {upcoming.coverImage || '📅'}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#B05E3F] font-semibold mb-2">{upcoming.type}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#B05E3F] transition-colors">
                        {upcoming.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <span>📅</span>
                        <span>{upcoming.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📍</span>
                        <span className="line-clamp-1">{upcoming.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center">
            <Link
              href="/kegiatan"
              className="inline-block bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all"
            >
              ← Kembali ke Daftar Kegiatan
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#B05E3F] transition-colors"
            onClick={closeLightbox}
          >
            ×
          </button>
          <div className="max-w-4xl w-full text-center">
            <div className="mb-6 text-9xl">📷</div>
            <p className="text-white text-xl">{selectedPhoto}</p>
          </div>
          <div className="absolute bottom-8 text-white text-center">
            <p className="text-sm opacity-75">Klik di mana saja untuk menutup</p>
          </div>
        </div>
      )}
    </>
  );
}
