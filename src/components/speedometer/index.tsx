import { FunctionComponent } from "react";
import "./style.css";

interface SpeedometerProps {}

const Speedometer: FunctionComponent<SpeedometerProps> = () => {
  
  return <div className="speedometer-main-section">
    <div className="speedometer-heading-section">
      <p className="speedometer-header-text">Team Wise</p>
      <span className="speedometer-score-text-span">Score</span>
    </div>
    <div className="speedometer-graph-section"></div>
  </div>;
};

export default Speedometer;
