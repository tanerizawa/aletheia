'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import AutoImageSelector from '@/components/AutoImageSelector';

export default function EditEbookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isbnLoading, setIsbnLoading] = useState(false);
  const [isbnError, setIsbnError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  interface AdminEbookForm {
    title?: string;
    author?: string;
    category?: string;
    description?: string;
    publisher?: string;
    publishYear?: number;
    isbn?: string;
    pages?: number;
    language?: string;
    fileSize?: string;
    fileUrl?: string;
    coverImage?: string;
    availableOnline?: boolean;
    downloadable?: boolean;
    requiresLogin?: boolean;
    tags?: string | string[];
    format?: string[];
  }
  const [formData, setFormData] = useState<AdminEbookForm>({
    title: '',
    author: '',
    category: '',
    description: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    isbn: '',
    pages: 0,
    language: 'Bahasa Indonesia',
    fileSize: '',
    fileUrl: '',
    coverImage: '',
    availableOnline: true,
    downloadable: true,
    requiresLogin: false,
    tags: '',
    format: ['PDF'] as string[],
  });

  const fetchEbook = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/ebooks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch ebook');
      
      const data = await response.json();
      const ebook = data.ebook as Record<string, unknown> | undefined;

      setFormData({
        title: (ebook?.title as string) || '',
        author: (ebook?.author as string) || '',
        category: (ebook?.category as string) || '',
        description: (ebook?.description as string) || '',
        publisher: (ebook?.publisher as string) || '',
        publishYear: (ebook?.publishYear as number) || new Date().getFullYear(),
        isbn: (ebook?.isbn as string) || '',
        pages: (ebook?.pages as number) || 0,
        language: (ebook?.language as string) || 'Bahasa Indonesia',
        fileSize: (ebook?.fileSize as string) || '',
        fileUrl: (ebook?.fileUrl as string) || '',
        coverImage: (ebook?.coverImage as string) || '',
        availableOnline: (ebook?.availableOnline as boolean) ?? true,
        downloadable: (ebook?.downloadable as boolean) ?? true,
        requiresLogin: (ebook?.requiresLogin as boolean) ?? false,
        tags: Array.isArray(ebook?.tags) ? (ebook?.tags as string[]).join(', ') : '',
        format: Array.isArray(ebook?.format) ? (ebook?.format as string[]) : ['PDF'],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to load ebook');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEbook();
  }, [id, fetchEbook]);

  useEffect(() => {
    // fetch existing categories for suggestions
    async function loadCategories() {
      try {
        const res = await fetch('/api/public/ebooks?limit=200');
        if (!res.ok) return;
        const data = await res.json();
        const items = Array.isArray(data.ebooks) ? data.ebooks : [];
        const cats = Array.from(new Set(items.map((e: unknown) => {
          if (e && typeof e === 'object') return (e as Record<string, unknown>).category as string | undefined;
          return undefined;
        }).filter(Boolean))) as string[];
        setCategories(cats);
      } catch {
        // ignore
      }
    }
    loadCategories();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormatChange = (format: string) => {
    setFormData(prev => ({
      ...prev,
      format: (prev.format || []).includes(format)
        ? (prev.format || []).filter(f => f !== format)
        : [...(prev.format || []), format]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title || !formData.author || !formData.category || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare data
      const submitData = {
        ...formData,
        tags: typeof formData.tags === 'string'
          ? formData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
          : Array.isArray(formData.tags) ? formData.tags : [],
        publishYear: parseInt(String(formData.publishYear)),
        pages: parseInt(String(formData.pages)) || 0,
      };

      const response = await fetch(`/api/admin/ebooks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData && (errorData.error || String(errorData))) || 'Failed to update ebook');
      }

      router.push('/admin/ebooks?success=updated');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to update ebook');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F5D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ebook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/ebooks"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit E-book</h1>
            </div>
          </div>
        </div>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.title) return;
                      setIsbnLoading(true); setIsbnError('');
                      try {
                        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(formData.title)}`);
                        const data = await res.json();
                        if (!data.items || data.items.length === 0) {
                          setIsbnError('Tidak ditemukan berdasarkan judul');
                        } else {
                          const book = data.items[0].volumeInfo;
                          // try to find ISBN identifier
                              const ids = Array.isArray(book.industryIdentifiers) ? book.industryIdentifiers as unknown[] : [];
                              const isbn13Rec = ids.find((i: unknown) => i && typeof i === 'object' && (i as Record<string, unknown>).type === 'ISBN_13') as Record<string, unknown> | undefined;
                              const isbn10Rec = ids.find((i: unknown) => i && typeof i === 'object' && (i as Record<string, unknown>).type === 'ISBN_10') as Record<string, unknown> | undefined;
                              const isbn13 = isbn13Rec?.identifier as string | undefined;
                              const isbn10 = isbn10Rec?.identifier as string | undefined;
                              const foundIsbn = isbn13 || isbn10 || '';
                          if (!foundIsbn) {
                            setIsbnError('ISBN tidak ditemukan pada hasil pertama');
                          }
                          setFormData(prev => ({
                            ...prev,
                            isbn: foundIsbn || prev.isbn,
                            title: book.title || prev.title,
                            author: (book.authors && book.authors.join(', ')) || prev.author,
                             category: (book.categories && book.categories[0]) || prev.category,
                             description: book.description || prev.description,
                             publisher: book.publisher || prev.publisher,
                             publishYear: book.publishedDate ? parseInt(book.publishedDate.substring(0,4)) || prev.publishYear : prev.publishYear,
                             pages: book.pageCount || prev.pages,
                             language: book.language ? book.language : prev.language,
                             coverImage: book.imageLinks?.thumbnail?.replace('http://','https://') || prev.coverImage,
                          }));
                        }
                      } catch {
                        setIsbnError('Gagal mencari berdasarkan judul');
                      } finally {
                        setIsbnLoading(false);
                      }
                    }}
                    className="px-3 py-1 bg-[#2C5F5D] text-white rounded hover:bg-[#1A3D3B] disabled:opacity-50"
                    disabled={isbnLoading}
                  >
                    {isbnLoading ? 'Mencari...' : 'Find ISBN by Title'}
                  </button>
                  {isbnError && <p className="text-sm text-red-600">{isbnError}</p>}
                </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
          {/* Basic Information */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    list="category-list"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="Type or pick a category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                  />
                  <datalist id="category-list">
                    {categories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Publishing Details */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
                <input
                  type="number"
                  name="publishYear"
                  value={formData.publishYear}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.isbn) { setIsbnError('Masukkan ISBN terlebih dahulu'); return; }
                      setIsbnLoading(true); setIsbnError('');
                      try {
                        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.isbn}`);
                        const data = await res.json();
                        if (!data.items || data.items.length === 0) {
                          setIsbnError('Data ISBN tidak ditemukan di Google Books.');
                        } else {
                          const book = data.items[0].volumeInfo;
                          setFormData(prev => ({
                            ...prev,
                            title: book.title || prev.title,
                            author: (book.authors && book.authors.join(', ')) || prev.author,
                            description: book.description || prev.description,
                            publisher: book.publisher || prev.publisher,
                            publishYear: book.publishedDate ? parseInt(book.publishedDate.substring(0,4)) || prev.publishYear : prev.publishYear,
                            pages: book.pageCount || prev.pages,
                            language: book.language ? book.language : prev.language,
                            coverImage: book.imageLinks?.thumbnail?.replace('http://','https://') || prev.coverImage,
                          }));
                        }
                      } catch {
                        setIsbnError('Gagal fetch data ISBN.');
                      } finally {
                        setIsbnLoading(false);
                      }
                    }}
                    className="px-3 py-1 bg-[#B05E3F] text-white rounded hover:bg-[#9A5035] disabled:opacity-50"
                    disabled={isbnLoading}
                  >
                    {isbnLoading ? 'Memeriksa...' : 'Fetch ISBN'}
                  </button>
                  {isbnError && <p className="text-sm text-red-600">{isbnError}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                >
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="English">English</option>
                  <option value="Sundanese">Sundanese</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                <input
                  type="text"
                  name="fileSize"
                  value={formData.fileSize}
                  onChange={handleChange}
                  placeholder="e.g., 2.5 MB"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* File & Access */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">File & Access</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File URL or Path</label>
                <input
                  type="text"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleChange}
                  placeholder="https://... or /reader/book-slug"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Enter full URL (https://...) or relative path (/reader/...)</p>
              </div>

              {/* Auto-Generate Cover Image */}
              <AutoImageSelector
                title={formData.title}
                type="book"
                keywords={[formData.category, formData.author].filter(Boolean) as string[]}
                onImageSelect={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
              />

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-xs text-gray-500 bg-white">OR upload manually</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                </div>
              </div>

              <ImageUpload
                label="Cover Image"
                currentImageUrl={formData.coverImage}
                onImageUploaded={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                folder="academos/ebooks/covers"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="flex flex-wrap gap-4">
                  {['PDF', 'EPUB', 'MOBI', 'AZW3'].map(format => (
                    <label key={format} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(formData.format || []).includes(format)}
                        onChange={() => handleFormatChange(format)}
                        className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                      />
                      <span className="text-sm text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="availableOnline"
                    checked={formData.availableOnline}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                  />
                  <span className="text-sm text-gray-700">Available for online reading</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="downloadable"
                    checked={formData.downloadable}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                  />
                  <span className="text-sm text-gray-700">Downloadable</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="requiresLogin"
                    checked={formData.requiresLogin}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                  />
                  <span className="text-sm text-gray-700">Requires login to access</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="p-6">
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
                placeholder="e.g., fiction, romance, bestseller"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <Link
              href="/admin/ebooks"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-[#2C5F5D] text-white rounded-lg hover:bg-[#1A3D3B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {submitting ? 'Updating...' : 'Update E-book'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
