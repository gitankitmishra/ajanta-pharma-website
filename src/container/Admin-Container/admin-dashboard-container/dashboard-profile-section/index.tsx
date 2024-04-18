import { FC, useContext } from "react";
import "./style.css";
import StatusCard from "@/components/cards/statusCard";
import Question from "@/public/images/question-mark.svg";
import StatusCardGraduationCapIcon from "@/public/images/statusCardGraduation-icon.svg";
import assessment from "@/public/images/assessment-icon.svg";

import { CourseContext, CourseContextType } from "@/context/course_context";
import Link from "next/link";

interface DashboardProfileSectionProps {}

const DashboardProfileSection: FC<DashboardProfileSectionProps> = () => {
  const { getCountdata } = useContext(CourseContext) as CourseContextType;

  return (
    <section className="dashboard-profile-main-section">
      <div className="dashboard-profile-texts">
        <h3 className="dashboard-profile-welcome-text">Welcome Admin</h3>
        <p className="dashboard-profile-welcome-description">
          Here is the overview of your uploaded courses
        </p>
      </div>
      <div className="dashboard-profile-cards">
        <Link href={"/admin/admin-courses"}>
          <StatusCard
            title={"Total Courses"}
            count={getCountdata.course}
            imageUrl={assessment}
            width={32}
            height={32}
          />
        </Link>
        <Link href={"/admin/admin-course-category"}>
          <StatusCard
            title={"Total Categories"}
            count={getCountdata.category}
            imageUrl={StatusCardGraduationCapIcon}
            width={32}
            height={32}
          />
        </Link>
      </div>
      <div className="dashboard-profile-add-text">
        <p className="dashboard-profile-added-course-text">
          Recently Added Courses
        </p>
      </div>
    </section>
  );
};

export default DashboardProfileSection;
