'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarIcon, BellIcon, CheckCircleIcon, TargetIcon, ClockIcon, LocationIcon, DocumentIcon, UsersIcon, CameraIcon } from '@/components/icons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  try {
    const res = await fetch(`/api/public/events/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.event;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
}

async function getUpcomingEvents() {
  try {
    const res = await fetch(`/api/public/events?status=upcoming&limit=3`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.events;
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error);
    return [];
  }
}

export default function KegiatanDetailPage({ params }: PageProps) {
  const [event, setEvent] = useState<any | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(async ({ slug }) => {
      const eventData = await getEvent(slug);
      setEvent(eventData);
      
      if (eventData) {
        const upcoming = await getUpcomingEvents();
        setUpcomingEvents(upcoming.filter((e: any) => e.id !== eventData.id));
      }
      
      setLoading(false);
    });
  }, [params]);

  const openLightbox = (photo: string) => {
    setSelectedPhoto(photo);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cream-100">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CalendarIcon className="w-32 h-32 mx-auto mb-6 text-cream-50/60" />
          <h1 className="text-4xl font-serif font-bold text-cream-50 mb-4">
            Kegiatan Tidak Ditemukan
          </h1>
          <p className="text-xl text-cream-100/80 mb-8">
            Maaf, kegiatan yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/kegiatan"
            className="btn-primary inline-block px-8 py-3 rounded-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-cream-100 to-cream-200 pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 pt-12 pb-16 mb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-cream-200 hover:text-terra-400 transition-colors">Beranda</Link>
              <span className="text-cream-200">/</span>
              <Link href="/kegiatan" className="text-cream-200 hover:text-terra-400 transition-colors">Kegiatan</Link>
              <span className="text-cream-200">/</span>
              <span className="text-cream-50 font-semibold">{event.type}</span>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium ${
                isUpcoming ? 'bg-green-600 text-white' :
                isPast ? 'bg-cream-600 text-white' :
                'bg-terra-700 text-white'
              }`}>
                {isUpcoming ? <><BellIcon className="w-4 h-4" /> Akan Datang</> : isPast ? <><CheckCircleIcon className="w-4 h-4" /> Selesai</> : <><TargetIcon className="w-4 h-4" /> Sedang Berlangsung</>}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-50 mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 text-cream-100">
                <CalendarIcon className="w-8 h-8" />
                <div>
                  <div className="text-sm text-cream-200">Tanggal</div>
                  <div className="font-semibold">{event.startDate}{event.endDate ? ` - ${event.endDate}` : ''}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-cream-100">
                <ClockIcon className="w-8 h-8" />
                <div>
                  <div className="text-sm text-cream-200">Waktu</div>
                  <div className="font-semibold">{event.time}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-cream-100">
                <LocationIcon className="w-8 h-8" />
                <div>
                  <div className="text-sm text-cream-200">Lokasi</div>
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
              <h2 className="text-2xl font-serif font-bold text-teal-900 mb-4">Tentang Kegiatan</h2>
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Event Type & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 p-6 bg-cream-50 rounded-xl">
              <div>
                <div className="text-sm text-secondary mb-1">Jenis Kegiatan</div>
                <div className="text-lg font-semibold text-primary">{event.type}</div>
              </div>
              {event.maxParticipants && (
                <div>
                  <div className="text-sm text-secondary mb-1">Kapasitas</div>
                  <div className="text-lg font-semibold text-primary">
                    {event.registeredParticipants || 0} / {event.maxParticipants} peserta
                  </div>
                  <div className="mt-2 bg-cream-300 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-terra-700 h-full transition-all"
                      style={{ width: `${((event.registeredParticipants || 0) / event.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Registration Button */}
            {isUpcoming && event.maxParticipants && (event.registeredParticipants || 0) < event.maxParticipants && (
              <div className="mb-10">
                <button className="btn-primary w-full md:w-auto px-8 py-4 text-lg rounded-lg flex items-center gap-2 justify-center">
                  <DocumentIcon className="w-5 h-5" /> Daftar Sekarang
                </button>
                <p className="text-sm text-tertiary mt-3">
                  Tersisa {event.maxParticipants - (event.registeredParticipants || 0)} tempat lagi!
                </p>
              </div>
            )}

            {/* Organizer Info */}
            {event.organizer && (
              <div className="pt-8 border-t border-cream-400">
                <div className="flex items-center gap-3">
                  <UsersIcon className="w-10 h-10 text-teal-700" />
                  <div>
                    <div className="text-sm text-secondary">Penyelenggara</div>
                    <div className="text-lg font-semibold text-primary">{event.organizer}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {event.photos && event.photos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-8 flex items-center gap-3">
                <CameraIcon className="w-8 h-8 text-terra-700" /> Dokumentasi Foto {isPast ? '' : '(Preview)'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.photos.map((photo: any) => (
                  <button
                    key={photo.id}
                    onClick={() => openLightbox(photo.caption)}
                    className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal-700 to-teal-900 flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    <CameraIcon className="w-12 h-12 mb-2 text-white/80 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-cream-100/80 group-hover:text-cream-50 transition-colors line-clamp-2">{photo.caption}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-8">Kegiatan Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((upcoming: any) => (
                  <Link
                    key={upcoming.id}
                    href={`/kegiatan/${upcoming.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {upcoming.coverImage || <CalendarIcon className="w-24 h-24 text-white/80" />}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-terra-700 font-semibold mb-2">{upcoming.type}</div>
                      <h3 className="text-lg font-semibold text-teal-900 mb-2 line-clamp-2 group-hover:text-terra-700 transition-colors">
                        {upcoming.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-secondary mb-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{upcoming.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <LocationIcon className="w-4 h-4" />
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
              className="btn-secondary inline-block px-8 py-3 rounded-lg"
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
            className="absolute top-4 right-4 text-white text-4xl hover:text-terra-400 transition-colors"
            onClick={closeLightbox}
          >
            ×
          </button>
          <div className="max-w-4xl w-full text-center">
            <CameraIcon className="w-36 h-36 mx-auto mb-6 text-white/80" />
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
