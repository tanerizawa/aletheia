'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EbooksList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success message
    const success = searchParams.get('success');
    if (success === 'created') {
      setSuccessMessage('E-book created successfully!');
      setShowSuccess(true);
      router.replace('/admin/ebooks');
      setTimeout(() => setShowSuccess(false), 5000);
    } else if (success === 'updated') {
      setSuccessMessage('E-book updated successfully!');
      setShowSuccess(true);
      router.replace('/admin/ebooks');
      setTimeout(() => setShowSuccess(false), 5000);
    }

    // Fetch ebooks
    fetchEbooks();
  }, [searchParams, router]);

  const fetchEbooks = async () => {
    try {
      const response = await fetch('/api/admin/ebooks');
      const data = await response.json();
      setEbooks(data.ebooks || []);
    } catch (error) {
      console.error('Failed to fetch ebooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/ebooks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh list
        fetchEbooks();
      } else {
        alert('Failed to delete ebook');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  // Calculate stats
  const totalEbooks = ebooks.length;
  const totalViews = ebooks.reduce((sum, book) => sum + (book.views || 0), 0);
  const totalDownloads = ebooks.reduce((sum, book) => sum + (book.downloads || 0), 0);
  const avgRating = ebooks.length > 0
    ? ebooks.reduce((sum, book) => sum + (book.rating || 0), 0) / ebooks.filter(b => b.rating).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">E-books Management</h1>
                <p className="text-sm text-gray-600">Kelola perpustakaan digital</p>
              </div>
            </div>
            <Link
              href="/admin/ebooks/new"
              className="px-4 py-2 bg-[#B05E3F] text-white rounded-lg hover:bg-[#9A5035] transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New E-book
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">E-book created successfully!</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total E-books</div>
            <div className="text-3xl font-bold text-gray-900">{totalEbooks}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Views</div>
            <div className="text-3xl font-bold text-gray-900">
              {totalViews.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Downloads</div>
            <div className="text-3xl font-bold text-gray-900">
              {totalDownloads.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Avg Rating</div>
            <div className="text-3xl font-bold text-gray-900">
              {avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
            </div>
          </div>
        </div>

        {/* E-books Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : ebooks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium">No e-books yet</p>
                        <Link
                          href="/admin/ebooks/new"
                          className="text-[#B05E3F] hover:underline text-sm"
                        >
                          Add your first e-book →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ebooks.map((ebook) => (
                    <tr key={ebook.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl">
                            {ebook.coverImage ? (
                              <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover rounded" />
                            ) : (
                              '📚'
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{ebook.title}</div>
                            <div className="text-sm text-gray-500">{ebook.format?.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{ebook.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{ebook.author}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium text-gray-900">
                            {ebook.rating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{ebook.views?.toLocaleString('id-ID') || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/baca/${ebook.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </a>
                          <Link
                            href={`/admin/ebooks/edit/${ebook.id}`}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(ebook.id, ebook.title)}
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

export default function AdminEbooksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EbooksList />
    </Suspense>
  );
}
