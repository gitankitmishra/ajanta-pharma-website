import { FunctionComponent } from "react";
import "./style.css";

interface ThinProgressbarProps {
  progress: number;
  courseName : string;
}

const ThinProgressbar: FunctionComponent<ThinProgressbarProps> = ({
  progress,courseName
}) => {
  return (
    <div className="thin-progressbar-slide-main-section">
        <div className="thin-progressbar-slide-texts">
            <p className="thin-progressbar-slide-course-name-text">{courseName}</p>
            <span className="thin-progressbar-slide-course-count">{progress}%</span>
        </div>
      <div className="thin-progressbar-slide-progress">
        <div
          className="thin-progressbar-slide-progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <p className="progress-value" style={{ display: "none" }}>
            {progress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThinProgressbar;
