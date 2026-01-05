import { requireAuth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function handleLogout() {
  'use server';
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/admin/logout`, {
    method: 'POST',
  });
  if (response.ok) {
    redirect('/admin/login');
  }
}

export default async function AdminDashboard() {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-4xl">📚</Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Rumah Aletheia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-[#2C5F5D] to-[#1F4E4C] rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h2>
          <p className="text-[#E8DED0]/90">
            Kelola konten website Rumah Aletheia dari dashboard ini.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📚</div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
            <p className="text-sm text-gray-600">E-books</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📝</div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-sm text-gray-600">Articles</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📅</div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
            <p className="text-sm text-gray-600">Events</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🖼️</div>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">PENDING</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm text-gray-600">Images</p>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* E-books Management */}
          <Link
            href="/admin/ebooks"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📚</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">E-books</h3>
            <p className="text-sm text-gray-600 mb-4">
              Kelola perpustakaan digital, tambah/edit/hapus buku elektronik
            </p>
            <div className="text-xs text-gray-500">5 items</div>
          </Link>

          {/* Articles Management */}
          <Link
            href="/admin/articles"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📝</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Articles</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tulis dan publikasikan artikel, kelola kategori dan tags
            </p>
            <div className="text-xs text-gray-500">3 items</div>
          </Link>

          {/* Events Management */}
          <Link
            href="/admin/events"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📅</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Events</h3>
            <p className="text-sm text-gray-600 mb-4">
              Atur kegiatan, workshop, seminar, dan dokumentasi foto
            </p>
            <div className="text-xs text-gray-500">5 items</div>
          </Link>

          {/* Images Management */}
          <Link
            href="/admin/images"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🖼️</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Images</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload dan kelola gambar untuk cover buku, artikel, dan events
            </p>
            <div className="text-xs text-yellow-600">Upload required</div>
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">⚙️</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600 mb-4">
              Pengaturan website, user management, dan konfigurasi
            </p>
            <div className="text-xs text-gray-500">System config</div>
          </Link>

          {/* Coming Soon Pages */}
          <Link
            href="/admin/pages"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-[#B05E3F] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📄</div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#B05E3F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pages</h3>
            <p className="text-sm text-gray-600 mb-4">
              Kelola konten halaman: Belajar, Penelitian, Penerbitan, Tim, Sejarah
            </p>
            <div className="text-xs text-yellow-600">5 pages pending</div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/ebooks/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#B05E3F] hover:bg-[#F5F1E8] transition-all"
            >
              <span className="text-2xl">➕</span>
              <span className="text-sm font-medium text-gray-700">Add E-book</span>
            </Link>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#B05E3F] hover:bg-[#F5F1E8] transition-all"
            >
              <span className="text-2xl">✍️</span>
              <span className="text-sm font-medium text-gray-700">Write Article</span>
            </Link>
            <Link
              href="/admin/events/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#B05E3F] hover:bg-[#F5F1E8] transition-all"
            >
              <span className="text-2xl">🎫</span>
              <span className="text-sm font-medium text-gray-700">Create Event</span>
            </Link>
            <Link
              href="/admin/images"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#B05E3F] hover:bg-[#F5F1E8] transition-all"
            >
              <span className="text-2xl">📤</span>
              <span className="text-sm font-medium text-gray-700">Upload Image</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Admin Panel v1.0 - Rumah Aletheia</p>
          <p className="mt-1">
            <Link href="/" className="text-[#B05E3F] hover:underline">
              View Website
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
