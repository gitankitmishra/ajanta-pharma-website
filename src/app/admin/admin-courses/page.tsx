"use client";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import AdminCoursesTableSection from "@/container/Admin-Container/admin-courses-container/admin-courses-table-section";
import AdminCoursesProvider from "@/context/allCourses/courses_details";
import { CourseProvider } from "@/context/course_context";
import { FC, useState } from "react";

interface AdminCourcesProps {}

const AdminCources: FC<AdminCourcesProps> = () => {
  return (
    <CourseProvider>
      <main>
        <AdminCoursesProvider>
          <AdminCoursesHeroSection />

          <AdminCoursesTableSection />
        </AdminCoursesProvider>
      </main>
    </CourseProvider>
  );
};

export default AdminCources;
