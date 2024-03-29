import { FunctionComponent } from "react";
import "./style.css";
import Image from "next/image";

interface ContinueLearningCardProps {
  imageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  percentage: number;
  course_code: string;
  course_name: string;
  course_time:string;
  course_percentage: number;
  progress_count: number;
  total_progress_count :number;
}

const ContinueLearningCard: FunctionComponent<ContinueLearningCardProps> = ({
  imageUrl,
  imageUrl1,
  imageUrl2,
  percentage,
  course_code,
  course_name,
  course_time,
  course_percentage,
  progress_count,
  total_progress_count,
}) => {
  return (
    <div className="continue-learning-card-main-section">
      <div className="continue-learning-card-image-div">
        <Image src={imageUrl} width={70} height={70} alt="Image" />
      </div>
      <div className="continue-learning-card-course-div">
        <p className="continue-learning-card-course-code">{course_code}</p>
        <p className="continue-learning-card-course-name">{course_name}</p>
      </div>
      <div className="continue-learning-card-course-duration-div">
        <p className="continue-learning-card-course-duration-text">Duration</p>
        <p className="continue-learning-card-course-time-text">{course_time}</p>
      </div>
      <div className="continue-learning-card-course-percentage-div">
        <span className="continue-learning-card-course-percentage-text">{course_percentage}%</span>
      </div>
      <div className="continue-learning-card-course-progressbar-div">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="continue-learning-card-course-progress-count-div">
        <span className="continue-learning-card-course-progress-count-text">{progress_count}/{total_progress_count}</span>
      </div>
      <div className="continue-learning-card-course-resume-div">
        <div className="continue-learning-card-course-resume-img">
          <Image src={imageUrl1} alt="" width={24} height={24} />
        </div>
        <p className="continue-learning-card-course-resume-text">Resume</p>
      </div>
      <div className="continue-learning-card-course-restart-div">
        <div className="continue-learning-card-course-restart-img">
          <Image src={imageUrl2} alt="" width={24} height={24} />
        </div>
        <p className="continue-learning-card-course-start-again-text">
          Start Again
        </p>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
