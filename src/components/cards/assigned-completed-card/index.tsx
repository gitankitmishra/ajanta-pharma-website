import { FunctionComponent } from "react";
import "./style.css";
import { OrangePlayIcon } from "@/components/icons/orange-play-icon";
import { OrangeRefreshIcon } from "@/components/icons/orange-refresh-icon";
import { GreenCheckIcon } from "@/components/icons/green-check-icon";

interface AssignedCompletedCourseCardProps {}

const AssignedCompletedCourseCard: FunctionComponent<
  AssignedCompletedCourseCardProps
> = ({}) => {
  return (
    <div className="assigned-completed-course-card-main-section">
      <div className="assigned-completed-course-card-top-part">
        Course Code BO3
      </div>
      <div className="assigned-completed-course-card-bottom-part">
        <div className="assigned-completed-course-card-bottom-part1">
          <span className="assigned-completed-course-card-bold-text">
            Business Etiquette
          </span>
          <span className="assigned-completed-course-card-duration-text">
            30 mins
          </span>
        </div>
        <div className="assigned-completed-course-card-bottom-course-description-div">
          <p className="assigned-completed-course-card-bottom-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit facilis delectus enim? Natus eius delectus est ipsum
            magnam sequi ex.
          </p>
        </div>
        <div className="assigned-completed-course-card-bottom-part1">
          <div className="assigned-completed-course-card-bottom-div">
            <div className="assigned-completed-course-card-bottom-circle-div">
              <OrangePlayIcon />
            </div>
            <span className="assigned-completed-course-card-bottom-circle-label-span">
              Start
            </span>
          </div>
          <div className="assigned-completed-course-card-bottom-div">
            <div className="assigned-completed-course-card-bottom-circle-green-div">
              <GreenCheckIcon />
            </div>
            <span className="assigned-completed-course-card-bottom-circle-green-label-span">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedCompletedCourseCard;
