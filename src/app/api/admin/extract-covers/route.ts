import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { limit = 10 } = await request.json();
    
    // Get ebooks with external cover images (any http/https URL)
    const ebooks = await prisma.ebook.findMany({
      where: {
        OR: [
          { coverImage: null },
          { coverImage: { startsWith: 'http://' } },
          { coverImage: { startsWith: 'https://' } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        fileUrl: true,
        coverImage: true
      },
      take: limit
    });
    
    const results = {
      total: ebooks.length,
      extracted: 0,
      failed: [] as string[],
      updated: [] as string[],
      details: [] as { title: string; status: string }[]
    };
    
    // Create public/covers directory if not exists
    const coversDir = path.join(process.cwd(), 'public', 'covers');
    if (!existsSync(coversDir)) {
      await mkdir(coversDir, { recursive: true });
    }
    
    console.log(`[Cover Extract] Starting for ${ebooks.length} ebooks`);
    
    for (const ebook of ebooks) {
      try {
        // Skip if no cover to download
        if (!ebook.coverImage || !ebook.coverImage.startsWith('http')) {
          console.log(`[Cover Extract] Skipping ${ebook.title}: No external cover`);
          continue;
        }
        
        console.log(`[Cover Extract] Downloading cover for: ${ebook.title}`);
        
        const response = await fetch(ebook.coverImage, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });
        
        if (!response.ok) {
          const error = `HTTP ${response.status}`;
          results.failed.push(`${ebook.title}: ${error}`);
          results.details.push({ title: ebook.title, status: `❌ ${error}` });
          console.error(`[Cover Extract] ${ebook.title}: ${error}`);
          continue;
        }
        
        const buffer = Buffer.from(await response.arrayBuffer());
        
        // Process with sharp to optimize
        const processedBuffer = await sharp(buffer)
          .resize(400, 600, { fit: 'cover' })
          .jpeg({ quality: 85 })
          .toBuffer();
        
        const coverFileName = `${ebook.slug}.jpg`;
        const coverPath = path.join(coversDir, coverFileName);
        
        await writeFile(coverPath, processedBuffer);
        
        // Update database
        await prisma.ebook.update({
          where: { id: ebook.id },
          data: {
            coverImage: `/covers/${coverFileName}`
          }
        });
        
        results.extracted++;
        results.updated.push(ebook.title);
        results.details.push({ title: ebook.title, status: '✓ Downloaded & optimized' });
        console.log(`[Cover Extract] Success: ${ebook.title}`);
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        results.failed.push(`${ebook.title}: ${errorMsg}`);
        results.details.push({ title: ebook.title, status: `❌ ${errorMsg}` });
        console.error(`[Cover Extract] Error ${ebook.title}:`, error);
      }
    }
    
    return NextResponse.json({
      success: true,
      results
    });
    
  } catch (error) {
    console.error('Extract cover error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to extract covers' },
      { status: 500 }
    );
  }
}
