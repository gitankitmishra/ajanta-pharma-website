"use client";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import ModuleQuizStepSection from "@/container/Admin-Container/add-course/module-container";
import BasicStepSection from "@/container/Admin-Container/add-course/basic-step-container";
import DesignationStepSection from "@/container/Admin-Container/add-course/designation-step-container";
import UploadStepSection from "@/container/Admin-Container/add-course/upload-step-container";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import { useRouter } from "next/navigation";

import { CourseContext, CourseContextType } from "@/context/course_context";
import SuccessPopup from "@/components/popups/success-popup";
import AddNotificationPopup from "@/components/popups/add-notification-popup";
import ConfirmationPopup from "@/components/popups/add-courses-popup/confirmation-popup";

type StepContent = {
  [key: string]: React.ReactNode;
};

const Stepper = () => {
  const router = useRouter();
  // const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic", "Module/Quiz", "Designation", "Upload"];
  const [category, setCategory] = useState("");
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const { active_step, handleNextClick, handlePreviousClick } = useContext(
    CourseContext
  ) as CourseContextType; //Basic Context
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Logic to take the activeStep for the Draft login
  // const handleApiCall = () => {
  //   switch (active_step) {
  //     case 0:
  //       // Call API for basic info
  //       // Example: handleDraftSave for Basic Info
  //       handleDraftSave();
  //       break;
  //     case 1:
  //       // Call API for modules
  //       // Example: mergeapi for Modules
  //       mergedApi();
  //       break;
  //     case 2:
  //       // Call API for designation
  //       // Example: publishDesignation for Designation
  //       publishDesignation();

  //       break;
  //     default:
  //       break;
  //   }
  // };

  const stepContent: StepContent = {
    Basic: <BasicStepSection />,
    "Module/Quiz": <ModuleQuizStepSection />,
    Designation: <DesignationStepSection />,
    Upload: <UploadStepSection />,
  };

  useEffect(() => {
    localStorage.setItem("activeStep", JSON.stringify(active_step));
  }, [active_step]);

  return (
    <div className="stepper-container">
      <div className="step-labels-container">
        {steps.map((step, index) => (
          <>
            <div className="steps-text-and-underline-combined-container">
              <div
                key={index}
                className={`steps-title ${
                  active_step === index ? "active-step" : ""
                }`}
              >
                {step}
              </div>

              <div
                className={`${
                  active_step === index ? "active-step-underline" : ""
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
      <div className="step-content">{stepContent[steps[active_step]]}</div>
      <div className="button-container">
        <div
          className={`${active_step === 0 ? "active" : ""} ${
            active_step === 0 ? "disabled" : ""
          }`}
          onClick={handlePreviousClick}
        >
          <PreviousButton text={active_step === 0 ? "Discard" : "Previous"} />
        </div>
        {/* {activeStep === 0 || activeStep === 1 || activeStep === 2 ? (
          <div>
            <NextButton text="Draft" onClick={handleApiCall}/>
          </div>
        ) : null}
        {activeStep === 3 ? (
          <div>
          </div>
        ) : null} */}

        <div
          className={`${active_step === steps.length - 1 ? "active" : ""} ${
            active_step === steps.length - 1 ? "disabled" : ""
          }`}
        >
          <NextButton
            text={
              active_step === 2
                ? "Preview"
                : active_step === 3
                ? "Submit"
                : "Next"
            }
            onClick={active_step === 3 ? handleUploadClick : handleNextClick}
          />
        </div>
        {active_step !== 0 && active_step !== 3 && (
          <div>
            <PreviousButton
              text="Save as Draft"
              width="168px"
              onClick={handleNextClick}
            />
          </div>
        )}
      </div>
      <ConfirmationPopup open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Stepper;
