import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/public/ebooks/[id] - Get single ebook by ID
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const ebook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!ebook) {
      return NextResponse.json(
        { error: 'Ebook not found', ebook: null },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.ebook.update({
      where: { id: ebook.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ ebook });
  } catch (error: unknown) {
    console.error('Public ebook fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ebook', ebook: null },
      { status: 500 }
    );
  }
}
