"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; // optional base URL for linking pages
  onPageChange?: (page: number) => void; // fallback callback if no baseUrl
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl = "",
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const renderPageItem = (page: number | string, index: number) => {
    if (page === "...") {
      return (
        <span key={index} className="px-3 py-1 text-gray-400 select-none">
          ...
        </span>
      );
    }

    const pageNumber = page as number;
    const href = baseUrl ? `${baseUrl}?page=${pageNumber}` : "#";

    return baseUrl ? (
      <Link
        key={index}
        href={href}
        className={`px-3 py-1 rounded-md border ${
          pageNumber === currentPage
            ? "bg-purple-600 text-white border-purple-600"
            : "text-gray-700 border-gray-200 hover:bg-gray-50"
        }`}
      >
        {pageNumber}
      </Link>
    ) : (
      <button
        key={index}
        onClick={() => onPageChange && onPageChange(pageNumber)}
        className={`px-3 py-1 rounded-md border ${
          pageNumber === currentPage
            ? "bg-purple-600 text-white border-purple-600"
            : "text-gray-700 border-gray-200 hover:bg-gray-50"
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-4">
      {/* Previous */}
      {baseUrl ? (
        <Link
          href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none"
              : "text-purple-600 border-purple-200 hover:bg-purple-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      ) : (
        <button
          onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-purple-600 border-purple-200 hover:bg-purple-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => renderPageItem(page, index))}

      {/* Next */}
      {baseUrl ? (
        <Link
          href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none"
              : "text-purple-600 border-purple-200 hover:bg-purple-50"
          }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-purple-600 border-purple-200 hover:bg-purple-50"
          }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}
