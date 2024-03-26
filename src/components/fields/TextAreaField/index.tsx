import React, { FC, ChangeEvent } from "react";
import "./style.css";

interface TextAreaFieldProps {
  className?: string;
  value?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  value,
  onChange,
  className,
  placeholder,
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
      />
    </div>
  );
};

export default TextAreaField;
