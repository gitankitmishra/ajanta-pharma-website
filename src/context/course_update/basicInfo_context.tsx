"use client";
import { Basicinformation } from "@/types/Basicinformation";
import React, { useState, ReactNode, createContext } from "react";
import { useRouter } from "next/navigation";

export type FormData = {
  category: string;
  trainingType: string;
  courseCode: string;
  courseName: string;
  learningObjectives: string;
  startDate: string;
  endDate: string;
};

export type BasicContextType = {
  active_step: number;
  handleNextClick: () => void;
  handlePreviousClick: () => void;
  //   basic step validation
  basic_information_error: {
    [key: string]: string;
  };
  formData: FormData;
  handleChange: (field: keyof FormData, value: string) => void;
  handleCourseCodeAndNameChange: (value: string) => void;
};

export const BasicContext = createContext<BasicContextType | null>(null);

export const BasicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    category: "",
    trainingType: "",
    courseCode: "",
    courseName: "",
    learningObjectives: "",
    startDate: "",
    endDate: "9999-12-30",
  });

  const handleCourseCodeAndNameChange = (value: string) => {
    console.log(`Changing course code and name to ${value}`);
    // Remove leading and trailing spaces from the input value
    const trimmedValue = value;
    // Split the trimmed value into code and name parts
    const [code, ...nameParts] = trimmedValue.split(" ");
    // Update the state with the trimmed code and the remaining name parts
    setFormData((prev) => ({
      ...prev,
      courseCode: code,
      courseName: nameParts.join(" "),
    }));
  };

  const handleDraftSave = () => {
    fetch(
      "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/publishBasicInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          basicInfo: { ...formData, isActive: false, publishDate: new Date() },
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setFormData({
            category: "",
            trainingType: "",
            courseCode: "",
            courseName: "",
            learningObjectives: "",
            startDate: "",
            endDate: "",
          });
          console.log("Draft saved:", response);
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
      });
  };

  // -------------------------------------------------------------
  // Validation  in next Button of stepper
  const [active_step, setActiveStep] = useState<number>(0);

  const handleNextClick = () => {
    if (active_step === 0) {
      handleStepOneDone();
    } else if (active_step === 1) {
      handleStepTwoDone();
    } else if (active_step === 2) {
      handleStepThreeDone();
    } else if (active_step === 3) {
      handleStepFourDone();
    }
  };

  const handlePreviousClick = () => {
    if (active_step === 0) {
      router.push("/admin/admin-courses"); // Navigate to the course page
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  //  -----------------------------------------------------------------
  // basic-information
  const [basic_information, setBasicInformation] = useState<Basicinformation>({
    courseCode: "",
    courseName: "",
    startDate: "",
    endDate: "",
    category: "",
    learningObjectives: "",
    trainingType: "",
    isActive: true,
    publishDate: new Date(),
  });
  const [basic_information_error, setBasicInformationError] = useState<{
    [key: string]: string;
  }>({
    courseCode: "",
    courseName: "",
    startDate: "",
    endDate: "",
    course_category: "",
    learningObjectives: "",
    trainingType: "",
    isActive: "",
    publishDate: "",
  });
  //   handleStepOneDone Validations (Basic Step)
  const handleStepOneDone = async () => {
    let errors = {};

    if (formData.category.trim().length === 0) {
      errors = { ...errors, course_category: "Select a course category." };
    }

    if (formData.trainingType.trim().length === 0) {
      errors = {
        ...errors,
        course_training_type: "Select a course training type.",
      };
    }
    if (formData.courseName.trim().length === 0) {
      errors = { ...errors, course_name: "Enter a course name." };
    }

    if (formData.learningObjectives.trim().length === 0) {
      errors = { ...errors, course_description: "Enter a short description." };
    }

    if (formData.startDate.trim().length === 0) {
      errors = { ...errors, start_date: "Select start date." };
    }
    setBasicInformationError(errors);

    console.log(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    setActiveStep(1);
  };
  const handleStepTwoDone = () => {
    setActiveStep(2);
  };
  const handleStepThreeDone = () => {
    setActiveStep(3);
  };
  const handleStepFourDone = () => {
    setActiveStep(4);
  };
  const handleChange: BasicContextType["handleChange"] = (field, value) => {
    console.log(`Changing ${field} to ${value}`);
    setFormData((prev) => ({ ...prev, [field]: value }));
    setBasicInformationError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };
  const contextValue = {
    formData,
    handleChange,
    handleDraftSave,
    active_step,
    handleNextClick,
    handlePreviousClick,
    //basic step
    basic_information,
    basic_information_error,
    handleCourseCodeAndNameChange,
  };
  // ------------------------------------------------------------------
  return (
    <BasicContext.Provider value={contextValue}>
      {children}
    </BasicContext.Provider>
  );
};

export default BasicProvider;
