export type AssessmentType = {
  assessment_no: number;
  assessment_name: string;
  assessment_category: "module" | "course";
  assessment_position: "pre" | "post";
  assessment_type: "single" | "multiple" | "boolean" | "short";
  assessment_data: {
    question_no: number;
    question_value: string;
    question_option: string[] | null;
    question_answer: string | string[] | boolean | null;
  }[];
};
