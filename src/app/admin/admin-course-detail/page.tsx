import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import AdminCourseDeatilContainer from "@/container/Admin-Container/course-detail";
import { EditCourseProvider } from "@/context/temporary/editContext";
import { FC } from "react";

interface AdminCourseDetailProps {}

const AdminCourseDetail: FC<AdminCourseDetailProps> = () => {
  return (
    <main>
      <EditCourseProvider>

      <AddCourseHeroSection />
      <AdminCourseDeatilContainer/>
      </EditCourseProvider>
    </main>
  );
};

export default AdminCourseDetail;
