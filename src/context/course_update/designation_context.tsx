"use client"

import React, { useState, ReactNode, createContext, useContext } from "react";
import { BasicContext } from "./basicInfo_context";

export type DesignationContextType = {
    publishDesignation: () => void;
    division: string[];
    designation: string[];
    handleDivision: (value: string, isChecked: boolean) => void;
    handleDesignation: (value: string, isChecked: boolean) => void;
}


export const DesignationContext = createContext<DesignationContextType | null>(null);

export const DesignationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [division, setDivision] = useState<string[]>([]);
    const [designation, setDesignation] = useState<string[]>([]);
    const categoryValue=useContext(BasicContext);

    if (!categoryValue) { 
        return null;
    }
const {formData}=categoryValue;


let courseCode=formData.course_code;
    const handleDivision = (value: string, isChecked: boolean) => {
        setDivision((prev) => {
            if (isChecked) {
                return [...prev, value];
            } else {
                return prev.filter((item) => item !== value);
            }
        });
    };

    const handleDesignation = (value: string, isChecked: boolean) => {
        setDesignation((prev) => {
            if (isChecked) {
                return [...prev, value];
            } else {
                return prev.filter((item) => item !== value);
            }
        });
    };
        
    const publishDesignation = async () => {
        try {
            if (designation.length === 0) {
                alert("Please select at least one designation.");
                return;
            }

            let response;
            if (division.length > 0) {
                response = await fetch(
                    `http://localhost:8000/api/admin/dashboard/publishDesignation/${courseCode}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            division: division,
                            designation: designation,
                        }),
                    }
                );
            } else {
                response = await fetch(
                    `http://localhost:8000/api/admin/dashboard/publishDesignation/${courseCode}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            designation: designation,
                        }),
                    }
                );
            }
            console.log("data check",formData.course_category);

            if (!response.ok) {
                throw new Error("Failed to publish designation");
            }

            const data = await response.json();
            alert(data.message);
            setDivision([]);
            setDesignation([]);
        } catch (error: any) {
            console.error("Error:", error.message);
        }
    };

    const contextValue = {
        publishDesignation,
        division,
        designation,
        handleDivision,
        handleDesignation,
    };

    return (
        <DesignationContext.Provider value={contextValue}>
            {children}
        </DesignationContext.Provider>                                                              
    );
};

export default DesignationProvider;
