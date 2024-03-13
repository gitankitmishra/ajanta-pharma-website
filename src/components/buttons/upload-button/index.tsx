import { FC } from "react";
import "./style.css";

interface UploadButtonProps {
    upload: string;
}

const UploadButton: FC<UploadButtonProps> = ({upload}) => {
  return (
    <div>
      <button className="upload-btn">{upload}</button>
    </div>
  );
};

export default UploadButton;
