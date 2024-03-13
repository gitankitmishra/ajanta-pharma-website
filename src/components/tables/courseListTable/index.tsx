import { FC } from "react";
import "./style.css";
import { ViewEyeIcon } from "@/components/icons/view-eye-icon";

interface AdminCourseListTableProps {
  name: string;
  courseCode: number | string;
  category: string;
  date: string;
  status: string;
  view: JSX.Element;
}
const data: AdminCourseListTableProps[] = [
  {
    name: "Critical Thinking",
    courseCode: "PD2",
    category: "Competency Based Skills",
    date: "31/01/2024",
    status: "Active",
    view: <ViewEyeIcon />,
  },
  {
    name: "Creative Thinking",
    courseCode: "PD1",
    category: "Classroom Training",
    date: "31/01/2024",
    status: "Inactive",
    view: <ViewEyeIcon />,
  },
  {
    name: "Creative Thinking",
    courseCode: "PD1",
    category: "Classroom Training",
    date: "31/01/2024",
    status: "Inactive",
    view: <ViewEyeIcon />,
  },
  {
    name: "Creative Thinking",
    courseCode: "PD1",
    category: "Classroom Training",
    date: "31/01/2024",
    status: "Inactive",
    view: <ViewEyeIcon />,
  },
  {
    name: "Creative Thinking",
    courseCode: "PD1",
    category: "Classroom Training",
    date: "31/01/2024",
    status: "Inactive",
    view: <ViewEyeIcon />,
  },
  {
    name: "Creative Thinking",
    courseCode: "PD1",
    category: "Classroom Training",
    date: "31/01/2024",
    status: "Inactive",
    view: <ViewEyeIcon />,
  },
];
const AdminCourseListTable: FC<AdminCourseListTableProps> = () => {
  return (
    <div className="admin-course-list-table-main-container">
      <table className="admin-course-list-table">
        <thead className="admin-course-list-thead">
          <tr>
            <th className="admin-course-list-table-head">Course Code & Name</th>
            <th className="admin-course-list-table-head">Category</th>
            <th className="admin-course-list-table-head">Upload Date</th>
            <th className="admin-course-list-table-head">Status</th>
            <th className="admin-course-list-table-head">View</th>
          </tr>
        </thead>
        <tbody className="admin-course-list-tbody">
          {data.map((person, index) => (
            <tr key={index}>
              <td className="admin-course-list-table-data">
                {person.courseCode}
                {person.name}
              </td>
              <td className="admin-course-list-table-data">
                {person.category}
              </td>
              <td className="admin-course-list-table-data">{person.date}</td>
              <td className="admin-course-list-table-data">{person.status}</td>
              <td className="admin-course-list-table-data">{person.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseListTable;
