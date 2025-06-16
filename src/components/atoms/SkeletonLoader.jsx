import React from 'react'

const SkeletonLoader = ({ count = 1, className = '' }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={`animate-pulse ${className}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="flex space-x-2 pt-2">
                <div className="h-8 bg-gray-200 rounded flex-1" />
                <div className="h-8 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SkeletonLoader