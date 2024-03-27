"use client"
import React, { useState, ReactNode, createContext, useEffect } from "react";

export type FormData = {
  course_code: string;
  course_name: string;
  course_category: string;
  course_training: string;
  course_objective: string;
  course_start_date: string; 
  course_end_date: string; 
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
  const [prevID,setprevID]=useState(0);
  const [formData, setFormData] = useState<FormData>({
    course_code: "",
    course_name: "",
    course_category: "",
    course_training: "",
    course_objective: "",
    course_start_date: "", // Change to empty string
    course_end_date: "9999-12-09",
  });

  const handleChange: BasicContextType["handleChange"] = async (field, value) => {
    console.log(`Changing ${field} to ${value}`);
    if (field === "course_category") {
      try {
        const newPrevID = await generateNewPrevID(value, prevID);
        setprevID(newPrevID);
        const newCourseCode = generateCourseCode(value, newPrevID);
        setFormData((prev) => ({ ...prev, [field]: value, course_code: newCourseCode }));
      } catch (error) {
        console.error('Error occurred while updating prevID:', error);
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };
  
  useEffect(()=>{
    console.log("FormData",formData);
    
  },[formData])


  const generateCourseCode = (category: string, prevID: number | null = null): string => {
    const categoryTable: { [key: string]: string } = {
      "Competency-Based-Skills": "CBS",
      "Medical": "MED",
      "Marketing": "MKT",
      "Personal Development": "PD",
      "Classroom Training": "CT"
    };

    const currentDate: Date = new Date();
    const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year: string = String(currentDate.getFullYear()).slice(-2);

    let id: string;
    if (prevID !== null && prevID !== undefined) {
      id = String(Number(prevID) + 1).padStart(2, '0');
    } else {
      id = "01";
    }

    const courseCode: string = `${categoryTable[category]}-${month}${year}-${id}`;
    return courseCode;
  }

  const handleDraftSave = () => {
    fetch(
      "http://localhost:8000/api/admin/dashboard/publishBasicInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_basic: { ...formData, isActive: false, publishDate: new Date() },
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {

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



  const generateNewPrevID = async (value: string, prevID: number): Promise<number> => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/dashboard/getCourseCodeCount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseCategory: value,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const count = data.categoryCount;
      // Assuming the response contains a property called 'count'
      console.log("Data acquired", data);
      // Now you can use the 'count' value as needed
      return count ; // Increment the count and return
    } catch (error) {
      console.error('Error fetching data:', error);
      // Return previous ID in case of error
      return prevID; 
    }
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
