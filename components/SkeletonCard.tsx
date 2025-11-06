
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 w-full h-64"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="flex items-center text-xs">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="mx-2 h-4 w-px bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
