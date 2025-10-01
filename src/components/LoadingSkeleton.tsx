'use client';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  height?: string;
}

export default function LoadingSkeleton({ className = '', count = 1, height = 'h-6' }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
        />
      ))}
    </>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 w-1/2" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );
}

