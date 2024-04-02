import { FC, useContext, useEffect } from "react";
import "./style.css";
import { ViewEyeIcon } from "@/components/icons/view-eye-icon";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import Link from "next/link";
import {
  CourseDetailsContext,
  CourseDetails,
} from "@/context/allCourses/courses_details";

const AdminCourseListTable: FC = () => {
  const contextValue = useContext(CourseDetailsContext);

  if (!contextValue) {
    console.error(
      "Context Error: While calling from the CustomPagination Component"
    );
    return null;
  }
  const { courseData } = contextValue;

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
            <th className="admin-course-list-table-head">View</th>
          </tr>
        </thead>
        <tbody className="admin-course-list-tbody">
          {courseData &&
            courseData.map((course: CourseDetails, index: number) => (
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
                    course.course_basic?.publishDate
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
                <td className="admin-course-list-table-data">
                  <Link href={`/admin/admin-course-detail/${course._id}`}>
                    <ViewEyeIcon />
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
