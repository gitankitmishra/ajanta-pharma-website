import React, { FC } from "react";
import "./style.css";

interface NextButtonProps {
  text: string;
  onClick?: () => void;
  width?: string; // Optional width prop
  disabled?: boolean; // Optional disabled prop
}

const NextButton: FC<NextButtonProps> = ({
  text,
  width,
  onClick,
  disabled,
}) => {
  return (
    <div>
      <button
        className="next-button"
        style={{ width: width }}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default NextButton;
