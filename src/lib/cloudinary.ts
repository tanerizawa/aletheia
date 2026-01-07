import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper function to get optimized image URL
export function getOptimizedImageUrl(publicId: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
} = {}) {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: options.width || 800,
        height: options.height,
        crop: 'limit',
        quality: options.quality || 'auto',
        fetch_format: options.format || 'auto',
      },
    ],
  });
}
