"use client";
import { FC, useState } from "react";
import "./style.css";
import Link from "next/link";
import AddButton from "@/components/buttons/add-button";
import CustomPagination from "@/components/pagination";
import CourseCategoryTable from "@/components/tables/CourseCategoryTable";
import { ViewEyeIcon } from "@/components/icons/view-eye-icon";

interface AdminCourseCategoryContainerProps {}

const AdminCourseCategoryContainer: FC<
  AdminCourseCategoryContainerProps
> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };

  return (
    <section className="admin-course-category-main-container">
      <div className="admin-course-category-text-btn-section">
        <p className="admin-course-category-course-category-list-text">
          Course Category List
        </p>
        <div className="admin-course-category-add-course-category-btn">
          <Link href="/admin/admin-add-course-category">
            <AddButton text="Add Category" width="225px" />
          </Link>
        </div>
      </div>
      <div className="admin-course-category-table">
        <CourseCategoryTable
          image={""}
          categoryName={"Competency Based Skills"}
          status={"Active"}
          view={<ViewEyeIcon />}
          currentPage={currentPage}
        />
      </div>
      <div className="admin-course-category-pagination">
        {" "}
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default AdminCourseCategoryContainer;
