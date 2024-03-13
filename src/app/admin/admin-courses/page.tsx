import AdminCourseList from "@/components/tables/courseListTable";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import { FC } from "react";

interface AdminCourcesProps {}

const AdminCources: FC<AdminCourcesProps> = () => {
  return (
    <main>
      <AdminCoursesHeroSection />
      <AdminCourseList />
    </main>
  );
};

export default AdminCources;
