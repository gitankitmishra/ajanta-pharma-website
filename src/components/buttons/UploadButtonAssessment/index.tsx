// UploadButton.tsx
import { FC } from "react";
import "./style.css";

interface UploadButtonAssessmentProps {
  upload: string;
  onExcelFileSelect: (excelFile: FileList | null) => void; 
}

const UploadButtonAssessment: FC<UploadButtonAssessmentProps> = ({ upload, onExcelFileSelect }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; 
    onExcelFileSelect(selectedFiles); 
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} /> 
      <button className="upload-btn" >{upload}</button>
    </div>
  );
};

export default UploadButtonAssessment;
