"use client";
import React, { useState, ReactNode, createContext, useEffect } from "react";

export const EditCourseContext = createContext<any | null>(null);
type BasicInfoProps = {
  course_code: string;
  course_name: string;
  course_category: string;
  course_training: string;
  course_objective: string;
  course_start_date: Date;
  course_end_date: Date;
};
export const EditCourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courseCode, setCourseCode] = useState("");
  const [data, setData] = useState("");
  const [basicInfo, setBasicInfo] = useState<BasicInfoProps | null>(null);

  const handleCourseCodeChange = (value: string) => {
    setCourseCode(value);
  };

  const getCourseData = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/dashboard/getCourseByCode/${courseCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Check if the response data contains 'data' and 'course_basic' properties
      if (responseData && responseData.data && responseData.data.course_basic) {
        // Set the 'basicInfo' state with the 'course_basic' data from the response
        setBasicInfo(responseData.data.course_basic);
      } else {
        // Handle the case where the expected data is missing in the response
        console.error("Invalid response format:", responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (courseCode) {
      getCourseData();
    }
  }, [courseCode]);

  const contextValue = {
    handleCourseCodeChange,
    basicInfo,
  };

  return (
    <EditCourseContext.Provider value={contextValue}>
      {children}
    </EditCourseContext.Provider>
  );
};
