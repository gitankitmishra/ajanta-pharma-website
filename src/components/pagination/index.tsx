import React, { useContext } from "react";
import { Pagination } from "@mui/material";
import { CourseContext } from "@/context/course_context";

interface CustomPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, onPageChange }) => {
  const contextValue = useContext(CourseContext);

  if (!contextValue) {
    console.error("Context Error: While calling from the CustomPagination Component");
    return null;
  }

  const { updatePageNo, totalPages } = contextValue;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    updatePageNo(value);
  };



  return (
    <Pagination
      count={totalPages} // Total number of pages
      page={currentPage} // Current page
      onChange={handleChange} // Handle page change
      variant="outlined" // Style variant
      shape="rounded" // Shape of the pagination component
      sx={{
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#FE8100",
          color: "#fff",
          width: "46px",
          height: "46px",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#FE8100",
          color: "#fff", // Background color and text color when selected and hovered
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "#FE8100",
          color: "#fff", // Background color and text color when hovered
        },
        "& .MuiPaginationItem-page": {
          color: "#FE8100",
          border: "none", // Remove border around numbers
          borderRadius: "12px", // Border radius of 12px
          width: "46px",
          height: "46px",
          fontSize: "16px",
        },
        "& .MuiPaginationItem-icon": {
          borderRadius: "12px", // Border radius of 12px for arrow icons
          fill: "#000",
        },
        "& .Mui-selected": { backgroundColor: "#FE8100", color: "#fff" },
        borderRadius: "12px", // Border radius of the pagination component
        "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root": {
          width: "46px",
          height: "46px",
          borderRadius: "12px",
          borderColor: "#fe8100",
        },
      }}
    />
  );
};

export default CustomPagination;
