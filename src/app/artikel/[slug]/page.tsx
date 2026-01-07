import { Metadata } from 'next';
import Link from 'next/link';
import { DocumentIcon, UsersIcon } from '@/components/icons';
import { formatDate } from '@/lib/dateUtils';

interface Article {
  id?: string;
  slug: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  publishedDate?: string;
  readTime?: number;
  views?: number;
  likes?: number;
  coverImage?: string;
  author?: { name?: string; role?: string };
  tags?: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.article as Article | null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

async function getRelatedArticles(category: string, currentSlug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3001');
    const res = await fetch(`${baseUrl}/api/public/articles?category=${category}&limit=3`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a.slug !== currentSlug).slice(0, 3) as Article[];
  } catch (error) {
    console.error('Failed to fetch related articles:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Rumah Aletheia',
    };
  }

  return {
    title: `${article.title} - Artikel Rumah Aletheia`,
    description: article.excerpt,
  };
}

function MarkdownContent({ content }: { content?: string }) {
  // Simple markdown renderer (paragraphs, headings, lists, bold, italic, links)
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="my-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: processInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const processInline = (text: string) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#B05E3F] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      
      if (!trimmed) {
        flushList();
        return;
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${key++}`} className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${key++}`} className="text-2xl font-bold mt-10 mb-5 text-gray-900 dark:text-white">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={`h1-${key++}`} className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
            {trimmed.substring(2)}
          </h1>
        );
      }
      // List items
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listItems.push(trimmed.substring(2));
      }
      // Paragraphs
      else {
        flushList();
        elements.push(
          <p
            key={`p-${key++}`}
            className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processInline(trimmed) }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  return <div className="prose max-w-none">{renderMarkdown(content || '')}</div>;
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DocumentIcon className="w-32 h-32 mx-auto mb-6 text-cream-soft-white/60" />
          <h1 className="text-4xl font-serif font-bold text-cream-soft-white mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-xl text-cream-warm/80 mb-8">
            Maaf, artikel yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/artikel"
            className="inline-block bg-[#B05E3F] text-white px-8 py-3 rounded-lg hover:bg-[#9A5035] transition-colors"
          >
            ← Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = await getRelatedArticles(article.category ?? '', article.slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#E8DED0] pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2C5F5D] via-[#1F4E4C] to-[#1A3D3B] pt-12 pb-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-[#4A4A4A] hover:text-[#B05E3F] transition-colors">Beranda</Link>
            <span className="text-[#4A4A4A]">/</span>
            <Link href="/artikel" className="text-[#4A4A4A] hover:text-[#B05E3F] transition-colors">Artikel</Link>
            <span className="text-[#4A4A4A]">/</span>
            <span className="text-[#1A1A1A] font-semibold">{article.category}</span>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-[#B05E3F] text-white px-4 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-soft-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-cream-warm/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(article.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{(article.views ?? 0).toLocaleString('id-ID')} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Image */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-video bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] flex items-center justify-center">
                <div className="text-9xl">{article.coverImage}</div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-xl text-gray-700 leading-relaxed mb-8 font-serif italic border-l-4 border-[#B05E3F] pl-6">
            {article.excerpt}
          </div>

          <MarkdownContent content={article.content} />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">TAG:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cream-soft-white text-gray-700 rounded-full text-sm hover:bg-cream-warm transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2C5F5D] to-[#B05E3F] flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.author?.name || ''}</h3>
                <p className="text-gray-600">
                  {article.author?.role || 'Kontributor'} - Kontributor aktif di Rumah Aletheia, passionate tentang {article.category?.toLowerCase() || ''} dan pengembangan masyarakat.
                </p>
              </div>
            </div>
          </div>

          {/* Like & Share Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#B05E3F] text-white rounded-lg hover:bg-[#9A5035] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span>{(article.likes ?? 0).toLocaleString('id-ID')}</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: Article) => (
                <Link
                  key={related.id}
                  href={`/artikel/${related.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {related.coverImage}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#B05E3F] font-semibold mb-2">{related.category}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#B05E3F] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span>{related.readTime}</span>
                      <span>•</span>
                      <span>{(related.views ?? 0).toLocaleString('id-ID')} views</span>
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
            href="/artikel"
            className="inline-block bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all"
          >
            ← Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    </div>
  );
}
