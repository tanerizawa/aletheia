import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactNotification, sendContactAutoReply } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      );
    }

    // Save contact message to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
        isRead: false,
      },
    });

    // Send emails (non-blocking)
    Promise.all([
      sendContactNotification({ name, email, subject, message }),
      sendContactAutoReply({ name, email, subject })
    ]).catch(err => console.error('Failed to send emails:', err));

    return NextResponse.json(
      { 
        message: 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera merespons.' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan' },
      { status: 500 }
    );
  }
}
