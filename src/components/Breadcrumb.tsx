'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Skip breadcrumb for homepage and admin routes
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Beranda', href: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-cream-soft-white border-b border-cream-warm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            
            return (
              <li key={item.href} className="flex items-center">
                {idx > 0 && (
                  <svg 
                    className="w-4 h-4 mx-2 text-[#B05E3F]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                
                {isLast ? (
                  <span className="text-[#1A1A1A] font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-[#4A4A4A] hover:text-[#B05E3F] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
