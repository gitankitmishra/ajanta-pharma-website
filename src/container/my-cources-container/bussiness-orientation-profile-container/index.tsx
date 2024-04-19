import Breadcrumb from "@/components/breadcrumb";
import AssignedCourseCard from "@/components/cards/assigned-course-card";
import { FunctionComponent } from "react";
import "./style.css";
import AssignedLockedCourseCard from "@/components/cards/assigned-locked-card";
import AssignedCompletedCourseCard from "@/components/cards/assigned-completed-card";

interface BussinessOrientationProfileProps {}

const BussinessOrientationProfile: FunctionComponent<
  BussinessOrientationProfileProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: "Competency Based Skills",
      href: "/my-courses/competency-based-skill",
    },
    {
      label: "Bussiness Orientation",
      href: "/my-courses/bussiness-orientaion",
      isActive: true,
    },
  ];
  return (
    <section className="bussiness-orientation-profile-main-section">
      <div className="bussiness-orientation-profile-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="bussiness-orientation-profile-heading-section">
        <h3 className="bussiness-orientation-profile-heading-text">
          Bussiness Orientation
        </h3>
      </div>
      <div className="bussiness-orientation-profile-cards-section">
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

export default BussinessOrientationProfile;
