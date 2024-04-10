import { FunctionComponent } from "react";
import "./style.css";
import { ListIcon } from "@/components/icons/list-icon";
import ManagerSearchField from "@/components/fields/manager-search-field";
import { FilterIcon } from "@/components/icons/filter-icon";
import PieChartCard from "@/components/cards/pieChart-card";
import PerformersProgressbar from "@/components/progressbar/performers-progressbar";
import CategoryProgressbar from "@/components/progressbar/category-progressbar";
import SpeedometerChart from "@/components/speedometer";
import Speedometer from "@/components/speedometer";

interface TeamPerformanceProfileContainerProps {}

const TeamPerformanceProfileContainer: FunctionComponent<
  TeamPerformanceProfileContainerProps
> = () => {
  return (
    <section className="team-performance-profile-main-container">
      {/* -------------Header Section-------------------------*/}
      <div className="team-performance-profile-header-section">
        <div className="team-performance-profile-header-section-text-part">
          <h3 className="team-performance-profile-heading-text">
            Welcome Anushka
          </h3>
          <p className="team-performance-profile-description-text">
            Here is the overview of your team
          </p>
        </div>
        <div className="team-performance-profile-header-section-btn-part">
          <button className="team-performance-profile-button">
            <ListIcon />
            Team Report
          </button>
        </div>
      </div>
      {/* ------------------------Search and Filter Section----------------------- */}
      <div className="team-performance-profile-search-filter-section">
        <div className="team-performance-profile-search-part">
          <ManagerSearchField />
        </div>
        <div className="team-performance-profile-filter-part">
          <button className="team-performance-profile-filter-button">
            <FilterIcon />
            Filter
          </button>
        </div>
      </div>
      {/* --------------------------Pie Chart Section--------------------------- */}
      {/* <div className="team-performance-profile-piechart-section">
        <div className="team-performance-profile-piechart">
          <PieChartCard
            labels={["Pune", "Nashik", "Mumbai", "Gujrat"]}
            values={[200, 120, 57, 35]}
            heading={" Headquarter Wise Status"}
          />
        </div>
        <div className="team-performance-profile-piechart">
          <PieChartCard
            labels={["DSM", "DM", "RSM", "SO"]}
            values={[20, 12, 7, 5]}
            heading={" Designation Wise Status "}
          />
        </div>
      </div> */}
      {/* -------------------Progress bar section ----------------------- */}
      <div className="team-performance-profile-progressbar-section">
        {/* <PerformersProgressbar />
        <CategoryProgressbar/> */}
      </div>
      {/* ------------------------ Speedometer Section------------------- */}
      <div className="team-performance-profile-speedometer-section">
        <Speedometer/>
      </div>
    </section>
  );
};

export default TeamPerformanceProfileContainer;
