"use client"
import React, { FC, useEffect, useState } from "react";
import "./style.css";
import DateInputField from "@/components/fields/start-date-input-field";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import Link from "next/link";
import InputFieldString from "@/components/fields/string-input-field";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import DropdownSubInputField from "@/components/fields/dropdown-sub-input-field";

interface BasicStepSectionProps {
  onCategoryChange: (value: string) => void; // Add onCategoryChange prop
}

interface FormData {
  category: string;
  trainingType: string;
  courseCode: string;
  courseName: string;
  learningObjectives: string;
  startDate: string;
  endDate: string;
}

const BasicStepSection: FC<BasicStepSectionProps> = ({ onCategoryChange }) => {
  const [formData, setFormData] = useState<FormData>({
    category: "Competency-Based Skills",
    trainingType: "",
    courseCode: "",
    courseName: "",
    learningObjectives: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "category") {
      onCategoryChange(value); 
      localStorage.setItem("category",value);
    }
  };
  useEffect(() => {
    localStorage.setItem("category", "Competency-Based Skills");
  }, []);
  const handleCourseCodeAndNameChange = (value: string) => {
    // Remove leading and trailing spaces from the input value
    const trimmedValue = value;
  
    // Split the trimmed value into code and name parts
    const [code, ...nameParts] = trimmedValue.split(" ");
  
    // Update the state with the trimmed code and the remaining name parts
    setFormData((prev) => ({
      ...prev,
      courseCode: code,
      courseName: nameParts.join(" "),
    }));
  
    
  };
  

  const handleDraftSave = () => {
    // Call API to save form data as draft
    fetch("http://localhost:8000/api/admin/dashboard/publishBasicInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basicInfo: { ...formData, isActive: false, publishDate: new Date() },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Draft saved:", data);
        alert(data.message);
        // Optionally handle success response
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
        // Optionally handle error
      });
  };

  const handlePublish = () => {
    // Call API to publish form data
    fetch("http://localhost:8000/api/admin/dashboard/publishBasicInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basicInfo: { ...formData, isActive: true, publishDate: new Date() },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Published:", data);
        alert(data);
        // Optionally handle success response
      })
      .catch((error) => {
        console.error("Error publishing:", error);
        // Optionally handle error
      });
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  return (
    <section className="basic-main-section">
      <div className="basic-div-section1">
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Category
          </label>
          <DropdownInputField
            value={formData.category}
            onValueChange={(value) => handleChange("category", value)}
            option1={"Competency-Based Skills"}
            option2={"Medical"}
            option3={"Marketing"}
            option4={"Personal Development"}
            option5={"Classroom Training"}
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select trainingType
          </label>
          <DropdownSubInputField
            value={formData.trainingType}
            onValueChange={(value) => handleChange("trainingType", value)}
            selectedCategory={formData.category} // Pass the selected category
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Course Code & Name
          </label>
          <InputFieldString
            className="input-field"
            value={formData.courseCode + " " + formData.courseName}
            onChange={handleCourseCodeAndNameChange}
          />
        </div>
      </div>
      <div className="basic-div-section2">
        <label htmlFor="" className="basic-section-labels">
          Learning Objective
        </label>
        <InputFieldString
          className="basic-learning-objective-input"
          value={formData.learningObjectives}
          onChange={(value) => handleChange("learningObjectives", value)}
        />
      </div>
      <div className="basic-div-section3">
        <DateInputField
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={(value) => handleChange("startDate", value)}
          onEndDateChange={(value) => handleChange("endDate", value)}
        />
      </div>
      {/* <div className="basic-div-section4">
        <Link href="/admin/admin-courses">
          <PreviousButton text={"Discard"} />
        </Link> */}
        <button className="basic-draft-button" onClick={handleDraftSave}>
          Save as Draft
        </button>

        {/* <NextButton text={"Next"} />
      </div> */}

        <button className="publish-button" onClick={handlePublish}>
          Publish
        </button>
        <NextButton text={"Next"} />
      </div>

    </section>
  );
};

export default BasicStepSection;
