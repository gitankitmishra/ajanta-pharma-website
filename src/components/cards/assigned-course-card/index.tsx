import { FunctionComponent } from "react";
import "./style.css";
import { OrangePlayIcon } from "@/components/icons/orange-play-icon";
import { OrangeRefreshIcon } from "@/components/icons/orange-refresh-icon";

interface AssignedCourseCardProps {
  percentage: number;
}

const AssignedCourseCard: FunctionComponent<AssignedCourseCardProps> = ({
  percentage,
}) => {
  return (
    <div className="assigned-course-card-main-section">
      <div className="assigned-course-card-top-part">
        <span className="assigned-courses-card-title-span">
          Course Code BO3
        </span>
      </div>
      <div className="assigned-course-card-bottom-part">
        <div className="assigned-course-card-bottom-part1">
          <span className="assigned-course-card-bold-text">
            Business Etiquette
          </span>
          <span className="assigned-course-card-duration-text">30 mins</span>
        </div>
        <div className="assigned-course-card-bottom-course-progressbar-div">
          <div
            className="assigned-course-card-bottom-progress"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="assigned-course-card-bottom-part1">
          <div className="assigned-course-card-bottom-div">
            <div className="assigned-course-card-bottom-circle-div">
              <OrangePlayIcon />
            </div>
            <span className="assigned-course-card-bottom-circle-label-span">
              Resume
            </span>
          </div>
          <div className="assigned-course-card-bottom-div">
            <div className="assigned-course-card-bottom-circle-div">
              <OrangeRefreshIcon />
            </div>
            <span className="assigned-course-card-bottom-circle-label-span">
              Start Again
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedCourseCard;
