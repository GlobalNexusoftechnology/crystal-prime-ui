import { IPaginationProps } from "@/constants";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if not too many
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // First

      if (currentPage > 3) {
        pages.push("..."); // Left ellipsis
      }

      // Middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("..."); // Right ellipsis
      }

      pages.push(totalPages); // Last
    }

    return pages;
  };

  const pagesToRender = getPages();

  return (
    <div className="mt-4 2xl:mt-[1vw] flex gap-2 2xl:gap-[0.5vw] ">
      {pagesToRender.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-blue-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] 2xl:text-[1vw] rounded 2xl:rounded-[0.25vw] ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
