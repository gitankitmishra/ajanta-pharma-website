"use client"
import AdminCourseListTable from "@/components/tables/courseListTable";
import { FC, useState } from "react";
import { ViewEyeIcon } from "@/components/icons/view-eye-icon";
import Link from "next/link";
import CustomPagination from "@/components/pagination";

interface AdminCoursesTableSectionProps {}

const AdminCoursesTableSection: FC<AdminCoursesTableSectionProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };
 
  return (
    <section>
      <div>
        <p>Course List</p>
        <div>
          <Link href="/admin/admin-add-course">
            <button >Add Course</button>
          </Link>
        </div>
      </div>
      <div>
        <AdminCourseListTable
          name={"Critical Thinking"}
          courseCode={"PD2"}
          category={"Competency Based Skills"}
          date={"31/01/2024"}
          status={"Active"}
          view={<ViewEyeIcon />}
          currentPage={currentPage}
        />
      </div>
      <CustomPagination  />
    </section>
  );
};

export default AdminCoursesTableSection;
