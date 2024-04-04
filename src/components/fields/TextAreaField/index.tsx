import React, { FC, ChangeEvent, useEffect } from "react";
import "./style.css";

interface TextAreaFieldProps {
  className?: string;
  value?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  error?: string;
  isEditable?: boolean;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  value,
  onChange,
  className,
  placeholder,
  error = "",
  isEditable,
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className="module-input-name">
      <textarea
        value={value}
        onChange={handleChange}
        className="text-area-input-field"
        placeholder={placeholder}
        readOnly={isEditable}
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

export default TextAreaField;
