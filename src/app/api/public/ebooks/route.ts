import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/public/ebooks - Get ebooks (public access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'recent'; // recent, popular, rating

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

    // Determine order by
    let orderBy: any = { addedDate: 'desc' }; // default: recent
    if (sort === 'popular') {
      orderBy = { views: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'downloads') {
      orderBy = { downloads: 'desc' };
    }

    let ebooks;
    let total;

    if (featured === 'true') {
      // Get top rated ebooks for featured
      ebooks = await prisma.ebook.findMany({
        where: { rating: { gte: 4.5 } },
        take: limit,
        orderBy: { rating: 'desc' },
      });
      total = await prisma.ebook.count({ where: { rating: { gte: 4.5 } } });
    } else {
      [ebooks, total] = await Promise.all([
        prisma.ebook.findMany({
          where,
          skip,
          take: limit,
          orderBy,
        }),
        prisma.ebook.count({ where }),
      ]);
    }

    return NextResponse.json({
      ebooks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Public ebooks fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ebooks', ebooks: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } },
      { status: 500 }
    );
  }
}
