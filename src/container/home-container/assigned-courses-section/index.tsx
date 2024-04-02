import { FunctionComponent } from "react";
import "./style.css";
import Image from "next/image";
interface HomeAssignedCoursesSectionProps {}
import InfoIcon from "@/public/images/info.svg";

const HomeAssignedCoursesSection: FunctionComponent<
  HomeAssignedCoursesSectionProps
> = () => {
  return (
    <section className="home-assigned-courses-main-section">
      <div className="home-assigned-courses-header-section">
        <div className="home-assigned-courses-text-part">
          <h3 className="home-assigned-courses-text">Assigned Courses</h3>
          <div className="home-assigned-courses-tooltip">
            <Image src={InfoIcon} width={24} height={24} alt="Info" />
            <span className="home-assigned-courses-tooltip-text">
              Complete current course to unlock the next one
            </span>
          </div>
        </div>
        <button className="home-assigned-courses-view-more-text">View More</button>
      </div>
      <div className="home-assigned-courses-card-section"></div>
    </section>
  );
};

export default HomeAssignedCoursesSection;
