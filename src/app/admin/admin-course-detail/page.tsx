import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import { FC } from "react";

interface AdminCourseDetailProps {}

const AdminCourseDetail: FC<AdminCourseDetailProps> = () => {
  return (
    <main>
      <AddCourseHeroSection />
    </main>
  );
};

export default AdminCourseDetail;
