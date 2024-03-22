"use client";

import React, { FC, useContext, useEffect, useState } from "react";

import "./style.css";

import DateInputField from "@/components/fields/start-date-input-field";

import PreviousButton from "@/components/buttons/previous-button";

import NextButton from "@/components/buttons/next-button";

import Link from "next/link";

import InputFieldString from "@/components/fields/string-input-field";

import DropdownInputField from "@/components/fields/dropdown-input-field";

import DropdownSubInputField from "@/components/fields/dropdown-sub-input-field";
import { BasicContext, BasicContextType } from "@/context/course_update/basicInfo_context";

interface BasicStepSectionProps {
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

const BasicStepSection: FC<BasicStepSectionProps> = () => {
      const contextValue=useContext(BasicContext);

      if (!contextValue) {
        return null;
      }
      const { formData, handleChange, handleCourseCodeAndNameChange }:BasicContextType=contextValue;




  useEffect(() => {
    localStorage.setItem("category", "Competency-Based Skills");
  }, []);

  useEffect(() => {
    switch (formData.category) {
      case "Competency-Based Skills":
        handleChange("trainingType", "Business Orientation");
        break;
      case "Medical":
        handleChange("trainingType", "Medical");
        break;
      case "Marketing":
        handleChange("trainingType", "Brand Detailing");
        break;
      case "Personal Development":
        handleChange("trainingType", "Communication");
        break;
      case "Classroom Training":
        handleChange("trainingType", "Medical Representative");
        break;
      default:
        break;
    }
  }, [formData.category]);


  

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
        <div className="draft-button-placement">
          {/* <button className="basic-draft-button" onClick={handleDraftSave}>
            Draft
          </button> */}
          </div>
        </div>

      {/* <div className="basic-div-section4">
        <Link href="/admin/admin-courses">
        <PreviousButton text={"Discard"} />
        </Link> */}

      {/* <button className="basic-draft-button" onClick={handleDraftSave}>
            Save as Draft
          </button> */}
      {/* 
        <NextButton text={"Next"} />
      </div> */}
    </section>
  );
};

export default BasicStepSection;