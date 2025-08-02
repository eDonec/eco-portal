"use client";

import dynamic from "next/dynamic";

// Dynamically import the client component with no SSR
const ClientFormExample = dynamic(() => import("./ClientFormExample"), {
  ssr: false,
  loading: () => (
    // Loading skeleton that matches the form structure
    <div className="space-y-6">
      {/* Progress indicator skeleton */}
      <div className="mb-6">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
              {step < 3 && (
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
          <span>Personal</span>
          <span>Address</span>
          <span>Preferences</span>
        </div>
      </div>

      {/* Form skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16" />
          <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16" />
          <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex justify-between">
        <div />
        <div className="space-x-2">
          <div className="inline-block h-10 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
          <div className="inline-block h-10 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
        </div>
      </div>
    </div>
  ),
});

export default function FormExample() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Multi-Step Form Machine
      </h2>
      <ClientFormExample />
    </div>
  );
}
