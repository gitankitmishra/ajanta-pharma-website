"use client";
import React, { useState } from "react";
import "./style.css";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import NextButton from "@/components/buttons/next-button";
import PreviousButton from "@/components/buttons/previous-button";
import ModuleQuizStepSection from "@/container/Admin-Container/add-course/module-container";
// import StepComponent1 from "./StepComponent1";

// import StepComponent3 from "./StepComponent3";
// import StepComponent4 from "./StepComponent4";

type StepContent = {
  [key: string]: React.ReactNode;
};

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic", "Module/Quiz", "Designation", "Upload"];
  const [stepContent, setStepContent] = useState<StepContent>({
    // Basic: <StepComponent1 />,
    "Module/Quiz": <ModuleQuizStepSection />,
    // Designation: <StepComponent3 />,
    // Upload: <StepComponent4 />,
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
        >
          Back
        </button>
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
