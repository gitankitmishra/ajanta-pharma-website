// UploadButton.tsx
import React, { useRef } from "react";
import "./style.css";

interface UploadButtonProps {
  upload: string;
  onFileSelect: (files: File) => void;
  acceptedTypes?: string;
  formatText: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  upload,
  onFileSelect,
  acceptedTypes,
  formatText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    onFileSelect(selectedFiles![0]);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept={
          acceptedTypes ||
          ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button className="upload-btn" onClick={handleClick}>
        {upload}
      </button>
      <span className="upload-btn-format-type-text">{formatText} </span>
    </div>
  );
};

export default UploadButton;
