export default function SkeletonBookCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Book cover skeleton */}
      <div className="aspect-[3/4] bg-gray-200"></div>
      
      {/* Book info skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        {/* Author */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}
