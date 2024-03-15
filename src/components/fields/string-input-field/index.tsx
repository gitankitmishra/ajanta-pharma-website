import React, { FC, ChangeEvent } from "react";
import "./style.css"
interface InputFieldStringProps {
  className:string;
  value: string;
  onChange: (newValue: string) => void;
}

const InputFieldString: FC<InputFieldStringProps> = ({ value, onChange,className }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="module-input-name">
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder=""
    />
    </div>
  );
};

export default InputFieldString;

