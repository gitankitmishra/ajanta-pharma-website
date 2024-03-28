"use client";
import Breadcrumb from "@/components/breadcrumb";
import { FC, useState } from "react";
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

interface AdminCourseDeatilContainerProps {
}

interface FormData {
  category: string;

  trainingType: string;

  courseCode: string;

  courseName: string;

  learningObjectives: string;

  startDate: string;

  endDate: string;
}

const AdminCourseDeatilContainer: FC<AdminCourseDeatilContainerProps> = ({
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState({
    edit: "Edit",
    discard: "Back",
  });

  const handleEditClick = () => {
    if (buttonText.edit === "Edit") {
      setButtonText({ edit: "Next", discard: "Discard" });
    } else {
      setButtonText({ edit: "Previous", discard: "Upload" });
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

  const handleAddModule = () => {
    setModules([...modules, { moduleName: "", moduleNo: "", files: null }]);
  };

  const handleAddAssessment = () => {
    setAssessmentOpt([
      ...assessmentOpt,
      { assessmentType: "", assessmentName: "" },
    ]);
    setIsClicked(true);
  };
  const handleCourseCodeAndNameChange = (value: string) => {
    // Remove leading and trailing spaces from the input value

    const trimmedValue = value;

    // Split the trimmed value into code and name parts

    const [code, ...nameParts] = trimmedValue.split(" ");

    // Update the state with the trimmed code and the remaining name parts

    setFormData((prev) => ({
      ...prev,

      courseCode: code,

      courseName: nameParts.join(" "),
    }));
  };

  const [formData, setFormData] = useState<FormData>({
    category: "Competency-Based Skills",

    trainingType: "",

    courseCode: "",

    courseName: "",

    learningObjectives: "",

    startDate: "",

    endDate: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "category") {
      // onCategoryChange(value);

      localStorage.setItem("category", value);
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
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                option1={"Competency-Based Skills"}
                option2={"Medical"}
                option3={"Marketing"}
                option4={"Personal Development"}
                option5={"Classroom Training"}
              />
            </div>
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Training
              </label>
              <DropdownSubInputField
                value={formData.trainingType}
                onValueChange={(value) => handleChange("trainingType", value)}
                selectedCategory={formData.category} // Pass the selected category
              />
            </div>
            <div className="admin-course-detail-section1-div-sections">
              <label htmlFor="" className="admin-course-detail-section-labels">
                Course Code & Name
              </label>
              <InputFieldString
                className="input-field"
                value={formData.courseCode + " " + formData.courseName}
                onChange={handleCourseCodeAndNameChange}
              />
            </div>
          </div>
          <div className="admin-course-detail-div-section2">
            <label htmlFor="" className="admin-course-detail-section-labels">
              Learning Objective
            </label>
            <input
              type="text"
              className="admin-course-detail-learning-objective-input"
            />
          </div>
          <div className="admin-course-detail-div-section3">
            <DateInputField
              startDate={""}
              endDate={""}
              onStartDateChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              onEndDateChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
        <div className="admin-course-detail-div-section">
          {modules.map(
            (
              module,
              index //maping for replication module section
            ) => (
              <>
                <div className="admin-course-detail-section2">
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Module Number
                    </label>
                    <InputFieldString
                      className="input-field"
                      value={formData.courseCode + " " + formData.courseName}
                      onChange={handleCourseCodeAndNameChange}
                    />
                  </div>
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Module Name
                    </label>
                    <InputFieldString
                      className="input-field"
                      value={formData.courseCode + " " + formData.courseName}
                      onChange={handleCourseCodeAndNameChange}
                    />
                  </div>
                  <div className="admin-course-detail-section2-admin-course-detailed-file">
                    <div className="admin-course-detailed-video-file">
                      {/* <input type="text" className="admin-course-detailed-mp4" /> */}
                      <span className="admin-course-detailed-file-name">
                        MP4
                      </span>
                    </div>
                    <div className="admin-course-detailed-video-file-text">
                      <span className="admin-course-detail-file-name">
                        video.mp4
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
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div className="admin-course-detail-section2">
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Type
                    </label>
                    <DropdownInputField
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                      option1={"Competency-Based Skills"}
                      option2={"Medical"}
                      option3={"Marketing"}
                      option4={"Personal Development"}
                      option5={"Classroom Training"}
                    />
                  </div>
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Name
                    </label>
                    <InputFieldString
                      className="input-field"
                      value={formData.courseCode + " " + formData.courseName}
                      onChange={handleCourseCodeAndNameChange}
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
                    <button
                      className={`admin-course-detail-upload-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </>
            )
          )}
          <button
            className={`admin-course-detail-sec-add-module-btn ${
              isClicked ? "clicked" : "unClicked"
            }`}
            onClick={handleAddModule}
          >
            {isClicked ? <PlusIcon /> : <GreyPlusIcon />}
            Add Module
          </button>
          {assessmentOpt.map(
            (
              assessment,
              index //maping for replicating assessment section
            ) => (
              <>
                <div className="admin-course-detail-section2-course-assessment">
                  <p className="admin-course-detail-course-assessment-text">
                    Course Assessment{" "}
                  </p>
                  <div className="admin-course-detail-assessment-radio-btns ">
                    <input
                      type="radio"
                      id="pre-assessment"
                      className={`admin-course-detail-assesment-radio-btn ${
                        isClicked ? "clicked" : "unClicked"
                      }`}
                    />
                    <label
                      htmlFor="pre-assessment"
                      className="admin-course-detail-selected-assessment"
                    >
                      Pre Assessment
                    </label>
                  </div>
                  <div className="admin-course-detail-assessment-radio-btns">
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
                  </div>
                </div>
                <div className="admin-course-detail-section2">
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Number
                    </label>
                    <DropdownInputField
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                      option1={"Competency-Based Skills"}
                      option2={"Medical"}
                      option3={"Marketing"}
                      option4={"Personal Development"}
                      option5={"Classroom Training"}
                    />
                  </div>
                  <div className="admin-course-detail-section2-div-sections">
                    <label
                      htmlFor=""
                      className="admin-course-detail-section-labels"
                    >
                      Assessment Name
                    </label>
                    <InputFieldString
                      className="input-field"
                      value={formData.courseCode + " " + formData.courseName}
                      onChange={handleCourseCodeAndNameChange}
                    />
                  </div>
                </div>
              </>
            )
          )}

          <button
            className={`admin-course-detail-sec-add-module-btn ${
              isClicked ? "clicked" : "unClicked"
            }`}
            onClick={handleAddAssessment}
          >
            {isClicked ? <PlusIcon /> : <GreyPlusIcon />}
            Add Assessment
          </button>
        </div>

        <div className="admin-course-detail-div-checkbox-main-section">
          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text">Divisions </p>
            </div>
            <div className="admin-course-detail-checkbox-section">
              <Checkbox
                text="CDC"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="CDC"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="CDC"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="CDC"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Nuventa"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text="Revance"
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
            </div>
          </div>

          <div className="admin-course-detail-main-div-section">
            <div className="admin-course-detail-text-section">
              <p className="admin-course-detail-text"> Designation</p>
            </div>
            <div className="admin-course-detail-checkbox-section2">
              <Checkbox
                text={"Cluster Head- Cardiac"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text={"Cluster Head- Ophthal"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text={"Cluster Head- Derma"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text={"Cluster Head- Pain"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />

              <Checkbox
                text={"SO"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text={"Cluster Head- Cardiac"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text={"Cluster Head- Ophthal"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text={"Cluster Head- Derma"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
              <Checkbox
                text={"Cluster Head- Pain"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />

              <Checkbox
                text={"SO"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={false}
              />
              <Checkbox
                text={"Cluster Head- Cardiac"}
                onChange={function (value: string, isChecked: boolean): void {
                  throw new Error("Function not implemented.");
                }}
                isChecked={true}
              />
            </div>
            {/* <div className="admin-course-detail-btn-section">
            <PreviousButton text={"Previous"} />
            <div onClick={handleadmin-course-detailClick}>
              <NextButton text={"admin-course-detail"} />
            </div>
          </div> */}
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
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
              option1={"Competency-Based Skills"}
              option2={"Medical"}
              option3={"Marketing"}
              option4={"Personal Development"}
              option5={"Classroom Training"}
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
