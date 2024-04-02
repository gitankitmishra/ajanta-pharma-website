// Checkbox.tsx
import React, { FC, useState, ChangeEvent } from "react";
import "./style.css";

interface CheckboxProps {
  text: string;
  id?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean; // Add isChecked prop
}

const Checkbox: FC<CheckboxProps> = ({
  text,
  onChange,
  isChecked,
  id,
  value,
}) => {
  return (
    <div className="checkbox-main-div">
      <input
        id={id}
        type="checkbox"
        className="checkbox-input"
        checked={isChecked}
        value={text}
        onChange={onChange}
      />
      <label htmlFor="">{text}</label>
    </div>
  );
};

export default Checkbox;
