import { FC, SetStateAction, useState } from "react";
import "./style.css";

interface DropdownInputFieldProps {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({option1,option2,option3,option4}) => {
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
        <option value="option1" className="dropdown-option">{option1}</option>
        <option value="option2" className="dropdown-option">{option2}</option>
        <option value="option3" className="dropdown-option">{option3}</option>
        <option value="shortAnswer" className="dropdown-option">{option4}</option>
      </select>
    </div>
  );
};

export default DropdownInputField;
