import React, { ChangeEvent, FC, useEffect, useState } from "react";
import "./style.css";
import { ArrowDown } from "@/components/icons/arrow-down";

interface DropdownInputFieldProps {
  value: string;
  onValueChange?: (selectedCategory: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  valueLabel: string[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  isEditable?: boolean;
  disabled?: boolean;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  error = "",
  valueLabel,
  onChange,
  id,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange!(event.target.value);
  };

  // Determine if an option is selected or not
  const isSelected = value !== "";

  return (
    <>
      <div className="dropdown-input-field-container">
        <select
          id={id}
          value={value} // Set the value to the selectedCategory prop
          onChange={onChange ? onChange : handleChange}
          className={`dropdown-select ${
            isSelected ? "selected" : "not-selected"
          }`}
          disabled={true}
        >
          {placeholder && (
            <option value="" disabled className="disable-dropdown-option">
              {placeholder}
            </option>
          )}
          {options.map((option, index) => {
            return (
              <option
                key={index}
                value={valueLabel[index]}
                className="dropdown-option"
              >
                {option}
              </option>
            );
          })}
        </select>
        <div className="dropdown-arrow">
          <ArrowDown />
        </div>
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
