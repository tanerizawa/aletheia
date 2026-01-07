import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET - List all ebooks with pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [ebooks, total] = await Promise.all([
      prisma.ebook.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.ebook.count({ where }),
    ]);

    return NextResponse.json({
      ebooks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/admin/ebooks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new ebook
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN and EDITOR can create ebooks
    if (session.role === 'VIEWER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.author || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, author, category' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create ebook
    const ebook = await prisma.ebook.create({
      data: {
        title: data.title,
        slug: `${slug}-${Date.now()}`,
        author: data.author,
        publisher: data.publisher || null,
        publishYear: data.publishYear ? parseInt(data.publishYear) : null,
        category: data.category,
        description: data.description || '',
        coverImage: data.coverImage || null,
        format: data.format || ['PDF'],
        pages: data.pages ? parseInt(data.pages) : null,
        language: data.language || 'Indonesia',
        isbn: data.isbn || null,
        fileUrl: data.fileUrl || null,
        fileSize: data.fileSize || null,
        availableOnline: data.availableOnline !== false,
        requiresLogin: data.requiresLogin === true,
        downloadable: data.downloadable !== false,
        tags: data.tags || [],
        addedDate: new Date(),
        rating: data.rating ? parseFloat(data.rating) : null,
      },
    });

    return NextResponse.json({ success: true, ebook }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/ebooks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
