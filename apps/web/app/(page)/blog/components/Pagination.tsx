"use client";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Pagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 25;

  const getPages = () => {
    const pages = [];

    // Always add first page
    pages.push(1);

    // Add ellipsis if we're not on first page
    if (currentPage > 1) {
      pages.push("...");
    }

    // Add current page if it's not first or last
    if (currentPage > 1 && currentPage < totalPages) {
      pages.push(currentPage);
    }

    // Add ellipsis if we're not on last page
    if (currentPage < totalPages) {
      pages.push("...");
    }

    // Always add last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = getPages();

  return (
    <div className="flex justify-between items-center mt-10 max-w-lg mx-auto gap-1">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <MdKeyboardArrowLeft />
        Back
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-3 rounded-sm text-xs transition-colors
            ${page === currentPage ? "bg-black text-white" : "text-black hover:bg-gray-100"}
            ${page === "..." ? "cursor-default hover:bg-transparent" : "cursor-pointer"}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
