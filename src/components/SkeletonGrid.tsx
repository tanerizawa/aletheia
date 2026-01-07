interface SkeletonGridProps {
  count?: number;
  type?: 'card' | 'book' | 'event';
}

import SkeletonCard from './SkeletonCard';
import SkeletonBookCard from './SkeletonBookCard';
import SkeletonEventCard from './SkeletonEventCard';

export default function SkeletonGrid({ count = 6, type = 'card' }: SkeletonGridProps) {
  const SkeletonComponent = 
    type === 'book' ? SkeletonBookCard :
    type === 'event' ? SkeletonEventCard :
    SkeletonCard;

  return (
    <div className={`grid gap-6 ${
      type === 'book' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
      type === 'event' ? 'grid-cols-1' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}
