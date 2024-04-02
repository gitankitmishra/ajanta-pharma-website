import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import AdminCourseDeatilContainer from "@/container/Admin-Container/course-detail";
import { CourseProvider } from "@/context/course_context";
import { FC } from "react";

interface AdminCourseDetailProps {}

const AdminCourseDetail: FC<AdminCourseDetailProps> = () => {
  return (
    <CourseProvider>
      <main>
        <AddCourseHeroSection />
        <AdminCourseDeatilContainer />
      </main>
    </CourseProvider>
  );
};

export default AdminCourseDetail;
