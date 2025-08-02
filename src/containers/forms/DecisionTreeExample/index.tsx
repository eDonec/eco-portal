"use client";

import dynamic from "next/dynamic";

const DecisionTreeExample = dynamic(
  () => import("./ClientDecisionTreeExample"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading Decision Tree...
        </span>
      </div>
    ),
  }
);

export default DecisionTreeExample;
