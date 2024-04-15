import { FC, useContext } from "react";
import "./style.css";
import StatusCard from "@/components/cards/statusCard";
import Question from "@/public/images/question-mark.svg";
import { CourseContext, CourseContextType } from "@/context/course_context";

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
        <StatusCard
          title={"Total Courses"}
          count={getCountdata.course}
          imageUrl={Question}
          width={32}
          height={32}
        />
        <StatusCard
          title={"Total Categories"}
          count={getCountdata.category}
          imageUrl={Question}
          width={32}
          height={32}
        />
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
