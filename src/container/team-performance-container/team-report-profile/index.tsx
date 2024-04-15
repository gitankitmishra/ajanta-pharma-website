"use client";
import Breadcrumb from "@/components/breadcrumb";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { FunctionComponent, useState } from "react";
import "./style.css";
import TeamReportTable from "@/components/tables/teamReportTable";
import ViewEyeIcon from "@/components/icons/view-eye-icon";

interface TeamReportProfileProps {}

const TeamReportProfile: FunctionComponent<TeamReportProfileProps> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: " Competency Based Skills",
      href: "/team-performance/team-report",
      isActive: true,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };

  return (
    <div className="team-report-profile-main-section">
      <div className="team-report-profile-hero-part">
        <Breadcrumb items={breadcrumbItems} />
        <div className="team-report-hero-header">
          <span className="team-report-heading-text">Team Report</span>
          <button className="team-report-date-range-btn">
            <CalendarIcon />
            Date Range
          </button>
        </div>
      </div>
      <div className="team-report-profile-table-part">
        <TeamReportTable
          image={""}
          empName="XYZ"
          courseCode="PD2"
          date="31/2/2023"
          courseName={"Competency Based Skills"}
          status={"Active"}
          view={<ViewEyeIcon />}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TeamReportProfile;
