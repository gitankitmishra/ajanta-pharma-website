import { ChangeEvent, FC, SetStateAction, useState } from "react";
import "./style.css";

interface DropdownInputFieldAssoptProps {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  setSelectedAssessment: (value: string) => void;
}

const DropdownInputFieldAssOpt: FC<DropdownInputFieldAssoptProps> = ({option1,option2,option3,option4,setSelectedAssessment}) => {

  const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
    const newVal = event.target.value;
    setSelectedAssessment(newVal);
  }
  return (
    <div>
      <select  onChange={handleChange} className="dropdown-select">
        <option value=""></option>
        <option value={option1} className="dropdown-option">{option1}</option>
        <option value={option2} className="dropdown-option">{option2}</option>
        <option value={option3} className="dropdown-option">{option3}</option>
        <option value={option4} className="dropdown-option">{option4}</option>
      </select>
    </div>
  );
};

export default DropdownInputFieldAssOpt;
