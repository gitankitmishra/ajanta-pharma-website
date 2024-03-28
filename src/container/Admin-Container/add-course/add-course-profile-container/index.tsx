"use client";
import { FC, useContext } from "react";
import "./style.css";
import Stepper from "@/components/stepper/add-course-stepper";
import Breadcrumb from "@/components/breadcrumb";
import BasicProvider, {
  BasicContext,
  BasicContextType,
} from "@/context/course_update/basicInfo_context";
import DesignationProvider from "@/context/course_update/designation_context";
import ModuleProvider from "@/context/course_update/module_context";
import NextButton from "@/components/buttons/next-button";

interface AddCourseProfileContainerProps {}

const AddCourseProfileContainer: FC<AddCourseProfileContainerProps> = () => {
  const { active_step } = useContext(BasicContext) as BasicContextType;
  const breadcrumbItems = [
    { label: "Courses", href: "/admin/admin-courses" },
    { label: "Add Course", href: "/admin/admin-add-course", isActive: true },
  ];
  return (
    <section className="add-course-profile-container-main-section">
      <div className="add-course-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
        <div className="add-course-profile-save-as-draft-btn-part">
          <p className="add-course-text">Add Course</p>
          {active_step !== 0 && (
            <NextButton text="Save as Draft" width="221px" />
          )}
        </div>
      </div>
      <div className="add-course-stepper-section">
        <DesignationProvider>
          <ModuleProvider>
            <Stepper />
          </ModuleProvider>
        </DesignationProvider>
      </div>
    </section>
  );
};

export default AddCourseProfileContainer;
