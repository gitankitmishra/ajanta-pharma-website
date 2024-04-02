import { FC } from "react";
import "./style.css";
import CourseSummaryTable from "@/components/tables/courseSummaryTable";

interface CourseSummaryTableSectionProps {}

const CourseSummaryTableSection: FC<CourseSummaryTableSectionProps> = () => {
  return (
    <section className="course-summary-table-main-section">
      <div className="course-summary-table-header-part">
        <span className="course-summary-table-header-text">
          Course Summary{" "}
        </span>
        <span className="course-summary-table-span-text">(Total Assigned)</span>
      </div>
      <div className="course-summary-table-section">
        <CourseSummaryTable />
      </div>
    </section>
  );
};

export default CourseSummaryTableSection;
