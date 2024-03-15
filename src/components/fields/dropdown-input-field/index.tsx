import { FC, useState } from "react";
import "./style.css";

interface DropdownInputFieldProps {
  value: string;
  onValueChange: (selectedCategory: string) => void;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  option1,
  option2,
  option3,
  option4,
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
      </select>
    </div>
  );
};

export default DropdownInputField;

