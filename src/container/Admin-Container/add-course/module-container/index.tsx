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
import { CancelIcon } from "@/components/icons/cancel-icon";
import { DownloadIcon } from "@/components/icons/download-icon";
import { WhiteCancelIcon } from "@/components/icons/whiteCancelIcon";
import { OrangePlusIcon } from "@/components/icons/orange-plus-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  const {
    course_basic,
    course_module,
    course_module_error,
    course_assessment,
    handleAddModule,
    handleDeleteModule,
    handleModuleChange,
    handleAssessmentNameChange,
    handleAssessmentTypeChange,
    course_assessment_main,
    files,
    filesUploaded,
    handleFileSelect,
    handleDownloadExcel,
    handleexcelFileRead,
    writeIntoFile,
    handleCancelIcon,
    openLink,
    handleCancelIconAssessment,
    visible,
    fileSize,
    fileExtension,
    course_assessment_error,
    course_assessment_main_error,
  } = useContext(CourseContext) as CourseContextType;
  console.log("module error", course_module_error);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <p className="module-category-text">Course Code </p>
          <p className="module-category-type-text">
            {course_basic.course_code}
          </p>
        </div>
        <div className="module-div-section1-div4">
          <p className="module-category-text">Course Name</p>
          <p className="module-category-type-text">
            {course_basic.course_name}
          </p>
        </div>
      </div>
      <div className="module-div-section2">
        {course_module.map((module, index) => (
          <>
            {module.module_no > 1 && (
              <button
                className="module-sec-add-module-btn"
                onClick={() => handleDeleteModule(index)}
              >
                <span className="module-sec-add-module-btn-add-module">
                  <CancelIcon /> Module 0{module.module_no.toString()}
                </span>
              </button>
            )}
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Module Number
                </label>
                <InputField
                  moduleValue={module.module_no?.toString()}
                  onUpdate={handleModuleChange}
                  disabled={true}
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
                  error={course_module_error[index]?.module_name}
                />
              </div>
              <div className="module-eye-icon">
                <div>
                  {/* <span onClick={() => handleDownloadExcel(index)}>
                    <DownloadIcon />
                  </span> */}
                </div>
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={(selectedFile: File) => {
                    handleFileSelect(selectedFile, index);
                  }}
                  acceptedTypes=".mp4,.ppt,.pdf"
                  formatText={"File Format: mp4, ppt, pdf "}
                  error={course_module_error[index]?.module_material}
                />
              </div>
              <div className="module-input-view-btn">
                <div className="module-input-view-btn-subdiv">
                  <div className="module-input-view-btn-area">
                    {filesUploaded[index] ? (
                      <span
                        className="module-input-view-btn-cancel-icon-span"
                        onClick={() => {
                          handleCancelIcon(index);
                        }}
                      >
                        <CancelIcon />
                      </span>
                    ) : (
                      <span>
                        <WhiteCancelIcon />
                      </span>
                    )}
                    {files.length !== 0 && (
                      <span
                        className="module-view-btn-xls-text"
                        onClick={() => openLink(index)}
                      >
                        {fileExtension[index]}
                      </span>
                    )}
                    {/* <span
                      className="module-view-btn-xls-text"
                      onClick={() => openLink(index)}
                    >
                      {fileExtension[index]}
                    </span> */}
                  </div>

                  <div className="module-input-view-text-area">
                    <span className="module-input-view-btn-file-name-text">
                      File
                    </span>
                    {files.length !== 0 &&
                    fileSize[index] !== undefined &&
                    fileSize[index] !== null ? (
                      <span className="module-input-view-btn-file-size-text">
                        {(fileSize[index] / (1024 * 1024)).toFixed(2)}MB
                      </span>
                    ) : (
                      <span className="module-input-view-btn-file-size-text">
                        0.00MB
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {filesUploaded[index] ? (
                    <div className="module-file-upload-successfull-msg">
                      Course file upload successfull!
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
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
                  placeholder="Select assessment type"
                  options={[
                    "Multiple Choice Question",
                    "Signle Choice Question",
                    "True or false",
                    "Short Answer",
                    "Not Applicable",
                  ]}
                  valueLabel={["multiple", "single", "boolean", "short", "N/A"]}
                  error={course_assessment_error[index]?.assessment_type}
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
                      ?.assessment_name
                  }
                  onUpdate={handleAssessmentNameChange}
                  error={course_assessment_error[index]?.assessment_name}
                />
              </div>
              <div className="module-eye-icon">
                <div className="module-download-image">
                  <span
                    className="module-download-image-span "
                    onClick={() => handleDownloadExcel(index)}
                  >
                    <DownloadIcon />
                  </span>
                </div>
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
              <div className="module-input-view-btn">
                <div className="module-input-view-btn-subdiv">
                  <div className="module-input-view-btn-area">
                    {course_assessment[index]?.assessment_data.length > 0 ? (
                      <span
                        className="module-input-view-btn-cancel-icon-span"
                        onClick={() => {
                          handleCancelIconAssessment(null, index);
                        }}
                      >
                        <CancelIcon />
                      </span>
                    ) : (
                      <>
                        <span>
                          <WhiteCancelIcon />
                        </span>
                      </>
                    )}

                    <span
                      id="module"
                      className="module-view-btn-xls-text"
                      onClick={() => writeIntoFile(null, index)}
                    >
                      XLS
                    </span>
                  </div>
                  <div className="module-input-view-text-area">
                    {course_assessment[index]?.assessment_data.length > 0 ? (
                      <span className="module-input-view-btn-file-name-text">
                        excel.xls
                      </span>
                    ) : (
                      <span className="module-input-view-btn-file-name-text">
                        File
                      </span>
                    )}
                    {course_assessment[index]?.assessment_data.length > 0 ? (
                      <span className="module-input-view-btn-file-size-text">
                        2.2MB
                      </span>
                    ) : (
                      <span className="module-input-view-btn-file-size-text">
                        0.00MB
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {course_assessment[index]?.assessment_data.length > 0 ? (
                    <div className="module-file-upload-successfull-msg">
                      Assessment file uploaded successfull!
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}

        <button className="module-sec-add-module-btn" onClick={handleAddModule}>
          <span className="module-sec-add-module-btn-add-module">
            <OrangePlusIcon /> Add Module
          </span>
        </button>
      </div>
      <div className="module-div-section3">
        <>
          <div className="module-radio-selction">
            <div className="module-course-assessment">
              Course Assessment {""}
              {/* <span className="module-course-assessment-optional-span">
                (Optional)
              </span> */}
            </div>
          </div>
          <div className="module-input">
            <div className="module-input-number">
              <label htmlFor="" className="module-container-labels">
                Select Pre-Assessment Type
              </label>
              <DropdownInputField
                id="pre"
                value={course_assessment_main[0]?.assessment_type}
                placeholder="Select pre assessment type"
                onChange={handleAssessmentTypeChange}
                options={[
                  "Multiple Choice Question",
                  "Signle Choice Question",
                  "True or false",
                  "Short Answer",
                  "Not Applicable",
                ]}
                valueLabel={["multiple", "single", "boolean", "short", "N/A"]}
                error={course_assessment_main_error[0]?.assessment_type}
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
                error={course_assessment_main_error[0]?.assessment_name}
              />
            </div>
            <div className="module-eye-icon">
              <span onClick={() => handleDownloadExcel(0)}>
                <DownloadIcon />
              </span>
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
            <div className="module-input-view-btn">
              <div className="module-input-view-btn-subdiv">
                <div className="module-input-view-btn-area">
                  {course_assessment_main[0]?.assessment_data.length > 0 ? (
                    <span
                      className="module-input-view-btn-cancel-icon-span"
                      onClick={() => {
                        handleCancelIconAssessment("pre", 0);
                      }}
                    >
                      <CancelIcon />
                    </span>
                  ) : (
                    <>
                      {" "}
                      <span>
                        <WhiteCancelIcon />
                      </span>
                    </>
                  )}

                  <span
                    className="module-view-btn-xls-text"
                    onClick={() => writeIntoFile("pre", 0)}
                  >
                    XLS
                  </span>
                </div>
                <div className="module-input-view-text-area">
                  {course_assessment_main[0]?.assessment_data.length > 0 ? (
                    <span className="module-input-view-btn-file-name-text">
                      excel.xls
                    </span>
                  ) : (
                    <span className="module-input-view-btn-file-name-text">
                      File
                    </span>
                  )}
                  {course_assessment_main[0]?.assessment_data.length > 0 ? (
                    <span className="module-input-view-btn-file-size-text">
                      2.2MB
                    </span>
                  ) : (
                    <span className="module-input-view-btn-file-size-text">
                      0.00MB
                    </span>
                  )}
                </div>
              </div>
              <div>
                {course_assessment_main[0]?.assessment_data.length > 0 ? (
                  <div className="module-file-upload-successfull-msg">
                    Assessment file uploaded successfull!
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="module-input">
            <div className="module-input-number">
              <label htmlFor="" className="module-container-labels">
                Select Post-Assessment Type
              </label>
              <DropdownInputField
                id="post"
                value={course_assessment_main[1]?.assessment_type}
                placeholder="Select post assessment type"
                onChange={handleAssessmentTypeChange}
                options={[
                  "Multiple Choice Question",
                  "Signle Choice Question",
                  "True or false",
                  "Short Answer",
                  "Not Applicable",
                ]}
                valueLabel={["multiple", "single", "boolean", "short", "N/A"]}
                error={course_assessment_main_error[1]?.assessment_type}
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
                error={course_assessment_main_error[1]?.assessment_name}
              />
            </div>
            <div className="module-eye-icon">
              <span onClick={() => handleDownloadExcel(0)}>
                <DownloadIcon />
              </span>
            </div>
            <div className="module-input-uplaod-btn">
              <UploadButton
                id="post"
                upload={"Upload Assessment"}
                uploadFile={() => (selectedFile: File) => {
                  handleexcelFileRead(selectedFile, 1, "course");
                }}
                onFileSelect={(selectedFile: File) => {
                  handleexcelFileRead(selectedFile, 1, "course");
                }}
                acceptedTypes=".xls"
                formatText={"File Format: xls"}
              />
            </div>
            <div className="module-input-view-btn">
              <div className="module-input-view-btn-subdiv">
                <div className="module-input-view-btn-area">
                  {course_assessment_main[1]?.assessment_data.length > 0 ? (
                    <span
                      className="module-input-view-btn-cancel-icon-span"
                      onClick={() => {
                        handleCancelIconAssessment("post", 1);
                      }}
                    >
                      <CancelIcon />
                    </span>
                  ) : (
                    <>
                      {" "}
                      <span>
                        <WhiteCancelIcon />
                      </span>
                    </>
                  )}

                  <span
                    className="module-view-btn-xls-text"
                    onClick={() => writeIntoFile("post", 1)}
                  >
                    XLS
                  </span>
                </div>
                <div className="module-input-view-text-area">
                  {course_assessment_main[1]?.assessment_data.length > 0 ? (
                    <span className="module-input-view-btn-file-name-text">
                      excel.xls
                    </span>
                  ) : (
                    <span className="module-input-view-btn-file-name-text">
                      File
                    </span>
                  )}
                  {course_assessment_main[1]?.assessment_data.length > 0 ? (
                    <span className="module-input-view-btn-file-size-text">
                      2.2MB
                    </span>
                  ) : (
                    <span className="module-input-view-btn-file-size-text">
                      0.00MB
                    </span>
                  )}
                </div>
              </div>
              <div>
                {course_assessment_main[1]?.assessment_data.length > 0 ? (
                  <div className="module-file-upload-successfull-msg">
                    Assessment file uploaded successfull!
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default ModuleQuizStepSection;
