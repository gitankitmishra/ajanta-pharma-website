import { FunctionComponent } from "react";
import "./style.css";
import { ProgressbarProfileIcon } from "@/components/icons/progressbar-profile-icon";
import ThickProgressbar from "../progressbar-thick";

interface PerformersProgressbarProps {

}

const PerformersProgressbar: FunctionComponent<PerformersProgressbarProps> = ({
 
}) => {
  return (
    <div className="performers-progressbar-main-section">
      <div className="performers-progressbar-header-part">
        <h3 className="performers-progressbar-header-heading-text">
          Top Performers
        </h3>
        <span className="performers-progressbar-score-span">Score</span>
      </div>
      <div className="performers-progressbar-progressbar-part">
        <p className="performers-progressbar-course-name-text">
          Course- BO1 Business Etiquette
        </p>
        <div className="performers-progressbar-thick-progressbar-part">
          <ThickProgressbar progress={80} />
          <ThickProgressbar progress={70} />
          <ThickProgressbar progress={58} />
          <ThickProgressbar progress={46} />
          <ThickProgressbar progress={35} />
          <ThickProgressbar progress={20} />
        </div>
      </div>
    </div>
  );
};

export default PerformersProgressbar;
