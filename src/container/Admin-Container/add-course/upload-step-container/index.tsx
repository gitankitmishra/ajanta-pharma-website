"use client";
import { FC, useState, useContext, useEffect } from "react";

import "./style.css";

import { CourseContext, CourseContextType } from "@/context/course_context";
import Checkbox from "@/components/checkbox";
import DateInputField from "@/components/fields/start-date-input-field";

interface UploadStepSectionProps {}

const UploadStepSection: FC<UploadStepSectionProps> = () => {
  //context call
  const {
    course_basic,
    openLink,
    course_assessment,
    course_assessment_main,
    course_module,
    course_designation,
    writeIntoFile,
  } = useContext(CourseContext) as CourseContextType;

  

  const extractFileExtension = (filename: any) => {
    const parts = filename?.split("/");
    if (parts.length > 1) {
      return parts.pop();
    } else {
      return "";
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Course Code
            </label>
            <input
              className="input-field-1"
              readOnly
              value={`${course_basic.course_code}`}
            />
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Course Name
            </label>
            <input
              className="input-field-1"
              readOnly
              value={`${course_basic.course_name}`}
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
              className="upload-date-input-field"
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
              className="upload-date-input-field"
              readOnly
              value={course_basic.course_end_date}
            />
          </div>
        </div>
      </div>

      <div className="upload-div-section">
        {course_module.map((module, index) => {
          const assessment = course_assessment[index];

          return (
            <>
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
                  <div
                    className="uploaded-video-file"
                    onClick={() => openLink(index)}
                  >
                    View
                  </div>
                  <div className="uploaded-video-file-text">
                    <span className="upload-file-name">
                      {extractFileExtension(module.module_material)}
                    </span>
                    <br />
                  </div>
                </div>
              </div>
              <div>
                {/* Render assessment details */}
                {assessment && (
                  <div
                    className="upload-section2-div-containers"
                    key={`${index}_assessment`}
                  >
                    <div className="upload-section2-div-sections">
                      <label htmlFor="" className="upload-section-labels">
                        Assessment Type
                      </label>
                      <input
                        className="input-field-1"
                        readOnly
                        value={assessment.assessment_type}
                      />
                    </div>
                    <div className="upload-section2-div-sections">
                      <label htmlFor="" className="upload-section-labels">
                        Assessment Name
                      </label>
                      <input
                        className="input-field-1"
                        readOnly
                        value={assessment.assessment_name}
                      />
                    </div>
                    <div className="upload-section2-uploaded-file">
                      <div
                        className="uploaded-video-file"
                        onClick={() => writeIntoFile(null, index)}
                      >
                        View
                      </div>
                      <div className="uploaded-video-file-text">
                        <span className="upload-file-name">Files</span>
                        <br />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })}
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
                value={course_assessment_main[0].assessment_type}
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

      {course_assessment_main[1]?.assessment_name != "" && (
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
                value={course_assessment_main[1].assessment_type}
              />
            </div>
            <div className="upload-section2-div-sections">
              <label htmlFor="" className="upload-section-labels">
                Assessment Name
              </label>
              <input
                className="input-field-1"
                readOnly
                value={course_assessment_main[1]?.assessment_name}
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

      {/* <SuccessPopup open={isModalOpen} onClose={handleCloseModal} text="" /> */}
    </section>
  );
};

export default UploadStepSection;
