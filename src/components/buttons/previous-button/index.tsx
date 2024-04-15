import { FC } from "react";
import "./style.css";

interface PreviousButtonProps {
  text: string;
  width?: string;
  onClick?: () => void;
}

const PreviousButton: FC<PreviousButtonProps> = ({ text, width, onClick }) => {
  return (
    <div>
      <button
        className="previous-btn"
        style={{ width: width }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default PreviousButton;
