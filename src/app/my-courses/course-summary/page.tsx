import Breadcrumb from "@/components/breadcrumb";
import HomeHeroSection from "@/container/home-container/hero-section";
import CourseDetailProfileSection from "@/container/my-cources-container/course-detail-container/course-summary-profile-section";
import CourseSummaryTableSection from "@/container/my-cources-container/course-detail-container/course-summary-table-section/indexx";
import CourseDetailTableSection from "@/container/my-cources-container/course-detail-container/course-summary-table-section/indexx";
import { FC } from "react";

interface CourseSummaryProps {}

const CourseSummary: FC<CourseSummaryProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <CourseDetailProfileSection />
      <CourseSummaryTableSection />
    </main>
  );
};

export default CourseSummary;
