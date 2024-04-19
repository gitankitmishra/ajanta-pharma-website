import { FunctionComponent } from "react";
import "./style.css";
import { OrangePlayIcon } from "@/components/icons/orange-play-icon";
import { OrangeRefreshIcon } from "@/components/icons/orange-refresh-icon";
import { GreenCheckIcon } from "@/components/icons/green-check-icon";
import { WhiteLockIcon } from "@/components/icons/white-lock-icon";

interface AssignedLockedCourseCardProps {}

const AssignedLockedCourseCard: FunctionComponent<
  AssignedLockedCourseCardProps
> = ({}) => {
  return (
    <>
      <div className="assigned-locked-course-card-main-section">
        <div className="assigned-locked-course-card-overlay">
          <WhiteLockIcon />
          <span className="assigned-locked-course-card-overlay-big-text-span">LOCKED</span>
          <span className="assigned-locked-course-card-overlay-small-text-span">PUBLISH DATE - 01/04/2023</span>
        </div>
        <div className="assigned-locked-course-card-top-part">
          Course Code BO3
        </div>
        <div className="assigned-locked-course-card-bottom-part">
          <div className="assigned-locked-course-card-bottom-part1">
            <span className="assigned-locked-course-card-bold-text">
              Business Etiquette
            </span>
            <span className="assigned-locked-course-card-duration-text">
              30 mins
            </span>
          </div>
          <div className="assigned-locked-course-card-bottom-course-description-div">
            <p className="assigned-locked-course-card-bottom-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit facilis delectus enim? Natus eius delectus est ipsum
              magnam sequi ex.
            </p>
          </div>
          <div className="assigned-locked-course-card-bottom-part1">
            <div className="assigned-locked-course-card-bottom-div">
              <div className="assigned-locked-course-card-bottom-circle-div">
                <OrangePlayIcon />
              </div>
              <span className="assigned-locked-course-card-bottom-circle-label-span">
                Resume
              </span>
            </div>
            {/* <div className="assigned-locked-course-card-bottom-div">
              <div className="assigned-locked-course-card-bottom-circle-green-div">
                <GreenCheckIcon />
              </div>
              <span className="assigned-locked-course-card-bottom-circle-green-label-span">
                locked
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedLockedCourseCard;
