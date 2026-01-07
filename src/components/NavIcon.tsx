import React from 'react';
import {
  LibraryIcon,
  BookIcon,
  DocumentIcon,
  CalendarIcon,
  SearchIcon,
  UsersIcon,
  ShieldIcon,
  LightbulbIcon,
  ReadIcon,
  HistoryIcon,
  LocationIcon,
  ResearchIcon,
  PublishIcon,
} from '@/components/icons';

interface NavIconProps {
  icon: string;
  className?: string;
}

/**
 * Maps icon string identifiers to SVG components
 * Used for navigation menu icons
 */
export default function NavIcon({ icon, className = "w-5 h-5" }: NavIconProps) {
  const iconMap: Record<string, React.ReactElement> = {
    'home': <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>,
    'library': <LibraryIcon className={className} />,
    'book': <BookIcon className={className} />,
    'document': <DocumentIcon className={className} />,
    'calendar': <CalendarIcon className={className} />,
    'search': <SearchIcon className={className} />,
    'users': <UsersIcon className={className} />,
    'shield': <ShieldIcon className={className} />,
    'lightbulb': <LightbulbIcon className={className} />,
    'read': <ReadIcon className={className} />,
    'history': <HistoryIcon className={className} />,
    'location': <LocationIcon className={className} />,
    'research': <ResearchIcon className={className} />,
    'publish': <PublishIcon className={className} />,
  };

  return iconMap[icon] || <BookIcon className={className} />;
}
