import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/admin/article-authors - List all authors
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authors = await prisma.articleAuthor.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    return NextResponse.json({ authors });
  } catch (error: unknown) {
    console.error('Authors fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 });
  }
}

// POST /api/admin/article-authors - Create new author
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN can create authors
    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, role, avatar } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const author = await prisma.articleAuthor.create({
      data: {
        name,
        role: role || 'Contributor',
        avatar: avatar || '',
      },
    });

    return NextResponse.json({ success: true, author }, { status: 201 });
  } catch (error: unknown) {
    console.error('Author creation error:', error);
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 });
  }
}
