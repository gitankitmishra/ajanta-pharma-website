import React, { FC } from "react";
import "./style.css";

interface DateInputFieldProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const DateInputField: FC<DateInputFieldProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(event.target.value);
  };

  return (
    <div className="date-input-main-section">
      <div className="start-date-container">
        <label htmlFor="" className="date-label">Start Date</label>
        <input
          type="date"
          className="start-date-input-field"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="end-date-container">
        <label htmlFor="" className="date-label">End Date</label>
        <input
          type="date"
          className="end-date-input-field"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>  
  );
};

export default DateInputField;
