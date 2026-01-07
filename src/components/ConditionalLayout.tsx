'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current route is admin or reader (fullscreen)
  const isAdminRoute = pathname.startsWith('/admin');
  const isReaderRoute = pathname.startsWith('/reader');
  
  // Admin routes & Reader: No public header/footer
  if (isAdminRoute || isReaderRoute) {
    return <>{children}</>;
  }
  
  // Public routes: Show header and footer
  return (
    <>
      <Header />
      <Breadcrumb />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
