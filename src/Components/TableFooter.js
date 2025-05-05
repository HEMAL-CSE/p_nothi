
import React, { useEffect } from "react";

import "./TableFooter.css";
import paginate from "../utils/pagination";

const TableFooter = ({ range, setPage, page, slice, data, setSlice, pageNumber }) => {
    //   useEffect(() => {
    //     if (slice.length < 1 && page !== 1) {
    //       setPage(page - 1);
    //     }
    //   }, [slice, page, setPage]);
    const totalPages = range.length;
    const visiblePageCount = 5; // Number of page buttons to show (excluding ellipsis and arrows)

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        const { slice } = paginate(data, newPage, pageNumber);
        setSlice(slice);
    };

    const generatePageNumbers = () => {
        if (totalPages <= visiblePageCount) {
            return range;
        }

        let pages = [];
        const halfVisible = Math.floor(visiblePageCount / 2);

        // Always show first page
        pages.push(1);

        // Determine range around current page
        let start = Math.max(2, page - halfVisible);
        let end = Math.min(totalPages - 1, page + halfVisible);

        // Adjust if we're at the beginning or end
        if (page <= halfVisible + 1) {
            end = visiblePageCount - 1;
        } else if (page >= totalPages - halfVisible) {
            start = totalPages - visiblePageCount + 2;
        }

        // Add first ellipsis if needed
        if (start > 2) {
            pages.push('...');
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add last ellipsis if needed
        if (end < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="tableFooter">
            <button
                className={`button1 ${page === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
            >
                &lt;
            </button>

            {generatePageNumbers().map((item, index) => (
                item === '...' ? (
                    <span key={`ellipsis-${index}`} className="ellipsis">...</span>
                ) : (
                    <button
                        key={item}
                        className={`button1 ${page === item ? 'activeButton' : 'inactiveButton'}`}
                        onClick={() => handlePageChange(item)}
                    >
                        {item}
                    </button>
                )
            ))}

            <button
                className={`button1 ${page === totalPages ? 'disabled' : ''}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
            >
                &gt;
            </button>
        </div>
    );
};

export default TableFooter;
