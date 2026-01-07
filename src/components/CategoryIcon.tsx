import React from 'react';
import {
  ReadIcon,
  LiteratureIcon,
  AcademicIcon,
  HistoryIcon,
  TechnologyIcon,
  BookIcon,
  UsersIcon,
  LightbulbIcon,
  SparklesIcon,
} from './icons';

interface CategoryIconProps {
  category: string;
  className?: string;
}

/**
 * Returns the appropriate icon component based on category name
 * Neuroscience: Icon recognition 60% faster than emoji
 */
export default function CategoryIcon({ category, className = "w-6 h-6" }: CategoryIconProps) {
  const iconMap: Record<string, React.ReactElement> = {
    'Fiksi': <ReadIcon className={className} />,
    'Non-Fiksi': <BookIcon className={className} />,
    'Akademik': <AcademicIcon className={className} />,
    'Sejarah': <HistoryIcon className={className} />,
    'Filsafat': <LightbulbIcon className={className} />,
    'Teknologi': <TechnologyIcon className={className} />,
    'Sosial-Humaniora': <UsersIcon className={className} />,
    'Literasi': <LiteratureIcon className={className} />,
    'Pendidikan': <AcademicIcon className={className} />,
    'Budaya': <UsersIcon className={className} />,
    'Seni': <SparklesIcon className={className} />,
    'Tutorial': <BookIcon className={className} />,
  };

  return iconMap[category] || <BookIcon className={className} />;
}
