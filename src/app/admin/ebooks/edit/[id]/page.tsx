'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function EditEbookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchEbook();
  }, [id]);

  const fetchEbook = async () => {
    try {
      const response = await fetch(`/api/admin/ebooks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch ebook');
      
      const data = await response.json();
      const ebook = data.ebook;
      
      setFormData({
        title: ebook.title || '',
        author: ebook.author || '',
        category: ebook.category || '',
        description: ebook.description || '',
        publisher: ebook.publisher || '',
        publishYear: ebook.publishYear || new Date().getFullYear(),
        isbn: ebook.isbn || '',
        pages: ebook.pages || 0,
        language: ebook.language || 'Bahasa Indonesia',
        fileSize: ebook.fileSize || '',
        fileUrl: ebook.fileUrl || '',
        coverImage: ebook.coverImage || '',
        availableOnline: ebook.availableOnline ?? true,
        downloadable: ebook.downloadable ?? true,
        requiresLogin: ebook.requiresLogin ?? false,
        tags: Array.isArray(ebook.tags) ? ebook.tags.join(', ') : '',
        format: Array.isArray(ebook.format) ? ebook.format : ['PDF'],
      });
    } catch (err) {
      setError('Failed to load ebook');
    } finally {
      setLoading(false);
    }
  };

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
      format: prev.format.includes(format)
        ? prev.format.filter(f => f !== format)
        : [...prev.format, format]
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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        publishYear: parseInt(formData.publishYear.toString()),
        pages: parseInt(formData.pages.toString()) || 0,
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
        throw new Error(errorData.error || 'Failed to update ebook');
      }

      router.push('/admin/ebooks?success=updated');
    } catch (err: any) {
      setError(err.message || 'Failed to update ebook');
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
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Non-Fiksi">Non-Fiksi</option>
                    <option value="Sains">Sains</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Filsafat">Filsafat</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Teknologi">Teknologi</option>
                  </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                <input
                  type="url"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
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
                        checked={formData.format.includes(format)}
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
