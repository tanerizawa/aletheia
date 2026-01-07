import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const stats = await prisma.ebook.groupBy({
      by: ['availableOnline'],
      _count: true,
    });
    
    const total = await prisma.ebook.count();
    
    const result = {
      total,
      stats: stats.map(s => ({
        availableOnline: s.availableOnline,
        count: s._count,
        percentage: ((s._count / total) * 100).toFixed(1) + '%'
      })),
      summary: {
        online: stats.find(s => s.availableOnline)?._count || 0,
        offline: stats.find(s => !s.availableOnline)?._count || 0,
      }
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Check availability error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check availability' },
      { status: 500 }
    );
  }
}
