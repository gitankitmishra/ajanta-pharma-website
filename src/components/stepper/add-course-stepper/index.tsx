"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import ModuleQuizStepSection from "@/container/Admin-Container/add-course/module-container";
import BasicStepSection from "@/container/Admin-Container/add-course/basic-step-container";
import DesignationStepSection from "@/container/Admin-Container/add-course/designation-step-container";
import UploadStepSection from "@/container/Admin-Container/add-course/upload-step-container";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import { useRouter } from "next/navigation";

type StepContent = {
  [key: string]: React.ReactNode;
};

const Stepper = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic", "Module/Quiz", "Designation", "Upload"];
  const [category, setCategory] = useState("");
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const [stepContent, setStepContent] = useState<StepContent>({
    Basic: <BasicStepSection onCategoryChange={handleCategoryChange} />,
    "Module/Quiz": <ModuleQuizStepSection />,
    Designation: <DesignationStepSection category={category} />,
    Upload: <UploadStepSection />,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      router.push("/admin/admin-courses"); // Navigate to the course page
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  useEffect(() => {
    console.log("categoyyyyyyyyyyyyyyyyyyyyyyyyyy", category);
  }, [category]);
  return (
    <div className="stepper-container">
      <div className="step-labels-container">
        {steps.map((step, index) => (
          <>
            <div className="steps-text-and-underline-combined-container">
              <div
                key={index}
                className={`steps-title ${
                  activeStep === index ? "active-step" : ""
                }`}
              >
                {step}
              </div>

              <div
                className={`${
                  activeStep === index ? "active-step-underline" : ""
                }`}
              ></div>
            </div>
            {index < steps.length - 1 && (
              <div className="steps-dashed-line"></div>
            )}
          </>
        ))}
      </div>
      <div className="step-separator"></div>
      <div className="step-content">{stepContent[steps[activeStep]]}</div>
      <div className="button-container">
        <div
          className={`${activeStep === 0 ? "active" : ""} ${
            activeStep === 0 ? "disabled" : ""
          }`}
          onClick={handleBack}
        >
          <PreviousButton text={activeStep === 0 ? "Discard" : "Previous"} />
        </div>
        {activeStep === 0 || activeStep === 1 || activeStep === 2 ? (
          <div>
            <NextButton text="Draft" />
          </div>
        ) : null}
        {activeStep === 3 ? (
          <div>
            <NextButton text="Publish" />
          </div>
        ) : null}

        <div
          className={`${activeStep === steps.length - 1 ? "active" : ""} ${
            activeStep === steps.length - 1 ? "disabled" : ""
          }`}
          onClick={activeStep !== steps.length - 1 ? handleNext : undefined}
        >
          <NextButton text="Next" />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
