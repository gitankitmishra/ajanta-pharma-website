import React, { useState, ReactNode, createContext, useEffect } from "react";

export type CourseDetails = {
    _id: string;
    basicInfo: {
        category: string,
        courseCode: string,
        courseName: string,
        isActive: boolean,
        publishDate: string,
    }
}


interface CourseContextType {
    pageNo: number;
    updatePageNo: (newPage: number) => void;
    courseData: CourseDetails[] | null;
    loading: boolean;
    error: Error | null;
    fetchData: () => void;
}

export const CourseDetailsContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pageNo, setPageNo] = useState(1);
    const [courseData, setCourseData] = useState<CourseDetails[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pageSize, setPageSize] = useState(10);

    const updatePageNo = (newPage: number) => {
        setPageNo(newPage);
        console.log("Value of the page no is ", newPage);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const url = `http://localhost:8000/api/admin/dashboard/courseList?page=${pageNo}&pageSize=${pageSize}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: CourseDetails[] = await response.json();
            setCourseData(data);
            setLoading(false);
        } catch (error:any) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data initially
    }, [pageNo, pageSize]);

    const contextValue: CourseContextType = {
        pageNo,
        updatePageNo,
        courseData,
        loading,
        error,
        fetchData,
    };

    return (
        <CourseDetailsContext.Provider value={contextValue}>
            {children}
        </CourseDetailsContext.Provider>
    );
};

export default CourseProvider;
