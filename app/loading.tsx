"use client";

import Sidebar from "@/components/Sidebar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Sidebar */}
      <Sidebar currentPath="/dashboard" />

      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
        </div>

        {/* Metrics & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics */}
          <div className="bg-white rounded-lg border p-6">
            <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg p-4 bg-gray-100 space-y-3">
                  <div className="h-8 w-16 bg-gray-200 rounded mx-auto" />
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                  <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg border p-6">
            <div className="h-5 w-48 bg-gray-200 rounded mb-6" />
            <div className="h-48 bg-gray-100 rounded" />
          </div>
        </div>

        {/* Stock Levels & Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stock Levels */}
          <div className="bg-white rounded-lg border p-6">
            <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-lg border p-6">
            <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-200" />
              <div className="mt-6 space-y-3 w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
