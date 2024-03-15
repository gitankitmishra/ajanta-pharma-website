import React, { FC, useEffect, useState } from "react";
import "./style.css";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import DateInputField from "@/components/fields/start-date-input-field";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import Link from "next/link";
import InputFieldString from "@/components/fields/string-input-field";

interface BasicStepSectionProps {}

interface FormData {
  category: string;
  trainingType: string;
  courseCode: string;
  courseName: string;
  learningObjectives: string;
  startDate: string;
  endDate: string;
}

const BasicStepSection: FC<BasicStepSectionProps> = ({}) => {
  const [formData, setFormData] = useState<FormData>({
    category: "Multiple Choice Question",
    trainingType: "Bussiness Orientation",
    courseCode: "",
    courseName: "",
    learningObjectives: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCourseCodeAndNameChange = (value: string) => {
    const [code, ...nameParts] = value.split(" ");
    setFormData({
      ...formData,
      courseCode: code,
      courseName: nameParts.join(" "),
    });
  };

  const handleDraftSave = () => {
    // Call API to save form data as draft
    fetch("http://localhost:8000/api/admin/dashboard/publishBasicInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({basicInfo:{ ...formData, isActive: false, publishDate: new Date() }}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Draft saved:", data);
        // Optionally handle success response
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
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
            option1={"Multiple Choice Question"}
            option2={"Single Choice Question"}
            option3={"True or False"}
            option4={"Short Answer"}
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select trainingType
          </label>
          <DropdownInputField
            value={formData.trainingType}
            onValueChange={(value) => handleChange("trainingType", value)}
            option1={"Bussiness Orientation"}
            option2={"Customer Orientation"}
            option3={"Operation Excellence and analytics"}
            option4={"Leadership"}
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
      <div className="basic-div-section4">
        <Link href="/admin/admin-courses">
          <PreviousButton text={"Discard"} />
        </Link>
        <button className="draft-button" onClick={handleDraftSave}>
          Save as Draft
        </button>
        <NextButton text={"Next"} />
      </div>
    </section>
  );
};

export default BasicStepSection;
