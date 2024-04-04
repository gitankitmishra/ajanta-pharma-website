"use client";
import { FC, useState, useContext } from "react";

import "./style.css";
import SuccessPopup from "@/components/popups/success-popup";

import { CourseContext, CourseContextType } from "@/context/course_context";
import Checkbox from "@/components/checkbox";

interface UploadStepSectionProps {}

const UploadStepSection: FC<UploadStepSectionProps> = () => {
  //context call
  const {
    course_basic,
    course_assessment,
    course_assessment_main,
    course_module,
    course_designation,
  } = useContext(CourseContext) as CourseContextType;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const extractFileExtension = (filename: any) => {
    const parts = filename.split("/");
    if (parts.length > 1) {
      return parts.pop();
    } else {
      return "";
    }
  };

  return (
    <section className="upload-main-section">
      <p className="upload-preview-text">Preview</p>

      <div className="upload-div-section1">
        <div className="upload-section1">
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Category
            </label>
            <input
              className="input-field-1"
              readOnly
              value={course_basic.course_category}
            />
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Training
            </label>
            <input
              className="input-field-1"
              readOnly
              value={course_basic.course_training}
            />
          </div>
          <div className="upload-div-section2">
            <label htmlFor="" className="upload-section-labels">
              Learning Objective
            </label>
            <input
              className="input-field-1"
              readOnly
              value={`${course_basic.course_code}  ${course_basic.course_name}`}
            />
          </div>
        </div>
        <div className="upload-div-section2">
          <label htmlFor="" className="upload-section-labels">
            Learning Objective
          </label>
          <textarea
            className="upload-step-textarea"
            readOnly
            value={course_basic.course_objective}
          />
        </div>
        <div className="upload-div-section3">
          <div className="date-input-row">
            <label htmlFor="" className="upload-section-labels">
              Start Date
            </label>
            <br />
            <input
              className="input-field-2"
              readOnly
              value={course_basic.course_start_date}
            />
          </div>
          <div className="date-input-row">
            <label htmlFor="" className="upload-section-labels">
              End Date
            </label>
            <br />
            <input
              className="input-field-2"
              readOnly
              value={course_basic.course_end_date}
            />
          </div>
        </div>
      </div>

      <div className="upload-div-section">
        <div>
          {course_module.map((module, index) => {
            console.log("module", module);

            return (
              <div className="upload-section2-div-containers" key={index}>
                <div className="upload-section2-div-sections">
                  <label htmlFor="" className="upload-section-labels">
                    Module Number
                  </label>
                  <input
                    className="input-field-1"
                    readOnly
                    value={module.module_no}
                  />
                </div>
                <div className="upload-section2-div-sections">
                  <label htmlFor="" className="upload-section-labels">
                    Module Name
                  </label>
                  <input
                    className="input-field-1"
                    readOnly
                    value={module.module_name}
                  />
                </div>
                <div className="upload-section2-uploaded-file">
                  <div className="uploaded-video-file"></div>
                  <div className="uploaded-video-file-text">
                    <span className="upload-file-name">
                      {extractFileExtension(module.module_material)}
                    </span>
                    <br />
                    {/* <span className="upload-file-size">2.2MB</span> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="upload-div-section ">
        <div>
          {course_assessment.map((assesment, index) => {
            console.log("assessment", assesment);

            return (
              <div className="upload-section2-div-containers" key={index}>
                <div className="upload-section2-div-sections">
                  <label htmlFor="" className="upload-section-labels">
                    Assesment Type
                  </label>
                  <input
                    className="input-field-1"
                    readOnly
                    value={assesment.assessment_type}
                  />
                </div>
                <div className="upload-section2-div-sections">
                  <label htmlFor="" className="upload-section-labels">
                    Assessment Name
                  </label>
                  <input
                    className="input-field-1"
                    readOnly
                    value={assesment.assessment_name}
                  />
                </div>
                <div className="upload-section2-uploaded-file">
                  <div className="uploaded-video-file"></div>
                  <div className="uploaded-video-file-text">
                    <span className="upload-file-name">Data</span>
                    <br />
                    {/* <span className="upload-file-size">2.2MB</span> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Check if assessment_name is not empty */}
      {(course_assessment_main[0].assessment_name !== "" ||
        course_assessment_main[1].assessment_name !== "") && (
        <div className="upload-section2-course-assessment">
          <p className="upload-course-assessment-text">Course Assessment </p>
        </div>
      )}
      {course_assessment_main[0].assessment_name != "" && (
        <>
          <div className=" upload-section-2-special">
            <div className="upload-section2-div-sections">
              {" "}
              <label htmlFor="" className="upload-section-labels">
                Assessment Position
              </label>
              <input
                type="text"
                value={"Pre"}
                className="upload-assessment-position"
                readOnly
              />
            </div>
            <div className="upload-section2-div-sections">
              <label htmlFor="" className="upload-section-labels">
                Assessment Type
              </label>
              <input
                className="input-field-1"
                readOnly
                value={course_assessment_main[0].assessment_no}
              />
            </div>
            <div className="upload-section2-div-sections">
              <label htmlFor="" className="upload-section-labels">
                Assessment Name
              </label>
              <input
                className="input-field-1"
                readOnly
                value={course_assessment_main[0].assessment_name}
              />
            </div>
          </div>
        </>
      )}

      {course_assessment_main[1].assessment_name != "" && (
        <>
          <div className="upload-section2">
            <div>post</div>
            <div className="upload-section2-div-sections">
              <label htmlFor="" className="upload-section-labels">
                Assessment Number
              </label>
              <input
                className="input-field-1"
                readOnly
                value={course_assessment_main[1].assessment_no}
              />
            </div>
            <div className="upload-section2-div-sections">
              <label htmlFor="" className="upload-section-labels">
                Assessment Name
              </label>
              <input
                className="input-field-1"
                readOnly
                value={course_assessment_main[1].assessment_name}
              />
            </div>
          </div>
        </>
      )}

      <div className="upload-div-checkbox-main-section">
        <div className="upload-main-div-section">
          {course_designation.division.length > 0 && (
            <div className="upload-text-section">
              <p className="upload-text">Divisions </p>
            </div>
          )}
          <div className="upload-checkbox-section">
            {course_designation.division.map((division, index) => (
              <div key={index}>
                <Checkbox
                  text={division}
                  id={`division-${index}`}
                  isChecked={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="upload-main-div-section">
          {course_designation.designation.length > 0 && (
            <div className="upload-text-section">
              <p className="upload-text"> Designation</p>
            </div>
          )}
          <div className="upload-checkbox-section">
            {course_designation.designation.map((designation, index) => (
              <div key={index}>
                <Checkbox
                  text={designation}
                  id={`designation-${index}`}
                  isChecked={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SuccessPopup open={isModalOpen} onClose={handleCloseModal} text="" />
    </section>
  );
};

export default UploadStepSection;
