import { FC } from "react";
import "./style.css";

import Image from "next/image";

interface CoursesCardsProps {
  imageUrl: string;
  title: string;
  trainingCount: number;
  totalTrainingCount: number;
}

const CoursesCards: FC<CoursesCardsProps> = ({
  imageUrl,
  title,
  trainingCount,
  totalTrainingCount,
}) => {
  return (
    <div className="course-card-main-container">
      <div className="course-card-image">
        <Image src={imageUrl} width={342} height={136} alt="Image" />
      </div>
      <div className="course-card-texts">
        <p className="course-card-title-p-tag">{title}</p>
        <p className="course-card-training-count">
          {trainingCount}/{totalTrainingCount} <span>Trainings</span>
        </p>
      </div>
    </div>
  );
};

export default CoursesCards;
