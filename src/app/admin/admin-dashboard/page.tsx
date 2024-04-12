"use client";
import AdminCourseListTable from "@/components/tables/courseListTable";
import DashboardHeroSection from "@/container/Admin-Container/admin-dashboard-container/dasboard-hero-section";
import DashboardProfileSection from "@/container/Admin-Container/admin-dashboard-container/dashboard-profile-section";

import { FC, useState } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <DashboardHeroSection />
      <DashboardProfileSection />
      <AdminCourseListTable
      // name={"Critical Thinking"}
      // courseCode={"PD2"}
      // category={"Competency Based Skills"}
      // date={"31/01/2024"}
      // status={"Active"}
      // view={<ViewEyeIcon />}
      // currentPage={currentPage}
      />
    </>
  );
};

export default Dashboard;
