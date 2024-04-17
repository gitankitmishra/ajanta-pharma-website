import { fetchService } from "@/services/fetch_services";
import { CourseAssessment } from "@/types/CourseAssessment";
import { createContext, FC, ReactNode, useState } from "react";

export type AssessmentContextType = {};

export const AssessmentContext = createContext<AssessmentContextType | null>(
  null
);

export const AssessmentProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assessment, setAssessment] = useState<CourseAssessment | null>(null);

  const getAssessment = async (
    course_code: string,
    assessment_no: string,
    assessment_category: string
  ) => {
    const response = await fetchService({
      method: "POST",
      endpoint: "/api/employee/assessment/get-assessment-details",
      data: {},
    });
  };

  const assessment_values = {};

  return (
    <AssessmentContext.Provider value={assessment_values}>
      {children}
    </AssessmentContext.Provider>
  );
};
