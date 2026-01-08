import React from 'react';
import StatsShowcase from './StatsShowcase';
import { prisma } from '@/lib/prisma';
import { organization } from '@/data/organization';

export default async function StatsShowcaseServer() {
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

    const data = {
      articles: { total: totalArticles, published: publishedArticles },
      ebooks: { total: totalEbooks },
      events: { total: totalEvents, upcoming: upcomingEvents, completed: completedEvents },
      organization: { established: organization?.established || null },
    };

    // Render client component with initial data
    // @ts-ignore - passing plain JS object to client component
    return <StatsShowcase initialData={data} />;
  } catch (e) {
    console.error('StatsShowcaseServer error:', e);
    // Fallback to client-only component without initialData
    // @ts-ignore
    return <StatsShowcase />;
  }
}
