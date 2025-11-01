import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-8 mt-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 w-full">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-white/20 rounded w-1/2"></div>
            <div className="h-16 bg-white/20 rounded w-1/3 mt-4"></div>
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full"></div>
          <div className="w-full md:w-auto grid grid-cols-3 gap-4">
            <div className="h-12 bg-white/20 rounded"></div>
            <div className="h-12 bg-white/20 rounded"></div>
            <div className="h-12 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Forecast Skeleton */}
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
         <div className="h-6 bg-white/20 rounded w-1/4 mb-4"></div>
         <div className="flex justify-between items-center">
            <div className="w-16 h-24 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-24 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-24 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-24 bg-white/20 rounded-lg"></div>
            <div className="w-16 h-24 bg-white/20 rounded-lg"></div>
         </div>
      </div>
    </div>
  );
};
