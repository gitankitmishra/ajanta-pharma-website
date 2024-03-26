"use client";
import React, { useState, ReactNode, createContext, useEffect } from "react";

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
  formData: FormData;
  handleChange: (field: keyof FormData, value: string) => void;
};

export const BasicContext = createContext<BasicContextType | null>(null);

export const BasicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    trainingType: "",
    courseCode: "CBS-04-2024",
    courseName: "",
    learningObjectives: "",
    startDate: "",
    endDate: "9999-12-09",
  });

  const handleChange: BasicContextType["handleChange"] = (field, value) => {
    console.log(`Changing ${field} to ${value}`);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("Course Details : ", formData);
  }, [formData]);

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
            category: "Competency-Based Skills",
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

  const contextValue = {
    formData,
    handleChange,
    handleDraftSave,
  };

  return (
    <BasicContext.Provider value={contextValue}>
      {children}
    </BasicContext.Provider>
  );
};

export default BasicProvider;
