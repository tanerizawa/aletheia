'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import AutoImageSelector from '@/components/AutoImageSelector';

export default function NewEbookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    publisher: '',
    publishYear: '',
    isbn: '',
    pages: '',
    language: 'Indonesia',
    fileSize: '',
    fileUrl: '',
    coverImage: '',
    availableOnline: true,
    downloadable: true,
    requiresLogin: false,
    tags: '',
    format: ['PDF'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Fetch metadata from Google Books API by ISBN
  const fetchISBN = async () => {
    if (!formData.isbn) {
      setError('Masukkan ISBN terlebih dahulu!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.isbn}`);
      const data = await res.json();
      if (!data.items || data.items.length === 0) {
        setError('Data ISBN tidak ditemukan di Google Books.');
        setLoading(false);
        return;
      }
      const book = data.items[0].volumeInfo;
      setFormData(prev => ({
        ...prev,
        title: book.title || prev.title,
        author: (book.authors && book.authors.join(', ')) || prev.author,
        description: book.description || prev.description,
        publisher: book.publisher || prev.publisher,
        publishYear: (book.publishedDate ? book.publishedDate.substring(0,4) : prev.publishYear),
        pages: book.pageCount || prev.pages,
        language: book.language ? book.language : prev.language,
        coverImage: book.imageLinks?.thumbnail?.replace('http://','https://') || prev.coverImage,
      }));
    } catch (error) {
      console.error(error);
      setError('Gagal fetch data ISBN.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormatChange = (format: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      format: checked
        ? [...prev.format, format]
        : prev.format.filter(f => f !== format)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const submitData = {
        ...formData,
        publishYear: formData.publishYear ? parseInt(String(formData.publishYear)) : null,
        pages: formData.pages ? parseInt(String(formData.pages)) : null,
        tags: formData.tags ? String(formData.tags).split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      };

      const response = await fetch('/api/admin/ebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create ebook');

      // Success - redirect to ebooks list
      router.push('/admin/ebooks?success=created');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/ebooks" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New E-book</h1>
              <p className="text-sm text-gray-600">Tambahkan buku digital ke perpustakaan</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Book title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Non-Fiksi">Non-Fiksi</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Filsafat">Filsafat</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Sains">Sains</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Sosial-Humaniora">Sosial-Humaniora</option>
                    <option value="Biografi">Biografi</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Book description"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Publishing Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Publisher name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Year
                  </label>
                  <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="2026"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="978-xxx-xxx-xxx"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fetchISBN()}
                      className="px-3 py-1 bg-[#2C5F5D] text-white rounded hover:bg-[#1A3D3B] disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Mencari...' : 'Fetch ISBN'}
                    </button>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pages
                  </label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Size
                  </label>
                  <input
                    type="text"
                    name="fileSize"
                    value={formData.fileSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="2.5 MB"
                  />
                </div>
              </div>
            </div>

            {/* File & Access */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">File & Access</h2>
              
              <div className="space-y-6">
                {/* Auto Image Generator */}
                <AutoImageSelector
                  title={formData.title}
                  type="book"
                  keywords={formData.author ? [formData.author, formData.category] : [formData.category]}
                  onImageSelect={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                />

                {/* Manual Upload (Alternative) */}
                <div className="relative">
                  <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="px-3 text-xs text-gray-500 bg-white">OR upload manually</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                  </div>
                </div>

                <ImageUpload
                  label="Upload Cover Image"
                  currentImageUrl={formData.coverImage}
                  onImageUploaded={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                  folder="academos/ebooks/covers"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File URL or Path
                  </label>
                  <input
                    type="text"
                    name="fileUrl"
                    value={formData.fileUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="https://... or /reader/book-slug"
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter full URL (https://...) or relative path (/reader/...)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['PDF', 'EPUB', 'MOBI', 'Online'].map(format => (
                      <label key={format} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.format.includes(format)}
                          onChange={(e) => handleFormatChange(format, e.target.checked)}
                          className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]"
                        />
                        <span className="text-sm text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="availableOnline"
                      checked={formData.availableOnline}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]"
                    />
                    <span className="text-sm text-gray-700">Available Online</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="downloadable"
                      checked={formData.downloadable}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]"
                    />
                    <span className="text-sm text-gray-700">Downloadable</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="requiresLogin"
                      checked={formData.requiresLogin}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]"
                    />
                    <span className="text-sm text-gray-700">Requires Login</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                  placeholder="filsafat, sejarah, pemikiran"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link
                href="/admin/ebooks"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#B05E3F] text-white rounded-lg hover:bg-[#9A5035] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create E-book'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
