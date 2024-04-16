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
import { QuestionData } from "@/types/QuestionData";

import { fetchService } from "@/services/fetch_services";
import { CourseDesignation } from "@/types/CourseDesignation";

import { CourseDetails } from "@/types/AdminCourseInfo";
import { fileURLToPath } from "url";

export type CourseContextType = {
  // common
  course_basic_error: {
    [key: string]: string;
  };
  handleNextClick: (index: number) => void;
  handlePreviousClick: () => void;
  active_step: number;
  searchTerm: string;
  suggestions: string[];
  filteredSuggestions: string[];
  handleSearchData: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggesstion: string) => void;

  // basic
  course_basic: CourseBasic;
  handleChange: (field: keyof CourseBasic, value: string) => void;
  handleDraftSave: () => void;
  handleApiCall: () => void;

  // modules
  course_module: CourseModule[];
  course_assessment: CourseAssessment[];
  handleAddModule: () => void;
  handleDeleteModule: (index: number) => void;
  handleModuleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAssessmentNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAssessmentTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  course_assessment_main: CourseAssessment[];
  files: File[];
  handleFileSelect: (selectedFile: File, index: number) => void;
  handleDownloadExcel: (index: number) => void;
  handleexcelFileRead: (
    selectedFile: File,
    index: number,
    category: string
  ) => void;
  openLink: (index: number) => void;
  filesUploaded: boolean[];
  writeIntoFile: (id: string | null, index: number) => void;
  visible: boolean;
  handleCancelIcon: (index: number) => void;
  fileExtension: string[];
  course_module_error: CourseModule[];
  course_assessment_error: CourseAssessment[];
  course_assessment_main_error: CourseAssessment[];
  uploadfromDraft: () => void;
  handleCancelIconAssessment: (id: string | null, index: number) => void;
  fileSize: number[];

  // designation
  handleChangeDesignation(event: ChangeEvent<HTMLInputElement>): void;
  course_designation: CourseDesignation;
  publishDesignation(): void;
  ds_error: string;

  //pagination and the Admin All courses display part
  updatePageNo: (newPage: number) => void;
  courseData: any[] | null;
  totalPages: number; // New property for total pages
  handleComponentPage: (value: number) => void;
  filterStatus: string;
  filterCategory: string;
  filterCourse: string;

  handleFilterCategoryChange: (category: string) => void;
  handleFitlerStatusChange: (category: string) => void;
  handleFilterCourseChange: (course: string) => void;
  //GET AND EDIT COURSES
  getCourseData: (course_id: string) => void;

  //to edit
  updateCourse: () => void;

  //dashboard
  getCountdata: any;
};

export const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [active_step, setActiveStep] = useState<number>(0);

  const handleStepOneDone = async () => {
    let errors = {};

    if (course_basic.course_category.trim().length === 0) {
      errors = { ...errors, course_category: "Select course category." };
    }

    if (course_basic.course_training.trim().length === 0) {
      errors = {
        ...errors,
        course_training: "Select course training type.",
      };
    }
    if (course_basic.course_name.trim().length === 0) {
      errors = { ...errors, course_name: "Enter course name." };
    }

    if (course_basic.course_objective.trim().length === 0) {
      errors = { ...errors, course_objective: "Enter learning objective." };
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

  const handleApiCall = () => {
    switch (active_step) {
      case 0:
        handleDraftSave();
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        break;
    }
  };

  const handleNextClick = async () => {
    if (active_step === 0) {
      await handleApiCall();
      handleStepOneDone();
    } else if (active_step === 1) {
      const isModuleValid = validateModuleFields();
      const isAssessmentValid = validateAssessmentFields();
      const isAssessmentMainValid = validateAssessmentMainFields();
      const isPageValid =
        (isModuleValid && isAssessmentValid) || isAssessmentMainValid;

      if (isPageValid) {
        await uploadCourse();
        handleStepTwoDone();
      } else {
        console.log("Errors in module or assessment. Cannot proceed.");
      }
    } else if (active_step === 2) {
      if (
        ((course_basic.course_category === "Medical" ||
          course_basic.course_category === "Marketing") &&
          course_designation.division.length === 0) ||
        course_designation.designation.length === 0
      ) {
        setDsErrror("Please select at least one checkbox");
        return;
      } else {
        setDsErrror("");
        publishDesignation();
      }
      handleStepThreeDone();
    } else if (active_step === 3) {
      handleStepFourDone();
    }
  };

  const handlePreviousClick = () => {
    if (active_step === 0) {
      router.push("/admin/admin-courses");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  //search api and another function
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchSuggestions();
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetchService({
        method: "GET",
        endpoint: `api/admin/dashboard/search/?q=${searchTerm}`,
      });

      console.log("Response:", response.data.data);

      if (response.code === 200) {
        const suggestionsData = response.data.data;
        console.log("Suggestions:", suggestionsData);

        if (Array.isArray(suggestionsData)) {
          const suggestions: any[] = suggestionsData.map((item) => ({
            name: item.course_basic.course_name,
            code: item.course_basic.course_code,
            label: `${item.course_basic.course_code} - ${item.course_basic.course_name}`,
          }));
          console.log("Mapped Suggestions:", suggestions);

          setSuggestions(suggestions);
          setFilteredSuggestions(
            suggestions.slice(0, 10).map((suggestion) => suggestion.label)
          );
        } else {
          console.error("Error: No suggestions data found in the response");
        }
      } else {
        console.error("Error fetching suggestions");
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchData = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
    const courseCode = suggestion.split(" - ")[0];
    console.log("check the course code", courseCode);
    getCourseData(courseCode);
    router.push("/admin/admin-course-detail");
  };

  // ***********************************************************************************************
  // course basic
  const [course_basic, setCourseBasic] = useState<CourseBasic>({
    course_code: "",
    course_name: "",
    course_category: "",
    course_objective: "",
    course_training: "",
    course_start_date: "",
    course_end_date: "9999-12-09",
    course_status: "inactive",
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
    training: string,
    prevID: number | null = null
  ): string => {
    const categoryTable: { [key: string]: string } = {
      "Competency Based Skills": "CBS",
      Medical: "MED",
      Marketing: "MKT",
      "Personal Development": "PD",
      "Classroom Training": "CT",
    };

    const trainingTable: { [key: string]: string } = {
      // Competency
      "Business Orientation": "BO",
      "Customer Orientation": "CO",
      "Operational Excellence and Analytics": "OEAA",
      Leadership: "LE",
      Communication: "COMM",

      // Medical
      "Medical Updates": "MU",

      // Marketing
      "Brand Detailing": "BD",
      "Input Detailing": "ID",
      "Knock Out Points": "KOP",
      "Regional IMS": "RIMS",

      // Personal development
      "Time Management": "TM",
      "Critical Thinking": "CT",
      "Problem Solving": "PS",
      "Creative Thinking": "CTH",
      "Conflict Resolution": "CR",
      "Negotiation Skills": "NS",
      "Personal Finance": "PF",
      "Personal Grooming": "PG",
      "Self Enrichment": "SE",

      // Classroom training
      "Medical Representative": "MER",
      Managers: "MGR",
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

    const courseCode: string = `${
      categoryTable[course_basic.course_category]
    }-${trainingTable[training]}-${month}${year}-${id}`;

    console.log("testtt", courseCode);

    return courseCode;
  };

  const generateNewPrevID = async (prevID: number): Promise<number> => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}api/admin/dashboard/getCourseCodeCount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseCategory: course_basic.course_category,
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

  const handleDraftSave = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/admin/dashboard/draftBasicInfo",
      data: {
        course_basic: {
          ...course_basic,
        },
      },
    });
    if (response.code == 200) {
      const data = response.data;
      console.log(data);
    }
  };

  const handleChange = async (field: string, value: any) => {
    if (course_basic_error[field] !== "") {
      setCourseBasicError({ ...course_basic_error, [field]: "" });
    }

    if (field === "course_training") {
      try {
        const newPrevID: number = await generateNewPrevID(0);
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
  useEffect(() => {
    handleChange;
  }, []);
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

  const [course_module_error, setCourseModuleError] = useState<CourseModule[]>([
    {
      module_no: 1,
      module_name: "",
      module_material: "",
      assessment_no: 0,
    },
  ]);

  const [files, setFiles] = useState<File[]>([]);

  const initialFilesUploadedState = Array(course_module.length).fill(false);
  const [filesUploaded, setFilesUploaded] = useState<boolean[]>(
    initialFilesUploadedState
  );

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

  const [course_assessment_error, setCourseAssessmentError] = useState<
    CourseAssessment[]
  >([
    {
      assessment_no: 0,
      assessment_name: "",
      assessment_category: "",
      assessment_position: "",
      assessment_type: "",
      assessment_data: [],
    },
  ]);
  const [course_assessment_main_error, setCourseAssessmentmainError] = useState<
    CourseAssessment[]
  >([
    {
      assessment_no: 0,
      assessment_name: "",
      assessment_category: "",
      assessment_position: "",
      assessment_type: "",
      assessment_data: [],
    },
  ]);
  const [visible, setVisible] = useState<boolean>(true);

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
      // setCourseModulecourse_module([...newlyAddedModules, newModuleIndex]);
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
  const handleDeleteModule = (index: number) => {
    // Remove module from course_module state
    const updatedModules = course_module.filter((_, i) => i !== index);
    setCourseModule(updatedModules);

    // Remove corresponding assessment from course_assessment state
    const updatedAssessments = course_assessment.filter(
      (assessment) => assessment.assessment_no !== index
    );
    setCourseAssessment(updatedAssessments);
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

    XLSX.writeFile(
      wb,
      `${course_basic.course_code}_${course_module[index].module_no}.xlsx`
    );
  };

  //read excel file ->
  const handleexcelFileRead = (
    selectedFile: File,
    index: number,
    category: string
  ) => {
    if (selectedFile) {
      const file = selectedFile;
      const reader = new FileReader();

      reader.onload = (event) => {
        const target = event.target;
        if (target && target.result) {
          const data = new Uint8Array(target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet);

          console.log(category);

          if (category === "course") {
            const temp = course_assessment_main;

            temp[index].assessment_data = excelData as QuestionData[];

            setCourseAssessmentMain([...temp]);
          } else {
            const temp = course_assessment;

            temp[index].assessment_data = excelData as QuestionData[];

            setCourseAssessment([...temp]);
          }
        }
      };

      reader.onerror = (event) => {
        console.error("Error reading file:", event.target?.error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      console.error("No file selected.");
    }
  };

  //write the data from assessment data
  const writeIntoFile = (id: string | null, index: number) => {
    if (id == "pre" || id == "post") {
      const assessmentData = course_assessment_main[index]?.assessment_data;

      if (!assessmentData || assessmentData.length === 0) {
        console.error("No assessment data available to write into file.");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(assessmentData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${course_basic.course_code}_${course_assessment_main[index]?.assessment_position}`
      );
      const fileName = `${course_basic.course_code}_${course_assessment_main[index]?.assessment_position}.xlsx`;
      console.log("file name", fileName);

      XLSX.writeFile(wb, fileName);
    } else {
      const assessmentData = course_assessment[index]?.assessment_data;

      if (!assessmentData || assessmentData.length === 0) {
        console.error("No assessment data available to write into file.");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(assessmentData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${course_basic.course_code}_${course_module[index].module_no}`
      );

      XLSX.writeFile(
        wb,
        `${course_basic.course_code}_${course_module[index].module_no}.xlsx`
      );
    }
  };

  const handleCancelIcon = (index: number) => {
    const temp = [...course_module];
    console.log("aj", temp);

    temp[index].module_material = "";
    setCourseModule(temp);
    setVisible(false);

    // Create a new array with the updated filesUploaded state for the specific index
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded[index] = false;
    setFilesUploaded(updatedFilesUploaded)
    setFileSize([0]);
    setFileExtension(["NA"])
  };
  const handleCancelIconAssessment = (id: string | null, index: number) => {
    if (id == "pre" || id == "post") {
      const temp = [...course_assessment_main];
      temp[index].assessment_data = [];
      setCourseAssessmentMain(temp);
      setVisible(false);
    } else {
      const temp = [...course_assessment];
      temp[index].assessment_data = [];
      setCourseAssessment(temp);
      setVisible(false);
    }
  };

  const handleModuleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const temp: CourseModule[] = [...course_module];
    const index: number = parseInt(event.target.id.split("-")[1]);
    temp[index].module_name = event.target.value;
    setCourseModule(temp);
    setCourseModuleError((prevErrors) => {
      const newErrors = [...prevErrors];
      if (!event.target.value.trim()) {
        newErrors[index] = {
          ...newErrors[index],
          module_name: "Enter module name.",
        };
      } else {
        newErrors[index] = {
          ...newErrors[index],
          module_name: "",
        };
      }
      return newErrors;
    });

    //assessment
    const temp2: CourseAssessment[] = [...course_assessment];
    const index2: number = parseInt(event.target.id.split("-")[1]);
    temp2[index2].assessment_name = event.target.value;
    setCourseAssessment(temp2);
    setCourseAssessmentError((prevErrors) => {
      const newErrors = [...prevErrors];
      if (!event.target.value.trim()) {
        newErrors[index] = {
          ...newErrors[index],
          assessment_name: "Enter assessment name.",
        };
      } else {
        newErrors[index] = {
          ...newErrors[index],
          assessment_name: "",
        };
      }
      return newErrors;
    });
  };

  const validateModuleFields = () => {
    const errors: CourseModule[] = course_module.map((module, index) => {
      const moduleErrors: CourseModule = { ...module };
      if (!module.module_name.trim()) {
        moduleErrors.module_name = "Enter module name.";
      } else {
        moduleErrors.module_name = "";
        moduleErrors.assessment_no = 0;
        moduleErrors.module_no = 0;
      }

      if (!files[index]) {
        moduleErrors.module_material = "Upload file.";
      } else {
        moduleErrors.module_material = "";
      }
      return moduleErrors;
    });

    setCourseModuleError(errors);

    const hasErrors = errors.some((error) => {
      return Object.values(error).some(
        (value) => value !== "" && value !== null && value !== 0
      );
    });

    return !hasErrors;
  };

  //validation on assessment => harsha
  const validateAssessmentFields = () => {
    const errors: CourseAssessment[] = course_assessment.map(
      (assessment, index) => {
        const assessmentErrors: CourseAssessment = { ...assessment };

        if (!assessment.assessment_name.trim()) {
          assessmentErrors.assessment_name = "Enter assessment name.";
        } else {
          assessmentErrors.assessment_name = "";
        }

        assessmentErrors.assessment_category = "";

        assessmentErrors.assessment_no = 0;
        assessmentErrors.assessment_position = "";

        if (
          assessment.assessment_type === "boolean" ||
          assessment.assessment_type === "single" ||
          assessment.assessment_type === "multiple" ||
          assessment.assessment_type === "short"
        ) {
          assessmentErrors.assessment_type = "";
        } else {
          assessmentErrors.assessment_type = "Invalid assessment type" as
            | ""
            | "boolean"
            | "single"
            | "multiple"
            | "short";
        }
        if (!assessment.assessment_data.length) {
          assessmentErrors.assessment_data = [];
        } else {
          assessmentErrors.assessment_data = [];
        }

        return assessmentErrors;
      }
    );

    setCourseAssessmentError(errors);

    const hasErrors = errors.some((error) => {
      return (
        error.assessment_name !== "" ||
        error.assessment_category !== "" ||
        error.assessment_data.length !== 0 ||
        error.assessment_no !== 0 ||
        error.assessment_position !== "" ||
        error.assessment_type !== ""
      );
    });

    return !hasErrors;
  };

  const [touchedAssessmentName, setTouchedAssessmentName] = useState<boolean[]>(
    new Array(course_assessment_main.length).fill(false)
  );
  const [touchedAssessmentCategory, setTouchedAssessmentCategory] = useState<
    boolean[]
  >(new Array(course_assessment_main.length).fill(false));
  const [touchedAssessmentData, setTouchedAssessmentData] = useState<boolean[]>(
    new Array(course_assessment_main.length).fill(false)
  );
  const [touchedAssessmentType, setTouchedAssessmentType] = useState<boolean[]>(
    new Array(course_assessment_main.length).fill(false)
  );

  // Functions to handle field interactions
  const handleAssessmentmainNameChange = (index: number) => {
    setTouchedAssessmentName((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleAssessmentCategoryChange = (index: number) => {
    setTouchedAssessmentCategory((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleAssessmentDataChange = (index: number) => {
    setTouchedAssessmentData((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleAssessmentmainTypeChange = (index: number) => {
    setTouchedAssessmentType((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const validateAssessmentMainFields = () => {
    const errors: CourseAssessment[] = course_assessment_main.map(
      (assessment, index) => {
        const assessmentErrors: CourseAssessment = { ...assessment };

        // Check if the assessment name field is touched and empty
        // Check if the assessment name field is touched and empty
        if (
          touchedAssessmentName[index] &&
          !assessment.assessment_name.trim()
        ) {
          assessmentErrors.assessment_name = "Enter assessment name.";
        } else {
          assessmentErrors.assessment_name = "";
        }

        // Check if the assessment category field is touched and empty
        if (
          !assessment.assessment_category.trim() &&
          touchedAssessmentCategory[index]
        ) {
          assessmentErrors.assessment_category = "";
        } else {
          assessmentErrors.assessment_category = "";
        }

        if (
          !assessment.assessment_data.length &&
          touchedAssessmentData[index]
        ) {
          assessmentErrors.assessment_data = [];
        } else {
          assessmentErrors.assessment_data = [];
        }

        if (
          touchedAssessmentType[index] &&
          (!assessment.assessment_type.trim() ||
            !(
              assessment.assessment_type === "boolean" ||
              assessment.assessment_type === "single" ||
              assessment.assessment_type === "multiple" ||
              assessment.assessment_type === "short"
            ))
        ) {
          assessmentErrors.assessment_type = "Invalid assessment type" as
            | ""
            | "boolean"
            | "single"
            | "multiple"
            | "short";
        } else {
          assessmentErrors.assessment_type = "";
        }

        // Set other fields to default values
        assessmentErrors.assessment_no = 0;
        assessmentErrors.assessment_position = "";

        return assessmentErrors;
      }
    );

    setCourseAssessmentmainError(errors);

    // Determine if there are any errors
    const hasErrors = errors.some((error) =>
      Object.values(error).some((value) => value !== "")
    );
    return !hasErrors;
  };

  const handleAssessmentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "pre" || event.target.id === "post") {
      console.log("assessment main check");
      const temp: CourseAssessment[] = [...course_assessment_main];
      const index: number = event.target.id === "pre" ? 0 : 1;
      temp[index].assessment_name = event.target.value;
      setCourseAssessmentMain(temp);
      setCourseAssessmentmainError((prevErrors) => {
        const newErrors = [...prevErrors];
        if (!event.target.value.trim()) {
          newErrors[index] = {
            ...newErrors[index],
            assessment_name: "Enter assessment name.",
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            assessment_name: "",
          };
        }
        return newErrors;
      });
    } else {
      console.log("assessment check");

      const temp: CourseAssessment[] = [...course_assessment];
      const index: number = parseInt(event.target.id.split("-")[1]);
      temp[index].assessment_name = event.target.value;
      setCourseAssessment(temp);
      setCourseAssessmentError((prevErrors) => {
        const newErrors = [...prevErrors];
        if (!event.target.value.trim()) {
          newErrors[index] = {
            ...newErrors[index],
            assessment_name: "Enter assessment name.",
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            assessment_name: "",
          };
        }
        return newErrors;
      });
    }
  };

  // const [fileName, setFileName] = useState<string>("Not selected");
  // const [fileSize, setFileSize] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number[]>([0]);
  const [fileExtension, setFileExtension] = useState<string[]>(["NA"]);

  const handleFileSelect = (selectedFile: File, index: number) => {
    console.log("Selecting files for module...");
    console.log("selected file...", selectedFile);

    const temp_files = [...files];
    temp_files[index] = selectedFile;

    setFiles(temp_files);

    const anyFilesUploaded =
      selectedFile !== undefined && selectedFile !== null;

    setFilesUploaded((prevFilesUploaded) => {
      const updatedFilesUploaded = [...prevFilesUploaded];
      updatedFilesUploaded[index] = anyFilesUploaded;
      return updatedFilesUploaded;
    });

    // Set file size for the specific module
    setFileSize((prevFileSize) => {
      const updatedFileSize = [...prevFileSize];
      updatedFileSize[index] = selectedFile ? selectedFile.size : 0;
      return updatedFileSize;
    });

    // Set file extension for the specific module
    const extension = selectedFile
      ? selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1)
      : "NA";
    setFileExtension((prevFileExtension) => {
      const updatedFileExtension = [...prevFileExtension];
      updatedFileExtension[index] = extension;
      return updatedFileExtension;
    });

    //error
    setCourseModuleError((prevErrors) => {
      const newErrors = [...prevErrors];
      if (!anyFilesUploaded) {
        newErrors[index] = {
          ...newErrors[index],
          module_material: "Upload file.",
        };
      } else {
        newErrors[index] = {
          ...newErrors[index],
          module_material: "",
        };
      }
      return newErrors;
    });
  };

  useEffect(() => {
    console.log("filesssssssss", files);
  }, [files]);

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
      setCourseAssessmentmainError((prevErrors) => {
        const newErrors = [...prevErrors];
        if (!event.target.value.trim()) {
          newErrors[index] = {
            ...newErrors[index],
            assessment_type: "",
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            assessment_type: "",
          };
        }
        return newErrors;
      });
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
      setCourseAssessmentError((prevErrors) => {
        const newErrors = [...prevErrors];
        if (!event.target.value.trim()) {
          newErrors[index] = {
            ...newErrors[index],
            assessment_type: "",
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            assessment_type: "",
          };
        }
        return newErrors;
      });
    }
  };

  //update module file upload
  const updateFileUpload = async (): Promise<any> => {
    const formdata = new FormData();
    formdata.append("file_path", `course_material/${course_basic.course_code}`);

    files.forEach((file, index) => {
      formdata.append("files", file);
      formdata.append("files_name", `files-${course_module[index].module_no}`);
    });

    const responseUrl = await fetchService({
      method: "POST",
      endpoint: "api/admin/dashboard/uploadAllFile",
      data: formdata,
    });

    if (responseUrl.code === 200) {
      const data = responseUrl;
      console.log("check", data.data.urls);

      const updatedCourseModule = course_module.map((module, index) => ({
        ...module,
        module_material: data.data.urls[index],
      }));

      setCourseModule(updatedCourseModule);
    }
  };

  useEffect(() => {
    console.log("check module-------------", course_module);
  }, [course_module]);

  //api calling
  const uploadCourse = async () => {
    const formdata = new FormData();
    formdata.append("file_path", `course_material/${course_basic.course_code}`);

    files.forEach((file, index) => {
      formdata.append("files", file);
      formdata.append("files_name", `files-${course_module[index].module_no}`);
    });

    const responseUrl = await fetchService({
      method: "POST",
      endpoint: "api/admin/dashboard/uploadAllFile",
      data: formdata,
    });

    if (responseUrl.code === 200) {
      const data = responseUrl;
      console.log("check", data.data.urls);

      const updatedCourseModule = course_module.map((module, index) => ({
        ...module,
        module_material: data.data.urls[index],
      }));

      setCourseModule(updatedCourseModule);

      if (
        course_assessment_main[0].assessment_name &&
        course_assessment_main[0].assessment_type !== ""
      ) {
        const response = await fetchService({
          method: "Post",
          endpoint: "api/admin/dashboard/uploadCourse",
          data: {
            course_module: updatedCourseModule,
            course_assessment: [
              ...course_assessment_main,
              ...course_assessment,
            ],
            course_code: course_basic.course_code,
          },
        });
        if (response.code === 200) {
          const responseData = response;
          console.log("data", responseData);
        } else {
          console.error(
            "Length mismatch between data.code and course_module arrays"
          );
        }
      } else {
        const response = await fetchService({
          method: "Post",
          endpoint: "api/admin/dashboard/uploadCourse",
          data: {
            course_module: updatedCourseModule,
            course_assessment: course_assessment,
            course_code: course_basic.course_code,
          },
        });
        if (response.code === 200) {
          const responseData = response;
          console.log("data", responseData);
        } else {
          console.error(
            "Length mismatch between data.code and course_module arrays"
          );
        }
      }
    }
  };

  //Validation Check

  const [link, setLink] = useState<string>("");

  const openLink = (index: number) => {
    console.log("check module url", course_module[index].module_material);
    const link = course_module[index].module_material;
    console.log("linkkkkk....", link);
    window.open(link);
  };

  // ***********************************************************************************************

  // ***********************************************************************************************
  //designation
  const [course_designation, setCourseDesignation] =
    useState<CourseDesignation>({
      division: [],
      designation: [],
    });

  const [ds_error, setDsErrror] = useState<string>("");
  const handleChangeDesignation = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === "division") {
      setCourseDesignation((prevState) => ({
        ...prevState,
        division: prevState.division.includes(value)
          ? prevState.division.filter((item) => item !== value)
          : [...prevState.division, value],
      }));
    } else {
      setCourseDesignation((prevState) => ({
        ...prevState,
        designation: prevState.designation.includes(value)
          ? prevState.designation.filter((item) => item !== value)
          : [...prevState.designation, value],
      }));
    }
  };
  //api call for designation
  const publishDesignation = async () => {
    try {
      let responseUrl;

      if (course_designation.division.length > 0) {
        responseUrl = await fetchService({
          method: "PUT",
          endpoint: `api/admin/dashboard/draftDesignation/${course_basic.course_code}`,
          data: {
            division: course_designation.division,
            designation: course_designation.designation,
          },
        });
      } else {
        responseUrl = await fetchService({
          method: "PUT",
          endpoint: `api/admin/dashboard/draftDesignation/${course_basic.course_code}`,
          data: {
            designation: course_designation.designation,
          },
        });
      }
      console.log("data check", course_basic.course_category);

      if (!responseUrl) {
        throw new Error("Failed to publish designation");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  // ***********************************************************************************************

  //Pagination and Filter Logic api
  //All courses Display
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0); // Initialize total pages to 0
  const [pageSize, setPageSize] = useState(10);
  const [componentPage, setComponentPage] = useState(0);
  const [courseData, setCourseData] = useState<CourseDetails[] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCourse, setFilterCourse] = useState<string>("course");

  //handle function change
  const handleFilterCategoryChange = (category: string) => {
    // Update the filterCategory state
    setFilterCategory(category);
  };

  const handleFitlerStatusChange = (status: string) => {
    // Update the filterStatus state
    setFilterStatus(status);
  };

  const handleFilterCourseChange = (course: string) => {
    // Update the filterCourse state
    setFilterCourse(course);
  };

  const updatePageNo = (newPage: number) => {
    setPageNo(newPage);
    console.log("Value of the page no is ", newPage);
  };

  const handleComponentPage = (value: number) => {
    setComponentPage(value);
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetchService({
      method: "GET",
      endpoint: `api/admin/dashboard/filter?category=${
        filterCategory || ""
      }&status=${filterStatus || ""}&key=${
        filterCourse || ""
      }&page=${pageNo}&pageSize=${pageSize}`,
    });

    if (response.code === 200) {
      console.log("response", response.data.data.data);

      setCourseData(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, filterCourse, filterCategory, filterStatus]);

  //*/****************************************************************************************** */

  //GET COURSE AND EDIT COURSE
  const [course_id, setCourseCode] = useState("");
  const [data, setData] = useState<any>([]);

  const handleCourseCodeChange = (value: string) => {
    setCourseCode(value);
  };

  const getCourseData = async (course_id: string) => {
    const response = await fetchService({
      method: "GET",
      endpoint: `api/admin/dashboard/getCourseByCode/${course_id}`,
    });
    if (response.code === 200) {
      const responseData = response.data;
      if (responseData && responseData.data) {
        setCourseBasic(responseData.data.course_basic);
        //condition
        const filteredCourseAssessment = Object?.values(
          responseData.data.course_assessment
        ).filter(
          (assessment: any) => assessment.assessment_category === "course"
        ) as CourseAssessment[];

        const filteredModuleAssessment = Object?.values(
          responseData.data.course_assessment
        ).filter(
          (assessment: any) => assessment.assessment_category === "module"
        ) as CourseAssessment[];

        setCourseAssessment(filteredCourseAssessment);
        setCourseAssessmentMain(filteredModuleAssessment);
        setCourseModule(responseData.data.course_module);
        setCourseDesignation(responseData.data.course_designation);
      }
    } else {
      console.log("error");
    }
  };

  // const getCourseData = async (course_id: string): Promise<void> => {
  //   try {
  //     const response = await fetch(
  //       `${ process.env.SERVER_URL } api / admin / dashboard / getCourseByCode / ${ course_id } `,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const responseData = await response.json();

  //     // Check if the response data contains 'data' and 'course_basic' properties
  //     if (responseData && responseData.data && responseData.data.course_basic) {
  //       setCourseBasic(responseData.data.course_basic);
  //       // setCourseAssessment(Object.values(responseData.data.course_assessment));

  //       //condition
  //       const filteredCourseAssessment = Object.values(
  //         responseData.data.course_assessment
  //       ).filter(
  //         (assessment: any) => assessment.assessment_category === "course"
  //       ) as CourseAssessment[];

  //       const filteredModuleAssessment = Object.values(
  //         responseData.data.course_assessment
  //       ).filter(
  //         (assessment: any) => assessment.assessment_category === "module"
  //       ) as CourseAssessment[];

  //       setCourseAssessment(filteredCourseAssessment);
  //       setCourseAssessmentMain(filteredModuleAssessment);
  //       setCourseModule(responseData.data.course_module);
  //       setCourseDesignation(responseData.data.course_designation);

  //       console.log("responssssssss", responseData.data);
  //       console.log("assessment main", course_assessment_main);
  //     } else {
  //       console.error("Invalid response format:", responseData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // ***********************************************************************************************

  //api to update the data or edit

  const updateCourse = async () => {
    console.log("button upload");
    console.log("testt");
    const checkFileUpload = await updateFileUpload();
    if (!checkFileUpload) {
      alert("something went wrong");
    }
    const response = await fetchService({
      method: "PUT",
      endpoint: `api/admin/dashboard/editCourse/${course_basic.course_code}`,
      data: {
        course_designation: {
          ...course_designation,
        },
        course_basic: {
          ...course_basic,
        },
        course_assessment: {
          ...course_assessment,
          ...course_assessment_main,
        },
        course_module: {
          ...course_module,
        },
      },
    });

    if (response.code == 200) {
      const data = response;
      console.log(data);
    } else {
      console.log("error");
    }
  };

  // ***********************************************************************************************

  // ***********************************************************************************************
  //upload(draft -> upload)

  //api calling
  const uploadfromDraft = async () => {
    console.log("uploading data");
    const response = await fetchService({
      method: "POST",
      endpoint: `api/admin/dashboard/pushData/${course_basic.course_code}`,
    });
    if (response.code == 200) {
      router.push("/admin/admin-courses");
      console.log("dataa", response.data);
      console.log("uploaded to course collection");
    } else {
      console.log("error");
    }
  };

  // ***********************************************************************************************
  //dashboard api
  const [getCountdata, setGetCountdata] = useState<any>("");
  const getCount = async () => {
    const response = await fetchService({
      method: "GET",
      endpoint: "api/admin/dashboard/countCourseandCategory",
    });
    if (response.code == 200) {
      const data = response.data;
      console.log(data);
      setGetCountdata(data);
    }
  };

  // ***********************************************************************************************

  // ***********************************************************************************************
  const course_values = {
    //common
    searchTerm,
    filteredSuggestions,
    suggestions,
    handleSearchData,
    handleSuggestionClick,

    //basic
    course_basic,
    handleChange,
    course_basic_error,
    handleNextClick,
    handlePreviousClick,
    active_step,
    handleDraftSave,
    handleApiCall,

    //modules
    fileSize,
    course_module,
    course_assessment,
    course_module_error,
    course_assessment_error,
    course_assessment_main_error,
    handleAddModule,
    handleDeleteModule,
    handleModuleChange,
    handleAssessmentNameChange,
    handleAssessmentTypeChange,
    course_assessment_main,
    files,
    handleFileSelect,
    handleDownloadExcel,
    handleexcelFileRead,
    openLink,
    filesUploaded,
    writeIntoFile,
    visible,
    handleCancelIcon,
    fileExtension,
    handleCancelIconAssessment,

    //designation
    course_designation,
    handleChangeDesignation,
    publishDesignation,
    ds_error,

    //upload courses final stage api call
    uploadfromDraft,
    //Pagination And All Courses Display
    updatePageNo,
    courseData,
    totalPages,
    handleComponentPage,
    handleFilterCategoryChange,
    handleFitlerStatusChange,
    handleFilterCourseChange,
    filterStatus,
    filterCategory,
    filterCourse,

    //GET COURSES
    getCourseData,

    //edit
    updateCourse,

    //dashboard
    getCountdata,
  };
  return (
    <CourseContext.Provider value={course_values}>
      {children}
    </CourseContext.Provider>
  );
};
