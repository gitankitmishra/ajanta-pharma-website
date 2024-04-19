"use client";
import Breadcrumb from "@/components/breadcrumb";
import { FunctionComponent } from "react";
import "./style.css";
import CoursesCards from "@/components/cards/courses-card";
import BO from "@/public/images/business-orientation.svg";
import CO from "@/public/images/customer-orientation.svg";
import OEA from "@/public/images/operational-excellence.svg";
import Leadership from "@/public/images/leadership.svg";
import Communication from "@/public/images/communication.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface CompetencyBasedSkillsProfileProps {}

const CompetencyBasedSkillsProfile: FunctionComponent<
  CompetencyBasedSkillsProfileProps
> = () => {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/my-courses/course-summary");
  };
  // Define a function to handle navigation when clicking on the card
  const handleCardClick = (destination: string) => {
    router.push(destination);
  };

  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
      isActive: true,
    },
  ];
  return (
    <section className="competency-based-skill-main-section">
      <div className="competency-based-skill-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="competency-based-skill-heading-section">
        <h3 className="competency-based-skill-heading-text">
          Competency Based Skills
        </h3>
      </div>
      <div className="competency-based-skill-cards-section">
        <Link href="/my-courses/bussiness-orientation">
          <div
            className="competency-based-skill-card-wrapper"
            onClick={() => handleCardClick("/my-courses/bussiness-orientation")}
          >
            <CoursesCards
              imageUrl={BO}
              title="Business Orientation"
              trainingCount={2}
              totalTrainingCount={5}
            />
          </div>
        </Link>
        <Link href="/my-courses/customer-orientation">
          <div
            className="competency-based-skill-card-wrapper"
            onClick={() => handleCardClick("/my-courses/customer-orientation")}
          >
            <CoursesCards
              imageUrl={CO}
              title="Customer Orientation"
              trainingCount={2}
              totalTrainingCount={5}
            />
          </div>
        </Link>
        <Link href="/my-courses/operation-analytics">
          <div
            className="competency-based-skill-card-wrapper"
            onClick={() => handleCardClick("/my-courses/operation-analytics")}
          >
            <CoursesCards
              imageUrl={OEA}
              title="Operational Excellence & Anal..."
              trainingCount={2}
              totalTrainingCount={5}
            />
          </div>
        </Link>
        <Link href="/my-courses/leadership">
          <div
            className="competency-based-skill-card-wrapper"
            onClick={() => handleCardClick("/my-courses/leadership")}
          >
            <CoursesCards
              imageUrl={Leadership}
              title="Leadership"
              trainingCount={2}
              totalTrainingCount={5}
            />
          </div>
        </Link>
        <Link href="/my-courses/communication">
          <div
            className="competency-based-skill-card-wrapper"
            onClick={() => handleCardClick("/my-courses/communication")}
          >
            <CoursesCards
              imageUrl={Communication}
              title="Communication"
              trainingCount={2}
              totalTrainingCount={5}
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CompetencyBasedSkillsProfile;
