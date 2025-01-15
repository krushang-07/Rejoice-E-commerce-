import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md animate-blink overflow-hidden flex flex-col p-4">
      <div className="h-64 bg-gray-300 rounded-t-lg animate-pulse"></div>
      <div className="flex-grow mt-4">
        <div className="h-6 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
