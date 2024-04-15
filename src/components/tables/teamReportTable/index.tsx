import { DropdownIcon } from "@/components/icons/dropdown-icon";
import ViewEyeIcon from "@/components/icons/view-eye-icon";
import { FC } from "react";
import "./style.css";

interface TeamReportTableProps {
  empName: string;
  image: string;
  courseCode: string;
  courseName: string;
  status: string;
  view: JSX.Element;
  currentPage: number;
  date: string;
}

const data: TeamReportTableProps[] = [
  {
    empName: "XYZ",
    courseCode: "PD2",
    image: "",
    date:"31/01/2024",
    courseName: "Critical Thinking",
    status: "Active",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Creative Thinking",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Innovative Thinking",
    status: "Active",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    courseCode: "PD2",
    date:"31/01/2024",
    courseName: "Problem Solving",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Business Etiquette",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Strategic Thinking",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Lateral Thinking",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Clinical Studies",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Brand Detailing",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
  {
    empName: "XYZ",
    image: "",
    date:"31/01/2024",
    courseCode: "PD2",
    courseName: "Regional IMS",
    status: "Inactive",
    view: <ViewEyeIcon />,
    currentPage: 0,
  },
];

const TeamReportTable: FC<TeamReportTableProps> = () => {
  return (
    <div className="team-report-table-main-section">
      <table className="team-report-table">
        <thead className="team-report-thead">
          <tr>
            <th className="team-report-table-head">Emp. Name</th>
            <th className="team-report-table-head ">
              <div className="team-report-head-dropdown-icon">
                Course Code & Name
                <DropdownIcon />
              </div>
            </th>

            <th className="team-report-table-head">Complete Date</th>
            <th className="team-report-table-head">
              <div className="team-report-head-dropdown-icon">
                Status <DropdownIcon />
              </div>
            </th>
            <th className="team-report-table-head">No. of Attempt</th>
            <th className="team-report-table-head">Score</th>
          </tr>
        </thead>
        <tbody className="team-report-tbody">
          {data.map((person, index) => (
            <tr key={index}>
              <td className="team-report-table-data">
                {person.empName}
                {/* <div className="team-report-image-data">{person.image}</div> */}
              </td>
              <td className="team-report-table-data">
                <span className="team-report-course-code-span">
                  {person.courseCode}
                </span>
                <span className="team-report-course-name-span">
                  {person.courseName}
                </span>
              </td>
              <td className="team-report-table-data team-report-table-date-data">{person.date}</td>
              <td className="team-report-table-data">
                <p
                  className={`team-report-status-span ${
                    person.status === "Active"
                      ? "team-report-status-active"
                      : "team-report-status-inactive"
                  }`}
                >
                  {person.status}
                </p>
              </td>

              <td className="team-report-table-data">{person.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamReportTable;
