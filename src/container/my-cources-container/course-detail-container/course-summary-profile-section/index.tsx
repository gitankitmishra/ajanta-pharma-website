import { FunctionComponent } from "react";
import "./style.css";
import Breadcrumb from "@/components/breadcrumb";
import StatusCard from "@/components/cards/statusCard";
import { GraduationCapIcon } from "@/components/icons/graduation-cap-icon";

interface CourseDetailProfileSectionProps {}

const CourseDetailProfileSection: FunctionComponent<
  CourseDetailProfileSectionProps
> = () => {
  const breadcrumbItems = [
    { label: "My Courses", href: "/my-courses" },
    {
      label: " Course Summary",
      href: "/my-courses/course-summary",
      isActive: true,
    },
  ];
  return (
    <section className="course-summary-main-section">
      <div className="course-summary-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="course-summary-cards-section">
        <StatusCard imageUrl={""} title={"Total Assigned"} count={11} width={0} height={0}/>
        <StatusCard imageUrl={""} title={"In Progress"} count={1} width={0} height={0}/>
        <StatusCard imageUrl={""} title={"Pending"} count={4} width={0} height={0}/>
      </div>
    </section>
  );
};

export default CourseDetailProfileSection;
