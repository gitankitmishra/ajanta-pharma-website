import AdminCourseListTable from "@/components/tables/courseListTable";
import { FC, useState } from "react";
import Link from "next/link";
import CustomPagination from "@/components/pagination";
import AddButton from "@/components/buttons/add-button";
import "./style.css";
import { EditCourseProvider } from "@/context/temporary/editContext";

interface AdminCoursesTableSectionProps {}

const AdminCoursesTableSection: FC<AdminCoursesTableSectionProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };

  return (
    <section>
      <div className="admin-courses-text-btn-section">
        <p className="admin-courses-course-list-text">Course List</p>
        <div className="admin-courses-add-course-btn">
          <Link href="/admin/admin-add-course">
            <AddButton text="Add Course" />
          </Link>
        </div>
      </div>
      <div>
        <EditCourseProvider>
          <AdminCourseListTable />
        </EditCourseProvider>
      </div>
      <div className="admin-courses-pagination-section">
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default AdminCoursesTableSection;
