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

    // Create session in database
    const sessionToken = generateSessionId();
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000); // 7 days
    
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      },
    });
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: true, // Always use secure since we're behind NGINX with SSL
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    console.log('✅ Session created in DB:', { token: sessionToken.substring(0, 10) + '...', username: user.email });
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Terjadi kesalahan saat login' };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (sessionToken) {
    // Delete session from database
    await prisma.session.delete({
      where: { token: sessionToken },
    }).catch(() => {
      // Ignore error if session doesn't exist
    });
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!sessionToken) {
    console.log('🔍 No session cookie found');
    return null;
  }
  
  try {
    // Find session in database
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });
    
    if (!session) {
      console.log('🔍 Session not found in DB');
      return null;
    }
    
    // Check if expired
    if (session.expiresAt < new Date()) {
      console.log('🔍 Session expired');
      await prisma.session.delete({ where: { id: session.id } });
      return null;
    }
    
    console.log('✅ Session found:', { username: session.user.email, role: session.user.role });
    
    return {
      id: session.user.id,
      username: session.user.email,
      role: session.user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    };
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
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
