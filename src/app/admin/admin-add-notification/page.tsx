
import AddNotificationContainer from "@/container/Admin-Container/add-notification/add-notification-container";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import { FC } from "react";

interface AdminAddNotificationProps {}

const AdminAddNotification: FC<AdminAddNotificationProps> = () => {
  return <section>
    <AdminCoursesHeroSection/>
    <AddNotificationContainer/>
  </section>;
};

export default AdminAddNotification;
