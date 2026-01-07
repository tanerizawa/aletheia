import { getSession } from '@/lib/auth';
import AdminHeader from '@/components/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session without forcing redirect
  const user = await getSession();
  
  // If no user session, just render children (login page will handle it)
  if (!user) {
    return <>{children}</>;
  }

  // If authenticated, render with admin header
  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <AdminHeader user={user} />
      {children}
    </div>
  );
}
