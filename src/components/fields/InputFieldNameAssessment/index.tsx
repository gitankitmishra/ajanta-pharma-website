import { FC, ChangeEvent, useEffect } from "react";
import "./style.css";

interface InputFieldNameAssessmentProps {
  assessmentName: string[];
  onChange: (newAssessmentName: string[]) => void;
}

const InputFieldNameAssessment: FC<InputFieldNameAssessmentProps> = ({ assessmentName, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange([newValue]);
    };

    return (
      <div className="module-input-name">
       
        <input
          className="input-field"
          type="text"
          value={assessmentName?.length > 0 ? assessmentName[0] : ''} 
          onChange={handleChange}
          placeholder=""
        />
      </div>
    );
};

export default InputFieldNameAssessment;
