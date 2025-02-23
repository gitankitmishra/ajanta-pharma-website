// UploadButton.tsx
import React, { useRef } from "react";
import "./style.css";

interface UploadButtonProps {
  upload?: string;
  onFileSelect?: (files: File) => void;
  uploadFile?: () => (selectedFile: File) => void;
  acceptedTypes?: string;
  formatText?: string;
  id?: string;
  className?: string;
  error?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  upload,
  onFileSelect,
  acceptedTypes,
  formatText,
  uploadFile,
  id,
  className,
  error = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect && onFileSelect(selectedFile);
      if (uploadFile) {
        const handler = uploadFile();
        handler(selectedFile);
      }
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div>
      <input
        id={id}
        type="file"
        ref={fileInputRef}
        // accept={
        //   acceptedTypes ||
        //   ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        // }
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <button className={`upload-btn ${className}`} onClick={handleClick}>
        {upload}
      </button>
      {error.length > 0 ? (
        <div
          className={`upload-btn-error-message ${
            error.length !== 0 && "upload-btn-error-display"
          }`}
        >
          {error}
        </div>
      ) : (
        <span className="upload-btn-format-type-text">{formatText} </span>
      )}

      {/* <span className="upload-btn-format-type-text">{formatText} </span> */}
    </div>
  );
};

export default UploadButton;
