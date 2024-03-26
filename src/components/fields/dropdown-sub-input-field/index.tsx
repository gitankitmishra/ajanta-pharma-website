import React, { FC, useEffect, useState, useMemo } from "react";

interface DropdownInputFieldProps {
  value: string;
  onValueChange: (selectedCategory: string) => void;
  selectedCategory: string;
  placeholder?: string;
}

const DropdownSubInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  selectedCategory,
  placeholder,
}) => {
  const [trainingTypeOptions, setTrainingTypeOptions] = useState<string[]>([]);
  const [isNewCategorySelected, setIsNewCategorySelected] =
    useState<boolean>(false);

  useEffect(() => {
    // Set training type options based on selected category
    switch (selectedCategory) {
      case "Competency-Based Skills":
        setTrainingTypeOptions([
          "Business Orientation",
          "Customer Orientation",
          "Operational Excellence and Analytics",
          "Leadership",
          "Communication",
        ]);
        break;
      case "Medical":
        setTrainingTypeOptions(["Medical"]);
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
          "Self-Enrichment",
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

  return (
    <div>
      <select
        value={value}
        onChange={handleChange}
        className={`dropdown-select ${value ? "selected" : "not-selected"}`}
      >
        {isNewCategorySelected && placeholder && (
          <option value="" className="dropdown-option">
            {placeholder}
          </option>
        )}
        {trainingTypeOptions.map((option) => (
          <option key={option} value={option} className="dropdown-option">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSubInputField;
