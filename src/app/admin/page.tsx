import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  // Require authentication - will redirect to /admin/login if not authenticated
  await requireAuth();
  // Fetch dashboard counts and recent activity
  const [ebooksCount, articlesCount, eventsUpcomingCount, subscribersCount, unreadMessagesCount] = await Promise.all([
    prisma.ebook.count(),
    prisma.article.count(),
    prisma.event.count({ where: { status: 'UPCOMING' } }),
    prisma.newsletterSubscriber.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const [recentArticle] = await prisma.article.findMany({ orderBy: { createdAt: 'desc' }, take: 1, select: { title: true, createdAt: true } });
  const [recentEbook] = await prisma.ebook.findMany({ orderBy: { createdAt: 'desc' }, take: 1, select: { title: true, createdAt: true } });
  const [recentEvent] = await prisma.event.findMany({ orderBy: { createdAt: 'desc' }, take: 1, select: { title: true, startDate: true, createdAt: true } });
  
  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        
        {/* PRIMARY ACTION - Compact & Elegant */}
        <div className="mb-6">
          <Link
            href="/admin/articles/new"
            className="group relative block bg-gradient-to-br from-[#B05E3F] to-[#944A2F] hover:from-[#944A2F] hover:to-[#7A3D26] rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#E8E3DB]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E8E3DB]/20 rounded-lg group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7 text-[#E8E3DB]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-serif font-semibold text-[#E8E3DB] mb-0.5">Write New Article</h3>
                  <p className="text-sm text-[#D4A574]/90">Share knowledge with your community</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#E8E3DB]/90 bg-[#E8E3DB]/20 px-3 py-1.5 rounded-md">
                  Most Used
                </span>
                <svg className="w-5 h-5 text-[#FAF8F5] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* SECONDARY ACTIONS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link
            href="/admin/ebooks/new"
            className="group bg-[#FAF8F5] hover:bg-[#D4E5E4] rounded-lg p-4 shadow-sm hover:shadow-md border border-[#D4A574]/50 hover:border-[#2C5F5D] transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#D4E5E4] rounded-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-[#2C5F5D]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-serif font-semibold text-[#2A2A2A] mb-0.5">Add E-book</h4>
                <p className="text-xs text-[#6A6A6A]">Digital library collection</p>
              </div>
              <svg className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#2C5F5D] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/events/new"
            className="group bg-[#FAF8F5] hover:bg-[#FBF1ED] rounded-lg p-4 shadow-sm hover:shadow-md border border-[#D4A574]/50 hover:border-[#B05E3F] transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#F5DDD3] rounded-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-[#B05E3F]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-serif font-semibold text-[#2A2A2A] mb-0.5">Create Event</h4>
                <p className="text-xs text-[#6A6A6A]">Workshops & seminars</p>
              </div>
              <svg className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#B05E3F] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* MIGRATION TOOL */}
        <div className="mb-6">
          <Link
            href="/admin/migrate"
            className="group relative block bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-serif font-semibold text-white mb-0.5">Migrate Ebooks</h3>
                  <p className="text-sm text-white/90">Import ebook dari sistem lama (168 buku)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90 bg-white/20 px-3 py-1.5 rounded-md">
                  Tool
                </span>
                <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* CONTENT OVERVIEW */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          
          <Link href="/admin/ebooks" className="group bg-[#FAF8F5] rounded-lg p-4 shadow-sm hover:shadow-md border border-[#D4A574]/50 hover:border-[#2C5F5D] transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-[#EAF4F3] rounded-lg">
                <svg className="w-6 h-6 text-[#2C5F5D]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#2C5F5D] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h4 className="text-sm font-serif font-semibold text-[#2A2A2A] mb-1">E-books</h4>
            <p className="text-xs text-[#6A6A6A] mb-2">Digital library</p>
            <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#4A8B5C] rounded-full"></span>
                {ebooksCount} items
              </span>
            </div>
          </Link>

          <Link href="/admin/articles" className="group bg-[#FAF8F5] rounded-lg p-4 shadow-sm hover:shadow-md border border-[#D4A574]/50 hover:border-[#B05E3F] transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-[#FBF1ED] rounded-lg">
                <svg className="w-6 h-6 text-[#B05E3F]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#B05E3F] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h4 className="text-sm font-serif font-semibold text-[#2A2A2A] mb-1">Articles</h4>
            <p className="text-xs text-[#6A6A6A] mb-2">Blog posts</p>
            <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#4A8B5C] rounded-full"></span>
                {articlesCount} published
              </span>
            </div>
          </Link>

          <Link href="/admin/events" className="group bg-[#FAF8F5] rounded-lg p-4 shadow-sm hover:shadow-md border border-[#D4A574]/50 hover:border-[#3A7A77] transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-[#D4E5E4] rounded-lg">
                <svg className="w-6 h-6 text-[#3A7A77]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#3A7A77] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h4 className="text-sm font-serif font-semibold text-[#2A2A2A] mb-1">Events</h4>
            <p className="text-xs text-[#6A6A6A] mb-2">Activities</p>
            <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#4A8B5C] rounded-full"></span>
                {eventsUpcomingCount} upcoming
              </span>
            </div>
          </Link>
        </div>

        {/* COMMUNICATION MANAGEMENT */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/admin/messages" className="group bg-gradient-to-br from-[#3A7A77] to-[#2C5F5D] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h4 className="text-sm font-serif font-semibold text-white mb-1">Contact Messages</h4>
            <p className="text-xs text-white/80 mb-2">Visitor messages</p>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                {unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : 'No new'}
              </span>
            </div>
          </Link>

          <Link href="/admin/newsletters" className="group bg-gradient-to-br from-[#B05E3F] to-[#944A2F] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h4 className="text-sm font-serif font-semibold text-white mb-1">Newsletter Subscribers</h4>
            <p className="text-xs text-white/80 mb-2">Mailing list</p>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                {subscribersCount} subscribers
              </span>
            </div>
          </Link>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-[#FAF8F5] rounded-lg shadow-sm p-4 border border-[#D4A574]/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-serif font-semibold text-[#2A2A2A]">Recent Activity</h3>
            <span className="text-xs text-[#6A6A6A] bg-[#F0EBE3] px-2.5 py-1 rounded-full">Last 7 days</span>
          </div>
          
          <div className="space-y-3">
            {/* Activity Item 1 */}
            <div className="flex items-start gap-3 pb-3 border-b border-[#F0EBE3] last:border-0">
              <div className="p-1.5 bg-[#D4E5E4] rounded-lg">
                <svg className="w-5 h-5 text-[#4A8B5C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2A2A2A]">{recentArticle ? `Published: ${recentArticle.title}` : 'No recent articles'}</p>
                <p className="text-xs text-[#8A8A8A] mt-0.5">{recentArticle ? new Date(recentArticle.createdAt).toLocaleString() : ''}</p>
              </div>
              <span className="text-xs font-medium text-[#2C5F5D] bg-[#D4E5E4] px-2 py-0.5 rounded">Success</span>
            </div>

            {/* Activity Item 2 */}
            <div className="flex items-start gap-3 pb-3 border-b border-[#F0EBE3] last:border-0">
              <div className="p-1.5 bg-[#EAF4F3] rounded-lg">
                <svg className="w-5 h-5 text-[#2C5F5D]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#2A2A2A]">{recentEbook ? `Added: ${recentEbook.title}` : 'No recent e-books'}</p>
                <p className="text-xs text-[#8A8A8A] mt-0.5">{recentEbook ? new Date(recentEbook.createdAt).toLocaleString() : ''}</p>
              </div>
              <span className="text-xs font-medium text-[#2C5F5D] bg-[#EAF4F3] px-2 py-0.5 rounded">Created</span>
            </div>

            {/* Activity Item 3 */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-[#F5DDD3] rounded-lg">
                <svg className="w-5 h-5 text-[#B05E3F]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#2A2A2A]">{recentEvent ? `Event: ${recentEvent.title}` : 'No recent events'}</p>
                <p className="text-xs text-[#8A8A8A] mt-0.5">{recentEvent ? (recentEvent.startDate ? new Date(recentEvent.startDate).toLocaleString() : new Date(recentEvent.createdAt).toLocaleString()) : ''}</p>
              </div>
              <span className="text-xs font-medium text-[#B05E3F] bg-[#F5DDD3] px-2 py-0.5 rounded">Scheduled</span>
            </div>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="bg-gradient-to-r from-[#1A3D3B] to-[#2C5F5D] rounded-lg p-4">
          <div className="flex items-center justify-between text-[#E8E3DB]">
            <div>
              <h4 className="text-xs font-medium text-[#D4A574] mb-0.5">System Status</h4>
              <p className="text-sm font-serif font-semibold">All Systems Operational</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-[#D4E5E4] mb-0.5">Database</p>
                <p className="text-sm font-semibold flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#4A8B5C] rounded-full animate-pulse"></span>
                  Active
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#D4E5E4] mb-0.5">Uptime</p>
                <p className="text-sm font-serif font-semibold">100%</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
