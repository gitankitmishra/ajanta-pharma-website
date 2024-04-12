import { FunctionComponent } from "react";
import "./style.css";
import Image from "next/image";
import { DownloadIcon } from "@/components/icons/download-icon";
import EyeIcon from "@/components/icons/eye-icon";

interface MyCertificateCardProps {
  imageUrl: string;
  percentage: number;
  course_code: string;
  course_name: string;
  date: any;
}

const MyCertificateCard: FunctionComponent<MyCertificateCardProps> = ({
  imageUrl,
  percentage,
  course_code,
  course_name,
  date,
}) => {
  return (
    <div className="my-certificate-card-main-section">
      <div className="my-certificate-card-image-section">
        <div className="my-certificate-card-image-div">
          <Image src={imageUrl} alt="Image" width={70} height={70} />
        </div>
        <div className="my-certificate-card-course-details">
          <p className="my-certifiacte-card-course-code-text">
            Course Code {course_code}
          </p>
          <p className="my-certifiacte-card-course-name-text">{course_name}</p>
        </div>
      </div>
      <div className="my-certificate-card-marks-section">
        <p className="my-certificate-card-marks-text">Marks Achieved</p>
        <p className="my-certificate-card-marks-percentage-text">
          {percentage}%
        </p>
      </div>
      <div className="my-certificate-card-date-section">
        <p className="my-certificate-card-issued-on-text">Issued On</p>
        <p className="my-certificate-card-marks-percentage-text">{date}</p>
      </div>
      <div className="my-certificate-card-download-section">
        <p className="my-certificate-card-view-text">
          View Certificate <DownloadIcon />{" "}
        </p>
        <p className="my-certificate-card-download-text">
          Download Certificate <EyeIcon files={[]} />
        </p>
      </div>
    </div>
  );
};

export default MyCertificateCard;
