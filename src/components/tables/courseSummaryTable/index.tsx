import { FunctionComponent } from "react";
import "./style.css";
import { DropdownIcon } from "@/components/icons/dropdown-icon";

interface CourseSummaryTableProps {}
interface CourseSummary {
  courseCodeAndName: string;
  completionDate: string;
  category: string;
  status: string;
  score: number | null; // Nullable score
}

const CourseSummaryTable: FunctionComponent<CourseSummaryTableProps> = () => {
  const courseSummaries: CourseSummary[] = [
    {
      courseCodeAndName: "PD2 - Critical Thinking",
      completionDate: "2023-01-15",
      category: "Competency Based Skills",
      status: "Pending",
      score: null,
    },
    {
      courseCodeAndName: "PD2 - Critical Thinking",
      completionDate: "2023-01-15",
      category: "Competency Based Skills",
      status: "Pending",
      score: null,
    },
    {
      courseCodeAndName: "BO5 - Innovative Thinking",
      completionDate: "2023-03-20",
      category: "Competency Based Skills",
      status: "In Progress",
      score: null,
    },
    {
      courseCodeAndName: "BO5 - Innovative Thinking",
      completionDate: "2023-03-20",
      category: "Competency Based Skills",
      status: "In Progress",
      score: null,
    },
    {
      courseCodeAndName: "MA2 - Brand Detailing",
      completionDate: "2023-03-20",
      category: "Brand Detailing",
      status: "Completed",
      score: 92,
    },
    {
      courseCodeAndName: "MA2 - Brand Detailing",
      completionDate: "2023-03-20",
      category: "Brand Detailing",
      status: "Completed",
      score: 92,
    },
  ];
  return (
    <div className="course-summary-table-main-container">
      <table className="course-summary-table">
        <thead className="course-summary-thead">
          <tr>
            <th className="course-summary-table-head">Course Code & Name</th>
            <th className="course-summary-table-head">Completion Date</th>
            <th className="course-summary-table-head">Category</th>
            <th className="course-summary-table-head ">Status</th>
            <th className="course-summary-table-head">Score</th>
          </tr>
        </thead>
        <tbody className="course-summary-tbody">
          {/* Map over the course summaries and render table rows */}
          {courseSummaries.map((course, index) => (
            <tr key={index}>
              <td className="course-summary-table-data">
                {course.courseCodeAndName}
              </td>
              <td className="course-summary-table-data course-summary-table-numbers-data">
                {course.completionDate}
              </td>
              <td className="course-summary-table-data">{course.category}</td>
              <td
                className={`course-summary-table-data ${course.status.toLowerCase()}`}
              >
                {course.status}
              </td>
              <td
                className={`course-summary-table-data course-summary-table-numbers-data ${course.status.toLowerCase()}`}
              >
                {course.score != null ? course.score + "%" : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseSummaryTable;
