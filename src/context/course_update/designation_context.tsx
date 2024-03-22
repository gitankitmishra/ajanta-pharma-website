"use client"

import React, { useState, ReactNode, createContext, useEffect } from "react";

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
                    "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/publishDesignation/B111",
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
                    "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/publishDesignation/B111",
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
    useEffect(() => {
        console.log("Desingation", designation);
        console.log("Division", division);
      }, [division, designation]);
    return (
        <DesignationContext.Provider value={contextValue}>
            {children}
        </DesignationContext.Provider>                                                              
    );
};

export default DesignationProvider;
