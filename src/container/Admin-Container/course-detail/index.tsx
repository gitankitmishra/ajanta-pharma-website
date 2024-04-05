"use client";
import Breadcrumb from "@/components/breadcrumb";
import { FC, useContext, useEffect, useState } from "react";
import "./style.css";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import DropdownSubInputField from "@/components/fields/dropdown-sub-input-field";
import InputFieldString from "@/components/fields/string-input-field";
import DateInputField from "@/components/fields/start-date-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import { GreyPlusIcon } from "@/components/icons/greyPlusIcon";
import { createContext } from "vm";
import { CourseContext, CourseContextType } from "@/context/course_context";
import TextAreaField from "@/components/fields/TextAreaField";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";

interface AdminCourseDeatilContainerProps {}

const AdminCourseDeatilContainer: FC<
  AdminCourseDeatilContainerProps
> = ({}) => {
  //context
  const {
    course_basic,
    handleChange,
    course_module,
    course_assessment,
    course_assessment_main,
    course_designation,
    handleFileSelect,
    handleChangeDesignation,
    handleModuleChange,
    handleAddModule,
    handleexcelFileRead,
    handleAssessmentNameChange,
    handleAssessmentTypeChange,
    updateCourse,
    openLink,
  } = useContext(CourseContext) as CourseContextType;
  const allDivisions = [
    "CDC",
    "Nuventa",
    "Revance",
    "Solesta",
    "Inovio",
    "Anvaxx",
    "Illuma",
    "Inyx",
    "Ansca",
    "Zillion",
    "Avecea",
    "Axys",
    "Maxcor",
    "Almiron",
    "Mexlon",
    "Hospicare",
  ];

  const allDesignation = [
    "Cluster Head- Derma",
    "Cluster Head- Pain",
    "Sales Head",
    "Sales Manager",
    "DSM",
    "RSM",
    "DM",
    "SO",
  ];

  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState({
    edit: "Edit",
    discard: "Back",
  });

  //usestate Call

  const handleEditClick = () => {
    if (buttonText.edit === "Edit") {
      setIsEditable(true);
      setButtonText({ edit: "Next", discard: "Discard" });
    } else if (buttonText.edit === "Upload") {
      updateCourse();
    } else {
      setButtonText({ edit: "Upload", discard: "Previous" });
    }
    setIsClicked(true);
  };
  interface ModuleData {
    moduleName: string;
    moduleNo: string;
    files: FileList | null;
  }
  const [modules, setModules] = useState<ModuleData[]>([
    { moduleName: "", moduleNo: "", files: null },
  ]);

  const [assessmentOpt, setAssessmentOpt] = useState([
    { assessmentType: "", assessmentName: "" },
  ]);

  const handleAddAssessment = () => {
    setAssessmentOpt([
      ...assessmentOpt,
      { assessmentType: "", assessmentName: "" },
    ]);
    setIsClicked(true);
  };

  const breadcrumbItems = [
    { label: "Courses", href: "/admin/admin-dashboard" },
    {
      label: " Course Details",
      href: "/admin/admin-course-detail",
      isActive: true,
    },
  ];

  //useState
  const [isEditable, setIsEditable] = useState(false);
  console.log("check training", course_basic.course_training);
  console.log("course assessment", course_assessment);

  return (
    <section className="admin-course-detail-container-main-section">
      <div className="admin-course-detail-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
        <p className="admin-course-detail-text">Course Details</p>
      </div>
      <div className="admin-course-detail-details-main-section">
        <div className="admin-course-detail-div-section">
          <div className="admin-course-detail-section1">
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Category
              </label>
              <DropdownInputField
                value={course_basic.course_category}
                onValueChange={(value) =>
                  handleChange("course_category", value)
                }
                options={[
                  "Competency Based Skills",
                  "Medical",
                  "Marketing",
                  "Personal Development",
                  "Classroom Training",
                ]}
                valueLabel={[""]}
                isEditable={!isEditable}
              />
            </div>
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Training
              </label>
              <DropdownSubInputField
                onValueChange={(value) =>
                  handleChange("course_training", value)
                }
                selectedCategory={course_basic.course_category}
                isEditable={!isEditable}
              />
            </div>
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Course Code & Name
              </label>
              <InputFieldString
                className="input-field"
                value={`${course_basic.course_code}  ${course_basic.course_name}`}
                onChange={(newValue: string) => {
                  const [newCode, newName] = newValue.split(" ");
                  handleChange("course_code", newCode);
                  handleChange("course_name", newName);
                }}
                isEditable={!isEditable}
              />
              {/* <InputFieldString
                placeholder="Enter Course Name"
                width="80%"
                value={`${course_basic.course_code}  ${course_basic.course_name}`}
                onChange={(value) => handleChange("course_name", value)}
                className="input-field"
                isEditable={!isEditable}
              /> */}
            </div>
          </div>
          <div className="admin-course-detail-div-section2">
            <label htmlFor="" className="admin-course-detail-section-labels">
              Learning Objective
            </label>
            {/* <input
              type="text"
              className="admin-course-detail-learning-objective-input"
              value={course_basic.course_objective}
              disabled={!isEditable}
            /> */}
            <TextAreaField
              placeholder="Enter Learning Objective"
              className="admin-course-detail-learning-objective-input"
              value={course_basic.course_objective}
              onChange={(value) => handleChange("course_objective", value)}
              isEditable={!isEditable}
            />
          </div>
          <div className="admin-course-detail-div-section3">
            <DateInputField
              startDate={course_basic.course_start_date?.toString() ?? ""}
              endDate={course_basic.course_end_date.toString()}
              onStartDateChange={(value) =>
                handleChange("course_start_date", value)
              }
              onEndDateChange={(value) =>
                handleChange("course_end_date", value)
              }
              isEditable={!isEditable}
            />
          </div>
        </div>
        <div className="admin-course-detail-div-section">
          {course_module?.map((module, index) => {
            return (
              <div className="admin-course-detail-section2" key={index}>
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Module Number
                  </label>
                  {/* <InputFieldString
                      className="input-field"
                      value={module.module_no}
                      onChange={handleCourseCodeAndNameChange}
                    /> */}
                  <InputField
                    moduleValue={module.module_no.toString()}
                    onUpdate={handleModuleChange}
                    isEditable={!isEditable}
                  />
                </div>
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Module Name
                  </label>
                  {/* <InputFieldString
                      className="input-field"
                      value={formData.courseCode + " " + formData.courseName}
                      onChange={handleCourseCodeAndNameChange}
                    /> */}
                  <InputField
                    id={`module_name-${index}`}
                    moduleValue={module.module_name}
                    onUpdate={handleModuleChange}
                    isEditable={!isEditable}
                  />
                </div>
                <div className="admin-course-detail-section2-admin-course-detailed-file">
                  <div className="admin-course-detailed-video-file">
                    {/* <input type="text" className="admin-course-detailed-mp4" /> */}

                    <span
                      key={index}
                      className="admin-course-detailed-file-name"
                      onClick={() => openLink(index)}
                    >
                      View
                    </span>
                  </div>
                  <div className="admin-course-detailed-video-file-text">
                    <span className="admin-course-detail-file-name">
                      video.mp4
                    </span>
                    <br />
                    <span className="admin-course-detail-file-size">2.2MB</span>
                  </div>
                </div>
                <div className="admin-course-detail-upload-btns">
                  {/* <button
                    className={`admin-course-detail-upload-btn ${
                      isClicked ? "clicked" : "unClicked"
                    }`}
                  >
                    Upload
                  </button> */}
                  <UploadButton
                    upload={"Upload"}
                    onFileSelect={(selectedFile: File) => {
                      handleFileSelect(selectedFile, index);
                    }}
                    acceptedTypes=".mp4,.ppt,.pdf"
                    formatText={"File Format: mp4, ppt, pdf "}
                    className={`admin-course-detail-upload-btn ${
                      isClicked ? "clicked" : "unclicked"
                    }`}
                  />
                </div>
              </div>
            );
          })}

          <div className="admin-course-detail-section2">
            {course_assessment?.map((assessment: any, index: number) => {
              console.log("checkkkk", assessment);
              return (
                <>
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Type
                    </label>
                    <DropdownInputField
                      id={`assessment_type-${index}`}
                      value={assessment.assessment_type}
                      onChange={handleAssessmentTypeChange}
                      placeholder="select assessment type"
                      options={[
                        "Multiple Choice Question",
                        "Single Choice Question",
                        "True or false",
                        "Short Answer",
                      ]}
                      valueLabel={[
                        "multiple",
                        "single",
                        "True or false",
                        "short",
                      ]}
                      isEditable={!isEditable}
                    />
                  </div>

                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Name
                    </label>
                    <InputField
                      id={`assessment_name-${index}`}
                      moduleValue={assessment.assessment_name}
                      onUpdate={handleAssessmentNameChange}
                      isEditable={!isEditable}
                    />
                  </div>

                  <div className="admin-course-detail-section2-admin-course-detailed-file">
                    <div className="admin-course-detailed-video-file">
                      <span className="admin-course-detailed-file-name">
                        XLS
                      </span>
                      {/* <input type="text" className="admin-course-detailed-mp4" /> */}
                    </div>
                    <div className="admin-course-detailed-video-file-text">
                      <span className="admin-course-detail-file-name">
                        excel.xls
                      </span>
                      <br />
                      <span className="admin-course-detail-file-size">
                        2.2MB
                      </span>
                    </div>
                  </div>
                  <div className="admin-course-detail-upload-btns">
                    {/* <button
                      className={`admin-course-detail-upload-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    >
                      Upload
                    </button> */}
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
                      className={`admin-course-detail-upload-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    />
                  </div>
                </>
              );
            })}
          </div>

          <button
            className={`admin-course-detail-sec-add-module-btn ${
              isClicked ? "clicked" : "unClicked"
            }`}
            onClick={handleAddModule}
          >
            {isClicked ? <PlusIcon /> : <GreyPlusIcon />}
            Add Module
          </button>

          <>
            <div className="admin-course-detail-section2-course-assessment">
              <p className="admin-course-detail-course-assessment-text">
                Course Assessment{" "}
              </p>
              {/* <div className="admin-course-detail-assessment-radio-btns ">
                    <input
                      type="radio"
                      id="pre"
                      className={`admin-course-detail-assesment-radio-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    />
                    <label
                      htmlFor="pre"
                      className="admin-course-detail-selected-assessment"
                    >
                      Pre Assessment
                    </label>
                  </div> */}
              {/* <div className="admin-course-detail-assessment-radio-btns">
                    <input
                      type="radio"
                      id="post-assessment"
                      className={`admin-course-detail-assesment-radio-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    />
                    <label
                      htmlFor="post-assessment"
                      className="admin-course-detail-selected-assessment"
                    >
                      Post Assessment
                    </label>
                  </div> */}
            </div>
            {course_assessment_main[0].assessment_name != "" && (
              <div className="admin-course-detail-section2">
                <div className="pre-assessment">Pre</div>
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Assessment Type
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
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Assessment Name
                  </label>
                  <InputField
                    id="pre"
                    moduleValue={course_assessment_main[0].assessment_name}
                    onUpdate={handleAssessmentNameChange}
                  />
                </div>
              </div>
            )}
            ;{/* post  */}
            {course_assessment_main[1]?.assessment_name != "" && (
              <div className="admin-course-detail-section2">
                <div className="pre-assessment">Post</div>
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Assessment Type
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
                <div className="admin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Assessment Name
                  </label>
                  <InputField
                    id="post"
                    moduleValue={course_assessment_main[1]?.assessment_name}
                    onUpdate={handleAssessmentNameChange}
                  />
                </div>
              </div>
            )}
          </>
        </div>

        <div className="admin-course-detail-div-checkbox-main-section">
          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text">Divisions </p>
            </div>
            <div className="admin-course-detail-checkbox-section">
              {allDivisions.map((division, index) => (
                <Checkbox
                  key={index}
                  id={`division-${index}`}
                  text={division}
                  value={division}
                  onChange={handleChangeDesignation}
                  isChecked={course_designation?.division.includes(division)}
                  disabled={!isEditable}
                />
              ))}
            </div>
          </div>

          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text"> Designation</p>
            </div>
            <div className="admin-course-detail-checkbox-section2">
              {allDesignation.map((designation, index) => (
                <Checkbox
                  key={index}
                  id={`designation-${index}`}
                  text={designation}
                  value={designation}
                  onChange={handleChangeDesignation}
                  isChecked={course_designation?.designation.includes(
                    designation
                  )}
                  isEditable={!isEditable}
                  disabled={!isEditable}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="admin-course-detail-status-update-section">
          <div className="admin-course-detail-status-update-div-sections">
            <label
              htmlFor=""
              className="admin-course-detail-section-label-status-text"
            >
              Course Status
            </label>
            <DropdownInputField
              value={course_basic.course_status}
              onValueChange={(value) => handleChange("course_status", value)}
              options={["active", "inactive"]}
              valueLabel={[""]}
              isEditable={!isEditable}
            />
          </div>
        </div>
        <div className="admin-course-detail-submit-buttons-section">
          <PreviousButton text={buttonText.discard} />
          <NextButton text={buttonText.edit} onClick={handleEditClick} />
        </div>
      </div>
    </section>
  );
};

export default AdminCourseDeatilContainer;
