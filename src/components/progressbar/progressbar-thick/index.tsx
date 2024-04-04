import { ProgressbarProfileIcon } from "@/components/icons/progressbar-profile-icon";
import { FunctionComponent } from "react";
import "./style.css";

interface ThickProgressbarProps {
  progress: number;
}

const ThickProgressbar: FunctionComponent<ThickProgressbarProps> = ({
  progress,
}) => {
  return (
    <div className="thick-progressbar-slide">
      <div className="thick-progressbar-slide-progress">
        <div
          className="thick-progressbar-slide-progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="thick-progressbar-profile-icon">
            <ProgressbarProfileIcon />
          </div>
          <p className="thick-progressbar-name-text">xyz</p>
          <p className="progress-value" style={{ display: "none" }}>
            {progress}
          </p>
        </div>
      </div>
      {`${progress}`}
    </div>
  );
};

export default ThickProgressbar;
