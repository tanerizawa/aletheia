"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin',
      });

      // Force a full navigation so the server-side session state is re-evaluated
      // and `AdminLayout` will render without the header immediately.
      window.location.assign('/admin/login');
    } catch (err) {
      // best-effort: redirect to login even if network failed
      window.location.assign('/admin/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-[#C24B4B] text-cream-soft-white rounded-lg hover:bg-[#A33939] transition-colors text-sm font-medium"
      title="Logout"
      aria-disabled={loading}
    >
      <span className="hidden sm:inline">{loading ? 'Logging out...' : 'Logout'}</span>
      <svg className="sm:hidden w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414V14h10V7.414zM4 6h10.586L10 10.586 4 6z" clipRule="evenodd" />
      </svg>
    </button>
  );
}
