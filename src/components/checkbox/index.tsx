import { FC } from "react";
import "./style.css";

interface CheckboxProps {
  text: string;
}

const Checkbox: FC<CheckboxProps> = ({ text }) => {
  return (
    <div className="checkbox-main-div">
        
      <input type="checkbox" className="checkbox-input" />
      <label htmlFor="">{text}</label>
    </div>
  );
};

export default Checkbox;
