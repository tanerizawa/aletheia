'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { formatDate } from '@/lib/dateUtils';

interface AdminArticle {
  id: string;
  title?: string;
  excerpt?: string;
  coverImage?: string | null;
  author?: { name?: string } | null;
  category?: string | null;
  published?: boolean;
  views?: number;
  createdAt?: string | Date;
  slug?: string;
  likes?: number;
}

function ArticlesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'created') {
      setSuccessMessage('Article created successfully!');
      setShowSuccess(true);
      router.replace('/admin/articles');
      setTimeout(() => setShowSuccess(false), 5000);
    } else if (success === 'updated') {
      setSuccessMessage('Article updated successfully!');
      setShowSuccess(true);
      router.replace('/admin/articles');
      setTimeout(() => setShowSuccess(false), 5000);
    }

    fetchArticles();
  }, [searchParams, router]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles');
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchArticles();
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete article');
    }
  };

  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.published).length;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-serif font-semibold text-gray-900">Articles Management</h1>
                <p className="text-xs text-gray-600">Kelola konten artikel</p>
              </div>
            </div>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-[#2C5F5D] text-white rounded-lg hover:bg-[#1A3D3B] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs text-gray-600 mb-0.5">Total Articles</div>
            <div className="text-2xl font-serif font-semibold text-gray-900">{totalArticles}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs text-gray-600 mb-0.5">Published</div>
            <div className="text-2xl font-serif font-semibold text-green-600">{publishedArticles}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs text-gray-600 mb-0.5">Total Views</div>
            <div className="text-2xl font-serif font-semibold text-blue-600">{totalViews.toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs text-gray-600 mb-0.5">Total Likes</div>
            <div className="text-2xl font-serif font-semibold text-red-600">{totalLikes.toLocaleString('id-ID')}</div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C5F5D] mx-auto"></div>
                      <p className="mt-2 text-gray-500">Loading articles...</p>
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-gray-500 mb-4">No articles yet</p>
                      <Link
                        href="/admin/articles/new"
                        className="text-[#2C5F5D] hover:text-[#1A3D3B] font-medium"
                      >
                        Create your first article →
                      </Link>
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          {article.coverImage && (
                            <OptimizedImage
                              src={article.coverImage}
                              alt={article.title}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">{article.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{article.author?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{article.category}</td>
                      <td className="px-6 py-4">
                        {article.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{article.views?.toLocaleString('id-ID') || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/artikel/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </a>
                          <Link
                            href={`/admin/articles/edit/${article.id}`}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id, article.title || '')}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminArticlesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ArticlesList />
    </Suspense>
  );
}
