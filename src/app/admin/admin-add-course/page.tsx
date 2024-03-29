import Stepper from "@/components/stepper/add-course-stepper";
import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import AddCourseProfileContainer from "@/container/Admin-Container/add-course/add-course-profile-container";
import { CourseProvider } from "@/context/course_context";
import { FC } from "react";

interface AdminAddCourseProps {}

const AdminAddCourse: FC<AdminAddCourseProps> = () => {
  return (
    <CourseProvider>
      <main>
        <AddCourseHeroSection />
        <AddCourseProfileContainer />
      </main>
    </CourseProvider>
  );
};

export default AdminAddCourse;
