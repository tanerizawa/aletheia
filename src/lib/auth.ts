// Authentication library with database integration
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  username: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
}

// Session cookie name
const SESSION_COOKIE = 'admin-session';

// In-memory session store (replace with Redis in production)
const sessions = new Map<string, AdminUser>();

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      return { success: false, error: 'Username atau password salah' };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, error: 'Username atau password salah' };
    }

    // Create session
    const sessionId = generateSessionId();
    const sessionUser: AdminUser = {
      id: user.id,
      username: user.email,
      role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    };
    
    sessions.set(sessionId, sessionUser);
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Terjadi kesalahan saat login' };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (sessionId) {
    sessions.delete(sessionId);
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!sessionId) {
    return null;
  }
  
  return sessions.get(sessionId) || null;
}

export async function requireAuth(): Promise<AdminUser> {
  const user = await getSession();
  
  if (!user) {
    redirect('/admin/login');
  }
  
  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getSession();
  return user !== null;
}
