import { requireAuth } from '@/lib/auth';
import Link from 'next/link';

export default async function NewEbookPage() {
  await requireAuth();

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Publisher
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="Publisher name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Publish Year
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="2024"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="978-xxx-xxx-xxx-x"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pages
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="English">English</option>
                    <option value="Bilingual">Bilingual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    File Size
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                    placeholder="e.g., 2.5 MB"
                  />
                </div>
              </div>
            </div>

            {/* File & Access */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">File & Access</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B05E3F] transition-colors cursor-pointer">
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]" defaultChecked />
                      <span className="text-sm font-medium text-gray-700">Available Online</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]" defaultChecked />
                      <span className="text-sm font-medium text-gray-700">Downloadable</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#B05E3F] border-gray-300 rounded focus:ring-[#B05E3F]" />
                      <span className="text-sm font-medium text-gray-700">Requires Login</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., novel, fiksi, sastra)"
              />
              <p className="text-sm text-gray-500 mt-2">Tags membantu pengguna menemukan buku ini</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link
                href="/admin/ebooks"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                onClick={() => alert('Save as draft functionality coming soon!')}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#B05E3F] text-white rounded-lg hover:bg-[#9A5035] transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Publish functionality will be implemented with database integration!');
                }}
              >
                Publish
              </button>
            </div>
          </form>

          {/* Info Note */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Note</h4>
                <p className="text-sm text-blue-800">
                  Form ini saat ini hanya untuk demo UI. Untuk menyimpan data ke database, perlu implementasi backend dengan Prisma/MongoDB.
                  Data saat ini masih hardcoded di <code className="bg-blue-100 px-1 rounded">/src/data/ebooks.ts</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
