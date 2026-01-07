import { Metadata } from 'next';
import Link from 'next/link';
import { BookIcon } from '@/components/icons';
import EbookCoverImage from '@/components/EbookCoverImage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEbook(slug: string) {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/ebooks/slug/${slug}`, { 
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) {
      console.error(`Failed to fetch ebook ${slug}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.ebook;
  } catch (error) {
    console.error('Failed to fetch ebook:', error);
    return null;
  }
}

async function getRelatedEbooks(category: string, currentId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/ebooks?category=${category}&limit=4`, { 
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.ebooks.filter((e: any) => e.id !== currentId).slice(0, 4);
  } catch (error) {
    console.error('Failed to fetch related ebooks:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ebook = await getEbook(slug);
  
  if (!ebook) {
    return {
      title: 'E-book Tidak Ditemukan - Rumah Aletheia',
    };
  }

  return {
    title: `${ebook.title} - ${ebook.author} | Rumah Aletheia`,
    description: `${ebook.title} oleh ${ebook.author}. ${ebook.description}`,
  };
}

export default async function BacaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ebook = await getEbook(slug);

  if (!ebook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookIcon className="w-32 h-32 mx-auto mb-6 text-cream-soft-white/60" />
          <h1 className="text-4xl font-serif font-bold text-cream-soft-white mb-4">
            E-book Tidak Ditemukan
          </h1>
          <p className="text-xl text-cream-warm/80 mb-8">
            Maaf, e-book yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/baca"
            className="inline-block bg-[#B05E3F] text-white px-8 py-3 rounded-lg hover:bg-[#9A5035] transition-colors"
          >
            ← Kembali ke Perpustakaan Digital
          </Link>
        </div>
      </div>
    );
  }

  const relatedEbooks = await getRelatedEbooks(ebook.category, ebook.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#E8DED0] pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-12 pb-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-[#4A4A4A] hover:text-[#B05E3F] transition-colors">Beranda</Link>
            <span className="text-[#4A4A4A]">/</span>
            <Link href="/baca" className="text-[#4A4A4A] hover:text-[#B05E3F] transition-colors">Perpustakaan Digital</Link>
            <span className="text-[#4A4A4A]">/</span>
            <span className="text-[#1A1A1A] font-semibold">{ebook.category}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#B05E3F] to-[#9A5035] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
                  <EbookCoverImage 
                    src={ebook.coverImage}
                    alt={ebook.title}
                    title={ebook.title}
                  />
                </div>
                
                {/* Action Button - Read Online */}
                <div className="mt-6">
                  <Link
                    href={`/reader/${ebook.slug}`}
                    className="w-full bg-[#B05E3F] text-white py-4 rounded-lg font-semibold hover:bg-[#9A5035] hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Baca Sekarang
                  </Link>
                  <p className="text-cream-warm/80 text-xs mt-2 text-center">
                    📖 Baca online untuk melindungi hak cipta penulis
                  </p>
                </div>

                {/* Book Stats */}
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-cream-soft-white">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{ebook.views.toLocaleString('id-ID')}</div>
                      <div className="text-xs text-cream-warm/70">Views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{ebook.downloads.toLocaleString('id-ID')}</div>
                      <div className="text-xs text-cream-warm/70">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-[#B05E3F] text-white px-4 py-1 rounded-full text-sm font-medium">
                  {ebook.category}
                </span>
              </div>

              {/* Title & Author */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-soft-white mb-4 leading-tight">
                {ebook.title}
              </h1>
              
              <div className="flex items-center gap-3 text-cream-warm/90 mb-6">
                <div className="text-2xl">✍️</div>
                <div>
                  <div className="text-sm text-cream-warm/60">Penulis</div>
                  <div className="text-lg font-semibold">{ebook.author}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(ebook.rating || 0) ? 'text-yellow-400' : 'text-gray-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-cream-soft-white font-semibold text-lg">{ebook.rating?.toFixed(1) || '0.0'}</span>
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                {ebook.publisher && (
                  <div>
                    <div className="text-sm text-cream-warm/60 mb-1">Penerbit</div>
                    <div className="text-cream-soft-white font-semibold">{ebook.publisher}</div>
                  </div>
                )}
                {ebook.publishYear && (
                  <div>
                    <div className="text-sm text-cream-warm/60 mb-1">Tahun Terbit</div>
                    <div className="text-cream-soft-white font-semibold">{ebook.publishYear}</div>
                  </div>
                )}
                {ebook.pages && (
                  <div>
                    <div className="text-sm text-cream-warm/60 mb-1">Jumlah Halaman</div>
                    <div className="text-cream-soft-white font-semibold">{ebook.pages} halaman</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-cream-warm/60 mb-1">Format</div>
                  <div className="text-cream-soft-white font-semibold">{ebook.format.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-cream-warm/60 mb-1">Bahasa</div>
                  <div className="text-cream-soft-white font-semibold">{ebook.language}</div>
                </div>
                {ebook.fileSize && (
                  <div>
                    <div className="text-sm text-cream-warm/60 mb-1">Ukuran File</div>
                    <div className="text-cream-soft-white font-semibold">{ebook.fileSize}</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-serif font-bold text-cream-soft-white mb-4">Deskripsi</h2>
                <p className="text-cream-warm/90 leading-relaxed whitespace-pre-line">
                  {ebook.description}
                </p>
              </div>

              {/* Tags */}
              {ebook.tags && ebook.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-cream-warm/60 mb-3">TAG:</h3>
                  <div className="flex flex-wrap gap-2">
                    {ebook.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-cream-soft-white rounded-full text-sm hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {relatedEbooks.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Buku Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedEbooks.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/baca/${related.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all mb-4">
                    {related.coverImage ? (
                      <img 
                        src={related.coverImage} 
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookIcon className="w-20 h-20 text-white/60" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-[#B05E3F] font-semibold">{related.category}</div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#B05E3F] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-600">{related.author}</p>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-gray-600">{related.rating?.toFixed(1) || '0.0'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            href="/baca"
            className="inline-block bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all"
          >
            ← Kembali ke Perpustakaan Digital
          </Link>
        </div>
      </div>
    </div>
  );
}
