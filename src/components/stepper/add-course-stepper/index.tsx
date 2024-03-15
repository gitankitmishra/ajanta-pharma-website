"use client";
import React, { useState } from "react";
import "./style.css";
import ModuleQuizStepSection from "@/container/Admin-Container/add-course/module-container";
import BasicStepSection from "@/container/Admin-Container/add-course/basic-step-container";
import DesignationStepSection from "@/container/Admin-Container/add-course/designation-step-container";
import UploadStepSection from "@/container/Admin-Container/add-course/upload-step-container";

type StepContent = {
  [key: string]: React.ReactNode;
};

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic", "Module/Quiz", "Designation", "Upload"];
  const [stepContent, setStepContent] = useState<StepContent>({
    Basic: <BasicStepSection />,
    "Module/Quiz": <ModuleQuizStepSection />,
    Designation: <DesignationStepSection />,
    Upload: <UploadStepSection />,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="stepper-container">
      <div className="step-labels-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-label ${activeStep === index ? "active" : ""}`}
          >
            <div className="step-text">{step}</div>
          </div>
        ))}
      </div>
      <div className="step-separator"></div>
      <div className="step-content">{stepContent[steps[activeStep]]}</div>
      <div className="button-container">
        <button
          className={`${activeStep === 0 ? "active" : ""}`}
          onClick={handleBack}
          disabled={activeStep === 0}
        ></button>
        <button
          className={`${activeStep === steps.length - 1 ? "active" : ""}`}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
