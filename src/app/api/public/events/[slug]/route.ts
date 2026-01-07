import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET /api/public/events/[slug] - Get single event by slug
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        photos: {
          orderBy: { takenDate: 'desc' },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found', event: null },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });
  } catch (error: unknown) {
    console.error('Public event fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event', event: null },
      { status: 500 }
    );
  }
}
