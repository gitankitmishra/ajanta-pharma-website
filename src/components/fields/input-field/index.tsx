import { FC, ChangeEvent, useEffect, useState } from "react";
import "./style.css";

interface InputFieldProps {
  moduleValue?: string;
  onChange?: (newModuleName: string[]) => void;
  onUpdate?: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  id?: string;
  isEditable?: boolean;
  disabled?: boolean;
  text?: string;
  error?: string;
}

const InputField: FC<InputFieldProps> = ({
  moduleValue,
  onChange,
  onUpdate,
  id,
  isEditable,
  disabled,
  error = "",
  text,
}) => {
  console.log("-----------------", error);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange!([newValue]);
  };
  return (
    <div>
      <input
        id={id}
        className="input-field"
        type="text"
        value={moduleValue}
        onChange={onUpdate ? onUpdate : handleChange}
        placeholder=""
        readOnly={isEditable}
        disabled={disabled}
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

export default InputField;
