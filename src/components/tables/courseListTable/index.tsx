import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import "./style.css";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import Link from "next/link";

import ViewEyeIcon from "@/components/icons/view-eye-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";

const AdminCourseListTable: FC = () => {
  const contextValue = useContext(CourseContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const {
    handleFilterCategoryChange,
    handleFitlerStatusChange,
    upload_Date,
    filterCategory,
    filterStatus,
    filterCourse,
  } = useContext(CourseContext) as CourseContextType;
  if (!contextValue) {
    console.error(
      "Context Error: While calling from the CustomPagination Component"
    );
    return null;
  }
  const { courseData, getCourseData } = contextValue;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  return (
    <div className="admin-course-list-table-main-container">
      <table className="admin-course-list-table">
        <thead className="admin-course-list-thead">
          <tr>
            <th className="admin-course-list-table-head">Course Code</th>
            <th className="admin-course-list-table-head">Course Name</th>

            <th className="admin-course-list-table-head head-dropdown-icon">
              Category{"   "}
              <div className="admin-course-list-table-category-dropdown-main-div">
                <span
                  onClick={() => {
                    toggleCategoryDropdown();
                  }}
                  className="admin-course-list-table-category-dropdown-icon-span"
                >
                  <DropdownIcon />
                </span>
                {isCategoryDropdownOpen && (
                  <div className="admin-course-list-table-category-dropdown-content">
                    <span
                      className="admin-course-list-table-category-dropdown-content-span"
                      onClick={() => {
                        handleFilterCategoryChange("");
                        toggleCategoryDropdown();
                      }}
                    >
                      All
                    </span>
                    <span
                      className="admin-course-list-table-category-dropdown-content-span"
                      onClick={() => {
                        handleFilterCategoryChange("Competency Based Skills");
                        toggleCategoryDropdown();
                      }}
                    >
                      Competency Based Skills
                    </span>

                    <span
                      className="admin-course-list-table-category-dropdown-content-span"
                      onClick={() => {
                        handleFilterCategoryChange("Personal Development");
                        toggleCategoryDropdown();
                      }}
                    >
                      Personal Development
                    </span>
                    <span
                      className="admin-course-list-table-category-dropdown-content-span"
                      onClick={() => {
                        handleFilterCategoryChange("Medical");
                        toggleCategoryDropdown();
                      }}
                    >
                      Medical
                    </span>
                    <span
                      className="admin-course-list-table-category-dropdown-content-span"
                      onClick={() => {
                        handleFilterCategoryChange("Marketing");
                        toggleCategoryDropdown();
                      }}
                    >
                      Marketing
                    </span>
                  </div>
                )}
              </div>
            </th>
            <th className="admin-course-list-table-head">Upload Date</th>
            <th className="admin-course-list-table-head">Published Date</th>
            <th className="admin-course-list-table-head head-dropdown-icon">
              Status{" "}
              <div className="admin-course-list-table-head-dropdown-main-div">
                <span
                  onClick={toggleDropdown}
                  className="admin-course-list-table-head-dropdown-icon-span"
                >
                  <DropdownIcon />
                </span>

                {isDropdownOpen && (
                  <div className="admin-course-list-table-head-dropdown-content">
                    <span
                      className="admin-course-list-table-head-dropdown-content-span"
                      onClick={() => {
                        handleFitlerStatusChange("");
                        toggleDropdown();
                      }}
                    >
                      All
                    </span>
                    <span
                      className="admin-course-list-table-head-dropdown-content-span"
                      onClick={() => {
                        handleFitlerStatusChange("active");
                        toggleDropdown();
                      }}
                    >
                      Active
                    </span>
                    <span
                      className="admin-course-list-table-head-dropdown-content-span"
                      onClick={() => {
                        handleFitlerStatusChange("inactive");
                        toggleDropdown();
                      }}
                    >
                      Inactive
                    </span>
                  </div>
                )}
              </div>
            </th>
            <th className="admin-course-list-table-head ">View</th>
          </tr>
        </thead>
        <tbody className="admin-course-list-tbody">
          {courseData && courseData.length > 0 ? (
            courseData
              .filter(
                (course: any) =>
                  course.course_basic && course.course_basic.course_start_date
              )
              .sort((a: any, b: any) => {
                const dateA = new Date(a.course_basic.course_start_date);
                const dateB = new Date(b.course_basic.course_start_date);
                return dateB.getTime() - dateA.getTime();
              })
              .map((course: any, index: number) => {
                // const uploadDate = new Date(
                //   course.course_basic.course_upload_date?._seconds * 1000
                // ).toLocaleDateString();

                return (
                  <tr key={index}>
                    <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                      {course.course_basic?.course_code}
                    </td>
                    <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                      {course.course_basic?.course_name}
                    </td>
                    <td className="admin-course-list-table-data">
                      {course.course_basic?.course_category}
                    </td>
                    <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                      {new Date(
                        course.course_basic.course_upload_date
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                      {new Date(
                        course.course_basic.course_start_date
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="admin-course-list-table-data">
                      <p
                        className={`admin-course-status-span ${
                          course.course_basic?.course_status === "inactive"
                            ? "status-inactive"
                            : "status-active"
                        }`}
                      >
                        {course.course_basic?.course_status === "inactive"
                          ? "Inactive"
                          : "Active"}
                      </p>
                    </td>
                    <td className="admin-course-list-table-data admin-course-eye-icon">
                      <Link href={`/admin/admin-course-detail/`}>
                        <ViewEyeIcon
                          onClick={() =>
                            getCourseData(course.course_basic.course_code)
                          }
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr style={{ height: "100px" }}>
              <td colSpan={6}>
                <span>
                  {`No courses found for     `}
                  {filterCourse && (
                    <span>
                      <span style={{ color: "blue", fontWeight: "bold" }}>
                        Course Type:
                      </span>
                      <span style={{ color: "black" }}>{filterCourse}</span>
                      {filterCategory && <span> </span>}
                    </span>
                  )}
                  {filterCategory && (
                    <span>
                      {filterCourse && <span> / </span>}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Course Category:
                      </span>
                      <span style={{ color: "black" }}>{filterCategory}</span>
                      {filterStatus && <span> </span>}
                    </span>
                  )}
                  {filterStatus && (
                    <span>
                      {(filterCourse || filterCategory) && <span> / </span>}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Course Status:
                      </span>
                      <span style={{ color: "black" }}>{filterStatus}</span>
                    </span>
                  )}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseListTable;
