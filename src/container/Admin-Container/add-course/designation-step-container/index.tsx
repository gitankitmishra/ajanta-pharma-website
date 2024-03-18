import { FC } from "react";
import "./style.css";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";

interface DesignationStepSectionProps {}

const DesignationStepSection: FC<DesignationStepSectionProps> = () => {
  return (
    <section className="designation-main-section">
      <div className="designation-main-div-section">
        <div className="designation-text-section">
          <p className="designation-text">
            Select Divisions{" "}
            <span className="designation-span">
              *Only applicable for Medical & Marketing*
            </span>
          </p>
        </div>
        <div className="designation-checkbox-section">
          <Checkbox text={"CDC"} />
          <Checkbox text={"Nuventa"} />
          <Checkbox text={"Revance"} />
          <Checkbox text={"Solesta"} />
          <Checkbox text={"Inovio"} />
          <Checkbox text={"Anvaxx"} />
          <Checkbox text={"Illuma"} />
          <Checkbox text={"Inyx"} />
          <Checkbox text={"Ansca"} />
          <Checkbox text={"Zillion"} />
          <Checkbox text={"Avecea"} />
          <Checkbox text={"Axys"} />
          <Checkbox text={"Maxcor"} />
          <Checkbox text={"Almiron"} />
          <Checkbox text={"Mexlon"} />
          <Checkbox text={"Hospicare"} />
        </div>
      </div>

      <div className="designation-main-div-section">
        <div className="designation-text-section">
          <p className="designation-text">
          Select Designation
           
          </p>
        </div>
        <div className="designation-checkbox-section2">
          <Checkbox text={"Cluster Head- Cardiac"} />
          <Checkbox text={"Cluster Head- Ophthal"} />
          <Checkbox text={"Cluster Head- Derma"} />
          <Checkbox text={"Cluster Head- Pain"} />
          <Checkbox text={"Sales Head"} />
          <Checkbox text={"Sales Manager"} />
          <Checkbox text={"DSM"} />
          <Checkbox text={"RSM"} />
          <Checkbox text={"DM"} />
          <Checkbox text={"SO"} />
        </div>
      {/* <div className="designation-btn-section">
        <PreviousButton text={"Previous"}/>
        <NextButton text={"Next"}/>
      </div> */}
      </div>
    </section>
  );
};

export default DesignationStepSection;
