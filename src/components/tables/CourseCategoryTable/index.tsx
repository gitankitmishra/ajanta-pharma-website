import { FC } from "react";
import "./style.css";
import { DropdownIcon } from "@/components/icons/dropdown-icon";
import ViewEyeIcon from "@/components/icons/view-eye-icon";

interface CourseCategoryTableProps {
  image: string;
  categoryName: string;
  status: string;
  view: JSX.Element;
  currentPage: number;
}
const data: CourseCategoryTableProps[] = [
  {
    image: "",
    categoryName: "Competency Based Skills",
    status: "Active",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    image: "",
    categoryName: "Competency Based Skills",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    image: "",
    categoryName: "Competency Based Skills",
    status: "Active",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    image: "",
    categoryName: "Competency Based Skills",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
];
const CourseCategoryTable: FC<CourseCategoryTableProps> = () => {
  return (
    <div className="admin-course-category-list-table-main-container">
      <table className="admin-course-category-list-table">
        <thead className="admin-course-category-list-thead">
          <tr>
            <th className="admin-course-category-list-table-head">Image</th>
            <th className="admin-course-category-list-table-head ">
              <div className="course-category-head-dropdown-icon">
                Category Name
                <DropdownIcon />
              </div>
            </th>

            <th className="admin-course-category-list-table-head">
              <div className="course-category-head-dropdown-icon">
                Status <DropdownIcon />
              </div>
            </th>
            <th className="admin-course-category-list-table-head">View</th>
          </tr>
        </thead>
        <tbody className="admin-course-category-list-tbody">
          {data.map((person, index) => (
            <tr key={index}>
              <td className="admin-course-category-list-table-data">
                <div className="admin-course-image-data">{person.image}</div>
              </td>
              <td className="admin-course-category-list-table-data">
                {person.categoryName}
              </td>
              <td className="admin-course-category-list-table-data">
                <p
                  className={`admin-coursecategory-status-span ${
                    person.status === "Active"
                      ? "course-category-status-active"
                      : "course-category-status-inactive"
                  }`}
                >
                  {person.status}
                </p>
              </td>

              <td className="admin-course-category-list-table-data">
                {person.view}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseCategoryTable;
