import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import "./style.css";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import Link from "next/link";

import ViewEyeIcon from "@/components/icons/view-eye-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";

const AdminCourseListTable: FC = () => {
  const contextValue = useContext(CourseContext);

  const { course_basic, searchNameData, searchTerm, filteredData } = useContext(
    CourseContext
  ) as CourseContextType;

  useEffect(() => {
    console.log("-----------------", filteredData);
  }, [searchTerm]);

  // const { handleCourseCodeChange } = useContext(EditCourseContext);

  if (!contextValue) {
    console.error(
      "Context Error: While calling from the CustomPagination Component"
    );
    return null;
  }
  const { courseData, getCourseData } = contextValue;

  return (
    <div className="admin-course-list-table-main-container">
      <table className="admin-course-list-table">
        <thead className="admin-course-list-thead">
          <tr>
            <th className="admin-course-list-table-head">Course Code & Name</th>
            <th className="admin-course-list-table-head head-dropdown-icon">
              Category <DropdownIcon />
            </th>
            <th className="admin-course-list-table-head">Upload Date</th>
            <th className="admin-course-list-table-head head-dropdown-icon">
              Status <DropdownIcon />
            </th>
            <th className="admin-course-list-table-head ">View</th>
          </tr>
        </thead>
        <tbody className="admin-course-list-tbody">
          {(searchTerm ? filteredData : courseData)
            ?.sort((a: any, b: any) => {
              const dateA = new Date(
                a.course_basic.course_start_date
              ).getTime();
              const dateB = new Date(
                b.course_basic.course_start_date
              ).getTime();
              return dateA - dateB;
            })
            .map((course: any, index: number) => (
              <tr key={index}>
                <td className="admin-course-list-table-data">
                  {course.course_basic?.course_code} -{" "}
                  {course.course_basic?.course_name}
                </td>
                <td className="admin-course-list-table-data">
                  {course.course_basic?.course_category}
                </td>
                <td className="admin-course-list-table-data">
                  {new Date(
                    course.course_basic.course_start_date
                  ).toLocaleDateString()}
                </td>
                <td className="admin-course-list-table-data">
                  <p
                    className={`admin-course-status-span ${
                      course.course_basic?.isActive
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {course.course_basic?.isActive ? "Active" : "Inactive"}
                  </p>
                </td>
                <td className="admin-course-list-table-data admin-course-eye-icon">
                  <Link href={`/admin/admin-course-detail/`}>
                    {/* ${course._id} Need a context to hold this value to use this id to view the course 
          for an edit logic */}
                    <ViewEyeIcon
                      onClick={() =>
                        getCourseData(course.course_basic.course_code)
                      }
                    />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseListTable;
