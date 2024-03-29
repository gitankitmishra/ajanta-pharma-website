import { FC, useContext, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import { ModuleContext } from "@/context/course_update/module_context";

import * as XLSX from "xlsx";

import { BasicContext } from "@/context/course_update/basicInfo_context";
import { CourseContext, CourseContextType } from "@/context/course_context";
import DownloadImg from "@/public/images/download.svg";
import Image from "next/image";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  const contextValue = useContext(ModuleContext);
  if (!contextValue) {
    return null;
  }
  const basicContextValue = useContext(BasicContext);
  if (!basicContextValue) {
    return null;
  }
  const { formData } = basicContextValue;
  if (!formData) {
    return null; // Or some other loading state if needed
  }

  // Now you can safely destructure formData
  const {
    course_category,
    course_training,
    course_code: basicCourseCode,
    course_name,
  } = formData;
  const {
    modules,
    handleChangeModuleNum,
    handleChangeModuleName,
    // handleFileSelect,
    // handleAddModule,
    //assessment
    assessment,
    handleAssessmentFileNameChange,
    //handleAssessmentTypeChange,
    handleexcelFileSelect,
    handleChangeAssessmentName,
    //optional assessment
    assessmentOpt,
    handleRadioChange,
    handleoptAssessmentTypeChange,
    handleoptAssessmentFileNameChange,
    handleoptexcelFileSelect,
    handleAddAssessment,
    mergedApi,
  } = contextValue;

  const {
    course_basic,
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
  } = useContext(CourseContext) as CourseContextType;

  interface ModuleData {
    moduleName: string;
    moduleNo: string;
    files: FileList | null;
  }
  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<string[]>([]);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");

  useEffect(() => {
    console.log("Modules data", modules);
  }, [modules]);

  //upload an assessment
  interface AssessmentData {
    assessmentFileName: string;
    assessmentFileType: string;
    excelFile: FileList | null;
  }

  const [assessmentFileName, setassessmentFileName] = useState<string[]>([]);
  const [assessmentFileType, setassessmentFileType] = useState<string[]>([]);
  const [excelFile, setexcelFile] = useState<FileList | null>(null);
  // const [assessment, setAssessment] = useState<AssessmentData[]>([
  //   { assessmentFileName: "", assessmentFileType: "", excelFile: null },
  // ]);

  useEffect(() => {
    console.log("assessmentFileName:", assessmentFileName);
    console.log("assessmentFileType:", assessmentFileType);
    console.log("excelFile:", excelFile);
  }, [assessmentFileName, assessmentFileType, excelFile]);

  useEffect(() => {
    console.log("Assessment data", assessment);
  }, [assessment]);

  //optional assessment api

  const handleexcelFileRead = (selectedFile: FileList | null) => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet);
          console.log("Excel file content:", excelData);
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

  const [optexcelFile, setoptexcelFile] = useState<FileList | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");

  return (
    <section className="module-main-section">
      <div className="module-div-section1">
        <div className="module-div-section1-div1">
          <p className="module-category-text">Category</p>
          <p className="module-category-type-text">
            {course_basic.course_category}
          </p>
        </div>

        <div className="module-div-section1-div2">
          <p className="module-category-text">Training</p>
          <p className="module-category-type-text">
            {course_basic.course_training}
          </p>
        </div>
        <div className="module-div-section1-div3">
          <p className="module-category-text">Course Code & Name</p>
          <p className="module-category-type-text">
            {course_basic.course_code} - {course_basic.course_name}
          </p>
        </div>
      </div>
      <div className="module-div-section2">
        {course_module.map((module, index) => (
          <>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Module Number
                </label>
                <InputField
                  moduleValue={module.module_no.toString()}
                  onUpdate={handleModuleChange}
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  id={`module_name-${index}`}
                  moduleValue={module.module_name}
                  onUpdate={handleModuleChange}
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  // onFileSelect={(selectedFile) =>
                  //   handleFileSelect(selectedFile, index)
                  // }
                  onFileSelect={(selectedFile) => {
                    handleFileSelect(selectedFile, index);
                  }}
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
                  // value={assessmentFileType[index]}
                  id={`assessment_type-${index}`}
                  value={
                    course_assessment[module.assessment_no as number]
                      .assessment_type
                  }
                  onChange={handleAssessmentTypeChange}
                  placeholder="select assessment type"
                  options={[
                    "Multiple Choice Question",
                    "Signle Choice Question",
                    "True or false",
                    "Short Answer",
                  ]}
                  valueLabel={["multiple", "single", "boolean", "short"]}
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Assessment Name
                </label>
                <InputField
                  id={`assessment_name-${index}`}
                  moduleValue={
                    course_assessment[module.assessment_no as number]
                      .assessment_name
                  }
                  onUpdate={handleAssessmentNameChange}
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Assessment"}
                  onFileSelect={() => ""}
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
              <td className="download_image">
                <Image
                  src={DownloadImg}
                  alt="Download"
                  width={27}
                  height={24}
                  onClick={() => handleDownloadExcel(index)}
                />
              </td>
            </div>
          </>
        ))}
        <button className="module-sec-add-module-btn" onClick={handleAddModule}>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        <>
          <div className="module-radio-selction">
            <div className="module-course-assessment">Course Assessment</div>
          </div>
          <div className="module-input">
            <div className="module-input-number">
              <label htmlFor="" className="module-container-labels">
                Select Assessment Type
              </label>
              <DropdownInputField
                id="pre"
                value={course_assessment_main[0]?.assessment_type}
                placeholder="select assessment type"
                onChange={handleAssessmentTypeChange}
                options={[
                  "Multiple Choice Question",
                  "Signle Choice Question",
                  "True or false",
                  "Short Answer",
                ]}
                valueLabel={["multiple", "single", "boolean", "short"]}
              />
            </div>
            <div className="module-input-name">
              <label htmlFor="" className="module-container-labels">
                Assessment Name
              </label>
              <InputField
                id="pre"
                moduleValue={course_assessment_main[0].assessment_name}
                onUpdate={handleAssessmentNameChange}
              />
            </div>
            <div className="module-input-uplaod-btn">
              <UploadButton
                upload={"Upload Course Material"}
                onFileSelect={(selectedFiles) =>
                  handleoptexcelFileSelect(selectedFiles, 0)
                }
                acceptedTypes=".xls"
                formatText={"File Format: xls"}
              />
            </div>
          </div>

          <div className="module-input">
            <div className="module-input-number">
              <label htmlFor="" className="module-container-labels">
                Select Assessment Type
              </label>
              <DropdownInputField
                id="post"
                value={course_assessment_main[1]?.assessment_type}
                placeholder="select assessment type"
                onChange={handleAssessmentTypeChange}
                options={[
                  "Multiple Choice Question",
                  "Signle Choice Question",
                  "True or false",
                  "Short Answer",
                ]}
                valueLabel={["multiple", "single", "boolean", "short"]}
              />
            </div>
            <div className="module-input-name">
              <label htmlFor="" className="module-container-labels">
                Assessment Name
              </label>
              <InputField
                moduleValue={course_assessment_main[1].assessment_name}
                id="post"
                onUpdate={handleAssessmentNameChange}
              />
            </div>
            <div className="module-input-uplaod-btn">
              <UploadButton
                upload={"Upload Course Material"}
                onFileSelect={(selectedFiles) =>
                  handleoptexcelFileSelect(selectedFiles, 0)
                }
                acceptedTypes=".xls"
                formatText={"File Format: xls"}
              />
            </div>
          </div>
        </>
        {/* <button
          className="module-sec-add-module-btn"
          onClick={handleAddAssessment}
        >
          <PlusIcon />
          Add Assessment
        </button> */}
      </div>
    </section>
  );
};

export default ModuleQuizStepSection;
