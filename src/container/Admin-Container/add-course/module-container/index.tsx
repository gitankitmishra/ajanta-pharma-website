import { FC } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";

interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
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
      <div className="module-div-section2">
        <div className="module-input">
          <div className="module-input-number">
            <label htmlFor="">Module Number</label>
            <InputField />
          </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputField />
          </div>
          <div className="module-input-uplaod-btn">
            <UploadButton upload={"Upload Course Material"} />
          </div>
        </div>
        <div className="module-input">
          <div className="module-input-number">
            <label htmlFor="">Select Assessment Type</label>
            <DropdownInputField />
          </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputField />
          </div>
          <div className="module-input-uplaod-btn">
            <UploadButton upload={"Upload Assessment"} />
          </div>
        </div>
        <button>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        <div className="module-radio-selction">
          <div className="module-course-assessment">Course Assessment</div>
          <div className="module-radio-btns">
            <input type="radio" id="preAccessment" value="Pre Assessment" /> {" "}
            <label htmlFor="preAccessment">Pre Assessment</label>
            <input
              type="radio"
              id="postAccessment"
              value="Post Assessment"
            />  <label htmlFor="postAccessment">Post Assessment</label>
          </div>
        </div>
        <div className="module-input">
          <div className="module-input-number">
            <label htmlFor="">Select Assessment Type</label>
            <DropdownInputField />
          </div>
          <div className="module-input-name">
            <label htmlFor="">Module Name</label>
            <InputField />
          </div>
          <div className="module-input-uplaod-btn">
            <UploadButton upload={"Upload Assessment"} />
          </div>
        </div>
        <button>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <button>Save as Draft</button>
    </section>
  );
};

export default ModuleQuizStepSection;
