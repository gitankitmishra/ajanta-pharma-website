// DesignationStepSection.tsx
import React, { FC, useState, useEffect, useContext } from "react";
import "./style.css";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import { DesignationContext } from "@/context/course_update/designation_context";
import { BasicContext } from "@/context/course_update/basicInfo_context";

interface DesignationStepSectionProps {
}

const DesignationStepSection: FC<DesignationStepSectionProps> = () => {
  const contextValue = useContext(DesignationContext);
  const basicContext=useContext(BasicContext);

  if (!basicContext) {
    return null;
  }
  if (!contextValue) {
    // Handle the case when DesignationContext is null
    return null; // or return a loading indicator or an error message
  }

  const { division, designation, handleDesignation, handleDivision } = contextValue;

  const {formData}=basicContext

 

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
          {formData.course_category === "Medical" || formData.course_category === "Marketing" ? (
            <>
              <div className="designation-checkbox-section">
                <Checkbox
                  text={"CDC"}
                  onChange={handleDivision}
                  isChecked={division.includes("CDC")}
                />
                <Checkbox
                  text={"Nuventa"}
                  onChange={handleDivision}
                  isChecked={division.includes("Nuventa")}
                />
                <Checkbox
                  text={"Revance"}
                  onChange={handleDivision}
                  isChecked={division.includes("Revance")}
                />
                <Checkbox
                  text={"Solesta"}
                  onChange={handleDivision}
                  isChecked={division.includes("Solesta")}
                />
                <Checkbox
                  text={"Inovio"}
                  onChange={handleDivision}
                  isChecked={division.includes("Inovio")}
                />
                <Checkbox
                  text={"Anvaxx"}
                  onChange={handleDivision}
                  isChecked={division.includes("Anvaxx")}
                />
                <Checkbox
                  text={"Illuma"}
                  onChange={handleDivision}
                  isChecked={division.includes("Illuma")}
                />
                <Checkbox
                  text={"Inyx"}
                  onChange={handleDivision}
                  isChecked={division.includes("Inyx")}
                />
                <Checkbox
                  text={"Ansca"}
                  onChange={handleDivision}
                  isChecked={division.includes("Ansca")}
                />
                <Checkbox
                  text={"Zillion"}
                  onChange={handleDivision}
                  isChecked={division.includes("Zillion")}
                />
                <Checkbox
                  text={"Avecea"}
                  onChange={handleDivision}
                  isChecked={division.includes("Avecea")}
                />
                <Checkbox
                  text={"Axys"}
                  onChange={handleDivision}
                  isChecked={division.includes("Axys")}
                />
                <Checkbox
                  text={"Maxcor"}
                  onChange={handleDivision}
                  isChecked={division.includes("Maxcor")}
                />
                <Checkbox
                  text={"Almiron"}
                  onChange={handleDivision}
                  isChecked={division.includes("Almiron")}
                />
                <Checkbox
                  text={"Mexlon"}
                  onChange={handleDivision}
                  isChecked={division.includes("Mexlon")}
                />
                <Checkbox
                  text={"Hospicare"}
                  onChange={handleDivision}
                  isChecked={division.includes("Hospicare")}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* <button
        style={{ left: "40px", top: "-200px" }}
        className="designation-public-btn"
        onClick={publishDesignation}
      >
        Publish
      </button> */}

      <div className="designation-main-div-section">
        <div className="designation-text-section">
          <p className="designation-text">Select Designation</p>
        </div>
        <div className="designation-checkbox-section2">
          <Checkbox
            text={"Cluster Head- Derma"}
            onChange={handleDesignation}
            isChecked={designation.includes("Cluster Head- Derma")}
          />
          <Checkbox
            text={"Cluster Head- Pain"}
            onChange={handleDesignation}
            isChecked={designation.includes("Cluster Head- Pain")}
          />
          <Checkbox
            text={"Sales Head"}
            onChange={handleDesignation}
            isChecked={designation.includes("Sales Head")}
          />
          <Checkbox
            text={"Sales Manager"}
            onChange={handleDesignation}
            isChecked={designation.includes("Sales Manager")}
          />
          <Checkbox
            text={"DSM"}
            onChange={handleDesignation}
            isChecked={designation.includes("DSM")}
          />
          <Checkbox
            text={"RSM"}
            onChange={handleDesignation}
            isChecked={designation.includes("RSM")}
          />
          <Checkbox
            text={"DM"}
            onChange={handleDesignation}
            isChecked={designation.includes("DM")}
          />
          <Checkbox
            text={"SO"}
            onChange={handleDesignation}
            isChecked={designation.includes("SO")}
          />
        </div>
      </div>
    </section>
  );
};

export default DesignationStepSection;
