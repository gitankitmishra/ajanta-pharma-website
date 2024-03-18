// UploadButton.tsx
import { FC } from "react";
import "./style.css";

interface UploadButtonOptAssessmentProps {
  upload: string;
  onExcelFileSelectopt: (optexcelFile: FileList | null) => void; 
}

const UploadButtonOptAssessment: FC<UploadButtonOptAssessmentProps> = ({ upload, onExcelFileSelectopt }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; 
    onExcelFileSelectopt(selectedFiles); 
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} /> 
      <button className="upload-btn" >{upload}</button>
    </div>
  );
};

export default UploadButtonOptAssessment;
