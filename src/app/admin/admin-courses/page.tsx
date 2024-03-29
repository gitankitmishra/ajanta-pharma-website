"use client";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import AdminCoursesTableSection from "@/container/Admin-Container/admin-courses-container/admin-courses-table-section";
import { CourseProvider } from "@/context/course_context";
import { FC, useState } from "react";

interface AdminCourcesProps {}

const AdminCources: FC<AdminCourcesProps> = () => {
  return (
    <CourseProvider>
      <main>
        <AdminCoursesHeroSection />
        <AdminCoursesTableSection />
      </main>
    </CourseProvider>
  );
};

export default AdminCources;
