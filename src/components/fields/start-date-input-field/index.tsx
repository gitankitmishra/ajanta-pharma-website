import React, { FC, useState } from "react";
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
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(event.target.value);
    setStartSelected(true);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(event.target.value);
    setEndSelected(true);
  };

  return (
    <div className="date-input-main-section">
      <div className="start-date-container">
        <label htmlFor="" className="date-label">Start Date</label>
        <input
          type="date"
          className={`start-date-input-field ${startSelected ? 'selected' : ''}`}
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="end-date-container">
        <label htmlFor="" className="date-label">End Date</label>
        <input
          type="date"
          className={`end-date-input-field ${endSelected ? 'selected' : ''}`}
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>  
  );
};

export default DateInputField;
