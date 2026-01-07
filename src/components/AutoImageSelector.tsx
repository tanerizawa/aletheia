'use client';

import { useState } from 'react';

interface AutoImageSelectorProps {
  title: string;
  type: 'book' | 'article' | 'event';
  keywords?: string[];
  onImageSelect: (imageUrl: string) => void;
}

interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  description: string | null;
  author: string;
  authorLink: string;
  downloadLocation: string;
}

export default function AutoImageSelector({ 
  title, 
  type, 
  keywords = [], 
  onImageSelect 
}: AutoImageSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImages = async () => {
    if (!title) {
      setError('Please enter a title first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/auto-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, keywords }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to generate images');
        return;
      }

      setImages(data.images);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (image: UnsplashImage) => {
    setUploading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/auto-image', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unsplashUrl: image.url,
          downloadLocation: image.downloadLocation,
          folder: type === 'book' ? 'ebooks' : type === 'article' ? 'articles' : 'events',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to upload image');
        return;
      }

      onImageSelect(data.url);
      setSelectedImage(image);
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] border border-cream-warm rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-bold text-gray-800">
          Auto-Generate Cover Image
        </h3>
        <button
          onClick={generateImages}
          disabled={loading || !title}
          className="flex items-center gap-2 px-4 py-2 bg-[#B05E3F] text-cream-soft-white rounded-lg hover:bg-[#944A2F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Generate Images
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            Select an image from Unsplash (free high-quality photos):
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <img
                  src={image.thumb}
                  alt={image.description || 'Cover image'}
                  className="w-full h-40 object-cover rounded-lg border-2 border-cream-warm group-hover:border-[#B05E3F] transition-colors"
                />
                
                <button
                  onClick={() => uploadToCloudinary(image)}
                  disabled={uploading}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                  <span className="px-3 py-1.5 bg-[#B05E3F] text-white text-sm font-medium rounded">
                    {uploading ? 'Uploading...' : 'Select'}
                  </span>
                </button>

                <div className="mt-2 text-xs text-gray-400">
                  Photo by{' '}
                  <a
                    href={`${image.authorLink}?utm_source=rumah_aletheia&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2C5F5D] hover:underline"
                  >
                    {image.author}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Images provided by{' '}
            <a
              href="https://unsplash.com/?utm_source=rumah_aletheia&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C5F5D] hover:underline"
            >
              Unsplash
            </a>
          </p>
        </div>
      )}

      {selectedImage && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Image uploaded successfully!
          </p>
        </div>
      )}
    </div>
  );
}
