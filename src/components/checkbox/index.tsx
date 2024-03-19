// Checkbox.tsx
import React, { FC, useState, ChangeEvent } from "react";
import "./style.css";

interface CheckboxProps {
  text: string;
  onChange: (value: string, isChecked: boolean) => void;
  isChecked: boolean; // Add isChecked prop
}

const Checkbox: FC<CheckboxProps> = ({ text, onChange, isChecked }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    onChange(text, checked);
  };

  return (
    <div className="checkbox-main-div">
      <input
        type="checkbox"
        className="checkbox-input"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor="">{text}</label>
    </div>
  );
};

export default Checkbox;
