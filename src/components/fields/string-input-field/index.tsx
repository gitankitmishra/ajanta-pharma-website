import React, { FC, ChangeEvent } from "react";
import "./style.css";
interface InputFieldStringProps {
  className: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  width?: string;
  error?: string;
  readOnly?: boolean;
}

const InputFieldString: FC<InputFieldStringProps> = ({
  value,
  onChange,
  className,
  placeholder,
  width,
  error = "",
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="module-input-name">
      <input
        style={{ width: width }}
        type="text"
        value={value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
        readOnly={true}
      />
      <div
        className={`dropdown-field-error-message ${
          error.length !== 0 && "dropdown-field-error-display"
        }`}
      >
        {error}
      </div>
    </div>
  );
};

export default InputFieldString;
