import { ArrowDown } from "@/components/icons/arrow-down";
import React, { FC, useEffect, useState, useMemo } from "react";
import "./style.css";

interface DropdownInputFieldProps {
  value?: string;
  onValueChange: (selectedCategory: string) => void;
  selectedCategory: string;
  placeholder?: string;
  error?: string;
  isEditable?: boolean;
}

const DropdownSubInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  selectedCategory,
  placeholder,
  error = "",
  isEditable,
}) => {
  const [trainingTypeOptions, setTrainingTypeOptions] = useState<string[]>([]);
  const [isNewCategorySelected, setIsNewCategorySelected] =
    useState<boolean>(false);

  useEffect(() => {
    // Set training type options based on selected category
    switch (selectedCategory) {
      case "Competency Based Skills":
        setTrainingTypeOptions([
          "Business Orientation",
          "Customer Orientation",
          "Operational Excellence and Analytics",
          "Leadership",
          "Communication",
        ]);
        break;
      case "Medical":
        setTrainingTypeOptions(["Medical Updates"]);
        break;
      case "Marketing":
        setTrainingTypeOptions([
          "Brand Detailing",
          "Input Detailing",
          "Knock Out Points",
          "Regional IMS",
        ]);
        break;
      case "Personal Development":
        setTrainingTypeOptions([
          "Communication",
          "Time Management",
          "Critical Thinking",
          "Problem Solving",
          "Creative Thinking",
          "Conflict Resolution",
          "Negotiation Skills",
          "Personal Finance",
          "Personal Grooming",
          "Self Enrichment",
        ]);
        break;
      case "Classroom Training":
        setTrainingTypeOptions(["Medical Representative", "Managers"]);
        break;
      default:
        setTrainingTypeOptions([]);
    }
    // If a new category is selected, enable the placeholder
    setIsNewCategorySelected(true);
  }, [selectedCategory]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
    // Once an option is selected, disable the placeholder
    setIsNewCategorySelected(false);
  };

  // Determine if an option is selected or not

  const isSelected = value !== "";

  return (
    <>
      <div className="custom-dropdown-input-field-container">
        <select
          value={value}
          onChange={handleChange}
          className={`custom-dropdown-select ${
            isSelected ? "selected" : "not-selected"
          }`}
          disabled={isEditable}
        >
          {isNewCategorySelected && placeholder && (
            <option value="" className="custom-dropdown-option">
              {placeholder}
            </option>
          )}
          {trainingTypeOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="custom-dropdown-option"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="custom-dropdown-arrow">
          <ArrowDown />
        </div>
      </div>
      <div
        className={`custom-dropdown-field-error-message ${
          error.length !== 0 && "custom-dropdown-field-error-display"
        }`}
      >
        {error}
      </div>
    </>
  );
};

export default DropdownSubInputField;
