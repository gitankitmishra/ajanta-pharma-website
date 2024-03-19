import { FC, ChangeEvent, useEffect } from "react";
import "./style.css";

interface InputFieldOptionalAssessmentProps {
    selectedAssessment: string;
    assessmentFileName: string[]; 
    onFileNameChange: (fileName: string) => void;
}

const InputFieldOptionalAssessment: FC<InputFieldOptionalAssessmentProps> = ({ selectedAssessment, assessmentFileName, onFileNameChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onFileNameChange(newValue);
    };

    return (
      <div className="module-input-name">
        <input
          className="input-field"
          type="text"
          value={assessmentFileName}
          onChange={handleChange}
          placeholder=""
        />
      </div>
    );
};

export default InputFieldOptionalAssessment;
