import Breadcrumb from "@/components/breadcrumb";
import { FunctionComponent } from "react";
import "./style.css";
import CoursesCards from "@/components/cards/courses-card";
import BO from "@/public/images/business-orientation.svg";
import CO from "@/public/images/customer-orientation.svg";
import OEA from "@/public/images/operational-excellence.svg";
import Leadership from "@/public/images/leadership.svg";
import Communication from "@/public/images/communication.svg";
interface PersonalDevelopmentProfileSectionProps {}

const PersonalDevelopmentProfileSection: FunctionComponent<
  PersonalDevelopmentProfileSectionProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Personal Development",
      href: "/my-courses/personal-development",
      isActive: true,
    },
  ];
  return (
    <section className="personal-development-profile-main-section">
      <div className="personal-development-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="personal-development-profile-heading-section">
        <h3 className="personal-development-profile-heading-text">
          Personal Development
        </h3>
      </div>
      <div className="personal-development-profile-cards-section">
        <CoursesCards
          imageUrl={BO}
          title="Business Orientation"
          trainingCount={2}
          totalTrainingCount={5}
        />
        <CoursesCards
          imageUrl={CO}
          title="Customer Orientation"
          trainingCount={2}
          totalTrainingCount={5}
        />
        <CoursesCards
          imageUrl={OEA}
          title="Operational Excellence & Anal..."
          trainingCount={2}
          totalTrainingCount={5}
        />
        <CoursesCards
          imageUrl={Leadership}
          title="Leadership"
          trainingCount={2}
          totalTrainingCount={5}
        />
        <CoursesCards
          imageUrl={Communication}
          title="Communication"
          trainingCount={2}
          totalTrainingCount={5}
        />
      </div>
    </section>
  );
};

export default PersonalDevelopmentProfileSection;
