import { FC, useContext, useEffect } from "react";
import "./style.css";
import { ViewEyeIcon } from "@/components/icons/view-eye-icon";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import Link from "next/link";
import { CourseDetailsContext, CourseDetails } from "@/context/allCourses/courses_details";

const AdminCourseListTable: FC = () => {
  const { courseData, fetchData, pageNo } = useContext(CourseDetailsContext)!;

  useEffect(() => {
    fetchData();
  }, [pageNo]);

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
          {courseData && courseData.map((course: CourseDetails, index: number) => (
            <tr key={index}>
              <td className="admin-course-list-table-data">
                {course.basicInfo.courseCode} - {course.basicInfo.courseName}
              </td>
              <td className="admin-course-list-table-data">
                {course.basicInfo.category}
              </td>
              <td className="admin-course-list-table-data">
                {new Date(course.basicInfo.publishDate).toLocaleDateString()}
              </td>
              <td className="admin-course-list-table-data">
                <p
                  className={`admin-course-status-span ${
                    course.basicInfo.isActive ? "status-active" : "status-inactive"
                  }`}
                >
                  {course.basicInfo.isActive ? "Active" : "Inactive"}
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
