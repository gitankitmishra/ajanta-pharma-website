import CoursesCards from "@/components/cards/courses-card";
import { FC } from "react";
import CompetencyBasedSkill from "@/public/images/competency-based-skill.svg";
import MedicalCourse from "@/public/images/medical-couse-image.svg";
import PersonalDevelopmentImage from "@/public/images/personal-development-image.svg";
import ClassroomTraining from "@/public/images/classroom-training.svg";
import "./style.css";
import { ListIcon } from "@/components/icons/list-icon";
interface MyCoursesCardSectionProps {}

const MyCoursesCardSection: FC<MyCoursesCardSectionProps> = () => {
  return (
    <section>
      <div className="my-course-title-section">
        <div className="my-course-heading-title">
          <p className="my-course-heading-title-p-tag">My Courses</p>
        </div>
        <div className="my-course-course-summary">
          <button className="my-course-course-summary-btn">
            <ListIcon />
            Course Summary
          </button>
        </div>
      </div>
      <div className="my-course-cards-main-section">
        <div className="my-course-cards-row">
          <CoursesCards
            imageUrl={CompetencyBasedSkill}
            title="Competency Based Skill"
            trainingCount={2}
            totalTrainingCount={5}
          />
          <CoursesCards
            imageUrl={MedicalCourse}
            title="Medical"
            trainingCount={1}
            totalTrainingCount={1}
          />
          <CoursesCards
            imageUrl={CompetencyBasedSkill}
            title="Marketing"
            trainingCount={2}
            totalTrainingCount={2}
          />
        </div>
        <div className="my-course-cards-row">
          <CoursesCards
            imageUrl={PersonalDevelopmentImage}
            title="Personal Development"
            trainingCount={0}
            totalTrainingCount={2}
          />
          <CoursesCards
            imageUrl={ClassroomTraining}
            title="Classroom Training"
            trainingCount={2}
            totalTrainingCount={5}
          />
        </div>
      </div>
    </section>
  );
};

export default MyCoursesCardSection;
