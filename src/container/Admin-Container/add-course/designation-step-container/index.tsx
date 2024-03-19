// DesignationStepSection.tsx
import React, { FC, useState, useEffect } from "react";
import "./style.css";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";

interface DesignationStepSectionProps {
  category: string;
}

const DesignationStepSection: FC<DesignationStepSectionProps> = ({
  category,
}) => {
  const [division, setDivision] = useState<string[]>([]);
  const [designation, setDesignation] = useState<string[]>([]);
  const categoryCheck = localStorage.getItem("category");

  const handleDivision = (value: string, isChecked: boolean) => {
    setDivision((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleDesignation = (value: string, isChecked: boolean) => {
    setDesignation((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const publishDesignation = async () => {
    try {
      // Check if at least one designation is selected
      if (designation.length === 0) {
        alert("Please select at least one designation.");
        return; // Prevent further execution
      }

      let response;
      if (division.length > 0) {
        response = await fetch(
          "http://localhost:8000/api/admin/dashboard/publishDesignation/B111",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              division: division,
              designation: designation,
            }),
          }
        );
      } else {
        response = await fetch(
          "http://localhost:8000/api/admin/dashboard/publishDesignation/B111",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              designation: designation,
            }),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to publish designation");
      }

      const data = await response.json();
      alert(data.message); // Displaying response message
      console.log("Response:", data);

      // Reset checkbox states
      setDivision([]);
      setDesignation([]);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    console.log("Desingation", designation);
    console.log("Division", division);
  }, [division, designation]);

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
          {categoryCheck === "Medical" || categoryCheck === "Marketing" ? (
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

      <button
        style={{ left: "40px", top: "-200px" }}
        className="designation-public-btn"
        onClick={publishDesignation}
      >
        Publish
      </button>

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
