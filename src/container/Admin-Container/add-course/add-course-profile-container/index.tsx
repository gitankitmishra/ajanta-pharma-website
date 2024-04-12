"use client";
import { FC, useContext } from "react";
import "./style.css";
import Stepper from "@/components/stepper/add-course-stepper";
import Breadcrumb from "@/components/breadcrumb";

import NextButton from "@/components/buttons/next-button";
import { CourseContext, CourseContextType } from "@/context/course_context";
import Link from "next/link";

interface AddCourseProfileContainerProps {}

const AddCourseProfileContainer: FC<AddCourseProfileContainerProps> = () => {
  const { active_step } = useContext(CourseContext) as CourseContextType;
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

          <Link href="/admin/admin-courses">
            <NextButton text="Back to Courses" width="193px" />
          </Link>
        </div>
      </div>
      <div className="add-course-stepper-section">
        <Stepper />
      </div>
    </section>
  );
};

export default AddCourseProfileContainer;
