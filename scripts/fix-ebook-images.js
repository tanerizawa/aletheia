/**
 * Script to fix ebook cover images in database
 * This script will:
 * 1. Find all ebooks with local image paths (starts with /images/)
 * 2. Set them to null so they show placeholder instead of broken images
 * 
 * Usage: DATABASE_URL="..." node scripts/fix-ebook-images.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixEbookImages() {
  try {
    console.log('🔍 Checking for ebooks with local image paths...\n');

    // Find all ebooks
    const allEbooks = await prisma.ebook.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
      },
    });

    console.log(`📚 Total ebooks: ${allEbooks.length}\n`);

    // Find ebooks with local paths
    const ebooksWithLocalPaths = allEbooks.filter(
      (ebook) => ebook.coverImage && ebook.coverImage.startsWith('/images/')
    );

    console.log(`❌ Ebooks with broken local paths: ${ebooksWithLocalPaths.length}\n`);

    if (ebooksWithLocalPaths.length === 0) {
      console.log('✅ No ebooks with local paths found. All good!');
      return;
    }

    // List them
    console.log('List of ebooks with broken image paths:');
    ebooksWithLocalPaths.forEach((ebook, index) => {
      console.log(`${index + 1}. "${ebook.title}" - ${ebook.coverImage}`);
    });

    console.log('\n🔧 Fixing...\n');

    // Update them to null
    const updatePromises = ebooksWithLocalPaths.map((ebook) =>
      prisma.ebook.update({
        where: { id: ebook.id },
        data: { coverImage: null },
      })
    );

    await Promise.all(updatePromises);

    console.log(`✅ Successfully updated ${ebooksWithLocalPaths.length} ebooks!`);
    console.log('📝 These ebooks will now show placeholder book icons until you upload proper cover images.\n');

    // Show summary
    console.log('To upload cover images:');
    console.log('1. Go to /admin/ebooks');
    console.log('2. Click "Edit" on each ebook');
    console.log('3. Use "Auto-Generate Image" or upload manually');
    console.log('4. Save changes\n');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixEbookImages()
  .then(() => {
    console.log('✨ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
