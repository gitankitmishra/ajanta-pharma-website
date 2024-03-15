import { FC, useState } from "react";
import "./style.css";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import InputField from "@/components/fields/input-field";
import DateInputField from "@/components/fields/start-date-input-field";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import SuccessPopup from "@/components/popups/success-popup";

interface UploadStepSectionProps {}

const UploadStepSection: FC<UploadStepSectionProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="upload-main-section">
      <p className="upload-preview-text">Preview</p>
      <div className="upload-div-section">
        <div className="upload-section1">
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Category
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Training
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Course Code & Name
            </label>
            <InputField readOnly />
          </div>
        </div>
        <div className="upload-div-section2">
          <label htmlFor="" className="upload-section-labels">
            Learning Objective
          </label>
          <input type="text" className="upload-learning-objective-input" />
        </div>
        <div className="upload-div-section3">
          <DateInputField />
        </div>
      </div>
      <div className="upload-div-section">
        <div className="upload-section2">
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Module Number
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Module Name
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section2-uploaded-file">
            <div className="uploaded-video-file">
              {/* <input type="text" className="uploaded-mp4" /> */}
            </div>
            <div className="uploaded-video-file-text">
              <span className="upload-file-name">video.mp4</span>
              <br />
              <span className="upload-file-size">2.2MB</span>
            </div>
          </div>
        </div>
        <div className="upload-section2">
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Module Number
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Module Name
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section2-uploaded-file">
            <div className="uploaded-video-file">
              {/* <input type="text" className="uploaded-mp4" /> */}
            </div>
            <div className="uploaded-video-file-text">
              <span className="upload-file-name">video.mp4</span>
              <br />
              <span className="upload-file-size">2.2MB</span>
            </div>
          </div>
        </div>
        <div className="upload-section2-course-assessment">
          <p className="upload-course-assessment-text">Course Assessment </p>
          <div>
            <input type="radio" id="assessment" />
            <label htmlFor="assessment" className="upload-selected-assessment">
              Post Assessment
            </label>
          </div>
        </div>
        <div className="upload-section2">
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Assessment Number
            </label>
            <InputField readOnly />
          </div>
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Assessment Name
            </label>
            <InputField readOnly />
          </div>
        </div>
      </div>

      <div className="upload-div-checkbox-main-section">
        <div className="upload-main-div-section">
          <div className="upload-text-section">
            <p className="upload-text">Divisions </p>
          </div>
          <div className="upload-checkbox-section">
            <Checkbox text={"CDC"} />
            <Checkbox text={"Nuventa"} />
            <Checkbox text={"Revance"} />
          </div>
        </div>

        <div className="upload-main-div-section">
          <div className="upload-text-section">
            <p className="upload-text"> Designation</p>
          </div>
          <div className="upload-checkbox-section2">
            <Checkbox text={"Cluster Head- Cardiac"} />
            <Checkbox text={"Cluster Head- Ophthal"} />
            <Checkbox text={"Cluster Head- Derma"} />
            <Checkbox text={"Cluster Head- Pain"} />

            <Checkbox text={"SO"} />
          </div>
          <div className="upload-btn-section">
            <PreviousButton text={"Previous"} />
            <div onClick={handleUploadClick}>
              <NextButton text={"Upload"} />
            </div>
          </div>
        </div>
      </div>
     
      <SuccessPopup  open={isModalOpen} onClose={handleCloseModal}/>
    </section>
  );
};

export default UploadStepSection;
