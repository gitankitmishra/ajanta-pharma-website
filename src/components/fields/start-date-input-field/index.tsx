import { FC } from "react";
import "./style.css";

interface DateInputFieldProps {}

const DateInputField: FC<DateInputFieldProps> = () => {
  return (
    <div className="date-input-main-section">
      <div className="start-date-container">
        <label htmlFor="" className="date-label">Start Date</label>
        <input type="date" className="start-date-input-field" />
      </div>
      <div className="end-date-container">
        <label htmlFor="" className="date-label">End Date</label>
        <input type="date" className="end-date-input-field" />
      </div>
    </div>
  );
};

export default DateInputField;
