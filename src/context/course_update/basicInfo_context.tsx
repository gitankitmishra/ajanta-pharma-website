"use client"
import React, { useState, ReactNode, createContext } from "react";

export type FormData = {
    category: string;
    trainingType: string;
    courseCode: string;
    courseName: string;
    learningObjectives: string;
    startDate: string;
    endDate: string;
}

export type BasicContextType = {
    formData: FormData;
    handleChange: (field: keyof FormData, value: string) => void;
    handleCourseCodeAndNameChange: (value: string) => void;
}

export const BasicContext = createContext<BasicContextType | null>(null);

export const BasicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        category: "Competency-Based Skills",
        trainingType: "",
        courseCode: "",
        courseName: "",
        learningObjectives: "",
        startDate: "",
        endDate: "",
    });

    const handleChange: BasicContextType['handleChange'] = (field, value) => {
        console.log(`Changing ${field} to ${value}`);
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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
        fetch("https://ajanta-pharma-server.vercel.app/api/admin/dashboard/publishBasicInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                basicInfo: { ...formData, isActive: false, publishDate: new Date() },
            }),
        })
            .then(response => {
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
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Error saving draft:", error);
            });
    };

    const contextValue = {
        formData,
        handleChange,
        handleDraftSave,
        handleCourseCodeAndNameChange
    };

    return (<BasicContext.Provider value={contextValue}>{children}</BasicContext.Provider>)
};

export default BasicProvider;
