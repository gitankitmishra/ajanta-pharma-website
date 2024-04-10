import { QuestionData } from "./QuestionData";

export type CourseAssessment = {
  assessment_no: number;
  assessment_name: string;
  assessment_category: "module" | "course" | "";
  assessment_position: "pre" | "post" | "";
  assessment_type: "single" | "multiple" | "boolean" | "short" | "";
  assessment_data: QuestionData[];
};
