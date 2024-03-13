import { FC } from "react";
import "./style.css";
import Stepper from "@/components/stepper/add-course-stepper";

interface AddCourseProfileContainerProps {}

const AddCourseProfileContainer: FC<AddCourseProfileContainerProps> = () => {
  return (
    <section className="add-course-profile-container-main-section">
      {/* space for breadcrumb */}
      <p className="add-course-text">Add Course</p>
      <Stepper />
    </section>
  );
};

export default AddCourseProfileContainer;
