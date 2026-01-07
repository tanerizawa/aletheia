import { createApi } from 'unsplash-js';

// Initialize Unsplash API
// Get your access key from https://unsplash.com/developers
export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

/**
 * Search for relevant images based on keywords
 * @param query - Search keywords (e.g., "democracy book", "philosophy")
 * @param perPage - Number of results (default 1 for auto-select)
 */
export async function searchUnsplashImage(query: string, perPage = 1) {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage,
      orientation: 'portrait', // Good for book covers
    });

    if (result.errors) {
      console.error('Unsplash API Error:', result.errors);
      return null;
    }

    return result.response;
  } catch (error) {
    console.error('Unsplash Search Error:', error);
    return null;
  }
}

/**
 * Get a random photo from Unsplash
 * @param query - Topic/category (optional)
 */
export async function getRandomUnsplashImage(query?: string) {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape', // Good for article headers
    });

    if (Array.isArray(result.response)) {
      return result.response[0];
    }

    return result.response;
  } catch (error) {
    console.error('Unsplash Random Error:', error);
    return null;
  }
}

/**
 * Download image from Unsplash and upload to Cloudinary
 * This is required by Unsplash API guidelines (trigger download endpoint)
 */
export async function triggerUnsplashDownload(downloadLocation: string) {
  try {
    await fetch(downloadLocation);
  } catch (error) {
    console.error('Unsplash Download Trigger Error:', error);
  }
}
