import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/admin/events - List all events
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'desc' },
        include: {
          photos: true,
        },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error('Events fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST /api/admin/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN and EDITOR can create
    if (session.role === 'VIEWER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      type,
      startDate,
      endDate,
      time,
      description,
      location,
      organizer,
      contactPerson,
      contactPhone,
      coverImage,
      maxParticipants,
      registrationDeadline,
      tags,
      status,
    } = body;

    // Validate required fields
    if (!title || !type || !startDate) {
      return NextResponse.json(
        { error: 'Title, type, and start date are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug exists
    const existing = await prisma.event.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${randomUUID().replace(/-/g, '').slice(0,8)}` : slug;

    const event = await prisma.event.create({
      data: {
        title,
        slug: finalSlug,
        type,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        time: time || '',
        description: description || '',
        location: location || '',
        organizer: organizer || 'Rumah Aletheia',
        contactPerson: contactPerson || '',
        contactPhone: contactPhone || '',
        coverImage: coverImage || '',
        maxParticipants: maxParticipants || null,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        tags: tags || [],
        status: status || 'UPCOMING',
      },
      include: {
        photos: true,
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: unknown) {
    console.error('Event creation error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
