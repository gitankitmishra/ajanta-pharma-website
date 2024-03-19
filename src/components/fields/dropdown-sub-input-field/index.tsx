import React, { FC, useEffect, useState, useMemo } from "react";

interface DropdownInputFieldProps {
  value: string;
  onValueChange: (selectedCategory: string) => void;
  selectedCategory: string; // New prop for the selected category
}

const DropdownSubInputField: FC<DropdownInputFieldProps> = ({
  value,
  onValueChange,
  selectedCategory,
}) => {
  const [trainingTypeOptions, setTrainingTypeOptions] = useState<string[]>([]);

  const getTrainingTypeOptions = useMemo(() => {
    // Memoized function to get training type options based on selected category
    switch (selectedCategory) {
      case "Competency-Based Skills":
        return [
          "Business Orientation",
          "Customer Orientation",
          "Operational Excellence and Analytics",
          "Leadership",
          "Communication",
        ];
      case "Medical":
        return ["Medical"];
      case "Marketing":
        return [
          "Brand Detailing",
          "Input Detailing",
          "Knock Out Points",
          "Regional IMS",
        ];
      case "Personal Development":
        return [
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
        ];
      case "Classroom Training":
        return ["Medical Representative", "Managers"];
      default:
        return [];
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Set training type options based on selected category
    setTrainingTypeOptions(getTrainingTypeOptions);

    // Set default value to the first option if value is empty and options exist
    if (!value && getTrainingTypeOptions.length > 0) {
      onValueChange(getTrainingTypeOptions[0]);
    }
  }, [getTrainingTypeOptions, value, onValueChange]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div>
      <select value={value} onChange={handleChange} className="dropdown-select">
        <option value=""></option>
        {trainingTypeOptions.map((option, index) => (
          <option key={index} value={option} className="dropdown-option">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSubInputField;
