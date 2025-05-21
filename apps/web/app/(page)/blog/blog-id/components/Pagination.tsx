"use client";
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const currentPage = 2;
const totalPages = 25;

const getPages = () => {
  const pages = [];

  for (let i = 1; i <= 6; i++) {
    pages.push(i);
  }

  pages.push('...');
  pages.push(totalPages);

  return pages;
};

function Pagination() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 25;
  const pages = getPages();

  return (
    <div className='flex justify-between items-center mt-10'>
      <button
        disabled={currentPage === 1}
        className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <MdKeyboardArrowLeft />
        Back
      </button>

      <button
        disabled={currentPage === totalPages}
        className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
