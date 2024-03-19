import { FC, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import InputFieldNum from "@/components/fields/InputFieldNum";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  // const [moduleName,setModuleName] = useState<string[]>([]);
  // const [moduleNo,setModuleNo] = useState<number[]>([]);
  // const [files,setFiles] = useState<string[]>([]);
  // const [courseCode,setCourseCode] = useState<string>("");

  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<number[]>([]);
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
  const handleChangeModuleNum = (newModuleNum: number[]) => {
    setModuleNo(newModuleNum);
  };

  const handleChangeModuleName = (newModuleName: string[]) => {
    setModuleName(newModuleName);
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
                <InputFieldNum
                  moduleNum={moduleNo}
                  onChange={(newModuleNum: number[]) =>
                    handleChangeModuleNum(newModuleNum)
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
                  option5={"Classroom Training"}           />
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
      <button className="module-save-as-draft-btn">Save as Draft</button>
    </section>
  );
};

export default ModuleQuizStepSection;