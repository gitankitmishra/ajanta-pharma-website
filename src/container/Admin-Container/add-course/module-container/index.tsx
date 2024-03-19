import { FC, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  // const [moduleName,setModuleName] = useState<string[]>([]);
  // const [moduleNo,setModuleNo] = useState<number[]>([]);
  // const [files,setFiles] = useState<string[]>([]);
  // const [courseCode,setCourseCode] = useState<string>("");

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
  const [assessment, setAssessment] = useState([
    { assessmentType: "", assessmentName: "" },
  ]);
  const handleAddModule = () => {
    setModules([...modules, { moduleName: "", moduleNo: "", files: null }]);
  };

  const handleAddAssessment = () => {
    setAssessment([...assessment, { assessmentType: "", assessmentName: "" }]);
  };

  // const uploadFile = async () => {
  //   try {
  //     if (!files) return;

  //     const formData = new FormData();
  //     formData.append("moduleName", moduleName.toString());
  //     formData.append("moduleNo", moduleNo.toString());
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("files", files[i]);
  //     }
  //     formData.append("courseCode", courseCode);

  //     const response = await fetch("http://localhost:8000/api/admin/dashboard/uploadFile/B01", {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       },
  //       body: JSON.stringify({
  //         formData
  //       })
  //     });

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
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
        "http://localhost:8000/api/admin/dashboard/uploadFile/B01",
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
        // Update the files for the specific module at the given index
        updatedModules[index].files = selectedFiles;
      }
      return updatedModules;
    });
  };

  return (
    <section className="module-main-section">
      <div className="module-div-section1">
        <div className="module-div-section1-div1">
          <p className="module-category-text">Category</p>
          <p className="module-category-type-text">Competency Based Skills</p>
        </div>
        <button className="module-save-as-draft-btn" onClick={uploadFile}>
          Save as Draft
        </button>
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
                  moduleValue={[module.moduleNo]} // Pass moduleNo as an array
                  onChange={
                    (newModuleNum: string[]) =>
                      handleChangeModuleNum(newModuleNum, index) // Pass index
                  }
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleValue={[module.moduleName]} // Pass moduleName as an array
                  onChange={
                    (newModuleName: string[]) =>
                      handleChangeModuleName(newModuleName, index) // Pass index
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
                  value={""}
                  onValueChange={function (selectedCategory: string): void {
                    throw new Error("Function not implemented.");
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
                  moduleValue={[]}
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
                  }}
                  option1={""}
                  option2={""}
                  option3={""}
                  option4={""}
                  option5={""}
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleValue={[]}
                  onChange={function (newModuleName: string[]): void {
                    throw new Error("Function not implemented.");
                  }}
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
