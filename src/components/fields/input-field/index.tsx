import { FC, ChangeEvent } from "react";
import "./style.css";

interface InputFieldProps {
  moduleData: { moduleName: string; moduleNo: string; files: FileList | null }[];
  index: number;
  onChange: (newModuleData: { moduleName: string; moduleNo: string; files: FileList | null }[]) => void;
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
          onChange={handleChange}
          placeholder="Module Name"
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

export default InputField;
