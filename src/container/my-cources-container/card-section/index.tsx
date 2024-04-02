"use client";
import CoursesCards from "@/components/cards/courses-card";
import { FC } from "react";
import CompetencyBasedSkill from "@/public/images/competency-based-skill.svg";
import MedicalCourse from "@/public/images/medical-couse-image.svg";
import PersonalDevelopmentImage from "@/public/images/personal-development-image.svg";
import ClassroomTraining from "@/public/images/classroom-training.svg";
import "./style.css";
import { ListIcon } from "@/components/icons/list-icon";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface MyCoursesCardSectionProps {}

const MyCoursesCardSection: FC<MyCoursesCardSectionProps> = () => {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/my-courses/course-summary");
  };
  // Define a function to handle navigation when clicking on the card
  const handleCardClick = (destination: string) => {
    router.push(destination);
  };

  return (
    <section>
      <div className="my-course-title-section">
        <div className="my-course-heading-title">
          <p className="my-course-heading-title-p-tag">My Courses</p>
        </div>
        <div className="my-course-course-summary">
          <button
            className="my-course-course-summary-btn"
            onClick={handleRoute}
          >
            <ListIcon />
            Course Summary
          </button>
        </div>
      </div>
      <div className="my-course-cards-main-section">
        <div className="my-course-cards-row">
          <Link href="/my-courses/competency-based-skill">
            <div
              className="my-course-card-wrapper"
              onClick={() =>
                handleCardClick("/my-courses/competency-based-skill")
              }
            >
              <CoursesCards
                imageUrl={CompetencyBasedSkill}
                title="Competency Based Skill"
                trainingCount={2}
                totalTrainingCount={5}
              />
            </div>
          </Link>
          <Link href="/my-courses/medical">
            <div
              className="my-course-card-wrapper"
              onClick={() => handleCardClick("/my-courses/medical")}
            >
              <CoursesCards
                imageUrl={MedicalCourse}
                title="Medical"
                trainingCount={1}
                totalTrainingCount={1}
              />
            </div>
          </Link>
          <Link href="/my-courses/marketing">
            <div
              className="my-course-card-wrapper"
              onClick={() => handleCardClick("/my-courses/marketing")}
            >
              <CoursesCards
                imageUrl={CompetencyBasedSkill}
                title="Marketing"
                trainingCount={2}
                totalTrainingCount={2}
              />
            </div>
          </Link>
        </div>
        <div className="my-course-cards-row">
          <Link href="/my-courses/personal-development">
            <div
              className="my-course-card-wrapper"
              onClick={() =>
                handleCardClick("/my-courses/personal-development")
              }
            >
              <CoursesCards
                imageUrl={PersonalDevelopmentImage}
                title="Personal Development"
                trainingCount={0}
                totalTrainingCount={2}
              />
            </div>
          </Link>
          <Link href="/my-courses/classroom-training">
            <div
              className="my-course-card-wrapper"
              onClick={() =>
                handleCardClick("/my-courses/classroom-training")
              }
            >
              <CoursesCards
                imageUrl={ClassroomTraining}
                title="Classroom Training"
                trainingCount={2}
                totalTrainingCount={5}
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyCoursesCardSection;
