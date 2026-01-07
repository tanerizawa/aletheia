export default function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="flex">
        {/* Date badge skeleton */}
        <div className="w-24 bg-gray-200 flex-shrink-0"></div>
        
        {/* Event info skeleton */}
        <div className="flex-1 p-6">
          {/* Type badge */}
          <div className="h-5 bg-gray-200 rounded w-24 mb-3"></div>
          
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
          
          {/* Meta info */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
