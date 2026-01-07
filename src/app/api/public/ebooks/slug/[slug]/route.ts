import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    const ebook = await prisma.ebook.findUnique({
      where: { slug },
    });

    if (!ebook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    // Increment views
    await prisma.ebook.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ ebook });
  } catch (error) {
    console.error('Failed to fetch ebook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
