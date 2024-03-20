import { FC, ChangeEvent, useEffect, useState } from "react";
import "./style.css";

interface InputFieldProps {
  moduleValue: string[];
  onChange: (newModuleName: string[]) => void;
  readOnly?: boolean;
}


const InputField: FC<InputFieldProps> = ({ moduleData, index, onChange}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newData = [...moduleData];

    if (name.includes("moduleName")) {
      newData[index].moduleName = value;
    } else if (name.includes("moduleNo")) {
      newData[index].moduleNo = value;
    }

    onChange(newData);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...moduleData]; 

    newData[index].files = event.target.files;

    onChange(newData);
  };

  return (
    <div>
      <div key={index}>
        <input
          className="input-field"
          type="text"
          name={`moduleName-${index}`}
          value={moduleData[index]?.moduleName}

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

        <input
          className="input-field"
          type="text"
          name={`moduleNo-${index}`}
          value={moduleData[index]?.moduleNo}
          onChange={handleChange}
          placeholder="Module Number"
        />
        <input
          className="input-field"
          type="file"
          name={`files-${index}`}
          onChange={handleFileChange}
          placeholder="Upload File"
        />
      </div>
    </div>
  );
};

  </div>;

  
}



export default InputField;