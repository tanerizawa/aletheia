import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { ebooks } from '../src/data/ebooks';
import { articles } from '../src/data/articles';
import { events } from '../src/data/events';
import bcrypt from 'bcryptjs';

// Load environment variables
import 'dotenv/config';

// Setup PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data (for development)
  console.log('🗑️  Cleaning existing data...');
  await prisma.eventPhoto.deleteMany();
  await prisma.event.deleteMany();
  await prisma.article.deleteMany();
  await prisma.articleAuthor.deleteMany();
  await prisma.ebook.deleteMany();
  await prisma.user.deleteMany();

  // Seed Admin User
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('Tan12089@', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@academos.or.id',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Seed Ebooks
  console.log('📚 Seeding ebooks...');
  for (const ebook of ebooks) {
    await prisma.ebook.create({
      data: {
        title: ebook.title,
        slug: ebook.id,
        author: ebook.author,
        publisher: ebook.publisher,
        publishYear: ebook.publishYear,
        category: ebook.category,
        description: ebook.description,
        coverImage: ebook.coverImage,
        format: ebook.format,
        pages: ebook.pages,
        language: ebook.language,
        isbn: ebook.isbn,
        fileUrl: ebook.fileUrl,
        fileSize: ebook.fileSize,
        availableOnline: ebook.availableOnline,
        requiresLogin: ebook.requiresLogin,
        downloadable: ebook.downloadable,
        tags: ebook.tags,
        addedDate: new Date(ebook.addedDate),
        rating: ebook.rating,
        views: ebook.views,
        downloads: ebook.downloads,
      },
    });
  }
  console.log(`✅ Created ${ebooks.length} ebooks`);

  // Seed Article Authors
  console.log('✍️  Seeding article authors...');
  const authorMap = new Map<string, string>();
  
  for (const article of articles) {
    if (!authorMap.has(article.author.name)) {
      const author = await prisma.articleAuthor.create({
        data: {
          name: article.author.name,
          role: article.author.role,
          avatar: article.author.avatar,
        },
      });
      authorMap.set(article.author.name, author.id);
    }
  }
  console.log(`✅ Created ${authorMap.size} article authors`);

  // Seed Articles
  console.log('📝 Seeding articles...');
  for (const article of articles) {
    const authorId = authorMap.get(article.author.name)!;
    await prisma.article.create({
      data: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        category: article.category,
        authorId: authorId,
        publishedDate: new Date(article.publishedDate),
        updatedDate: article.updatedDate ? new Date(article.updatedDate) : null,
        readTime: article.readTime,
        tags: article.tags,
        views: article.views || 0,
        likes: article.likes || 0,
        featured: article.featured || false,
        published: true,
      },
    });
  }
  console.log(`✅ Created ${articles.length} articles`);

  // Seed Events
  console.log('📅 Seeding events...');
  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: {
        slug: event.slug,
        title: event.title,
        description: event.description,
        type: event.type,
        status: event.status.toUpperCase() as 'UPCOMING' | 'ONGOING' | 'COMPLETED',
        startDate: new Date(event.startDate),
        endDate: event.endDate ? new Date(event.endDate) : null,
        time: event.time,
        location: event.location,
        organizer: event.organizer,
        maxParticipants: event.maxParticipants || null,
        registeredParticipants: event.registeredParticipants || 0,
        registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline) : null,
        contactPerson: event.contactPerson || null,
        contactPhone: event.contactPhone || null,
        coverImage: event.coverImage || null,
        tags: event.tags || [],
        featured: event.featured || false,
      },
    });

    // Seed Event Photos
    if (event.photos && event.photos.length > 0) {
      for (const photo of event.photos) {
        await prisma.eventPhoto.create({
          data: {
            eventId: createdEvent.id,
            url: photo.url,
            caption: photo.caption,
            photographer: photo.photographer,
            takenDate: new Date(photo.takenDate),
          },
        });
      }
    }
  }
  console.log(`✅ Created ${events.length} events`);

  console.log('✨ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
