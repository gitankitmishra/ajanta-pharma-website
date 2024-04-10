// DesignationStepSection.tsx
import React, { FC, useState, useEffect, useContext } from "react";
import "./style.css";
import Checkbox from "@/components/checkbox";
import { CourseContext, CourseContextType } from "@/context/course_context";

interface DesignationStepSectionProps {}

const DesignationStepSection: FC<DesignationStepSectionProps> = () => {
  //calling the context here........
  const { handleChangeDesignation, course_basic, course_designation } =
    useContext(CourseContext) as CourseContextType;

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
        <div>
          {/* {course_basic.course_category === "Medical" ||
          course_basic.course_category === "Marketing" ? ( */}
          <>
            <div className="designation-checkbox-section">
              <Checkbox
                id="division"
                text={"CDC"}
                onChange={handleChangeDesignation}
                value="CDC"
                isChecked={course_designation.division.includes("CDC")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Nuventa"}
                value="Nuventa"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Nuventa")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Revance"}
                value="Revance"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Revance")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Solesta"}
                value="Solesta"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Solesta")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Inovio"}
                value="Inovio"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Inovio")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Anvaxx"}
                value="Anvaxx"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Anvaxx")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Illuma"}
                value="Illuma"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Illuma")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Inyx"}
                value="Inyx"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Inyx")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Ansca"}
                value="Ansca"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Ansca")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Zillion"}
                value="Zillion"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Zillion")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Avecea"}
                value="Avecea"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Avecea")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Axys"}
                value="Axys"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Axys")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Maxcor"}
                value="Maxcor"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Maxcor")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Almiron"}
                value="Almiron"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Almiron")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Mexlon"}
                value="Mexlon"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Mexlon")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
              <Checkbox
                id="division"
                text={"Hospicare"}
                value="Hospicare"
                onChange={handleChangeDesignation}
                isChecked={course_designation.division.includes("Hospicare")}
                disabled={
                  course_basic.course_category !== "Medical" &&
                  course_basic.course_category !== "Marketing"
                }
              />
            </div>
          </>
          {/* ) : null} */}
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
            id="designation"
            text={"Cluster Head- Derma"}
            value="Cluster Head- Derma"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes(
              "Cluster Head- Derma"
            )}
          />
          <Checkbox
            id="designation"
            text={"Cluster Head- Pain"}
            onChange={handleChangeDesignation}
            value="Cluster Head- Pain"
            isChecked={course_designation.designation.includes(
              "Cluster Head- Pain"
            )}
          />
          <Checkbox
            id="designation"
            text={"Sales Head"}
            value="Sales Head"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("Sales Head")}
          />
          <Checkbox
            id="designation"
            text={"Sales Manager"}
            value="Sales Manager"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("Sales Manager")}
          />
          <Checkbox
            id="designation"
            text={"DSM"}
            value="DSM"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("DSM")}
          />
          <Checkbox
            id="designation"
            text={"RSM"}
            value="RSM"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("RSM")}
          />
          <Checkbox
            id="designation"
            text={"DM"}
            value="DM"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("DM")}
          />
          <Checkbox
            id="designation"
            text={"SO"}
            value="SO"
            onChange={handleChangeDesignation}
            isChecked={course_designation.designation.includes("SO")}
          />
        </div>
      </div>
    </section>
  );
};

export default DesignationStepSection;
