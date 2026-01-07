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

    // Build update data object with only defined fields
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.publisher !== undefined) updateData.publisher = data.publisher;
    if (data.publishYear !== undefined) updateData.publishYear = parseInt(data.publishYear);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;
    if (data.format !== undefined) updateData.format = data.format;
    if (data.pages !== undefined) updateData.pages = parseInt(data.pages);
    if (data.language !== undefined) updateData.language = data.language;
    if (data.isbn !== undefined) updateData.isbn = data.isbn;
    if (data.fileUrl !== undefined) updateData.fileUrl = data.fileUrl;
    if (data.fileSize !== undefined) updateData.fileSize = data.fileSize;
    if (data.availableOnline !== undefined) updateData.availableOnline = data.availableOnline;
    if (data.requiresLogin !== undefined) updateData.requiresLogin = data.requiresLogin;
    if (data.downloadable !== undefined) updateData.downloadable = data.downloadable;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.rating !== undefined) updateData.rating = parseFloat(data.rating);

    // Update ebook
    const ebook = await prisma.ebook.update({
      where: { id },
      data: updateData,
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
