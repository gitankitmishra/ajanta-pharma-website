import HomeHeroSection from "@/container/home-container/hero-section";
import CommunicationProfile from "@/container/my-cources-container/communication-profile";
import { FunctionComponent } from "react";

interface CommunicationProps {}

const Communication: FunctionComponent<CommunicationProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <CommunicationProfile />
    </main>
  );
};

export default Communication;
