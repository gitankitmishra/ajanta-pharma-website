
import HomeHeroSection from "@/container/home-container/hero-section";
import NotificationContainer from "@/container/notification-container";
import { FunctionComponent } from "react";

interface NotificationProps {}

const Notification: FunctionComponent<NotificationProps> = () => {
  return <main>
    <HomeHeroSection/>
    <NotificationContainer/>
  </main>;
};

export default Notification;
