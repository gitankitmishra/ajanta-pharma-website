import React, { useState } from "react";
import { Pagination } from "@mui/material";
import StartDateInputField from "../fields/start-date-input-field";
import DateInputField from "../fields/start-date-input-field";

const CustomPagination = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  return (
    <>
      <Pagination
        count={10} // Total number of pages
        page={page} // Current page
        onChange={handleChange} // Handle page change
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#FE8100",
            color: "#fff",
          },
          "& .MuiPaginationItem-page": { color: "#FE8100" },
          "& .MuiPaginationItem-root": { border: "none" },
          "& .Mui-selected": { backgroundColor: "blue", color: "white" },
        }}
        color="secondary" // Color of the pagination component
        variant="outlined" // Style variant
        shape="rounded" // Shape of the pagination component
      />
    </>
  );
};

export default CustomPagination;
