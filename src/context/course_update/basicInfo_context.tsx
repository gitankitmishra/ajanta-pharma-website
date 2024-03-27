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
  handleDraftSave: () => void;
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
    if (field === "category") {
      const newCourseCode = generateCourseCode(value);
      setFormData((prev) => ({ ...prev, [field]: value, courseCode: newCourseCode }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    console.log("Course Details : ", formData);
  }, [formData]);

  const generateCourseCode = (category: string, prevID: string | null = null): string => {
    const categoryTable: { [key: string]: string } = {
      "Competency-Based Skills": "CBS",
      "Medical": "MED",
      "Marketing": "MKT",
      "Personal Development": "PD",
      "Classroom Training": "CT"
    };

    const currentDate: Date = new Date();
    const month: string = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero if month is single digit
    const year: string = String(currentDate.getFullYear()).slice(-2); // Taking last two digits of the year

    let id: string;
    if (prevID !== null && prevID !== undefined) {
      id = String(Number(prevID) + 1).padStart(2, '0'); // Incrementing previous ID by 1
    } else {
      id = "01";
    }

    const courseCode: string = `${categoryTable[category]}-${month}${year}-${id}`;
    return courseCode;
  }

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
