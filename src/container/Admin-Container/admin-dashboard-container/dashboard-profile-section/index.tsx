import { FC } from "react";
import "./style.css";
import StatusCard from "@/components/cards/statusCard";
import Question from "@/public/images/question-mark.svg"

interface DashboardProfileSectionProps {}

const DashboardProfileSection: FC<DashboardProfileSectionProps> = () => {
  
  return (
    <section className="dashboard-profile-main-section">
      <div className="dashboard-profile-texts">
        <h3 className="dashboard-profile-welcome-text">Welcome Admin</h3>
        <p className="dashboard-profile-welcome-description">
          Here is the overview of your uploaded courses
        </p>
      </div>
      <div className="dashboard-profile-cards">
        <StatusCard  title={"Total Courses"} count={100}  imageUrl={Question}
          width={32}
          height={32}
          />
        <StatusCard  title={"Total Categories"} count={5}  imageUrl={Question}
          width={32}
          height={32}
          />
      </div>
      <div className="dashboard-profile-add-text">
        <p className="dashboard-profile-added-course-text">Recently Added Courses</p>
      </div>
    </section>
  );
};

export default DashboardProfileSection;
