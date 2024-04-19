import Breadcrumb from "@/components/breadcrumb";
import AssignedCourseCard from "@/components/cards/assigned-course-card";
import { FunctionComponent } from "react";
import "./style.css";
import AssignedCompletedCourseCard from "@/components/cards/assigned-completed-card";
import AssignedLockedCourseCard from "@/components/cards/assigned-locked-card";

interface CustomerOrientationProfileProps {}

const  CustomerOrientationProfile: FunctionComponent<
CustomerOrientationProfileProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
    },
    {
      label: "Customer Orientation",
      href: "/my-courses/customer-orientaion",
      isActive: true,
    },
  ];
  return (
    <section className="customer-orientation-profile-main-section">
      <div className="customer-orientation-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="customer-orientation-profile-heading-section">
        <h3 className="customer-orientation-profile-heading-text">
          Customer Orientation
        </h3>
      </div>
      <div className="customer-orientation-profile-cards-section">
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

export default  CustomerOrientationProfile;
