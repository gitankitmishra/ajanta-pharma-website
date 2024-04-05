import { FunctionComponent } from "react";
import "./style.css";
import ThinProgressbar from "../thin-progressbar";

interface CategoryProgressbarProps {}

const CategoryProgressbar: FunctionComponent<CategoryProgressbarProps> = () => {
  return (
    <div className="category-progressbar-main-section">
      <div className="category-progressbar-header-part">
        <h3 className="category-progressbar-header-heading-text">
          Category Wise
        </h3>
        <span className="category-progressbar-score-span">Score</span>
      </div>
      <div className="category-progressbar-progressbar-part">
        <ThinProgressbar progress={20} courseName={"Classroom Training"} />
        <ThinProgressbar progress={50} courseName={"Competency Based Skills"} />
        <ThinProgressbar progress={80} courseName={"Medical"} />
        <ThinProgressbar progress={40} courseName={"Marketing"} />
        <ThinProgressbar progress={40} courseName={"Personal Development"} />
      </div>
    </div>
  );
};

export default CategoryProgressbar;
