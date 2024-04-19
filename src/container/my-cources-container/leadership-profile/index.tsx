import Breadcrumb from "@/components/breadcrumb";
import AssignedCourseCard from "@/components/cards/assigned-course-card";
import { FunctionComponent } from "react";
import "./style.css";
import AssignedCompletedCourseCard from "@/components/cards/assigned-completed-card";
import AssignedLockedCourseCard from "@/components/cards/assigned-locked-card";

interface LeadershipProfileProps {}

const LeadershipProfile: FunctionComponent<LeadershipProfileProps> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
    },
    {
      label: "Leadership",
      href: "/my-courses/leadership",
      isActive: true,
    },
  ];
  return (
    <section className="leadership-profile-main-section">
      <div className="leadership-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="leadership-profile-heading-section">
        <h3 className="leadership-profile-heading-text">Leadership</h3>
      </div>
      <div className="leadership-profile-cards-section">
      <AssignedCourseCard percentage={20} />
       <AssignedLockedCourseCard/>
       <AssignedLockedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
       <AssignedCompletedCourseCard/>
      </div>
    </section>
  );
};

export default LeadershipProfile;
