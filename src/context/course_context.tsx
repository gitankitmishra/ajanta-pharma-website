"use client";
import * as XLSX from "xlsx";
import { CourseAssessment } from "@/types/CourseAssessment";
import { CourseBasic } from "@/types/CourseBasic";
import { CourseModule } from "@/types/CourseModule";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

export type CourseContextType = {
  // common
  course_basic_error: {
    [key: string]: string;
  };
  handleNextClick: () => void;
  handlePreviousClick: () => void;
  active_step: number;

  // basic
  course_basic: CourseBasic;
  handleChange: (field: keyof CourseBasic, value: string) => void;

  // modules
  course_module: CourseModule[];
  course_assessment: CourseAssessment[];
  handleAddModule: () => void;
  handleModuleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAssessmentNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAssessmentTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  course_assessment_main: CourseAssessment[];
  files: File[];
  handleFileSelect: (selectedFile: File, index: number) => void;
  handleDownloadExcel: (index: number) => void;

  // designation

  // publish
};

export const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [active_step, setActiveStep] = useState<number>(1);

  const handleStepOneDone = async () => {
    let errors = {};

    if (course_basic.course_category.trim().length === 0) {
      errors = { ...errors, course_category: "Select a course category." };
    }

    if (course_basic.course_training.trim().length === 0) {
      errors = {
        ...errors,
        course_training: "Select a course training type.",
      };
    }
    if (course_basic.course_name.trim().length === 0) {
      errors = { ...errors, course_name: "Enter a course name." };
    }

    if (course_basic.course_objective.trim().length === 0) {
      errors = { ...errors, course_objective: "Enter a short description." };
    }

    if (course_basic.course_start_date.trim().length === 0) {
      errors = { ...errors, course_start_date: "Select start date." };
    }

    if (Object.keys(errors).length !== 0) {
      setCourseBasicError(errors);
      return;
    }

    setActiveStep(1);
  };

  const handleStepTwoDone = () => {
    setActiveStep(2);
  };

  const handleStepThreeDone = () => {
    setActiveStep(3);
  };

  const handleStepFourDone = () => {
    setActiveStep(4);
  };

  const handleNextClick = () => {
    if (active_step === 0) {
      handleStepOneDone();
    } else if (active_step === 1) {
      handleStepTwoDone();
    } else if (active_step === 2) {
      handleStepThreeDone();
    } else if (active_step === 3) {
      handleStepFourDone();
    }
  };

  const handlePreviousClick = () => {
    if (active_step === 0) {
      router.push("/admin/admin-courses"); // Navigate to the course page
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // ***********************************************************************************************
  // course basic
  const [course_basic, setCourseBasic] = useState<CourseBasic>({
    course_code: "CBS-0324-04",
    course_name: "dfg",
    course_category: "Competency-Based-Skills",
    course_objective: "sdf",
    course_training: "Business Orientation",
    course_start_date: "9999-12-09",
    course_end_date: "9999-12-09",
    course_status: "active",
  });

  const [course_basic_error, setCourseBasicError] = useState<{
    [key: string]: string;
  }>({
    course_code: "",
    course_name: "",
    course_category: "",
    course_training: "",
    course_objective: "",
    course_start_date: "",
    course_end_date: "",
  });

  const generateCourseCode = (
    category: string,
    prevID: number | null = null
  ): string => {
    const categoryTable: { [key: string]: string } = {
      "Competency-Based-Skills": "CBS",
      Medical: "MED",
      Marketing: "MKT",
      "Personal Development": "PD",
      "Classroom Training": "CT",
    };

    const currentDate: Date = new Date();
    const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year: string = String(currentDate.getFullYear()).slice(-2);

    let id: string;
    if (prevID !== null && prevID !== undefined) {
      id = String(Number(prevID) + 1).padStart(2, "0");
    } else {
      id = "01";
    }

    const courseCode: string = `${categoryTable[category]}-${month}${year}-${id}`;
    return courseCode;
  };

  const generateNewPrevID = async (
    value: string,
    prevID: number
  ): Promise<number> => {
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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const count = data.categoryCount;
      // Assuming the response contains a property called 'count'
      console.log("Data acquired", data);
      // Now you can use the 'count' value as needed
      return count; // Increment the count and return
    } catch (error) {
      console.error("Error fetching data:", error);
      // Return previous ID in case of error
      return prevID;
    }
  };

  const handleChange = async (field: string, value: any) => {
    console.log(`&${field}&`);
    console.log("----------", course_basic_error[field]);
    if (course_basic_error[field] !== "") {
      console.log("field", field);
      setCourseBasicError({ ...course_basic_error, [field]: "" });
    }

    if (field === "course_category") {
      try {
        const newPrevID = await generateNewPrevID(value, 0);
        const newCourseCode = generateCourseCode(value, newPrevID);
        setCourseBasic((prev) => ({
          ...prev,
          [field]: value,
          course_code: newCourseCode,
        }));
      } catch (error) {
        console.error("Error occurred while updating prevID:", error);
      }
    } else {
      setCourseBasic((prev) => ({ ...prev, [field]: value }));
    }
  };
  // ***********************************************************************************************

  // ***********************************************************************************************
  // modules
  const [course_module, setCourseModule] = useState<CourseModule[]>([
    {
      module_no: 1,
      module_name: "",
      module_material: "",
      assessment_no: 0,
    },
  ]);

  const [files, setFiles] = useState<File[]>([]);

  const [course_assessment, setCourseAssessment] = useState<CourseAssessment[]>(
    [
      {
        assessment_no: 0,
        assessment_name: "",
        assessment_category: "module",
        assessment_position: "post",
        assessment_type: "",
        assessment_data: [],
      },
    ]
  );

  const [course_assessment_main, setCourseAssessmentMain] = useState<
    CourseAssessment[]
  >([
    {
      assessment_no: 0,
      assessment_name: "",
      assessment_category: "course",
      assessment_position: "pre",
      assessment_type: "",
      assessment_data: [],
    },
    {
      assessment_no: 1,
      assessment_name: "",
      assessment_category: "course",
      assessment_position: "post",
      assessment_type: "",
      assessment_data: [],
    },
  ]);

  const handleAddModule = () => {
    setCourseModule([
      ...course_module,
      {
        module_no: course_module.length + 1,
        module_name: "",
        module_material: "",
        assessment_no: course_module.length,
      },
    ]);
    setCourseAssessment([
      ...course_assessment,
      {
        assessment_no: course_assessment.length,
        assessment_name: "",
        assessment_category: "module",
        assessment_position: "post",
        assessment_type: "",
        assessment_data: [],
      },
    ]);
  };

  //download excel
  const handleDownloadExcel = (index: number) => {
    let ws = XLSX.utils.json_to_sheet([]);
    if (course_assessment[index].assessment_type === "single") {
      ws = XLSX.utils.json_to_sheet([
        {
          question_no: "",
          question_value: "",
          question_option1: "",
          question_option2: "",
          question_option3: "",
          question_option4: "",
          question_answer: "",
        },
      ]);
    } else if (course_assessment[index].assessment_type === "multiple") {
      ws = XLSX.utils.json_to_sheet([
        {
          question_no: "",
          question_value: "",
          question_option1: "",
          question_option2: "",
          question_option3: "",
          question_option4: "",
          question_answer1: "",
          question_answer2: "",
          question_answer3: "",
          question_answer4: "",
        },
      ]);
    } else if (course_assessment[index].assessment_type === "short") {
      ws = XLSX.utils.json_to_sheet([
        {
          question_no: "",
          question_value: "",
        },
      ]);
    } else if (course_assessment[index].assessment_type === "boolean") {
      ws = XLSX.utils.json_to_sheet([
        {
          question_no: "",
          question_value: "",
          question_answer1: "",
        },
      ]);
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      `${course_assessment[index].assessment_type}`
    );

    XLSX.writeFile(wb, "assessment.xlsx");
  };

  const handleModuleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const temp: CourseModule[] = [...course_module];
    const index: number = parseInt(event.target.id.split("-")[1]);
    temp[index].module_name = event.target.value;
    setCourseModule(temp);
  };

  const handleAssessmentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "pre" || event.target.id === "post") {
      const temp: CourseAssessment[] = [...course_assessment_main];
      const index: number = event.target.id === "pre" ? 0 : 1;
      temp[index].assessment_name = event.target.value;
      setCourseAssessmentMain(temp);
    } else {
      const temp: CourseAssessment[] = [...course_assessment];
      const index: number = parseInt(event.target.id.split("-")[1]);
      temp[index].assessment_name = event.target.value;
      setCourseAssessment(temp);
    }
  };

  const handleFileSelect = (selectedFile: File, index: number) => {
    console.log("Selecting files for module...");
    const temp_files = files;
    temp_files[index] = selectedFile;
    setFiles(temp_files);
  };

  const handleAssessmentTypeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.id === "pre" || event.target.id === "post") {
      const temp: CourseAssessment[] = [...course_assessment_main];
      const index: number = event.target.id === "pre" ? 0 : 1;
      temp[index].assessment_type = event.target.value as
        | ""
        | "single"
        | "multiple"
        | "boolean"
        | "short";
      setCourseAssessmentMain(temp);
    } else {
      const temp: CourseAssessment[] = [...course_assessment];
      const index: number = parseInt(event.target.id.split("-")[1]);
      temp[index].assessment_type = event.target.value as
        | ""
        | "single"
        | "multiple"
        | "boolean"
        | "short";
      setCourseAssessment(temp);
    }
  };
  // ***********************************************************************************************

  const course_values = {
    course_basic,
    handleChange,
    course_basic_error,
    handleNextClick,
    handlePreviousClick,
    active_step,

    //modules
    course_module,
    course_assessment,
    handleAddModule,
    handleModuleChange,
    handleAssessmentNameChange,
    handleAssessmentTypeChange,
    course_assessment_main,
    files,
    handleFileSelect,
    handleDownloadExcel,
  };
  return (
    <CourseContext.Provider value={course_values}>
      {children}
    </CourseContext.Provider>
  );
};
