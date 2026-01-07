import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const total = await prisma.ebook.count({
      where: { category: 'KESUSASTRAAN' }
    });
    
    const withFileUrl = await prisma.ebook.count({
      where: { 
        category: 'KESUSASTRAAN',
        fileUrl: { not: null }
      }
    });
    
    const withCover = await prisma.ebook.count({
      where: { 
        category: 'KESUSASTRAAN',
        coverImage: { not: null }
      }
    });
    
    const externalUrls = await prisma.ebook.count({
      where: { 
        category: 'KESUSASTRAAN',
        fileUrl: { contains: 'http://103.44.149.34' }
      }
    });
    
    const externalCovers = await prisma.ebook.count({
      where: { 
        category: 'KESUSASTRAAN',
        coverImage: { contains: 'http://103.44.149.34' }
      }
    });
    
    const samples = await prisma.ebook.findMany({
      where: { category: 'KESUSASTRAAN' },
      select: { 
        id: true,
        title: true, 
        fileUrl: true, 
        coverImage: true,
        slug: true
      },
      take: 10
    });
    
    return NextResponse.json({
      stats: {
        total,
        hasFileUrl: withFileUrl,
        hasCoverImage: withCover,
        externalPdfUrls: externalUrls,
        externalCoverUrls: externalCovers,
        missingCover: total - withCover,
        missingFileUrl: total - withFileUrl
      },
      samples
    });
    
  } catch (error) {
    console.error('Check ebooks error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check ebooks' },
      { status: 500 }
    );
  }
}
