import React, { FC, useState } from "react";
import "./style.css";
import { ArrowDown } from "@/components/icons/arrow-down";

interface DropdownInputFieldProps {
  value: string;
  onValueChange: (selectedCategory: string) => void;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  placeholder?: string;
  error?: string;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  option1,
  option2,
  option3,
  option4,
  option5,
  placeholder,
  error = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };

  // Determine if an option is selected or not
  const isSelected = value !== "";

  return (
    <>
      <div className="dropdown-input-field-container">
        <select
          value={value} // Set the value to the selectedCategory prop
          onChange={handleChange}
          className={`dropdown-select ${
            isSelected ? "selected" : "not-selected"
          }`}
        >
          {placeholder && (
            <option value="" disabled className="disable-dropdown-option">
              {placeholder}
            </option>
          )}
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
        </select>
        <div className="dropdown-arrow"><ArrowDown/></div>
      </div>
      <div
        className={`dropdown-field-error-message ${
          error.length !== 0 && "dropdown-field-error-display"
        }`}
      >
        {error}
      </div>
    </>
  );
};

export default DropdownInputField;
