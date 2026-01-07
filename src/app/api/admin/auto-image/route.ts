import { NextRequest, NextResponse } from 'next/server';
import { searchUnsplashImage, getRandomUnsplashImage, triggerUnsplashDownload } from '@/lib/unsplash';
import cloudinary from '@/lib/cloudinary';

/**
 * POST /api/admin/auto-image
 * Generate image based on title/keywords
 * 
 * Body: {
 *   title: string,
 *   type: 'book' | 'article' | 'event',
 *   keywords?: string[]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, keywords } = body;

    if (!title || !type) {
      return NextResponse.json(
        { success: false, error: 'Title and type are required' },
        { status: 400 }
      );
    }

    // Build search query
    let searchQuery = title;
    
    // Add context keywords based on type
    if (type === 'book') {
      searchQuery = `${title} book cover library`;
    } else if (type === 'article') {
      searchQuery = `${title} abstract minimal`;
    } else if (type === 'event') {
      searchQuery = `${title} event community`;
    }

    // Add custom keywords if provided
    if (keywords && keywords.length > 0) {
      searchQuery = `${keywords.join(' ')} ${type}`;
    }

    // Search Unsplash
    const result = await searchUnsplashImage(searchQuery, 3);

    if (!result || result.results.length === 0) {
      // Fallback to random image
      const randomImage = await getRandomUnsplashImage(type);
      
      if (!randomImage) {
        return NextResponse.json(
          { success: false, error: 'No images found' },
          { status: 404 }
        );
      }

      // Trigger Unsplash download (API requirement)
      if (randomImage.links?.download_location) {
        await triggerUnsplashDownload(randomImage.links.download_location);
      }

      return NextResponse.json({
        success: true,
        images: [{
          id: randomImage.id,
          url: randomImage.urls.regular,
          thumb: randomImage.urls.thumb,
          description: randomImage.description || randomImage.alt_description,
          author: randomImage.user.name,
          authorLink: randomImage.user.links.html,
          downloadLocation: randomImage.links.download_location,
        }],
      });
    }

    // Map results
    const images = result.results.map((photo) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description,
      author: photo.user.name,
      authorLink: photo.user.links.html,
      downloadLocation: photo.links.download_location,
    }));

    return NextResponse.json({
      success: true,
      images,
      query: searchQuery,
    });
  } catch (error) {
    console.error('Auto Image Generation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/auto-image/upload
 * Download from Unsplash and upload to Cloudinary
 * 
 * Body: {
 *   unsplashUrl: string,
 *   downloadLocation: string,
 *   folder: string (e.g., 'ebooks', 'articles')
 * }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { unsplashUrl, downloadLocation, folder } = body;

    if (!unsplashUrl || !folder) {
      return NextResponse.json(
        { success: false, error: 'Unsplash URL and folder are required' },
        { status: 400 }
      );
    }

    // Trigger Unsplash download (API requirement)
    if (downloadLocation) {
      await triggerUnsplashDownload(downloadLocation);
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(unsplashUrl, {
      folder: `rumah-aletheia/${folder}`,
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload to Cloudinary' },
      { status: 500 }
    );
  }
}
