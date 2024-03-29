import { FC, ChangeEvent, useEffect, useState } from "react";
import "./style.css";

interface InputFieldProps {
  moduleValue: string;
  onChange?: (newModuleName: string[]) => void;
  onUpdate?: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  id?: string;
}

const InputField: FC<InputFieldProps> = ({
  readOnly = false,
  moduleValue,
  onChange,
  onUpdate,
  id,
}) => {
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
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputField;
