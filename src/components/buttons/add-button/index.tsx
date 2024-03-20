import { FC } from "react";
import "./style.css";
import { PlusIcon } from "@/components/icons/plus-icon";

interface AddButtonProps {
    text:string;
}

const AddButton: FC<AddButtonProps> = ({text}) => {
  return (
    <div className="add-btn-main-section">
      <button className="add-button">
        {" "}
        <PlusIcon />
       {text}
      </button>
    </div>
  );
};

export default AddButton;
