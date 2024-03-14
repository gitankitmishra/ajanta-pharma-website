import { FC } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import DateInputField from "@/components/fields/start-date-input-field";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import Link from "next/link";

interface BasicStepSectionProps {}

const BasicStepSection: FC<BasicStepSectionProps> = ({}) => {
  return (
    <section className="basic-main-section">
      <div className="basic-div-section1">
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Category
          </label>
          <DropdownInputField
            option1={"Multiple Choice Question"}
            option2={"Single Choice Question"}
            option3={"True or False"}
            option4={"Short Answer"}
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Select Training
          </label>
          <DropdownInputField
             option1={"Bussiness Orientation"}
             option2={"Customer Orientation"}
             option3={"Operation Excellence and analytics"}
             option4={"Leadership"}
          />
        </div>
        <div className="basic-section1-div-sections">
          <label htmlFor="" className="basic-section-labels">
            Course Code & Name
          </label>
          <InputField />
        </div>
      </div>
      <div className="basic-div-section2">
        <label htmlFor="" className="basic-section-labels">
          Learning Objective
        </label>
        <input type="text" className="basic-learning-objective-input" />
      </div>
      <div className="basic-div-section3">
        <DateInputField />
      </div>
      <div className="basic-div-section4">
        <Link href="/admin/admin-courses">
          <PreviousButton text={"Discard"} />
        </Link>
        <NextButton text={"Next"} />
      </div>
    </section>
  );
};

export default BasicStepSection;
