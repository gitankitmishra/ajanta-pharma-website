import { FC, ChangeEvent } from "react";
import "./style.css";

interface InputFieldProps {
  moduleData: { moduleName: string; moduleNo: string; files: FileList | null }[];
  onChange: (newModuleData: { moduleName: string; moduleNo: string; files: FileList | null }[]) => void;
}

const InputField: FC<InputFieldProps> = ({ moduleData, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const index = parseInt(name.split("-")[1]); // Extract index from input name
    const newData = [...moduleData]; // Copy existing data array

    // Update the corresponding field based on input name
    if (name.includes("moduleName")) {
      newData[index].moduleName = value;
    } else if (name.includes("moduleNo")) {
      newData[index].moduleNo = value;
    }

    // Update the state with the new data
    onChange(newData);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.name.split("-")[1]); // Extract index from input name
    const newData = [...moduleData]; // Copy existing data array

    // Update files for the corresponding module
    newData[index].files = event.target.files;

    // Update the state with the new data
    onChange(newData);
  };

  return (
    <div>
      {moduleData.map((module, index) => (
        <div key={index}>
          <input
            className="input-field"
            type="text"
            name={`moduleName-${index}`}
            value={module.moduleName}
            onChange={handleChange}
            placeholder="Module Name"
          />
          <input
            className="input-field"
            type="text"
            name={`moduleNo-${index}`}
            value={module.moduleNo}
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
      ))}
    </div>
  );
};

export default InputField;
