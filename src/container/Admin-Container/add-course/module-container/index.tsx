import { FC, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {

  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");
  const [modules, setModules] = useState([
    { moduleNo: "", moduleName: "", assessmentType: "", assessmentName: "" },
  ]);
  const [assessment, setAssessment] = useState([
    { assessmentType: "", assessmentName: "" },
  ]);
  const handleAddModule = () => {
    setModules([
      ...modules,
      { moduleNo: "", moduleName: "", assessmentType: "", assessmentName: "" },
    ]);
  };
  const handleAddAssessment = () => {
    setAssessment([...assessment, { assessmentType: "", assessmentName: "" }]);
  };

  const uploadFile = async () => {
    try {
      if (!files) return;

      const formData = new FormData();
      formData.append("moduleName", moduleName.toString());
      formData.append("moduleNo", moduleNo.toString());
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("courseCode", courseCode);

      const response = await fetch(
        "http://localhost:8000/api/admin/dashboard/uploadFile/B01",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("moduleName:", moduleName);
    console.log("moduleNo:", moduleNo);
    console.log("files:", files);
  }, [moduleName, moduleNo, files]);

  //to handle the module number
  const handleChangeModuleNum = (newModuleNum: string[]) => {
    setModuleNo(newModuleNum);
  };

  const handleChangeModuleName = (newModuleName: string[]) => {
    setModuleName(newModuleName);
  };

  //assessment upload 
  const [assessmentFileType,setassessmentFileType] = useState<string[]>([]);
  const [assessmentFileName,setassessmentFileName] = useState<string[]>([]);
  const[excelFile,setexcelFile] = useState<FileList | null>(null); 
  const [courseCodeAss,setCourseCodeAss] = useState<string>("");

  const uploadAssessment = async() => {
    try{
      if(!excelFile){
        return;
      }
      const formAssData = new FormData();
      formAssData.append("assessmentFileType",assessmentFileType.toString());
      formAssData.append("assessmentFileName",assessmentFileName.toString());
      for (let i = 0; i < excelFile.length; i++) {
        formAssData.append("excelFile", excelFile[i]);
      }
      formAssData.append("courseCode", courseCode);

      const response = await fetch(`http://localhost:8000/api/admin/dashboard/uploadAssessment/B01`, {
        method:"POST",
        body:formAssData
      });

      if(response.status == 200){
        const data = await response.json();
        console.log(data);
      }
    } catch(error:any){
      console.log(error);
    }
  }
  
  const handleChangeAssessmentType = (assessmentType: string[]) => {
    setassessmentFileType(assessmentType);
  };

  const handleAssessmentName = (newAssessmentName:string[]) => {
    setassessmentFileName(newAssessmentName)
  }

  //optional assessment upload
  const [preAssessment, setPreAssessment] = useState<{ assessmentFileType: string[]; assessmentFileName: string[] }>({
    assessmentFileType: [],
    assessmentFileName: [],
  });
  
  const [postAssessment, setPostAssessment] = useState<{ assessmentFileType: string[]; assessmentFileName: string[] }>({
    assessmentFileType: [],
    assessmentFileName: [],
  });
  
  const [courseCodeAssopt,setCourseCodeAssopt] = useState("");
  const [optexcelFile,setoptexcelFile] = useState<FileList | null>(null);

  const [selectedAssessment,setSelectedAssessment]=useState("");

  const optAssessmetApi = async() => {
    try{
      const formDetails = new FormData();
      formDetails.append("assessmentType",selectedAssessment)
      if(selectedAssessment === "pre"){
        console.log("pre data:", preAssessment);
        preAssessment.assessmentFileType.forEach((type) => {
          formDetails.append('assessmentFileType', type);
        });
        preAssessment.assessmentFileName.forEach((name) => {
          formDetails.append('assessmentFileName', name);
        });
      } else if(selectedAssessment === "post"){
        console.log("post data:", postAssessment);
        postAssessment.assessmentFileType.forEach((type) => {
          formDetails.append('assessmentFileType', type);
        });
        postAssessment.assessmentFileName.forEach((name) => {
          formDetails.append('assessmentFileName', name);
        });
      }
      formDetails.append('courseCodeAssopt',courseCodeAssopt);
      
      if (optexcelFile) {
        for (let i = 0; i < optexcelFile.length; i++) {
          formDetails.append('optexcelFile', optexcelFile[i]);
        }
      }

      const response = await fetch(`http://localhost:8000/api/admin/dashboard/optAssessment/B01`,{
        method:"POST",
        body:formDetails
      })
      if(response.status == 200){
        const data = await response.json();
        console.log(data);
      }
    } catch(error:any){
      console.log(error);
    }
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAssessment(event.target.value);
    console.log('Selected Assessment:', event.target.value); 
};

useEffect(() => {
    console.log('Selected Assessment:', selectedAssessment); 
}, [selectedAssessment]); 

const handleFileNameChange = (fileName: string) => {
  if (selectedAssessment === "pre") {
      console.log("Selected Assessment Type: pre");
      console.log("File Name:", fileName);
      setPreAssessment(prevState => ({
          ...prevState,
          assessmentFileName: [fileName]
      }));
  } else if (selectedAssessment === "post") {
      console.log("Selected Assessment Type: post");
      console.log("File Name:", fileName);
      setPostAssessment(prevState => ({
          ...prevState,
          assessmentFileName: [fileName]
      }));
  }
};

const handleFileTypeChange = (value: string) => {
  if (selectedAssessment === "pre") {
      console.log("Selected Assessment Type: pre");
      console.log("File Name:", value);
      setPreAssessment(prevState => ({
          ...prevState,
          assessmentFileType: [value]
      }));
  } else if (selectedAssessment === "post") {
      console.log("Selected Assessment Type: post");
      console.log("File Name:", value);
      setPostAssessment(prevState => ({
          ...prevState,
          assessmentFileType: [value]
      }));
  }
};

 // Modify mergeApi function to pass a callback to each function
 const mergeApi = () => {
  console.log("calling the 1st");
  setTimeout(() => {
    uploadFile().then(checkCompletion);
  }, 2000);

  // setTimeout(() => {
  //   uploadAssessment().then(checkCompletion);
  // }, 4000);

  // setTimeout(() => {
  //   optAssessmetApi().then(checkCompletion);
  // }, 6000);
};


let completedTasks = 0;

const checkCompletion = () => {
  completedTasks++;
  if (completedTasks === 3) {
    alert("All functions have been successfully executed.");
  }
};

  return (
    <section className="module-main-section">
      <div className="module-div-section1">
        <div className="module-div-section1-div1">
          <p className="module-category-text">Category</p>
          <p className="module-category-type-text">Competency Based Skills</p>
        </div>
        <div className="module-div-section1-div2">
          <p className="module-category-text">Training</p>
          <p className="module-category-type-text">Business Orientation</p>
        </div>
        <div className="module-div-section1-div3">
          <p className="module-category-text">Course Code & Name</p>
          <p className="module-category-type-text">BO1 - Problem Solving</p>
        </div>
      </div>
      <div className="module-div-section2">
        {modules.map((module, index) => (
          <>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Module Number
                </label>
                <InputField
                   moduleName={moduleNo}
                   onChange={(newModuleNo: string[]) =>
                    handleChangeModuleNum(newModuleNo)
                   }
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleName={moduleName}
                  onChange={(newModuleName: string[]) =>
                    handleChangeModuleName(newModuleName)
                  }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={setFiles}
                  uploadFile={uploadFile}
                  acceptedTypes=".mp4,.ppt,.pdf"
                  formatText={"File Format: mp4, ppt, pdf "}
                />
              </div>
            </div>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Select Assessment Type
                </label>
                <DropdownInputField
                  value={""}
                  onValueChange={function (selectedCategory: string): void {
                    throw new Error("Function not implemented.");
                  } }
                  option1={"Competency-Based Skills"}
                  option2={"Medical"}
                  option3={"Marketing"}
                  option4={"Personal Development"}
                  option5={"Classroom Training"}
                        
                  />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleName={[]}
                  onChange={function (newModuleName: string[]): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Assessment"}
                  onFileSelect={function (files: FileList | null): void {
                    throw new Error("Function not implemented.");
                  }}
                  uploadFile={undefined}
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
            </div>
          </>
        ))}
        <button className="module-sec-add-module-btn" onClick={handleAddModule}>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        {assessment.map((assessment, index) => (
          <>
            <div className="module-radio-selction">
              <div className="module-course-assessment">Course Assessment</div>
              <div className="module-radio-btns">
                <input
                  type="radio"
                  className="module-assessment-radio-btn"
                  id="preAccessment"
                  value="Pre Assessment"
                />
                <label
                  htmlFor="preAccessment"
                  className="module-container-labels"
                >
                  Pre Assessment
                </label>
              </div>
              <div className="module-radio-btns">
                <input
                  type="radio"
                  className="module-assessment-radio-btn"
                  id="postAccessment"
                  value="Post Assessment"
                />

                <label
                  htmlFor="postAccessment"
                  className="module-container-labels"
                >
                  Post Assessment
                </label>
              </div>
            </div>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Select Assessment Type
                </label>
                <DropdownInputField
                  value={""}
                  onValueChange={function (selectedCategory: string): void {
                    throw new Error("Function not implemented.");
                  } }
                  option1={""}
                  option2={""}
                  option3={""}
                  option4={""} option5={""}                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleName={[]}
                  onChange={function (newModuleName: string[]): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Assessment"}
                  onFileSelect={function (files: FileList | null): void {
                    throw new Error("Function not implemented.");
                  }}
                  uploadFile={undefined}
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
            </div>
          </>
        ))}
        <button
          className="module-sec-add-module-btn"
          onClick={handleAddAssessment}
        >
          <PlusIcon />
          Add Assessment
        </button>
      </div>
      <button className="module-save-as-draft-btn" onClick={uploadFile}>Save as Draft</button>
    </section>
  );
};

export default ModuleQuizStepSection;