import Breadcrumb from "@/components/breadcrumb";
import AssignedCourseCard from "@/components/cards/assigned-course-card";
import { FunctionComponent } from "react";
import "./style.css";
import AssignedCompletedCourseCard from "@/components/cards/assigned-completed-card";
import AssignedLockedCourseCard from "@/components/cards/assigned-locked-card";

interface CommunicationProfileProps {}

const CommunicationProfile: FunctionComponent<
  CommunicationProfileProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
    },
    {
      label: "Communication",
      href: "/my-courses/communication",
      isActive: true,
    },
  ];
  return (
    <section className="communication-profile-main-section">
      <div className="communication-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="communication-profile-heading-section">
        <h3 className="communication-profile-heading-text">Communication</h3>
      </div>
      <div className="communication-profile-cards-section">
        <AssignedCourseCard percentage={20} />
        <AssignedLockedCourseCard />
        <AssignedLockedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
        <AssignedCompletedCourseCard />
      </div>
    </section>
  );
};

export default CommunicationProfile;
