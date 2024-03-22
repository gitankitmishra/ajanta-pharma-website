import { FC, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {

  interface ModuleData {
    moduleName: string;
    moduleNo: string;
    files: FileList | null;
  }
  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");
  const [modules, setModules] = useState<ModuleData[]>([
    { moduleName: "", moduleNo: "", files: null },
  ]);
  // const [assessmentOpt, setAssessmentOpt] = useState([
  //   { assessmentType: "", assessmentName: "" },
  // ]);
  const handleAddModule = () => {
    setModules([...modules, { moduleName: "", moduleNo: "", files: null }]);
  };

  // const handleAddAssessment = () => {
  //   setAssessmentOpt([...assessmentOpt, { assessmentType: "", assessmentName: "" }]);
  // };

  const uploadFile = async () => {
    try {
      if (!modules || !modules.length) {
        console.error("Module data is missing.");
        return;
      }

      const formData = new FormData();

      // Append files from the 'files' variable
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }

      // Append module data files
      modules.forEach((moduleData) => {
        formData.append("moduleName", moduleData.moduleName);
        formData.append("moduleNo", moduleData.moduleNo);
        if (moduleData.files) {
          for (let i = 0; i < moduleData.files.length; i++) {
            formData.append("files", moduleData.files[i]);
          }
        }
      });

      formData.append("courseCode", courseCode);

      const response = await fetch(
        "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadFile/B01",
        {
          method: "PUT",
          body: formData, 
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Upload successful:", data);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    console.log("moduleName:", moduleName);
    console.log("moduleNo:", moduleNo);
    console.log("files:", files);
  }, [moduleName, moduleNo, files]);
  useEffect(() => {
    console.log("Modules data", modules);
  }, [modules]);
  const handleChangeModuleNum = (newModuleNum: string[], index: number) => {
    setModules((prevModules) => {
      const updatedModules = [...prevModules];
      updatedModules[index].moduleNo = newModuleNum[0];
      return updatedModules;
    });
  };

  const handleChangeModuleName = (newModuleName: string[], index: number) => {
    setModules((prevModules) => {
      const updatedModules = [...prevModules];
      updatedModules[index].moduleName = newModuleName[0];
      return updatedModules;
    });
  };

  const handleFileSelect = (selectedFiles: FileList | null, index: number) => {
    setModules((prevModules) => {
      const updatedModules = [...prevModules];
      if (selectedFiles) {
        updatedModules[index].files = selectedFiles;
      }
      return updatedModules;
    });
  };


  //upload an assessment
  interface AssessmentData {
    assessmentFileName: string;
    assessmentFileType: string;
    excelFile: FileList | null;
  }

  const [assessmentFileName,setassessmentFileName] = useState<string[]>([]);
  const [assessmentFileType,setassessmentFileType] = useState<string[]>([]);
  const [excelFile,setexcelFile] = useState<FileList | null>(null);
  const [assessment, setAssessment] = useState<AssessmentData[]>([
    { assessmentFileName: "", assessmentFileType: "", excelFile: null },
  ]);

  useEffect(() => {
    console.log("assessmentFileName:", assessmentFileName);
    console.log("assessmentFileType:", assessmentFileType);
    console.log("excelFile:", excelFile);
  }, [assessmentFileName, assessmentFileType, excelFile]);

  useEffect(() => {
    console.log("Assessment data", assessment);
  }, [assessment]);


  const handleAssessmentTypeChange = (selectedCategory: string, index: number) => {
    const updatedAssessments = [...assessment];
    updatedAssessments[index] = {
      ...updatedAssessments[index], 
      assessmentFileType: selectedCategory 
    };
    setAssessment(updatedAssessments);
  };

  const handleAssessmentFileNameChange = (newFileName: string, index: number) => {
    setAssessment((prevAssessment) => {
      const updatedAssessments = [...prevAssessment];
      updatedAssessments[index] = {
        ...updatedAssessments[index], 
        assessmentFileName: newFileName 
      };
      return updatedAssessments;
    });
  };

  const handleexcelFileSelect = (selectedFiles: FileList | null, index: number) => {
    setAssessment((prevModules) => {
      const updatedModules = [...prevModules];
      if (selectedFiles) {
        updatedModules[index].excelFile = selectedFiles;
      }
      return updatedModules;
    });
  };
  
  const uploadAssessment = async () => {
    try {
      if (!assessment || !assessment.length) {
        console.error("assessment data is missing.");
        return;
      }

      const formData = new FormData();

      // Append files from the 'files' variable
      if (excelFile) {
        for (let i = 0; i < excelFile.length; i++) {
          formData.append("excelFile", excelFile[i]);
        }
      }

      // Append module data files
      assessment.forEach((assessmentData) => {
        formData.append("assessmentFileName", assessmentData.assessmentFileName);
        formData.append("assessmentFileType", assessmentData.assessmentFileType);
        if (assessmentData.excelFile) {
          for (let i = 0; i < assessmentData.excelFile.length; i++) {
            formData.append("excelFile", assessmentData.excelFile[i]);
          }
        }
      });

      formData.append("courseCode", courseCode);

      const response = await fetch(
        "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadAssessment/B01",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Upload successful:", data);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  //optional assessment api
  interface optAssessment {
    preAssessment:string;
    postAssessment:string;
    assessmentFileType:string;
    assessmentFileName:string;
    optexcelFile:FileList | null;
  }

  const [optexcelFile,setoptexcelFile] = useState<FileList | null>(null);
   const [selectedAssessment, setSelectedAssessment] = useState<string[]>([]);

  const [assessmentOpt, setAssessmentOpt] = useState<optAssessment[]>
  ([
    { preAssessment: "", postAssessment: "", assessmentFileType: "", assessmentFileName: "",optexcelFile:null }
  ]);
  
  useEffect(() => {
    console.log("Selected Assessment Type:", selectedAssessment);
    console.log("assessment file type:", assessmentOpt.map(opt => opt.assessmentFileType)); 
    console.log("assessment file name:", assessmentOpt.map(opt => opt.assessmentFileName));    
  }, [selectedAssessment, assessmentOpt]);  
  
  const handleAddAssessment = () => {
    setAssessmentOpt(prevAssessmentOpt => [
      ...prevAssessmentOpt,
      { preAssessment: "", postAssessment: "", assessmentFileType: "", assessmentFileName: "" ,optexcelFile:null}
    ]);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    setSelectedAssessment(prevSelectedAssessment => ({
      ...prevSelectedAssessment,
      [index]: value
    }));
  };
  
  const handleoptAssessmentTypeChange = (selectedCategory: string, index: number) => {
    const updatedoptAssessments = [...assessmentOpt];
    updatedoptAssessments[index] = {
      ...updatedoptAssessments[index], 
      assessmentFileType: selectedCategory 
    };
    setAssessmentOpt(updatedoptAssessments);
};

const handleoptAssessmentFileNameChange = (newFileName: string, index: number) => {
  setAssessmentOpt((prevAssessment) => {
    const updatedAssessments = [...prevAssessment];
    updatedAssessments[index] = {
      ...updatedAssessments[index], 
      assessmentFileName: newFileName 
    };
    return updatedAssessments;
  });
};

const handleoptexcelFileSelect = (selectedFiles: FileList | null, index: number) => {
  setAssessmentOpt((prevModules) => {
    const updatedModules = [...prevModules];
    if (selectedFiles) {
      updatedModules[index].optexcelFile = selectedFiles;
    }
    return updatedModules;
  });
};

  const uploadoptAssessment = async () => {
    try {
      if (!assessmentOpt || !assessmentOpt.length) {
        console.error("optional assessment data is missing.");
        return;
      }
      const formData = new FormData();
      if (optexcelFile) {
        for (let i = 0; i < optexcelFile.length; i++) {
          formData.append("optexcelFile", optexcelFile[i]);
        }
      }

      const assessmentTypeArray = Array.isArray(selectedAssessment) ? selectedAssessment : [selectedAssessment];
      formData.append("assessmentType", JSON.stringify(assessmentTypeArray)); 
      assessmentOpt.forEach((optassessmentData) => {
        formData.append("assessmentFileName", optassessmentData.assessmentFileName);
        formData.append("assessmentFileType", optassessmentData.assessmentFileType);
        if (optassessmentData.optexcelFile) {
          for (let i = 0; i < optassessmentData.optexcelFile.length; i++) {
            formData.append("optexcelFile", optassessmentData.optexcelFile[i]);
          }
        }
      });
  
      formData.append("courseCode", courseCode);
      const response = await fetch(
        "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/optAssessment/B01",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        console.log("Upload successful:", data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const mergedApi = () => {
  setTimeout(() => {
    uploadFile().then(checkCompletion);
  }, 2000);
    
    setTimeout(() => {
    uploadAssessment().then(checkCompletion);
    }, 4000);
    
    setTimeout(() => {
    uploadoptAssessment().then(checkCompletion);
     }, 6000);
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
        {/* <button className="module-save-as-draft-btn" onClick={mergedApi}>
          Save as Draft
        </button> */}
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
                  moduleValue={[module.moduleNo]}
                  onChange={
                    (newModuleNum: string[]) =>
                      handleChangeModuleNum(newModuleNum, index) 
                  }
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleValue={[module.moduleName]}
                  onChange={
                    (newModuleName: string[]) =>
                      handleChangeModuleName(newModuleName, index) 
                  }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={(selectedFiles) =>
                    handleFileSelect(selectedFiles, index)
                  }
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
                  value={assessmentFileType[index]}
                  onValueChange={function (selectedCategory: string): void {
                    handleAssessmentTypeChange(selectedCategory, index);
                  }}

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
                  moduleValue={[assessment[index]?.assessmentFileName]}
                  onChange={(newFileName: string[]) =>
                  handleAssessmentFileNameChange(newFileName[0], index)
                }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Assessment"}
                  onFileSelect={(selectedFiles) =>
                    handleexcelFileSelect(selectedFiles, index)
                  }
                  uploadFile={uploadAssessment}
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
        {assessmentOpt.map((assessment, index) => (
          <>
            <div className="module-radio-selction">
              <div className="module-course-assessment">Course Assessment</div>
              <div className="module-radio-btns">
              <input
                type="radio"
                className="module-assessment-radio-btn"
                id={`preAssessment-${index}`}
                name={`assessmentType-${index}`}
                value="pre"
                checked={selectedAssessment[index] === "pre"}
                onChange={(e) => handleRadioChange(e, index)}
             />
              <label htmlFor={`preAssessment-${index}`} className="module-container-labels">
                Pre Assessment
              </label>
            </div>
            <div className="module-radio-btns">
            <input
              type="radio"
              className="module-assessment-radio-btn"
              id={`postAssessment-${index}`}
              name={`assessmentType-${index}`}
              value="post"
              checked={selectedAssessment[index] === "post"}
              onChange={(e) => handleRadioChange(e, index)}
            />
            <label htmlFor={`postAssessment-${index}`} className="module-container-labels">
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
                value={assessmentOpt[index].assessmentFileType}
                onValueChange={function (selectedCategory: string): void {
                  handleoptAssessmentTypeChange(selectedCategory, index);
                }}
                option1={"Option 1"}
                option2={"Option 2"}
                option3={"Option 3"}
                option4={"Option 4"}
                option5={"Option 5"}
                />

              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                 moduleValue={[assessmentOpt[index]?.assessmentFileName]}
                 onChange={(newFileName: string[]) =>
                 handleoptAssessmentFileNameChange(newFileName[0], index)
               }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={(selectedFiles) =>
                    handleoptexcelFileSelect(selectedFiles, index)
                  }
                  uploadFile={uploadoptAssessment}
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
    </section>
  );
};

export default ModuleQuizStepSection;
