import { FC } from "react";
import "./style.css";
import { PlusIcon } from "@/components/icons/plus-icon";

interface AddButtonProps {
  text: string;
  width?: string;
}

const AddButton: FC<AddButtonProps> = ({ text, width }) => {
  return (
    <div className="add-btn-main-section">
      <button className="add-button" style={{ width: width }}>
        {" "}
        <PlusIcon />
        {text}
      </button>
    </div>
  );
};

export default AddButton;
