import AdminCourseListTable from "@/components/tables/courseListTable";
import { FC, useContext, useState } from "react";
import Link from "next/link";
import CustomPagination from "@/components/pagination";
import AddButton from "@/components/buttons/add-button";
import "./style.css";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";
import { ArrowDown } from "@/components/icons/arrow-down";

interface AdminCoursesTableSectionProps { }

const AdminCoursesTableSection: FC<AdminCoursesTableSectionProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCourseDropDown, setIsCourseDropDown] = useState(false);

  const { handleFilterCourseChange, filterCourse } = useContext(
    CourseContext
  ) as CourseContextType;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };
  const toggleCourseDropDown = () => {
    setIsCourseDropDown(!isCourseDropDown);
  };
  return (
    <section>
      <div className="admin-courses-text-btn-section">
        <p className="admin-courses-course-list-text">Course List</p>

        <div className="admin-courses-add-course-btn">
          <div className="admin-courses-dropdown">
            <p className="admin-courses-filter-dropdown">{filterCourse === "course" ? "Course" : "Course Draft"}</p>

            <span
              onClick={toggleCourseDropDown}
              className="admin-courses-dropdown-icon-span"
            >
              <ArrowDown />
            </span>
            {isCourseDropDown && (
              <div className="admin-courses-dropdown-content">
                <span
                  className="admin-courses-dropdown-content-span"
                  onClick={() => {
                    handleFilterCourseChange("course");
                    toggleCourseDropDown();
                  }}
                >
                  Course
                </span>
                <span
                  className="admin-courses-dropdown-content-span"
                  onClick={() => {
                    handleFilterCourseChange("course_draft");
                    toggleCourseDropDown();
                  }}
                >
                  Course Draft
                </span>
              </div>
            )}
          </div>
          <Link href="/admin/admin-add-course">
            <AddButton text="Add Course" />
          </Link>
        </div>
      </div>
      <div>
        <AdminCourseListTable />
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
