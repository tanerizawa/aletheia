import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/admin/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (published !== null && published !== undefined) {
      where.published = published === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error('Articles fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST /api/admin/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN and EDITOR can create
    if (session.role === 'VIEWER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      content,
      authorId,
      category,
      excerpt,
      coverImage,
      tags,
      published,
      featured,
    } = body;

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug exists
    const existing = await prisma.article.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${randomUUID().replace(/-/g, '').slice(0,8)}` : slug;

    const article = await prisma.article.create({
      data: {
        title,
        slug: finalSlug,
        content,
        authorId,
        category: category || 'Uncategorized',
        excerpt: excerpt || content.substring(0, 160),
        coverImage: coverImage || '',
        tags: tags || [],
        published: published ?? false,
        featured: featured ?? false,
        readTime: Math.ceil(content.split(' ').length / 200), // Estimate reading time
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: unknown) {
    console.error('Article creation error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
