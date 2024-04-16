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
  // useEffect(() => {
  //   console.log("-----------------", filteredData);
  // }, [searchTerm]);

  // const { handleCourseCodeChange } = useContext(EditCourseContext);
  const {
    course_basic,
    searchTerm,
    handleFilterCategoryChange,
    handleFitlerStatusChange,
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
            <th className="admin-course-list-table-head">Course Code & Name</th>

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
          {courseData && courseData.length === 0 ? (
            <tr className="no-data-found">
              <td colSpan={5}>
                No Data Found for
                {filterCategory && (
                  <>
                    {"     "}
                    <span className="highlight1"> Category</span>=
                    <span className="highlight2"> {filterCategory}</span> /
                  </>
                )}
                {filterStatus && (
                  <>
                    {" "}
                    <span className="highlight1">Status</span> =
                    <span className="highlight2"> {filterStatus}</span> /
                  </>
                )}
                {filterCourse && (
                  <>
                    {" "}
                    <span className="highlight1">CourseType</span> =
                    <span className="highlight2"> {filterCourse}</span>
                  </>
                )}
              </td>
            </tr>
          ) : (
            courseData?.map((course: any, index: number) => (
              <tr key={index}>
                <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                  {course.course_basic?.course_code} -{" "}
                  {course.course_basic?.course_name}
                </td>
                <td className="admin-course-list-table-data">
                  {course.course_basic?.course_category}
                </td>
                <td className="admin-course-list-table-data admin-course-list-table-data-name-and-code">
                  {new Date(
                    course.course_basic.course_start_date
                  ).toLocaleDateString()}
                </td>
                <td className="admin-course-list-table-data">
                  <p
                    className={`admin-course-status-span ${
                      course.course_basic?.course_status === "active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {course.course_basic?.course_status === "active"
                      ? "Active"
                      : "Inactive"}
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseListTable;
