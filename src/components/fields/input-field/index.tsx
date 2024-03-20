import { FC, ChangeEvent, useEffect, useState } from "react";
import "./style.css";


interface InputFieldProps {
  moduleValue: string[];
  onChange: (newModuleName: string[]) => void;
  readOnly?: boolean;
}


const InputField: FC<InputFieldProps> = ({readOnly = false, moduleValue, onChange}) => {
   
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange([newValue]);
    };
  return <div>
     <input
          className="input-field"
          type="text"
          value={moduleValue?.length > 0 ? moduleValue[0] : ''}
          onChange={handleChange}
          placeholder=""
          readOnly={readOnly}
        />
  </div>;


 
}


export default InputField;