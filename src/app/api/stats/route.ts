import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { organization } from '@/data/organization';

// GET /api/stats - simple public stats endpoint
export async function GET(request: NextRequest) {
  try {
    const [
      totalArticles,
      publishedArticles,
      totalEbooks,
      totalEvents,
      upcomingEvents,
      completedEvents,
    ] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.ebook.count(),
      prisma.event.count(),
      prisma.event.count({ where: { status: 'UPCOMING' } }),
      prisma.event.count({ where: { status: 'COMPLETED' } }),
    ]);

    const articlesStats = await prisma.article.aggregate({ _sum: { views: true, likes: true } });
    const ebooksStats = await prisma.ebook.aggregate({ _sum: { views: true, downloads: true } });

    return NextResponse.json({
      articles: {
        total: totalArticles,
        published: publishedArticles,
        totalViews: articlesStats._sum.views || 0,
        totalLikes: articlesStats._sum.likes || 0,
      },
      ebooks: {
        total: totalEbooks,
        totalViews: ebooksStats._sum.views || 0,
        totalDownloads: ebooksStats._sum.downloads || 0,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
        completed: completedEvents,
      },
      organization: {
        established: organization?.established || null,
      },
    });
  } catch (error: any) {
    console.error('Stats /api/stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
