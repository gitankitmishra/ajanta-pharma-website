"use client";
import React, {  useContext, useEffect, useState } from "react";
import "./style.css";
import ModuleQuizStepSection from "@/container/Admin-Container/add-course/module-container";
import BasicStepSection from "@/container/Admin-Container/add-course/basic-step-container";
import DesignationStepSection from "@/container/Admin-Container/add-course/designation-step-container";
import UploadStepSection from "@/container/Admin-Container/add-course/upload-step-container";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import { useRouter } from "next/navigation";
import BasicProvider, { BasicContext } from "@/context/course_update/basicInfo_context";
import { DesignationContext } from "@/context/course_update/designation_context";
import { ModuleContext } from "@/context/course_update/module_context";

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
  const basicContextApi = useContext(BasicContext);
  const desingationContextApi=useContext(DesignationContext);
  const {  handleDraftSave }: any = basicContextApi;
  const {publishDesignation}:any=desingationContextApi;


  const moduleContextApi=useContext(ModuleContext);
  const {mergedApi}=moduleContextApi;
const handleApiCall=()=>{
  switch (activeStep) {
    case 0:
      // Call API for basic info
      // Example: handleDraftSave for Basic Info
      handleDraftSave();
      break;
    case 1:
      // Call API for modules
      // Example: mergeapi for Modules
      mergedApi();
      break;
    case 2:
      // Call API for designation
      // Example: publishDesignation for Designation
      publishDesignation();

      break;
    default:
      break;
  }
}


  const [stepContent, setStepContent] = useState<StepContent>({
    Basic: <BasicStepSection   />,
    "Module/Quiz": <ModuleQuizStepSection />,
    Designation: <DesignationStepSection  />,
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
            <NextButton text="Draft" onClick={handleApiCall}/>
          </div>
        ) : null}
        {activeStep === 3 ? (
          <div>
          </div>
        ) : null}

        <div
          className={`${activeStep === steps.length - 1 ? "active" : ""} ${
            activeStep === steps.length - 1 ? "disabled" : ""
          }`}
          onClick={activeStep !== steps.length - 1 ? handleNext : undefined}
        >
          <NextButton text="Next"  onClick={handleApiCall} />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
