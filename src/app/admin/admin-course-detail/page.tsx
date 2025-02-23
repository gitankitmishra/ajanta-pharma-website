import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import AdminCourseDeatilContainer from "@/container/Admin-Container/course-detail";
import { FC } from "react";

interface AdminCourseDetailProps {}

const AdminCourseDetail: FC<AdminCourseDetailProps> = () => {
  return (
    <section>
      <AddCourseHeroSection />
      <AdminCourseDeatilContainer />
    </section>
  );
};

export default AdminCourseDetail;
