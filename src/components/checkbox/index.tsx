import { FC, useState, ChangeEvent } from "react";
import "./style.css";

interface CheckboxProps {
  text: string;
  onChange: (value: string, isChecked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ text, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
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
