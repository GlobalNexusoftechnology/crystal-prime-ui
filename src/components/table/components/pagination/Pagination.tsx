"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages: Array<number | "..."> = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Show left ellipsis if we're past page 4
    if (currentPage > 4) {
      pages.push("...");
    }

    // Determine middle window around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show right ellipsis if we're not near the end
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pagesToRender = getPages();

  return (
    <div className="mt-4 flex items-center gap-1">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 2xl:gap-[0.25vw] px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw] rounded 2xl:rounded-[0.25vw] ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-primary"
        }`}
      >
        <FiChevronLeft className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
        Previous
      </button>

      {pagesToRender.length > 0 && pagesToRender.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 2xl:px-[0.5vw] text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`w-8 2xl:w-[2vw] h-8 2xl:h-[2vw] rounded 2xl:rounded-[0.25vw] flex items-center justify-center text-[0.9rem] 2xl:text-[0.9vw] ${
              page === currentPage ? "bg-primary text-white" : "text-gray-700 hover:text-primary"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 2xl:gap-[0.25vw] px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw] rounded 2xl:rounded-[0.25vw] ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-primary"
        }`}
      >
        Next
        <FiChevronRight className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
      </button>
    </div>
  );
}
