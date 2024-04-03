import Breadcrumb from "@/components/breadcrumb";
import { FunctionComponent } from "react";
import "./style.css";
import CoursesCards from "@/components/cards/courses-card";
import BO from "@/public/images/business-orientation.svg";
import CO from "@/public/images/customer-orientation.svg";
import OEA from "@/public/images/operational-excellence.svg";
import Leadership from "@/public/images/leadership.svg";
import Communication from "@/public/images/communication.svg";
interface ClassroomTrainingProfileSectionProps {}

const ClassroomTrainingProfileSection: FunctionComponent<
  ClassroomTrainingProfileSectionProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Classroom Training",
      href: "/my-courses/classroom-training",
      isActive: true,
    },
  ];
  return (
    <section className="classroom-training-profile-main-section">
      <div className="classroom-training-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="classroom-training-profile-heading-section">
        <h3 className="classroom-training-profile-heading-text">
        Classroom Training
        </h3>
      </div>
      <div className="classroom-training-profile-cards-section">
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

export default ClassroomTrainingProfileSection;
