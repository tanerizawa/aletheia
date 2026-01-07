import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET - Get single ebook
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const ebook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!ebook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    return NextResponse.json({ ebook });
  } catch (error) {
    console.error('GET /api/admin/ebooks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - Update ebook
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN and EDITOR can update ebooks
    if (session.role === 'VIEWER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const data = await request.json();

    // Check if ebook exists
    const existingEbook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!existingEbook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    // Update ebook
    const ebook = await prisma.ebook.update({
      where: { id },
      data: {
        title: data.title !== undefined ? data.title : undefined,
        author: data.author !== undefined ? data.author : undefined,
        publisher: data.publisher !== undefined ? data.publisher : undefined,
        publishYear: data.publishYear !== undefined ? parseInt(data.publishYear) : undefined,
        category: data.category !== undefined ? data.category : undefined,
        description: data.description !== undefined ? data.description : undefined,
        coverImage: data.coverImage !== undefined ? data.coverImage : undefined,
        format: data.format !== undefined ? data.format : undefined,
        pages: data.pages !== undefined ? parseInt(data.pages) : undefined,
        language: data.language !== undefined ? data.language : undefined,
        isbn: data.isbn !== undefined ? data.isbn : undefined,
        fileUrl: data.fileUrl !== undefined ? data.fileUrl : undefined,
        fileSize: data.fileSize !== undefined ? data.fileSize : undefined,
        availableOnline: data.availableOnline !== undefined ? data.availableOnline : undefined,
        requiresLogin: data.requiresLogin !== undefined ? data.requiresLogin : undefined,
        downloadable: data.downloadable !== undefined ? data.downloadable : undefined,
        tags: data.tags !== undefined ? data.tags : undefined,
        rating: data.rating !== undefined ? parseFloat(data.rating) : undefined,
      },
    });

    return NextResponse.json({ success: true, ebook });
  } catch (error) {
    console.error('PATCH /api/admin/ebooks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete ebook
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN can delete ebooks
    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    const { id } = await params;

    // Check if ebook exists
    const existingEbook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!existingEbook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    // Delete ebook
    await prisma.ebook.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Ebook deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/ebooks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
