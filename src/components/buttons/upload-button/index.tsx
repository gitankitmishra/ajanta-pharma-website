// UploadButton.tsx
import React, { useRef } from "react";
import "./style.css";

interface UploadButtonProps {
  upload: string;
  onFileSelect: (files: FileList | null) => void;
  uploadFile: any;
  acceptedTypes?: string; // New prop for accepted file types
  formatText: string
}

const UploadButton: React.FC<UploadButtonProps> = ({ upload, onFileSelect, uploadFile, acceptedTypes,formatText }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger file input click
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    onFileSelect(selectedFiles);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedTypes || ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"} // Use custom accepted types if provided, otherwise default to ".xlsx"
        onChange={handleFileSelect}
        style={{ display: "none" }} // Hide the file input
      />
      <button className="upload-btn" onClick={handleClick}>{upload}</button>
      <span className="upload-btn-format-type-text">{formatText} </span>
    </div>
  );
};

export default UploadButton;
