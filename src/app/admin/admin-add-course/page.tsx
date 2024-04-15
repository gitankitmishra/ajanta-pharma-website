import Stepper from "@/components/stepper/add-course-stepper";
import AddCourseHeroSection from "@/container/Admin-Container/add-course/add-course-hero";
import AddCourseProfileContainer from "@/container/Admin-Container/add-course/add-course-profile-container";
import { FC } from "react";

interface AdminAddCourseProps {}


const AdminAddCourse: FC<AdminAddCourseProps> = () => {
  return (
    <section>
      <AddCourseHeroSection />
      <AddCourseProfileContainer />
    </section>
  );
};

export default AdminAddCourse;
