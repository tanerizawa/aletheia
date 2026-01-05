'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageUpload from '@/components/ImageUpload';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [authors, setAuthors] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    authorId: '',
    category: '',
    coverImage: '',
    tags: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    fetchAuthors();
    fetchArticle();
  }, [id]);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/admin/article-authors');
      const data = await response.json();
      setAuthors(data.authors || []);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`);
      if (!response.ok) throw new Error('Failed to fetch article');
      
      const data = await response.json();
      const article = data.article;
      
      setFormData({
        title: article.title || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        authorId: article.authorId || '',
        category: article.category || '',
        coverImage: article.coverImage || '',
        tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
        published: article.published ?? false,
        featured: article.featured ?? false,
      });
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!formData.title || !formData.content || !formData.authorId) {
        throw new Error('Title, content, and author are required');
      }

      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update article');
      }

      router.push('/admin/articles?success=updated');
    } catch (err: any) {
      setError(err.message || 'Failed to update article');
    } finally {
      setSubmitting(false);
    }
  };

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: 'Write your article content in Markdown...',
    status: ['lines', 'words', 'cursor'],
    autosave: {
      enabled: true,
      uniqueId: `edit-article-${id}`,
      delay: 1000,
    },
  }), [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F5D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="authorId"
                    value={formData.authorId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                  >
                    <option value="">Select author</option>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}>
                        {author.name} - {author.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Literasi">Literasi</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Budaya">Budaya</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Penelitian">Penelitian</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Opini">Opini</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
            <div className="prose-editor">
              <SimpleMDE
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                options={mdeOptions}
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h2>
            <ImageUpload
              label="Cover Image"
              currentImageUrl={formData.coverImage}
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
              folder="academos/articles"
            />
          </div>

          {/* Tags & Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags & Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., literasi, pendidikan, budaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#2C5F5D] focus:ring-[#2C5F5D]"
                  />
                  <span className="text-sm text-gray-700">Featured article</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/articles"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-[#2C5F5D] text-white rounded-lg hover:bg-[#1A3D3B] disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {submitting ? 'Updating...' : 'Update Article'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
