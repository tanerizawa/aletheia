'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AdminUser } from '@/lib/auth';

interface AdminHeaderProps {
  user: AdminUser;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'chart' },
    { href: '/admin/ebooks', label: 'E-books', icon: 'book' },
    { href: '/admin/articles', label: 'Articles', icon: 'document' },
    { href: '/admin/events', label: 'Events', icon: 'calendar' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'chart':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>;
      case 'book':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>;
      case 'document':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
      case 'calendar':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
      default:
        return null;
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-[#2C5F5D] to-[#1F4E4C] border-b border-[#1A3D3B] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left: Logo & Breadcrumbs */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="Rumah Aletheia - Admin Panel" width={120} height={40} className="h-8 w-auto" />
            </Link>

            {/* Breadcrumb - Simple and clean */}
            {pathname !== '/admin' && (
              <nav className="hidden lg:flex items-center gap-2 text-sm">
                {pathname.split('/').filter(Boolean).map((segment, index, arr) => {
                  const href = '/' + arr.slice(0, index + 1).join('/');
                  const isLast = index === arr.length - 1;
                  const label = segment.charAt(0).toUpperCase() + segment.slice(1);
                  
                  return (
                    <div key={segment} className="flex items-center gap-2">
                      {index > 0 && <span className="text-[#5A9692]">/</span>}
                      {isLast ? (
                        <span className="text-cream-soft-white font-medium">{label}</span>
                      ) : (
                        <Link href={href} className="text-[#D4E5E4] hover:text-[#B05E3F] transition-colors">
                          {label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-4">
            {/* Quick Action - Neuroscience: Fitts's Law (large target) */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-cream-warm hover:text-white hover:bg-[#1A3D3B] rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
              </svg>
              <span>View Site</span>
            </Link>

            {/* User Info - Neuroscience: Recognition over recall */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#3A7A77]">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[#D4E5E4] capitalize">{user.role}</p>
              </div>
              
              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-[#C24B4B] text-cream-soft-white rounded-lg hover:bg-[#A33939] transition-colors text-sm font-medium"
                  title="Logout"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <svg className="sm:hidden w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414V14h10V7.414zM4 6h10.586L10 10.586 4 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation - Neuroscience: Serial Position Effect */}
        <div className="border-t border-[#3A7A77] bg-[#1A3D3B]">
          <nav className="flex items-center gap-1 px-6 py-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${active 
                      ? 'bg-[#B05E3F] text-cream-soft-white shadow-sm' 
                      : 'text-cream-warm hover:bg-[#2C5F5D] hover:text-white hover:shadow-sm'
                    }
                  `}
                >
                  {getIcon(item.icon)}
                  <span>{item.label}</span>
                  {/* Active Indicator - Neuroscience: Von Restorff Effect */}
                  {active && <span className="w-1.5 h-1.5 bg-cream-soft-white rounded-full ml-1"></span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
