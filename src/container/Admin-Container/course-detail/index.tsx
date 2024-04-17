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
import { CancelIcon } from "@/components/icons/cancel-icon";
import SuccessPopup from "@/components/popups/success-popup";

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
    writeIntoFile,
    handleCancelIcon,
    fileExtension,
    filesUploaded,
    fileSize,
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

  const [fileName, setFileName] = useState("Video");
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState({
    edit: "Edit",
    discard: "Back",
  });
  const [popupvisible, setPopupVisible] = useState<boolean>(false);

  //usestate Call

  const popupClose = () => {
    setPopupVisible(false);
  };

  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    switch (buttonText.edit) {
      case "Edit":
        setIsEditable(true);
        setIsClicked(!isClicked);
        setButtonText({ edit: "Preview", discard: "Discard" });
        break;
      case "Save":
        updateCourse();
        setPopupVisible(true);
        break;
      case "Preview":
        setIsEditable(false);
        setIsClicked(isClicked);
        setButtonText({ edit: "Save", discard: "Previous" });
        break;
      default:
        // For the discard button
        setIsEditable(false);
        setIsClicked(!isClicked);
        console.log("Discard clicked");
        setButtonText({ edit: "Edit", discard: "Back" });
        break;
    }
  };

  const handleDiscardButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    switch (buttonText.discard) {
      case "Discard":
        setIsEditable(false);
        setIsClicked(isClicked);
        setButtonText({ edit: "Edit", discard: "Back" });
        break;
      case "Previous":
        setIsEditable(true);
        setIsClicked(!isClicked);
        setButtonText({ edit: "Preview", discard: "Discard" });
        break;
    }
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
                Course Code
              </label>
              <InputFieldString
                className="input-field"
                value={`${course_basic.course_code}`}
                onChange={(newValue: string) => {
                  const [newCode] = newValue.split(" ");
                  handleChange("course_code", newCode);
                }}
                isEditable={!isEditable}
              />
            </div>
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Course Name
              </label>
              <InputFieldString
                className="input-field"
                value={`${course_basic.course_name}`}
                onChange={(value) => handleChange("course_name", value)}
                isEditable={!isEditable}
              />
            </div>
          </div>
          <div className="admin-course-detail-div-section2">
            <label htmlFor="" className="admin-course-detail-section-labels">
              Learning Objective
            </label>

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
              <>
                <div className="admin-course-detail-section2" key={index}>
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Module Number
                    </label>

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

                    <InputField
                      id={`module_name-${index}`}
                      moduleValue={module.module_name}
                      onUpdate={handleModuleChange}
                      isEditable={!isEditable}
                    />
                  </div>
                  <div className="admin-course-detail-section2-admin-course-detailed-file">
                    {isEditable ? ( // addes isEditable functinality removed onclick by ankita
                      <div
                        className={`admin-course-detailed-video-file ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                      >
                        {/* <input type="text" className="admin-course-detailed-mp4" /> */}
                        <span
                          key={index}
                          className="admin-course-detailed-file-name"
                          onClick={() => openLink(index)}
                        >
                          View
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`admin-course-detailed-video-file ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                      >
                        {/* <input type="text" className="admin-course-detailed-mp4" /> */}

                        <span
                          key={index}
                          className="admin-course-detailed-file-name"
                          // onClick={() => openLink(index)}
                        >
                          View
                        </span>
                      </div>
                    )}

                    <div className="admin-course-detailed-video-file-text">
                      <span className="admin-course-detail-file-name">
                        {fileExtension[index]}
                      </span>
                      <br />
                      <span className="admin-course-detail-file-size">
                        {(fileSize[index] / (1024 * 1024)).toFixed(2)}MB
                      </span>
                    </div>
                  </div>

                  <div className="admin-course-detail-upload-btns">
                    <button
                      className={`admin-course-detail-upload-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                      onClick={() => {
                        if (isEditable) {
                          const fileInput = document.createElement("input");
                          fileInput.type = "file";
                          fileInput.accept = ".mp4,.ppt,.pdf";
                          fileInput.addEventListener("change", (event) => {
                            const selectedFile = (
                              event.target as HTMLInputElement
                            ).files?.[0];
                            if (selectedFile) {
                              handleFileSelect(selectedFile, index);
                              console.log(
                                "name = ",
                                fileName,
                                "size",
                                fileSize
                              );
                            }
                          });
                          fileInput.click();
                        }
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                <div className="admin-course-detail-section2">
                  <>
                    <div
                      className="admin-course-detail-section2-div-sections"
                      key={index}
                    >
                      <label
                        htmlFor={`assessment_type-${index}`}
                        className="admin-course-detail-section-labels"
                      >
                        Assessment Type
                      </label>
                      <DropdownInputField
                        id={`assessment_type-${index}`}
                        value={course_assessment[index]?.assessment_type}
                        onChange={handleAssessmentTypeChange}
                        placeholder="select assessment type"
                        options={[
                          "Multiple Choice Question",
                          "Single Choice Question",
                          "True or false",
                          "Short Answer",
                          "Not Applicable",
                        ]}
                        valueLabel={[
                          "multiple",
                          "single",
                          "True or false",
                          "short",
                          "N/A",
                        ]}
                        isEditable={!isEditable}
                      />
                    </div>

                    <div className="admin-course-detail-section2-div-sections">
                      <label
                        htmlFor={`assessment_name-${index}`}
                        className="admin-course-detail-section-labels"
                      >
                        Assessment Name
                      </label>
                      <InputField
                        id={`assessment_name-${index}`}
                        moduleValue={course_assessment[index]?.assessment_name}
                        onUpdate={handleAssessmentNameChange}
                        isEditable={!isEditable}
                      />
                    </div>

                    <div className="admin-course-detail-section2-admin-course-detailed-file">
                      <div
                        onClick={(e) => writeIntoFile(null, index)}
                        className={`admin-course-detailed-video-file ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                      >
                        {filesUploaded ? (
                          <span
                            onClick={() => {
                              handleCancelIcon(index);
                            }}
                          >
                            <CancelIcon />
                          </span>
                        ) : (
                          <></>
                        )}
                        XLS
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
                      <button
                        className={`admin-course-detail-upload-btn ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                        onClick={() => {
                          // Check if the button is clickable based on isEditable state
                          if (isEditable) {
                            // Simulate file input click
                            const fileInput = document.createElement("input");
                            fileInput.type = "file";
                            fileInput.accept = ".xls";
                            fileInput.addEventListener("change", (event) => {
                              const selectedFile = (
                                event.target as HTMLInputElement
                              ).files?.[0];
                              if (selectedFile) {
                                console.log("going to check");
                                handleexcelFileRead(
                                  selectedFile,
                                  index,
                                  "module"
                                );
                              }
                            });
                            fileInput.click();
                          }
                        }}
                      >
                        Upload
                      </button>
                    </div>
                  </>
                </div>
              </>
            );
          })}
          <button
            className={`admin-course-detail-sec-add-module-btn ${
              isClicked ? "clicked" : "unClicked"
            }`}
            onClick={() => {
              // Check if the button is clickable based on isEditable state
              if (isEditable) {
                handleAddModule();
              }
            }}
          >
            {isClicked ? <PlusIcon /> : <GreyPlusIcon />}
            <span
              className={`admin-course-detail-add-module-span-text ${
                isClicked ? "clicked" : "unClicked"
              }`}
            >
              {" "}
              Add Module
            </span>
          </button>

          <>
            {course_assessment_main[0]?.assessment_data &&
              course_assessment_main[0]?.assessment_data.length > 0 && (
                <div className="admin-course-detail-section2">
                  {/* given input field by ankita connect backend for pre and post */}
                  {/* <div className="dmin-course-detail-section2-div-sections">
                  <label
                    htmlFor=""
                    className="admin-course-detail-section-labels"
                  >
                    Course Assessment Type
                  </label>
                  <InputField />
                </div> */}
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Type
                    </label>
                    <DropdownInputField
                      isEditable={!isEditable}
                      id="pre"
                      value={course_assessment_main[0]?.assessment_type}
                      placeholder="select assessment type"
                      onChange={handleAssessmentTypeChange}
                      options={[
                        "Multiple Choice Question",
                        "Signle Choice Question",
                        "True or false",
                        "Short Answer",
                        "Not Applicable",
                      ]}
                      valueLabel={[
                        "multiple",
                        "single",
                        "boolean",
                        "short",
                        "N/A",
                      ]}
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
                      moduleValue={course_assessment_main[0]?.assessment_name}
                      onUpdate={handleAssessmentNameChange}
                      isEditable={!isEditable}
                    />
                  </div>
                  <div className="admin-course-detail-section2-admin-course-detailed-file">
                    <div
                      onClick={() => writeIntoFile("pre", 0)}
                      className={`admin-course-detailed-video-file ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    >
                      <span
                        onClick={() => {
                          handleCancelIcon(0);
                        }}
                      >
                        <CancelIcon />
                      </span>
                      XLS
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
                    <button
                      className={`admin-course-detail-upload-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                      onClick={() => {
                        // Check if the button is clickable based on isEditable state
                        if (isEditable) {
                          // Simulate file input click
                          const fileInput = document.createElement("input");
                          fileInput.type = "file";
                          fileInput.accept = ".xls";
                          fileInput.addEventListener("change", (event) => {
                            const selectedFile = (
                              event.target as HTMLInputElement
                            ).files?.[0];
                            if (selectedFile) {
                              console.log("going to check");
                              handleexcelFileRead(selectedFile, 0, "course");
                            }
                          });
                          fileInput.click();
                        }
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}
            {/* post  */}
            <div className="admin-course-detail-section2">
              {course_assessment_main[1]?.assessment_data &&
                course_assessment_main[1]?.assessment_data.length > 0 && (
                  <>
                    <div className="admin-course-detail-section2-div-sections">
                      <label
                        htmlFor=""
                        className="admin-course-detail-section-labels"
                      >
                        Assessment Type
                      </label>
                      <DropdownInputField
                        id="post"
                        isEditable={!isEditable}
                        value={course_assessment_main[1]?.assessment_type}
                        placeholder="select assessment type"
                        onChange={handleAssessmentTypeChange}
                        options={[
                          "Multiple Choice Question",
                          "Signle Choice Question",
                          "True or false",
                          "Short Answer",
                          "Not Applicable",
                        ]}
                        valueLabel={[
                          "multiple",
                          "single",
                          "boolean",
                          "short",
                          "N/A",
                        ]}
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
                        isEditable={!isEditable}
                      />
                    </div>
                    <div className="admin-course-detail-section2-admin-course-detailed-file">
                      <div
                        onClick={() => writeIntoFile("post", 1)}
                        className={`admin-course-detailed-video-file ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                      >
                        <span
                          onClick={() => {
                            handleCancelIcon(1);
                          }}
                        >
                          <CancelIcon />
                        </span>
                        XLS
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
                      <button
                        className={`admin-course-detail-upload-btn ${
                          isClicked ? "clicked" : "unClicked"
                        }`}
                        onClick={() => {
                          if (isEditable) {
                            const fileInput = document.createElement("input");
                            fileInput.type = "file";
                            fileInput.accept = ".xls";
                            fileInput.addEventListener("change", (event) => {
                              const selectedFile = (
                                event.target as HTMLInputElement
                              ).files?.[0];
                              if (selectedFile) {
                                console.log("going to check");
                                handleexcelFileRead(selectedFile, 1, "course");
                              }
                            });
                            fileInput.click();
                          }
                        }}
                      >
                        Upload
                      </button>
                    </div>
                  </>
                )}
            </div>
          </>
        </div>
        <div className="admin-course-detail-div-checkbox-main-section">
          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text">Divisions </p>
            </div>
            <div className="admin-course-detail-checkbox-section">
              {allDivisions.map((division, index) =>
                isEditable ? (
                  <Checkbox
                    key={index}
                    id={`division`}
                    text={division}
                    value={division}
                    onChange={handleChangeDesignation}
                    isChecked={course_designation?.division?.includes(division)}
                    disabled={!isEditable}
                  />
                ) : (
                  <Checkbox
                    key={index}
                    id={`division`}
                    text={division}
                    value={division}
                    isChecked={course_designation?.division?.includes(division)}
                  />
                )
              )}
            </div>
          </div>

          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text"> Designation</p>
            </div>
            <div className="admin-course-detail-checkbox-section">
              {allDesignation.map((designation, index) =>
                isEditable ? (
                  <Checkbox
                    key={index}
                    id={`designation`}
                    text={designation}
                    value={designation}
                    onChange={handleChangeDesignation}
                    isChecked={course_designation?.designation.includes(
                      designation
                    )}
                    disabled={!isEditable}
                  />
                ) : (
                  <Checkbox
                    key={index}
                    id={`designation-${index}`}
                    text={designation}
                    value={designation}
                    isChecked={course_designation?.designation.includes(
                      designation
                    )}
                  />
                )
              )}
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
              id="status"
              value={course_basic.course_status}
              onValueChange={(value) => handleChange("course_status", value)}
              options={["active", "inactive"]}
              valueLabel={["active", "inactive"]}
              isEditable={!isEditable}
            />
          </div>
        </div>
        <div className="admin-course-detail-submit-buttons-section">
          <PreviousButton
            text={buttonText.discard}
            onClick={handleDiscardButton}
          />
          <NextButton text={buttonText.edit} onClick={handleEditClick} />
        </div>
      </div>
      {popupvisible && (
        <SuccessPopup
          onClose={popupClose}
          open
          text="Course has been edited Successfully!"
        />
      )}
    </section>
  );
};

export default AdminCourseDeatilContainer;
