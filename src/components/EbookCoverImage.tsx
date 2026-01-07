'use client';

import { useState, useEffect } from 'react';
import { BookIcon } from '@/components/icons';

interface EbookCoverImageProps {
  src: string | null;
  alt: string;
  title: string;
}

export default function EbookCoverImage({ src, alt, title }: EbookCoverImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    // Reset states when src changes
    setImageError(false);
    setImageLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      setImageError(true);
    };
    
    return () => {
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
          {title.substring(0, 50)}
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
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
