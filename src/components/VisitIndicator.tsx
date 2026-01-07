'use client';

import { usePersonalization } from '@/hooks/usePersonalization';

interface VisitIndicatorProps {
  path: string;
  className?: string;
}

/**
 * Shows "You were here" indicator if user has visited the page before
 * Neuroscience: Recognition over recall - visual cues reduce cognitive load
 * 
 * @param path - The path to check
 * @param className - Additional CSS classes
 */
export default function VisitIndicator({ path, className = '' }: VisitIndicatorProps) {
  const { hasVisited, getTimeSinceLastVisit } = usePersonalization();

  if (!hasVisited(path)) return null;

  const timeSince = getTimeSinceLastVisit(path);
  if (!timeSince) return null;

  // Don't show if visited within last 5 seconds (likely current page)
  if (timeSince < 5000) return null;

  // Format time since visit
  const formatTimeSince = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return 'baru saja';
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-[#B05E3F] bg-cream-soft-white px-2.5 py-1 rounded-full border border-[#B05E3F]/20 ${className}`}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-medium">Dikunjungi {formatTimeSince(timeSince)}</span>
    </div>
  );
}
