
import React, { useEffect } from "react";

import "./TableFooter.css";
import paginate from "../utils/pagination";

const TableFooter = ({ range, setPage, page, slice, data, setSlice }) => {
    //   useEffect(() => {
    //     if (slice.length < 1 && page !== 1) {
    //       setPage(page - 1);
    //     }
    //   }, [slice, page, setPage]);
    return (
        <div className='tableFooter'>
            {range.map((el, index) => (
                <button
                    key={index}
                    className={`button ${page === el ? 'activeButton' : 'inactiveButton'
                        }`}
                    onClick={() => {
                        setPage(el)
                        const { slice, range } = paginate(data, el, 10)

                        setSlice(slice)
                    }}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

export default TableFooter;
