import Breadcrumb from "@/components/breadcrumb";
import { FunctionComponent } from "react";
import "./style.css";
import CoursesCards from "@/components/cards/courses-card";
import BO from "@/public/images/business-orientation.svg";
import CO from "@/public/images/customer-orientation.svg";
import OEA from "@/public/images/operational-excellence.svg";
import Leadership from "@/public/images/leadership.svg";
import Communication from "@/public/images/communication.svg";
interface MarketingProfileSectionProps {}

const MarketingProfileSection: FunctionComponent<
  MarketingProfileSectionProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Marketing",
      href: "/my-courses/marketing",
      isActive: true,
    },
  ];
  return (
    <section className="marketing-profile-section-main-section">
      <div className="marketing-profile-section-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="marketing-profile-section-heading-section">
        <h3 className="marketing-profile-section-heading-text">
          Marketing
        </h3>
      </div>
      <div className="marketing-profile-section-cards-section">
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

export default MarketingProfileSection;
