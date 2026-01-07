import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { limit } = await request.json();
    // If limit is not provided, fetch all
    const findArgs: Prisma.EbookFindManyArgs = {
      where: {
        OR: [
          { fileUrl: { startsWith: 'http://' } },
          { fileUrl: { startsWith: 'https://' } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        fileUrl: true
      }
    };
    if (limit && typeof limit === 'number' && limit > 0) {
      findArgs.take = limit;
    }
    const ebooks = await prisma.ebook.findMany(findArgs);
    
    const results = {
      total: ebooks.length,
      downloaded: 0,
      failed: [] as string[],
      updated: [] as string[],
      details: [] as { title: string; status: string; size?: string }[]
    };
    
    // Create public/ebooks directory if not exists
    const ebooksDir = path.join(process.cwd(), 'public', 'ebooks');
    if (!existsSync(ebooksDir)) {
      await mkdir(ebooksDir, { recursive: true });
    }
    
    console.log(`[PDF Download] Starting download for ${ebooks.length} ebooks`);
    
    for (const ebook of ebooks) {
      try {
        if (!ebook.fileUrl) continue;
        
        console.log(`[PDF Download] Downloading: ${ebook.title}`);
        
        // Download PDF
        const response = await fetch(ebook.fileUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });
        
        if (!response.ok) {
          const error = `HTTP ${response.status}`;
          results.failed.push(`${ebook.title}: ${error}`);
          results.details.push({ title: ebook.title, status: `❌ ${error}` });
          console.error(`[PDF Download] Failed ${ebook.title}: ${error}`);
          continue;
        }
        
        const buffer = Buffer.from(await response.arrayBuffer());
        
        // Save file with safe filename
        const fileName = `${ebook.slug}.pdf`;
        const filePath = path.join(ebooksDir, fileName);
        
        await writeFile(filePath, buffer);
        
        // Calculate file size
        const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
        
        // Update database with new local path
        await prisma.ebook.update({
          where: { id: ebook.id },
          data: {
            fileUrl: `/ebooks/${fileName}`,
            fileSize: `${fileSizeMB} MB`
          }
        });
        
        results.downloaded++;
        results.updated.push(ebook.title);
        results.details.push({ 
          title: ebook.title, 
          status: '✓ Downloaded', 
          size: `${fileSizeMB} MB` 
        });
        console.log(`[PDF Download] Success ${ebook.title}: ${fileSizeMB} MB`);
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        results.failed.push(`${ebook.title}: ${errorMsg}`);
        results.details.push({ title: ebook.title, status: `❌ ${errorMsg}` });
        console.error(`[PDF Download] Error ${ebook.title}:`, error);
      }
    }
    
    return NextResponse.json({
      success: true,
      results
    });
    
  } catch (error) {
    console.error('Download PDF error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to download PDFs' },
      { status: 500 }
    );
  }
}
