'use client';

import { useState, useEffect } from 'react';
import { BookIcon } from '@/components/icons';
import OptimizedImage from './OptimizedImage';

interface EbookCoverImageProps {
  src?: string | null;
  alt?: string;
  title?: string;
}

export default function EbookCoverImage({ src, alt, title }: EbookCoverImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    // Reset states when src changes — perform asynchronously to avoid
    // synchronous setState inside effect which can cause cascading renders
    const resetId = setTimeout(() => {
      setImageError(false);
      setImageLoaded(false);
    }, 0);
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      setImageError(true);
    };
    
    return () => {
      clearTimeout(resetId);
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Show fallback if no src or error
  if (!src || imageError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <BookIcon className="w-24 h-24 text-white/60 mb-4" />
        <p className="text-white/80 text-center font-semibold">
          {(title || '').substring(0, 50)}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-teal-900/10">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60"></div>
        </div>
      )}
      <div className={`w-full h-full ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <OptimizedImage
          src={src || ''}
          alt={alt || title || ''}
          width={400}
          height={533}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
