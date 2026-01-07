import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 100); // Limit length
}

export async function POST(request: NextRequest) {
  try {
    const { ebooks } = await request.json();

    if (!Array.isArray(ebooks) || ebooks.length === 0) {
      return NextResponse.json(
        { error: 'Invalid ebooks data' },
        { status: 400 }
      );
    }

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const book of ebooks) {
      try {
        const slug = generateSlug(book.title);

        // Check if already exists
        const existing = await prisma.ebook.findUnique({
          where: { slug },
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Create ebook
        await prisma.ebook.create({
          data: {
            slug,
            title: book.title,
            author: book.author || 'Unknown',
            publisher: book.publisher || null,
            publishYear: book.year ? parseInt(book.year) : null,
            isbn: book.isbn || null,
            category: book.category || 'Umum',
            description: book.description || '',
            coverImage: book.coverImage || null,
            fileUrl: book.fileUrl || null,
            fileSize: null,
            pages: null,
            language: 'Indonesia',
            format: [],
            tags: [],
            availableOnline: true, // Default true for all migrations
            downloadable: false, // Set to false until verified
            requiresLogin: false,
          },
        });

        imported++;
      } catch (error) {
        const errorMsg = `Failed to import "${book.title}": ${error instanceof Error ? error.message : 'Unknown error'}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: ebooks.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Import failed' },
      { status: 500 }
    );
  }
}
