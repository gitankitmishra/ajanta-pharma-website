"use client";

import React, { FC, useContext, useEffect, useState } from "react";

import "./style.css";

import DateInputField from "@/components/fields/start-date-input-field";

import InputFieldString from "@/components/fields/string-input-field";

import DropdownInputField from "@/components/fields/dropdown-input-field";

import DropdownSubInputField from "@/components/fields/dropdown-sub-input-field";

import TextAreaField from "@/components/fields/TextAreaField";
import { CourseContext, CourseContextType } from "@/context/course_context";

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
  const { course_basic_error } = useContext(CourseContext) as CourseContextType;

  const { course_basic, handleChange } = useContext(
    CourseContext
  ) as CourseContextType;

  // const { formData, handleChange }: BasicContextType = contextValue;

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
            value={course_basic.course_category}
            onValueChange={(value) => handleChange("course_category", value)}
            options={[
              "Competency Based Skills",
              "Medical",
              "Marketing",
              "Personal Development",
              "Classroom Training",
            ]}
            error={course_basic_error.course_category}
            valueLabel={["Competency Based Skills"]}
          />
        </div>

        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Training Type
          </label>

          <DropdownSubInputField
            placeholder="Select Training Type"
            value={course_basic.course_training}
            onValueChange={(value) => handleChange("course_training", value)}
            selectedCategory={course_basic.course_category} // Pass the selected category
            error={course_basic_error.course_training}
          />
        </div>

        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Course Code
          </label>

          <InputFieldString
            readOnly={true}
            width="80%"
            className="input-field"
            value={course_basic.course_code}
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
            value={course_basic.course_name}
            onChange={(value) => handleChange("course_name", value)}
            className="input-field"
            error={course_basic_error.course_name}
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
          value={course_basic.course_objective}
          onChange={(value) => handleChange("course_objective", value)}
          error={course_basic_error.course_objective}
        />
      </div>

      <div className="basic-div-section3">
        <DateInputField
          startDate={course_basic.course_start_date?.toString() ?? ""}
          endDate={course_basic.course_end_date.toString()}
          onStartDateChange={(value) =>
            handleChange("course_start_date", value)
          }
          onEndDateChange={(value) => handleChange("course_end_date", value)}
          error={course_basic_error.course_start_date}
        />
      </div>
    </section>
  );
};

export default BasicStepSection;
