import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET /api/public/articles/[slug] - Get single article by slug
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const article = await prisma.article.findUnique({
      where: {
        slug,
        published: true, // Only published articles
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

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found', article: null },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ article });
  } catch (error: unknown) {
    console.error('Public article fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article', article: null },
      { status: 500 }
    );
  }
}
