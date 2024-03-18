import React, { FC } from "react";
import "./style.css";

interface NextButtonProps {
  text: string;
}

const NextButton: FC<NextButtonProps> = ({ text }) => {
  return (
    <div>
      <button className="next-button" >
        {text}
      </button>
    </div>
  );
};

export default NextButton;
