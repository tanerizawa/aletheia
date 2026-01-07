'use client';

import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  description?: string;
  capacity?: number;
  registeredCount?: number;
  imageUrl?: string;
}

interface EventCardPreviewProps {
  event: Event;
  className?: string;
}

/**
 * Event card with hover preview tooltip
 * Neuroscience: Quick information access without navigation (reduces clicks)
 * 
 * @param event - Event data
 * @param className - Additional CSS classes
 */
export default function EventCardPreview({ event, className = '' }: EventCardPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);

  // Format date to Indonesian locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Event Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 h-full">
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium bg-[#2C5F5D] text-white px-3 py-1 rounded-full">
              {event.category}
            </span>
            {event.capacity && event.registeredCount !== undefined && (
              <span className="text-xs text-gray-500">
                {event.registeredCount}/{event.capacity} peserta
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-semibold text-[#2C5F5D] mb-3 group-hover:text-[#B05E3F] transition-colors duration-200">
            {event.title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Time */}
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{event.time}</span>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Hover Preview Tooltip */}
      {showPreview && event.description && (
        <div
          className="absolute z-50 bg-[#2C5F5D] text-white rounded-lg shadow-2xl p-4 w-72 border border-[#1A3D3B] animate-fadeIn"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            animation: 'fadeIn 200ms ease-out',
          }}
        >
          {/* Arrow pointing down */}
          <div
            className="absolute w-3 h-3 bg-[#2C5F5D] border-r border-b border-[#1A3D3B]"
            style={{
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
            }}
          />

          <p className="text-sm leading-relaxed">{event.description}</p>

          {event.imageUrl && (
            <div className="mt-3 w-full h-32 relative rounded overflow-hidden">
              <OptimizedImage
                src={event.imageUrl}
                alt={event.title}
                fill
                objectFit="cover"
                sizes="288px"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
