import { FC } from "react";
import "./style.css";

interface InputFieldNumProps {
  moduleNum: number[];
  onChange: (newValue: number[]) => void;
}

const InputFieldNum: FC<InputFieldNumProps> = ({ moduleNum, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      const updatedModuleNum = [...moduleNum]; 
      updatedModuleNum[0] = newValue; 
      onChange(updatedModuleNum); 
    }
  };

  return (
    <div>
      <input
        className="input-field"
        type="number"
        value={moduleNum[0]}
        onChange={handleChange}
        placeholder=""
      />
    </div>
  );
};

export default InputFieldNum;
