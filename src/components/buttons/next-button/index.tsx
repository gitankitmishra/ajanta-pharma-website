import React, { FC } from "react";
import "./style.css";

interface NextButtonProps {
  text: string;
  onClick?: () => void;
  width?: string; // Optional width prop
}

const NextButton: FC<NextButtonProps> = ({ text,width,onClick }) => {
  
  return (
    <div>
      <button className="next-button" style={{width:width}} >
        {text}
      </button>
    </div>
  );
};

export default NextButton;
