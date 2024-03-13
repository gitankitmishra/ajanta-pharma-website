import { FC, SetStateAction, useState } from "react";
import "./style.css";

interface DropdownInputFieldProps {}

const DropdownInputField: FC<DropdownInputFieldProps> = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <select value={selectedValue} onChange={handleChange} className="dropdown-select">
        <option value=""></option>
        <option value="option1" className="dropdown-option">Multiple Choice Question</option>
        <option value="option2" className="dropdown-option">Single Choice Question</option>
        <option value="option3" className="dropdown-option">True or False</option>
        <option value="shortAnswer" className="dropdown-option">Short Answer</option>
      </select>
    </div>
  );
};

export default DropdownInputField;
