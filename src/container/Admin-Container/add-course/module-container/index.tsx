import { FC, useContext, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";
import DownloadImg from "@/public/images/download.svg";
import Image from "next/image";
import ViewEyeIcon from "@/components/icons/view-eye-icon";
import EyeIcon from "@/components/icons/eye-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
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
    filesUploaded,
    openLink,
    handleFileSelect,
    handleDownloadExcel,
    handleexcelFileRead,
  } = useContext(CourseContext) as CourseContextType;

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
                  onFileSelect={(selectedFile: File) => {
                    handleFileSelect(selectedFile, index);
                  }}
                  acceptedTypes=".mp4,.ppt,.pdf"
                  formatText={"File Format: mp4, ppt, pdf "}
                />
              </div>
              <div>
                <EyeIcon filesUploaded={filesUploaded} files={files} />
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
                      ?.assessment_type
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
                  uploadFile={() => (selectedFile: File) => {
                    console.log("going to check");
                    handleexcelFileRead(selectedFile, index, "module");
                  }}
                  onFileSelect={(selectedFile: File) => {
                    handleexcelFileRead(selectedFile, index, "module");
                  }}
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
              <div>
                <EyeIcon files={[]} />
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
                moduleValue={course_assessment_main[0]?.assessment_name}
                onUpdate={handleAssessmentNameChange}
              />
            </div>
            <div className="module-input-uplaod-btn">
              <UploadButton
                id="pre"
                upload={"Upload Assessment"}
                uploadFile={() => (selectedFile: File) => {
                  console.log("going to check");
                  handleexcelFileRead(selectedFile, 0, "course");
                }}
                onFileSelect={(selectedFile: File) => {
                  handleexcelFileRead(selectedFile, 0, "course");
                }}
                acceptedTypes=".xls"
                formatText={"File Format: xls"}
              />
            </div>
            <div>
              <EyeIcon files={[]} />
            </div>
            <td className="download_image">
              <Image
                src={DownloadImg}
                alt="Download"
                width={27}
                height={24}
                onClick={() => handleDownloadExcel(0)}
              />
            </td>
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
                moduleValue={course_assessment_main[1]?.assessment_name}
                id="post"
                onUpdate={handleAssessmentNameChange}
              />
            </div>
            <div className="module-input-uplaod-btn">
              <UploadButton
                id="post"
                upload={"Upload Assessment"}
                uploadFile={() => (selectedFile: File) => {
                  console.log("going to check");
                  handleexcelFileRead(selectedFile, 1, "course");
                }}
                onFileSelect={(selectedFile: File) => {
                  handleexcelFileRead(selectedFile, 1, "course");
                }}
                acceptedTypes=".xls"
                formatText={"File Format: xls"}
              />
            </div>
            <div>
              <EyeIcon files={[]} />
            </div>
            <td className="download_image">
              <Image
                src={DownloadImg}
                alt="Download"
                width={27}
                height={24}
                onClick={() => handleDownloadExcel(1)}
              />
            </td>
          </div>
        </>
      </div>
    </section>
  );
};

export default ModuleQuizStepSection;
