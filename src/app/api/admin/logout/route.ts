import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await logout();

    // If the request expects JSON (AJAX/fetch), return JSON success
    const accept = request.headers.get('accept') || '';
    if (accept.includes('application/json')) {
      return NextResponse.json({ success: true });
    }

    // Otherwise redirect to the login page using a relative path (avoids proxy/origin issues)
    return NextResponse.redirect('/admin/login');
  } catch (error) {
    console.error('Logout error:', error instanceof Error ? error.stack : error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function GET() {
  // When user opens the logout URL in browser (GET), just redirect to login page
  return NextResponse.redirect('/admin/login');
}
