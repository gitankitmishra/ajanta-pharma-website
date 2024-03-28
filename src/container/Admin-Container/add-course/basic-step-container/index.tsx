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
  const { basic_information_error } = useContext(
    BasicContext
  ) as BasicContextType;

  if (!contextValue) {
    return null;
  }
  const { formData, handleChange }: BasicContextType = contextValue;

  useEffect(() => {
    localStorage.setItem("category", "Competency-Based Skills");
  }, []);

  //handle change to update the error if the field is updated

  return (
    <section className="basic-main-section">
      <div className="basic-div-section1">
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Category
          </label>

          <DropdownInputField
            placeholder="Select Category"
            value={formData.category}
            onValueChange={(value) => handleChange("category", value)}
            option1={"Competency-Based Skills"}
            option2={"Medical"}
            option3={"Marketing"}
            option4={"Personal Development"}
            option5={"Classroom Training"}
            error={basic_information_error.course_category}
          />
        </div>

        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Training Type
          </label>

          <DropdownSubInputField
            placeholder="Select Training Type"
            value={formData.trainingType}
            onValueChange={(value) => handleChange("trainingType", value)}
            selectedCategory={formData.category} // Pass the selected category
            error={basic_information_error.course_training_type}
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
            value={formData.courseCode}
            onChange={(value) => handleChange("courseCode", value)}
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
            error={basic_information_error.course_name}
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
          value={formData.learningObjectives}
          onChange={(value) => handleChange("learningObjectives", value)}
          error={basic_information_error.course_description}
        />
      </div>

      <div className="basic-div-section3">
        <DateInputField
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={(value) => handleChange("startDate", value)}
          onEndDateChange={(value) => handleChange("endDate", value)}
          error={basic_information_error.start_date}
        />
      </div>
    </section>
  );
};

export default BasicStepSection;
