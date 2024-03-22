import AdminCourseCategoryContainer from "@/container/Admin-Container/admin-course-category-container";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";

import { FC } from "react";

interface AdminCourseCategoryProps {}

const AdminCourseCategory: FC<AdminCourseCategoryProps> = () => {
  return (
    <section>
      <AdminCoursesHeroSection />
      <AdminCourseCategoryContainer/>
    </section>
  );
};

export default AdminCourseCategory;
