'use client';

import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  coverUrl?: string;
  description?: string;
  pages?: number;
  language?: string;
}

interface BookCardPreviewProps {
  book: Book;
  className?: string;
}

/**
 * Book card with hover preview popup
 * Neuroscience: Reduces cognitive load by showing info on-demand (progressive disclosure)
 * 
 * @param book - Book data
 * @param className - Additional CSS classes
 */
export default function BookCardPreview({ book, className = '' }: BookCardPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Book Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 h-full flex flex-col">
        {/* Cover Image */}
        <div className="aspect-[3/4] bg-[#F0EBE3] relative overflow-hidden">
          {book.coverUrl ? (
            <OptimizedImage
              src={book.coverUrl}
              alt={book.title}
              fill
              className="group-hover:scale-105 transition-transform duration-300"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2C5F5D]">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-[#2C5F5D] mb-2 line-clamp-2 group-hover:text-[#B05E3F] transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-1">{book.author}</p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-xs bg-[#F0EBE3] text-[#2C5F5D] px-2 py-1 rounded">
              {book.category}
            </span>
            <span className="text-xs text-gray-500">{book.year}</span>
          </div>
        </div>
      </div>

      {/* Hover Preview Popup */}
      {showPreview && book.description && (
        <div
          className="absolute z-50 bg-white rounded-lg shadow-2xl p-4 w-80 border border-[#F0EBE3] animate-fadeIn"
          style={{
            top: '0',
            left: '100%',
            marginLeft: '16px',
            animation: 'fadeIn 200ms ease-out',
          }}
        >
          <h4 className="font-serif text-md font-semibold text-[#2C5F5D] mb-2">
            {book.title}
          </h4>
          <p className="text-xs text-gray-700 mb-3 line-clamp-4">{book.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-[#F0EBE3] pt-2">
            {book.pages && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{book.pages} hal</span>
              </div>
            )}
            {book.language && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span>{book.language}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
