const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  return (
    <div className="flex justify-between items-center mt-6 px-6 py-4 bg-gray-50 border-t">
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex gap-2">
        <button
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
