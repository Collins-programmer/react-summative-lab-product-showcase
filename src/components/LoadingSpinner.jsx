import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;