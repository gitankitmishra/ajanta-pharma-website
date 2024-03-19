import { FC, useEffect, useState, ChangeEvent } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";

interface ModuleQuizStepSectionProps {}

interface ModuleData {
  moduleName: string;
  moduleNo: string;
  files: FileList | null;
}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");
  const [moduleData, setModuleData] = useState<ModuleData[]>([
    { moduleName: "", moduleNo: "", files: null },
  ]);

  const handleAddModule = () => {
    setModuleData([
      ...moduleData,
      { moduleName: "", moduleNo: "", files: null },
    ]);
  };

  const handleChange = (newModuleData: ModuleData[]) => {
    setModuleData(newModuleData);
  };

  const uploadFile = async () => {
    try {
      if (!moduleData || !moduleData.length) {
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
      moduleData.forEach((module) => {
        formData.append("moduleName", module.moduleName);
        formData.append("moduleNo", module.moduleNo);
        if (module.files) {
          for (let i = 0; i < module.files.length; i++) {
            formData.append("files", module.files[i]);
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

  // useEffect(() => {
  //   console.log("moduleName:", moduleName);
  //   console.log("moduleNo:", moduleNo);
  //   console.log("files:", files);
  // }, [moduleName, moduleNo, files]);

  useEffect(() => {
    console.log("Module Data ->", moduleData);
  },[moduleData]);

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
      <button className="module-save-as-draft-btn" onClick={uploadFile}>
        Save as Draft
      </button>

      <div className="module-div-section2">
        {moduleData.map((module, index) => (
          <>
            <div key={index}>
              <InputField
                moduleData={moduleData}
                index={index}
                onChange={handleChange}
              />
              <div className="module-input">
                <div className="module-input-number">
                  <label htmlFor="" className="module-container-labels">
                    Select Assessment Type
                  </label>
                  <DropdownInputField
                    value={""}
                    onValueChange={function (
                      selectedCategory: string
                    ): void {
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
                </div>
                <div className="module-input-uplaod-btn">
                  <UploadButton
                    upload={"Upload Assessment"}
                    onFileSelect={function (
                      files: FileList | null
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                    uploadFile={undefined}
                    acceptedTypes=".xls"
                    formatText={"File Format: xls"}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
        <button
          className="module-sec-add-module-btn"
          onClick={handleAddModule}
        >
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        <button
          className="module-sec-add-module-btn"
          onClick={handleAddModule}
        >
          <PlusIcon />
          Add Assessment
        </button>
      </div>
    </section>
  );
};

export default ModuleQuizStepSection;
