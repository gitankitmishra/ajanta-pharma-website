import React, { FC, ChangeEvent } from "react";
import "./style.css";
interface InputFieldStringProps {
  className: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  width?: string;
  readonly?: boolean;
}

const InputFieldString: FC<InputFieldStringProps> = ({
  value,
  onChange,
  className,
  placeholder,
  width,
  readonly,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="module-input-name">
      <input
        readOnly={readonly}
       style={{width:width}}
        type="text"
        value={value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFieldString;
