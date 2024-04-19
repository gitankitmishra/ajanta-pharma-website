import Breadcrumb from "@/components/breadcrumb";
import AssignedCourseCard from "@/components/cards/assigned-course-card";
import { FunctionComponent } from "react";
import "./style.css";
import AssignedCompletedCourseCard from "@/components/cards/assigned-completed-card";
import AssignedLockedCourseCard from "@/components/cards/assigned-locked-card";
import CustomPagination from "@/components/pagination";

interface OperationAnalyticsProfileProps {}

const OperationAnalyticsProfile: FunctionComponent<
  OperationAnalyticsProfileProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
    },
    {
      label: "Operational Excellence & Analytics",
      href: "/my-courses/operation-analytics",
      isActive: true,
    },
  ];
  return (
    <section className="oea-profile-main-section">
      <div className="oea-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="oea-profile-heading-section">
        <h3 className="oea-profile-heading-text">Customer Orientation</h3>
      </div>
      <div className="oea-profile-cards-section">
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

export default OperationAnalyticsProfile;
