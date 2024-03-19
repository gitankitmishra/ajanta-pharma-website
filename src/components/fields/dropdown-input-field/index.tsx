
import { ChangeEvent, FC, SetStateAction, useState } from "react";

import "./style.css";

interface DropdownInputFieldProps {
  value: string;
  onValueChange: (selectedCategory: string) => void;
  option1: string;
  option2: string;
  option3: string;
  option4: string;

  option5:string;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  option1,
  option2,
  option3,
  option4,
  option5,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div>
      <select
        value={value} // Set the value to the selectedCategory prop
        onChange={handleChange}
        className="dropdown-select"
      >
        <option value=""></option>
        <option value={option1} className="dropdown-option">
          {option1}
        </option>
        <option value={option2} className="dropdown-option">
          {option2}
        </option>
        <option value={option3} className="dropdown-option">
          {option3}
        </option>
        <option value={option4} className="dropdown-option">
          {option4}
        </option>
        <option value={option5} className="dropdown-option">
          {option5}
        </option>

  assessmentType:string[];
  onChange:(assessmentType:string[]) => void;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({option1,option2,option3,option4,assessmentType,onChange}) => {

  const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
    const newVal = event.target.value;
    onChange([newVal])
  }
  return (
    <div>
      <select value={assessmentType} onChange={handleChange} className="dropdown-select">
        <option value=""></option>
        <option value={option1} className="dropdown-option">{option1}</option>
        <option value={option2} className="dropdown-option">{option2}</option>
        <option value={option3} className="dropdown-option">{option3}</option>
        <option value={option4} className="dropdown-option">{option4}</option>

      </select>
    </div>
  );
};

export default DropdownInputField;

