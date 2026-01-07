import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReaderWrapper from '@/components/ReaderWrapper';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ebook = await getEbook(slug);

  if (!ebook) {
    return {
      title: 'Ebook Not Found',
    };
  }

  return {
    title: `${ebook.title} - Reader | Rumah Aletheia`,
    description: ebook.description || `Read ${ebook.title} by ${ebook.author} online`,
    openGraph: {
      title: `${ebook.title} - Reader`,
      description: ebook.description || `Read ${ebook.title} by ${ebook.author}`,
      images: ebook.coverImage ? [ebook.coverImage] : [],
    },
  };
}

export default async function ReaderPage({ params }: PageProps) {
  const { slug } = await params;
  const ebook = await getEbook(slug);

  if (!ebook) {
    notFound();
  }

  if (!ebook.availableOnline) {
    return (
      <div className="min-h-screen bg-cream-soft-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-terra-700 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-teal-900 mb-4">
            Buku Tidak Tersedia Online
          </h1>
            <p className="text-gray-600 mb-6">
            Buku &quot;{ebook.title}&quot; saat ini tidak tersedia untuk dibaca secara online.
          </p>
          <a
            href={`/baca/${slug}`}
            className="inline-block bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors"
          >
            Kembali ke Detail Buku
          </a>
        </div>
      </div>
    );
  }

  // Construct PDF URL from fileUrl or slug
  const pdfUrl = ebook.fileUrl || `/ebooks/${slug}.pdf`;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <ReaderWrapper url={pdfUrl} title={ebook.title} />
    </div>
  );
}
