import { useState, useEffect } from "react";

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const  paginate = (data, page, rowsPerPage) => {
  

  const range = calculateRange(data, rowsPerPage);

  const slice = sliceData(data, page, rowsPerPage);

  return { slice: [...slice], range: [...range] };
};

export default paginate;