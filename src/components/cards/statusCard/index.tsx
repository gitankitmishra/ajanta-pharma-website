import { StatusCardGraduationCapIcon } from "@/components/icons/statusCardGraduation-icon";
import { FC } from "react";
import Image from "next/image";
import "./style.css";

interface StatusCardProps {
  imageUrl: string;
  title: string;
  count: number;
}

const StatusCard: FC<StatusCardProps> = ({imageUrl,title,count}) => {
  return (
    <div className="status-card-main-container">
      <div className="status-card-texts-part">
        <p className="status-card-text">{title}</p>
        <p className="status-card-text">{count}</p>
      </div>
      <div className="status-card-icon-part">
        <Image src={imageUrl} alt="Image"/>
        <StatusCardGraduationCapIcon />
      </div>
    </div>
  );
};

export default StatusCard;
