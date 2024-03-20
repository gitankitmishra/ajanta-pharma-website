import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import AdminNotificationContainer from "@/container/Admin-Container/admin-notification";
import { FC } from "react";

interface AdminNotificationProps {
    
}
 
const AdminNotification: FC<AdminNotificationProps> = () => {
    return ( <section>
      <AdminCoursesHeroSection/>
     <AdminNotificationContainer/>
    </section> );
}
 
export default AdminNotification;