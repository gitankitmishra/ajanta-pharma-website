import React, { FC } from "react";
import "./style.css";

interface NextButtonProps {
  text: string;
  width?: string; // Optional width prop
}

const NextButton: FC<NextButtonProps> = ({ text,width }) => {
  return (
    <div>
      <button className="next-button" style={{width:width}} >
        {text}
      </button>
    </div>
  );
};

export default NextButton;
