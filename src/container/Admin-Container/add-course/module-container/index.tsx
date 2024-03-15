import { FC, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import InputFieldNum from "@/components/fields/InputFieldNum";
import InputFieldNameAssessment from "@/components/fields/InputFieldNameAssessment";
import UploadButtonAssessment from "@/components/buttons/UploadButtonAssessment";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {

  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<number[]>([]);
  const [files, setFiles] = useState<FileList | null>(null); 
  const [courseCode, setCourseCode] = useState<string>("");

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
  
      const response = await fetch("http://localhost:8000/api/admin/dashboard/uploadFile/B01", {
        method: "PUT",
        body: formData, 
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to handle the module number
  const handleChangeModuleNum = (newModuleNum: number[]) => {
    setModuleNo(newModuleNum);
  };

  const handleChangeModuleName = (newModuleName: string[]) => {
    setModuleName(newModuleName);
  };

  //api for assessment upload -> 
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
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("assessmentFileName:", assessmentFileName);
    console.log("assessmentFileType:", assessmentFileType);
    console.log("excelFile:", excelFile);
  }, [excelFile, assessmentFileName, assessmentFileType]);
  

  const handleChangeAssessmentType = (assessmentType: string[]) => {
    setassessmentFileType(assessmentType);
  };

  const handleAssessmentName = (newAssessmentName:string[]) => {
    setassessmentFileName(newAssessmentName)
  }

  const mergeApi = () => {
    uploadFile();
    uploadAssessment();
  }

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
        <div className="module-input">
        <div className="module-input-number">
      <label htmlFor="">Module Number</label>
      <InputFieldNum
            moduleNum={moduleNo}
            onChange={(newModuleNum: number[]) => handleChangeModuleNum(newModuleNum)}
          />
      </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputField 
                moduleName={moduleName}
                onChange={(newModuleName: string[]) => handleChangeModuleName(newModuleName)}/>
          </div>
          <div className="module-input-uplaod-btn">
        <UploadButton upload={"Upload Course Material"} onFileSelect={setFiles}/>
      </div>
        </div>
        <div className="module-input">
          <div className="module-input-number">
            <label htmlFor="">Select Assessment Type</label>
            <DropdownInputField
              option1={"Multiple Choice Question"}
              option2={"Single Choice Question"}
              option3={"True or False"}
              option4={"Short Answer"}
              assessmentType={assessmentFileType}
              onChange={(assessmentType: string[]) => handleChangeAssessmentType(assessmentType)}
            />
          </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputFieldNameAssessment assessmentName={assessmentFileName}
            onChange={(newAssessmentName:string[]) => handleAssessmentName(newAssessmentName)}/>
          </div>
          <div className="module-input-uplaod-btn">
            <UploadButtonAssessment upload={"Upload Assessment"} onExcelFileSelect={setexcelFile} />
          </div>
        </div>
        <button>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        <div className="module-radio-selction">
          <div className="module-course-assessment">Course Assessment</div>
          <div className="module-radio-btns">
            <input type="radio" id="preAccessment" value="Pre Assessment" /> {" "}
            <label htmlFor="preAccessment">Pre Assessment</label>
            <input
              type="radio"
              id="postAccessment"
              value="Post Assessment"
            />  <label htmlFor="postAccessment">Post Assessment</label>
          </div>
        </div>
        {/* <div className="module-input">
          <div className="module-input-number">
            <label htmlFor="">Select Assessment Type</label>
            <DropdownInputField />
          </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputField />
          </div>
          <div className="module-input-uplaod-btn">
            <UploadButton upload={"Upload Assessment"} />
          </div>
        </div> */}
        <button>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <button onClick={mergeApi}>Save as Draft</button>
    </section>
  );
};

export default ModuleQuizStepSection;