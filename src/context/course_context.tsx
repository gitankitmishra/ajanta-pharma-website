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
  handleDraftSave: () => void;
  handleApiCall: () => void;

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
  handleexcelFileRead: (
    selectedFile: File,
    index: number,
    category: string
  ) => void;
  openLink: (index: number) => void;
  filesUploaded: boolean;
  fileAssessmentUpload: boolean;

  // designation
  handleChangeDesignation(event: ChangeEvent<HTMLInputElement>): void;
  course_designation: CourseDesignation;
  publishDesignation(): void;

  //pagination and the Admin All courses display part
  updatePageNo: (newPage: number) => void;
  courseData: any[] | null;
  totalPages: number; // New property for total pages
  handleComponentPage: (value: number) => void;

  //GET AND EDIT COURSES
  getCourseData: (course_id: string) => void;

  //to edit
  updateCourse: () => void;
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
      errors = { ...errors, course_objective: "Enter short description." };
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
        // Call API for basic info
        // Example: handleDraftSave for Basic Info
        handleDraftSave();
        break;
      case 1:
        // Call API for modules
        // Example: mergeapi for Modules
        // mergedApi();
        break;
      case 2:
        // Call API for designation
        // Example: publishDesignation for Designation
        // publishDesignation();

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
      await uploadCourse();
      handleStepTwoDone();
    } else if (active_step === 2) {
      await publishDesignation();
      handleStepThreeDone();
    } else if (active_step === 3) {
      await uploadfromDraft();
      console.log("step 3");
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
      "Operational Excellence": "OE",
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
      "Medical Representative": "MR",
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

  // const handleDraftSave = () => {
  //   fetch(`${process.env.SERVER_URL}api/admin/dashboard/draftBasicInfo`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       course_basic: {
  //         ...course_basic,
  //       },
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("Draft saved:", response);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       alert(data.message);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving draft:", error);
  //     });
  // };

  const handleChange = async (field: string, value: any) => {
    console.log(`&${field}&`);
    console.log("----------", course_basic_error[field]);
    if (course_basic_error[field] !== "") {
      console.log("field", field);
      setCourseBasicError({ ...course_basic_error, [field]: "" });
    }

    if (field === "course_training") {
      try {
        const newPrevID = await generateNewPrevID(0);
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

  const [filesUploaded, setFilesUploaded] = useState<boolean>(files.length > 0);

  console.log("checking..", filesUploaded);

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

  const [fileAssessmentUpload, setFileAssessmentUpload] =
    useState<boolean>(false);

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

          if (category === "course") {
            course_assessment_main[index].assessment_data =
              excelData as QuestionData[];
            console.log(course_assessment_main);
          } else {
            course_assessment[index].assessment_data =
              excelData as QuestionData[];
            console.log(course_assessment);
          }
        }

        const filesAssessmentUploaded =
          course_assessment_main.length > 0 || course_assessment.length > 0;
        setFileAssessmentUpload(filesAssessmentUploaded);
      };

      reader.onerror = (event) => {
        console.error("Error reading file:", event.target?.error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      console.error("No file selected.");
    }
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

    const anyFilesUploaded = temp_files.some((file) => file !== undefined);
    setFilesUploaded(anyFilesUploaded);
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
      const response = await fetchService({
        method: "Post",
        endpoint: "api/admin/dashboard/uploadCourse",
        data: {
          course_module: updatedCourseModule,
          course_assessment: {
            ...course_assessment,
            ...course_assessment_main,
          },
          course_code: course_basic.course_code,
        },
      });
      if (response.code == 200) {
        const data = response;
        console.log("data", data);
      } else {
        console.error(
          "Length mismatch between data.code and course_module arrays"
        );
      }
    }
  };

  const openLink = (index: number) => {
    const link = course_module[index].module_material;
    window.open(link, "_blank");
  };

  // ***********************************************************************************************

  // ***********************************************************************************************
  //designation
  const [course_designation, setCourseDesignation] =
    useState<CourseDesignation>({
      division: [],
      designation: [],
    });

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
      if (course_designation.designation.length === 0) {
        alert("Please select at least one designation.");
        return;
      }

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

  //Pagination
  //All courses Display
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0); // Initialize total pages to 0
  const [pageSize, setPageSize] = useState(10);
  const [componentPage, setComponentPage] = useState(0);
  const [courseData, setCourseData] = useState<CourseDetails[] | null>(null);
  const [keyName, setKeyName] = useState("course");
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
      endpoint: `api/admin/dashboard/courseList?page=${pageNo}&pageSize=${pageSize}&key=${keyName}`,
    });
    if (response.code === 200) {
      setCourseData(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } else {
      console.log("error");
    }
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const url = `${process.env.SERVER_URL}api/admin/dashboard/courseList?page=${pageNo}&pageSize=${pageSize}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setCourseData(data.data); // Set courseData to data.data from the response
  //     setTotalPages(data.totalPages); // Set totalPages from the response
  //     setLoading(false);
  //   } catch (error: any) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize]);

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
        const filteredCourseAssessment = Object.values(
          responseData.data.course_assessment
        ).filter(
          (assessment: any) => assessment.assessment_category === "course"
        ) as CourseAssessment[];

        const filteredModuleAssessment = Object.values(
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
  //       `${process.env.SERVER_URL}api/admin/dashboard/getCourseByCode/${course_id}`,
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

  const mergedAssessment = {
    ...course_assessment,
    ...course_assessment_main,
  };
  //api to update the data or edit
  const updateCourse = async () => {
    console.log("button upload");

    const response = await fetchService({
      method: "PUT",
      endpoint: `api/admin/dashboard/editCourse/${course_basic.course_code}`,
      data: {
        course: {
          ...course_basic,
          mergedAssessment,
          ...course_designation,
          ...course_module,
        },
        courseCode: course_basic.course_code,
      },
    });
    if (response.code === 200) {
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
      method: "GET",
      endpoint: `api/admin/dashboard/pushData/${course_basic.course_code}`,
    });
    if (response.code == 200) {
      alert("Data Published SuccessFully!!!");
      router.push("/admin/admin-courses");
      console.log("dataa", response.data);
      console.log("uploaded to course collection");
    } else {
      console.log("error");
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
    handleDraftSave,
    handleApiCall,

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
    handleexcelFileRead,
    openLink,
    filesUploaded,
    fileAssessmentUpload,

    //designation
    course_designation,
    handleChangeDesignation,
    publishDesignation,

    //Pagination And All Courses Display
    updatePageNo,
    courseData,
    totalPages,
    handleComponentPage,

    //GET COURSES
    getCourseData,

    //edit
    updateCourse,
  };
  return (
    <CourseContext.Provider value={course_values}>
      {children}
    </CourseContext.Provider>
  );
};
