"use client";

import React, { FC, useContext, useEffect, useState } from "react";

import "./style.css";

import DateInputField from "@/components/fields/start-date-input-field";

import InputFieldString from "@/components/fields/string-input-field";

import DropdownInputField from "@/components/fields/dropdown-input-field";

import DropdownSubInputField from "@/components/fields/dropdown-sub-input-field";
import {
  BasicContext,
  BasicContextType,
} from "@/context/course_update/basicInfo_context";
import TextAreaField from "@/components/fields/TextAreaField";

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

const BasicStepSection: FC<BasicStepSectionProps> = () => {
  const contextValue = useContext(BasicContext);

  if (!contextValue) {
    return null;
  }
  const { formData, handleChange }: BasicContextType = contextValue;

  useEffect(() => {
    localStorage.setItem("category", "Competency-Based Skills");
  }, []);

  return (
    <section className="basic-main-section">
      <div className="basic-div-section1">
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Category
          </label>

          <DropdownInputField
            placeholder="Select Category"
            value={formData.course_category}
            onValueChange={(value) => handleChange("course_category", value)}
            option1={"Competency-Based-Skills"}
            option2={"Medical"}
            option3={"Marketing"}
            option4={"Personal Development"}
            option5={"Classroom Training"}
          />
        </div>

        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Training Type
          </label>

          <DropdownSubInputField
            placeholder="Select Training Type"
            value={formData.course_training}
            onValueChange={(value) => handleChange("course_training", value)}
            selectedCategory={formData.course_category} // Pass the selected category
          />
        </div>

        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Course Code
          </label>

          <InputFieldString
            readonly
            width="80%"
            className="input-field"
            value={formData.course_code}
            onChange={(value) => handleChange("course_code", value)}
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Course Name
          </label>

          <InputFieldString
            placeholder="Enter Course Name"

            width="80%"
            value={formData.courseName}
            onChange={(value) => handleChange("courseName", value)}

            className="input-field"
          />
        </div>
      </div>

      <div className="basic-div-section2">
        <label htmlFor="" className="basic-section-labels">
          Learning Objective
        </label>

        <TextAreaField
          placeholder="Enter Learning Objective"
          className="basic-learning-objective-input"
          value={formData.course_objective}
          onChange={(value) => handleChange("course_objective", value)}
        />
      </div>

      <div className="basic-div-section3">
        <DateInputField
          startDate={formData.course_start_date}
          endDate={formData.course_end_date}
          onStartDateChange={(value) => handleChange("course_start_date", value)}
          onEndDateChange={(value) => handleChange("course_end_date", value)}
        />
      </div>
    </section>
  );
};

export default BasicStepSection;
